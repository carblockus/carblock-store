"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import type { Category } from "@/lib/mock-products";

type FilterDef = { label: string; value: Category | "all"; count: number };

type Props = {
  filters: FilterDef[];
  activeCategory: Category | "all";
};

export function ProductFilters({ filters, activeCategory }: Props) {
  const router = useRouter();
  const params = useSearchParams();

  const update = useCallback(
    (value: Category | "all") => {
      const p = new URLSearchParams(params.toString());
      if (value === "all") p.delete("category");
      else p.set("category", value);
      router.push(`/products${p.toString() ? `?${p.toString()}` : ""}`, {
        scroll: false,
      });
    },
    [params, router],
  );

  return (
    <aside className="md:sticky md:top-28 self-start">
      <h3 className="font-display text-xs tracking-[0.3em] uppercase text-[var(--gold)] mb-4">
        Category
      </h3>
      <ul className="flex flex-col gap-1">
        {filters.map((f) => {
          const active = activeCategory === f.value;
          return (
            <li key={f.value}>
              <button
                type="button"
                onClick={() => update(f.value)}
                className={`w-full flex items-center justify-between text-left px-3 py-2.5 rounded-md border transition-all text-sm ${
                  active
                    ? "bg-[var(--gold)]/10 border-[var(--gold)]/50 text-white"
                    : "bg-transparent border-[var(--border)] text-[var(--muted)] hover:text-white hover:border-[var(--border-strong)]"
                }`}
              >
                <span
                  className={`uppercase tracking-[0.12em] text-xs font-medium`}
                >
                  {f.label}
                </span>
                <span
                  className={`text-[10px] tabular-nums ${
                    active ? "text-[var(--gold)]" : "text-[var(--muted-2)]"
                  }`}
                >
                  {f.count}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
