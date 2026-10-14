import { birthPrepRelatedCare } from "@/content/birth-preparation-landing-content";
import { BirthPrepReveal } from "./birth-preparation-reveal";
import { CtaLink } from "@/components/ui/cta-link";
import { Button } from "@/components/ui/button";

/**
 * Section 11 — Connected Care (Support Through Your Journey).
 * 6 interrelated clinical and supportive pathways.
 */
export function BirthPrepRelatedCare() {
  return (
    <section
      id="birth-prep-related-care"
      aria-labelledby="birth-prep-related-care-heading"
      className="relative isolate border-t border-[var(--color-border)] bg-paper section-pad"
    >
      <BirthPrepReveal className="container-birthwave">
        <p className="eyebrow">{birthPrepRelatedCare.eyebrow}</p>
        <h2
          id="birth-prep-related-care-heading"
          className="mt-4 max-w-xl text-[clamp(1.6rem,1.3rem+1.4vw,2.4rem)] leading-[1.15] font-semibold tracking-[var(--tracking-tight)] text-ink"
        >
          {birthPrepRelatedCare.heading}
        </h2>
        <p className="mt-3 max-w-[58ch] text-sm leading-[var(--leading-relaxed)] text-ink-soft">
          {birthPrepRelatedCare.intro}
        </p>

        <div className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {birthPrepRelatedCare.services.map((item) => (
            <div key={item.title} className="flex flex-col border-t border-[var(--color-border)] pt-5">
              <CtaLink href={item.href}>{item.title}</CtaLink>
              <p className="mt-2 text-sm leading-[var(--leading-relaxed)] text-ink-soft">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Button href={birthPrepRelatedCare.cta.href} variant="ghost">
            {birthPrepRelatedCare.cta.label}
          </Button>
        </div>
      </BirthPrepReveal>
    </section>
  );
}
