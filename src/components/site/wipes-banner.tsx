import Image from "next/image";

/**
 * Full-bleed marketing banner for WipesBlock — paired with PainPoints
 * to give each product line its own A+ feature spread on the home page.
 */
export function WipesBanner() {
  return (
    <section className="bg-black border-y border-[var(--border)]">
      <div className="relative w-full">
        <Image
          src="/products/banner-wipesblock.jpg"
          alt="WipesBlock car cleaning wipes — restores black color on vinyl, leather and plastic. Use on dashboards, consoles and doors."
          width={1537}
          height={1023}
          priority={false}
          className="w-full h-auto block"
          sizes="100vw"
        />
      </div>
    </section>
  );
}
