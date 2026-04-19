import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/lib/mock-products";

type Props = {
  product: Product;
  /** "cover" crops (default). "contain" fits whole image. */
  imageFit?: "cover" | "contain";
};

export function ProductCard({ product, imageFit = "cover" }: Props) {
  const { slug, name, shortDescription, price, badge, image, scents } =
    product;

  return (
    <Link
      href={`/products/${slug}`}
      className="group relative flex flex-col overflow-hidden rounded-lg bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--gold)]/60 transition-all duration-300 hover:-translate-y-0.5"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-white/[0.02]">
        <div
          className="absolute inset-0 bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-105"
          style={{
            backgroundImage: `url('${image}')`,
            backgroundSize: imageFit === "contain" ? "contain" : "cover",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        {badge && (
          <Badge
            className={`absolute top-4 left-4 rounded-sm px-2.5 py-1 text-[10px] tracking-[0.2em] uppercase font-semibold ${
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
          <span className="font-display text-2xl font-bold text-white">
            ${price}
          </span>
          <span className="text-[10px] tracking-[0.25em] uppercase text-[var(--gold)] group-hover:text-[var(--gold-bright)] transition-colors">
            Shop →
          </span>
        </div>
      </div>
    </Link>
  );
}
