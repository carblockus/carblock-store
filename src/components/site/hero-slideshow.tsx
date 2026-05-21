"use client";

import { useEffect, useState } from "react";

/**
 * All four slides are pre-normalized to 2000×1500 (4:3) JPGs by
 * scripts/normalize-hero.js — they already match the hero container's
 * aspect ratio exactly, so `cover` will neither crop nor letterbox.
 * Re-run the script after dropping new sources into "Pagina web/".
 */
const slides: { src: string; fit: "cover" | "contain" }[] = [
  { src: "/hero/page-1.jpg", fit: "cover" },  // "Say goodbye to unpleasant odors!"
  { src: "/hero/page-2.jpg", fit: "cover" },  // lifestyle: pouring on floor
  { src: "/hero/page-3.jpg", fit: "cover" },  // "Cleans Shines and Protects" + icons
  { src: "/hero/page-4.jpg", fit: "cover" },  // "Cleaned vs Without WipesBlock" comparison
];

const FIRST_SLIDE_MS = 2000;
const REGULAR_INTERVAL_MS = 2000;

export function HeroSlideshow() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const delay = active === 0 ? FIRST_SLIDE_MS : REGULAR_INTERVAL_MS;
    const id = setTimeout(() => {
      setActive((i) => (i + 1) % slides.length);
    }, delay);
    return () => clearTimeout(id);
  }, [active]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {slides.map((slide, i) => (
        <div
          key={slide.src}
          /* Per-slide fit at every breakpoint. Marketing banners use
             `contain` so their text never crops (full image visible with
             letterbox if needed). Lifestyle shots use `cover` to fill the
             box. The md+ banner aspect (16:9) matches the source images
             so `contain` rarely needs letterboxing on desktop. */
          className={`absolute inset-0 bg-no-repeat bg-center transition-opacity duration-[800ms] ease-in-out ${
            slide.fit === "contain" ? "bg-contain" : "bg-cover"
          }`}
          style={{
            backgroundImage: `url('${slide.src}')`,
            opacity: active === i ? 1 : 0,
          }}
        />
      ))}

      {/* Dot indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Show slide ${i + 1}`}
            className={`h-1 rounded-full transition-all ${
              active === i ? "w-6 bg-[var(--gold)]" : "w-2 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
