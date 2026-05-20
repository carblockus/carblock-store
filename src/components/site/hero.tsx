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
      {/* Top strip — brand copy on a solid black bg. Mobile stays compact;
          desktop tightens vs the previous pass so the text strip doesn't
          eat as much vertical space — banner gets the rest. */}
      <div className="bg-black border-b border-[var(--border)]">
        <div className="container-x py-3 md:py-4 lg:py-5 max-w-4xl mx-auto text-center">
          {/* CARBLOCK eyebrow. Per user request: bigger, but grow in
              height not in width. Bump font-size one step up across all
              breakpoints AND apply a vertical-only scaleY(1.35) so the
              letters stretch upward without widening. Tracking stays
              modest so the overall word doesn't extend beyond the
              text strip. origin-bottom keeps the baseline anchored
              while the tops of the letters reach higher. */}
          <span className="font-display text-gold-gradient text-[2rem] sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-[0.06em] sm:tracking-[0.08em] leading-none block origin-bottom [transform:scaleY(1.35)] py-2">
            {t("hero.eyebrow")}
          </span>
          {/* Subtitle in Inter sentence case. Mobile uses text-[10px] +
              nowrap so the full phrase fits on one line at 375px. */}
          <h1 className="mt-1.5 md:mt-2 text-[10px] sm:text-sm md:text-base lg:text-lg leading-snug font-medium text-white whitespace-nowrap md:whitespace-normal">
            {t("hero.title.line1")}{" "}
            {t("hero.title.line2.before")}{" "}
            <span className="text-gold-gradient italic font-semibold">
              {t("hero.title.line2.highlight")}
            </span>{" "}
            {t("hero.title.line2.after")}
          </h1>
          {/* Gold-on-black "UP TO 3 MONTHS" pill — static (no pulse) per
              user request, larger sizing so it reads clearly without
              relying on motion to draw the eye. */}
          <div className="mt-2.5 md:mt-3 inline-flex items-center gap-2 rounded-full bg-[var(--gold)] shadow-[0_4px_14px_rgba(212,175,55,0.35)] px-4 md:px-5 py-1.5 md:py-2">
            <span className="font-display text-[11px] md:text-sm lg:text-base tracking-[0.16em] uppercase font-extrabold text-black">
              {t("hero.pill.upto")}{" "}
              <span className="italic">{t("hero.pill.duration")}</span>{" "}
              {t("hero.pill.suffix")}
            </span>
          </div>
        </div>
      </div>

      {/* Photo banner — clean, no overlays.
          Mobile: full-width 4:3 (matches source photos).
          Desktop: 16:9 aspect (matches source photo aspect → no
          letterboxing inside the slideshow) capped at max-w-[1280px] so
          the banner is ~720px tall and the whole hero — navbar + menu
          row + text strip + banner — fits in a 1080p viewport without
          scrolling.

          Wrapper div is bg-black so the gutters either side of the
          1280px-capped banner are PURE #000 (not the site default
          `--background` #0a0a0a, which read as a faint dark-grey strip
          beside the pitch-black banner). */}
      <div className="bg-black">
        <section className="relative overflow-hidden bg-black aspect-[4/3] md:aspect-[16/9] md:max-w-[1280px] md:mx-auto">
          <HeroSlideshow />
        </section>
      </div>
    </>
  );
}
