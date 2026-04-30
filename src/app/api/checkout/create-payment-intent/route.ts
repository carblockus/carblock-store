import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { products } from "@/lib/mock-products";

type ClientItem = { slug: string; qty: number };
type ShippingMethod = "standard" | "express";
type Shipping = {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone?: string;
};

const MAX_META = 480; // Stripe metadata value soft limit (500 chars)

function shorten(s: string, n: number) {
  return s.length > n ? s.slice(0, n - 1) + "…" : s;
}

/**
 * Creates a Stripe PaymentIntent for the given cart.
 * Prices and shipping are recomputed from the SERVER catalog — never trusts
 * client-side prices. Customer + shipping are stored as metadata so the
 * Stripe webhook can persist a full Order to our DB on payment_intent.succeeded.
 */
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      items?: ClientItem[];
      shippingMethod?: ShippingMethod;
      shipping?: Shipping;
    };
    const items = Array.isArray(body.items) ? body.items : [];
    if (items.length === 0) {
      return NextResponse.json({ error: "Empty cart" }, { status: 400 });
    }

    // Recompute total from server catalog (never trust client prices)
    let subtotalCents = 0;
    const lineSummary: { slug: string; name: string; qty: number; priceCents: number }[] = [];
    for (const ci of items) {
      const p = products.find((x) => x.slug === ci.slug);
      if (!p) {
        return NextResponse.json(
          { error: `Unknown product: ${ci.slug}` },
          { status: 400 },
        );
      }
      const qty = Math.max(1, Math.min(20, Math.floor(ci.qty || 1)));
      const priceCents = Math.round(p.price * 100);
      subtotalCents += priceCents * qty;
      lineSummary.push({ slug: p.slug, name: p.name, qty, priceCents });
    }

    const taxCents = Math.round(subtotalCents * 0.08); // 8% est.
    const shippingMethod: ShippingMethod =
      body.shippingMethod === "express" ? "express" : "standard";
    const shippingCents = shippingMethod === "express" ? 1500 : 0;
    const totalCents = subtotalCents + taxCents + shippingCents;

    // Pack items into a compact JSON string we can re-parse server-side.
    // Stripe metadata values are limited to ~500 chars per key.
    const cartJson = shorten(
      JSON.stringify(
        lineSummary.map((l) => ({
          s: l.slug,
          n: l.name,
          q: l.qty,
          p: l.priceCents,
        })),
      ),
      MAX_META,
    );

    const ship = body.shipping ?? {
      email: "",
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      state: "",
      zip: "",
    };

    const intent = await stripe.paymentIntents.create({
      amount: totalCents,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      description: `CarBlock order — ${lineSummary.reduce((n, l) => n + l.qty, 0)} item(s)`,
      receipt_email: ship.email || undefined,
      metadata: {
        cart: cartJson,
        subtotal: String(subtotalCents),
        shipping: String(shippingCents),
        tax: String(taxCents),
        shippingMethod,
        email: shorten(ship.email, MAX_META),
        firstName: shorten(ship.firstName, MAX_META),
        lastName: shorten(ship.lastName, MAX_META),
        address: shorten(ship.address, MAX_META),
        city: shorten(ship.city, MAX_META),
        state: shorten(ship.state, MAX_META),
        zip: shorten(ship.zip, MAX_META),
        phone: shorten(ship.phone ?? "", MAX_META),
      },
    });

    return NextResponse.json({
      clientSecret: intent.client_secret,
      amount: totalCents,
      subtotal: subtotalCents,
      tax: taxCents,
      shipping: shippingCents,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.error("[create-payment-intent]", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
