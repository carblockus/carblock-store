"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "footer-newsletter" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not subscribe");
      setDone(true);
      setEmail("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="bg-black py-10 md:py-20 lg:py-28 border-b border-[var(--border)]">
      <div className="container-x text-center max-w-2xl md:!max-w-4xl">
        <span className="text-[11px] md:text-sm lg:text-base tracking-[0.3em] uppercase text-[var(--gold)]">
          Join the club
        </span>
        <h2 className="font-display text-3xl md:text-6xl lg:text-7xl uppercase font-bold mt-3 md:mt-5 text-white leading-tight">
          Get <span className="text-gold-gradient">15% off</span> your first order
        </h2>
        <p className="mt-3 md:mt-5 text-base md:text-xl lg:text-2xl text-[var(--muted)]">
          Drop launches, restocks, and exclusive bundles — straight to your inbox.
        </p>

        {done ? (
          <p className="mt-8 md:mt-10 inline-flex items-center gap-2 text-sm md:text-lg text-[var(--gold)] uppercase tracking-[0.18em]">
            ✓ Check your inbox for your 15% off code
          </p>
        ) : (
          <>
            <form
              onSubmit={onSubmit}
              className="mt-8 md:mt-12 flex flex-col sm:flex-row gap-3 md:gap-4 max-w-lg md:max-w-2xl mx-auto"
            >
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="h-12 md:h-16 md:!text-base lg:!text-lg bg-[var(--surface)] border-[var(--border-strong)] text-white placeholder:text-[var(--muted-2)] rounded-full px-5 md:px-7"
              />
              <Button
                type="submit"
                disabled={submitting}
                className="h-12 md:h-16 px-8 md:px-12 rounded-full bg-[var(--gold)] hover:bg-[var(--gold-bright)] text-black font-semibold tracking-[0.18em] uppercase text-xs md:text-base disabled:opacity-50"
              >
                {submitting ? "Sending…" : "Subscribe"}
              </Button>
            </form>
            {error && (
              <p className="mt-3 text-xs md:text-sm text-red-300">{error}</p>
            )}
          </>
        )}
      </div>
    </section>
  );
}
