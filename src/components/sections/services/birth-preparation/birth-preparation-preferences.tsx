import { birthPrepPreferences } from "@/content/birth-preparation-landing-content";
import { BirthPrepImage } from "./birth-preparation-image";
import { BirthPrepReveal } from "./birth-preparation-reveal";
import { Button } from "@/components/ui/button";

/**
 * Section 06 — Your Birth Preferences (Your Birth, Your Voice).
 * Explores movement, partner roles, pain-relief, communication, and adapting when plans change.
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

          <div className="mt-6 space-y-3 text-base leading-[var(--leading-relaxed)] text-ink-soft">
            {birthPrepPreferences.intro.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          <div className="mt-8 flex flex-col">
            {birthPrepPreferences.points.map((point) => (
              <div key={point.title} className="border-t border-[var(--color-border)] py-4 first:border-t-0">
                <h3 className="text-base font-semibold text-ink">{point.title}</h3>
                <p className="mt-1 text-sm leading-[var(--leading-relaxed)] text-ink-soft">{point.body}</p>
              </div>
            ))}
          </div>

          <p className="mt-6 border-l-2 border-terracotta pl-4 text-sm font-medium leading-relaxed text-ink">
            {birthPrepPreferences.closing}
          </p>

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
