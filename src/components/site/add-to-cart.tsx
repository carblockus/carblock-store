"use client";

import { useState } from "react";
import { ShoppingBag, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuantitySelector } from "./quantity-selector";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@/lib/mock-products";

export function AddToCart({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const { add } = useCart();

  function handleAdd() {
    add(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <QuantitySelector initial={1} onChange={setQty} />
        <span className="font-display text-3xl font-bold text-white">
          ${product.price * qty}
        </span>
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
            Add to Cart — ${product.price * qty}
          </>
        )}
      </Button>

      <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--muted)] text-center">
        Free shipping on all orders
      </p>
    </div>
  );
}
