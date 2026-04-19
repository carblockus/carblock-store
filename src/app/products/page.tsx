import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { products, type Category, type Product } from "@/lib/mock-products";
import { ProductCard } from "@/components/site/product-card";
import { ProductFilters } from "@/components/site/product-filters";
import { ProductSort } from "@/components/site/product-sort";

type SearchParams = { category?: string; sort?: string };

const categoryLabels: Record<Category | "all", string> = {
  all: "All Products",
  perfume: "CarBlock Perfume",
  wipes: "WipesBlock",
  bundle: "Bundles",
};

function isCategory(v: string | undefined): v is Category {
  return v === "perfume" || v === "wipes" || v === "bundle";
}

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
  const activeCategory: Category | "all" = isCategory(sp.category)
    ? sp.category
    : "all";
  const sort = sp.sort ?? "featured";

  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);
  const sorted = sortProducts(filtered, sort);

  const counts = {
    all: products.length,
    perfume: products.filter((p) => p.category === "perfume").length,
    wipes: products.filter((p) => p.category === "wipes").length,
    bundle: products.filter((p) => p.category === "bundle").length,
  };

  const filters = [
    { label: "All Products", value: "all" as const, count: counts.all },
    { label: "CarBlock", value: "perfume" as const, count: counts.perfume },
    { label: "WipesBlock", value: "wipes" as const, count: counts.wipes },
    { label: "Bundles", value: "bundle" as const, count: counts.bundle },
  ];

  return (
    <div className="bg-background">
      {/* Breadcrumb */}
      <div className="border-b border-[var(--border)]">
        <div className="container-x py-4 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
          <Link href="/" className="hover:text-[var(--gold)] transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-white">{categoryLabels[activeCategory]}</span>
        </div>
      </div>

      {/* Header */}
      <section className="container-x py-12 md:py-16 text-center">
        <span className="text-[11px] tracking-[0.3em] uppercase text-[var(--gold)]">
          Shop
        </span>
        <h1 className="font-display text-5xl md:text-6xl uppercase font-bold mt-3 text-white">
          {activeCategory === "all" ? (
            <>
              For Your <span className="text-gold-gradient">Car</span>
            </>
          ) : (
            <span className="text-gold-gradient">
              {categoryLabels[activeCategory]}
            </span>
          )}
        </h1>
        <p className="mt-4 max-w-xl mx-auto text-sm md:text-base text-[var(--muted)]">
          Premium interior care — sophisticated fragrance and biodegradable
          wipes designed for drivers who care about every detail.
        </p>
      </section>

      {/* Results */}
      <section className="container-x pb-20">
        <div className="grid md:grid-cols-[220px_1fr] gap-8 md:gap-10">
          <ProductFilters filters={filters} activeCategory={activeCategory} />

          <div>
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-[var(--border)] mb-6">
              <p className="text-xs text-[var(--muted)] uppercase tracking-[0.22em]">
                {sorted.length}{" "}
                {sorted.length === 1 ? "product" : "products"}
              </p>
              <ProductSort value={sort} />
            </div>

            {/* Grid */}
            {sorted.length === 0 ? (
              <div className="py-20 text-center text-[var(--muted)]">
                <p>No products in this category yet.</p>
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
