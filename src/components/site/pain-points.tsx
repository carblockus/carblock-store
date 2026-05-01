import Image from "next/image";

/**
 * Marketing banner with the on-brand A+ asset (leather seats + gold bottle
 * + odor icons + copy). Constrained inside a centered container instead of
 * full-bleed so the visitor can take in the whole frame at once instead of
 * having it overflow at the top of the viewport.
 */
export function PainPoints() {
  return (
    <section className="bg-black border-y border-[var(--border)] py-12 md:py-16">
      <div className="container-x">
        <div className="relative w-full max-w-4xl mx-auto rounded-lg overflow-hidden border border-[var(--border)] shadow-2xl">
          <Image
            src="/products/banner-seccion-01.jpg"
            alt="Say goodbye to unpleasant odors — CarBlock effectively eliminates smoke, mildew, pet and food odors, leaving a fresh and elegant scent."
            width={1940}
            height={1100}
            priority={false}
            className="w-full h-auto block"
            sizes="(min-width: 1024px) 56rem, 100vw"
          />
        </div>
      </div>
    </section>
  );
}
