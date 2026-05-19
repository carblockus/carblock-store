import Image from "next/image";

/**
 * Marketing banner with the on-brand A+ asset (leather seats + gold bottle
 * + odor icons + copy). Renders edge-to-edge so the message reads at a
 * single glance — full viewport width on every breakpoint.
 */
export function PainPoints() {
  return (
    <section className="bg-black border-y border-[var(--border)] md:py-12 lg:py-16">
      <div className="relative w-full md:max-w-3xl md:mx-auto md:px-8">
        <Image
          src="/products/carblock-new-3.png"
          alt="CarBlock — the luxury evolution of car fragrance. Up to 90 days, full-cabin coverage. Comparison vs. vent clips and pine-shape air fresheners."
          width={1480}
          height={2071}
          priority={false}
          className="w-full h-auto block"
          sizes="100vw"
        />
      </div>
    </section>
  );
}
