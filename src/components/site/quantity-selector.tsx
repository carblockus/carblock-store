"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

type Props = {
  min?: number;
  max?: number;
  initial?: number;
  onChange?: (qty: number) => void;
};

export function QuantitySelector({
  min = 1,
  max = 10,
  initial = 1,
  onChange,
}: Props) {
  const [qty, setQty] = useState(initial);

  function update(v: number) {
    const n = Math.max(min, Math.min(max, v));
    setQty(n);
    onChange?.(n);
  }

  return (
    <div className="inline-flex items-center border border-[var(--border-strong)] rounded-full overflow-hidden">
      <button
        type="button"
        aria-label="Decrease"
        disabled={qty <= min}
        onClick={() => update(qty - 1)}
        className="h-12 w-12 flex items-center justify-center text-white/80 hover:text-white hover:bg-[var(--surface-2)] transition-colors disabled:opacity-30 disabled:pointer-events-none"
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className="h-12 w-12 flex items-center justify-center text-sm font-semibold text-white tabular-nums">
        {qty}
      </span>
      <button
        type="button"
        aria-label="Increase"
        disabled={qty >= max}
        onClick={() => update(qty + 1)}
        className="h-12 w-12 flex items-center justify-center text-white/80 hover:text-white hover:bg-[var(--surface-2)] transition-colors disabled:opacity-30 disabled:pointer-events-none"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}
