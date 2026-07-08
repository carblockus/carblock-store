"use client";

import Link from "next/link";
import { Truck, Clock, ShieldCheck, Check } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Product } from "@/lib/mock-products";
import { products } from "@/lib/mock-products";
import { AddToCart } from "@/components/site/add-to-cart";
import { Stats } from "@/components/site/stats";
import { ProductCard } from "@/components/site/product-card";
import { ProductGallery } from "@/components/site/product-gallery";
import { ProductViewTracker } from "@/components/analytics/product-view-tracker";
import { useT } from "@/lib/lang-context";

/**
 * Client wrapper that renders the full product-detail page UI with
 * i18n-aware copy. The parent server page (page.tsx) handles route
 * params, generateStaticParams and generateMetadata; everything that
 * needs to react to the language toggle lives here.
 */
export function ProductDetailContent({ product }: { product: Product }) {
  const t = useT();

  const related = products.filter(
    (p) => p.slug !== product.slug && p.category !== product.category,
  );

  const categoryLabel =
    product.category === "perfume"
      ? "CarBlock"
      : product.category === "wipes"
        ? "WipesBlock"
        : "Bundles";

  const galleryImages = [product.image, ...(product.gallery ?? [])];
  const galleryFits: ("cover" | "contain")[] = galleryImages.map(() => "cover");

  // CarBlock selling-point bullets — five t() keys mapped here so the
  // bullet content swaps between languages in one place.
  const carblockBullets = [
    t("product.carblock.bullet1"),
    t("product.carblock.bullet2"),
    t("product.carblock.bullet3"),
    t("product.carblock.bullet4"),
    t("product.carblock.bullet5"),
  ];

  // Trust badges — icons + labels + sub-labels. Same row, three items.
  const trustBadges = [
    {
      icon: Truck,
      label: t("product.trust.shipping.label"),
      sub: t("product.trust.shipping.sub"),
    },
    {
      icon: Clock,
      label: t("product.trust.duration.label"),
      sub: t("product.trust.duration.sub"),
    },
    {
      icon: ShieldCheck,
      label: t("product.trust.guaranteed.label"),
      sub: t("product.trust.guaranteed.sub"),
    },
  ];

  // Shipping bullets — last one has an inline link to /legal/refunds.
  const shippingBullets = [
    t("product.shipping.bullet1"),
    t("product.shipping.bullet2"),
    t("product.shipping.bullet3"),
    t("product.shipping.bullet4"),
    t("product.shipping.bullet5"),
  ];

  // Product FAQ — six Q&A rendered as a dedicated module further down
  // the page (CarBlock only). Each entry is a pair of i18n keys so both
  // languages swap together via useT().
  const productFaq = [
    { q: t("product.faq.q1"), a: t("product.faq.a1") },
    { q: t("product.faq.q2"), a: t("product.faq.a2") },
    { q: t("product.faq.q3"), a: t("product.faq.a3") },
    { q: t("product.faq.q4"), a: t("product.faq.a4") },
    { q: t("product.faq.q5"), a: t("product.faq.a5") },
    { q: t("product.faq.q6"), a: t("product.faq.a6") },
  ];

  // Fallback descriptions for products that don't have a longDescription
  // array (wipes, bundle). Translated via i18n keys so the language
  // toggle works here too.
  const fallbackDescription =
    product.category === "wipes"
      ? t("product.wipes.shortDescription")
      : t("product.bundle.shortDescription");

  return (
    <div className="bg-background">
      <ProductViewTracker
        id={product.slug}
        name={product.name}
        category={product.category}
        price={product.price}
      />

      <section className="container-x py-3 md:py-16 md:!max-w-[1600px]">
        <div className="grid md:grid-cols-2 gap-3 md:gap-20 lg:gap-24 items-start">
          <ProductGallery
            images={galleryImages}
            alt={product.name}
            badge={product.badge}
            imageFit={product.category === "bundle" ? "contain" : "cover"}
            imageFits={galleryFits}
          />

          {/* Mobile gets ULTRA tight gaps so image + eyebrow + title +
              5 bullets + size + Add-to-Cart all sit close together and
              the 'Selecciona tu pack' selector moves up into the
              first viewport. */}
          <div className="flex flex-col gap-2 md:gap-8">
            <div>
              <span className="text-[9px] md:text-xs lg:text-sm tracking-[0.3em] uppercase text-[var(--gold)]">
                {categoryLabel}
              </span>
              <h1 className="font-display text-xl md:text-5xl lg:text-6xl uppercase font-bold text-white mt-0.5 md:mt-3 leading-tight">
                {product.name}
              </h1>
            </div>

            {/* Bullets — compact on mobile: text-xs, tight gaps, small
                checks. Desktop keeps its big lg:text-xl treatment. */}
            {product.category === "perfume" ? (
              <ul className="flex flex-col gap-1 md:gap-3.5 text-xs md:text-lg lg:text-xl text-white">
                {carblockBullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-1.5 md:gap-3 leading-snug"
                  >
                    <Check
                      className="h-3.5 w-3.5 md:h-6 md:w-6 text-[var(--gold)] shrink-0 mt-0.5"
                      strokeWidth={3}
                    />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs md:text-lg lg:text-xl text-[var(--muted)] leading-relaxed">
                {fallbackDescription}
              </p>
            )}

            {/* Size chips — compact on mobile */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <span className="block text-[8px] md:text-xs lg:text-sm tracking-[0.3em] uppercase text-[var(--muted)] mb-1 md:mb-3">
                  {t("product.size")}
                </span>
                <div className="flex gap-2 md:gap-3">
                  {product.sizes.map((s) => (
                    <span
                      key={s}
                      className="px-2.5 md:px-6 py-1 md:py-3 rounded-full border border-[var(--gold)]/60 bg-[var(--gold)]/10 text-[10px] md:text-sm uppercase tracking-[0.15em] text-white font-medium"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Add to cart — tighter mobile vertical padding to keep the
                primary CTA above the fold. */}
            <div className="border-y border-[var(--border)] py-3 md:py-8">
              <AddToCart product={product} />
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-4 md:gap-6">
              {trustBadges.map(({ icon: Icon, label, sub }) => (
                <div
                  key={label}
                  className="flex flex-col items-center text-center gap-1.5 md:gap-2.5 py-3 md:py-5"
                >
                  <Icon className="h-5 w-5 md:h-8 md:w-8 text-[var(--gold)]" />
                  <span className="text-[10px] md:text-sm uppercase tracking-[0.2em] text-white font-medium">
                    {label}
                  </span>
                  <span className="text-[9px] md:text-xs text-[var(--muted)]">
                    {sub}
                  </span>
                </div>
              ))}
            </div>

            {/* Accordion details */}
            <Accordion
              type="multiple"
              className="border-t border-[var(--border)]"
            >
              <AccordionItem
                value="description"
                className="border-[var(--border)]"
              >
                <AccordionTrigger className="text-xs md:text-base lg:text-lg uppercase tracking-[0.2em] text-white hover:text-[var(--gold)] py-4 md:py-6">
                  {t("product.accordion.description")}
                </AccordionTrigger>
                <AccordionContent className="text-sm md:text-base lg:text-lg text-[var(--muted)] leading-relaxed pb-4 md:pb-6">
                  {product.longDescription ? (
                    <ul className="space-y-3">
                      {product.longDescription.map((d) => (
                        <li key={d.title}>
                          <p className="text-white font-semibold">{d.title}</p>
                          <p className="mt-1">{d.body}</p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>{fallbackDescription}</p>
                  )}
                </AccordionContent>
              </AccordionItem>

              {/* "How to Use It" — only on CarBlock. Expands to reveal the
                  Audi tutorial clip. */}
              {product.category === "perfume" && (
                <AccordionItem
                  value="how-to-use"
                  className="border-[var(--border)]"
                >
                  <AccordionTrigger className="text-xs md:text-base lg:text-lg uppercase tracking-[0.2em] text-white hover:text-[var(--gold)] py-4 md:py-6">
                    {t("product.accordion.howToUse")}
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 md:pb-6">
                    <div className="relative aspect-[9/16] max-h-[520px] md:max-h-[600px] mx-auto overflow-hidden rounded-lg bg-black border border-[var(--border)]">
                      <video
                        controls
                        playsInline
                        preload="metadata"
                        className="absolute inset-0 w-full h-full object-cover"
                      >
                        <source
                          src="/products/carblock-tutorial-en.mov"
                          type="video/mp4"
                        />
                        <source
                          src="/products/carblock-tutorial-en.mov"
                          type="video/quicktime"
                        />
                      </video>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )}

              <AccordionItem
                value="shipping"
                className="border-[var(--border)]"
              >
                <AccordionTrigger className="text-xs md:text-base lg:text-lg uppercase tracking-[0.2em] text-white hover:text-[var(--gold)] py-4 md:py-6">
                  {t("product.accordion.shipping")}
                </AccordionTrigger>
                <AccordionContent className="text-sm md:text-base lg:text-lg text-[var(--muted)] leading-relaxed pb-4 md:pb-6">
                  <ul className="list-disc pl-4 space-y-1.5">
                    {shippingBullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                    {/* The 6th bullet has an inline link to /legal/refunds.
                        Split into before / link / after so the link word
                        works in both English ('policy') and Spanish
                        ('política'). */}
                    <li>
                      {t("product.shipping.bullet6.before")}{" "}
                      <Link
                        href="/legal/refunds"
                        className="underline text-[var(--gold)] hover:text-[var(--gold-bright)] transition-colors"
                      >
                        {t("product.shipping.bullet6.linkText")}
                      </Link>{" "}
                      {t("product.shipping.bullet6.after")}
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              {/* Note: the old inline 'FAQ' accordion item was moved out
                  of this panel — see the dedicated FAQ module below. */}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Stats (only perfume) */}
      {product.category === "perfume" && <Stats />}

      {/* -------- Product FAQ module (CarBlock only) --------
          Six most-asked questions rendered as an expandable list. Sits
          between the Stats block and the related-products row so it
          reads as a real section on the page (not hidden inside the
          right-panel accordion). SEO-friendly — the Q&A text is
          server-visible to crawlers. */}
      {product.category === "perfume" && (
        <section
          id="faq"
          className="border-t border-[var(--border)] bg-black scroll-mt-24 md:scroll-mt-32"
        >
          <div className="container-x md:!max-w-[1100px] py-14 md:py-20 lg:py-24">
            <div className="text-center mb-8 md:mb-12">
              <span className="text-[11px] md:text-sm lg:text-base tracking-[0.3em] uppercase text-[var(--gold)] font-bold">
                {t("product.faq.section.eyebrow")}
              </span>
              <h2 className="font-display text-3xl md:text-5xl lg:text-6xl uppercase font-bold mt-3 md:mt-5 text-white leading-tight">
                {t("product.faq.section.title")}
              </h2>
            </div>

            <Accordion
              type="multiple"
              className="border-t border-[var(--border)]"
            >
              {productFaq.map((item, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="border-[var(--border)]"
                >
                  <AccordionTrigger className="text-sm md:text-base lg:text-lg text-white hover:text-[var(--gold)] py-5 md:py-6 text-left font-semibold">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm md:text-base lg:text-lg text-[var(--muted)] leading-relaxed pb-5 md:pb-6">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      )}

      {/* Related products */}
      {related.length > 0 && (
        <section className="border-t border-[var(--border)] bg-[var(--surface)]">
          <div className="container-x md:!max-w-[1600px] md:!px-6 lg:!px-10 py-16">
            <div className="text-center mb-10">
              <span className="text-[11px] tracking-[0.3em] uppercase text-[var(--gold)]">
                {t("product.related.eyebrow")}
              </span>
              <h2 className="font-display text-3xl md:text-4xl uppercase font-bold mt-3 text-white">
                {t("product.related.title.before")}{" "}
                <span className="text-gold-gradient">
                  {t("product.related.title.highlight")}
                </span>
              </h2>
            </div>
            <div className="grid gap-5 md:gap-8 lg:gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl md:!max-w-none mx-auto">
              {related.slice(0, 3).map((p) => (
                <ProductCard
                  key={p.slug}
                  product={p}
                  imageFit={
                    p.category === "wipes" || p.category === "bundle"
                      ? "contain"
                      : "cover"
                  }
                  imageScale={
                    p.category === "bundle" ? "130% auto" : undefined
                  }
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
