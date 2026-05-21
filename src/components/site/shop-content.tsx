"use client";

import { ExternalLink } from "lucide-react";
import { products, type Product } from "@/lib/mock-products";
import { ProductCard } from "@/components/site/product-card";
import { externalRetailers } from "@/components/site/external-channels";
import { useT } from "@/lib/lang-context";

/** Default "featured" order — bestsellers first. */
function defaultSort(items: Product[]): Product[] {
  return [...items].sort((a, b) => (a.badge === "BESTSELLER" ? -1 : 1));
}

/**
 * Client wrapper for the /products shop page. Lives here so the page
 * can stay a Server Component (and keep its static `metadata` export)
 * while the user-facing copy still reacts to the language toggle.
 */
export function ShopContent() {
  const t = useT();
  const sorted = defaultSort(products);

  return (
    <div className="bg-background">
      <section className="container-x py-5 md:py-16 lg:py-20 text-center">
        <span className="inline-block px-4 md:px-6 py-1.5 md:py-2 rounded-full bg-[var(--gold)]/15 border border-[var(--gold)]/40 text-[10px] md:text-sm tracking-[0.3em] uppercase text-[var(--gold)] font-bold">
          {t("shop.eyebrow")}
        </span>
        <h1 className="font-display text-3xl md:text-7xl lg:text-8xl uppercase font-bold mt-3 md:mt-5 text-white leading-tight">
          {t("shop.title.before")}{" "}
          <span className="text-gold-gradient italic">
            {t("shop.title.highlight")}
          </span>
        </h1>
        <p className="hidden md:block mt-4 md:mt-5 text-base lg:text-lg text-[var(--muted)] max-w-2xl mx-auto">
          {t("shop.subtitle")}
        </p>
      </section>

      <section className="container-x md:!max-w-[1600px] md:!px-6 lg:!px-10 pb-20">
        {sorted.length === 0 ? (
          <div className="py-20 text-center text-[var(--muted)]">
            <p>{t("shop.empty")}</p>
          </div>
        ) : (
          <div className="grid gap-5 md:gap-8 lg:gap-10 sm:grid-cols-2 md:grid-cols-3">
            {sorted.map((p) => (
              <ProductCard
                key={p.slug}
                product={p}
                imageFit={
                  p.category === "wipes" ||
                  p.category === "bundle" ||
                  p.slug === "carblock-2-pack"
                    ? "contain"
                    : "cover"
                }
                imageScale={p.category === "bundle" ? "130% auto" : undefined}
              />
            ))}
          </div>
        )}
      </section>

      <section className="border-t border-[var(--border)] bg-[var(--surface)]">
        <div className="container-x py-14 md:py-16 text-center">
          <span className="text-[11px] tracking-[0.3em] uppercase text-[var(--gold)]">
            {t("shop.retailers.eyebrow")}
          </span>
          <h2 className="font-display text-2xl md:text-3xl uppercase font-bold mt-3 text-white">
            {t("shop.retailers.title")}
          </h2>
          <p className="mt-3 text-sm text-[var(--muted)] max-w-md mx-auto">
            {t("shop.retailers.body")}
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3 max-w-3xl mx-auto">
            {externalRetailers.map((r) => (
              <a
                key={r.label}
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-3 rounded-lg border border-[var(--border-strong)] bg-black px-6 py-6 hover:border-[var(--gold)] hover:bg-[var(--gold)]/5 transition-colors"
              >
                <r.icon className="h-8 w-8 text-white group-hover:text-[var(--gold)] transition-colors" />
                <span className="text-sm uppercase tracking-[0.18em] font-semibold text-white">
                  {r.label}
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.22em] text-[var(--gold)] group-hover:text-[var(--gold-bright)]">
                  {t("shop.retailers.open")}{" "}
                  <ExternalLink className="h-3 w-3" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
