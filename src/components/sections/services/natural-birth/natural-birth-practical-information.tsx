import { naturalBirthPractical } from "@/content/natural-birth-landing-content";
import { NaturalBirthImage } from "./natural-birth-image";
import { NaturalBirthReveal } from "./natural-birth-reveal";

/**
 * Section 08 — Practical Information.
 */
export function NaturalBirthPracticalInformation() {
  return (
    <section id="natural-birth-practical" aria-labelledby="natural-birth-practical-heading" className="relative isolate bg-[var(--natural-birth-coral-wash)] section-pad">
      <NaturalBirthReveal className="container-birthwave grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
        <NaturalBirthImage
          imageKey="practical"
          corner="tr"
          aspect="aspect-[4/5]"
          className="w-full"
        />

        <div>
          <p className="eyebrow">{naturalBirthPractical.eyebrow}</p>
          <h2
            id="natural-birth-practical-heading"
            className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink"
          >
            {naturalBirthPractical.heading}
          </h2>

          <div className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2">
            {naturalBirthPractical.info.map((item) => (
              <div key={item.label}>
                <strong className="block font-body text-sm font-semibold text-ink">{item.label}</strong>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {item.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </div>
            ))}
          </div>
        </div>
      </NaturalBirthReveal>
    </section>
  );
}
