import { MapPin } from "lucide-react";
import { fertilityVisit } from "@/content/fertility-preconception-landing-content";
import { AnimatedContent } from "@/components/ui/animations/animated-content";
import { Button } from "@/components/ui/button";
import { cx } from "@/lib/cx";
import styles from "./fertility-preconception.module.css";

/**
 * Section 8 — Before You Visit.
 * Practical preparation checklist and clinic location details.
 */
export function FertilityVisit() {
  return (
    <section id="fertility-practical" aria-labelledby="fertility-practical-heading" className="relative isolate scroll-mt-[var(--header-height)] bg-paper section-pad">
      <div className="container-birthwave grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="max-w-md">
          <p className="eyebrow">{fertilityVisit.eyebrow}</p>
          <h2 id="fertility-practical-heading" className={cx(styles.display, styles.h2, "mt-4")}>
            {fertilityVisit.heading}
          </h2>

          <div className="mt-8 border-t border-[var(--color-border)] pt-5">
            <p className="flex items-center gap-2 font-body text-sm font-semibold text-ink">
              <MapPin aria-hidden="true" className="size-4 text-terracotta-deep" />
              {fertilityVisit.locationLabel}
            </p>
            <p className="mt-2 text-base font-semibold text-ink">{fertilityVisit.clinicName}</p>
            <address className="mt-1 text-sm leading-relaxed text-ink-soft not-italic">
              {fertilityVisit.clinicAddress}
            </address>
            <p className="mt-1 text-sm text-ink-soft">{fertilityVisit.clinicNote}</p>
          </div>

          <div className="mt-8">
            <Button href={fertilityVisit.cta.href} variant="primary">
              {fertilityVisit.cta.label}
            </Button>
          </div>
        </div>

        <div>
          <h3 className="font-body text-sm font-semibold text-ink">{fertilityVisit.checklistLabel}</h3>
          <ul className="mt-4 grid border-b border-[var(--color-border)] sm:grid-cols-2 sm:gap-x-10">
            {fertilityVisit.items.map((item) => (
              <li key={item.label} className="border-t border-[var(--color-border)]">
                <AnimatedContent distance={14} duration={0.5} ease="power2.out" threshold={0.08} className="py-5">
                  <p className="font-body text-base font-semibold text-ink">{item.label}</p>
                  <p className="mt-1.5 text-sm leading-[var(--leading-relaxed)] text-ink-soft">{item.text}</p>
                </AnimatedContent>
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-[56ch] border-l-2 border-terracotta pl-4 text-sm leading-relaxed text-ink-soft">
            {fertilityVisit.closing}
          </p>
        </div>
      </div>
    </section>
  );
}
