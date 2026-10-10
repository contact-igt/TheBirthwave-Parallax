import { fertilityFirstConsultation } from "@/content/fertility-preconception-landing-content";
import { AnimatedContent } from "@/components/ui/animations/animated-content";
import { Button } from "@/components/ui/button";
import { cx } from "@/lib/cx";
import styles from "./fertility-preconception.module.css";

/**
 * 06 — Your first consultation. The SEQUENCE of the appointment (numbered
 * because the order is real), kept visibly separate from 03's topic cards:
 * heading, introduction and the booking action on the left; three numbered
 * steps in a hairline-divided list on the right. No photograph or cards.
 */
export function FertilityFirstConsultation() {
  return (
    <section id="fertility-first-consultation" aria-labelledby="fertility-first-consultation-heading" className="relative isolate scroll-mt-[var(--header-height)] bg-[var(--fertility-tint)] py-16 sm:py-20">
      <div className="container-birthwave grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="max-w-md">
          <p className="eyebrow">{fertilityFirstConsultation.eyebrow}</p>
          <h2 id="fertility-first-consultation-heading" className={cx(styles.display, styles.h2, "mt-4")}>
            {fertilityFirstConsultation.heading}
          </h2>
          <p className="mt-5 text-lg leading-[var(--leading-relaxed)] text-ink-soft">{fertilityFirstConsultation.intro}</p>
          <div className="mt-8">
            <Button href={fertilityFirstConsultation.cta.href} variant="primary">
              {fertilityFirstConsultation.cta.label}
            </Button>
          </div>
        </div>

        <ol className="border-b border-[var(--color-border)]">
          {fertilityFirstConsultation.steps.map((step) => (
            <li key={step.number} className="border-t border-[var(--color-border)]">
              <AnimatedContent distance={14} duration={0.5} ease="power2.out" threshold={0.08} className="grid grid-cols-[3.25rem_1fr] gap-x-4 py-6">
                <span aria-hidden="true" className={cx(styles.display, "text-[2rem] leading-none text-terracotta-deep")}>
                  {step.number}
                </span>
                <div>
                  <h3 className="font-body text-lg font-semibold text-ink">
                    <span className="sr-only">Step {step.number}: </span>
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-base leading-[var(--leading-relaxed)] text-ink-soft">{step.body}</p>
                </div>
              </AnimatedContent>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
