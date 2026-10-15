import { findYourCareSection } from "@/content/our-services-content";
import { Button } from "@/components/ui/button";
import { CtaLink } from "@/components/ui/cta-link";
import styles from "./services-overview.module.css";

/**
 * Section 11 — Find Your Care ("Not sure where to start?").
 * Warm, calming mid-page reassurance for visitors whose needs overlap across disciplines.
 */
export function ServicesFindYourCare() {
  return (
    <section
      id={findYourCareSection.id}
      aria-labelledby="find-your-care-heading"
      className={`relative isolate overflow-hidden ${styles.section} ${styles.darkCta}`}
      style={{
        backgroundImage: [
          "radial-gradient(55% 65% at 85% 15%, color-mix(in srgb, var(--color-coral) 8%, transparent) 0%, transparent 70%)",
          "radial-gradient(50% 55% at 10% 90%, color-mix(in srgb, var(--color-terracotta) 10%, transparent) 0%, transparent 72%)",
        ].join(", "),
      }}
    >
      <div className={`container-birthwave ${styles.lowerGrid}`}>
        <div>
          <p className="eyebrow text-coral/80 font-semibold">{findYourCareSection.eyebrow}</p>
          <h2
            id="find-your-care-heading"
            className="mt-4 text-h2 leading-[1.12] font-semibold text-paper"
          >
            {findYourCareSection.heading}
          </h2>
        </div>
        <div>
          <div className="space-y-3.5 text-base sm:text-lg leading-[var(--leading-relaxed)] text-paper/85">
            {findYourCareSection.paragraphs.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Button href={findYourCareSection.primaryCta.href} variant="primary" className={styles.onDarkButton}>
              {findYourCareSection.primaryCta.label.replace(/\s*→$/, "")}
            </Button>
            <CtaLink
              href={findYourCareSection.secondaryCta.href}
              tone="inverted"
              className="min-h-11"
            >
              {findYourCareSection.secondaryCta.label.replace(/\s*→$/, "")}
            </CtaLink>
          </div>
        </div>
      </div>
    </section>
  );
}
