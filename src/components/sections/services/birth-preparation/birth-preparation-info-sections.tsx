import { Plus, UserRound } from "lucide-react";
import {
  birthPrepWhoFor,
  birthPrepHowToBegin,
  birthPrepEducator,
  birthPrepProgramme,
  birthPrepFaq,
} from "@/content/birth-preparation-landing-content";
import { BirthPrepReveal } from "./birth-preparation-reveal";
import { Button } from "@/components/ui/button";

/** Section 5 — Who This Is For. Kept concise and easy to scan, per the brief. */
export function BirthPrepWhoFor() {
  return (
    <section id="birth-prep-who-for" aria-labelledby="birth-prep-who-for-heading" className="relative isolate bg-paper section-pad">
      <BirthPrepReveal className="container-birthwave max-w-3xl">
        <p className="eyebrow">{birthPrepWhoFor.eyebrow}</p>
        <h2 id="birth-prep-who-for-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
          {birthPrepWhoFor.heading}
        </h2>
        <p className="mt-5 text-lg leading-[var(--leading-relaxed)] text-ink-soft">{birthPrepWhoFor.intro}</p>

        <ul className="mt-8 flex flex-col">
          {birthPrepWhoFor.items.map((item) => (
            <li key={item} className="border-t border-[var(--color-border)] py-4 text-base leading-[var(--leading-relaxed)] text-ink">
              {item}
            </li>
          ))}
        </ul>

        <p className="mt-8 max-w-2xl border-l-2 border-terracotta pl-4 text-sm text-ink-soft">{birthPrepWhoFor.note}</p>
      </BirthPrepReveal>
    </section>
  );
}

/** Section 6 — How To Begin. Three steps kept in normal document flow. */
export function BirthPrepHowToBegin() {
  return (
    <section
      id="birth-prep-how-to-begin"
      aria-labelledby="birth-prep-how-to-begin-heading"
      className="relative isolate bg-[var(--birth-prep-sky-wash)] section-pad"
    >
      <BirthPrepReveal className="container-birthwave">
        <p className="eyebrow">{birthPrepHowToBegin.eyebrow}</p>
        <h2 id="birth-prep-how-to-begin-heading" className="mt-4 max-w-xl text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
          {birthPrepHowToBegin.heading}
        </h2>

        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          {birthPrepHowToBegin.steps.map((step) => (
            <div key={step.number} className="border-t border-[var(--color-border)] pt-5">
              <span className="font-body text-xs font-semibold tracking-[var(--tracking-wider)] text-terracotta-deep uppercase">
                {step.number} — {step.title}
              </span>
              <p className="mt-3 text-sm leading-[var(--leading-relaxed)] text-ink-soft">{step.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Button href={birthPrepHowToBegin.cta.href} variant="primary">
            {birthPrepHowToBegin.cta.label}
          </Button>
        </div>
      </BirthPrepReveal>
    </section>
  );
}

/**
 * Section 7 — Meet Your Educator. No confirmed assignment exists (see
 * the content file's own top comment) — an explicit, clearly drawn
 * placeholder panel stands in for a real portrait, name, qualification,
 * role and biography until one is confirmed, exactly like
 * `pregnancy-antenatal-info-sections.tsx`'s own clinician section. Kept
 * compact while information is pending.
 */
export function BirthPrepEducator() {
  return (
    <section
      id="birth-prep-educator"
      aria-labelledby="birth-prep-educator-heading"
      className="relative isolate border-t border-[var(--color-border)] bg-paper section-pad"
    >
      <BirthPrepReveal className="container-birthwave grid gap-10 lg:grid-cols-[0.7fr_1fr] lg:items-center lg:gap-16">
        <div
          role="img"
          aria-label="Actual educator portrait — approved photography pending"
          className="flex aspect-[4/5] w-full max-w-sm flex-col items-center justify-center gap-5 rounded-tl-panel rounded-tr-xs rounded-br-xs rounded-bl-xs bg-[linear-gradient(135deg,var(--color-paper-dim),var(--color-terracotta))] px-8 text-center text-ink-soft"
        >
          <UserRound aria-hidden="true" className="size-12 stroke-[1]" />
          <span className="max-w-[220px] text-sm leading-relaxed whitespace-pre-line">{birthPrepEducator.portraitNote}</span>
        </div>

        <div className="max-w-xl">
          <p className="eyebrow">{birthPrepEducator.eyebrow}</p>
          <h2 id="birth-prep-educator-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
            {birthPrepEducator.heading}
          </h2>
          <h3 className="mt-6 text-xl font-semibold text-ink">{birthPrepEducator.namePlaceholder}</h3>
          <p className="mt-2 text-sm text-ink-soft">{birthPrepEducator.credentialsPlaceholder}</p>
          <p className="mt-5 text-base leading-[var(--leading-relaxed)] text-ink-soft">{birthPrepEducator.bioPlaceholder}</p>
          <p className="mt-8 border-t border-[var(--color-border)] pt-4 text-sm text-ink-soft">{birthPrepEducator.footnote}</p>
        </div>
      </BirthPrepReveal>
    </section>
  );
}

/**
 * Section 8 — Programme Details. Every field is a confirmed-pending
 * placeholder (see the content file's own comment) — no photograph
 * implies a real teaching space; a neutral placeholder panel stands in,
 * matching `birth-preparation-info-sections.tsx`'s own educator treatment.
 */
export function BirthPrepProgramme() {
  return (
    <section
      id="birth-prep-programme"
      aria-labelledby="birth-prep-programme-heading"
      className="relative isolate bg-[var(--birth-prep-rose-wash)] section-pad"
    >
      <BirthPrepReveal className="container-birthwave grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
        <div
          role="img"
          aria-label="Actual teaching space photograph — approved photography pending"
          className="flex aspect-[4/5] w-full flex-col items-center justify-center gap-5 rounded-tr-panel rounded-tl-xs rounded-br-xs rounded-bl-xs bg-[linear-gradient(135deg,var(--color-paper-dim),var(--color-sky))] px-8 text-center text-ink-soft"
        >
          <span className="max-w-[220px] text-sm leading-relaxed whitespace-pre-line">{birthPrepProgramme.imageNote}</span>
        </div>

        <div>
          <p className="eyebrow">{birthPrepProgramme.eyebrow}</p>
          <h2 id="birth-prep-programme-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
            {birthPrepProgramme.heading}
          </h2>

          <div className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2">
            {birthPrepProgramme.info.map((item) => (
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
      </BirthPrepReveal>
    </section>
  );
}

/**
 * Section 9 — FAQ. Native `<details>/<summary>` — the same accessible
 * accordion `faq-section.tsx` and `pregnancy-antenatal-info-sections.tsx`
 * already establish site-wide.
 */
export function BirthPrepFaq() {
  return (
    <section id="birth-prep-faq" aria-labelledby="birth-prep-faq-heading" className="relative isolate bg-paper section-pad">
      <BirthPrepReveal className="container-birthwave max-w-3xl">
        <p className="eyebrow">{birthPrepFaq.eyebrow}</p>
        <h2 id="birth-prep-faq-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
          {birthPrepFaq.heading}
        </h2>

        <div className="mt-10 border-t border-[var(--color-border)]">
          {birthPrepFaq.items.map((item) => (
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
      </BirthPrepReveal>
    </section>
  );
}
