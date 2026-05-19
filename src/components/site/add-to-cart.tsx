"use client";

import { useState } from "react";
import { ShoppingBag, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import { pixel } from "@/lib/meta-pixel";
import type { Product } from "@/lib/mock-products";
import { AmazonIcon, externalRetailers } from "./external-channels";

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
// 14.29% on 2-pack → $60.00 for a $35 unit (saves $10).
// 19.05% on 3-pack → $85.00 for a $35 unit (saves $20). Steeper than the
// 2-pack to reward bulk buying with a visibly bigger discount badge.
const PACKS = [
  { label: "Single", qty: 1, discount: 0 },
  { label: "2-Pack", qty: 2, discount: 0.1429 },
  { label: "3-Pack", qty: 3, discount: 0.1905 },
] as const;

export function AddToCart({ product }: { product: Product }) {
  const [packIdx, setPackIdx] = useState(0);
  const [added, setAdded] = useState(false);
  const { add } = useCart();
  const pack = PACKS[packIdx];

  const subtotal = product.price * pack.qty;
  const total = +(subtotal * (1 - pack.discount)).toFixed(2);

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
                <span className="text-[10px] mt-0.5 leading-none tabular-nums">
                  ${packTotal.toFixed(2)}
                </span>
                {p.discount > 0 && (
                  <span className="absolute -top-2 right-2 rounded-full bg-[var(--gold)] text-black text-[8px] font-bold px-1.5 py-0.5 leading-none tracking-[0.04em]">
                    -{Math.round(p.discount * 100)}%
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
            Add to Cart — ${total.toFixed(2)}
          </>
        )}
      </Button>

      {/* Secondary option — buy on Amazon. Same height as the primary CTA
          but outline-style. Uses the product's own amazonHref when set
          (each SKU has its own Amazon listing) and falls back to the
          default CarBlock listing otherwise. */}
      <a
        href={product.amazonHref ?? defaultAmazonHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border-strong)] hover:border-[var(--gold)] hover:bg-[var(--gold)]/10 h-12 text-white text-xs uppercase tracking-[0.18em] font-semibold transition-colors"
      >
        <AmazonIcon className="h-5 w-5 shrink-0" />
        <span>Shop on Amazon</span>
      </a>

      <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--muted)] text-center">
        Free shipping on all US orders
      </p>
    </div>
  );
}
