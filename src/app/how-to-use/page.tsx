import Link from "next/link";
import { ChevronRight, Sparkles, Wind } from "lucide-react";
import { YouTubeEmbed } from "@/components/site/youtube-embed";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "How to Use — CarBlock",
  description:
    "Step-by-step videos on how to apply CarBlock perfume and use WipesBlock — in English and Spanish.",
};

/**
 * IMPORTANT: drop the YouTube IDs below when the videos are uploaded.
 * The page already renders a "Coming soon" placeholder while the IDs are
 * empty, so it's safe to ship.
 *
 * Example: for https://youtu.be/dQw4w9WgXcQ → videoId: "dQw4w9WgXcQ"
 */
const videos = {
  en: {
    carblock: { videoId: "", title: "How to apply CarBlock — English" },
    wipes: { videoId: "", title: "How to use WipesBlock — English" },
  },
  es: {
    carblock: { videoId: "", title: "Cómo aplicar CarBlock — Español" },
    wipes: { videoId: "", title: "Cómo usar WipesBlock — Español" },
  },
};

type LangSection = {
  key: "en" | "es";
  title: string;
  subtitle: string;
};

const languageSections: LangSection[] = [
  {
    key: "en",
    title: "English",
    subtitle: "Step-by-step tutorials in English.",
  },
  {
    key: "es",
    title: "Español",
    subtitle: "Tutoriales paso a paso en español.",
  },
];

export default function HowToUsePage() {
  return (
    <div className="bg-background">
      {/* Breadcrumb */}
      <div className="border-b border-[var(--border)]">
        <div className="container-x py-4 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
          <Link href="/" className="hover:text-[var(--gold)] transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-white">How to use</span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative bg-black overflow-hidden border-b border-[var(--border)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.18),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(168,130,27,0.15),transparent_55%)]" />

        <div className="container-x relative z-10 py-20 md:py-24 max-w-3xl text-center">
          <span className="text-[11px] tracking-[0.3em] uppercase text-[var(--gold)]">
            Tutorials
          </span>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl uppercase font-bold mt-3 text-white leading-[1.05]">
            How to <span className="text-gold-gradient italic">use it</span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-[var(--muted)] leading-relaxed">
            One application of CarBlock lasts up to 3 months. WipesBlock cleans
            and revitalizes your interior in seconds. Watch how to get the most
            out of every product.
          </p>
        </div>
      </section>

      {/* Video sections */}
      {languageSections.map((lang) => (
        <section
          key={lang.key}
          className={`${
            lang.key === "es" ? "bg-[var(--surface)]" : "bg-background"
          } border-b border-[var(--border)]`}
        >
          <div className="container-x py-16 md:py-20">
            <div className="text-center mb-12">
              <span className="text-[11px] tracking-[0.3em] uppercase text-[var(--gold)]">
                Tutorials
              </span>
              <h2 className="font-display text-3xl md:text-4xl uppercase font-bold mt-3 text-white">
                {lang.title}
              </h2>
              <p className="mt-3 text-sm text-[var(--muted)]">
                {lang.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:gap-8 lg:gap-12 max-w-3xl mx-auto">
              {/* CarBlock video */}
              <article className="space-y-4 mx-auto w-full max-w-[320px]">
                <YouTubeEmbed
                  videoId={videos[lang.key].carblock.videoId}
                  title={videos[lang.key].carblock.title}
                />
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/40 grid place-items-center shrink-0">
                    <Sparkles className="h-4 w-4 text-[var(--gold)]" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display text-lg uppercase tracking-[0.12em] text-white">
                      CarBlock
                    </h3>
                    <p className="text-sm text-[var(--muted)] mt-1">
                      {lang.key === "en"
                        ? "How to apply the perfume for up to 3 months of fragrance."
                        : "Cómo aplicar el perfume para hasta 3 meses de fragancia."}
                    </p>
                  </div>
                </div>
              </article>

              {/* WipesBlock video */}
              <article className="space-y-4 mx-auto w-full max-w-[320px]">
                <YouTubeEmbed
                  videoId={videos[lang.key].wipes.videoId}
                  title={videos[lang.key].wipes.title}
                />
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/40 grid place-items-center shrink-0">
                    <Wind className="h-4 w-4 text-[var(--gold)]" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display text-lg uppercase tracking-[0.12em] text-white">
                      WipesBlock
                    </h3>
                    <p className="text-sm text-[var(--muted)] mt-1">
                      {lang.key === "en"
                        ? "Clean, restore and deodorize leather, vinyl and fabric."
                        : "Limpia, restaura y desodoriza cuero, vinilo y tela."}
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="container-x py-16 md:py-20 max-w-3xl text-center">
        <span className="text-[11px] tracking-[0.3em] uppercase text-[var(--gold)]">
          Ready to try it?
        </span>
        <h2 className="font-display text-3xl md:text-4xl uppercase font-bold mt-3 text-white">
          Get yours and{" "}
          <span className="text-gold-gradient">feel the difference</span>
        </h2>
        <p className="mt-4 text-[var(--muted)]">
          Free shipping on every order. 30-day money-back guarantee.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            className="rounded-full bg-[var(--gold)] hover:bg-[var(--gold-bright)] text-black font-semibold tracking-[0.18em] uppercase text-xs h-12 px-8"
          >
            <Link href="/products">Shop now</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="rounded-full border-white/30 bg-transparent hover:bg-white hover:text-black text-white tracking-[0.18em] uppercase text-xs h-12 px-8"
          >
            <Link href="/contact">Have a question?</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
