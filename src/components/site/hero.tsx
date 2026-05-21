"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import { HeroSlideshow } from "./hero-slideshow";
import { PrimeBadge, externalRetailers } from "./external-channels";
import { useT } from "@/lib/lang-context";
import type { TranslationKey } from "@/lib/i18n";

const amazonHref = externalRetailers.find((r) => r.label === "Amazon")!.href;

// Desktop nav links. Live in a strip directly below the hero, replacing the
// per-page header menu. Hidden on mobile (hamburger drawer handles it).
const navLinks: { key: TranslationKey; href: string }[] = [
  { key: "nav.shop", href: "/products" },
  { key: "nav.howToUse", href: "/how-to-use" },
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

      {/* Desktop nav strip — sits directly under the navbar logo so the
          primary categories are visible from the very first paint, before
          the hero loads. Hidden on mobile (hamburger drawer handles it). */}
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

      {/* ============================================================
          DESKTOP-ONLY HERO — Chemical Guys-style split (text | photo)

          Layout tuning:
          - Container is wider (1760px cap) with tighter horizontal
            padding so the black side gutters get cut down.
          - Grid columns are intentionally asymmetric (1 / 1.5) so the
            photo gets more real estate than the copy — matches the
            visual weight in the CG reference.
          - Right-side photo frame uses a landscape aspect (4/3) to
            match the source hero images, which are landscape too.
            That eliminates the heavy top/bottom letterbox the old
            portrait frame was producing.
          ============================================================ */}
      <div className="hidden md:block bg-black border-b border-[var(--border)] relative overflow-hidden">
        {/* Subtle gold ambient — three soft radial blurs in the corners
            wash the hero with a warm, premium feel without overpowering
            the copy or the photo. Pointer-events-none so they never
            interfere with clicks. Opacity is kept low (6–10%) per the
            user's note "un aire un poco dorado sin saturar". */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 -left-40 w-[640px] h-[640px] rounded-full bg-[var(--gold)] opacity-[0.10] blur-[140px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 -right-40 w-[720px] h-[720px] rounded-full bg-[var(--gold)] opacity-[0.07] blur-[160px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/2 -translate-y-1/2 left-[40%] w-[520px] h-[520px] rounded-full bg-[var(--gold)] opacity-[0.04] blur-[180px]"
        />

        <div className="relative z-10 container-x md:!max-w-[1760px] md:!px-6 lg:!px-10 pt-4 lg:pt-6 pb-10 lg:pb-14">
          <div className="grid md:grid-cols-[1fr_1.5fr] gap-6 lg:gap-10 items-center">
            {/* LEFT — copy + CTAs + trust */}
            <div className="flex flex-col items-start gap-5 lg:gap-6">
              {/* Eyebrow */}
              <span className="font-display text-gold-gradient text-6xl lg:text-7xl xl:text-8xl font-bold uppercase tracking-[0.06em] leading-[0.85] block origin-bottom [transform:scaleY(1.3)] py-1">
                {t("hero.eyebrow")}
              </span>

              {/* Big subtitle — left-aligned, uppercase, prominent.
                  Each block forces its own line so the phrase reads as
                  two clean rows on desktop:
                    line 1 → IT'S NOT AN AIR FRESHENER,
                    line 2 → IT'S A *PERFUME* FOR YOUR CAR. */}
              <h1 className="text-2xl lg:text-3xl xl:text-4xl leading-tight font-bold uppercase tracking-[0.04em] text-white">
                <span className="block">{t("hero.title.line1")}</span>
                <span className="block">
                  {t("hero.title.line2.before")}{" "}
                  <span className="text-gold-gradient italic">
                    {t("hero.title.line2.highlight")}
                  </span>{" "}
                  {t("hero.title.line2.after")}
                </span>
              </h1>

              {/* UP TO 3 MONTHS pill — bumped a full step bigger so it
                  pulls the eye next to the headline. */}
              <div className="inline-flex items-center gap-2 rounded-full bg-[var(--gold)] shadow-[0_6px_18px_rgba(212,175,55,0.4)] px-8 lg:px-10 py-4 lg:py-5">
                <span className="font-display text-lg lg:text-2xl tracking-[0.16em] uppercase font-extrabold text-black">
                  {t("hero.pill.upto")}{" "}
                  <span className="italic">{t("hero.pill.duration")}</span>{" "}
                  {t("hero.pill.suffix")}
                </span>
              </div>

              {/* CTAs — primary gold pill + Prime Available white pill.
                  Same height & padding so the two read as a paired set. */}
              <div className="mt-2 flex items-center gap-3">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center rounded-full bg-[var(--gold)] hover:bg-[var(--gold-bright)] text-black font-bold tracking-[0.2em] uppercase text-xs lg:text-sm h-12 lg:h-14 px-8 lg:px-10 transition-colors"
                >
                  {t("hero.cta.shop")}
                </Link>
                <a
                  href={amazonHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-col items-center justify-center gap-0.5 rounded-full border border-[var(--border-strong)] hover:border-[var(--gold)] hover:bg-[var(--gold)]/10 bg-white h-12 lg:h-14 px-8 lg:px-10 transition-colors"
                >
                  <PrimeBadge className="h-5 w-auto shrink-0" />
                  <span className="text-[#0F1111] text-[9px] uppercase tracking-[0.22em] font-bold leading-none">
                    {t("howto.cta.shopAmazon")}
                  </span>
                </a>
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

            {/* RIGHT — photo slideshow. Landscape aspect (4/3) matches
                the source hero images so each slide displays in full
                without the portrait frame cropping the sides. */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-black">
              <HeroSlideshow />
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
