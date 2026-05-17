import { SubscribeForm } from "@/components/site/subscribe-form";
import { Check } from "lucide-react";

export const metadata = {
  title: "Subscribe & Save 20% — CarBlock",
  description:
    "Save 20% on every order. CarBlock delivered to your door every 6 weeks. Free shipping. Cancel anytime.",
};

const perks = [
  {
    title: "Save 20%",
    body: "Every renewal, automatically. Locked in for as long as your subscription is active.",
  },
  {
    title: "Delivered every 6 weeks",
    body: "Timed so a fresh bottle arrives just as the previous one wears off.",
  },
  {
    title: "Free shipping",
    body: "Every single order, no minimum. Lower 48 US states.",
  },
  {
    title: "Cancel anytime",
    body: "Skip, pause or cancel from your account. Zero questions asked.",
  },
];

export default function SubscribeAndSavePage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="container-x py-12 md:py-20 text-center">
        <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--gold)]">
          Subscribe &amp; Save
        </span>
        <h1 className="font-display text-4xl md:text-6xl uppercase font-bold mt-3 text-white leading-[1.05]">
          Save <span className="text-gold-gradient">20%</span>
          <br />
          on every order
        </h1>
        <p className="mt-5 max-w-md mx-auto text-sm md:text-base text-[var(--muted)]">
          CarBlock delivered to your door every 6 weeks. Always 20% off.
          Free shipping. Cancel anytime.
        </p>
      </section>

      {/* Perks grid */}
      <section className="container-x pb-12">
        <ul className="grid gap-3 sm:grid-cols-2 max-w-2xl mx-auto">
          {perks.map((p) => (
            <li
              key={p.title}
              className="flex gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4"
            >
              <Check className="h-5 w-5 text-[var(--gold)] shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-white uppercase tracking-[0.12em]">
                  {p.title}
                </p>
                <p className="text-xs text-[var(--muted)] mt-1 leading-relaxed">
                  {p.body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Form */}
      <section className="container-x pb-24">
        <SubscribeForm />
      </section>
    </div>
  );
}
