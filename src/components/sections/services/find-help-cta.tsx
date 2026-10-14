import { findHelpCta } from "@/content/services-content";
import { Button } from "@/components/ui/button";
import { CtaLink } from "@/components/ui/cta-link";

/**
 * Section 10 — "We'll Help You Find the Right Care."
 * A warm mid-page CTA for visitors who are unsure which service applies
 * to them. Dark atmosphere (ink surface) to mark a tonal break — a
 * deliberate pause before the Care Philosophy section below.
 */
export function FindHelpCta() {
  return (
    <section
      id="find-help"
      aria-labelledby="find-help-heading"
      className="relative isolate overflow-hidden bg-ink py-(--space-section-sm)"
      style={{
        backgroundImage: [
          "radial-gradient(55% 65% at 85% 15%, color-mix(in srgb, var(--color-coral) 14%, transparent) 0%, transparent 70%)",
          "radial-gradient(50% 55% at 10% 90%, color-mix(in srgb, var(--color-terracotta) 18%, transparent) 0%, transparent 72%)",
        ].join(", "),
      }}
    >
      <div className="container-birthwave max-w-2xl">
        <p className="eyebrow text-coral/80">{findHelpCta.eyebrow}</p>
        <h2
          id="find-help-heading"
          className="mt-4 text-h2 leading-[1.1] font-semibold text-paper"
        >
          {findHelpCta.heading}
        </h2>
        <p className="mt-5 max-w-[50ch] text-lg leading-[var(--leading-relaxed)] text-paper/65">
          {findHelpCta.body}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Button href={findHelpCta.primaryCta.href} variant="primary">
            {findHelpCta.primaryCta.label}
          </Button>
          <CtaLink
            href={findHelpCta.secondaryCta.href}
            className="!text-paper/80 hover:!text-paper"
          >
            {findHelpCta.secondaryCta.label}
          </CtaLink>
        </div>
      </div>
    </section>
  );
}
