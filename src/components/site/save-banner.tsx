import Link from "next/link";

/**
 * Marquee banner promoting the "Subscribe & Save 20%" deal.
 *
 * Sits directly above the hero so it's the first product-promo signal a
 * visitor sees when landing from a Meta ad. The whole strip is one big
 * link to /subscribe-and-save — easier-to-hit click target than a small
 * button, and continues the scrolling motion of the page below.
 *
 * Reuses the existing `animate-marquee` keyframes from globals.css (also
 * used by the testimonials strip). The slogan is duplicated so the
 * translateX(-50%) loop is seamless.
 */
export function SaveBanner() {
  // One "block" of copy that we repeat so the loop has no visible seam.
  const items = [
    "Save 20%",
    "Subscribe & Save",
    "Delivered Every 6 Weeks",
    "Free Shipping",
    "Cancel Anytime",
  ];
  const block = (
    <>
      {items.map((it, i) => (
        <span key={i} className="inline-flex items-center gap-6 px-6">
          <span className="font-display text-sm md:text-lg lg:text-xl tracking-[0.22em] uppercase font-bold whitespace-nowrap">
            {it}
          </span>
          <span className="text-black/50 text-xs">★</span>
        </span>
      ))}
    </>
  );

  return (
    <Link
      href="/subscribe-and-save"
      className="block bg-[var(--gold)] text-black overflow-hidden border-y border-black/10 hover:bg-[var(--gold-bright)] transition-colors"
      aria-label="Subscribe and save 20% — delivered every 6 weeks"
    >
      <div className="flex h-9 md:h-14 lg:h-16 items-center">
        {/* Two copies side-by-side so translateX(-50%) re-aligns seamlessly. */}
        <div className="flex shrink-0 animate-marquee">
          {block}
          {block}
        </div>
      </div>
    </Link>
  );
}
