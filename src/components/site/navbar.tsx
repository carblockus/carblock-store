"use client";

import Link from "next/link";
import { Search, User, ShoppingBag } from "lucide-react";
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

  return (
    <header className="sticky top-0 z-40 bg-black/85 backdrop-blur border-b border-[var(--border)]">
      <div className="container-x flex h-20 items-center justify-between gap-8">
        <Link href="/" className="text-white shrink-0">
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
            className="p-2 text-white/80 hover:text-[var(--gold)] transition-colors"
          >
            <Search className="h-5 w-5" />
          </button>
          <button
            aria-label="Account"
            className="p-2 text-white/80 hover:text-[var(--gold)] transition-colors"
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
    </header>
  );
}
