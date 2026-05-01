import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Truck, Clock, ShieldCheck } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { products } from "@/lib/mock-products";
import { AddToCart } from "@/components/site/add-to-cart";
import { ProductCard } from "@/components/site/product-card";
import { ProductGallery } from "@/components/site/product-gallery";

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

  return (
    <div className="bg-background">
      {/* Breadcrumb */}
      <div className="border-b border-[var(--border)]">
        <div className="container-x py-4 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
          <Link href="/" className="hover:text-[var(--gold)] transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link
            href={`/products?category=${product.category}`}
            className="hover:text-[var(--gold)] transition-colors"
          >
            {categoryLabel}
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-white truncate max-w-[200px]">
            {product.name}
          </span>
        </div>
      </div>

      {/* Main content — 2 columns */}
      <section className="container-x py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
          {/* Left — Image gallery */}
          <ProductGallery
            images={[product.image, ...(product.gallery ?? [])]}
            alt={product.name}
            badge={product.badge}
            imageFit={product.category === "bundle" ? "contain" : "cover"}
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
                  sub: "Lower 48 states",
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
                  {product.category === "perfume" ? (
                    <>
                      CarBlock Millonario is a premium car perfume that
                      transforms your vehicle&apos;s interior with a
                      sophisticated, long-lasting fragrance. Unlike generic air
                      fresheners, CarBlock eliminates smoke, pet, mildew and
                      food odors — leaving a fresh and elegant scent that lasts
                      up to 3 months with a single application. Apply the liquid
                      directly on the floor mats, seat edges and the floor.
                    </>
                  ) : product.category === "wipes" ? (
                    <>
                      WipesBlock biodegradable interior wipes clean, revitalize
                      and protect leather, vinyl, fabric and all interior
                      surfaces. One wipe is enough to remove dust, fingerprints
                      and light stains while leaving a subtle fresh scent.
                      Safe for all materials including luxury leather.
                    </>
                  ) : (
                    <>
                      Save when you bundle CarBlock products. Each bundle
                      includes everything you need to keep your car&apos;s
                      interior looking, feeling and smelling like new.
                    </>
                  )}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="shipping" className="border-[var(--border)]">
                <AccordionTrigger className="text-xs uppercase tracking-[0.2em] text-white hover:text-[var(--gold)] py-4">
                  Shipping & Returns
                </AccordionTrigger>
                <AccordionContent className="text-sm text-[var(--muted)] leading-relaxed pb-4">
                  <ul className="list-disc pl-4 space-y-1.5">
                    <li>Free shipping to the contiguous US (lower 48 states).</li>
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
