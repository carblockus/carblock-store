"use client";

import { useState } from "react";
import { Send, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useT } from "@/lib/lang-context";
import type { TranslationKey } from "@/lib/i18n";

const topics: { value: string; labelKey: TranslationKey }[] = [
  { value: "order", labelKey: "contact.topic.order" },
  { value: "return", labelKey: "contact.topic.return" },
  { value: "wholesale", labelKey: "contact.topic.wholesale" },
  { value: "press", labelKey: "contact.topic.press" },
  { value: "other", labelKey: "contact.topic.other" },
];

export function ContactForm() {
  const t = useT();
  const [form, setForm] = useState({
    name: "",
    email: "",
    topic: "order",
    orderId: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not send message");
      setDone(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-lg border border-[var(--gold)]/40 bg-[var(--gold)]/10 p-8 text-center space-y-4">
        <div className="mx-auto h-14 w-14 rounded-full bg-[var(--gold)] text-black grid place-items-center">
          <Check className="h-6 w-6" strokeWidth={3} />
        </div>
        <div>
          <h3 className="font-display text-2xl uppercase tracking-[0.15em] text-white">
            {t("contact.form.sent.title")}
          </h3>
          <p className="mt-2 text-sm text-[var(--muted)]">
            {t("contact.form.sent.body")}{" "}
            <span className="text-white">{form.email}</span>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
            {t("contact.form.name")}
          </Label>
          <Input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="h-12 bg-[var(--surface)] border-[var(--border-strong)] text-white rounded-md px-4"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
            {t("contact.form.email")}
          </Label>
          <Input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="h-12 bg-[var(--surface)] border-[var(--border-strong)] text-white rounded-md px-4"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
            {t("contact.form.topic")}
          </Label>
          <select
            value={form.topic}
            onChange={(e) => setForm({ ...form, topic: e.target.value })}
            className="h-12 w-full bg-[var(--surface)] border border-[var(--border-strong)] text-white rounded-md px-4 cursor-pointer focus:outline-none focus:border-[var(--gold)]/70"
          >
            {topics.map((topic) => (
              <option key={topic.value} value={topic.value}>
                {t(topic.labelKey)}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
            {t("contact.form.orderNumber")}
          </Label>
          <Input
            value={form.orderId}
            onChange={(e) => setForm({ ...form, orderId: e.target.value })}
            placeholder="CB-XXXXX"
            className="h-12 bg-[var(--surface)] border-[var(--border-strong)] text-white placeholder:text-[var(--muted-2)] rounded-md px-4"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
          {t("contact.form.message")}
        </Label>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full bg-[var(--surface)] border border-[var(--border-strong)] text-white rounded-md px-4 py-3 focus:outline-none focus:border-[var(--gold)]/70 resize-y"
        />
      </div>

      <Button
        type="submit"
        disabled={submitting}
        className="w-full sm:w-auto rounded-full bg-[var(--gold)] hover:bg-[var(--gold-bright)] text-black font-semibold tracking-[0.18em] uppercase text-xs h-12 px-8 disabled:opacity-50"
      >
        <Send className="h-4 w-4 mr-2" />
        {submitting ? t("contact.form.sending") : t("contact.form.send")}
      </Button>

      {error && <p className="text-xs text-red-300">{error}</p>}

      <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--muted-2)]">
        {t("contact.form.responseNote")}
      </p>
    </form>
  );
}
