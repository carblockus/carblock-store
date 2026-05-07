"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { dictionaries, type Lang, type TranslationKey } from "./i18n";

const STORAGE_KEY = "carblock-lang";

type LangContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  /** Translate a key. Falls back to English if missing in target lang. */
  t: (key: TranslationKey) => string;
};

const LangContext = createContext<LangContextValue | undefined>(undefined);

export function LangProvider({ children }: { children: ReactNode }) {
  // Default to English on the server (avoids hydration mismatch). Read
  // localStorage after mount and switch to the saved choice.
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "es" || saved === "en") setLangState(saved);
    } catch {
      // localStorage unavailable — stick with "en"
    }
  }, []);

  // Reflect language on <html lang="..."> for accessibility/SEO
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      // ignore
    }
  }, []);

  const toggle = useCallback(() => {
    setLang(lang === "en" ? "es" : "en");
  }, [lang, setLang]);

  const t = useCallback(
    (key: TranslationKey) => {
      const target = dictionaries[lang][key];
      if (target) return target;
      return dictionaries.en[key] ?? key;
    },
    [lang],
  );

  return (
    <LangContext.Provider value={{ lang, setLang, toggle, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside <LangProvider>");
  return ctx;
}

/** Convenience hook for components that only need translations. */
export function useT() {
  return useLang().t;
}
