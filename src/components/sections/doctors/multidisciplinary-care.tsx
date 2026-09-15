import { multidisciplinaryCare } from "@/content/doctors-content";
import { accentVar } from "@/lib/accent-tint";

/**
 * Section 04 — Multidisciplinary Care. Reinforces the same "one
 * continuous journey of care" principle the homepage's Philosophy/Journey
 * and About's own Belief beat already carry — without repeating either:
 * no video, no pin, no cinematic canvas. A plain, static, restrained
 * chain of care-area labels connected by one thin line, wrapping
 * naturally on narrower viewports rather than requiring its own scroll
 * mechanism.
 */
export function MultidisciplinaryCare() {
  return (
    <section
      id="multidisciplinary-care"
      aria-labelledby="multidisciplinary-care-heading"
      className="relative isolate bg-paper section-pad"
    >
      <div className="container-birthwave">
        <div className="max-w-2xl">
          <p className="eyebrow">{multidisciplinaryCare.eyebrow}</p>
          <h2
            id="multidisciplinary-care-heading"
            className="mt-4 text-[clamp(2.1rem,1.6rem+2.2vw,3rem)] leading-[1.08] font-semibold tracking-[var(--tracking-tight)] text-ink"
          >
            {multidisciplinaryCare.heading}
          </h2>
          <p className="mt-5 text-lg leading-[var(--leading-relaxed)] text-ink-soft">{multidisciplinaryCare.intro}</p>
        </div>

        <div className="relative mt-16">
          {/* The connecting line — a single static rule running behind
              the chain, not a scroll-drawn path (Journey's own signature
              line already owns that motif on the homepage). */}
          <div
            aria-hidden="true"
            className="absolute top-1/2 right-0 left-0 hidden h-px -translate-y-1/2 bg-[var(--color-border-strong)] lg:block"
          />

          <ol className="relative flex flex-col gap-8 lg:flex-row lg:flex-wrap lg:items-center lg:justify-between lg:gap-y-10">
            {multidisciplinaryCare.stages.map((stage, index) => (
              <li key={stage} className="flex items-center gap-4 lg:flex-col lg:gap-3 lg:text-center">
                <span
                  aria-hidden="true"
                  className="flex size-9 shrink-0 items-center justify-center rounded-full bg-paper font-display text-sm font-semibold ring-1 ring-[var(--color-border-strong)]"
                  style={{ color: accentVar(index) }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-body text-base font-semibold text-ink">{stage}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
