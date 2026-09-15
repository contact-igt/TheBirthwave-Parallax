import { Plus, UserRound } from "lucide-react";
import {
  pregnancyLandingClinician,
  pregnancyLandingApproach,
  pregnancyLandingFaq,
  pregnancyLandingVisit,
} from "@/content/pregnancy-antenatal-landing-content";
import { PregnancyAntenatalImage } from "./pregnancy-antenatal-image";
import { PregnancyReveal } from "./pregnancy-antenatal-reveal";

/**
 * Section 5 — The person behind your care. No confirmed clinician is
 * mapped to this service yet (see pregnancy-antenatal-landing-content.ts's
 * own comment on `pregnancyLandingClinician`) — an explicit, clearly
 * drawn placeholder panel (never a real portrait slot half-filled with a
 * generic photo, and never an AI-generated "clinician") stands in for the
 * real portrait, name, qualification, role and biography until one is
 * confirmed.
 */
export function PregnancyAntenatalClinician() {
  return (
    <section
      id="pregnancy-clinician"
      aria-labelledby="pregnancy-clinician-heading"
      className="relative isolate border-t border-[var(--color-border)] bg-paper section-pad"
    >
      <PregnancyReveal className="container-birthwave grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
        <div
          role="img"
          aria-label="Actual clinician portrait — approved photography pending"
          className="flex aspect-[4/5] w-full flex-col items-center justify-center gap-5 rounded-tl-panel rounded-tr-xs rounded-br-xs rounded-bl-xs bg-[linear-gradient(135deg,var(--color-paper-dim),var(--color-terracotta))] px-8 text-center text-ink-soft"
        >
          <UserRound aria-hidden="true" className="size-12 stroke-[1]" />
          <span className="max-w-[220px] text-sm leading-relaxed whitespace-pre-line">{pregnancyLandingClinician.portraitNote}</span>
        </div>

        <div className="max-w-xl">
          <p className="eyebrow">{pregnancyLandingClinician.eyebrow}</p>
          <h2 id="pregnancy-clinician-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
            {pregnancyLandingClinician.heading.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <h3 className="mt-6 text-xl font-semibold text-ink">{pregnancyLandingClinician.namePlaceholder}</h3>
          <p className="mt-2 text-sm text-ink-soft">{pregnancyLandingClinician.credentialsPlaceholder}</p>
          <p className="mt-5 text-lg leading-[var(--leading-relaxed)] text-ink-soft">{pregnancyLandingClinician.bioPlaceholder}</p>
          <p className="mt-8 border-t border-[var(--color-border)] pt-4 text-sm text-ink-soft">{pregnancyLandingClinician.footnote}</p>
        </div>
      </PregnancyReveal>
    </section>
  );
}

/**
 * Section 6 — The BirthWave Approach. Three values paired with care-team
 * imagery on the muted sage wash (`--pregnancy-sage-wash`, the same
 * page-scoped colour Section 2 uses).
 */
export function PregnancyAntenatalApproach() {
  return (
    <section
      id="pregnancy-approach"
      aria-labelledby="pregnancy-approach-heading"
      className="relative isolate bg-[var(--pregnancy-sage-wash)] section-pad"
    >
      <PregnancyReveal className="container-birthwave grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
        <div className="max-w-xl">
          <p className="eyebrow">{pregnancyLandingApproach.eyebrow}</p>
          <h2 id="pregnancy-approach-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
            {pregnancyLandingApproach.heading}
          </h2>

          <div className="mt-8 flex flex-col">
            {pregnancyLandingApproach.values.map((value) => (
              <div key={value.title} className="border-t border-[var(--color-border)] py-5">
                <h3 className="text-lg font-semibold text-ink">{value.title}</h3>
                <p className="mt-2 text-sm text-ink-soft">{value.body}</p>
              </div>
            ))}
          </div>
        </div>

        <PregnancyAntenatalImage imageKey={pregnancyLandingApproach.imageKey} corner="br" aspect="aspect-[4/4.5] sm:aspect-[5/4] lg:aspect-[4/4.5]" drift />
      </PregnancyReveal>
    </section>
  );
}

/**
 * Section 7 — FAQ. Native `<details>/<summary>` — the exact accordion
 * pattern `faq-section.tsx` already establishes site-wide, reused here
 * rather than a second, custom-built accordion: full keyboard support
 * and screen-reader semantics for free.
 */
export function PregnancyAntenatalFaq() {
  return (
    <section id="pregnancy-faq" aria-labelledby="pregnancy-faq-heading" className="relative isolate bg-paper section-pad">
      <PregnancyReveal className="container-birthwave max-w-3xl">
        <p className="eyebrow">{pregnancyLandingFaq.eyebrow}</p>
        <h2 id="pregnancy-faq-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
          {pregnancyLandingFaq.heading}
        </h2>

        <div className="mt-10 border-t border-[var(--color-border)]">
          {pregnancyLandingFaq.items.map((item) => (
            <details key={item.question} className="group border-b border-[var(--color-border)] py-6">
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 font-body text-lg font-medium text-balance text-ink [&::-webkit-details-marker]:hidden">
                {item.question}
                <Plus
                  aria-hidden="true"
                  className="size-5 shrink-0 text-terracotta transition-transform duration-[var(--duration-fast)] ease-[var(--ease-signature)] group-open:rotate-45"
                />
              </summary>
              <p className="mt-4 max-w-2xl text-base leading-[var(--leading-relaxed)] text-ink-soft">{item.answer}</p>
            </details>
          ))}
        </div>
      </PregnancyReveal>
    </section>
  );
}

/** Section 8 — Visit Information. Every field is a confirmed-pending
 * placeholder — no verified clinic address, hours or phone number exists
 * anywhere in this project yet (see this page's own content file). */
export function PregnancyAntenatalVisit() {
  return (
    <section
      id="pregnancy-visit"
      aria-labelledby="pregnancy-visit-heading"
      className="relative isolate border-t border-[var(--color-border)] bg-paper section-pad"
    >
      <PregnancyReveal className="container-birthwave">
        <p className="eyebrow">{pregnancyLandingVisit.eyebrow}</p>
        <h2 id="pregnancy-visit-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
          {pregnancyLandingVisit.heading}
        </h2>
        <p className="mt-4 max-w-md text-base text-ink-soft">{pregnancyLandingVisit.note}</p>

        <div className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2">
          {pregnancyLandingVisit.info.map((item) => (
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
      </PregnancyReveal>
    </section>
  );
}
