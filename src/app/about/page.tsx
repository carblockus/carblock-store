import Link from "next/link";
import {
  ChevronRight,
  Sparkles,
  Wind,
  Truck,
  ShieldCheck,
  Headphones,
  Award,
  Instagram,
  Globe,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "About — CarBlock",
  description:
    "Block CarBlock Millonario is a Colombian fragrance house. We don't make air fresheners — we make car perfumes. Operated in the US by Tepew LLC.",
};

const lineup = [
  {
    icon: Sparkles,
    name: "CarBlock",
    tagline: "150ml",
    body: "The original car perfume. Smells like new.",
  },
  {
    icon: Wind,
    name: "WipesBlock",
    tagline: "Premium wipes",
    body: "Clean, restore, and deodorize your interior in 30 seconds.",
  },
];

const numbers = [
  { icon: Award, label: "Amazon's Choice" },
  { icon: Instagram, label: "109K+ on Instagram" },
  { icon: Globe, label: "14+ countries" },
  { icon: MapPin, label: "Proudly made in Colombia" },
];

const promise = [
  {
    icon: Truck,
    title: "Free shipping",
    body: "On every order to the lower 48 US states. No minimum required.",
  },
  {
    icon: ShieldCheck,
    title: "30-day guarantee",
    body: "If you don't feel the difference, we refund your order. No paperwork.",
  },
  {
    icon: Headphones,
    title: "24/7 support",
    body: "Real humans, ready when you need them.",
  },
];

