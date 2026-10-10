import { ExternalLink, MapPin } from "lucide-react";
import { fertilityVisit } from "@/content/fertility-preconception-landing-content";
import { contactDirectDetails } from "@/content/contact-content";
import { AnimatedContent } from "@/components/ui/animations/animated-content";
import { cx } from "@/lib/cx";
import styles from "./fertility-preconception.module.css";

/**
 * Before your visit — a compact checklist, no photograph. Practical details
 * (address, directions link, "by appointment") come only from the confirmed
 * records in contact-content.ts. Consultation timings and fees are not
 * confirmed anywhere in the project, so they are deliberately not shown.
 */
export function FertilityVisit() {
  const visit = contactDirectDetails.items.find((item) => item.id === "visit");

  return (
    <section id="fertility-practical" aria-labelledby="fertility-practical-heading" className="relative isolate scroll-mt-[var(--header-height)] bg-paper section-pad">
      <div className="container-birthwave grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="max-w-md">
          <p className="eyebrow">{fertilityVisit.eyebrow}</p>
          <h2 id="fertility-practical-heading" className={cx(styles.display, styles.h2, "mt-4")}>
            {fertilityVisit.heading}
          </h2>

          {visit ? (
            <div className="mt-8 border-t border-[var(--color-border)] pt-5">
              <p className="flex items-center gap-2 font-body text-sm font-semibold text-ink">
                <MapPin aria-hidden="true" className="size-4 text-terracotta-deep" />
                {fertilityVisit.locationLabel}
              </p>
              <address className="mt-2 text-sm leading-relaxed text-ink-soft not-italic">{visit.value}</address>
              <p className="mt-1 text-sm text-ink-soft">{visit.note}</p>
              {visit.actionHref ? (
                <a
                  href={visit.actionHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex min-h-11 items-center gap-1.5 rounded-xs font-body text-sm font-semibold !text-terracotta-deep underline underline-offset-4 hover:!text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta-deep"
                >
                  {fertilityVisit.directionsLabel}
                  <ExternalLink aria-hidden="true" className="size-3.5" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : null}
            </div>
          ) : null}
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
          <p className="mt-6 max-w-[56ch] border-l-2 border-terracotta pl-4 text-sm leading-relaxed text-ink-soft">{fertilityVisit.closing}</p>
        </div>
      </div>
    </section>
  );
}
