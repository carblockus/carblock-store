"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type SubProduct = {
  slug: string;
  name: string;
  monthly: number;
  image: string;
};

// Two subscription-eligible products. Address-only flow — Stripe Checkout
// itself collects shipping again so it's verified before charge.
const SUB_PRODUCTS: SubProduct[] = [
  {
    slug: "carblock-millonario-150ml",
    name: "CarBlock 150ml",
    monthly: 35,
    image: "/products/carblock-perfume-main.jpg",
  },
  {
    slug: "wipesblock-interior-60",
    name: "WipesBlock — 60 wipes",
    monthly: 35,
    image: "/products/wipesblock-main.jpg",
  },
];

export function SubscribeForm() {
  const [productSlug, setProductSlug] = useState(SUB_PRODUCTS[0].slug);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selected = SUB_PRODUCTS.find((p) => p.slug === productSlug)!;
  const discounted = (selected.monthly * 0.8).toFixed(2);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const r = await fetch("/api/subscribe-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productSlug,
          email,
          firstName,
          lastName,
        }),
      });
      const data = await r.json();
      if (!r.ok || !data.url) throw new Error(data.error ?? "Could not start checkout");
      // Redirect to Stripe-hosted checkout in subscription mode. Stripe will
      // collect the card + shipping address, then redirect to /thanks.
      window.location.href = data.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto space-y-6 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8"
    >
      <h2 className="font-display text-xl uppercase tracking-[0.18em] text-white text-center">
        Start your subscription
      </h2>

      {/* Product picker */}
      <fieldset className="space-y-3">
        <legend className="text-[10px] uppercase tracking-[0.22em] text-[var(--muted)] mb-2">
          Choose your product
        </legend>
        {SUB_PRODUCTS.map((p) => {
          const checked = p.slug === productSlug;
          return (
            <label
              key={p.slug}
              className={`flex items-center gap-3 rounded-md border p-3 cursor-pointer transition-colors ${
                checked
                  ? "border-[var(--gold)] bg-[var(--gold)]/10"
                  : "border-[var(--border-strong)] bg-black/40 hover:border-[var(--gold)]/60"
              }`}
            >
              <input
                type="radio"
                name="product"
                value={p.slug}
                checked={checked}
                onChange={() => setProductSlug(p.slug)}
                className="accent-[var(--gold)]"
              />
              <div
                className="h-12 w-12 rounded bg-black/60 bg-center bg-no-repeat bg-contain shrink-0"
                style={{ backgroundImage: `url('${p.image}')` }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white font-medium leading-tight">
                  {p.name}
                </p>
                <p className="text-xs text-[var(--muted)] mt-0.5">
                  <span className="line-through opacity-60">
                    ${p.monthly.toFixed(2)}
                  </span>{" "}
                  <span className="text-[var(--gold)] font-semibold">
                    ${(p.monthly * 0.8).toFixed(2)} every 6 weeks
                  </span>
                </p>
              </div>
            </label>
          );
        })}
      </fieldset>

      {/* Contact info — Stripe will collect address + card on the next page */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
            Email
          </Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@example.com"
            className="h-12 bg-black/40 border-[var(--border-strong)] text-white placeholder:text-[var(--muted-2)] rounded-md px-4"
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
              First name
            </Label>
            <Input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="h-12 bg-black/40 border-[var(--border-strong)] text-white rounded-md px-4"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
              Last name
            </Label>
            <Input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="h-12 bg-black/40 border-[var(--border-strong)] text-white rounded-md px-4"
            />
          </div>
        </div>
      </div>

      {error && (
        <p className="text-xs text-red-400 text-center">{error}</p>
      )}

      <Button
        type="submit"
        disabled={submitting}
        className="w-full rounded-full bg-[var(--gold)] hover:bg-[var(--gold-bright)] text-black font-bold tracking-[0.18em] uppercase text-xs h-12 disabled:opacity-50"
      >
        {submitting
          ? "Starting checkout…"
          : `Subscribe & Save — $${discounted} every 6 weeks`}
      </Button>

      <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--muted)] text-center">
        Next: payment + shipping on Stripe&apos;s secure checkout
      </p>
    </form>
  );
}
