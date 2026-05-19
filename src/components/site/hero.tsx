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
      {/* Top strip — brand copy on a solid black bg. Mobile sizes stay
          compact; md+/lg+ overrides scale everything up for desktop. */}
      <div className="bg-black border-b border-[var(--border)]">
        <div className="container-x py-3 md:py-8 lg:py-10 max-w-4xl text-center md:text-left">
          <span className="font-display text-gold-gradient text-[1.5rem] sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold uppercase tracking-[0.08em] sm:tracking-[0.12em] leading-none block">
            {t("hero.eyebrow")}
          </span>
          {/* Subtitle in Inter sentence case. Mobile uses text-[10px] +
              nowrap so the full phrase fits on one line at 375px;
              desktop scales up generously for comfortable reading. */}
          <h1 className="mt-1.5 md:mt-3 lg:mt-4 text-[10px] sm:text-sm md:text-lg lg:text-2xl leading-snug font-medium text-white whitespace-nowrap md:whitespace-normal">
            {t("hero.title.line1")}{" "}
            {t("hero.title.line2.before")}{" "}
            <span className="text-gold-gradient italic font-semibold">
              {t("hero.title.line2.highlight")}
            </span>{" "}
            {t("hero.title.line2.after")}
          </h1>
          {/* Gold-on-black pill with a continuous "pop" pulse. Bigger on
              desktop so it pulls the eye proportionally. */}
          <div className="mt-2 md:mt-4 inline-flex items-center gap-2 rounded-full bg-[var(--gold)] shadow-[0_4px_14px_rgba(212,175,55,0.35)] px-3 md:px-5 py-1 md:py-1.5 animate-pop">
            <span className="font-display text-[9px] md:text-sm lg:text-base tracking-[0.16em] uppercase font-extrabold text-black">
              {t("hero.pill.upto")}{" "}
              <span className="italic">{t("hero.pill.duration")}</span>{" "}
              {t("hero.pill.suffix")}
            </span>
          </div>
        </div>
      </div>

      {/* Photo banner — clean, no overlays. 4:3 on mobile to match source
          photos; wider 16:9 on md+ with a 600px cap so the banner reads
          as a cinematic header on desktop. */}
      <section className="relative overflow-hidden bg-black aspect-[4/3] md:aspect-[16/9] md:max-h-[600px]">
        <HeroSlideshow />
      </section>
    </>
  );
}
