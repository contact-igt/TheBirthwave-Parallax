import { naturalBirthApproach } from "@/content/pages/natural-birth";
import { NaturalBirthImage } from "./natural-birth-image";
import { NaturalBirthReveal } from "./natural-birth-reveal";

/**
 * Section 02 — What Natural Birth Means at BirthWave.
 */
export function NaturalBirthApproach() {
  return (
    <section
      id="natural-birth-approach"
      aria-labelledby="natural-birth-approach-heading"
      className="relative isolate scroll-mt-[var(--header-height)] bg-paper section-pad"
    >
      <NaturalBirthReveal className="container-birthwave">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-16">
          <div className="order-2 lg:order-1 lg:sticky lg:top-[calc(var(--header-height)+2rem)]">
            <NaturalBirthImage imageKey="consultation" corner="tl" aspect="aspect-[4/5] sm:aspect-[4/4.9]" />
          </div>

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

            <div className="mt-8 flex flex-col">
              {naturalBirthApproach.elements.map((element) => (
                <div key={element.title} className="border-t border-[var(--color-border)] py-5 first:pt-4">
                  <h3 className="font-body text-sm font-semibold tracking-[var(--tracking-wider)] text-terracotta-deep uppercase">
                    {element.title}
                  </h3>
                  <p className="mt-2 text-sm leading-[var(--leading-relaxed)] text-ink-soft">{element.body}</p>
                </div>
              ))}
            </div>

            <p className="mt-8 border-l-2 border-terracotta pl-4 text-base leading-[var(--leading-relaxed)] font-medium text-ink">
              {naturalBirthApproach.closing}
            </p>
          </div>
        </div>
      </NaturalBirthReveal>
    </section>
  );
}
