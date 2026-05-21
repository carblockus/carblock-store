import Image from "next/image";

/**
 * Full-bleed marketing banner for WipesBlock — paired with PainPoints
 * to give each product line its own A+ feature spread on the home page.
 */
export function WipesBanner() {
  return (
    <section className="bg-black border-y border-[var(--border)] md:py-10 lg:py-12">
      {/* Big-but-not-full-bleed cap on desktop. The user's white-rectangle
          markup pointed at ~1500px of width with a small inset on each
          side, so the banner reads "huge" without quite touching the
          viewport edges. Mobile keeps its native full-bleed rendering. */}
      <div className="relative w-full md:max-w-[1200px] lg:max-w-[1500px] md:mx-auto md:px-6 lg:px-8">
        <Image
          src="/products/wipes-new-6.png"
          alt="WipesBlock vs others — restores & deep cleans, zero streaks zero effort, exclusive luxury scent. WipesBlock 75 wipes vs others 30 wipes."
          width={1000}
          height={1000}
          priority={false}
          className="w-full h-auto block"
          sizes="(min-width: 1024px) 1500px, (min-width: 768px) 1200px, 100vw"
        />
      </div>
    </section>
  );
}
