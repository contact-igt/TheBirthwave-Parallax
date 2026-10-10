import { vaginismusRelatedCare } from "@/content/vaginismus-landing-content";
import { VaginismusReveal } from "./vaginismus-reveal";
import { CtaLink } from "@/components/ui/cta-link";

/**
 * Section 11 — Connected Women's Health Support (Related Care).
 */
export function VaginismusRelatedCare() {
  return (
    <section id="vaginismus-related-care" aria-labelledby="vaginismus-related-care-heading" className="relative isolate border-t border-[var(--color-border)] bg-paper section-pad">
      <VaginismusReveal className="container-birthwave">
        <p className="eyebrow">{vaginismusRelatedCare.eyebrow}</p>
        <h2 id="vaginismus-related-care-heading" className="mt-4 max-w-xl text-[clamp(1.6rem,1.3rem+1.4vw,2.4rem)] leading-[1.15] font-semibold tracking-[var(--tracking-tight)] text-ink">
          {vaginismusRelatedCare.heading}
        </h2>
        <p className="mt-3 max-w-[52ch] text-sm text-ink-soft">{vaginismusRelatedCare.note}</p>

        <div className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
          {vaginismusRelatedCare.items.map((item) => (
            <div key={item.slug} className="flex flex-col border-t border-[var(--color-border)] pt-4">
              <CtaLink href={`/services/${item.slug}`}>{item.label}</CtaLink>
              <p className="mt-2 text-sm leading-[var(--leading-relaxed)] text-ink-soft">{item.description}</p>
            </div>
          ))}
        </div>
      </VaginismusReveal>
    </section>
  );
}
