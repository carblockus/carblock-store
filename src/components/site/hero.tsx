"use client";

import { HeroSlideshow } from "./hero-slideshow";
import { useT } from "@/lib/lang-context";

/**
 * Hero — photo banner with the brand copy (CARBLOCK + tagline + pill)
 * overlaid at the top. The text sits on a soft top gradient so it stays
 * legible across all four slideshow photos without darkening the whole
 * image.
 */
export function Hero() {
  const t = useT();

  return (
    <section className="relative overflow-hidden bg-black aspect-[21/9] md:aspect-[21/9] md:max-h-[360px]">
      <HeroSlideshow />

      {/* Soft top-only gradient — keeps the brand copy readable without
          dimming the bottom of the photo. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-black/85 to-transparent" />

      {/* Overlaid brand copy, anchored to the top of the photo */}
      <div className="absolute inset-x-0 top-0 z-10">
        <div className="container-x py-3 md:py-5 max-w-4xl text-center">
          <span className="font-display text-gold-gradient text-[1.5rem] sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-[0.08em] sm:tracking-[0.12em] leading-none block drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
            {t("hero.eyebrow")}
          </span>
          <h1 className="mt-1.5 md:mt-2 font-display text-[10px] sm:text-sm md:text-lg lg:text-xl leading-tight uppercase font-semibold text-white tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            <span>{t("hero.title.line1")}</span>{" "}
            <span>
              {t("hero.title.line2.before")}{" "}
              <span className="text-gold-gradient italic pr-1 inline-block">
                {t("hero.title.line2.highlight")}
              </span>{" "}
              {t("hero.title.line2.after")}
            </span>
          </h1>
          <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/60 bg-[var(--gold)]/15 backdrop-blur px-2 py-0.5">
            <span className="font-display text-[8px] md:text-[10px] tracking-[0.14em] uppercase font-bold text-gold-gradient">
              {t("hero.pill.upto")}{" "}
              <span className="italic">{t("hero.pill.duration")}</span>{" "}
              {t("hero.pill.suffix")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
