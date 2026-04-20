"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, User, ShoppingBag, Menu, X } from "lucide-react";
import { Logo } from "./logo";
import { useCart } from "@/lib/cart-context";

const navLinks = [
  { label: "Shop", href: "/products" },
  { label: "CarBlock", href: "/products?category=perfume" },
  { label: "Wipes", href: "/products?category=wipes" },
  { label: "Bundles", href: "/products?category=bundle" },
  { label: "About", href: "/about" },
];

export function Navbar() {
  const { count, setOpen } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-black/85 backdrop-blur border-b border-[var(--border)]">
      <div className="container-x flex h-20 items-center justify-between gap-4 md:gap-8">
        {/* Mobile hamburger */}
        <button
          aria-label="Open menu"
          onClick={() => setMobileOpen(true)}
          className="md:hidden p-2 -ml-2 text-white/80 hover:text-[var(--gold)] transition-colors"
        >
          <Menu className="h-5 w-5" />
        </button>

        <Link
          href="/"
          className="text-white shrink-0"
          onClick={() => setMobileOpen(false)}
        >
          <Logo />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[11px] tracking-[0.22em] uppercase text-white/80 hover:text-[var(--gold)] transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <button
            aria-label="Search"
            className="hidden md:inline-flex p-2 text-white/80 hover:text-[var(--gold)] transition-colors"
          >
            <Search className="h-5 w-5" />
          </button>
          <button
            aria-label="Account"
            className="hidden md:inline-flex p-2 text-white/80 hover:text-[var(--gold)] transition-colors"
          >
            <User className="h-5 w-5" />
          </button>
          <button
            aria-label="Cart"
            onClick={() => setOpen(true)}
            className="relative p-2 text-white/80 hover:text-[var(--gold)] transition-colors"
          >
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[var(--gold)] text-black text-[10px] font-bold flex items-center justify-center">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-black"
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="container-x flex h-20 items-center justify-between border-b border-[var(--border)]"
            onClick={(e) => e.stopPropagation()}
          >
            <Logo />
            <button
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
              className="p-2 -mr-2 text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav
            className="container-x py-8 flex flex-col gap-1"
            onClick={(e) => e.stopPropagation()}
          >
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="block py-4 text-base tracking-[0.18em] uppercase text-white border-b border-[var(--border)] hover:text-[var(--gold)] transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="block py-4 text-base tracking-[0.18em] uppercase text-white border-b border-[var(--border)] hover:text-[var(--gold)] transition-colors"
            >
              Contact
            </Link>
            <div className="flex gap-3 mt-6">
              <Link
                href="/products"
                onClick={() => setMobileOpen(false)}
                className="flex-1 text-center rounded-full bg-[var(--gold)] hover:bg-[var(--gold-bright)] text-black font-semibold tracking-[0.18em] uppercase text-xs h-12 leading-[3rem] transition-colors"
              >
                Shop Now
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
