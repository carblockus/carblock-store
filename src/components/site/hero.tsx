"use client";

import { HeroSlideshow } from "./hero-slideshow";
import { useT } from "@/lib/lang-context";

/**
 * Compact hero — shorter than before so the product cards reach the fold
 * earlier on mobile. No CTA buttons anymore (those live in the menu strip
 * directly under the hero now).
 */
export function Hero() {
  const t = useT();

  return (
    <section className="relative overflow-hidden bg-black aspect-[4/3] md:aspect-[16/9] md:max-h-[560px] flex flex-col">
      {/* Auto-rotating social-proof slideshow */}
      <HeroSlideshow />

      {/* Legibility gradients — darker on the left where text sits */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30" />

      {/* Gold splash accents */}
      <div className="pointer-events-none absolute -right-24 top-1/4 h-[220px] w-[220px] rounded-full bg-[radial-gradient(circle_at_center,rgba(242,201,76,0.2),transparent_60%)] blur-3xl" />
      <div className="pointer-events-none absolute -left-16 bottom-0 h-[200px] w-[200px] rounded-full bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.2),transparent_60%)] blur-3xl" />

      {/* mb-auto pushes the text block up to the top of the hero banner,
          keeping the product photo visible in the lower portion. */}
      <div className="container-x relative z-10 max-w-4xl mb-auto pt-6 md:pt-10">
        <div className="mb-2 md:mb-4">
          <span className="font-display text-gold-gradient text-[1.85rem] sm:text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-[0.08em] sm:tracking-[0.12em] leading-none block">
            {t("hero.eyebrow")}
          </span>
        </div>

        <h1 className="font-display text-xs sm:text-base md:text-2xl lg:text-3xl leading-tight uppercase font-semibold text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] tracking-wide">
          <span className="block">{t("hero.title.line1")}</span>
          <span className="block">
            {t("hero.title.line2.before")}{" "}
            <span className="text-gold-gradient italic pr-1 inline-block">
              {t("hero.title.line2.highlight")}
            </span>{" "}
            {t("hero.title.line2.after")}
          </span>
        </h1>

        {/* Pill: up to 3 months of fragrance */}
        <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/60 bg-[var(--gold)]/15 backdrop-blur px-2.5 py-0.5">
          <span className="font-display text-[9px] md:text-xs tracking-[0.14em] uppercase font-bold text-gold-gradient">
            {t("hero.pill.upto")}{" "}
            <span className="italic">{t("hero.pill.duration")}</span>{" "}
            {t("hero.pill.suffix")}
          </span>
        </div>
      </div>
    </section>
  );
}
