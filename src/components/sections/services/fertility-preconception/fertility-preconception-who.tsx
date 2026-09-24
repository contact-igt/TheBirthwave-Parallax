import { fertilityWhoThisIsFor } from "@/content/fertility-preconception-landing-content";
import { FertilityReveal } from "./fertility-preconception-reveal";

/**
 * Section 2 — Who This Is For. Deliberately compact and text-led, no image
 * slot reserved (the brief's own "keep this section compact and highly
 * readable"), matching the same "no image, text-led" precedent
 * `vbac-conversation.tsx`'s own Informed Choices section and
 * `normal-birth-delivery-comfort.tsx` already establish for a comparable
 * quick-read need.
 */
export function FertilityWho() {
  return (
    <section id="fertility-who" aria-labelledby="fertility-who-heading" className="relative isolate bg-[var(--fertility-rose-wash)] section-pad">
      <FertilityReveal className="container-birthwave max-w-2xl">
        <p className="eyebrow">{fertilityWhoThisIsFor.eyebrow}</p>
        <h2 id="fertility-who-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
          {fertilityWhoThisIsFor.heading}
        </h2>

        <p className="mt-6 max-w-[52ch] text-base leading-[var(--leading-relaxed)] text-ink-soft">This page may be useful if:</p>

        <div className="mt-4 flex flex-col">
          {fertilityWhoThisIsFor.points.map((point) => (
            <p key={point} className="border-t border-[var(--color-border)] py-3 font-body text-sm font-medium text-ink first:pt-0">
              {point}
            </p>
          ))}
        </div>

        <p className="mt-8 border-l-2 border-terracotta pl-4 text-sm text-ink-soft">{fertilityWhoThisIsFor.closing}</p>
      </FertilityReveal>
    </section>
  );
}
