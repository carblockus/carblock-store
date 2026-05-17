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

      {/* Featured product cards — first card sits flush with the hero,
          no section title above it. Cards get a px-4 inset so they have
          breathing room on mobile instead of touching the screen edges. */}
      <section className="bg-background py-6 md:py-10">
        <div className="container-x px-6 sm:px-8">
          {/* CarBlock alone first, then marquee, then remaining cards */}
          <div className="mb-6 max-w-md mx-auto md:max-w-none">
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

        <div className="container-x px-6 sm:px-8">
          <div className="grid gap-6 md:grid-cols-2 max-w-md mx-auto md:max-w-none">
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
      <WipesBanner />
      <Testimonials />
      <Newsletter />
    </>
  );
}
