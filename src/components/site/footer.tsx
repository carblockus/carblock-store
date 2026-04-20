import Link from "next/link";
import { Logo } from "./logo";
import { Instagram } from "lucide-react";

/** TikTok inline icon (lucide-react doesn't ship one). */
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1z" />
    </svg>
  );
}

// IMPORTANT: replace placeholder URLs below with the real handles when ready.
const socials = [
  {
    label: "Instagram",
    icon: Instagram,
    href: "https://www.instagram.com/carblockmillonario/",
  },
  {
    label: "TikTok",
    icon: TikTokIcon,
    href: "https://www.tiktok.com/@carblockperfumecarro",
  },
];

const cols = [
  {
    title: "Shop",
    links: [
      { label: "CarBlock Perfume", href: "/products?category=perfume" },
      { label: "WipesBlock", href: "/products?category=wipes" },
      { label: "Bundles", href: "/products?category=bundle" },
      { label: "All products", href: "/products" },
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

          {/* Follow us — prominent */}
          <div className="mt-7">
            <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--gold)] mb-3">
              Follow us
            </p>
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="group inline-flex items-center gap-2.5 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] hover:border-[var(--gold)] hover:bg-[var(--gold)]/10 px-4 py-2.5 transition-colors"
                >
                  <s.icon className="h-4 w-4 text-white group-hover:text-[var(--gold)] transition-colors" />
                  <span className="text-xs uppercase tracking-[0.18em] font-medium text-white group-hover:text-[var(--gold)] transition-colors">
                    {s.label}
                  </span>
                </a>
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

      {/* Legal attribution bar */}
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
