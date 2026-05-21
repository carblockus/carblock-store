import Image from "next/image";

/**
 * Marketing banner with the on-brand A+ asset — the CARBLOCK vs Vent Clip
 * vs Pine Shape comparison chart.
 *
 * Single-column on every breakpoint: infographic centered, no companion
 * photo. On desktop the cap is bumped to 960px (vs the previous 768px /
 * max-w-3xl) so the chart reads BIGGER and the comparison details are
 * legible — but it stays centered with breathing room left and right,
 * not stretched edge-to-edge.
 */
export function PainPoints() {
  return (
    <section className="bg-black border-y border-[var(--border)] md:py-12 lg:py-16">
      <div className="relative w-full md:max-w-[860px] lg:max-w-[960px] md:mx-auto md:px-8">
        <Image
          src="/products/carblock-new-3.png"
          alt="CarBlock — the luxury evolution of car fragrance. Up to 90 days, full-cabin coverage. Comparison vs. vent clips and pine-shape air fresheners."
          width={1480}
          height={2071}
          priority={false}
          className="w-full h-auto block"
          sizes="(min-width: 1024px) 960px, (min-width: 768px) 860px, 100vw"
        />
      </div>
    </section>
  );
}
