import { Hero } from "@/components/site/hero";
import { SaveBanner } from "@/components/site/save-banner";
import { CategoryCard } from "@/components/site/category-card";
import { PainPoints } from "@/components/site/pain-points";
import { WipesBanner } from "@/components/site/wipes-banner";
import { Testimonials } from "@/components/site/testimonials";
import { Newsletter } from "@/components/site/newsletter";
import { categories } from "@/lib/mock-products";

export default function Home() {
  // Split the catalog so we can wedge the "Save 20%" marquee between the
  // CarBlock card (first) and the rest. Banner stays prominent without
  // pushing the entire hero down.
  const [first, ...rest] = categories;

  return (
    <>
      <Hero />

      {/* Mobile-only layout: stacked CarBlock card, then marquee, then
          the remaining cards. md:hidden so the desktop sees a different
          (3-column) layout below — mobile structure stays untouched. */}
      <section className="md:hidden bg-background py-6">
        <div className="container-x px-6 sm:px-8">
          <div className="mb-6 max-w-[340px] mx-auto">
            <CategoryCard
              label={first.label}
              description={first.description}
              image={first.image}
              badge={first.badge}
              price={first.price}
              href={first.href}
              imageFit={first.slug === "bundles" ? "contain" : "cover"}
              amazonHref={"amazonHref" in first ? first.amazonHref : undefined}
            />
          </div>
        </div>

        <div className="my-6">
          <SaveBanner />
        </div>

        <div className="container-x px-6 sm:px-8">
          <div className="grid gap-6 max-w-[340px] mx-auto">
            {rest.map((c) => (
              <CategoryCard
                key={c.slug}
                label={c.label}
                description={c.description}
                image={c.image}
                badge={c.badge}
                price={c.price}
                href={c.href}
                imageFit={c.slug === "car-wipes" || c.slug === "bundles" ? "contain" : "cover"}
                imageScale={c.slug === "bundles" ? "auto 100%" : undefined}
                amazonHref={"amazonHref" in c ? c.amazonHref : undefined}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Desktop-only layout: all 3 products in a single 3-column grid
          with the SAVE 20% marquee below. */}
      <section className="hidden md:block bg-background py-12 lg:py-16">
        <div className="container-x">
          <div className="grid grid-cols-3 gap-8 lg:gap-10 max-w-6xl mx-auto">
            {categories.map((c) => (
              <CategoryCard
                key={c.slug}
                label={c.label}
                description={c.description}
                image={c.image}
                badge={c.badge}
                price={c.price}
                href={c.href}
                imageFit={c.slug === "car-wipes" || c.slug === "bundles" ? "contain" : "cover"}
                imageScale={c.slug === "bundles" ? "auto 100%" : undefined}
                amazonHref={"amazonHref" in c ? c.amazonHref : undefined}
              />
            ))}
          </div>
        </div>
        <div className="mt-12 lg:mt-16">
          <SaveBanner />
        </div>
      </section>

      <PainPoints />
      <WipesBanner />
      <Testimonials />
      <Newsletter />
    </>
  );
}
