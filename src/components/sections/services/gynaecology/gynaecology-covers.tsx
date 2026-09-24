import { gynaecologyCovers } from "@/content/gynaecology-landing-content";
import { GynaecologyImage } from "./gynaecology-image";
import { GynaecologyReveal } from "./gynaecology-reveal";

/**
 * Section 3 — What The Consultation Covers. Image beside a stacked
 * four-step numbered list, matching `pregnancy-antenatal-care-includes.tsx`'s
 * own numbered-steps composition. No specific test, scan or investigation
 * is named — step 04 explicitly leaves the next step to the clinician's own
 * explanation.
 */
export function GynaecologyCovers() {
  return (
    <section id="gynaecology-covers" aria-labelledby="gynaecology-covers-heading" className="relative isolate scroll-mt-[var(--header-height)] bg-paper section-pad">
      <GynaecologyReveal className="container-birthwave">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <GynaecologyImage imageKey="consultation" corner="bl" aspect="aspect-[4/5]" />

          <div className="max-w-xl">
            <p className="eyebrow">{gynaecologyCovers.eyebrow}</p>
            <h2 id="gynaecology-covers-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
              {gynaecologyCovers.heading}
            </h2>

            <div className="mt-8 flex flex-col">
              {gynaecologyCovers.steps.map((step) => (
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
      </GynaecologyReveal>
    </section>
  );
}
