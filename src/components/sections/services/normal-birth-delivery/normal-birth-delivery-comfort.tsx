import { normalBirthComfort } from "@/content/normal-birth-delivery-landing-content";
import { NormalBirthReveal } from "./normal-birth-delivery-reveal";

/**
 * Section 5 — Comfort and Support. Deliberately concise and text-led per
 * the brief: no image, no invented technique/medicine/facility name — a
 * plain list of questions to bring to the maternity team, plus the
 * confirmed dependency-on-facility note.
 */
export function NormalBirthComfort() {
  return (
    <section id="nbd-comfort" aria-labelledby="nbd-comfort-heading" className="relative isolate bg-[var(--nbd-sky-wash)] section-pad">
      <NormalBirthReveal className="container-birthwave max-w-2xl">
        <p className="eyebrow">{normalBirthComfort.eyebrow}</p>
        <h2 id="nbd-comfort-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
          {normalBirthComfort.heading}
        </h2>
        <p className="mt-5 text-lg leading-[var(--leading-relaxed)] text-ink-soft">{normalBirthComfort.intro}</p>

        <ul className="mt-8 flex flex-col">
          {normalBirthComfort.items.map((item) => (
            <li key={item} className="border-t border-[var(--color-border)] py-4 text-base leading-[var(--leading-relaxed)] text-ink">
              {item}
            </li>
          ))}
        </ul>

        <p className="mt-8 border-l-2 border-terracotta pl-4 text-sm text-ink-soft">{normalBirthComfort.note}</p>
      </NormalBirthReveal>
    </section>
  );
}
