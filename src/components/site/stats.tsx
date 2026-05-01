import Image from "next/image";

const distribution = [
  {
    value: "25%",
    label: "Driver",
    where: "On driver's floor mat & seat edges",
  },
  {
    value: "25%",
    label: "Passenger",
    where: "On passenger's floor mat & seat edges",
  },
  {
    value: "50%",
    label: "Rear",
    where: "On rear mats, seat edges & floor",
  },
];

export function Stats() {
  return (
    <section
      id="how-it-works"
      className="relative bg-black overflow-hidden border-y border-[var(--border)]"
    >
      {/* Decorative gold glows */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.15),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(168,130,27,0.15),transparent_55%)]" />

      <div className="container-x relative z-10 py-20 md:py-24">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block text-[11px] tracking-[0.3em] uppercase text-[var(--gold)]">
            How to apply
          </span>
          <h2 className="font-display text-3xl md:text-5xl uppercase font-bold text-white leading-tight mt-3">
            Lasts up to{" "}
            <span className="text-gold-gradient">3 months</span> with a single
            application.
          </h2>
          <p className="mt-4 text-[var(--muted)] max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Apply the liquid directly{" "}
            <span className="text-white font-semibold">
              under the floor mats
            </span>
            , or along the{" "}
            <span className="text-white font-semibold">floor edges</span> for a{" "}
            <span className="text-[var(--gold)] font-semibold">
              stronger fragrance
            </span>
            .
          </p>
        </div>

        {/* Photo + stats split */}
        <div className="grid md:grid-cols-2 gap-10 lg:gap-14 items-center max-w-6xl mx-auto">
          {/* Application photo */}
          <div className="relative rounded-xl overflow-hidden border border-[var(--gold)]/40 bg-[var(--surface)] aspect-square shadow-[0_20px_60px_-20px_rgba(212,175,55,0.4)]">
            <Image
              src="/products/pour-under-mat.jpg"
              alt="Pouring CarBlock under the floor mat"
              fill
              sizes="(max-width: 768px) 100vw, 600px"
              className="object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-5">
              <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--gold)] mb-1">
                The technique
              </p>
              <p className="text-sm md:text-base text-white font-medium leading-snug">
                Lift the mat. Pour underneath. Replace.
              </p>
            </div>
          </div>

          {/* Stats column */}
          <div className="space-y-5">
            {distribution.map((d) => (
              <div
                key={d.label}
                className="flex items-center gap-5 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-6 py-5"
              >
                <span className="font-display text-4xl md:text-5xl font-bold text-gold-gradient leading-none shrink-0 min-w-[7rem] tabular-nums whitespace-nowrap">
                  {d.value}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs md:text-sm tracking-[0.22em] uppercase text-white font-semibold">
                    {d.label}
                  </p>
                  <p className="text-xs md:text-sm text-[var(--muted)] leading-relaxed mt-1">
                    {d.where}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
