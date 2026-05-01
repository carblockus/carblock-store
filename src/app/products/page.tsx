import Link from "next/link";
import { ChevronRight, ExternalLink } from "lucide-react";
import { products, type Product } from "@/lib/mock-products";
import { ProductCard } from "@/components/site/product-card";
import { ProductSort } from "@/components/site/product-sort";
import { externalRetailers } from "@/components/site/external-channels";

type SearchParams = { sort?: string };

function sortProducts(items: Product[], sort: string): Product[] {
  const arr = [...items];
  switch (sort) {
    case "price-asc":
      return arr.sort((a, b) => a.price - b.price);
    case "price-desc":
      return arr.sort((a, b) => b.price - a.price);
    case "newest":
      return arr.sort((a, b) => (a.badge === "NEW" ? -1 : 1));
    default:
      return arr.sort((a, b) => (a.badge === "BESTSELLER" ? -1 : 1));
  }
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const sort = sp.sort ?? "featured";
  const sorted = sortProducts(products, sort);

  return (
    <div className="bg-background">
      {/* Breadcrumb */}
      <div className="border-b border-[var(--border)]">
        <div className="container-x py-4 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
          <Link href="/" className="hover:text-[var(--gold)] transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-white">Shop</span>
        </div>
      </div>

      {/* Header */}
      <section className="container-x py-12 md:py-16 text-center">
        <span className="text-[11px] tracking-[0.3em] uppercase text-[var(--gold)]">
          Shop
        </span>
        <h1 className="font-display text-5xl md:text-6xl uppercase font-bold mt-3 text-white">
          For Your <span className="text-gold-gradient">Car</span>
        </h1>
        <p className="mt-4 max-w-xl mx-auto text-sm md:text-base text-[var(--muted)]">
          Premium interior care — long-lasting car perfume and luxury wipes
          designed for drivers who care about every detail.
        </p>
      </section>

      {/* Toolbar + grid */}
      <section className="container-x pb-20">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-[var(--border)] mb-6">
          <p className="text-xs text-[var(--muted)] uppercase tracking-[0.22em]">
            {sorted.length} {sorted.length === 1 ? "product" : "products"}
          </p>
          <ProductSort value={sort} />
        </div>

        {sorted.length === 0 ? (
          <div className="py-20 text-center text-[var(--muted)]">
            <p>No products available right now.</p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {sorted.map((p) => (
              <ProductCard
                key={p.slug}
                product={p}
                imageFit={
                  p.slug === "carblock-bundle-kit" ||
                  p.slug === "carblock-2-pack"
                    ? "contain"
                    : "cover"
                }
              />
            ))}
          </div>
        )}
      </section>

      {/* Also available on (Amazon / Walmart / TikTok Shop) */}
      <section className="border-t border-[var(--border)] bg-[var(--surface)]">
        <div className="container-x py-14 md:py-16 text-center">
          <span className="text-[11px] tracking-[0.3em] uppercase text-[var(--gold)]">
            Prefer your favorite marketplace?
          </span>
          <h2 className="font-display text-2xl md:text-3xl uppercase font-bold mt-3 text-white">
            Also available on
          </h2>
          <p className="mt-3 text-sm text-[var(--muted)] max-w-md mx-auto">
            Find CarBlock and WipesBlock through our official storefronts.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3 max-w-3xl mx-auto">
            {externalRetailers.map((r) => (
              <a
                key={r.label}
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-3 rounded-lg border border-[var(--border-strong)] bg-black px-6 py-6 hover:border-[var(--gold)] hover:bg-[var(--gold)]/5 transition-colors"
              >
                <r.icon className="h-8 w-8 text-white group-hover:text-[var(--gold)] transition-colors" />
                <span className="text-sm uppercase tracking-[0.18em] font-semibold text-white">
                  {r.label}
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.22em] text-[var(--gold)] group-hover:text-[var(--gold-bright)]">
                  Open <ExternalLink className="h-3 w-3" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export const metadata = {
  title: "Shop — CarBlock",
  description:
    "Premium car interior care — CarBlock perfume, WipesBlock wipes and exclusive bundles.",
};
