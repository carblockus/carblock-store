"use client";

import { useState } from "react";
import { Gift, Check, Copy } from "lucide-react";
import { CategoryCard } from "@/components/site/category-card";
import { categories } from "@/lib/mock-products";
import { useT } from "@/lib/lang-context";

const CODE = "GIFT25";

/**
 * /gift25 landing page — reached via the QR on Amazon inserts.
 *
 * Hero thanks the visitor and shows the discount as a big copyable
 * chip. The catalog underneath uses the same CategoryCard treatment
 * as the home so the visitor can add anything to cart and then paste
 * the code at checkout.
 */
export function Gift25Content() {
  const t = useT();
  const [copied, setCopied] = useState(false);

  function copyCode() {
    // navigator.clipboard is available in all modern browsers over HTTPS.
    // Fall back to a manual selection trick on the rare browsers that
    // block it (very old Safari on iOS 12-).
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard
        .writeText(CODE)
        .then(() => flash())
        .catch(() => manualCopy());
    } else {
      manualCopy();
    }
  }

  function manualCopy() {
    const el = document.createElement("textarea");
    el.value = CODE;
    document.body.appendChild(el);
    el.select();
    try {
      document.execCommand("copy");
      flash();
    } catch {
      /* silent — user can still read the code and type it manually */
    }
    document.body.removeChild(el);
  }

  function flash() {
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  return (
    <div className="bg-background">
      {/* --------- HERO --------- */}
      <section className="relative bg-black overflow-hidden border-b border-[var(--border)]">
        {/* Soft gold ambient — no photos, this is a copy-only landing */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 -left-40 w-[640px] h-[640px] rounded-full bg-[var(--gold)] opacity-[0.10] blur-[140px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 -right-40 w-[720px] h-[720px] rounded-full bg-[var(--gold)] opacity-[0.07] blur-[160px]"
        />

        <div className="relative z-10 container-x md:!max-w-[1200px] py-14 md:py-24 lg:py-28 text-center">
          {/* Small gift-icon eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--gold)]/15 border border-[var(--gold)]/40 mb-6 md:mb-8">
            <Gift className="h-4 w-4 md:h-5 md:w-5 text-[var(--gold)]" />
            <span className="text-[10px] md:text-sm tracking-[0.3em] uppercase text-[var(--gold)] font-bold">
              {t("gift25.eyebrow")}
            </span>
          </div>

          <h1 className="font-display text-3xl md:text-6xl lg:text-7xl uppercase font-bold text-white leading-tight max-w-4xl mx-auto">
            {t("gift25.title.before")}{" "}
            <span className="text-gold-gradient italic">
              {t("gift25.title.highlight")}
            </span>
          </h1>

          <p className="mt-5 md:mt-7 max-w-2xl mx-auto text-base md:text-lg lg:text-xl text-[var(--muted)]">
            {t("gift25.subtitle")}
          </p>

          {/* --------- Copyable code card --------- */}
          <div className="mt-10 md:mt-14 max-w-lg mx-auto">
            <div className="rounded-2xl border border-[var(--gold)]/50 bg-black/60 backdrop-blur px-6 md:px-8 py-6 md:py-8 shadow-[0_20px_60px_-20px_rgba(212,175,55,0.5)]">
              <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-[var(--gold)] font-semibold">
                {t("gift25.card.eyebrow")}
              </p>

              {/* Big discount headline */}
              <p className="font-display text-4xl md:text-5xl lg:text-6xl uppercase font-bold text-white mt-2 md:mt-3">
                {t("gift25.card.discount")}
              </p>

              {/* Code chip */}
              <div className="mt-6 md:mt-8 rounded-lg border-2 border-dashed border-[var(--gold)]/60 bg-[var(--gold)]/10 px-5 md:px-8 py-4 md:py-5 flex items-center justify-center">
                <span className="font-mono text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-[0.35em] text-[var(--gold)]">
                  {CODE}
                </span>
              </div>

              {/* Copy button */}
              <button
                type="button"
                onClick={copyCode}
                aria-label="Copy code"
                className={`mt-4 md:mt-5 w-full inline-flex items-center justify-center gap-2 rounded-full h-12 md:h-14 px-6 uppercase tracking-[0.2em] text-xs md:text-sm font-bold transition-colors ${
                  copied
                    ? "bg-green-600 hover:bg-green-600 text-white"
                    : "bg-[var(--gold)] hover:bg-[var(--gold-bright)] text-black"
                }`}
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 md:h-5 md:w-5" strokeWidth={3} />
                    {t("gift25.card.copied")}
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 md:h-5 md:w-5" />
                    {t("gift25.card.copy")}
                  </>
                )}
              </button>

              <p className="mt-4 text-xs md:text-sm text-[var(--muted)] leading-relaxed">
                {t("gift25.card.instruction")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --------- CATALOG --------- */}
      <section className="bg-background py-10 md:py-20 lg:py-24">
        <div className="container-x text-center mb-8 md:mb-14">
          <span className="text-[10px] md:text-sm lg:text-base tracking-[0.3em] uppercase text-[var(--gold)] font-bold">
            {t("gift25.catalog.eyebrow")}
          </span>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl uppercase font-bold mt-3 md:mt-5 text-white leading-tight">
            {t("gift25.catalog.title.before")}{" "}
            <span className="text-gold-gradient italic">
              {t("gift25.catalog.title.highlight")}
            </span>{" "}
            {t("gift25.catalog.title.after")}
          </h2>
        </div>

        {/* Product grid — matches home layout: 1-col mobile stack,
            3-col desktop with the wider container cap. */}
        <div className="container-x md:!max-w-[1600px] md:!px-6 lg:!px-10">
          <div className="grid gap-6 md:gap-8 lg:gap-12 md:grid-cols-3 max-w-[340px] md:!max-w-[1500px] mx-auto">
            {categories.map((c) => (
              <CategoryCard
                key={c.slug}
                label={c.label}
                description={c.description}
                image={c.image}
                badge={c.badge}
                price={c.price}
                href={c.href}
                imageFit={
                  c.slug === "car-wipes" || c.slug === "bundles"
                    ? "contain"
                    : "cover"
                }
                amazonHref={"amazonHref" in c ? c.amazonHref : undefined}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
