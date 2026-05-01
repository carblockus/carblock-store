import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeroSlideshow } from "./hero-slideshow";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-black min-h-[640px] md:min-h-[720px]">
      {/* Auto-rotating social-proof slideshow */}
      <HeroSlideshow />

      {/* Legibility gradients — darker on the left where text sits */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30" />

      {/* Gold splash accents */}
      <div className="pointer-events-none absolute -right-32 top-1/4 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle_at_center,rgba(242,201,76,0.22),transparent_60%)] blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-[340px] w-[340px] rounded-full bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.22),transparent_60%)] blur-3xl" />

      <div className="container-x relative z-10 py-28 md:py-40 max-w-4xl">
        <div className="mb-6">
          <span className="font-display text-gold-gradient text-8xl md:text-9xl lg:text-[10rem] font-bold uppercase tracking-[0.12em] leading-none block">
            CarBlock
          </span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.02] uppercase font-bold text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
          <span className="block">It&apos;s not an air freshener,</span>
          <span className="block mt-1">
            it&apos;s a{" "}
            <span className="text-gold-gradient italic pr-2 inline-block">
              perfume
            </span>{" "}
            for your car.
          </span>
        </h1>

        <p className="mt-7 max-w-xl text-base md:text-lg text-white/85 leading-relaxed drop-shadow-md">
          CarBlock transforms the interior of your vehicle with a sophisticated,
          long-lasting fragrance designed for those who take care of every
          detail of their image.
        </p>

        {/* Pill: up to 3 months of fragrance */}
        <div className="mt-7 inline-flex items-center gap-3 rounded-full border border-[var(--gold)]/60 bg-[var(--gold)]/15 backdrop-blur px-6 py-3">
          <span className="font-display text-base md:text-xl tracking-[0.18em] uppercase font-bold text-gold-gradient">
            Up to <span className="italic">3 months</span> of fragrance
          </span>
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <Button
            asChild
            size="lg"
            className="rounded-full bg-[var(--gold)] hover:bg-[var(--gold-bright)] text-black font-semibold tracking-[0.18em] uppercase text-xs px-8 h-12"
          >
            <Link href="/products">Shop Now</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-full border-white/30 bg-black/30 backdrop-blur hover:bg-white hover:text-black text-white tracking-[0.18em] uppercase text-xs px-8 h-12"
          >
            <Link href="#how-it-works">How it Works</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
