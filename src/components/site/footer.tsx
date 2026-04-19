import Link from "next/link";
import { Logo } from "./logo";
import { Instagram, Facebook, Youtube } from "lucide-react";

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
      { label: "Contact us", href: "/contact" },
      { label: "Refund policy", href: "/legal/refunds" },
      { label: "Shipping info", href: "/legal/refunds#shipping" },
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
          <div className="mt-6 flex gap-3">
            {[Instagram, Facebook, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="h-9 w-9 grid place-items-center rounded-full border border-[var(--border-strong)] hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors"
                aria-label="social"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
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
