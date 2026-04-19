"use client";

import { useState } from "react";
import { Send, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const topics = [
  { value: "order", label: "Order question" },
  { value: "return", label: "Return / refund" },
  { value: "wholesale", label: "Wholesale / business" },
  { value: "press", label: "Press / partnership" },
  { value: "other", label: "Other" },
];

export function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    topic: "order",
    orderId: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    // TODO: POST to /api/contact (will wire up to email service)
    await new Promise((r) => setTimeout(r, 600));
    setSubmitting(false);
    setDone(true);
  }

  if (done) {
    return (
      <div className="rounded-lg border border-[var(--gold)]/40 bg-[var(--gold)]/10 p-8 text-center space-y-4">
        <div className="mx-auto h-14 w-14 rounded-full bg-[var(--gold)] text-black grid place-items-center">
          <Check className="h-6 w-6" strokeWidth={3} />
        </div>
        <div>
          <h3 className="font-display text-2xl uppercase tracking-[0.15em] text-white">
            Message Sent
          </h3>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Thanks for reaching out. We&apos;ll get back to you within 1
            business day at <span className="text-white">{form.email}</span>.
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
            Name
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
            Email
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
            Topic
          </Label>
          <select
            value={form.topic}
            onChange={(e) => setForm({ ...form, topic: e.target.value })}
            className="h-12 w-full bg-[var(--surface)] border border-[var(--border-strong)] text-white rounded-md px-4 cursor-pointer focus:outline-none focus:border-[var(--gold)]/70"
          >
            {topics.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
            Order # (optional)
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
          Message
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
        className="w-full sm:w-auto rounded-full bg-[var(--gold)] hover:bg-[var(--gold-bright)] text-black font-semibold tracking-[0.18em] uppercase text-xs h-12 px-8"
      >
        <Send className="h-4 w-4 mr-2" />
        {submitting ? "Sending…" : "Send Message"}
      </Button>

      <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--muted-2)]">
        We typically respond within 1 business day
      </p>
    </form>
  );
}
