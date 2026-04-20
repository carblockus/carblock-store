import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { products } from "@/lib/mock-products";

type ClientItem = { slug: string; qty: number };
type ShippingMethod = "standard" | "express";

/**
 * Creates a Stripe PaymentIntent for the given cart.
 * Prices and shipping are recomputed from the SERVER catalog — never trusts
 * client-side prices.
 */
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      items?: ClientItem[];
      shippingMethod?: ShippingMethod;
    };
    const items = Array.isArray(body.items) ? body.items : [];
    if (items.length === 0) {
      return NextResponse.json({ error: "Empty cart" }, { status: 400 });
    }

    // Recompute total from server catalog (never trust client prices)
    let subtotalCents = 0;
    const lineSummary: { slug: string; name: string; qty: number; price: number }[] = [];
    for (const ci of items) {
      const p = products.find((x) => x.slug === ci.slug);
      if (!p) {
        return NextResponse.json(
          { error: `Unknown product: ${ci.slug}` },
          { status: 400 },
        );
      }
      const qty = Math.max(1, Math.min(20, Math.floor(ci.qty || 1)));
      subtotalCents += Math.round(p.price * 100) * qty;
      lineSummary.push({ slug: p.slug, name: p.name, qty, price: p.price });
    }

    const taxCents = Math.round(subtotalCents * 0.08); // 8% est.
    const shippingCents = body.shippingMethod === "express" ? 1500 : 0;
    const totalCents = subtotalCents + taxCents + shippingCents;

    const intent = await stripe.paymentIntents.create({
      amount: totalCents,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      description: "CarBlock order",
      metadata: {
        cart: JSON.stringify(
          lineSummary.map((l) => `${l.qty}x ${l.slug}`).join(", "),
        ),
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
