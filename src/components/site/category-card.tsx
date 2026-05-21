import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { PrimeBadge, externalRetailers } from "./external-channels";

const defaultAmazonHref = externalRetailers.find((r) => r.label === "Amazon")!.href;

type Props = {
  label: string;
  description: string;
  image: string;
  badge?: "NEW" | "BESTSELLER" | "BUNDLE";
  price: number;
  href: string;
  /** "cover" crops to fill (default). "contain" fits the whole image. */
  imageFit?: "cover" | "contain";
  /** Optional override for the CSS `background-size` value. Use this for
   *  landscape source photos sitting in a portrait card where neither
   *  pure cover (too much side crop) nor pure contain (huge top/bottom
   *  letterbox) looks good. e.g. `"auto 95%"` makes the photo height
   *  fill 95% of the container, width auto, cropping only the photo's
   *  built-in side whitespace. */
  imageScale?: string;
  /** Optional per-product Amazon listing. Falls back to the brand-level
   *  CarBlock listing when omitted. */
  amazonHref?: string;
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
  price,
  href,
  imageFit = "cover",
  imageScale,
  amazonHref,
}: Props) {
  return (
    <div className="group relative flex flex-col rounded-lg bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--gold)]/60 transition-colors">
      {/* Badge sits OUTSIDE the image frame, anchored to the top-left of
          the whole card. All three badge types (BESTSELLER / NEW / BUNDLE)
          share the same gold-on-black pill so the row of cards reads as a
          uniform set rather than three different visual treatments. */}
      {badge && (
        <Badge
          className="absolute -top-4 left-3 z-10 rounded-sm px-2.5 py-1 text-[10px] tracking-[0.2em] uppercase font-semibold shadow-md bg-[var(--gold)] text-black hover:bg-[var(--gold)]"
        >
          {badge}
        </Badge>
      )}

      {/* Clickable image → product detail. Square frame on mobile so the
          card doesn't dominate the viewport; portrait at md+ for desktop
          looks where vertical space is cheap.

          Background: white for contain-mode cards (wipes, bundles) so the
          17% margin around the centered product photo reads as a clean
          studio backdrop instead of a dark gap. Cover-mode cards
          (CarBlock) keep the near-transparent bg since their source photo
          fills edge-to-edge anyway. */}
      <Link
        href={href}
        className={`relative aspect-square md:aspect-[4/5] overflow-hidden rounded-t-lg ${
          imageFit === "contain" ? "bg-white" : "bg-white/[0.02]"
        }`}
        aria-label={`Shop ${label}`}
      >
        <div
          className={`absolute bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-105 ${
            /* For contain-mode cards we INSET the bg div from the card
             *  edges (instead of just shrinking the bg-size). That
             *  guarantees a real 32px / 40px white frame between the
             *  photo edge and the card edge — works even when the
             *  source PNG is full-bleed (like wipes-new-1.png where
             *  the pack runs all the way to the canvas edge with no
             *  built-in whitespace). bg-size manipulation alone wasn't
             *  enough because the dark photo background filled almost
             *  to the card frame regardless of scale. */
            imageFit === "contain" ? "inset-8 md:inset-10" : "inset-0"
          }`}
          style={{
            backgroundImage: `url('${image}')`,
            /* Inside the inset area, fit the photo with `contain` so
             *  the whole image is visible without crop. `imageScale`
             *  per-card overrides this when a card needs a different
             *  scale (see prop docs above). */
            backgroundSize:
              imageScale ?? (imageFit === "contain" ? "contain" : "cover"),
          }}
        />
        {/* The bottom gradient was originally there to keep an overlaid
            title legible — titles now live below the image, so it only
            matters for cover-mode cards where it adds a clean fade into
            the dark card body. Skip it on contain mode so the white
            backdrop stays uniformly white. */}
        {imageFit !== "contain" && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        )}
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

        {/* Two CTAs: full-width stacked on mobile so each pill has plenty of
            horizontal room for its label, side-by-side on sm+ once the
            card is wider. */}
        <div className="mt-3 w-full flex flex-col sm:grid sm:grid-cols-2 gap-2">
          <Link
            href={href}
            className="flex items-center justify-center rounded-full bg-[var(--gold)] hover:bg-[var(--gold-bright)] h-12 text-black text-xs sm:text-sm uppercase tracking-[0.18em] font-bold transition-colors px-5"
          >
            {/* Mobile stays as 'Shop Now' to keep the pill compact in
                the 1-col layout. Desktop adds the price next to it so
                the home grid surfaces pricing without forcing a click
                into the detail page. */}
            <span className="md:hidden">Shop Now</span>
            <span className="hidden md:inline">
              Shop Now — ${price}
            </span>
          </Link>
          <a
            href={amazonHref ?? defaultAmazonHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-col items-center justify-center gap-0.5 rounded-full border border-[var(--border-strong)] hover:border-[var(--gold)] hover:bg-[var(--gold)]/10 h-14 bg-white transition-colors whitespace-nowrap px-5"
          >
            <PrimeBadge className="h-5 w-auto shrink-0" />
            <span className="text-[#0F1111] text-[9px] uppercase tracking-[0.22em] font-bold leading-none">Available</span>
          </a>
        </div>
      </div>
    </div>
  );
}
