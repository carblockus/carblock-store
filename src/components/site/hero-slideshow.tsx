"use client";

import { useEffect, useState } from "react";

const slides = [
  "/hero/page-1.png",
  "/hero/page-2.png",
  "/hero/page-3.png",
  "/hero/page-4.png",
];

// Quick 2s rotation between slides so all three photos cycle through
// within ~6s, well within the average mobile attention span on landing.
const FIRST_SLIDE_MS = 2000;
const REGULAR_INTERVAL_MS = 2000;

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
          className="absolute inset-0 bg-no-repeat bg-cover bg-center transition-opacity duration-[800ms] ease-in-out"
          style={{
            backgroundImage: `url('${src}')`,
            // Photos are already prepared at 4:3 to match the hero box so
            // `cover` fills cleanly without cropping the subject.
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
