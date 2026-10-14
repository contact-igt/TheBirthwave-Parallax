import { fertilityRelatedCare } from "@/content/fertility-preconception-landing-content";
import { CtaLink } from "@/components/ui/cta-link";

/**
 * Section 10 — Related Care.
 * 4 connected care areas: Gynaecology, Pregnancy Care, Nutrition & Lifestyle, and Emotional Well-being.
 */
export function FertilityRelatedCare() {
  return (
    <section id="fertility-related-care" aria-labelledby="fertility-related-care-heading" className="relative isolate scroll-mt-[var(--header-height)] bg-paper section-pad border-t border-[var(--color-border)]">
      <div className="container-birthwave">
        <p className="eyebrow">{fertilityRelatedCare.eyebrow}</p>
        <h2 id="fertility-related-care-heading" className="mt-4 max-w-xl text-[clamp(1.6rem,1.3rem+1.4vw,2.4rem)] leading-[1.15] font-semibold tracking-[var(--tracking-tight)] text-ink">
          {fertilityRelatedCare.heading}
        </h2>

        <div className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
          {fertilityRelatedCare.items.map((item, idx) => (
            <div key={`${item.slug}-${idx}`} className="flex flex-col border-t border-[var(--color-border)] pt-5">
              <CtaLink href={`/services/${item.slug}`}>{item.title}</CtaLink>
              <p className="mt-2 text-sm leading-[var(--leading-relaxed)] text-ink-soft">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
