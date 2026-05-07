import Link from "next/link";
import { Logo } from "./logo";
import { Instagram } from "lucide-react";
import {
  TikTokIcon,
  externalRetailers,
  type IconComponent,
} from "./external-channels";

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

const cols = [
  {
    title: "Shop",
    links: [
      { label: "All products", href: "/products" },
      { label: "How to use", href: "/how-to-use" },
      { label: "About", href: "/about" },
      { label: "Wholesale", href: "/wholesale" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "How to use", href: "/how-to-use" },
      { label: "Contact us", href: "/contact" },
      { label: "Refund policy", href: "/legal/refunds" },
      { label: "FAQ", href: "/contact#faq" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms & Conditions", href: "/legal/terms" },
      { label: "Privacy Policy", href: "/legal/privacy" },
      { label: "Refund Policy", href: "/legal/refunds" },
      { label: "Cookie Settings", href: "/legal/privacy#cookies" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-black border-t border-[var(--border)] text-white/80">
      <div className="container-x py-16 grid gap-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <Logo />
          <p className="mt-5 max-w-xs text-sm text-[var(--muted)] leading-relaxed">
            Premium car interior care — designed for drivers who care about
            every detail.
          </p>

          {/* Follow us */}
          <div className="mt-7">
            <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--gold)] mb-3">
              Follow us
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
              Find us also
            </p>
            <div className="flex flex-nowrap gap-2 overflow-x-auto pb-1 -mx-1 px-1">
              {externalRetailers.map((c) => (
                <ChannelPill key={c.label} {...c} compact />
              ))}
            </div>
          </div>
        </div>
        {cols.map((col) => (
          <div key={col.title}>
            <h4 className="font-display uppercase tracking-[0.18em] text-sm text-white mb-4">
              {col.title}
            </h4>
            <ul className="space-y-2.5 text-sm">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[var(--muted)] hover:text-[var(--gold)] transition-colors"
                  >
                    {l.label}
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
            Block CarBlock Millonario is operated in the US by{" "}
            <span className="text-white font-medium">Tepew LLC</span>, a
            registered company in New Jersey.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center">
            <p>© {new Date().getFullYear()} Tepew LLC. All rights reserved.</p>
            <span className="hidden sm:inline">·</span>
            <p className="tracking-[0.18em] uppercase">
              Made with <span className="text-[var(--gold)]">★</span> for
              drivers
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
