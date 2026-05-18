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
          {/* Subtitle uses the body font (Inter) in sentence case for
              easier reading than the condensed all-caps `font-display`. */}
          <h1 className="mt-1.5 md:mt-2 text-sm sm:text-base md:text-lg lg:text-xl leading-snug font-medium text-white">
            <span>{t("hero.title.line1")}</span>{" "}
            <span>
              {t("hero.title.line2.before")}{" "}
              <span className="text-gold-gradient italic font-semibold">
                {t("hero.title.line2.highlight")}
              </span>{" "}
              {t("hero.title.line2.after")}
            </span>
          </h1>
          {/* Gold-on-black pill with a continuous "pop" pulse so it draws
              the eye against the dark strip behind it. */}
          <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-[var(--gold)] shadow-[0_4px_14px_rgba(212,175,55,0.35)] px-3 py-1 animate-pop">
            <span className="font-display text-[9px] md:text-xs tracking-[0.16em] uppercase font-extrabold text-black">
              {t("hero.pill.upto")}{" "}
              <span className="italic">{t("hero.pill.duration")}</span>{" "}
              {t("hero.pill.suffix")}
            </span>
          </div>
        </div>
      </div>

      {/* Photo banner — clean, no overlays. Aspect matches the source
          4:3 photos exactly so nothing gets cropped (bg-cover renders the
          full image edge-to-edge). */}
      <section className="relative overflow-hidden bg-black aspect-[4/3] md:aspect-[16/9] md:max-h-[480px]">
        <HeroSlideshow />
      </section>
    </>
  );
}
