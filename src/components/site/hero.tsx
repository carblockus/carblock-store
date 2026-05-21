"use client";

import Link from "next/link";
import { HeroSlideshow } from "./hero-slideshow";
import { useT } from "@/lib/lang-context";
import type { TranslationKey } from "@/lib/i18n";

const navLinks: { key: TranslationKey; href: string }[] = [
  { key: "nav.shop", href: "/products" },
  { key: "nav.howToUse", href: "/how-to-use" },
  { key: "nav.about", href: "/about" },
  { key: "nav.wholesale", href: "/wholesale" },
];

/**
 * Two-band hero — a black text strip on top and a clean photo banner
 * below it. Photos render without any gradient overlay, gold glow or
 * text overlapping them.
 *
 * Desktop only: a nav strip sits between the text strip and the banner,
 * exactly where the user drew the white line in the screenshot.
 * Mobile: nav strip is hidden (hamburger drawer handles it).
 */
export function Hero() {
  const t = useT();

  return (
    <>
      {/* Top strip — brand copy on a solid black bg */}
      <div className="bg-black border-b border-[var(--border)]">
        <div className="container-x py-3 md:py-4 lg:py-5 max-w-4xl mx-auto text-center">
          <span className="font-display text-gold-gradient text-[2rem] sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-[0.06em] sm:tracking-[0.08em] leading-none block origin-bottom [transform:scaleY(1.35)] py-2">
            {t("hero.eyebrow")}
          </span>
          <h1 className="mt-1.5 md:mt-2 text-[10px] sm:text-sm md:text-2xl lg:text-3xl leading-snug font-semibold uppercase tracking-[0.08em] text-white whitespace-nowrap md:whitespace-normal">
            {t("hero.title.line1")}{" "}
            {t("hero.title.line2.before")}{" "}
            <span className="text-gold-gradient italic font-semibold">
              {t("hero.title.line2.highlight")}
            </span>{" "}
            {t("hero.title.line2.after")}
          </h1>
          <div className="mt-2.5 md:mt-3 inline-flex items-center gap-2 rounded-full bg-[var(--gold)] shadow-[0_4px_14px_rgba(212,175,55,0.35)] px-4 md:px-5 py-1.5 md:py-2">
            <span className="font-display text-[11px] md:text-sm lg:text-base tracking-[0.16em] uppercase font-extrabold text-black">
              {t("hero.pill.upto")}{" "}
              <span className="italic">{t("hero.pill.duration")}</span>{" "}
              {t("hero.pill.suffix")}
            </span>
          </div>
        </div>
      </div>

      {/* Desktop nav strip — between text strip and photo banner.
          Hidden on mobile (hamburger drawer handles navigation there). */}
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

      {/* Photo banner */}
      <div className="bg-black">
        <section className="relative overflow-hidden bg-black aspect-[4/3] md:aspect-[16/9] md:max-w-[1280px] md:mx-auto">
          <HeroSlideshow />
        </section>
      </div>
    </>
  );
}
