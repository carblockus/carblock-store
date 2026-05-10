/**
 * Pre-fills the cart from URL search params, used when traffic arrives from
 * Meta Shop "Checkout on website" (Instagram / Facebook).
 *
 * Meta sends a URL like:
 *   /checkout?products=carblock-millonario-150ml:1,wipesblock-interior-60:2&coupon=SAVE10
 *
 * Where:
 *   - `products` is comma-separated entries of `<retailer_id>:<qty>`
 *   - `coupon`  (optional) is a discount code
 *
 * On mount we:
 *   1. Read the params
 *   2. Match each retailer_id against our local product catalog
 *   3. Replace the cart with those items (so it doesn't merge oddly with
 *      whatever the user already had locally)
 *   4. Strip the params from the URL so a refresh doesn't re-hydrate
 */

"use client";

import { useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { products } from "@/lib/mock-products";

export function MetaCartHydrator() {
  const params = useSearchParams();
  const router = useRouter();
  const { add, clear, hydrated } = useCart();
  const ranRef = useRef(false);

  useEffect(() => {
    // Wait for cart hydration so we don't race localStorage replay
    if (!hydrated) return;
    if (ranRef.current) return;

    const productsParam = params.get("products");
    if (!productsParam) return;

    ranRef.current = true;

    // Parse "id1:qty1,id2:qty2"
    const entries = productsParam
      .split(",")
      .map((entry) => {
        const [id, qtyStr] = entry.split(":");
        const qty = Math.max(1, parseInt(qtyStr ?? "1", 10) || 1);
        return { id: id?.trim(), qty };
      })
      .filter((e) => e.id);

    if (entries.length === 0) return;

    // Replace cart entirely so traffic from the Shop starts clean
    clear();

    for (const entry of entries) {
      const product = products.find((p) => p.slug === entry.id);
      if (product) add(product, entry.qty);
    }

    // TODO: wire `coupon` param into the discount system once we have one.
    // For now, just log it so it's visible during testing.
    const coupon = params.get("coupon");
    if (coupon && process.env.NODE_ENV !== "production") {
      console.info("[MetaCartHydrator] coupon (not yet applied):", coupon);
    }

    // Strip the params so a page refresh doesn't re-add items
    router.replace("/checkout");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated]);

  return null;
}
