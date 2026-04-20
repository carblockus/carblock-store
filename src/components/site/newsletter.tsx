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
    <section className="bg-black py-20 border-b border-[var(--border)]">
      <div className="container-x text-center max-w-2xl">
        <span className="text-[11px] tracking-[0.3em] uppercase text-[var(--gold)]">
          Join the club
        </span>
        <h2 className="font-display text-3xl md:text-5xl uppercase font-bold mt-3 text-white leading-tight">
          Get <span className="text-gold-gradient">15% off</span> your first order
        </h2>
        <p className="mt-3 text-[var(--muted)]">
          Drop launches, restocks, and exclusive bundles — straight to your inbox.
        </p>

        {done ? (
          <p className="mt-8 inline-flex items-center gap-2 text-sm text-[var(--gold)] uppercase tracking-[0.18em]">
            ✓ Check your inbox for your 15% off code
          </p>
        ) : (
          <>
            <form
              onSubmit={onSubmit}
              className="mt-8 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
            >
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="h-12 bg-[var(--surface)] border-[var(--border-strong)] text-white placeholder:text-[var(--muted-2)] rounded-full px-5"
              />
              <Button
                type="submit"
                disabled={submitting}
                className="h-12 px-8 rounded-full bg-[var(--gold)] hover:bg-[var(--gold-bright)] text-black font-semibold tracking-[0.18em] uppercase text-xs disabled:opacity-50"
              >
                {submitting ? "Sending…" : "Subscribe"}
              </Button>
            </form>
            {error && (
              <p className="mt-3 text-xs text-red-300">{error}</p>
            )}
          </>
        )}
      </div>
    </section>
  );
}
