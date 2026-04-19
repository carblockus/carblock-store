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
      <div
        className="absolute inset-0 opacity-30 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=2400&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/85 to-black" />

      <div className="container-x relative z-10 py-24 text-center">
        <span className="inline-block text-[11px] tracking-[0.3em] uppercase text-[var(--gold)]">
          How to apply
        </span>
        <h2 className="font-display text-3xl md:text-5xl uppercase font-bold text-white max-w-3xl mx-auto leading-tight mt-3">
          Lasts up to{" "}
          <span className="text-gold-gradient">3 months</span> with a single
          application.
        </h2>
        <p className="mt-4 text-[var(--muted)] max-w-xl mx-auto text-sm md:text-base leading-relaxed">
          Apply the liquid directly on the{" "}
          <span className="text-white font-semibold">floor mats</span>,{" "}
          <span className="text-white font-semibold">seat edges</span> and the{" "}
          <span className="text-white font-semibold">floor</span>. Distribute
          it across your car like this:
        </p>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          {distribution.map((d) => (
            <div key={d.label} className="flex flex-col items-center gap-2">
              <span className="font-display text-6xl md:text-7xl font-bold text-gold-gradient leading-none">
                {d.value}
              </span>
              <span className="text-xs md:text-sm tracking-[0.3em] uppercase text-white mt-1">
                {d.label}
              </span>
              <span className="text-xs text-[var(--muted)] max-w-[240px] leading-relaxed mt-1">
                {d.where}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
