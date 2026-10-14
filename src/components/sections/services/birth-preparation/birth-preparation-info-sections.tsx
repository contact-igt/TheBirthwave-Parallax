import { Plus } from "lucide-react";
import {
  birthPrepProgramme,
  birthPrepFaq,
} from "@/content/birth-preparation-landing-content";
import { BirthPrepReveal } from "./birth-preparation-reveal";
import { Button } from "@/components/ui/button";

/**
 * Section 09 — Before You Join (Workshop Information).
 * Practical details on curriculum, schedule, format, venue, fees, and medical considerations.
 */
export function BirthPrepProgramme() {
  return (
    <section
      id="birth-prep-programme"
      aria-labelledby="birth-prep-programme-heading"
      className="relative isolate bg-[var(--birth-prep-rose-wash)] section-pad"
    >
      <BirthPrepReveal className="container-birthwave max-w-4xl">
        <div>
          <p className="eyebrow">{birthPrepProgramme.eyebrow}</p>
          <h2 id="birth-prep-programme-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
            {birthPrepProgramme.heading}
          </h2>

          <div className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2">
            {birthPrepProgramme.items.map((item) => (
              <div key={item.label} className="border-t border-[var(--color-border)] pt-4">
                <strong className="block font-body text-sm font-semibold text-ink">{item.label}</strong>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 border-t border-[var(--color-border)] pt-8">
            <Button href={birthPrepProgramme.cta.href} variant="primary">
              {birthPrepProgramme.cta.label}
            </Button>
          </div>
        </div>
      </BirthPrepReveal>
    </section>
  );
}

/**
 * Section 10 — Frequently Asked Questions.
 * 12 comprehensive FAQs covering timing, partner attendance, birth modes, VBAC, yoga, breastfeeding, etc.
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
