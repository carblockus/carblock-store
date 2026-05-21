"use client";

import Link from "next/link";
import {
  ChevronRight,
  Package,
  Ban,
  Truck,
  Sparkles,
  CheckCircle2,
  Tag,
} from "lucide-react";
import { WholesaleForm } from "@/components/site/wholesale-form";
import { useT } from "@/lib/lang-context";
import type { TranslationKey } from "@/lib/i18n";

/** Client wrapper for /wholesale — i18n-aware copy for the breadcrumb,
 *  hero, 5 rule cards, fit-check list and the apply form intro. The
 *  parent server page just keeps the static metadata. */
export function WholesaleContent() {
  const t = useT();

  const rules: {
    icon: typeof Package;
    tone: "gold" | "red" | "amber" | "blue" | "green";
    title: TranslationKey;
    body: TranslationKey;
  }[] = [
    {
      icon: Package,
      tone: "gold",
      title: "wholesale.rule1.title",
      body: "wholesale.rule1.body",
    },
    {
      icon: Ban,
      tone: "red",
      title: "wholesale.rule2.title",
      body: "wholesale.rule2.body",
    },
    {
      icon: Tag,
      tone: "amber",
      title: "wholesale.rule3.title",
      body: "wholesale.rule3.body",
    },
    {
      icon: Truck,
      tone: "blue",
      title: "wholesale.rule4.title",
      body: "wholesale.rule4.body",
    },
    {
      icon: Sparkles,
      tone: "green",
      title: "wholesale.rule5.title",
      body: "wholesale.rule5.body",
    },
  ];

  const toneClasses = {
    gold: {
      border: "border-[var(--gold)]/50",
      bg: "bg-[var(--gold)]/8",
      icon: "text-[var(--gold)] bg-[var(--gold)]/15 border-[var(--gold)]/40",
    },
    red: {
      border: "border-red-500/40",
      bg: "bg-red-500/5",
      icon: "text-red-300 bg-red-500/15 border-red-500/40",
    },
    amber: {
      border: "border-amber-500/40",
      bg: "bg-amber-500/5",
      icon: "text-amber-300 bg-amber-500/15 border-amber-500/40",
    },
    blue: {
      border: "border-blue-500/40",
      bg: "bg-blue-500/5",
      icon: "text-blue-300 bg-blue-500/15 border-blue-500/40",
    },
    green: {
      border: "border-green-500/40",
      bg: "bg-green-500/5",
      icon: "text-green-300 bg-green-500/15 border-green-500/40",
    },
  };

  const checklist: TranslationKey[] = [
    "wholesale.fit.item1",
    "wholesale.fit.item2",
    "wholesale.fit.item3",
    "wholesale.fit.item4",
    "wholesale.fit.item5",
  ];

  return (
    <div className="bg-background">
      <div className="border-b border-[var(--border)]">
        <div className="container-x py-4 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
          <Link
            href="/"
            className="hover:text-[var(--gold)] transition-colors"
          >
            {t("wholesale.breadcrumb.home")}
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-white">
            {t("wholesale.breadcrumb.current")}
          </span>
        </div>
      </div>

      <section className="relative bg-black overflow-hidden border-b border-[var(--border)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.18),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(168,130,27,0.15),transparent_55%)]" />
        <div className="container-x relative z-10 py-20 md:py-24 max-w-3xl text-center">
          <span className="text-[11px] tracking-[0.3em] uppercase text-[var(--gold)]">
            {t("wholesale.eyebrow")}
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl uppercase font-bold mt-3 text-white leading-[1.05]">
            {t("wholesale.title.before")}{" "}
            <span className="text-gold-gradient italic">
              {t("wholesale.title.highlight")}
            </span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-[var(--muted)] leading-relaxed">
            {t("wholesale.subtitle")}
          </p>
        </div>
      </section>

      <section className="container-x py-16 md:py-20">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[11px] tracking-[0.3em] uppercase text-[var(--gold)]">
            {t("wholesale.rules.eyebrow")}
          </span>
          <h2 className="font-display text-3xl md:text-4xl uppercase font-bold mt-3 text-white">
            {t("wholesale.rules.title")}
          </h2>
          <p className="mt-3 text-sm md:text-base text-[var(--muted)]">
            {t("wholesale.rules.intro")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {rules.map((r) => {
            const tone = toneClasses[r.tone];
            return (
              <article
                key={r.title}
                className={`rounded-lg border ${tone.border} ${tone.bg} p-6 flex gap-4`}
              >
                <div
                  className={`h-12 w-12 rounded-full border ${tone.icon} grid place-items-center shrink-0`}
                >
                  <r.icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-display text-base md:text-lg uppercase tracking-[0.12em] text-white">
                    {t(r.title)}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed">
                    {t(r.body)}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="border-y border-[var(--border)] bg-[var(--surface)]">
        <div className="container-x py-12 md:py-16 max-w-3xl">
          <div className="text-center mb-8">
            <span className="text-[11px] tracking-[0.3em] uppercase text-[var(--gold)]">
              {t("wholesale.fit.eyebrow")}
            </span>
            <h2 className="font-display text-2xl md:text-3xl uppercase font-bold mt-3 text-white">
              {t("wholesale.fit.title")}
            </h2>
          </div>
          <ul className="space-y-3">
            {checklist.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-[var(--gold)] shrink-0 mt-0.5" />
                <span className="text-sm md:text-base text-white/90">
                  {t(item)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="apply" className="container-x py-16 md:py-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-[11px] tracking-[0.3em] uppercase text-[var(--gold)]">
              {t("wholesale.apply.eyebrow")}
            </span>
            <h2 className="font-display text-3xl md:text-4xl uppercase font-bold mt-3 text-white">
              {t("wholesale.apply.title")}
            </h2>
            <p className="mt-3 text-sm md:text-base text-[var(--muted)]">
              {t("wholesale.apply.subtitle")}
            </p>
          </div>

          <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8">
            <WholesaleForm />
          </div>
        </div>
      </section>
    </div>
  );
}
