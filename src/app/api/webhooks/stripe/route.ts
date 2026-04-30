import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import {
  sendCustomerConfirmation,
  sendInternalOrderAlert,
} from "@/lib/order-emails";

/**
 * Stripe webhook receiver. Configure on the Stripe Dashboard:
 *   Endpoint URL:  https://carblock.us/api/webhooks/stripe
 *   Events:        payment_intent.succeeded, charge.refunded
 *   Signing secret: paste into STRIPE_WEBHOOK_SECRET on Vercel
 *
 * On payment_intent.succeeded we:
 *   1. Re-read the PaymentIntent to grab the freshest metadata.
 *   2. Upsert the customer (by email).
 *   3. Persist a full Order + OrderItem rows.
 *   4. Email the customer ("Thanks, your order is confirmed").
 *   5. Email info@carblock.us so fulfillment can start.
 *
 * The handler is idempotent: if the same PaymentIntent fires twice,
 * we look it up first and skip if already saved.
 */

type CartLine = { s: string; n: string; q: number; p: number };

function generateOrderNumber() {
  // CB-XXXXXX, 6 base32-ish chars
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < 6; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return `CB-${s}`;
}

function parseCart(raw: string | undefined | null): CartLine[] {
  if (!raw) return [];
  try {
    const v = JSON.parse(raw);
    if (Array.isArray(v)) return v as CartLine[];
    return [];
  } catch {
    return [];
  }
}

async function handlePaymentSucceeded(intent: Stripe.PaymentIntent) {
  // Idempotency — already saved this PaymentIntent?
  const existing = await prisma.order.findUnique({
    where: { stripePaymentIntentId: intent.id },
  });
  if (existing) {
    console.log(`[webhook] Order already exists for ${intent.id}, skipping`);
    return;
  }

  const m = intent.metadata ?? {};
  const cart = parseCart(m.cart);
  if (cart.length === 0) {
    console.error(`[webhook] No cart metadata on PaymentIntent ${intent.id}`);
    return;
  }

  const subtotalCents = parseInt(m.subtotal ?? "0", 10);
  const shippingCents = parseInt(m.shipping ?? "0", 10);
  const taxCents = parseInt(m.tax ?? "0", 10);
  const totalCents = intent.amount;
  const shippingMethod = m.shippingMethod === "express" ? "express" : "standard";

  const email = (m.email ?? intent.receipt_email ?? "").toLowerCase();
  if (!email) {
    console.error(`[webhook] No email on PaymentIntent ${intent.id}`);
    return;
  }

  // Upsert customer
  const customer = await prisma.customer.upsert({
    where: { email },
    update: {
      firstName: m.firstName || undefined,
      lastName: m.lastName || undefined,
      phone: m.phone || undefined,
    },
    create: {
      email,
      firstName: m.firstName || null,
      lastName: m.lastName || null,
      phone: m.phone || null,
    },
  });

  // Pull charge id if present (Stripe v18 puts it on the PaymentIntent latest_charge)
  const chargeId =
    typeof intent.latest_charge === "string"
      ? intent.latest_charge
      : intent.latest_charge?.id ?? null;

  const orderNumber = generateOrderNumber();

  const order = await prisma.order.create({
    data: {
      orderNumber,
      customerId: customer.id,
      stripePaymentIntentId: intent.id,
      stripeChargeId: chargeId,
      subtotalCents,
      shippingCents,
      taxCents,
      totalCents,
      currency: intent.currency,
      shippingMethod,
      shipName: `${m.firstName ?? ""} ${m.lastName ?? ""}`.trim(),
      shipAddress: m.address ?? "",
      shipCity: m.city ?? "",
      shipState: m.state ?? "",
      shipZip: m.zip ?? "",
      shipPhone: m.phone || null,
      items: {
        create: cart.map((c) => ({
          productSlug: c.s,
          productName: c.n,
          unitPriceCents: c.p,
          quantity: c.q,
        })),
      },
    },
    include: { items: true },
  });

  console.log(`[webhook] Saved order ${orderNumber} for ${email}`);

  // Fire emails (don't await failures — log and continue)
  const emailData = {
    orderNumber,
    email,
    firstName: m.firstName ?? "",
    lastName: m.lastName ?? "",
    address: m.address ?? "",
    city: m.city ?? "",
    state: m.state ?? "",
    zip: m.zip ?? "",
    phone: m.phone || undefined,
    shippingMethod,
    subtotalCents,
    shippingCents,
    taxCents,
    totalCents,
    items: order.items.map((i) => ({
      productName: i.productName,
      quantity: i.quantity,
      unitPriceCents: i.unitPriceCents,
    })),
  };

  await Promise.all([
    sendCustomerConfirmation(emailData).catch((e) =>
      console.error("[webhook] customer email failed", e),
    ),
    sendInternalOrderAlert(emailData).catch((e) =>
      console.error("[webhook] internal email failed", e),
    ),
  ]);
}

async function handleChargeRefunded(charge: Stripe.Charge) {
  if (!charge.payment_intent) return;
  const piId =
    typeof charge.payment_intent === "string"
      ? charge.payment_intent
      : charge.payment_intent.id;

  const order = await prisma.order.findUnique({
    where: { stripePaymentIntentId: piId },
  });
  if (!order) return;

  await prisma.order.update({
    where: { id: order.id },
    data: { status: "REFUNDED" },
  });
  console.log(`[webhook] Marked order ${order.orderNumber} as REFUNDED`);
}

export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    console.error("[webhook] STRIPE_WEBHOOK_SECRET not set");
    return NextResponse.json(
      { error: "Webhook secret not configured" },
      { status: 500 },
    );
  }

  const sig = req.headers.get("stripe-signature");
  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const raw = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(raw, sig, secret);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Bad signature";
    console.error("[webhook] signature verify failed", msg);
    return NextResponse.json({ error: msg }, { status: 400 });
  }

  console.log(`[webhook] received event ${event.type} (id=${event.id})`);

  try {
    switch (event.type) {
      case "payment_intent.succeeded":
        await handlePaymentSucceeded(event.data.object as Stripe.PaymentIntent);
        break;
      case "charge.refunded":
        await handleChargeRefunded(event.data.object as Stripe.Charge);
        break;
      default:
        console.log(`[webhook] ignoring event type ${event.type}`);
        break;
    }
    return NextResponse.json({ received: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Handler error";
    const stack = err instanceof Error ? err.stack : undefined;
    console.error(
      `[webhook] ${event.type} handler FAILED:`,
      msg,
      stack ? "\n" + stack : "",
    );
    // Return 500 so Stripe retries — gives us a window to fix and replay.
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
