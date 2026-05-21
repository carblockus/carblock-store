import { notFound } from "next/navigation";
import { Truck, Clock, ShieldCheck, Check } from "lucide-react";
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

  // Build the gallery with per-image fit overrides. Default everything
  // to `cover`. The CarBlock perfume catalog now has 7 photos — we let
  // them all use the default `cover` for now since the new CATALOGO
  // CARBLOCK set is consistent product photography. Override on a
  // per-position basis if a future infographic needs `contain`.
  const galleryImages = [product.image, ...(product.gallery ?? [])];
  const galleryFits: ("cover" | "contain")[] = galleryImages.map(() => "cover");

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

          {/* Right — Info. Desktop scale-up: every text size and spacing
              steps up on md+/lg so the panel feels proportional to the
              big gallery on the left and the promo/CTAs read clearly. */}
          <div className="flex flex-col gap-6 md:gap-8">
            <div>
              <span className="text-[10px] md:text-xs lg:text-sm tracking-[0.3em] uppercase text-[var(--gold)]">
                {categoryLabel}
              </span>
              <h1 className="font-display text-3xl md:text-5xl lg:text-6xl uppercase font-bold text-white mt-2 md:mt-3 leading-tight">
                {product.name}
              </h1>
            </div>

            {/* For CarBlock (perfume) the short paragraph is replaced
                with a five-bullet selling-points list — clearer scan
                and stronger conversion. Other products keep the
                regular shortDescription paragraph. */}
            {product.category === "perfume" ? (
              <ul className="flex flex-col gap-2.5 md:gap-3.5 text-base md:text-lg lg:text-xl text-white">
                {[
                  "Premium perfume-grade fragrance — not a cheap car scent",
                  "Eliminates smoke, pet & humidity odors",
                  "Long-lasting — up to 90 days per application",
                  "Apply on carpets / mats to fragrance the entire cabin",
                  "Won't stain carpets or floor mats",
                ].map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2.5 md:gap-3 leading-snug">
                    <Check
                      className="h-5 w-5 md:h-6 md:w-6 text-[var(--gold)] shrink-0 mt-0.5"
                      strokeWidth={3}
                    />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-base md:text-lg lg:text-xl text-[var(--muted)] leading-relaxed">
                {product.shortDescription}
              </p>
            )}

            {/* Size chips */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <span className="block text-[10px] md:text-xs lg:text-sm tracking-[0.3em] uppercase text-[var(--muted)] mb-2 md:mb-3">
                  Size
                </span>
                <div className="flex gap-2 md:gap-3">
                  {product.sizes.map((s) => (
                    <span
                      key={s}
                      className="px-4 md:px-6 py-2 md:py-3 rounded-full border border-[var(--gold)]/60 bg-[var(--gold)]/10 text-xs md:text-sm uppercase tracking-[0.15em] text-white font-medium"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Add to cart */}
            <div className="border-y border-[var(--border)] py-6 md:py-8">
              <AddToCart product={product} />
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-4 md:gap-6">
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
                  className="flex flex-col items-center text-center gap-1.5 md:gap-2.5 py-3 md:py-5"
                >
                  <Icon className="h-5 w-5 md:h-8 md:w-8 text-[var(--gold)]" />
                  <span className="text-[10px] md:text-sm uppercase tracking-[0.2em] text-white font-medium">
                    {label}
                  </span>
                  <span className="text-[9px] md:text-xs text-[var(--muted)]">{sub}</span>
                </div>
              ))}
            </div>

            {/* Accordion details. The "How to use it" row sits between
                Description and Shipping & Returns — it's a plain anchor
                that smooth-scrolls down to the Stats section
                (#how-it-works) instead of expanding like the other
                triggers. Only rendered for the perfume product since
                that's where the Stats block is shown further down. */}
            <Accordion type="multiple" className="border-t border-[var(--border)]">
              <AccordionItem value="description" className="border-[var(--border)]">
                <AccordionTrigger className="text-xs md:text-base lg:text-lg uppercase tracking-[0.2em] text-white hover:text-[var(--gold)] py-4 md:py-6">
                  Description
                </AccordionTrigger>
                <AccordionContent className="text-sm md:text-base lg:text-lg text-[var(--muted)] leading-relaxed pb-4 md:pb-6">
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

              {/* "How to Use It" — expandable row that reveals the Audi
                  tutorial video. Sits between Description and Shipping.
                  Only rendered for the perfume product. */}
              {product.category === "perfume" && (
                <AccordionItem value="how-to-use" className="border-[var(--border)]">
                  <AccordionTrigger className="text-xs md:text-base lg:text-lg uppercase tracking-[0.2em] text-white hover:text-[var(--gold)] py-4 md:py-6">
                    How to Use It
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 md:pb-6">
                    {/* Vertical iPhone clip — 9:16 aspect, capped at a
                        comfortable height so the video doesn't dominate
                        the panel. Dual <source> tags so Safari plays
                        the .mov natively while Chrome / Firefox treat
                        it as mp4. */}
                    <div className="relative aspect-[9/16] max-h-[520px] md:max-h-[600px] mx-auto overflow-hidden rounded-lg bg-black border border-[var(--border)]">
                      <video
                        controls
                        playsInline
                        preload="metadata"
                        className="absolute inset-0 w-full h-full object-cover"
                      >
                        <source src="/products/carblock-tutorial-en.mov" type="video/mp4" />
                        <source src="/products/carblock-tutorial-en.mov" type="video/quicktime" />
                      </video>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )}

              <AccordionItem value="shipping" className="border-[var(--border)]">
                <AccordionTrigger className="text-xs md:text-base lg:text-lg uppercase tracking-[0.2em] text-white hover:text-[var(--gold)] py-4 md:py-6">
                  Shipping & Returns
                </AccordionTrigger>
                <AccordionContent className="text-sm md:text-base lg:text-lg text-[var(--muted)] leading-relaxed pb-4 md:pb-6">
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
                <AccordionTrigger className="text-xs md:text-base lg:text-lg uppercase tracking-[0.2em] text-white hover:text-[var(--gold)] py-4 md:py-6">
                  FAQ
                </AccordionTrigger>
                <AccordionContent className="text-sm md:text-base lg:text-lg text-[var(--muted)] leading-relaxed pb-4 md:pb-6 space-y-3 md:space-y-5">
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
          {/* Wider container on desktop so the related products row
              fills more of the viewport — was bottled into max-w-5xl
              before, leaving big black gutters on either side. */}
          <div className="container-x md:!max-w-[1600px] md:!px-6 lg:!px-10 py-16">
            <div className="text-center mb-10">
              <span className="text-[11px] tracking-[0.3em] uppercase text-[var(--gold)]">
                You may also like
              </span>
              <h2 className="font-display text-3xl md:text-4xl uppercase font-bold mt-3 text-white">
                Complete Your{" "}
                <span className="text-gold-gradient">Ride</span>
              </h2>
            </div>
            {/* Grid cap removed on desktop (was max-w-5xl/1024px) so
                cards stretch the full container width. Slightly larger
                gap on md+ keeps them from crashing into each other. */}
            <div className="grid gap-5 md:gap-8 lg:gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl md:!max-w-none mx-auto">
              {related.slice(0, 3).map((p) => (
                <ProductCard
                  key={p.slug}
                  product={p}
                  // Match the home + /products logic: wipes and bundles
                  // use `contain` so the product photo gets the white
                  // frame around it instead of cropping to the card
                  // edges. Old logic only contained the bundle —
                  // wipes was rendering with `cover` so the pack
                  // touched the frame.
                  imageFit={
                    p.category === "wipes" || p.category === "bundle"
                      ? "contain"
                      : "cover"
                  }
                  // The bundle PNG has a lot of built-in whitespace,
                  // so plain `contain` leaves the products tiny in
                  // the middle of the card. Scale to ~130% so the
                  // leather pack + bottle fill more of the frame.
                  imageScale={p.category === "bundle" ? "130% auto" : undefined}
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
