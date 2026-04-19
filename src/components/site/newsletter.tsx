import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Newsletter() {
  return (
    <section className="bg-black py-20 border-b border-[var(--border)]">
      <div className="container-x text-center max-w-2xl">
        <span className="text-[11px] tracking-[0.3em] uppercase text-[var(--gold)]">
          Join the club
        </span>
        <h2 className="font-display text-3xl md:text-5xl uppercase font-bold mt-3 text-white leading-tight">
          Get <span className="text-gold-gradient">15% off</span> your first order
        </h2>
        <p className="mt-3 text-[var(--muted)]">
          Drop launches, restocks, and exclusive bundles — straight to your inbox.
        </p>
        <form className="mt-8 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
          <Input
            type="email"
            placeholder="your@email.com"
            className="h-12 bg-[var(--surface)] border-[var(--border-strong)] text-white placeholder:text-[var(--muted-2)] rounded-full px-5"
          />
          <Button
            type="submit"
            className="h-12 px-8 rounded-full bg-[var(--gold)] hover:bg-[var(--gold-bright)] text-black font-semibold tracking-[0.18em] uppercase text-xs"
          >
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
}
