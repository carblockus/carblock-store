"use client";

import Link from "next/link";
import { Logo } from "./logo";
import { Instagram } from "lucide-react";
import {
  TikTokIcon,
  externalRetailers,
  type IconComponent,
} from "./external-channels";
import { useT } from "@/lib/lang-context";
import type { TranslationKey } from "@/lib/i18n";

const followUs = [
  {
    label: "Instagram",
    icon: Instagram,
    href: "https://www.instagram.com/carblock.us",
  },
  {
    label: "TikTok",
    icon: TikTokIcon,
    href: "https://www.tiktok.com/@carblock.us?_r=1&_t=ZP-95zCyUTK3dm",
  },
];

const cols: {
  titleKey: TranslationKey;
  links: { labelKey: TranslationKey; href: string }[];
}[] = [
  {
    titleKey: "footer.col.shop",
    links: [
      { labelKey: "footer.link.allProducts", href: "/products" },
      { labelKey: "footer.link.howToUse", href: "/how-to-use" },
      { labelKey: "footer.link.about", href: "/about" },
      { labelKey: "footer.link.wholesale", href: "/wholesale" },
    ],
  },
  {
    titleKey: "footer.col.help",
    links: [
      { labelKey: "footer.link.howToUse", href: "/how-to-use" },
      { labelKey: "footer.link.contact", href: "/contact" },
      { labelKey: "footer.link.refund", href: "/legal/refunds" },
      { labelKey: "footer.link.faq", href: "/contact#faq" },
    ],
  },
  {
    titleKey: "footer.col.legal",
    links: [
      { labelKey: "footer.link.terms", href: "/legal/terms" },
      { labelKey: "footer.link.privacy", href: "/legal/privacy" },
      { labelKey: "footer.link.refund", href: "/legal/refunds" },
      { labelKey: "footer.link.cookies", href: "/legal/privacy#cookies" },
    ],
  },
];

export function Footer() {
  const t = useT();
  return (
    <footer className="bg-black border-t border-[var(--border)] text-white/80">
      <div className="container-x py-16 grid gap-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <Logo />
          <p className="mt-5 max-w-xs text-sm text-[var(--muted)] leading-relaxed">
            {t("footer.tagline")}
          </p>

          {/* Follow us */}
          <div className="mt-7">
            <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--gold)] mb-3">
              {t("footer.followUs")}
            </p>
            <div className="flex flex-wrap gap-2.5">
              {followUs.map((c) => (
                <ChannelPill key={c.label} {...c} />
              ))}
            </div>
          </div>

          {/* Find us also */}
          <div className="mt-6">
            <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--gold)] mb-3">
              {t("footer.findUsAlso")}
            </p>
            <div className="flex flex-nowrap gap-2 overflow-x-auto pb-1 -mx-1 px-1">
              {externalRetailers.map((c) => (
                <ChannelPill key={c.label} {...c} compact />
              ))}
            </div>
          </div>
        </div>
        {cols.map((col) => (
          <div key={col.titleKey}>
            <h4 className="font-display uppercase tracking-[0.18em] text-sm text-white mb-4">
              {t(col.titleKey)}
            </h4>
            <ul className="space-y-2.5 text-sm">
              {col.links.map((l) => (
                <li key={`${col.titleKey}-${l.href}`}>
                  <Link
                    href={l.href}
                    className="text-[var(--muted)] hover:text-[var(--gold)] transition-colors"
                  >
                    {t(l.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Legal attribution bar — */}
      <div className="border-t border-[var(--border)]">
        <div className="container-x py-6 flex flex-col gap-3 items-center text-center text-xs text-[var(--muted-2)]">
          <p className="text-[var(--muted)] max-w-2xl leading-relaxed">
            {t("footer.attribution.before")}{" "}
            <span className="text-white font-medium">
              {t("footer.attribution.entity")}
            </span>
            , {t("footer.attribution.after")}
          </p>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center">
            <p>
              © {new Date().getFullYear()} Tepew LLC.{" "}
              {t("footer.copyright")}
            </p>
            <span className="hidden sm:inline">·</span>
            <p className="tracking-[0.18em] uppercase">
              {t("footer.madeWith")}{" "}
              <span className="text-[var(--gold)]">★</span>{" "}
              {t("footer.forDrivers")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function ChannelPill({
  label,
  icon: Icon,
  href,
  compact = false,
}: {
  label: string;
  icon: IconComponent;
  href: string;
  compact?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`group inline-flex items-center gap-2 shrink-0 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] hover:border-[var(--gold)] hover:bg-[var(--gold)]/10 transition-colors ${
        compact ? "px-3 py-1.5" : "px-3.5 py-2"
      }`}
    >
      <Icon
        className={`text-white group-hover:text-[var(--gold)] transition-colors ${
          compact ? "h-3.5 w-3.5" : "h-4 w-4"
        }`}
      />
      <span
        className={`uppercase tracking-[0.16em] font-medium text-white group-hover:text-[var(--gold)] transition-colors whitespace-nowrap ${
          compact ? "text-[10px]" : "text-[11px]"
        }`}
      >
        {label}
      </span>
    </a>
  );
}
