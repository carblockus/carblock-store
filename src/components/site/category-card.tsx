import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { AmazonIcon, externalRetailers } from "./external-channels";

const amazonHref = externalRetailers.find((r) => r.label === "Amazon")!.href;

type Props = {
  label: string;
  description: string;
  image: string;
  badge?: "NEW" | "BESTSELLER" | "BUNDLE";
  price: number;
  href: string;
  /** "cover" crops to fill (default). "contain" fits the whole image. */
  imageFit?: "cover" | "contain";
};

/**
 * Product card for the home page. Two CTAs sit side-by-side at the bottom:
 *
 *   1) "Shop Now" → product detail page on this site (gold pill)
 *   2) "Shop on Amazon" → opens the Amazon listing in a new tab
 *
 * Because we now have two destinations inside the card we can't wrap the
 * whole thing in a single <Link> anymore — only the image and the title
 * route to the product page; the Amazon CTA is a separate <a>.
 */
export function CategoryCard({
  label,
  description,
  image,
  badge,
  href,
  imageFit = "cover",
}: Props) {
  return (
    <div className="group relative flex flex-col rounded-lg bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--gold)]/60 transition-colors">
      {/* Badge sits OUTSIDE the image frame, anchored to the top-left of
          the whole card. */}
      {badge && (
        <Badge
          className={`absolute -top-4 left-3 z-10 rounded-sm px-2.5 py-1 text-[10px] tracking-[0.2em] uppercase font-semibold shadow-md ${
            badge === "BESTSELLER"
              ? "bg-[var(--gold)] text-black hover:bg-[var(--gold)]"
              : badge === "NEW"
                ? "bg-white text-black hover:bg-white"
                : "bg-black text-[var(--gold)] border border-[var(--gold)] hover:bg-black"
          }`}
        >
          {badge}
        </Badge>
      )}

      {/* Clickable image → product detail */}
      <Link
        href={href}
        className="relative aspect-[4/5] overflow-hidden rounded-t-lg bg-white/[0.02]"
        aria-label={`Shop ${label}`}
      >
        <div
          className="absolute inset-0 bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-105"
          style={{
            backgroundImage: `url('${image}')`,
            backgroundSize: imageFit === "contain" ? "contain" : "cover",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      </Link>

      <div className="p-6 sm:p-7 flex flex-col items-center text-center gap-3">
        <Link
          href={href}
          className="font-display text-2xl sm:text-3xl uppercase tracking-[0.15em] text-white hover:text-[var(--gold)] transition-colors"
        >
          {label}
        </Link>
        <p className="text-sm text-[var(--muted)] max-w-xs leading-relaxed">
          {description}
        </p>

        {/* Two CTAs side by side: site checkout + Amazon */}
        <div className="mt-3 w-full grid grid-cols-2 gap-2">
          <Link
            href={href}
            className="flex items-center justify-center rounded-full bg-[var(--gold)] hover:bg-[var(--gold-bright)] h-11 text-black text-[11px] sm:text-xs uppercase tracking-[0.18em] font-bold transition-colors"
          >
            Shop Now
          </Link>
          <a
            href={amazonHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[var(--border-strong)] hover:border-[var(--gold)] hover:bg-[var(--gold)]/10 h-11 text-white text-[10px] sm:text-xs uppercase tracking-[0.16em] font-semibold transition-colors whitespace-nowrap"
          >
            <AmazonIcon className="h-4 w-4 shrink-0" />
            <span>Shop on Amazon</span>
          </a>
        </div>
      </div>
    </div>
  );
}
