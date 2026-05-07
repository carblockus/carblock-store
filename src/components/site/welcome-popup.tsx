"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useT } from "@/lib/lang-context";

const STORAGE_KEY = "carblock-welcome-popup-dismissed";
const DELAY_MS = 1500;

export function WelcomePopup() {
  const t = useT();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (dismissed) return;
    const timer = setTimeout(() => setOpen(true), DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  function dismiss() {
    setOpen(false);
    localStorage.setItem(STORAGE_KEY, "1");
  }

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "welcome-popup" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not subscribe");
      setSubmitted(true);
      localStorage.setItem(STORAGE_KEY, "1");
      setTimeout(() => setOpen(false), 2600);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => (v ? setOpen(true) : dismiss())}
    >
      <DialogContent
        className="overflow-hidden bg-black border-[var(--gold)]/40 p-0 sm:max-w-[520px] text-white"
        showCloseButton
      >
        {/* Gold glow decorations */}
        <div className="pointer-events-none absolute -top-20 -right-20 h-60 w-60 rounded-full bg-[radial-gradient(circle_at_center,rgba(242,201,76,0.45),transparent_60%)] blur-2xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.35),transparent_60%)] blur-2xl" />

        <div className="relative p-8 md:p-10 text-center">
          <span className="inline-block text-[10px] tracking-[0.32em] uppercase text-[var(--gold)] mb-4">
            {t("popup.welcome")}
          </span>

          {!submitted ? (
            <>
              <DialogTitle asChild>
                <h2 className="font-display text-4xl md:text-5xl uppercase font-bold leading-[0.95]">
                  {t("popup.title.before")}{" "}
                  <span className="text-gold-gradient">
                    {t("popup.title.discount")}
                  </span>
                  <br />
                  {t("popup.title.suffix")}
                </h2>
              </DialogTitle>
              <DialogDescription asChild>
                <p className="mt-4 text-sm text-white/70 max-w-sm mx-auto leading-relaxed">
                  {t("popup.body")}
                </p>
              </DialogDescription>

              <form
                onSubmit={handleSubmit}
                className="mt-7 flex flex-col gap-3"
              >
                <Input
                  type="email"
                  required
                  placeholder={t("popup.emailPlaceholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 bg-[var(--surface)] border-[var(--border-strong)] text-white placeholder:text-[var(--muted-2)] rounded-full px-5 text-center"
                />
                <Button
                  type="submit"
                  disabled={submitting}
                  className="h-12 rounded-full bg-[var(--gold)] hover:bg-[var(--gold-bright)] text-black font-semibold tracking-[0.18em] uppercase text-xs disabled:opacity-50"
                >
                  {submitting ? "…" : t("popup.cta")}
                </Button>
                {error && (
                  <p className="text-xs text-red-300 text-center mt-1">
                    {error}
                  </p>
                )}
              </form>

              <button
                type="button"
                onClick={dismiss}
                className="mt-5 text-[10px] tracking-[0.3em] uppercase text-[var(--muted)] hover:text-white transition-colors"
              >
                {t("popup.dismiss")}
              </button>

              <p className="mt-4 text-[10px] text-[var(--muted-2)]">
                {t("popup.legal")}
              </p>
            </>
          ) : (
            <div className="py-10">
              <div className="mx-auto h-16 w-16 rounded-full bg-[var(--gold)] text-black flex items-center justify-center text-3xl mb-5">
                ✓
              </div>
              <h3 className="font-display text-3xl md:text-4xl uppercase font-bold">
                {t("popup.success.title")}{" "}
                <span className="text-gold-gradient">
                  {t("popup.success.title.highlight")}
                </span>
              </h3>
              <p className="mt-3 text-sm text-white/70 max-w-xs mx-auto">
                {t("popup.success.body.before")}{" "}
                <span className="text-[var(--gold)] font-semibold">
                  {t("popup.success.body.code")}
                </span>{" "}
                {t("popup.success.body.after")}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
