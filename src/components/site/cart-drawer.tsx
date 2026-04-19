"use client";

import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";

const FREE_SHIPPING_THRESHOLD = 0; // already free on all orders

export function CartDrawer() {
  const { items, count, subtotal, open, setOpen, remove, setQty } = useCart();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        side="right"
        className="bg-black border-[var(--border-strong)] text-white w-full sm:max-w-md p-0 flex flex-col"
      >
        <SheetHeader className="border-b border-[var(--border)] p-6">
          <SheetTitle className="font-display text-xl uppercase tracking-[0.18em] text-white flex items-center justify-between">
            <span>Your Cart</span>
            <span className="text-[var(--gold)] text-sm">
              {count} {count === 1 ? "item" : "items"}
            </span>
          </SheetTitle>
          <SheetDescription className="sr-only">
            Items currently in your shopping cart
          </SheetDescription>
        </SheetHeader>

        {/* Empty state */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center gap-4">
            <div className="h-16 w-16 rounded-full bg-[var(--surface)] grid place-items-center">
              <ShoppingBag className="h-7 w-7 text-[var(--gold)]" />
            </div>
            <div>
              <p className="font-display uppercase tracking-[0.18em] text-white">
                Your cart is empty
              </p>
              <p className="text-sm text-[var(--muted)] mt-2 max-w-xs">
                Add CarBlock or WipesBlock to start.
              </p>
            </div>
            <Button
              onClick={() => setOpen(false)}
              asChild
              className="rounded-full bg-[var(--gold)] hover:bg-[var(--gold-bright)] text-black font-semibold tracking-[0.18em] uppercase text-xs px-8 h-11 mt-2"
            >
              <Link href="/products">Shop now</Link>
            </Button>
          </div>
        ) : (
          <>
            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.map((item) => (
                <article
                  key={item.slug}
                  className="flex gap-4 pb-4 border-b border-[var(--border)] last:border-0"
                >
                  <Link
                    href={`/products/${item.slug}`}
                    onClick={() => setOpen(false)}
                    className="relative h-24 w-24 shrink-0 overflow-hidden rounded-md bg-[var(--surface)] border border-[var(--border)]"
                  >
                    <div
                      className="absolute inset-0 bg-center bg-no-repeat"
                      style={{
                        backgroundImage: `url('${item.image}')`,
                        backgroundSize:
                          item.category === "bundle" ? "contain" : "cover",
                      }}
                    />
                  </Link>
                  <div className="flex-1 min-w-0 flex flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <Link
                        href={`/products/${item.slug}`}
                        onClick={() => setOpen(false)}
                        className="text-sm font-medium text-white hover:text-[var(--gold)] transition-colors line-clamp-2"
                      >
                        {item.name}
                      </Link>
                      <button
                        type="button"
                        aria-label="Remove"
                        onClick={() => remove(item.slug)}
                        className="text-[var(--muted)] hover:text-red-400 shrink-0 p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="inline-flex items-center border border-[var(--border-strong)] rounded-full">
                        <button
                          aria-label="Decrease"
                          onClick={() => setQty(item.slug, item.qty - 1)}
                          className="h-8 w-8 grid place-items-center text-white/80 hover:text-white"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm font-semibold tabular-nums">
                          {item.qty}
                        </span>
                        <button
                          aria-label="Increase"
                          onClick={() => setQty(item.slug, item.qty + 1)}
                          className="h-8 w-8 grid place-items-center text-white/80 hover:text-white"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <span className="text-sm font-semibold text-white tabular-nums">
                        ${item.qty * item.price}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Footer / totals */}
            <div className="border-t border-[var(--border)] p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
                  Subtotal
                </span>
                <span className="font-display text-2xl font-bold text-white tabular-nums">
                  ${subtotal}
                </span>
              </div>
              {subtotal >= FREE_SHIPPING_THRESHOLD && (
                <p className="text-[10px] tracking-[0.22em] uppercase text-[var(--gold)] text-center">
                  ★ Free shipping included
                </p>
              )}
              <Button
                asChild
                onClick={() => setOpen(false)}
                className="w-full rounded-full bg-[var(--gold)] hover:bg-[var(--gold-bright)] text-black font-semibold tracking-[0.18em] uppercase text-xs h-12"
              >
                <Link href="/checkout">Checkout</Link>
              </Button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="w-full text-[10px] tracking-[0.3em] uppercase text-[var(--muted)] hover:text-white transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
