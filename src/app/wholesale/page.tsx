import Link from "next/link";
import {
  ChevronRight,
  Package,
  Ban,
  Truck,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { WholesaleForm } from "@/components/site/wholesale-form";

export const metadata = {
  title: "Wholesale Program — CarBlock",
  description:
    "Become a CarBlock distributor. 100-unit minimum, no Amazon/Walmart resale, marketing assets included.",
};

const rules = [
  {
    icon: Package,
    tone: "gold" as const,
    title: "100-unit minimum",
    body: "Wholesale orders start at 100 units of CarBlock per order. Mix of CarBlock and WipesBlock available — talk to us for combined pricing.",
  },
  {
    icon: Ban,
    tone: "red" as const,
    title: "No Amazon or Walmart resale",
    body: "Distributors agree NOT to resell CarBlock products on Amazon or Walmart. We protect those channels for our official US storefront.",
  },
  {
    icon: Truck,
    tone: "blue" as const,
    title: "Distributor pays shipping",
    body: "Approximately $60 per 100 units to ship to your state. Final cost varies by location — quoted before you confirm the order.",
  },
  {
    icon: Sparkles,
    tone: "green" as const,
    title: "Creatives & videos included",
    body: "Every distributor receives a marketing pack: branded photos, short-form video assets and product copy ready for your social channels.",
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

const checklist = [
  "Have a real selling channel (store, online, social)",
  "Comfortable starting at 100 units",
  "Willing to skip Amazon and Walmart channels",
  "Excited to grow CarBlock in your market",
];

export default function WholesalePage() {
  return (
    <div className="bg-background">
      {/* Breadcrumb */}
      <div className="border-b border-[var(--border)]">
        <div className="container-x py-4 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
          <Link href="/" className="hover:text-[var(--gold)] transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-white">Wholesale</span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative bg-black overflow-hidden border-b border-[var(--border)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.18),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(168,130,27,0.15),transparent_55%)]" />
        <div className="container-x relative z-10 py-20 md:py-24 max-w-3xl text-center">
          <span className="text-[11px] tracking-[0.3em] uppercase text-[var(--gold)]">
            Distributors program
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl uppercase font-bold mt-3 text-white leading-[1.05]">
            Sell CarBlock in your{" "}
            <span className="text-gold-gradient italic">market</span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-[var(--muted)] leading-relaxed">
            Carry the brand drivers love — premium car perfume + premium
            interior wipes — with marketing assets included.
          </p>
        </div>
      </section>

      {/* Rules — clear before they apply */}
      <section className="container-x py-16 md:py-20">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[11px] tracking-[0.3em] uppercase text-[var(--gold)]">
            Read this first
          </span>
          <h2 className="font-display text-3xl md:text-4xl uppercase font-bold mt-3 text-white">
            Program <span className="text-gold-gradient">rules</span>
          </h2>
          <p className="mt-3 text-sm md:text-base text-[var(--muted)]">
            Plain and simple. Apply only if all four work for your business —
            this saves you and us time.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {rules.map((r) => {
            const t = toneClasses[r.tone];
            return (
              <article
                key={r.title}
                className={`rounded-lg border ${t.border} ${t.bg} p-6 flex gap-4`}
              >
                <div
                  className={`h-12 w-12 rounded-full border ${t.icon} grid place-items-center shrink-0`}
                >
                  <r.icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-display text-base md:text-lg uppercase tracking-[0.12em] text-white">
                    {r.title}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed">
                    {r.body}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Are you a fit? checklist */}
      <section className="border-y border-[var(--border)] bg-[var(--surface)]">
        <div className="container-x py-12 md:py-16 max-w-3xl">
          <div className="text-center mb-8">
            <span className="text-[11px] tracking-[0.3em] uppercase text-[var(--gold)]">
              Quick fit check
            </span>
            <h2 className="font-display text-2xl md:text-3xl uppercase font-bold mt-3 text-white">
              Apply if all four are <span className="text-gold-gradient">true</span>
            </h2>
          </div>
          <ul className="space-y-3">
            {checklist.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-[var(--gold)] shrink-0 mt-0.5" />
                <span className="text-sm md:text-base text-white/90">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Form */}
      <section id="apply" className="container-x py-16 md:py-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-[11px] tracking-[0.3em] uppercase text-[var(--gold)]">
              Apply now
            </span>
            <h2 className="font-display text-3xl md:text-4xl uppercase font-bold mt-3 text-white">
              Tell us about{" "}
              <span className="text-gold-gradient">your business</span>
            </h2>
            <p className="mt-3 text-sm md:text-base text-[var(--muted)]">
              We respond within 2 business days with pricing, shipping quote
              and the marketing pack.
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
