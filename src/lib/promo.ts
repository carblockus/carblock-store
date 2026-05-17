/**
 * Stripe Promotion Code helpers.
 *
 * Promotion Codes are the customer-facing strings (e.g. "AMAZON15") that map
 * to a Stripe Coupon (the underlying discount: percent off, amount off, etc.).
 * We never let the client tell us how much to discount — we always resolve
 * the code against Stripe and compute the discount ourselves.
 *
 * Codes are created from the Stripe Dashboard:
 *   Products → Coupons → New coupon (defines the discount)
 *   Then the coupon's "Promotion code" field is what customers redeem.
 */
import { stripe } from "@/lib/stripe";

export type PromoResolved =
  | {
      ok: true;
      /** Stripe promotion_code id (promo_xxx). */
      id: string;
      /** Customer-facing string, normalized to uppercase. */
      code: string;
      /** Discount applied to subtotal, in cents. Already capped at subtotal. */
      discountCents: number;
      /** Human-readable description, e.g. "15% off" or "$5.00 off". */
      label: string;
    }
  | { ok: false; error: string };

/**
 * Look up a promotion code, validate it's redeemable, and compute the discount
 * for a given subtotal. Returns a discriminated union so callers can render
 * either the discount line or an inline error.
 */
export async function resolvePromoCode(
  rawCode: string,
  subtotalCents: number,
): Promise<PromoResolved> {
  const code = rawCode.trim().toUpperCase();
  if (!code) return { ok: false, error: "Enter a code" };
  if (code.length > 50) return { ok: false, error: "Code is too long" };

  let list;
  try {
    list = await stripe.promotionCodes.list({
      code,
      active: true,
      limit: 1,
      expand: ["data.promotion.coupon"],
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Stripe lookup failed";
    console.error("[promo] lookup failed", msg);
    return { ok: false, error: "Could not validate code" };
  }

  const promo = list.data[0];
  if (!promo) return { ok: false, error: "Invalid code" };

  // Hard expiry — Stripe also enforces this server-side when redeeming,
  // but checking here gives the customer a clear error before checkout.
  if (promo.expires_at && promo.expires_at * 1000 < Date.now()) {
    return { ok: false, error: "This code has expired" };
  }

  if (
    promo.max_redemptions != null &&
    promo.times_redeemed >= promo.max_redemptions
  ) {
    return { ok: false, error: "This code is no longer available" };
  }

  // Minimum order requirement (in the smallest currency unit, e.g. cents).
  if (
    promo.restrictions?.minimum_amount != null &&
    subtotalCents < promo.restrictions.minimum_amount
  ) {
    const min = (promo.restrictions.minimum_amount / 100).toFixed(2);
    return { ok: false, error: `Minimum order is $${min}` };
  }

  // `promotion.coupon` may come back as a string id if expand failed. Skip
  // those — we need the full Coupon object to read percent_off / amount_off.
  const coupon = promo.promotion?.coupon;
  if (!coupon || typeof coupon === "string" || !coupon.valid) {
    return { ok: false, error: "This code is no longer valid" };
  }

  let discountCents = 0;
  let label = "";
  if (typeof coupon.percent_off === "number") {
    discountCents = Math.round((subtotalCents * coupon.percent_off) / 100);
    label = `${coupon.percent_off}% off`;
  } else if (typeof coupon.amount_off === "number") {
    discountCents = coupon.amount_off;
    label = `$${(coupon.amount_off / 100).toFixed(2)} off`;
  } else {
    return { ok: false, error: "This code has no discount configured" };
  }

  // Never let the discount exceed the subtotal — otherwise totals go negative.
  if (discountCents > subtotalCents) discountCents = subtotalCents;

  return { ok: true, id: promo.id, code, discountCents, label };
}
