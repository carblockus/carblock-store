"use client";

import { useEffect, useState } from "react";

const slides = [
  "/hero/1.jpg",
  "/hero/3.jpg",
  "/hero/5.jpg",
  "/hero/6.jpg",
  "/hero/7.jpg",
];

// First slide flashes briefly then advances; the rest stay 5s each.
const FIRST_SLIDE_MS = 1000;
const REGULAR_INTERVAL_MS = 5000;

/**
 * Auto-rotating background slideshow for the Hero section.
 * Crossfades between slides; very subtle ken-burns so the photos never
 * feel like they're zooming in on the visitor.
 */
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
      {slides.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 bg-no-repeat bg-cover transition-opacity duration-[1500ms] ease-in-out"
          style={{
            backgroundImage: `url('${src}')`,
            // Position biased toward the lower-center so the bottle/product
            // (held in the lower half of the photo) stays in frame instead
            // of being cropped off by the default centered crop.
            backgroundPosition: "50% 65%",
            opacity: active === i ? 1 : 0,
            animation: active === i ? "kenburns 9s ease-out forwards" : "none",
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

      <style jsx>{`
        @keyframes kenburns {
          0% { transform: scale(1); }
          100% { transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
}
