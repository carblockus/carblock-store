/**
 * Two-step "How to Use" panel shown under the Add-to-Cart on the perfume
 * product page and on the /how-to-use page.
 *
 * The video is a vertical (portrait) clip recorded on iPhone — we use
 * aspect-[9/16] with max-w-sm so it sits centered like a phone screen,
 * never letterboxed or cropped. `<video>` plays the .mov directly in
 * modern browsers since the inner codec is H.264.
 */
export function HowToUse({ id = "how-to-use" }: { id?: string }) {
  return (
    <section id={id} className="space-y-6">
      <div className="text-center">
        <h3 className="font-display text-2xl md:text-3xl uppercase font-bold text-white">
          How to Use
        </h3>
      </div>

      {/* Vertical video frame — phone-screen aspect, centered. Object-contain
          guarantees the whole video shows even if the source ratio varies. */}
      <div className="mx-auto w-full max-w-sm aspect-[9/16] rounded-2xl overflow-hidden border border-[var(--border)] bg-black">
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          controls
          playsInline
          preload="metadata"
          poster="/products/carblock-new-1.png"
          className="w-full h-full object-contain bg-black"
        >
          <source src="/products/how-to-use.mov" type="video/mp4" />
          <source src="/products/how-to-use.mov" type="video/quicktime" />
        </video>
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
