import { Hero } from "@/components/site/hero";
import { CategoryCard } from "@/components/site/category-card";
import { PainPoints } from "@/components/site/pain-points";
import { Stats } from "@/components/site/stats";
import { Testimonials } from "@/components/site/testimonials";
import { Newsletter } from "@/components/site/newsletter";
import { categories } from "@/lib/mock-products";

export default function Home() {
  return (
    <>
      <Hero />

      {/* Categories grid (Drift-style 3 cards on dark) */}
      <section className="bg-background py-20 md:py-28">
        <div className="container-x">
          <div className="text-center mb-12">
            <span className="text-[11px] tracking-[0.3em] uppercase text-[var(--gold)]">
              Shop by category
            </span>
            <h2 className="font-display text-4xl md:text-5xl uppercase font-bold mt-3 text-white">
              For Your <span className="text-gold-gradient">Car</span>
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {categories.map((c) => (
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
      <Testimonials />
      <Newsletter />
    </>
  );
}
