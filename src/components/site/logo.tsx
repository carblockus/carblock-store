"use client";

import { useState } from "react";

type LogoProps = {
  className?: string;
  /** Rendered height in px (fallback when imgClassName not provided). */
  height?: number;
  /** Tailwind classes applied to the &lt;img&gt;. Overrides `height` when set —
   *  use this when you need responsive heights (e.g. h-12 md:h-16). */
  imgClassName?: string;
};

/**
 * Drops /logo.png from /public when present:
 *   carblock-store/public/logo.png
 *
 * Falls back to a typographic wordmark if the image fails to load.
 */
export function Logo({
  className = "",
  height = 52,
  imgClassName,
}: LogoProps) {
  const [imgOk, setImgOk] = useState(true);

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {imgOk ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/logo.png"
          alt="CarBlock"
          style={imgClassName ? undefined : { height }}
          className={`w-auto select-none ${imgClassName ?? ""}`}
          onError={() => setImgOk(false)}
        />
      ) : (
        <div className="leading-none">
          <span className="font-display text-lg tracking-[0.18em] font-bold text-white">
            CARBLOCK
          </span>
          <span className="block font-display text-[9px] tracking-[0.4em] text-[var(--gold)] mt-0.5">
            MILLONARIO
          </span>
        </div>
      )}
    </div>
  );
}
