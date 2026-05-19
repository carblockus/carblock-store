import Image from "next/image";

/**
 * Full-bleed marketing banner for WipesBlock — paired with PainPoints
 * to give each product line its own A+ feature spread on the home page.
 */
export function WipesBanner() {
  return (
    <section className="bg-black border-y border-[var(--border)] md:py-12 lg:py-16">
      <div className="relative w-full md:max-w-3xl md:mx-auto md:px-8">
        <Image
          src="/products/wipes-new-6.png"
          alt="WipesBlock vs others — restores & deep cleans, zero streaks zero effort, exclusive luxury scent. WipesBlock 75 wipes vs others 30 wipes."
          width={1000}
          height={1000}
          priority={false}
          className="w-full h-auto block"
          sizes="100vw"
        />
      </div>
    </section>
  );
}
