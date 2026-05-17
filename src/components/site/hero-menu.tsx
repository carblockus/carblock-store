"use client";

import Link from "next/link";
import { useT } from "@/lib/lang-context";
import type { TranslationKey } from "@/lib/i18n";

const items: { key: TranslationKey; href: string }[] = [
  { key: "nav.shop", href: "/products" },
  { key: "nav.howToUse", href: "/how-to-use" },
  { key: "nav.about", href: "/about" },
  { key: "nav.wholesale", href: "/wholesale" },
];

/**
 * Horizontal text-tab menu that sits directly under the hero banner.
 *
 * Replaces the old in-hero CTA row (Shop Now / Amazon / How it Works).
 * Drift-style: small uppercase labels with a gold underline on hover and
 * generous horizontal spacing. Scrollable on narrow phones so all four
 * items stay readable.
 */
export function HeroMenu() {
  const t = useT();
  return (
    <nav
      aria-label="Primary"
      className="bg-black border-b border-[var(--border)]"
    >
      <div className="container-x">
        <ul className="flex items-center justify-between sm:justify-center gap-4 sm:gap-10 overflow-x-auto py-2 sm:py-3">
          {items.map((it) => (
            <li key={it.href} className="shrink-0">
              <Link
                href={it.href}
                className="block text-[11px] sm:text-xs tracking-[0.22em] uppercase text-white/85 hover:text-[var(--gold)] py-1 border-b-2 border-transparent hover:border-[var(--gold)] transition-colors"
              >
                {t(it.key)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
