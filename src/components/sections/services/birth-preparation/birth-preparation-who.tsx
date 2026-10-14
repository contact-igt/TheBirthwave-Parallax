import { birthPrepWhoFor } from "@/content/birth-preparation-landing-content";
import { BirthPrepReveal } from "./birth-preparation-reveal";
import { Button } from "@/components/ui/button";

/**
 * Section 03 — Who Is This Workshop For? (Your Starting Point).
 * 6 relatable scenarios for first-time or experienced parents, partner involvement,
 * and breastfeeding/newborn preparation.
 */
export function BirthPrepWho() {
  return (
    <section id="birth-prep-who-for" aria-labelledby="birth-prep-who-for-heading" className="relative isolate bg-paper section-pad">
      <BirthPrepReveal className="container-birthwave max-w-4xl">
        <p className="eyebrow">{birthPrepWhoFor.eyebrow}</p>
        <h2 id="birth-prep-who-for-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
          {birthPrepWhoFor.heading}
        </h2>
        <p className="mt-5 text-base font-medium text-ink">{birthPrepWhoFor.intro}</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {birthPrepWhoFor.items.map((item) => (
            <div
              key={item.title}
              className="rounded-xs border border-[var(--color-border)] bg-[var(--birth-prep-rose-wash)]/30 p-6"
            >
              <h3 className="font-body text-base font-semibold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-[var(--leading-relaxed)] text-ink-soft">{item.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Button href={birthPrepWhoFor.cta.href} variant="primary">
            {birthPrepWhoFor.cta.label}
          </Button>
        </div>
      </BirthPrepReveal>
    </section>
  );
}
