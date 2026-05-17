"use client";

import { useState } from "react";
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

export function ProductGallery({
  images,
  alt,
  badge,
  imageFit = "cover",
  imageFits,
}: Props) {
  const [active, setActive] = useState(0);
  const safe = images.length > 0 ? images : ["/products/carblock-perfume-main.jpg"];
  const current = safe[active];

  function fitFor(i: number): Fit {
    return imageFits?.[i] ?? imageFit;
  }

  const fitStyle = { backgroundSize: fitFor(active) };

  return (
    <div className="space-y-4 relative">
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
      {/* Main image */}
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

      {/* Thumbnails */}
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
  );
}
