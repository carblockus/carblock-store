import Link from "next/link";
import { ChevronRight, Sparkles, Leaf, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "About — CarBlock",
  description:
    "CarBlock — premium car interior fragrance and cleaning wipes. Operated by Tepew LLC, a registered company in New Jersey.",
};

const pillars = [
  {
    icon: Sparkles,
    title: "Sophistication",
    body: "Every fragrance is designed to feel like a perfume — not a generic air freshener — for drivers who care about every detail of their image.",
  },
  {
    icon: Leaf,
    title: "Long-lasting",
    body: "One application of CarBlock Millonario lasts up to three months. WipesBlock leaves a fresh scent every time you clean.",
  },
  {
    icon: ShieldCheck,
    title: "Premium quality",
    body: "Tested across thousands of cars. From Range Rovers and Ferraris to family SUVs, the result is the same — a refined interior, every drive.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-background">
      {/* Breadcrumb */}
      <div className="border-b border-[var(--border)]">
        <div className="container-x py-4 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
          <Link href="/" className="hover:text-[var(--gold)] transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-white">About</span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative bg-black overflow-hidden border-b border-[var(--border)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.18),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(168,130,27,0.15),transparent_55%)]" />

        <div className="container-x relative z-10 py-20 md:py-28 max-w-3xl text-center">
          <span className="text-[11px] tracking-[0.3em] uppercase text-[var(--gold)]">
            Our story
          </span>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl uppercase font-bold mt-3 text-white leading-[1.05]">
            More than a{" "}
            <span className="text-gold-gradient italic">scent</span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-[var(--muted)] leading-relaxed">
            CarBlock began with a simple belief: the inside of your car deserves
            the same care as your home. We turned car fragrance into a craft —
            elegant, lasting and unmistakably premium.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="container-x py-16 md:py-24 max-w-3xl">
        <div className="space-y-6 text-[var(--muted)] leading-relaxed text-base md:text-lg">
          <p>
            <strong className="text-white">Block CarBlock Millonario</strong>{" "}
            was born to replace the cheap car fresheners that fade in days. We
            wanted a scent that would last months — and feel as refined as the
            cars our customers drive.
          </p>
          <p>
            Today CarBlock is the choice of drivers across the United States,
            from luxury garages to daily commuters. Over{" "}
            <strong className="text-white">100,000 satisfied drivers</strong>{" "}
            have made their interiors smell like new again.
          </p>
          <p>
            Alongside our signature perfume, our{" "}
            <strong className="text-white">WipesBlock</strong> interior wipes
            keep leather, vinyl and fabric looking pristine — biodegradable and
            safe for every surface.
          </p>
        </div>
      </section>

      {/* Pillars */}
      <section className="border-y border-[var(--border)] bg-[var(--surface)]">
        <div className="container-x py-16 md:py-20">
          <div className="text-center mb-12">
            <span className="text-[11px] tracking-[0.3em] uppercase text-[var(--gold)]">
              What we stand for
            </span>
            <h2 className="font-display text-3xl md:text-4xl uppercase font-bold mt-3 text-white">
              Built for those who{" "}
              <span className="text-gold-gradient">care</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pillars.map((p) => (
              <article
                key={p.title}
                className="rounded-lg border border-[var(--border)] bg-black p-6 text-center"
              >
                <div className="mx-auto h-12 w-12 rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/40 grid place-items-center mb-5">
                  <p.icon className="h-5 w-5 text-[var(--gold)]" />
                </div>
                <h3 className="font-display text-lg uppercase tracking-[0.15em] text-white">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm text-[var(--muted)] leading-relaxed">
                  {p.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Company info */}
      <section className="container-x py-16 md:py-20 max-w-3xl text-center">
        <span className="text-[11px] tracking-[0.3em] uppercase text-[var(--gold)]">
          The company behind it
        </span>
        <h2 className="font-display text-3xl md:text-4xl uppercase font-bold mt-3 text-white">
          Tepew LLC
        </h2>
        <p className="mt-4 text-[var(--muted)] leading-relaxed">
          Block CarBlock Millonario is operated in the United States by{" "}
          <span className="text-white font-medium">Tepew LLC</span>, a
          registered company in New Jersey. We ship across all 50 states with
          free standard shipping on every order.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            className="rounded-full bg-[var(--gold)] hover:bg-[var(--gold-bright)] text-black font-semibold tracking-[0.18em] uppercase text-xs h-12 px-8"
          >
            <Link href="/products">Shop CarBlock</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="rounded-full border-white/30 bg-transparent hover:bg-white hover:text-black text-white tracking-[0.18em] uppercase text-xs h-12 px-8"
          >
            <Link href="/contact">Contact us</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
