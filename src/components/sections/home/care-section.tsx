import { care } from "@/content/site-content";

/**
 * "Our approach" — a centred statement over the three principles.
 *
 * The eyebrow and heading sit centred above the principles. From 1024px the
 * three principles share one row in equal columns; below that they stack.
 * Each principle is an open column (hairline top rule, number, title, text),
 * not a card, and all three read with equal weight — no scroll-driven
 * active state, so there is no motion here at all.
 */
export function CareSection() {
  return (
    <section id="care-trust" aria-labelledby="care-heading" className="section-pad relative isolate">
      <div className="container-birthwave">
        <div className="mx-auto max-w-[44rem] text-center">
          {/* mx-auto: globals.css caps every <p> at 65ch, which would pin
              the eyebrow's box left of the centred heading. */}
          <p className="eyebrow mx-auto">{care.eyebrow}</p>
          <h2
            id="care-heading"
            className="mt-3.5 text-balance text-[clamp(2.5rem,2rem+2.4vw,3.5rem)] leading-[1.02] font-semibold tracking-[var(--tracking-tight)] text-ink lg:text-[clamp(2.5rem,1.6rem+2.2vw,3.75rem)]"
          >
            {care.heading}
          </h2>
        </div>

        <ol className="mx-auto mt-12 grid max-w-[36rem] gap-y-10 sm:mt-14 lg:mt-20 lg:max-w-none lg:grid-cols-3 lg:gap-x-[clamp(2.5rem,1rem+3vw,4.5rem)]">
          {care.principles.map((principle) => (
            <li key={principle.index} className="border-t border-[var(--color-border)] pt-7 lg:pt-8">
              <span className="font-display text-sm font-semibold tracking-[var(--tracking-wide)] text-terracotta-deep tabular-nums">
                {principle.index}
              </span>
              <h3 className="mt-4 text-[clamp(1.5rem,1.25rem+0.9vw,2rem)] leading-[1.15] font-semibold text-balance">
                {principle.title}
              </h3>
              <p className="mt-3 text-lg leading-[var(--leading-relaxed)] text-ink-soft">{principle.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