const channels = [
  {
    name: "Amazon",
    href: "https://www.amazon.com/Carblock-Premium-Car-Perfume-Long-Lasting/dp/B0BJZQFTYQ/ref=pd_rhf_dp_s_ci_mcx_mr__d_sccl_1_1/143-9051780-5013300?pd_rd_w=zTpxA&content-id=amzn1.sym.c2ce25da-4d17-4f37-af20-bde98a9f0bcd:amzn1.symc.d3391730-f670-41da-8b34-61787b3edb82&pf_rd_p=c2ce25da-4d17-4f37-af20-bde98a9f0bcd&pf_rd_r=6WV8WH8KB749ZT4671JV&pd_rd_wg=DEXmn&pd_rd_r=77d3dc21-c719-45f5-afb8-58f8241dbb41&pd_rd_i=B0BJZQFTYQ&psc=1",
  },
  {
    name: "TikTok Shop",
    href: "https://www.tiktok.com/shop/store/carblock-perfume-carro/7494142720595428782",
  },
  {
    name: "Walmart",
    href: "https://www.walmart.com/ip/Carblock-Premium-Car-Perfume-Long-Lasting-Odor-Eliminator-Up-3-Months-Neutralizes-Bad-Odors-Humidity-Pet-Smoke-Smells-150-ml-Residue-Car-Interior-Fra/19323606705",
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

      {/* Hero — opening punch */}
      <section className="relative bg-black overflow-hidden border-b border-[var(--border)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.18),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(168,130,27,0.15),transparent_55%)]" />

        <div className="container-x relative z-10 py-20 md:py-28 max-w-3xl">
          <span className="text-[11px] tracking-[0.3em] uppercase text-[var(--gold)]">
            Our story
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl uppercase font-bold mt-3 text-white leading-[1.05]">
            Most car fresheners smell like a{" "}
            <span className="text-gold-gradient italic">gas station</span>.
          </h1>
          <p className="mt-6 text-base md:text-lg text-[var(--muted)] leading-relaxed">
            Pine trees. Fake vanilla. Chemicals that fade in a week.
          </p>
          <p className="mt-3 text-xl md:text-2xl text-white font-medium">
            We build something else.
          </p>
        </div>
      </section>

      {/* Origin story */}
      <section className="container-x py-16 md:py-24 max-w-3xl">
        <div className="space-y-6 text-[var(--muted)] leading-relaxed text-base md:text-lg">
          <p>
            <strong className="text-white">Block CarBlock Millonario</strong>{" "}
            is a <strong className="text-white">Colombian fragrance house</strong>
            , founded in 2021. We don&apos;t make air fresheners.
          </p>
          <p>
            We make <strong className="text-white">car perfumes</strong> — with
            the same weight and permanence as a luxury personal fragrance,
            engineered to live inside your vehicle.
          </p>
        </div>
      </section>

      {/* What makes us different */}
      <section className="border-y border-[var(--border)] bg-[var(--surface)]">
        <div className="container-x py-16 md:py-20">
          <div className="text-center mb-12">
            <span className="text-[11px] tracking-[0.3em] uppercase text-[var(--gold)]">
              Why it&apos;s different
            </span>
            <h2 className="font-display text-3xl md:text-4xl uppercase font-bold mt-3 text-white leading-tight">
              What makes us{" "}
              <span className="text-gold-gradient">different</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <article className="rounded-lg border border-[var(--border)] bg-black p-8">
              <h3 className="font-display text-xl uppercase tracking-[0.12em] text-white">
                It&apos;s a perfume. Not a freshener.
              </h3>
              <p className="mt-4 text-sm text-[var(--muted)] leading-relaxed">
                Vent clips fade. Hanging trees smell like a cab. CarBlock bonds
                to your interior fibers and releases scent slowly — for{" "}
                <span className="text-white font-semibold">months</span>.
              </p>
            </article>

            <article className="rounded-lg border border-[var(--border)] bg-black p-8">
              <h3 className="font-display text-xl uppercase tracking-[0.12em] text-white">
                One application. Up to{" "}
                <span className="text-gold-gradient">3 months</span>.
              </h3>
              <p className="mt-4 text-sm text-[var(--muted)] leading-relaxed">
                Pour it under your mats once.{" "}
                <span className="text-white font-semibold">
                  Forget about it.
                </span>
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Lineup */}
      <section className="container-x py-16 md:py-20">
        <div className="text-center mb-12">
          <span className="text-[11px] tracking-[0.3em] uppercase text-[var(--gold)]">
            The lineup
          </span>
          <h2 className="font-display text-3xl md:text-4xl uppercase font-bold mt-3 text-white">
            Engineered for <span className="text-gold-gradient">scent</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {lineup.map((p) => (
            <article
              key={p.name}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-7 flex flex-col gap-4"
            >
              <div className="h-12 w-12 rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/40 grid place-items-center">
                <p.icon className="h-5 w-5 text-[var(--gold)]" />
              </div>
              <div>
                <h3 className="font-display text-lg uppercase tracking-[0.12em] text-white">
                  {p.name}
                </h3>
                <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--gold)] mt-1">
                  {p.tagline}
                </p>
              </div>
              <p className="text-sm text-[var(--muted)] leading-relaxed">
                {p.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* The numbers */}
      <section className="border-y border-[var(--border)] bg-black overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.12),transparent_70%)]" />
        <div className="container-x relative z-10 py-16 md:py-20">
          <div className="text-center mb-12">
            <span className="text-[11px] tracking-[0.3em] uppercase text-[var(--gold)]">
              The numbers
            </span>
            <h2 className="font-display text-3xl md:text-4xl uppercase font-bold mt-3 text-white">
              Trusted across{" "}
              <span className="text-gold-gradient">14+ countries</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {numbers.map((n) => (
              <div
                key={n.label}
                className="flex flex-col items-center text-center gap-3 p-4"
              >
                <div className="h-12 w-12 rounded-full bg-[var(--gold)]/15 border border-[var(--gold)]/50 grid place-items-center">
                  <n.icon className="h-5 w-5 text-[var(--gold)]" />
                </div>
                <span className="text-sm md:text-base font-medium text-white tracking-tight">
                  {n.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our promise */}
      <section className="container-x py-16 md:py-20">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <span className="text-[11px] tracking-[0.3em] uppercase text-[var(--gold)]">
            Our promise
          </span>
          <h2 className="font-display text-3xl md:text-4xl uppercase font-bold mt-3 text-white leading-tight">
            If you don&apos;t feel the{" "}
            <span className="text-gold-gradient italic">difference</span>, we
            refund your order.
          </h2>
          <p className="mt-4 text-sm text-[var(--muted)]">No paperwork.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {promise.map((p) => (
            <article
              key={p.title}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-7 text-center"
            >
              <div className="mx-auto h-12 w-12 rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/40 grid place-items-center mb-5">
                <p.icon className="h-5 w-5 text-[var(--gold)]" />
              </div>
              <h3 className="font-display text-lg uppercase tracking-[0.12em] text-white">
                {p.title}
              </h3>
              <p className="mt-3 text-sm text-[var(--muted)] leading-relaxed">
                {p.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Available on */}
      <section className="border-y border-[var(--border)] bg-[var(--surface)]">
        <div className="container-x py-14 md:py-16 text-center">
          <span className="text-[11px] tracking-[0.3em] uppercase text-[var(--gold)]">
            Also available on
          </span>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 md:gap-5">
            {channels.map((c) => (
              <a
                key={c.name}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full border border-[var(--border-strong)] bg-black text-sm uppercase tracking-[0.18em] text-white font-medium hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors"
              >
                {c.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Tepew LLC + CTA */}
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
          registered company in New Jersey. We ship across the contiguous US
          (lower 48 states) with free standard shipping on every order.
          Currently not available in Alaska, Hawaii or Puerto Rico.
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
