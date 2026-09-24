import { fertilityConsultationCovers } from "@/content/fertility-preconception-landing-content";
import { FertilityImage } from "./fertility-preconception-image";
import { FertilityReveal } from "./fertility-preconception-reveal";

/**
 * Section 3 — What The Consultation Covers. An image beside a stacked
 * four-step numbered list, matching `pregnancy-antenatal-care-includes.tsx`'s
 * own first-consultation composition (image + numbered steps in normal
 * document flow, never a carousel). No investigation, scan or lab panel is
 * named — every step is phrased as a conversation topic.
 */
export function FertilityCovers() {
  return (
    <section id="fertility-covers" aria-labelledby="fertility-covers-heading" className="relative isolate scroll-mt-[var(--header-height)] bg-paper section-pad">
      <FertilityReveal className="container-birthwave">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <FertilityImage imageKey={fertilityConsultationCovers.imageKey} corner="bl" aspect="aspect-[4/5]" />

          <div className="max-w-xl">
            <p className="eyebrow">{fertilityConsultationCovers.eyebrow}</p>
            <h2 id="fertility-covers-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
              {fertilityConsultationCovers.heading}
            </h2>

            <div className="mt-8 flex flex-col">
              {fertilityConsultationCovers.steps.map((step) => (
                <div key={step.number} className="flex gap-4 border-t border-[var(--color-border)] py-6 first:border-t-0 first:pt-2">
                  <span className="mt-0.5 font-body text-sm text-terracotta-deep">{step.number}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-ink">{step.title}</h3>
                    <p className="mt-2 text-sm leading-[var(--leading-relaxed)] text-ink-soft">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </FertilityReveal>
    </section>
  );
}
