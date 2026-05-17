/**
 * POST /api/subscribe-checkout
 *
 * Creates a Stripe Checkout Session in subscription mode for the
 * "Subscribe & Save 20% — delivered every 6 weeks" flow. Returns the
 * Stripe-hosted checkout URL — the client redirects to it, the customer
 * enters their card on Stripe, and Stripe handles the recurring charges
 * automatically every 6 weeks until they cancel.
 *
 * Stripe needs a pre-existing Price (you can't use price_data inline for
 * subscriptions). We lazily look up / create one per product using
 * lookup_keys so the operation is idempotent — first request creates the
 * Product + Price, subsequent requests reuse them.
 *
 * The 20% recurring discount is applied via a Stripe Coupon (lookup_key
 * "subscribe_save_20") with duration=forever, so it applies to every
 * renewal, not just the first charge. The coupon is also lazily created.
 *
 * After a successful checkout the Stripe webhook (checkout.session.completed
 * with mode='subscription') persists the Subscription row to our DB.
 */
import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { products } from "@/lib/mock-products";

const COUPON_LOOKUP = "subscribe_save_20";
const COUPON_PERCENT_OFF = 20;
const INTERVAL_WEEKS = 6;

type Body = {
  productSlug?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  phone?: string;
};

/** Look up an existing Coupon by id, or create it if missing. */
async function ensureCoupon(): Promise<Stripe.Coupon> {
  try {
    return await stripe.coupons.retrieve(COUPON_LOOKUP);
  } catch {
    return await stripe.coupons.create({
      id: COUPON_LOOKUP,
      percent_off: COUPON_PERCENT_OFF,
      duration: "forever",
      name: "Subscribe & Save 20%",
    });
  }
}

/** Look up a recurring Price for the given product, or create it. */
async function ensureSubscriptionPrice(
  slug: string,
  name: string,
  amountCents: number,
): Promise<Stripe.Price> {
  const lookupKey = `sub_${slug}_${INTERVAL_WEEKS}w`;
  const existing = await stripe.prices.list({
    lookup_keys: [lookupKey],
    active: true,
    limit: 1,
    expand: ["data.product"],
  });
  if (existing.data[0]) return existing.data[0];

  // Find or create the Product first
  const productList = await stripe.products.search({
    query: `metadata['slug']:'${slug}' AND active:'true'`,
    limit: 1,
  });
  const product =
    productList.data[0] ??
    (await stripe.products.create({
      name: `${name} — Subscribe & Save`,
      metadata: { slug, kind: "subscription" },
    }));

  return await stripe.prices.create({
    product: product.id,
    unit_amount: amountCents,
    currency: "usd",
    recurring: { interval: "week", interval_count: INTERVAL_WEEKS },
    lookup_key: lookupKey,
    metadata: { slug },
  });
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body;
    if (!body.productSlug) {
      return NextResponse.json(
        { error: "Missing productSlug" },
        { status: 400 },
      );
    }
    if (!body.email || !body.firstName || !body.lastName) {
      return NextResponse.json(
        { error: "Missing required customer info" },
        { status: 400 },
      );
    }
    const product = products.find((p) => p.slug === body.productSlug);
    if (!product) {
      return NextResponse.json(
        { error: `Unknown product: ${body.productSlug}` },
        { status: 400 },
      );
    }

    const [coupon, price] = await Promise.all([
      ensureCoupon(),
      ensureSubscriptionPrice(
        product.slug,
        product.name,
        Math.round(product.price * 100),
      ),
    ]);

    const origin =
      req.headers.get("origin") ??
      `https://${req.headers.get("host") ?? "carblock.us"}`;

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: price.id, quantity: 1 }],
      discounts: [{ coupon: coupon.id }],
      customer_email: body.email,
      success_url: `${origin}/subscribe-and-save/thanks?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/subscribe-and-save?canceled=1`,
      subscription_data: {
        metadata: {
          productSlug: product.slug,
          firstName: body.firstName,
          lastName: body.lastName,
          address: body.address ?? "",
          city: body.city ?? "",
          state: body.state ?? "",
          zip: body.zip ?? "",
          phone: body.phone ?? "",
        },
      },
      // Collect shipping on Stripe's side so we don't need to re-validate
      // address fields here; we also stash a snapshot in subscription
      // metadata above for our own records.
      shipping_address_collection: { allowed_countries: ["US"] },
      billing_address_collection: "auto",
      allow_promotion_codes: false,
    });

    return NextResponse.json({ url: session.url, sessionId: session.id });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.error("[subscribe-checkout]", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
