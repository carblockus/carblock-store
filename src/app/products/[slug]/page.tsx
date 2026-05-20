import { notFound } from "next/navigation";
import { Truck, Clock, ShieldCheck } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { products } from "@/lib/mock-products";
import { AddToCart } from "@/components/site/add-to-cart";
import { Stats } from "@/components/site/stats";
import { ProductCard } from "@/components/site/product-card";
import { ProductGallery } from "@/components/site/product-gallery";
import { ProductViewTracker } from "@/components/analytics/product-view-tracker";

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return notFound();

  const related = products.filter(
    (p) => p.slug !== slug && p.category !== product.category,
  );

  const categoryLabel =
    product.category === "perfume"
      ? "CarBlock"
      : product.category === "wipes"
        ? "WipesBlock"
        : "Bundles";

  // Build the gallery with per-image fit overrides. The CarBlock perfume
  // catalog has infographic-style photos at positions 2, 3, 4 (the comparison
  // chart, the durability stamp, the floor-application diagram) where text
  // is part of the image — those must render with `contain` so nothing gets
  // cropped. The hero product shots (positions 0, 1, 5) look better at the
  // default fill behavior.
  const galleryImages = [product.image, ...(product.gallery ?? [])];
  const galleryFits: ("cover" | "contain")[] =
    product.slug === "carblock-millonario-150ml"
      ? ["cover", "cover", "contain", "contain", "contain", "cover"]
      : galleryImages.map(() => "cover");

  return (
    <div className="bg-background">
      <ProductViewTracker
        id={product.slug}
        name={product.name}
        category={product.category}
        price={product.price}
      />

      {/* Main content — 2 columns. Default container-x caps at 1280px, but
          on the product page we widen it to 1600px so the gallery + info
          panel use more of the desktop viewport and don't leave huge black
          gutters on the sides. Mobile keeps container-x as-is. */}
      <section className="container-x py-12 md:py-16 md:!max-w-[1600px]">
        <div className="grid md:grid-cols-2 gap-10 md:gap-20 lg:gap-24 items-start">
          {/* Left — Image gallery */}
          <ProductGallery
            images={galleryImages}
            alt={product.name}
            badge={product.badge}
            imageFit={product.category === "bundle" ? "contain" : "cover"}
            // Per-image override — CarBlock catalog photos #3, #4 (and #5)
            // are infographic-style shots whose text reads off-frame when
            // cropped with `cover`. Force `contain` for those specifically
            // while leaving the hero product photos at the default fit.
            imageFits={galleryFits}
          />

          {/* Right — Info */}
          <div className="flex flex-col gap-6">
            <div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--gold)]">
                {categoryLabel}
              </span>
              <h1 className="font-display text-3xl md:text-4xl uppercase font-bold text-white mt-2 leading-tight">
                {product.name}
              </h1>
            </div>

            <p className="text-base text-[var(--muted)] leading-relaxed">
              {product.shortDescription}
            </p>

            {/* Size chips */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <span className="block text-[10px] tracking-[0.3em] uppercase text-[var(--muted)] mb-2">
                  Size
                </span>
                <div className="flex gap-2">
                  {product.sizes.map((s) => (
                    <span
                      key={s}
                      className="px-4 py-2 rounded-full border border-[var(--gold)]/60 bg-[var(--gold)]/10 text-xs uppercase tracking-[0.15em] text-white font-medium"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Add to cart */}
            <div className="border-y border-[var(--border)] py-6">
              <AddToCart product={product} />
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-4">
              {[
                {
                  icon: Truck,
                  label: "Free Shipping",
                  sub: "Every US order",
                },
                {
                  icon: Clock,
                  label: "Lasts 3 Months",
                  sub: "Single application",
                },
                {
                  icon: ShieldCheck,
                  label: "Guaranteed",
                  sub: "Premium quality",
                },
              ].map(({ icon: Icon, label, sub }) => (
                <div
                  key={label}
                  className="flex flex-col items-center text-center gap-1.5 py-3"
                >
                  <Icon className="h-5 w-5 text-[var(--gold)]" />
                  <span className="text-[10px] uppercase tracking-[0.2em] text-white font-medium">
                    {label}
                  </span>
                  <span className="text-[9px] text-[var(--muted)]">{sub}</span>
                </div>
              ))}
            </div>

            {/* Accordion details */}
            <Accordion type="multiple" className="border-t border-[var(--border)]">
              <AccordionItem value="description" className="border-[var(--border)]">
                <AccordionTrigger className="text-xs uppercase tracking-[0.2em] text-white hover:text-[var(--gold)] py-4">
                  Description
                </AccordionTrigger>
                <AccordionContent className="text-sm text-[var(--muted)] leading-relaxed pb-4">
                  {product.longDescription ? (
                    <ul className="space-y-3">
                      {product.longDescription.map((d) => (
                        <li key={d.title}>
                          <p className="text-white font-semibold">{d.title}</p>
                          <p className="mt-1">{d.body}</p>
                        </li>
                      ))}
                    </ul>
                  ) : product.category === "wipes" ? (
                    <p>
                      WipesBlock biodegradable interior wipes clean, revitalize
                      and protect leather, vinyl, fabric and all interior
                      surfaces. One wipe is enough to remove dust, fingerprints
                      and light stains while leaving a subtle fresh scent. Safe
                      for all materials including luxury leather.
                    </p>
                  ) : (
                    <p>
                      Save when you bundle CarBlock products. Each bundle
                      includes everything you need to keep your car&apos;s
                      interior looking, feeling and smelling like new.
                    </p>
                  )}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="shipping" className="border-[var(--border)]">
                <AccordionTrigger className="text-xs uppercase tracking-[0.2em] text-white hover:text-[var(--gold)] py-4">
                  Shipping & Returns
                </AccordionTrigger>
                <AccordionContent className="text-sm text-[var(--muted)] leading-relaxed pb-4">
                  <ul className="list-disc pl-4 space-y-1.5">
                    <li>Free standard shipping on every order — no minimum.</li>
                    <li>Ships to the contiguous US (lower 48 states) only.</li>
                    <li>We don&apos;t ship to Alaska, Hawaii or Puerto Rico.</li>
                    <li>Orders ship within 1-2 business days.</li>
                    <li>Standard delivery: 3-7 business days.</li>
                    <li>30-day return policy for unused products.</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq" className="border-[var(--border)]">
                <AccordionTrigger className="text-xs uppercase tracking-[0.2em] text-white hover:text-[var(--gold)] py-4">
                  FAQ
                </AccordionTrigger>
                <AccordionContent className="text-sm text-[var(--muted)] leading-relaxed pb-4 space-y-3">
                  <div>
                    <p className="text-white font-medium">
                      How long does the fragrance last?
                    </p>
                    <p>
                      Up to 3 months with a single application when applied
                      correctly on floor mats, seat edges and the floor.
                    </p>
                  </div>
                  <div>
                    <p className="text-white font-medium">
                      Is it safe for leather seats?
                    </p>
                    <p>
                      Yes. Apply on the floor mats and floor — not directly on
                      leather surfaces. The fragrance diffuses naturally
                      throughout the interior.
                    </p>
                  </div>
                  <div>
                    <p className="text-white font-medium">
                      Does it eliminate odors or just cover them?
                    </p>
                    <p>
                      CarBlock eliminates smoke, pet, mildew and food odors —
                      not just masks them.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* How to apply — the "TECHNIQUE 1+2 + 25/25/50 distribution" block.
          Only renders on the perfume product where the application
          technique matters. */}
      {product.category === "perfume" && <Stats />}

      {/* Related products */}
      {related.length > 0 && (
        <section className="border-t border-[var(--border)] bg-[var(--surface)]">
          <div className="container-x py-16">
            <div className="text-center mb-10">
              <span className="text-[11px] tracking-[0.3em] uppercase text-[var(--gold)]">
                You may also like
              </span>
              <h2 className="font-display text-3xl md:text-4xl uppercase font-bold mt-3 text-white">
                Complete Your{" "}
                <span className="text-gold-gradient">Ride</span>
              </h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
              {related.slice(0, 3).map((p) => (
                <ProductCard
                  key={p.slug}
                  product={p}
                  imageFit={p.category === "bundle" ? "contain" : "cover"}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return { title: "Product not found" };
  return {
    title: `${product.name} — CarBlock`,
    description: product.shortDescription,
  };
}
