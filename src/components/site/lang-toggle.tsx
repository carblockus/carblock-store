"use client";

import { useLang } from "@/lib/lang-context";

/**
 * Tiny EN | ES toggle pill. Lives in the announcement bar so it's always
 * visible at the top of the page on every route. Click flips the active
 * language and persists the choice in localStorage.
 */
export function LangToggle() {
  const { lang, setLang, t } = useLang();

  return (
    <div
      role="group"
      aria-label={t("lang.toggle.aria")}
      className="inline-flex items-center rounded-full border border-[var(--border-strong)] bg-black/40 backdrop-blur p-0.5 text-[10px] font-semibold tracking-[0.18em]"
    >
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        className={`px-2.5 py-1 rounded-full transition-colors ${
          lang === "en"
            ? "bg-[var(--gold)] text-black"
            : "text-white/70 hover:text-white"
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLang("es")}
        aria-pressed={lang === "es"}
        className={`px-2.5 py-1 rounded-full transition-colors ${
          lang === "es"
            ? "bg-[var(--gold)] text-black"
            : "text-white/70 hover:text-white"
        }`}
      >
        ES
      </button>
    </div>
  );
}
