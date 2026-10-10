import { naturalBirthWhenLabourBegins } from "@/content/natural-birth-landing-content";
import { NaturalBirthReveal } from "./natural-birth-reveal";

/**
 * Section 05 — When Labour Begins.
 */
export function NaturalBirthWhenLabourBegins() {
  return (
    <section id="natural-birth-labour" aria-labelledby="natural-birth-labour-heading" className="relative isolate bg-paper section-pad">
      <NaturalBirthReveal className="container-birthwave max-w-4xl">
        <p className="eyebrow">{naturalBirthWhenLabourBegins.eyebrow}</p>
        <h2
          id="natural-birth-labour-heading"
          className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink"
        >
          {naturalBirthWhenLabourBegins.heading}
        </h2>

        {naturalBirthWhenLabourBegins.intro.map((para) => (
          <p key={para} className="mt-4 max-w-[56ch] text-base leading-[var(--leading-relaxed)] text-ink-soft">
            {para}
          </p>
        ))}

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {naturalBirthWhenLabourBegins.points.map((point) => (
            <div key={point.number} className="border-t border-[var(--color-border)] pt-5">
              <span className="font-body text-xs font-semibold tracking-[var(--tracking-wider)] text-terracotta-deep uppercase">
                {point.number} — {point.title}
              </span>
              <p className="mt-2 text-sm leading-[var(--leading-relaxed)] text-ink-soft">{point.body}</p>
            </div>
          ))}
        </div>
      </NaturalBirthReveal>
    </section>
  );
}
