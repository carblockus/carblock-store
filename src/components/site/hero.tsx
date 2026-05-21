"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import { HeroSlideshow } from "./hero-slideshow";
import { useT } from "@/lib/lang-context";
import type { TranslationKey } from "@/lib/i18n";

// Desktop nav links. Live in a strip directly below the hero, replacing the
// per-page header menu. Hidden on mobile (hamburger drawer handles it).
const navLinks: { key: TranslationKey; href: string }[] = [
  { key: "nav.shop", href: "/products" },
  { key: "nav.howToUse", href: "/how-to-use" },
  { key: "nav.about", href: "/about" },
  { key: "nav.wholesale", href: "/wholesale" },
];

/**
 * Hero — different layouts per breakpoint.
 *
 * MOBILE (`md:hidden`): the original stacked design — black text strip
 * (CARBLOCK eyebrow + subtitle + UP TO 3 MONTHS pill) on top, then the
 * photo slideshow underneath. Untouched on purpose; mobile is fine.
 *
 * DESKTOP (`hidden md:flex`): two-column "Chemical Guys-style" split.
 *   Left column  — eyebrow, big subtitle, pill, two CTAs (Shop Now /
 *                  Learn More), star rating + trust signal.
 *   Right column — the same photo slideshow, framed as a tall portrait
 *                  banner that mirrors the typical retail hero shot.
 *
 * After the hero, a thin nav strip carries the SHOP / HOW TO USE /
 * ABOUT / WHOLESALE links across the page. The site-wide navbar stays
 * icon-only on desktop so the centered logo dominates.
 */
export function Hero() {
  const t = useT();

  return (
    <>
      {/* ============================================================
          MOBILE-ONLY HERO — current stacked design, do NOT touch.
          ============================================================ */}
      <div className="md:hidden">
        {/* Top text strip */}
        <div className="bg-black border-b border-[var(--border)]">
          <div className="container-x py-3 max-w-4xl mx-auto text-center">
            <span className="font-display text-gold-gradient text-[2rem] font-bold uppercase tracking-[0.06em] leading-none block origin-bottom [transform:scaleY(1.35)] py-2">
              {t("hero.eyebrow")}
            </span>
            <h1 className="mt-1.5 text-[10px] leading-snug font-semibold uppercase tracking-[0.08em] text-white whitespace-nowrap">
              {t("hero.title.line1")}{" "}
              {t("hero.title.line2.before")}{" "}
              <span className="text-gold-gradient italic font-semibold">
                {t("hero.title.line2.highlight")}
              </span>{" "}
              {t("hero.title.line2.after")}
            </h1>
            <div className="mt-2.5 inline-flex items-center gap-2 rounded-full bg-[var(--gold)] shadow-[0_4px_14px_rgba(212,175,55,0.35)] px-4 py-1.5">
              <span className="font-display text-[11px] tracking-[0.16em] uppercase font-extrabold text-black">
                {t("hero.pill.upto")}{" "}
                <span className="italic">{t("hero.pill.duration")}</span>{" "}
                {t("hero.pill.suffix")}
              </span>
            </div>
          </div>
        </div>

        {/* Photo banner */}
        <div className="bg-black">
          <section className="relative overflow-hidden bg-black aspect-[4/3]">
            <HeroSlideshow />
          </section>
        </div>
      </div>

      {/* ============================================================
          DESKTOP-ONLY HERO — Chemical Guys-style split (text | photo)
          ============================================================ */}
      <div className="hidden md:block bg-black border-b border-[var(--border)]">
        <div className="container-x md:!max-w-[1600px] py-12 lg:py-16">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* LEFT — copy + CTAs + trust */}
            <div className="flex flex-col items-start gap-5 lg:gap-6">
              {/* Eyebrow */}
              <span className="font-display text-gold-gradient text-6xl lg:text-7xl xl:text-8xl font-bold uppercase tracking-[0.06em] leading-[0.85] block origin-bottom [transform:scaleY(1.3)] py-1">
                {t("hero.eyebrow")}
              </span>

              {/* Big subtitle — left-aligned, uppercase, prominent */}
              <h1 className="text-2xl lg:text-3xl xl:text-4xl leading-tight font-bold uppercase tracking-[0.04em] text-white">
                {t("hero.title.line1")}{" "}
                {t("hero.title.line2.before")}{" "}
                <span className="text-gold-gradient italic">
                  {t("hero.title.line2.highlight")}
                </span>{" "}
                {t("hero.title.line2.after")}
              </h1>

              {/* UP TO 3 MONTHS pill */}
              <div className="inline-flex items-center gap-2 rounded-full bg-[var(--gold)] shadow-[0_4px_14px_rgba(212,175,55,0.35)] px-6 lg:px-8 py-3 lg:py-3.5">
                <span className="font-display text-base lg:text-lg tracking-[0.16em] uppercase font-extrabold text-black">
                  {t("hero.pill.upto")}{" "}
                  <span className="italic">{t("hero.pill.duration")}</span>{" "}
                  {t("hero.pill.suffix")}
                </span>
              </div>

              {/* CTAs — primary gold + outline secondary, Chemical Guys-style */}
              <div className="mt-2 flex items-center gap-3">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center rounded-full bg-[var(--gold)] hover:bg-[var(--gold-bright)] text-black font-bold tracking-[0.2em] uppercase text-xs lg:text-sm h-12 lg:h-14 px-8 lg:px-10 transition-colors"
                >
                  {t("hero.cta.shop")}
                </Link>
                <Link
                  href="/how-to-use"
                  className="inline-flex items-center justify-center rounded-full border-2 border-white/30 hover:border-[var(--gold)] hover:text-[var(--gold)] text-white font-bold tracking-[0.2em] uppercase text-xs lg:text-sm h-12 lg:h-14 px-8 lg:px-10 transition-colors"
                >
                  {t("hero.cta.learnMore")}
                </Link>
              </div>

              {/* Trust signal — 5 gold stars + line of copy */}
              <div className="flex items-center gap-3 mt-1">
                <div className="flex gap-0.5">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 lg:h-[18px] lg:w-[18px] fill-[var(--gold)] text-[var(--gold)]"
                    />
                  ))}
                </div>
                <span className="text-[10px] lg:text-[11px] tracking-[0.22em] uppercase text-white/80 font-semibold">
                  {t("hero.trust.text")}
                </span>
              </div>
            </div>

            {/* RIGHT — photo slideshow */}
            <div className="relative aspect-[4/5] lg:aspect-[5/6] overflow-hidden rounded-lg bg-black">
              <HeroSlideshow />
            </div>
          </div>
        </div>
      </div>

      {/* Desktop nav strip — sits right under the split hero so the
          primary categories are reachable without scrolling. Hidden on
          mobile (hamburger drawer handles navigation there). */}
      <div className="hidden md:block bg-black border-b border-[var(--border)]">
        <nav className="container-x flex justify-center items-center gap-10 lg:gap-16 py-3 lg:py-4">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[11px] lg:text-[13px] tracking-[0.28em] uppercase text-white/85 hover:text-[var(--gold)] transition-colors font-semibold"
            >
              {t(l.key)}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
