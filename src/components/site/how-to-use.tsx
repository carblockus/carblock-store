"use client";

import { useT } from "@/lib/lang-context";

/**
 * Two-step "How to Use" panel shown under the Add-to-Cart on the perfume
 * product page and on the /how-to-use page. Localized via useT() so the
 * title + step text follow the global EN/ES toggle.
 */
export function HowToUse({ id = "how-to-use" }: { id?: string }) {
  const t = useT();
  return (
    <section id={id} className="space-y-6">
      <div className="text-center">
        <h3 className="font-display text-2xl md:text-3xl uppercase font-bold text-white">
          {t("htuse.title")}
        </h3>
      </div>

      {/* Vertical video frame — phone-screen aspect, centered. Object-contain
          guarantees the whole video shows even if the source ratio varies. */}
      <div className="mx-auto w-full max-w-sm aspect-[9/16] rounded-2xl overflow-hidden border border-[var(--border)] bg-black">
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          controls
          playsInline
          preload="metadata"
          poster="/products/carblock-new-1.png"
          className="w-full h-full object-contain bg-black"
        >
          <source src="/products/how-to-use.mov" type="video/mp4" />
          <source src="/products/how-to-use.mov" type="video/quicktime" />
        </video>
      </div>

      {/* Two steps */}
      <ol className="grid sm:grid-cols-2 gap-3">
        <Step n={1} title={t("htuse.step1.title")} body={t("htuse.step1.body")} />
        <Step n={2} title={t("htuse.step2.title")} body={t("htuse.step2.body")} />
      </ol>
    </section>
  );
}

function Step({ n, title, body }: { n: number; title: string; body: string }) {
  return (
    <li className="flex gap-3 rounded-md border border-[var(--border)] bg-[var(--surface)] p-4">
      <span className="grid place-items-center h-8 w-8 rounded-full bg-[var(--gold)] text-black font-bold text-sm shrink-0 leading-none">
        {n}
      </span>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-white uppercase tracking-[0.12em]">
          {title}
        </p>
        <p className="text-xs text-[var(--muted)] mt-1 leading-relaxed">
          {body}
        </p>
      </div>
    </li>
  );
}
