import Image from "next/image";

/**
 * Marketing banner with the on-brand A+ asset (leather seats + gold bottle
 * + odor icons + copy).
 *
 * MOBILE: the infographic alone, edge-to-edge, so the message reads at a
 * single glance with no wasted width.
 *
 * DESKTOP: the infographic sits in a left column with a lifestyle product
 * photo filling the right column — fills the wide viewport so there are
 * no big black gutters next to the infographic.
 */
export function PainPoints() {
  return (
    <section className="bg-black border-y border-[var(--border)] md:py-12 lg:py-16">
      {/* ---------- Mobile (and small tablets) — unchanged ---------- */}
      <div className="md:hidden relative w-full">
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

      {/* ---------- Desktop — infographic + companion photo ---------- */}
      <div className="hidden md:block container-x md:!max-w-[1600px] md:!px-6 lg:!px-10">
        <div className="grid grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left — comparison infographic. Capped so it doesn't grow
              taller than the photo on wide viewports. */}
          <div className="relative">
            <Image
              src="/products/carblock-new-3.png"
              alt="CarBlock — the luxury evolution of car fragrance. Up to 90 days, full-cabin coverage. Comparison vs. vent clips and pine-shape air fresheners."
              width={1480}
              height={2071}
              priority={false}
              className="w-full h-auto block mx-auto max-w-[640px]"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>

          {/* Right — companion lifestyle / product photo. Picked to
              visually complement the comparison chart on the left
              (CarBlock bottle in context). Swap the src to change the
              shot without touching layout. */}
          <div className="relative">
            <Image
              src="/products/carblock-new-1.png"
              alt="CarBlock premium auto perfume — gold bottle"
              width={1200}
              height={1600}
              priority={false}
              className="w-full h-auto block mx-auto max-w-[640px]"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
