import { birthPrepExperience } from "@/content/birth-preparation-landing-content";
import { BirthPrepReveal } from "./birth-preparation-reveal";

/**
 * Section 05 — The Workshop Experience.
 * 5 interactive phases: Understand, Explore, Practise, Ask, Prepare Together.
 */
export function BirthPrepExperience() {
  return (
    <section id="birth-prep-experience" aria-labelledby="birth-prep-experience-heading" className="relative isolate overflow-hidden bg-paper section-pad border-t border-[var(--color-border)]">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[url('/images/services/birth-prep-learning-experience-background-v1.png')] bg-cover bg-center" />
      <BirthPrepReveal className="container-birthwave max-w-4xl">
        <p className="eyebrow">{birthPrepExperience.eyebrow}</p>
        <h2 id="birth-prep-experience-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
          {birthPrepExperience.heading}
        </h2>

        <div className="mt-6 space-y-3 text-base leading-[var(--leading-relaxed)] text-ink-soft">
          {birthPrepExperience.intro.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {birthPrepExperience.steps.map((step) => (
            <div
              key={step.number}
              className="rounded-xs border border-[var(--color-border)] bg-[var(--birth-prep-rose-wash)]/40 p-6"
            >
              <span className="font-body text-xs font-semibold tracking-[var(--tracking-wider)] text-terracotta-deep uppercase">
                {step.number}
              </span>
              <h3 className="mt-2 text-lg font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-[var(--leading-relaxed)] text-ink-soft">{step.body}</p>
            </div>
          ))}
        </div>

        <p className="mt-10 border-l-2 border-terracotta pl-4 text-base leading-[var(--leading-relaxed)] text-ink-soft">
          {birthPrepExperience.closing}
        </p>
      </BirthPrepReveal>
    </section>
  );
}
