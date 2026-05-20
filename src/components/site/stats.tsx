"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, X } from "lucide-react";
import { useT } from "@/lib/lang-context";
import type { TranslationKey } from "@/lib/i18n";

const techniques: {
  src: string;
  eyebrow: TranslationKey;
  title: TranslationKey;
  body: TranslationKey;
  /** When present, clicking the card opens an inline video modal instead
   *  of routing to the product detail page. Vertical iPhone clip shot by
   *  Paola showing the exact application gesture for that technique. */
  videoSrc?: string;
}[] = [
  {
    src: "/products/pour-under-mat.jpg",
    eyebrow: "stats.tech1.eyebrow",
    title: "stats.tech1.title",
    body: "stats.tech1.body",
  },
  {
    src: "/products/pour-floor-edge.png",
    eyebrow: "stats.tech2.eyebrow",
    title: "stats.tech2.title",
    body: "stats.tech2.body",
    videoSrc: "/products/technique-edge.mov",
  },
];

const distribution: {
  value: string;
  label: TranslationKey;
  where: TranslationKey;
}[] = [
  {
    value: "25%",
    label: "stats.dist.driver.label",
    where: "stats.dist.driver.where",
  },
  {
    value: "25%",
    label: "stats.dist.passenger.label",
    where: "stats.dist.passenger.where",
  },
  {
    value: "50%",
    label: "stats.dist.rear.label",
    where: "stats.dist.rear.where",
  },
];

export function Stats() {
  const t = useT();
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  // Close on ESC for keyboard users; also lock body scroll while modal is open.
  useEffect(() => {
    if (!activeVideo) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveVideo(null);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [activeVideo]);

  return (
    <section
      id="how-it-works"
      className="relative bg-black overflow-hidden border-y border-[var(--border)]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.15),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(168,130,27,0.15),transparent_55%)]" />

      <div className="container-x relative z-10 py-10 md:py-14">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-10">
          <span className="inline-block text-[11px] tracking-[0.3em] uppercase text-[var(--gold)]">
            {t("stats.eyebrow")}
          </span>
          <h2 className="font-display text-3xl md:text-5xl uppercase font-bold text-white leading-tight mt-3">
            {t("stats.title.before")}{" "}
            <span className="text-gold-gradient">{t("stats.title.duration")}</span>{" "}
            {t("stats.title.after")}
          </h2>
          <p className="mt-4 text-[var(--muted)] max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            {t("stats.body.before")}{" "}
            <span className="text-white font-semibold">{t("stats.body.under")}</span>
            {t("stats.body.middle")}{" "}
            <span className="text-white font-semibold">{t("stats.body.edges")}</span>{" "}
            {t("stats.body.for")}{" "}
            <span className="text-[var(--gold)] font-semibold">
              {t("stats.body.stronger")}
            </span>
            {t("stats.body.dot")}
          </p>
        </div>

        {/* Technique cards — when a card has a `videoSrc` it opens an
            inline modal with that clip (Technique 2, the floor-edge
            pour). Cards without a video keep their previous behavior:
            link to the product page where the broader How To Use video
            lives. */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto mb-12">
          {techniques.map((tech) => {
            const inner = (
              <>
                <Image
                  src={tech.src}
                  alt={t(tech.title)}
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-0 grid place-items-center bg-black/20 group-hover:bg-black/40 transition-colors">
                  <span className="grid place-items-center h-16 w-16 rounded-full bg-[var(--gold)]/90 group-hover:bg-[var(--gold-bright)] text-black shadow-[0_8px_28px_rgba(0,0,0,0.6)] transition-colors">
                    <Play className="h-7 w-7 ml-0.5" />
                  </span>
                </span>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-5 text-left">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--gold)] mb-1">
                    {t(tech.eyebrow)}
                  </p>
                  <p className="text-sm md:text-base text-white font-medium leading-snug">
                    {t(tech.title)}
                  </p>
                  <p className="text-xs text-white/70 mt-1.5">{t(tech.body)}</p>
                </div>
              </>
            );

            const cardClass =
              "group relative rounded-xl overflow-hidden border border-[var(--gold)]/40 bg-[var(--surface)] aspect-[3/4] shadow-[0_20px_60px_-20px_rgba(212,175,55,0.35)] block w-full";

            return tech.videoSrc ? (
              <button
                key={tech.eyebrow}
                type="button"
                onClick={() => setActiveVideo(tech.videoSrc!)}
                aria-label={`${t("stats.watchTutorial")}: ${t(tech.title)}`}
                className={cardClass}
              >
                {inner}
              </button>
            ) : (
              <Link
                key={tech.eyebrow}
                href="/products/carblock-millonario-150ml#how-to-use"
                aria-label={`${t("stats.watchTutorial")}: ${t(tech.title)}`}
                className={cardClass}
              >
                {inner}
              </Link>
            );
          })}
        </div>

        {/* 25 / 25 / 50 distribution row */}
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-[10px] tracking-[0.3em] uppercase text-[var(--gold)] mb-5">
            {t("stats.dist.eyebrow")}
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {distribution.map((d) => (
              <div
                key={d.label}
                className="flex items-center gap-5 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-6 py-5"
              >
                <span className="font-display text-4xl md:text-5xl font-bold text-gold-gradient leading-none shrink-0 min-w-[5rem] tabular-nums whitespace-nowrap">
                  {d.value}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs md:text-sm tracking-[0.22em] uppercase text-white font-semibold">
                    {t(d.label)}
                  </p>
                  <p className="text-xs text-[var(--muted)] leading-relaxed mt-1">
                    {t(d.where)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Video modal — opens when a technique card with `videoSrc` is
          clicked. Clicking the backdrop or pressing ESC closes it.
          Dual <source> tags (mp4 + quicktime mime) so Safari plays the
          .mov natively while Chrome/Firefox fall back to the second
          source. The clip is a vertical iPhone shot so the modal box
          uses portrait aspect with max-h-[85vh]. */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveVideo(null)}
          role="dialog"
          aria-modal="true"
          aria-label={t("stats.watchTutorial")}
        >
          <button
            type="button"
            onClick={() => setActiveVideo(null)}
            aria-label="Close video"
            className="absolute top-4 right-4 h-10 w-10 grid place-items-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          <video
            key={activeVideo}
            autoPlay
            controls
            playsInline
            className="max-h-[85vh] max-w-full w-auto h-auto rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <source src={activeVideo} type="video/mp4" />
            <source src={activeVideo} type="video/quicktime" />
          </video>
        </div>
      )}
    </section>
  );
}
