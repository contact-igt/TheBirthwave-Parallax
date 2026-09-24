import { naturalBirthFlexibility } from "@/content/natural-birth-landing-content";
import { NaturalBirthImage } from "./natural-birth-image";
import { NaturalBirthReveal } from "./natural-birth-reveal";

/**
 * Section 05 — When Plans Need to Change. A calm, reassuring visual
 * treatment — a quiet page-scoped wash (`--natural-birth-sky-wash`, built
 * from the existing confirmed `--color-sky` token, matching the same
 * "page-scoped wash from an existing brand hue" approach
 * `vbac-landing-page.tsx`'s own tokens already establish) rather than a
 * stark section break, since this is the page's own most reassurance-
 * carrying moment: a different route is never framed as the plan having
 * failed.
 */
export function NaturalBirthFlexibility() {
  return (
    <section id="natural-birth-flexibility" aria-labelledby="natural-birth-flexibility-heading" className="relative isolate bg-[var(--natural-birth-sky-wash)] section-pad">
      <NaturalBirthReveal className="container-birthwave grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
        <div className="max-w-xl">
          <p className="eyebrow">{naturalBirthFlexibility.eyebrow}</p>
          <h2
            id="natural-birth-flexibility-heading"
            className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink"
          >
            {naturalBirthFlexibility.heading}
          </h2>

          {naturalBirthFlexibility.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mt-4 max-w-[52ch] text-base leading-[var(--leading-relaxed)] text-ink-soft">
              {paragraph}
            </p>
          ))}
        </div>

        <NaturalBirthImage imageKey="flexibility" corner="br" aspect="aspect-[4/3]" />
      </NaturalBirthReveal>
    </section>
  );
}
