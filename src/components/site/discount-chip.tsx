"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

const CHIP_DISMISSED_KEY = "carblock-discount-chip-dismissed";
const SHOW_AFTER_SCROLL_PX = 200;

/**
 * Floating "Want 15% OFF?" chip pinned to the bottom-left of every page.
 *
 * Appears after the visitor scrolls ~200px (so it doesn't clutter the
 * above-the-fold hero), with an X to dismiss permanently.
 *
 * Clicking the chip dispatches `open-welcome-popup` — the existing
 * WelcomePopup component listens for this and re-opens itself, so the
 * chip is purely a re-entry point into the email-capture flow that
 * already gives the customer a 15% off code on their first order.
 */
export function DiscountChip() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(true); // start true to avoid SSR flash

  useEffect(() => {
    if (typeof window === "undefined") return;
    setDismissed(localStorage.getItem(CHIP_DISMISSED_KEY) === "1");

    const onScroll = () => {
      if (window.scrollY > SHOW_AFTER_SCROLL_PX) setVisible(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function dismiss(e: React.MouseEvent) {
    e.stopPropagation();
    localStorage.setItem(CHIP_DISMISSED_KEY, "1");
    setDismissed(true);
  }

  function open() {
    window.dispatchEvent(new CustomEvent("open-welcome-popup"));
  }

  if (dismissed || !visible) return null;

  return (
    <button
      type="button"
      onClick={open}
      className="fixed bottom-4 left-4 z-30 inline-flex items-center gap-2 rounded-full bg-black text-white border border-[var(--gold)]/60 shadow-[0_8px_24px_rgba(0,0,0,0.6)] pl-4 pr-1 py-1 hover:bg-[var(--gold)] hover:text-black transition-colors group"
      aria-label="Get 15% off your first order"
    >
      <span className="text-[11px] tracking-[0.18em] uppercase font-semibold">
        Want <span className="text-[var(--gold)] group-hover:text-black">15% Off?</span>
      </span>
      <span
        role="button"
        tabIndex={0}
        aria-label="Dismiss"
        onClick={dismiss}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            // re-cast to mouse-event-shaped object for dismiss handler
            dismiss(e as unknown as React.MouseEvent);
          }
        }}
        className="grid place-items-center h-7 w-7 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
      >
        <X className="h-3.5 w-3.5" />
      </span>
    </button>
  );
}
