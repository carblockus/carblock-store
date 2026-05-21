"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Stats } from "@/components/site/stats";
import {
  PrimeBadge,
  externalRetailers,
} from "@/components/site/external-channels";
import { useT } from "@/lib/lang-context";

const amazonHref = externalRetailers.find((r) => r.label === "Amazon")!.href;

/**
 * /how-to-use — slim version after the user deleted the page hero,
 * the HowToUse video block and the Spanish YouTube tutorial section.
 *
 * What remains: breadcrumb → Stats (How to Apply with TECHNIQUE 1+2
 * cards + 25/25/50 distribution) → bottom CTA with the three buttons.
 *
 * The HowToUse component still ships — it just doesn't render here.
 * It's used on the CarBlock perfume product detail page.
 */
export default function HowToUsePage() {
  const t = useT();

  return (
    <div className="bg-background">
      {/* Breadcrumb */}
      <div className="border-b border-[var(--border)]">
        <div className="container-x py-4 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
          <Link href="/" className="hover:text-[var(--gold)] transition-colors">
            {t("howto.breadcrumb.home")}
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-white">{t("howto.breadcrumb.current")}</span>
        </div>
      </div>

      {/* Tutorial videos — 3-card grid: CarBlock English, CarBlock
          Spanish, WipesBlock demo. Stacks on mobile, 3 across on
          desktop. Each video is HTML5 with controls; .mov source is
          served with both video/mp4 and video/quicktime types for
          browser compatibility. */}
      <section className="container-x md:!max-w-[1500px] py-12 md:py-20 lg:py-24">
        <div className="text-center mb-8 md:mb-12 lg:mb-14 max-w-3xl mx-auto">
          <span className="text-[11px] md:text-sm lg:text-base tracking-[0.3em] uppercase text-[var(--gold)] font-bold">
            {t("howto.videos.eyebrow")}
          </span>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl uppercase font-bold mt-3 md:mt-5 text-white leading-tight">
            {t("howto.videos.title.before")}{" "}
            <span className="text-gold-gradient italic">
              {t("howto.videos.title.highlight")}
            </span>
          </h2>
        </div>

        <div className="grid gap-6 md:gap-8 lg:gap-10 md:grid-cols-3">
          {[
            {
              src: "/products/carblock-tutorial-en.mov",
              label: t("howto.videos.carblockEn.label"),
              sub: t("howto.videos.carblockEn.sub"),
            },
            {
              src: "/products/carblock-tutorial-es.mov",
              label: t("howto.videos.carblockEs.label"),
              sub: t("howto.videos.carblockEs.sub"),
            },
            {
              src: "/products/wipesblock-tutorial.mov",
              label: t("howto.videos.wipes.label"),
              sub: t("howto.videos.wipes.sub"),
            },
          ].map((v) => (
            <div key={v.src} className="flex flex-col gap-3 md:gap-4">
              <div className="relative aspect-[9/16] overflow-hidden rounded-lg bg-black border border-[var(--border)]">
                <video
                  controls
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 w-full h-full object-cover"
                >
                  {/* Dual <source> so browsers that recognize quicktime
                      can pick that, and the rest fall back to video/mp4. */}
                  <source src={v.src} type="video/mp4" />
                  <source src={v.src} type="video/quicktime" />
                </video>
              </div>
              <div className="text-center">
                <p className="font-display text-base md:text-lg lg:text-xl uppercase tracking-[0.14em] text-white font-bold">
                  {v.label}
                </p>
                <p className="mt-1 md:mt-2 text-xs md:text-sm text-[var(--muted)] leading-relaxed">
                  {v.sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats — How to Apply + Technique cards + 25/25/50 distribution */}
      <Stats />

      {/* CTA — desktop scale-up so the eyebrow, the big title and the
          subheadline match the visual weight of the rest of the page. */}
      <section className="container-x py-16 md:py-24 lg:py-28 max-w-3xl md:!max-w-5xl text-center">
        <span className="text-[11px] md:text-sm lg:text-base tracking-[0.3em] uppercase text-[var(--gold)] font-bold">
          {t("howto.cta.eyebrow")}
        </span>
        <h2 className="font-display text-3xl md:text-6xl lg:text-7xl uppercase font-bold mt-3 md:mt-5 text-white leading-tight">
          {t("howto.cta.title.before")}{" "}
          <span className="text-gold-gradient">
            {t("howto.cta.title.highlight")}
          </span>
        </h2>
        <p className="mt-4 md:mt-6 text-base md:text-xl lg:text-2xl text-[var(--muted)]">
          {t("howto.cta.body")}
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center items-center">
          {/* All three CTAs share the same height (h-14 md:h-16) and
              padding so they read as a paired set. Plain <a>/<Link>
              instead of the shadcn Button on every one — gives us
              consistent control over the dimensions. */}
          <Link
            href="/products"
            className="inline-flex items-center justify-center rounded-full bg-[var(--gold)] hover:bg-[var(--gold-bright)] text-black font-semibold tracking-[0.18em] uppercase text-sm md:text-base h-14 md:h-16 px-10 md:px-14 transition-colors"
          >
            {t("howto.cta.shopNow")}
          </Link>
          <a
            href={amazonHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 md:gap-4 rounded-full border border-white/30 bg-white hover:bg-white/90 h-14 md:h-16 px-10 md:px-14 transition-colors"
          >
            <PrimeBadge className="h-7 md:h-9 w-auto shrink-0" />
            <span className="text-[#0F1111] text-sm md:text-base uppercase tracking-[0.22em] font-bold leading-none">
              {t("howto.cta.shopAmazon")}
            </span>
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full border border-white/30 bg-transparent hover:bg-white hover:text-black text-white font-semibold tracking-[0.18em] uppercase text-sm md:text-base h-14 md:h-16 px-10 md:px-14 transition-colors"
          >
            {t("howto.cta.contact")}
          </Link>
        </div>
      </section>
    </div>
  );
}
