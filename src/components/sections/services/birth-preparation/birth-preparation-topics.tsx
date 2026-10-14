import { birthPrepTopics } from "@/content/birth-preparation-landing-content";
import { BirthPrepReveal } from "./birth-preparation-reveal";
import { Button } from "@/components/ui/button";

/**
 * Section 04 — What Will You Learn? (Inside the Prenatal Workshop).
 * 8 comprehensive curriculum modules covering labour physiology, comfort techniques,
 * birth choices, partner preparation, yoga, breastfeeding, newborn care, and postpartum.
 */
export function BirthPrepTopics() {
  return (
    <section id="birth-prep-topics" aria-labelledby="birth-prep-topics-heading" className="relative isolate scroll-mt-[var(--header-height)] bg-[var(--birth-prep-sky-wash)] section-pad">
      <BirthPrepReveal className="container-birthwave max-w-4xl">
        <p className="eyebrow">{birthPrepTopics.eyebrow}</p>
        <h2 id="birth-prep-topics-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
          {birthPrepTopics.heading}
        </h2>
        <p className="mt-5 max-w-[64ch] text-lg leading-[var(--leading-relaxed)] text-ink-soft">
          {birthPrepTopics.intro}
        </p>

        <div className="mt-12 flex flex-col divide-y divide-[var(--color-border)]">
          {birthPrepTopics.modules.map((moduleItem) => (
            <div key={moduleItem.number} className="py-8 first:pt-0">
              <div className="flex items-baseline gap-3">
                <span className="font-body text-xs font-semibold tracking-[var(--tracking-wider)] text-terracotta-deep uppercase">
                  {moduleItem.number}
                </span>
                <h3 className="text-xl font-semibold text-ink sm:text-2xl">
                  {moduleItem.title}
                </h3>
              </div>

              {moduleItem.subhead ? (
                <p className="mt-2 text-sm font-medium text-ink-soft italic">
                  {moduleItem.subhead}
                </p>
              ) : null}

              <div className="mt-4 space-y-3 text-sm leading-[var(--leading-relaxed)] text-ink-soft">
                {moduleItem.paragraphs.map((para, pIdx) => (
                  <p key={pIdx}>{para}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-[var(--color-border)] pt-8">
          <Button href={birthPrepTopics.cta.href} variant="primary">
            {birthPrepTopics.cta.label}
          </Button>
        </div>
      </BirthPrepReveal>
    </section>
  );
}
