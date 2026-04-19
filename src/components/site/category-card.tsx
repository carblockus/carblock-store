import Link from "next/link";
import { Badge } from "@/components/ui/badge";

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

export function CategoryCard({
  label,
  description,
  image,
  badge,
  price,
  href,
  imageFit = "cover",
}: Props) {
  return (
    <Link
      href={href}
      className="group relative flex flex-col overflow-hidden rounded-lg bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--gold)]/60 transition-colors"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-white/[0.02]">
        <div
          className="absolute inset-0 bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-105"
          style={{
            backgroundImage: `url('${image}')`,
            backgroundSize: imageFit === "contain" ? "contain" : "cover",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
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
      <div className="p-6 flex flex-col items-center text-center gap-3">
        <h3 className="font-display text-2xl uppercase tracking-[0.15em] text-white">
          {label}
        </h3>
        <p className="text-sm text-[var(--muted)] max-w-xs leading-relaxed">
          {description}
        </p>
        <div className="mt-2 inline-flex items-center gap-3 rounded-full bg-[var(--gold)] group-hover:bg-[var(--gold-bright)] px-7 py-2.5 text-black text-[11px] uppercase tracking-[0.18em] font-semibold transition-colors">
          <span>Shop Now</span>
          <span className="opacity-60">·</span>
          <span>${price}</span>
        </div>
      </div>
    </Link>
  );
}
