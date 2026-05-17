"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Stats } from "@/components/site/stats";
import {
  AmazonIcon,
  externalRetailers,
} from "@/components/site/external-channels";
import { useT } from "@/lib/lang-context";

const amazonHref = externalRetailers.find((r) => r.label === "Amazon")!.href;

/**
 * /how-to-use — slim version after the user deleted the page hero,
 * the HowToUse video block and the Spanish YouTube tutorial section.
 *
 * What remains: breadcrumb → Stats (How to Apply with TECHNIQUE 1+2
 * cards + 25/25/50 distribution) → bottom CTA with the three buttons.
 *
 * The HowToUse component still ships — it just doesn't render here.
 * It's used on the CarBlock perfume product detail page.
 */
export default function HowToUsePage() {
  const t = useT();

  return (
    <div className="bg-background">
      {/* Breadcrumb */}
      <div className="border-b border-[var(--border)]">
        <div className="container-x py-4 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
          <Link href="/" className="hover:text-[var(--gold)] transition-colors">
            {t("howto.breadcrumb.home")}
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-white">{t("howto.breadcrumb.current")}</span>
        </div>
      </div>

      {/* Stats — How to Apply + Technique cards + 25/25/50 distribution */}
      <Stats />

      {/* CTA */}
      <section className="container-x py-16 md:py-20 max-w-3xl text-center">
        <span className="text-[11px] tracking-[0.3em] uppercase text-[var(--gold)]">
          {t("howto.cta.eyebrow")}
        </span>
        <h2 className="font-display text-3xl md:text-4xl uppercase font-bold mt-3 text-white">
          {t("howto.cta.title.before")}{" "}
          <span className="text-gold-gradient">
            {t("howto.cta.title.highlight")}
          </span>
        </h2>
        <p className="mt-4 text-[var(--muted)]">{t("howto.cta.body")}</p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Button
            asChild
            className="rounded-full bg-[var(--gold)] hover:bg-[var(--gold-bright)] text-black font-semibold tracking-[0.18em] uppercase text-xs h-12 px-8"
          >
            <Link href="/products">{t("howto.cta.shopNow")}</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="rounded-full border-white/30 bg-transparent hover:bg-[var(--gold)] hover:text-black text-white tracking-[0.18em] uppercase text-xs h-12 px-6"
          >
            <a
              href={amazonHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              <AmazonIcon className="h-4 w-4 shrink-0" />
              <span>{t("howto.cta.shopAmazon")}</span>
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="rounded-full border-white/30 bg-transparent hover:bg-white hover:text-black text-white tracking-[0.18em] uppercase text-xs h-12 px-8"
          >
            <Link href="/contact">{t("howto.cta.contact")}</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
