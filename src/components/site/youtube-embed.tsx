"use client";

import { useState } from "react";
import { Play } from "lucide-react";

type Props = {
  /** YouTube video ID, e.g. "dQw4w9WgXcQ". Leave empty to show a "coming soon" state. */
  videoId?: string;
  title: string;
};

/**
 * Lazy-loaded YouTube player. Shows a thumbnail with play button until the
 * user clicks — only then we mount the real iframe. Saves bandwidth and
 * keeps the page fast even with several videos on screen.
 */
export function YouTubeEmbed({ videoId, title }: Props) {
  const [active, setActive] = useState(false);

  // Empty state — video hasn't been uploaded yet
  if (!videoId) {
    return (
      <div className="relative aspect-[9/16] rounded-lg overflow-hidden bg-[var(--surface)] border border-dashed border-[var(--border-strong)] grid place-items-center">
        <div className="text-center px-6">
          <div className="mx-auto h-14 w-14 rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/40 grid place-items-center mb-3">
            <Play className="h-6 w-6 text-[var(--gold)]" />
          </div>
          <p className="font-display text-sm uppercase tracking-[0.22em] text-white">
            Coming soon
          </p>
          <p className="text-xs text-[var(--muted)] mt-1.5">
            Video uploading shortly
          </p>
        </div>
      </div>
    );
  }

  // Activated — render real iframe
  if (active) {
    return (
      <div className="relative aspect-[9/16] rounded-lg overflow-hidden bg-black border border-[var(--border)]">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    );
  }

  // Thumbnail mode — click to load actual video.
  // For Shorts (vertical), maxresdefault gives a high-res landscape frame
  // we can crop to fit the 9:16 frame nicely with object-cover.
  const thumb = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
  return (
    <button
      type="button"
      onClick={() => setActive(true)}
      aria-label={`Play ${title}`}
      className="group relative aspect-[9/16] w-full rounded-lg overflow-hidden bg-black border border-[var(--border)] hover:border-[var(--gold)]/60 transition-colors"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={thumb}
        alt={title}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
      <div className="absolute inset-0 grid place-items-center">
        <div className="h-16 w-16 md:h-20 md:w-20 rounded-full bg-[var(--gold)] grid place-items-center shadow-2xl group-hover:scale-110 transition-transform">
          <Play className="h-7 w-7 md:h-9 md:w-9 text-black fill-black ml-1" />
        </div>
      </div>
    </button>
  );
}
