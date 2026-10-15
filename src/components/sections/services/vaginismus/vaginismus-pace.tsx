import { vaginismusPace } from "@/content/pages/vaginismus";
import { VaginismusImage } from "./vaginismus-image";
import { VaginismusReveal } from "./vaginismus-reveal";

/**
 * Section 6 — Care At Your Pace. Four editorial points beside a calm image.
 *
 * Layout redesign: points are rendered as a borderless checklist with
 * prominent terracotta number bubbles — giving the section more visual
 * weight — while the image gains an immersive treatment on the right.
 * Per the brief: no scrub or pinned animation.
 */
export function VaginismusPace() {
  return (
    <section
      id="vaginismus-pace"
      aria-labelledby="vaginismus-pace-heading"
      className="relative isolate bg-[var(--vaginismus-sky-wash)] section-pad"
    >
      <VaginismusReveal className="container-birthwave grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-16">
        {/* Left — content */}
        <div>
          <p className="eyebrow">{vaginismusPace.eyebrow}</p>
          <h2
            id="vaginismus-pace-heading"
            className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink"
          >
            {vaginismusPace.heading}
          </h2>
          <p className="mt-5 max-w-[52ch] text-lg leading-[var(--leading-relaxed)] text-ink-soft">
            {vaginismusPace.body}
          </p>

          {/* Points — numbered editorial list */}
          <div className="mt-10 space-y-0">
            {vaginismusPace.points.map((point, idx) => (
              <div
                key={point.title}
                className="flex gap-5 border-b border-[var(--color-border)] py-6 first:border-t first:border-t-[var(--color-border)]"
              >
                {/* Number circle */}
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-terracotta-deep/10 font-body text-xs font-bold text-terracotta-deep"
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-body text-sm font-semibold tracking-[var(--tracking-wider)] text-ink uppercase">
                    {point.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-[var(--leading-relaxed)] text-ink-soft">
                    {point.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Consent note */}
          <p className="mt-8 max-w-2xl border-l-2 border-terracotta pl-4 text-sm text-ink-soft">
            {vaginismusPace.note}
          </p>
        </div>

        {/* Right — image, sticky on large screens */}
        <div className="chapter-photo-sticky">
          <VaginismusImage
            imageKey="care-at-your-pace"
            corner="br"
            aspect="aspect-[4/4.5] sm:aspect-[5/4] lg:aspect-[4/5]"
          />
        </div>
      </VaginismusReveal>
    </section>
  );
}
