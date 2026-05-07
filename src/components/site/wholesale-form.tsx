"use client";

import { useState } from "react";
import { Send, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const businessTypes = [
  { value: "", label: "Select an option" },
  { value: "retail-store", label: "Retail store" },
  { value: "car-wash", label: "Car wash / detail shop" },
  { value: "auto-dealer", label: "Auto dealer" },
  { value: "online-store", label: "Online store (own website)" },
  { value: "wholesale-distributor", label: "Wholesale distributor" },
  { value: "other", label: "Other" },
];

const volumes = [
  { value: "", label: "Select expected first order" },
  { value: "100", label: "100 units" },
  { value: "200", label: "200 units" },
  { value: "300-500", label: "300 – 500 units" },
  { value: "500+", label: "500+ units" },
];

const initialState = {
  fullName: "",
  businessName: "",
  email: "",
  phone: "",
  state: "",
  city: "",
  businessType: "",
  expectedVolume: "",
  sellingChannels: "",
  message: "",
  acceptsRules: false,
};

export function WholesaleForm() {
  const [form, setForm] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.acceptsRules) {
      setError("You must accept the program rules to apply.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/wholesale", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not submit");
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
            Application Received
          </h3>
          <p className="mt-2 text-sm text-[var(--muted)] max-w-md mx-auto">
            Thanks {form.fullName.split(" ")[0]}. A member of the CarBlock team
            will reach out to{" "}
            <span className="text-white">{form.email}</span> within 2 business
            days to confirm pricing and next steps.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field
          label="Full name *"
          value={form.fullName}
          onChange={(v) => setForm({ ...form, fullName: v })}
          required
        />
        <Field
          label="Business name"
          value={form.businessName}
          onChange={(v) => setForm({ ...form, businessName: v })}
          placeholder="(optional)"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field
          label="Email *"
          type="email"
          value={form.email}
          onChange={(v) => setForm({ ...form, email: v })}
          required
        />
        <Field
          label="Phone *"
          type="tel"
          value={form.phone}
          onChange={(v) => setForm({ ...form, phone: v })}
          required
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field
          label="State *"
          value={form.state}
          onChange={(v) => setForm({ ...form, state: v })}
          placeholder="e.g. New Jersey"
          required
        />
        <Field
          label="City"
          value={form.city}
          onChange={(v) => setForm({ ...form, city: v })}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <SelectField
          label="Business type"
          value={form.businessType}
          onChange={(v) => setForm({ ...form, businessType: v })}
          options={businessTypes}
        />
        <SelectField
          label="Expected first order"
          value={form.expectedVolume}
          onChange={(v) => setForm({ ...form, expectedVolume: v })}
          options={volumes}
        />
      </div>

      <Textarea
        label="Where do you plan to sell?"
        value={form.sellingChannels}
        onChange={(v) => setForm({ ...form, sellingChannels: v })}
        placeholder="e.g. my retail store, my own website, in-person at events…"
        rows={3}
      />

      <Textarea
        label="Anything else we should know?"
        value={form.message}
        onChange={(v) => setForm({ ...form, message: v })}
        rows={4}
      />

      {/* Rules acknowledgment */}
      <label className="flex items-start gap-3 cursor-pointer p-4 rounded-lg border border-[var(--border)] bg-black/40 hover:border-[var(--gold)]/60 transition-colors">
        <input
          type="checkbox"
          checked={form.acceptsRules}
          onChange={(e) => setForm({ ...form, acceptsRules: e.target.checked })}
          className="mt-1 h-4 w-4 accent-[var(--gold)] cursor-pointer"
          required
        />
        <span className="text-xs md:text-sm text-[var(--muted)] leading-relaxed">
          I&apos;ve read and accept the wholesale program rules:{" "}
          <span className="text-white">100-unit minimum</span>, no reselling on{" "}
          <span className="text-white">Amazon or Walmart</span>, will respect
          the <span className="text-white">MAP (minimum advertised price)</span>{" "}
          policy, distributor pays shipping (~$60 per 100 units, varies by
          location).
        </span>
      </label>

      <Button
        type="submit"
        disabled={submitting}
        className="w-full sm:w-auto rounded-full bg-[var(--gold)] hover:bg-[var(--gold-bright)] text-black font-semibold tracking-[0.18em] uppercase text-xs h-12 px-8 disabled:opacity-50"
      >
        <Send className="h-4 w-4 mr-2" />
        {submitting ? "Sending…" : "Apply for wholesale"}
      </Button>

      {error && <p className="text-xs text-red-300">{error}</p>}

      <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--muted-2)]">
        We respond within 2 business days
      </p>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
        {label}
      </Label>
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="h-12 bg-[var(--surface)] border-[var(--border-strong)] text-white placeholder:text-[var(--muted-2)] rounded-md px-4"
      />
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="space-y-2">
      <Label className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
        {label}
      </Label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 w-full bg-[var(--surface)] border border-[var(--border-strong)] text-white rounded-md px-4 cursor-pointer focus:outline-none focus:border-[var(--gold)]/70"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function Textarea({
  label,
  value,
  onChange,
  rows = 4,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
        {label}
      </Label>
      <textarea
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[var(--surface)] border border-[var(--border-strong)] text-white placeholder:text-[var(--muted-2)] rounded-md px-4 py-3 focus:outline-none focus:border-[var(--gold)]/70 resize-y"
      />
    </div>
  );
}
