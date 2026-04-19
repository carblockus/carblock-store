export function AnnouncementBar() {
  return (
    <div className="bg-black text-white text-[11px] tracking-[0.2em] uppercase border-b border-[var(--gold-deep)]/40">
      <div className="container-x flex h-9 items-center justify-center gap-2 text-center">
        <span className="text-[var(--gold-bright)]">★</span>
        <span>
          Free shipping on all orders — Premium fragrance for your car,
          guaranteed.
        </span>
        <span className="text-[var(--gold-bright)]">★</span>
      </div>
    </div>
  );
}
