import { vaginismusCovers } from "@/content/vaginismus-landing-content";
import { VaginismusImage } from "./vaginismus-image";
import { VaginismusReveal } from "./vaginismus-reveal";

/**
 * Section 3 — What The Consultation Covers. Image beside a stacked
 * four-step numbered list, matching `pregnancy-antenatal-care-includes.tsx`'s
 * own numbered-steps composition. No investigation, examination or
 * treatment step is described as automatic — step 04 explicitly leaves the
 * next step to the clinician's own explanation.
 */
export function VaginismusCovers() {
  return (
    <section id="vaginismus-covers" aria-labelledby="vaginismus-covers-heading" className="relative isolate scroll-mt-[var(--header-height)] bg-paper section-pad">
      <VaginismusReveal className="container-birthwave">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <VaginismusImage imageKey="consultation" corner="bl" aspect="aspect-[4/5]" />

          <div className="max-w-xl">
            <p className="eyebrow">{vaginismusCovers.eyebrow}</p>
            <h2 id="vaginismus-covers-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
              {vaginismusCovers.heading}
            </h2>

            <div className="mt-8 flex flex-col">
              {vaginismusCovers.steps.map((step) => (
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
      </VaginismusReveal>
    </section>
  );
}
