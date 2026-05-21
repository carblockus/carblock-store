import { ExternalLink } from "lucide-react";
import { products, type Product } from "@/lib/mock-products";
import { ProductCard } from "@/components/site/product-card";
import { externalRetailers } from "@/components/site/external-channels";

/** Default "featured" order — bestsellers first. The sort dropdown was
 *  removed from the UI to keep the page tight as a Meta Ads landing target. */
function defaultSort(items: Product[]): Product[] {
  return [...items].sort((a, b) => (a.badge === "BESTSELLER" ? -1 : 1));
}

export default async function ProductsPage() {
  const sorted = defaultSort(products);

  return (
    <div className="bg-background">
      {/* Compact header — no breadcrumb, no toolbar. The visitor lands here
          from a Meta ad and should see the first product almost immediately. */}
      <section className="container-x py-5 md:py-12 text-center">
        <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--gold)]">
          Shop
        </span>
        <h1 className="font-display text-3xl md:text-6xl uppercase font-bold mt-2 text-white">
          For Your <span className="text-gold-gradient">Car</span>
        </h1>
      </section>

      {/* Product grid */}
      <section className="container-x pb-20">
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
                // Match the home-page logic: wipes + bundles use `contain`
                // (centered photo with a white frame so the product
                // doesn't touch the card edges); CarBlock keeps `cover`.
                imageFit={
                  p.category === "wipes" ||
                  p.category === "bundle" ||
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
