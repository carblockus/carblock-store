"use client";

import { useState, useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";

type Fit = "cover" | "contain";

type Props = {
  images: string[];
  alt: string;
  badge?: "NEW" | "BESTSELLER" | "BUNDLE";
  /** Default fit applied to every image. "cover" crops, "contain" fits whole. */
  imageFit?: Fit;
  /** Per-image override. Same length as `images`. Each entry takes precedence
   *  over `imageFit`. Use this when some shots are infographics that must
   *  not be cropped while hero shots look better filling the frame. */
  imageFits?: Fit[];
};

/**
 * Two distinct gallery treatments per breakpoint:
 *
 * MOBILE: a horizontal scroll-snap strip. The user swipes left/right
 *         through the photos directly — no thumbnail strip below — so
 *         the page can show the title, bullets and Add-to-Cart in the
 *         same viewport. A bottom-right counter updates as the user
 *         swipes so they know which photo they're on.
 *
 * DESKTOP (md+): the original main-photo + clickable thumbnails grid
 *         stays put. Plenty of vertical room so the extra row of
 *         thumbnails earns its keep.
 */
export function ProductGallery({
  images,
  alt,
  badge,
  imageFit = "cover",
  imageFits,
}: Props) {
  const [active, setActive] = useState(0);
  const safe =
    images.length > 0 ? images : ["/products/carblock-perfume-main.jpg"];
  const current = safe[active];

  function fitFor(i: number): Fit {
    return imageFits?.[i] ?? imageFit;
  }

  // ------- Mobile: track which slide is in view via scroll position -------
  const mobileScrollerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = mobileScrollerRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const slideWidth = el.clientWidth;
        if (slideWidth <= 0) return;
        const idx = Math.round(el.scrollLeft / slideWidth);
        setActive(Math.max(0, Math.min(safe.length - 1, idx)));
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", onScroll);
    };
  }, [safe.length]);

  const fitStyle = { backgroundSize: fitFor(active) };

  return (
    <div className="relative">
      {/* Badge sits OUTSIDE the image frame, in the dark margin above the
          gallery — so it never overlaps the photo's own text/labels. */}
      {badge && (
        <Badge
          className={`absolute -top-3 left-4 z-20 rounded-sm px-3 py-1.5 text-[10px] tracking-[0.2em] uppercase font-semibold shadow-md ${
            badge === "BESTSELLER"
              ? "bg-[var(--gold)] text-black hover:bg-[var(--gold)]"
              : badge === "NEW"
                ? "bg-white text-black hover:bg-white"
                : "bg-black text-[var(--gold)] border border-[var(--gold)] hover:bg-black"
          }`}
        >
          {badge}
        </Badge>
      )}

      {/* ---------- MOBILE: swipe-through carousel ---------- */}
      <div className="md:hidden relative mt-3">
        <div
          ref={mobileScrollerRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide rounded-lg border border-[var(--border)]"
          style={{ scrollbarWidth: "none" }}
        >
          {safe.map((src, i) => (
            <div
              key={src + i}
              className="snap-center shrink-0 w-full aspect-square bg-[var(--surface)] relative"
            >
              <div
                className="absolute inset-0 bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url('${src}')`,
                  backgroundSize: fitFor(i),
                }}
                role="img"
                aria-label={`${alt} — photo ${i + 1}`}
              />
            </div>
          ))}
        </div>

        {/* Counter — updates as user swipes */}
        {safe.length > 1 && (
          <span className="absolute bottom-3 right-3 text-[10px] uppercase tracking-[0.22em] bg-black/70 backdrop-blur text-white px-3 py-1.5 rounded-full pointer-events-none">
            {active + 1} / {safe.length}
          </span>
        )}

        {/* Dot indicators — tiny progress signal at the bottom edge */}
        {safe.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 pointer-events-none">
            {safe.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === active
                    ? "w-5 bg-[var(--gold)]"
                    : "w-1.5 bg-white/40"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* ---------- DESKTOP: main image + thumbnails grid ---------- */}
      <div className="hidden md:block space-y-4">
        <div className="relative aspect-square rounded-lg overflow-hidden bg-[var(--surface)] border border-[var(--border)] mt-3">
          <div
            className="absolute inset-0 bg-center bg-no-repeat transition-[background-image] duration-300"
            style={{
              backgroundImage: `url('${current}')`,
              ...fitStyle,
            }}
            role="img"
            aria-label={alt}
          />

          {/* Counter */}
          {safe.length > 1 && (
            <span className="absolute bottom-4 right-4 text-[10px] uppercase tracking-[0.22em] bg-black/70 backdrop-blur text-white px-3 py-1.5 rounded-full">
              {active + 1} / {safe.length}
            </span>
          )}
        </div>

        {/* Thumbnails (desktop only) */}
        {safe.length > 1 && (
          <div className="grid grid-cols-5 gap-2">
            {safe.map((src, i) => (
              <button
                key={src + i}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show photo ${i + 1}`}
                className={`relative aspect-square rounded-md overflow-hidden border-2 transition-all ${
                  i === active
                    ? "border-[var(--gold)]"
                    : "border-[var(--border)] hover:border-[var(--border-strong)] opacity-70 hover:opacity-100"
                }`}
              >
                <div
                  className="absolute inset-0 bg-center bg-no-repeat bg-[var(--surface)]"
                  style={{
                    backgroundImage: `url('${src}')`,
                    backgroundSize: fitFor(i),
                  }}
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
