"use client";

import { useState } from "react";
import { ShoppingBag, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import { pixel } from "@/lib/meta-pixel";
import type { Product } from "@/lib/mock-products";
import { PrimeBadge, externalRetailers } from "./external-channels";

const defaultAmazonHref = externalRetailers.find((r) => r.label === "Amazon")!.href;

/**
 * Pack sizes the customer can choose from. Multi-bottle packs get a small
 * automatic discount applied at the cart level so the perceived value goes
 * up the more they buy, without us having to maintain separate products.
 *
 *   single → 1 unit, full price
 *   2-pack → 2 units, 5% off the total
 *   3-pack → 3 units, 10% off the total
 *
 * Discounts here are illustrative — they apply on add-to-cart by inserting
 * `qty` copies of the same product; the per-unit price shown reflects the
 * effective unit cost after the discount.
 */
// Promo pricing (unit = $30 sale price, set in mock-products.ts):
//   2-pack → $50.00  (2 × $30 = $60 base, saves $10 → 16.67% off)
//   3-pack → $70.00  (3 × $30 = $90 base, saves $20 → 22.22% off)
// Steeper discount on the 3-pack rewards bulk buying with a visibly
// bigger savings badge.
const PACKS = [
  { label: "Single", qty: 1, discount: 0 },
  { label: "2-Pack", qty: 2, discount: 0.1667 },
  { label: "3-Pack", qty: 3, discount: 0.2222 },
] as const;

export function AddToCart({ product }: { product: Product }) {
  const [packIdx, setPackIdx] = useState(0);
  const [added, setAdded] = useState(false);
  const { add } = useCart();
  const pack = PACKS[packIdx];

  const subtotal = product.price * pack.qty;
  const total = +(subtotal * (1 - pack.discount)).toFixed(2);
  // Compare-at totals — original (pre-promo) regular price × qty so the
  // strikethrough next to each price shows the full "was" amount. Falls
  // back to product.price when the product has no promo.
  const unitOriginal = product.originalPrice ?? product.price;
  const originalTotal = +(unitOriginal * pack.qty).toFixed(2);
  const hasPromo = unitOriginal > product.price;

  function handleAdd() {
    add(product, pack.qty);
    pixel.addToCart({
      id: product.slug,
      name: product.name,
      category: product.category,
      price: product.price,
      qty: pack.qty,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--muted)] mb-2">
          Select your pack
        </p>
        <div className="grid grid-cols-3 gap-2">
          {PACKS.map((p, i) => {
            const active = i === packIdx;
            const packSubtotal = product.price * p.qty;
            const packTotal = +(packSubtotal * (1 - p.discount)).toFixed(2);
            // Pre-promo total for this pack — used for the strikethrough.
            const packOriginalTotal = +(unitOriginal * p.qty).toFixed(2);
            // Combined discount % (promo + pack discount) shown on the badge,
            // so the savings reflect the FULL difference from $35-base, not
            // just the pack discount applied to the already-discounted price.
            const fullDiscountPct = hasPromo
              ? Math.round((1 - packTotal / packOriginalTotal) * 100)
              : Math.round(p.discount * 100);
            return (
              <button
                key={p.label}
                type="button"
                onClick={() => setPackIdx(i)}
                className={`relative rounded-full border h-12 flex flex-col items-center justify-center transition-colors ${
                  active
                    ? "border-[var(--gold)] bg-[var(--gold)]/15 text-white"
                    : "border-[var(--border-strong)] bg-black/40 text-[var(--muted)] hover:border-[var(--gold)]/60"
                }`}
              >
                <span className="text-[11px] uppercase tracking-[0.16em] font-bold leading-none">
                  {p.label.toUpperCase()}
                </span>
                <span className="mt-0.5 leading-none tabular-nums flex items-baseline gap-1">
                  {hasPromo && (
                    <span className="text-[9px] line-through opacity-60">
                      ${packOriginalTotal.toFixed(0)}
                    </span>
                  )}
                  <span className="text-[10px] font-semibold">
                    ${packTotal.toFixed(2)}
                  </span>
                </span>
                {fullDiscountPct > 0 && (
                  <span className="absolute -top-2 right-2 rounded-full bg-[var(--gold)] text-black text-[8px] font-bold px-1.5 py-0.5 leading-none tracking-[0.04em]">
                    -{fullDiscountPct}%
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <Button
        size="lg"
        onClick={handleAdd}
        className={`rounded-full h-14 text-sm uppercase tracking-[0.2em] font-semibold transition-all ${
          added
            ? "bg-green-600 hover:bg-green-600 text-white"
            : "bg-[var(--gold)] hover:bg-[var(--gold-bright)] text-black"
        }`}
      >
        {added ? (
          <>
            <Check className="h-5 w-5 mr-2" />
            Added to Cart
          </>
        ) : (
          <>
            <ShoppingBag className="h-5 w-5 mr-2" />
            <span>Add to Cart —</span>
            {hasPromo && (
              <span className="ml-2 line-through opacity-60 font-normal">
                ${originalTotal.toFixed(0)}
              </span>
            )}
            <span className="ml-1">${total.toFixed(2)}</span>
          </>
        )}
      </Button>

      {/* Secondary option — Prime Available CTA. Same height as the
          primary CTA but white-pill outline style with the blue
          checkmark "prime" lockup, signaling the listing is fulfilled
          by Prime. Uses the product's own amazonHref when set, falls
          back to the default CarBlock listing otherwise. */}
      <a
        href={product.amazonHref ?? defaultAmazonHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex flex-col items-center justify-center gap-0.5 rounded-full border border-[var(--border-strong)] hover:border-[var(--gold)] hover:bg-[var(--gold)]/10 h-14 bg-white transition-colors px-6"
      >
        <PrimeBadge className="h-5 w-auto shrink-0" />
        <span className="text-[#0F1111] text-[9px] uppercase tracking-[0.22em] font-bold leading-none">Available</span>
      </a>

      <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--muted)] text-center">
        Free shipping on all US orders
      </p>
    </div>
  );
}
