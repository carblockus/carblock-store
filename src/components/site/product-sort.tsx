"use client";

import { useRouter, useSearchParams } from "next/navigation";

const options = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Newest", value: "newest" },
];

export function ProductSort({ value }: { value: string }) {
  const router = useRouter();
  const params = useSearchParams();

  function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const v = e.target.value;
    const p = new URLSearchParams(params.toString());
    if (v === "featured") p.delete("sort");
    else p.set("sort", v);
    router.push(`/products${p.toString() ? `?${p.toString()}` : ""}`, {
      scroll: false,
    });
  }

  return (
    <label className="flex items-center gap-3 text-xs text-[var(--muted)]">
      <span className="uppercase tracking-[0.22em]">Sort</span>
      <select
        value={value}
        onChange={onChange}
        className="bg-[var(--surface)] border border-[var(--border-strong)] text-white text-xs uppercase tracking-[0.14em] px-3 py-2 rounded-md focus:outline-none focus:border-[var(--gold)]/70 cursor-pointer"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
