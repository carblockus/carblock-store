"use client";

import { useState } from "react";
import Link from "next/link";
import { User, ShoppingCart, Menu, X } from "lucide-react";
import { Logo } from "./logo";
import { useCart } from "@/lib/cart-context";
import { useT } from "@/lib/lang-context";
import type { TranslationKey } from "@/lib/i18n";
import { AmazonIcon, externalRetailers } from "./external-channels";

const amazonHref = externalRetailers.find((r) => r.label === "Amazon")!.href;

const navLinks: { key: TranslationKey; href: string }[] = [
  { key: "nav.shop", href: "/products" },
  { key: "nav.howToUse", href: "/how-to-use" },
  { key: "nav.wholesale", href: "/wholesale" },
];

export function Navbar() {
  const { count, setOpen } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = useT();

  return (
    <header className="relative z-40 bg-black border-b border-[var(--border)]">
      {/* Single row — mobile: hamburger | centered-logo | cart
                   desktop: nav-links | centered-logo | icons.
          Navbar height grows on desktop so the doubled-size logo has
          headroom; mobile h-16 stays exactly as before. */}
      <div className="container-x relative flex h-16 md:h-40 lg:h-48 items-center">

        {/* LEFT slot */}
        <div className="flex-1 flex items-center">
          {/* Mobile hamburger */}
          <button
            aria-label={t("nav.openMenu")}
            onClick={() => setMobileOpen(true)}
            className="md:hidden p-2 -ml-2 text-white/80 hover:text-[var(--gold)] transition-colors"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Desktop nav links live in the hero strip (between text and banner).
              Nothing extra needed here — left slot is intentionally empty
              on desktop so the logo stays centered. */}
        </div>

        {/* CENTER — absolutely positioned so it stays perfectly centered
            regardless of how wide the left/right slots are. */}
        <Link
          href="/"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white"
          onClick={() => setMobileOpen(false)}
        >
          {/* Desktop logo doubled in size (md 64→128, lg 80→160).
              Mobile stays at the original 52px height. */}
          <Logo imgClassName="h-[52px] md:h-32 lg:h-40" />
        </Link>

        {/* RIGHT slot. Icons get a 2x bump on desktop (md+) so they
            balance the doubled-size logo. Mobile sizes (h-5, h-7) stay
            exactly as before — the md: prefixes are additive only. */}
        <div className="flex-1 flex items-center justify-end gap-1 md:gap-3">
          <button
            aria-label={t("nav.account")}
            className="hidden md:inline-flex p-2 md:p-3 text-white/80 hover:text-[var(--gold)] transition-colors"
          >
            <User className="h-5 w-5 md:h-10 md:w-10" />
          </button>
          {/* Quick shortcut to the Amazon listing */}
          <a
            href={amazonHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Shop on Amazon"
            className="p-1.5 md:p-3 text-white/85 hover:text-[var(--gold)] transition-colors"
          >
            <AmazonIcon className="h-7 w-7 md:h-14 md:w-14" />
          </a>
          <button
            aria-label={t("nav.cart")}
            onClick={() => setOpen(true)}
            className="relative p-2 md:p-3 text-white/80 hover:text-[var(--gold)] transition-colors"
          >
            <ShoppingCart className="h-5 w-5 md:h-10 md:w-10" />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 md:-top-1 md:-right-1 min-w-[18px] h-[18px] md:min-w-[26px] md:h-[26px] px-1 md:px-1.5 rounded-full bg-[var(--gold)] text-black text-[10px] md:text-[14px] font-bold flex items-center justify-center">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile drawer — unchanged */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-black"
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="container-x flex h-16 items-center justify-between border-b border-[var(--border)]"
            onClick={(e) => e.stopPropagation()}
          >
            <Logo />
            <button
              aria-label={t("nav.closeMenu")}
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
                {t(l.key)}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="block py-4 text-base tracking-[0.18em] uppercase text-white border-b border-[var(--border)] hover:text-[var(--gold)] transition-colors"
            >
              {t("nav.contact")}
            </Link>
            <div className="flex gap-3 mt-6">
              <Link
                href="/products"
                onClick={() => setMobileOpen(false)}
                className="flex-1 text-center rounded-full bg-[var(--gold)] hover:bg-[var(--gold-bright)] text-black font-semibold tracking-[0.18em] uppercase text-xs h-12 leading-[3rem] transition-colors"
              >
                {t("hero.cta.shop")}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
