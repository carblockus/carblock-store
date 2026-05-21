import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/lib/mock-products";

type Props = {
  product: Product;
  /** "cover" crops (default). "contain" fits whole image. */
  imageFit?: "cover" | "contain";
  /** Override CSS `background-size` when imageFit is "contain". Use
   *  per-product when the source PNG's natural framing leaves either
   *  too much whitespace (bundle) or too little (wipes). Examples:
   *  "auto 95%" fills 95% of the height; "85% auto" fills 85% of the
   *  width. Falls back to plain "contain". */
  imageScale?: string;
};

export function ProductCard({
  product,
  imageFit = "cover",
  imageScale,
}: Props) {
  const { slug, name, shortDescription, price, originalPrice, badge, image, scents } =
    product;
  const hasPromo = originalPrice !== undefined && originalPrice > price;
  // Headline savings percentage — shown as a bright gold pill on cards
  // that have a promo so the deal pops at a glance.
  const discountPct = hasPromo
    ? Math.round(((originalPrice! - price) / originalPrice!) * 100)
    : 0;

  return (
    <Link
      href={`/products/${slug}`}
      className="group relative flex flex-col rounded-lg bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--gold)]/60 transition-all duration-300 hover:-translate-y-0.5"
    >
      {/* Uniform gold-on-black badge — matches the home page treatment so
          all 3 badge types (BESTSELLER / NEW / BUNDLE) read as one set. */}
      {badge && (
        <Badge
          className="absolute -top-4 left-3 z-10 rounded-sm px-2.5 py-1 text-[10px] tracking-[0.2em] uppercase font-semibold shadow-md bg-[var(--gold)] text-black hover:bg-[var(--gold)]"
        >
          {badge}
        </Badge>
      )}
      <div
        className={`relative aspect-[4/5] overflow-hidden rounded-t-lg ${
          imageFit === "contain" ? "bg-white" : "bg-white/[0.02]"
        }`}
      >
        <div
          className={`absolute bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-105 ${
            /* Contain-mode photos get a generous inset from the card
               edges so a real white frame is guaranteed around the
               product — even when the source PNG is full-bleed (the
               product runs all the way to the edge of the PNG canvas
               with no built-in whitespace). Bumped to inset-10/14 (40
               / 56 px) after the original inset-6/8 left the wipes
               pack visibly touching the left and right sides of the
               card frame on /products and related-product cards.
               Cover-mode photos stay edge-to-edge. */
            /* Desktop inset trimmed from inset-14 (56 px) to inset-8
               (32 px) so the wipes pack and the bundle photo read
               noticeably bigger on md+ — they were getting lost in
               too much whitespace. Mobile inset (inset-10 / 40 px)
               stays put as the user liked that framing on phones. */
            imageFit === "contain" ? "inset-10 md:inset-8" : "inset-0"
          }`}
          style={{
            backgroundImage: `url('${image}')`,
            backgroundSize:
              imageScale ?? (imageFit === "contain" ? "contain" : "cover"),
          }}
        />
        {/* Skip the bottom gradient on contain-mode cards so the white
            backdrop stays uniformly white. */}
        {imageFit !== "contain" && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        )}
      </div>

      <div className="p-5 md:p-7 flex flex-col gap-2 md:gap-3">
        <h3 className="font-display text-xl md:text-2xl lg:text-3xl uppercase tracking-[0.12em] text-white leading-tight">
          {name}
        </h3>
        <p className="text-xs md:text-sm lg:text-base text-[var(--muted)] leading-relaxed min-h-[32px]">
          {shortDescription}
        </p>
        {scents && scents.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-1">
            {scents.slice(0, 3).map((s) => (
              <span
                key={s}
                className="text-[9px] tracking-[0.15em] uppercase px-2 py-1 rounded-full border border-[var(--border-strong)] text-[var(--muted)]"
              >
                {s}
              </span>
            ))}
            {scents.length > 3 && (
              <span className="text-[9px] tracking-[0.15em] uppercase px-2 py-1 rounded-full text-[var(--muted)]">
                +{scents.length - 3}
              </span>
            )}
          </div>
        )}
        <div className="mt-3 md:mt-4 flex items-center justify-between gap-3">
          <span className="flex items-baseline gap-2 md:gap-3 flex-wrap">
            {hasPromo && (
              <span className="text-base md:text-xl text-[var(--muted)] line-through font-medium">
                ${originalPrice}
              </span>
            )}
            <span className="font-display text-2xl md:text-4xl lg:text-5xl font-bold text-white">
              ${price}
            </span>
            {hasPromo && (
              <span className="inline-flex items-center rounded-full bg-[var(--gold)] text-black text-[10px] md:text-xs font-extrabold tracking-[0.12em] uppercase px-2 md:px-3 py-1 md:py-1.5 leading-none shadow-[0_4px_12px_rgba(212,175,55,0.4)]">
                Save {discountPct}%
              </span>
            )}
          </span>
          <span className="text-[10px] md:text-sm tracking-[0.25em] uppercase text-[var(--gold)] group-hover:text-[var(--gold-bright)] transition-colors font-semibold shrink-0">
            Shop →
          </span>
        </div>
      </div>
    </Link>
  );
}
