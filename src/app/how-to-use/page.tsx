"use client";

import Link from "next/link";
import { ChevronRight, Sparkles, Wind } from "lucide-react";
import { YouTubeEmbed } from "@/components/site/youtube-embed";
import { Button } from "@/components/ui/button";
import { Stats } from "@/components/site/stats";
import { HowToUse } from "@/components/site/how-to-use";
import {
  AmazonIcon,
  externalRetailers,
} from "@/components/site/external-channels";
import { useT } from "@/lib/lang-context";

const amazonHref = externalRetailers.find((r) => r.label === "Amazon")!.href;

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

      {/* Hero */}
      <section className="relative bg-black overflow-hidden border-b border-[var(--border)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.18),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(168,130,27,0.15),transparent_55%)]" />

        <div className="container-x relative z-10 py-20 md:py-24 max-w-3xl text-center">
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl uppercase font-bold text-white leading-[1.05]">
            {t("howto.hero.title.before")}{" "}
            <span className="text-gold-gradient italic">
              {t("howto.hero.title.highlight")}
            </span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-[var(--muted)] leading-relaxed">
            {t("howto.hero.body")}
          </p>
        </div>
      </section>

      {/* Stats — How to Apply + Technique cards linking to #how-to-use */}
      <Stats />

      {/* Vertical iPhone video tutorial */}
      <section className="container-x py-12 md:py-16 border-b border-[var(--border)]">
        <HowToUse id="how-to-use" />
      </section>

      {/* Bonus Spanish YouTube slots — placeholder until videos are
          uploaded; the page reads "Coming soon" until then. */}
      <section className="bg-[var(--surface)] border-b border-[var(--border)]">
        <div className="container-x py-16 md:py-20">
          <div className="text-center mb-12">
            <span className="text-[11px] tracking-[0.3em] uppercase text-[var(--gold)]">
              {t("howto.bonus.eyebrow")}
            </span>
            <h2 className="font-display text-3xl md:text-4xl uppercase font-bold mt-3 text-white">
              {t("howto.bonus.section.es")}
            </h2>
            <p className="mt-3 text-sm text-[var(--muted)]">
              {t("howto.bonus.subtitle.es")}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-8 lg:gap-12 max-w-3xl mx-auto">
            {/* CarBlock video */}
            <article className="space-y-4 mx-auto w-full max-w-[320px]">
              <YouTubeEmbed videoId="" title="Cómo aplicar CarBlock" />
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/40 grid place-items-center shrink-0">
                  <Sparkles className="h-4 w-4 text-[var(--gold)]" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-display text-lg uppercase tracking-[0.12em] text-white">
                    CarBlock
                  </h3>
                  <p className="text-sm text-[var(--muted)] mt-1">
                    {t("howto.bonus.carblock.body")}
                  </p>
                </div>
              </div>
            </article>

            {/* WipesBlock video */}
            <article className="space-y-4 mx-auto w-full max-w-[320px]">
              <YouTubeEmbed videoId="" title="Cómo usar WipesBlock" />
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/40 grid place-items-center shrink-0">
                  <Wind className="h-4 w-4 text-[var(--gold)]" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-display text-lg uppercase tracking-[0.12em] text-white">
                    WipesBlock
                  </h3>
                  <p className="text-sm text-[var(--muted)] mt-1">
                    {t("howto.bonus.wipes.body")}
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

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
