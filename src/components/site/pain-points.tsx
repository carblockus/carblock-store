import Image from "next/image";

/**
 * Marketing banner with the on-brand A+ asset (leather seats + gold bottle
 * + odor icons + copy). Renders edge-to-edge so the message reads at a
 * single glance — full viewport width on every breakpoint.
 */
export function PainPoints() {
  return (
    <section className="bg-black border-y border-[var(--border)]">
      <div className="relative w-full">
        <Image
          src="/products/banner-seccion-01.jpg"
          alt="Say goodbye to unpleasant odors — CarBlock effectively eliminates smoke, mildew, pet and food odors, leaving a fresh and elegant scent."
          width={1940}
          height={1100}
          priority={false}
          className="w-full h-auto block"
          sizes="100vw"
        />
      </div>
    </section>
  );
}
