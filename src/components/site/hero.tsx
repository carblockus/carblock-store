"use client";

import { HeroSlideshow } from "./hero-slideshow";
import { useT } from "@/lib/lang-context";

/**
 * Two-band hero — a black text strip on top and a clean photo banner
 * below it. The photos are displayed without any gradient overlay,
 * gold-glow decoration, or text overlapping them, so the visitor sees
 * each photo at full clarity.
 */
export function Hero() {
  const t = useT();

  return (
    <>
      {/* Top strip — all the brand copy lives here on a solid black bg */}
      <div className="bg-black border-b border-[var(--border)]">
        <div className="container-x py-5 md:py-8 max-w-4xl text-center md:text-left">
          <span className="font-display text-gold-gradient text-[1.85rem] sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-[0.08em] sm:tracking-[0.12em] leading-none block">
            {t("hero.eyebrow")}
          </span>
          <h1 className="mt-2 md:mt-3 font-display text-xs sm:text-base md:text-xl lg:text-2xl leading-tight uppercase font-semibold text-white tracking-wide">
            <span>{t("hero.title.line1")}</span>{" "}
            <span>
              {t("hero.title.line2.before")}{" "}
              <span className="text-gold-gradient italic pr-1 inline-block">
                {t("hero.title.line2.highlight")}
              </span>{" "}
              {t("hero.title.line2.after")}
            </span>
          </h1>
          <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/60 bg-[var(--gold)]/15 px-2.5 py-0.5">
            <span className="font-display text-[9px] md:text-xs tracking-[0.14em] uppercase font-bold text-gold-gradient">
              {t("hero.pill.upto")}{" "}
              <span className="italic">{t("hero.pill.duration")}</span>{" "}
              {t("hero.pill.suffix")}
            </span>
          </div>
        </div>
      </div>

      {/* Photo banner — clean, no overlays. Aspect is wider/shorter than
          the source 4:3 photos so the product peeks above the fold sooner;
          bg-cover crops the top/bottom edges only. */}
      <section className="relative overflow-hidden bg-black aspect-[16/9] md:aspect-[21/9] md:max-h-[440px]">
        <HeroSlideshow />
      </section>
    </>
  );
}
