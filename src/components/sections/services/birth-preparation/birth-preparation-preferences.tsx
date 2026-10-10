import { birthPrepPreferences } from "@/content/birth-preparation-landing-content";
import { BirthPrepImage } from "./birth-preparation-image";
import { BirthPrepReveal } from "./birth-preparation-reveal";
import { Button } from "@/components/ui/button";

/**
 * Section 4 — Your Birth Preferences.
 */
export function BirthPrepPreferences() {
  return (
    <section
      id="birth-prep-preferences"
      aria-labelledby="birth-prep-preferences-heading"
      className="relative isolate bg-[var(--birth-prep-rose-wash)] section-pad"
    >
      <BirthPrepReveal className="container-birthwave grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
        <div className="max-w-xl">
          <p className="eyebrow">{birthPrepPreferences.eyebrow}</p>
          <h2 id="birth-prep-preferences-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
            {birthPrepPreferences.heading}
          </h2>

          {birthPrepPreferences.body.map((paragraph) => (
            <p key={paragraph} className="mt-4 max-w-[52ch] text-base leading-[var(--leading-relaxed)] text-ink-soft">
              {paragraph}
            </p>
          ))}

          <div className="mt-8 flex flex-col">
            <h3 className="font-body text-sm font-semibold tracking-[var(--tracking-wider)] text-terracotta-deep uppercase">
              {birthPrepPreferences.questionsTitle}
            </h3>
            <div className="mt-2 flex flex-col">
              {birthPrepPreferences.questions.map((question) => (
                <p key={question} className="border-t border-[var(--color-border)] py-3 font-body text-sm font-medium text-ink first:border-t-0">
                  {question}
                </p>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <Button href={birthPrepPreferences.cta.href} variant="primary">
              {birthPrepPreferences.cta.label}
            </Button>
          </div>
        </div>

        <BirthPrepImage imageKey={birthPrepPreferences.imageKey} corner="br" aspect="aspect-[4/4.5] sm:aspect-[5/4] lg:aspect-[4/4.5]" drift />
      </BirthPrepReveal>
    </section>
  );
}
