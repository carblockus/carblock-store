"use client";

import { HeroSlideshow } from "./hero-slideshow";
import { useT } from "@/lib/lang-context";

/**
 * Two-band hero — a black text strip on top and a clean photo banner
 * below it. Photos render without any gradient overlay, gold glow or
 * text overlapping them.
 */
export function Hero() {
  const t = useT();

  return (
    <>
      {/* Top strip — brand copy on a solid black bg */}
      <div className="bg-black border-b border-[var(--border)]">
        <div className="container-x py-3 md:py-5 max-w-4xl text-center md:text-left">
          <span className="font-display text-gold-gradient text-[1.5rem] sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-[0.08em] sm:tracking-[0.12em] leading-none block">
            {t("hero.eyebrow")}
          </span>
          <h1 className="mt-1.5 md:mt-2 font-display text-[10px] sm:text-sm md:text-lg lg:text-xl leading-tight uppercase font-semibold text-white tracking-wide">
            <span>{t("hero.title.line1")}</span>{" "}
            <span>
              {t("hero.title.line2.before")}{" "}
              <span className="text-gold-gradient italic pr-1 inline-block">
                {t("hero.title.line2.highlight")}
              </span>{" "}
              {t("hero.title.line2.after")}
            </span>
          </h1>
          <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/60 bg-[var(--gold)]/15 px-2 py-0.5">
            <span className="font-display text-[8px] md:text-[10px] tracking-[0.14em] uppercase font-bold text-gold-gradient">
              {t("hero.pill.upto")}{" "}
              <span className="italic">{t("hero.pill.duration")}</span>{" "}
              {t("hero.pill.suffix")}
            </span>
          </div>
        </div>
      </div>

      {/* Photo banner — clean, no overlays */}
      <section className="relative overflow-hidden bg-black aspect-[21/9] md:aspect-[21/9] md:max-h-[360px]">
        <HeroSlideshow />
      </section>
    </>
  );
}
