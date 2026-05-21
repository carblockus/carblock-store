"use client";

import { Check } from "lucide-react";
import { SubscribeForm } from "@/components/site/subscribe-form";
import { useT } from "@/lib/lang-context";
import type { TranslationKey } from "@/lib/i18n";

/** Client wrapper for /subscribe-and-save so the page can keep its
 *  static metadata export while every line of copy reacts to the
 *  language toggle. */
export function SubscribeAndSaveContent() {
  const t = useT();

  const perks: { title: TranslationKey; body: TranslationKey }[] = [
    { title: "subscribe.perks.save.title", body: "subscribe.perks.save.body" },
    {
      title: "subscribe.perks.delivered.title",
      body: "subscribe.perks.delivered.body",
    },
    {
      title: "subscribe.perks.shipping.title",
      body: "subscribe.perks.shipping.body",
    },
    {
      title: "subscribe.perks.cancel.title",
      body: "subscribe.perks.cancel.body",
    },
  ];

  return (
    <div className="bg-background">
      <section className="container-x py-12 md:py-20 text-center">
        <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--gold)]">
          {t("subscribe.eyebrow")}
        </span>
        <h1 className="font-display text-4xl md:text-6xl uppercase font-bold mt-3 text-white leading-[1.05]">
          {t("subscribe.title")}
        </h1>
        <p className="mt-5 max-w-md mx-auto text-sm md:text-base text-[var(--muted)]">
          {t("subscribe.body")}
        </p>
      </section>

      <section className="container-x pb-12">
        <ul className="grid gap-3 sm:grid-cols-2 max-w-2xl mx-auto">
          {perks.map((p) => (
            <li
              key={p.title}
              className="flex gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4"
            >
              <Check className="h-5 w-5 text-[var(--gold)] shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-white uppercase tracking-[0.12em]">
                  {t(p.title)}
                </p>
                <p className="text-xs text-[var(--muted)] mt-1 leading-relaxed">
                  {t(p.body)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="container-x pb-24">
        <SubscribeForm />
      </section>
    </div>
  );
}
