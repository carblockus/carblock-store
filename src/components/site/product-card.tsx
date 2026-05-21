import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/lib/mock-products";

type Props = {
  product: Product;
  /** "cover" crops (default). "contain" fits whole image. */
  imageFit?: "cover" | "contain";
};

export function ProductCard({ product, imageFit = "cover" }: Props) {
  const { slug, name, shortDescription, price, originalPrice, badge, image, scents } =
    product;
  const hasPromo = originalPrice !== undefined && originalPrice > price;

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
            /* Contain-mode photos get inset from the card edges so a
               real white frame is guaranteed around the product — even
               when the source PNG is full-bleed (no built-in
               whitespace). Cover-mode photos stay edge-to-edge. */
            imageFit === "contain" ? "inset-6 md:inset-8" : "inset-0"
          }`}
          style={{
            backgroundImage: `url('${image}')`,
            backgroundSize: imageFit === "contain" ? "contain" : "cover",
          }}
        />
        {/* Skip the bottom gradient on contain-mode cards so the white
            backdrop stays uniformly white. */}
        {imageFit !== "contain" && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        )}
      </div>

      <div className="p-5 flex flex-col gap-2">
        <h3 className="font-display text-xl uppercase tracking-[0.12em] text-white leading-tight">
          {name}
        </h3>
        <p className="text-xs text-[var(--muted)] leading-relaxed min-h-[32px]">
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
        <div className="mt-3 flex items-center justify-between">
          <span className="flex items-baseline gap-2">
            {hasPromo && (
              <span className="text-base text-[var(--muted)] line-through font-medium">
                ${originalPrice}
              </span>
            )}
            <span className="font-display text-2xl font-bold text-white">
              ${price}
            </span>
          </span>
          <span className="text-[10px] tracking-[0.25em] uppercase text-[var(--gold)] group-hover:text-[var(--gold-bright)] transition-colors">
            Shop →
          </span>
        </div>
      </div>
    </Link>
  );
}
