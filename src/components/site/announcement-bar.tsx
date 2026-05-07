"use client";

import { useT } from "@/lib/lang-context";
import { LangToggle } from "./lang-toggle";

export function AnnouncementBar() {
  const t = useT();
  return (
    <div className="bg-black text-white text-[11px] tracking-[0.2em] uppercase border-b border-[var(--gold-deep)]/40">
      <div className="container-x flex h-9 items-center justify-between gap-2">
        {/* spacer to keep the message centered */}
        <div className="w-[88px] hidden sm:block" />
        <div className="flex-1 flex items-center justify-center gap-2 text-center">
          <span className="text-[var(--gold-bright)]">★</span>
          <span className="hidden sm:inline">{t("announcement.text")}</span>
          <span className="sm:hidden text-[10px]">
            {t("announcement.text")}
          </span>
          <span className="text-[var(--gold-bright)] hidden sm:inline">★</span>
        </div>
        <div className="shrink-0">
          <LangToggle />
        </div>
      </div>
    </div>
  );
}
