import { Hero } from "@/components/site/hero";
import { SaveBanner } from "@/components/site/save-banner";
import { CategoryCard } from "@/components/site/category-card";
import { PainPoints } from "@/components/site/pain-points";
import { Stats } from "@/components/site/stats";
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

      {/* Featured product cards — first card sits flush with the hero,
          no section title above it */}
      <section className="bg-background py-4 md:py-8">
        <div className="container-x">
          {/* CarBlock alone first, then marquee, then remaining cards */}
          <div className="mb-6">
            <CategoryCard
              label={first.label}
              description={first.description}
              image={first.image}
              badge={first.badge}
              price={first.price}
              href={first.href}
              imageFit={first.slug === "bundles" ? "contain" : "cover"}
            />
          </div>
        </div>

        {/* Full-bleed marquee sits between the first card and the rest */}
        <div className="my-6 md:my-10">
          <SaveBanner />
        </div>

        <div className="container-x">
          <div className="grid gap-6 md:grid-cols-2">
            {rest.map((c) => (
              <CategoryCard
                key={c.slug}
                label={c.label}
                description={c.description}
                image={c.image}
                badge={c.badge}
                price={c.price}
                href={c.href}
                imageFit={c.slug === "bundles" ? "contain" : "cover"}
              />
            ))}
          </div>
        </div>
      </section>

      <PainPoints />
      <Stats />
      <WipesBanner />
      <Testimonials />
      <Newsletter />
    </>
  );
}
