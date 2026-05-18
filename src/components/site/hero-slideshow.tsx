"use client";

import { useEffect, useState } from "react";

/**
 * Each slide carries its own backgroundSize. Photos that are mostly
 * landscape with text near the edges (the marketing-style banners 1 and
 * 3) use `contain` so nothing gets cropped — readers see the full
 * "Say goodbye to unpleasant odors!" / "Car Cleaning Wipes" headlines.
 * Lifestyle / product shots use `cover` to fill the banner box.
 */
const slides: { src: string; fit: "cover" | "contain" }[] = [
  { src: "/hero/page-1.jpg", fit: "contain" },  // "Say goodbye to unpleasant odors!"
  { src: "/hero/page-2.png", fit: "cover" },    // lifestyle: pouring on floor
  { src: "/hero/page-3.png", fit: "contain" },  // "Cleans, shines and protects" + icons
  { src: "/hero/page-4.png", fit: "contain" },  // "Cleaned vs Without WipesBlock" comparison
  { src: "/hero/page-5.png", fit: "cover" },    // lifestyle: pack vs Ferraris
  { src: "/hero/page-6.png", fit: "cover" },    // lifestyle: Ferrari interior + bottle
];

const FIRST_SLIDE_MS = 1500;
const REGULAR_INTERVAL_MS = 1500;

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
          className="absolute inset-0 bg-no-repeat bg-center transition-opacity duration-[800ms] ease-in-out"
          style={{
            backgroundImage: `url('${slide.src}')`,
            backgroundSize: slide.fit,
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
