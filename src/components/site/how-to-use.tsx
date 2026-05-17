import { Play } from "lucide-react";

/**
 * Two-step "How to Use" panel shown right under the Add-to-Cart on the
 * CarBlock perfume product page.
 *
 * The video element points at `/products/how-to-use.mp4` (drop the file in
 * carblock-store/public/products/ when ready) with a poster fallback so
 * the section still looks intentional before the asset is uploaded.
 *
 * Steps are intentionally short:
 *   1) Open the bottle
 *   2) Pour onto floor mats and along the floor edges
 */
export function HowToUse() {
  return (
    <section className="space-y-5">
      <div className="text-center">
        <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--gold)]">
          Two-step ritual
        </span>
        <h3 className="font-display text-2xl md:text-3xl uppercase font-bold mt-1 text-white">
          How to Use
        </h3>
      </div>

      {/* Video — 16:9 frame with poster fallback while the .mp4 is missing */}
      <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-[var(--border)] bg-black">
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          src="/products/how-to-use.mp4"
          poster="/products/carblock-new-3.png"
          controls
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Play overlay only shows while controls are inactive on first paint */}
        <div className="pointer-events-none absolute inset-0 grid place-items-center bg-gradient-to-t from-black/30 to-transparent">
          <span className="grid place-items-center h-14 w-14 rounded-full bg-[var(--gold)]/85 text-black shadow-lg">
            <Play className="h-6 w-6 ml-0.5" />
          </span>
        </div>
      </div>

      {/* Two steps */}
      <ol className="grid sm:grid-cols-2 gap-3">
        <Step
          n={1}
          title="Open the bottle"
          body="Twist off the cap. The liquid is concentrated — a little goes a long way."
        />
        <Step
          n={2}
          title="Pour on floor mats & edges"
          body="Distribute along the car floor edges and underneath the mats. The fragrance slow-releases for up to 3 months."
        />
      </ol>
    </section>
  );
}

function Step({ n, title, body }: { n: number; title: string; body: string }) {
  return (
    <li className="flex gap-3 rounded-md border border-[var(--border)] bg-[var(--surface)] p-4">
      <span className="grid place-items-center h-8 w-8 rounded-full bg-[var(--gold)] text-black font-bold text-sm shrink-0 leading-none">
        {n}
      </span>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-white uppercase tracking-[0.12em]">
          {title}
        </p>
        <p className="text-xs text-[var(--muted)] mt-1 leading-relaxed">
          {body}
        </p>
      </div>
    </li>
  );
}
