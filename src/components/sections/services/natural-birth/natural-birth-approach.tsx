import { naturalBirthApproach } from "@/content/natural-birth-landing-content";
import { NaturalBirthImage } from "./natural-birth-image";
import { NaturalBirthReveal } from "./natural-birth-reveal";

/**
 * Section 02 — What Natural Birth Means Here. `id: natural-birth-approach`,
 * targeted directly by the hero's own secondary CTA. A generous
 * consultation image opposite the text, matching the balanced editorial
 * composition `vbac-intro.tsx` already establishes for a comparable need.
 */
export function NaturalBirthApproach() {
  return (
    <section
      id="natural-birth-approach"
      aria-labelledby="natural-birth-approach-heading"
      className="relative isolate scroll-mt-[var(--header-height)] bg-paper section-pad"
    >
      <NaturalBirthReveal className="container-birthwave">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16">
          <NaturalBirthImage imageKey="consultation" corner="tl" aspect="aspect-[4/5] sm:aspect-[4/4.9]" className="order-2 lg:order-1" />

          <div className="order-1 max-w-xl lg:order-2">
            <p className="eyebrow">{naturalBirthApproach.eyebrow}</p>
            <h2
              id="natural-birth-approach-heading"
              className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink"
            >
              {naturalBirthApproach.heading}
            </h2>

            {naturalBirthApproach.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-4 max-w-[52ch] text-base leading-[var(--leading-relaxed)] text-ink-soft">
                {paragraph}
              </p>
            ))}

            <p className="mt-6 border-l-2 border-terracotta pl-4 text-base leading-[var(--leading-relaxed)] font-medium text-ink">
              {naturalBirthApproach.note}
            </p>
          </div>
        </div>
      </NaturalBirthReveal>
    </section>
  );
}
