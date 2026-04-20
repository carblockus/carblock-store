import { testimonials } from "@/lib/mock-products";
import { Star } from "lucide-react";

export function Testimonials() {
  // Duplicate for seamless marquee
  const loop = [...testimonials, ...testimonials];

  return (
    <section className="bg-[var(--surface)] border-y border-[var(--border)] py-20">
      <div className="container-x text-center mb-12">
        <span className="text-[11px] tracking-[0.3em] uppercase text-[var(--gold)]">
          Trusted by
        </span>
        <h2 className="font-display text-4xl md:text-6xl uppercase font-bold mt-3 text-white leading-tight">
          Over <span className="text-gold-gradient">100,000</span> satisfied drivers
        </h2>
      </div>

      <div className="relative overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[var(--surface)] to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[var(--surface)] to-transparent z-10" />
        <div className="flex gap-6 animate-marquee w-max">
          {loop.map((t, i) => (
            <article
              key={`${t.name}-${i}`}
              className="w-80 shrink-0 rounded-lg bg-black border border-[var(--border)] overflow-hidden flex flex-col"
            >
              {/* Photo on top */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[var(--surface-2)]">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${t.photo}')` }}
                  role="img"
                  aria-label={`${t.name}'s ${t.car}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>

              {/* Text below */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex gap-0.5 mb-3 text-[var(--gold)]">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star key={idx} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-white/90 leading-relaxed flex-1">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="mt-4 pt-4 border-t border-[var(--border)] flex items-baseline justify-between">
                  <span className="text-sm font-medium text-white">{t.name}</span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">
                    {t.car}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
