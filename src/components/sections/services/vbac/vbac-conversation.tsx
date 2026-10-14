import { vbacConsultationCover, vbacBenefitsRisks } from "@/content/vbac-landing-content";
import { VbacImage } from "./vbac-image";
import { VbacReveal } from "./vbac-reveal";
import { Button } from "@/components/ui/button";

/**
 * Section 03 — WHAT A VBAC CONSULTATION MAY COVER:
 * 3 core focus areas: previous birth, current pregnancy, and birth preferences.
 */
export function VbacConversation() {
  return (
    <section id="vbac-conversation" aria-labelledby="vbac-conversation-heading" className="relative isolate scroll-mt-[var(--header-height)] bg-paper section-pad border-t border-[var(--color-border)]">
      <VbacReveal className="container-birthwave">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-16">
          <div>
            <p className="eyebrow">{vbacConsultationCover.eyebrow}</p>
            <h2 id="vbac-conversation-heading" className="mt-4 max-w-xl text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
              {vbacConsultationCover.heading}
            </h2>

            <div className="mt-8 flex flex-col gap-6">
              {vbacConsultationCover.topics.map((topic, idx) => (
                <div key={topic.title} className="rounded-xs border border-[var(--color-border)] bg-[var(--vbac-sky-wash)]/40 p-6">
                  <div className="flex items-center gap-3">
                    <span className="font-body text-xs font-semibold tracking-wider text-terracotta-deep uppercase">
                      Topic 0{idx + 1}
                    </span>
                    <span className="h-px flex-1 bg-[var(--color-border)]" />
                  </div>
                  <h3 className="mt-2 text-lg font-semibold text-ink">{topic.title}</h3>
                  <p className="mt-2 text-sm leading-[var(--leading-relaxed)] text-ink-soft">{topic.body}</p>
                </div>
              ))}
            </div>
          </div>

          <VbacImage
            imageKey="birth-history"
            corner="br"
            aspect="aspect-[4/4.5] sm:aspect-[5/4] lg:aspect-[4/4.8]"
            className="w-full"
          />
        </div>
      </VbacReveal>
    </section>
  );
}

/**
 * Section 04 — VBAC: BENEFITS, RISKS & ALTERNATIVES:
 * Transparent comparison between VBAC and planned repeat caesarean.
 */
export function VbacBenefitsRisks() {
  return (
    <section id="vbac-benefits-risks" aria-labelledby="vbac-benefits-risks-heading" className="relative isolate bg-[var(--vbac-coral-wash)] section-pad">
      <VbacReveal className="container-birthwave">
        <div className="max-w-2xl">
          <p className="eyebrow">{vbacBenefitsRisks.eyebrow}</p>
          <h2 id="vbac-benefits-risks-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
            {vbacBenefitsRisks.heading}
          </h2>
          <p className="mt-4 text-base leading-[var(--leading-relaxed)] text-ink-soft">
            {vbacBenefitsRisks.intro}
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {vbacBenefitsRisks.cards.map((card) => (
            <div
              key={card.title}
              className="flex flex-col justify-between rounded-xs border border-[var(--color-border)] bg-paper p-7"
            >
              <div>
                <span className="font-body text-xs font-semibold tracking-[var(--tracking-wider)] text-terracotta-deep uppercase">
                  {card.tag}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-ink">{card.title}</h3>
                <p className="mt-3 text-sm leading-[var(--leading-relaxed)] text-ink-soft">{card.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 max-w-2xl">
          <p className="border-l-2 border-terracotta pl-4 text-base leading-[var(--leading-relaxed)] text-ink-soft">
            {vbacBenefitsRisks.closing}
          </p>

          <div className="mt-8">
            <Button href={vbacBenefitsRisks.cta.href} variant="primary">
              {vbacBenefitsRisks.cta.label.replace(/\s*↗$/, "")}
            </Button>
          </div>
        </div>
      </VbacReveal>
    </section>
  );
}

// Backwards compatibility alias if referenced anywhere
export const VbacInformed = VbacBenefitsRisks;
