import { gynaecologyRelatedCare } from "@/content/gynaecology-landing-content";
import { GynaecologyReveal } from "./gynaecology-reveal";
import { CtaLink } from "@/components/ui/cta-link";

/**
 * Section 9 — Related Care.
 */
export function GynaecologyRelatedCare() {
  return (
    <section id="gynaecology-related-care" aria-labelledby="gynaecology-related-care-heading" className="relative isolate border-t border-[var(--color-border)] bg-paper section-pad">
      <GynaecologyReveal className="container-birthwave">
        <p className="eyebrow">{gynaecologyRelatedCare.eyebrow}</p>
        <h2 id="gynaecology-related-care-heading" className="mt-4 max-w-xl text-[clamp(1.6rem,1.3rem+1.4vw,2.4rem)] leading-[1.15] font-semibold tracking-[var(--tracking-tight)] text-ink">
          {gynaecologyRelatedCare.heading}
        </h2>
        <p className="mt-3 max-w-[52ch] text-sm text-ink-soft">{gynaecologyRelatedCare.note}</p>

        <div className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
          {gynaecologyRelatedCare.items.map((item) => (
            <div key={item.slug} className="flex flex-col border-t border-[var(--color-border)] pt-4">
              <CtaLink href={`/services/${item.slug}`}>{item.label}</CtaLink>
              <p className="mt-2 text-sm leading-[var(--leading-relaxed)] text-ink-soft">{item.description}</p>
            </div>
          ))}
        </div>
      </GynaecologyReveal>
    </section>
  );
}
