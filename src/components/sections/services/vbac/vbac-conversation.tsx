import { vbacConsultationCover, vbacBenefitsRisks } from "@/content/pages/vbac";
import { VbacReveal } from "./vbac-reveal";
import { Button } from "@/components/ui/button";

/**
 * Section 03 — WHAT A VBAC CONSULTATION MAY COVER / EVALUATION CRITERIA:
 * Refined 3-column flat editorial panels with subtle separators and light appearance.
 */
export function VbacConversation() {
  return (
    <section id="vbac-conversation" aria-labelledby="vbac-conversation-heading" className="relative isolate overflow-hidden scroll-mt-[var(--header-height)] bg-paper-dim/60 section-pad border-t border-[var(--color-border)]">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[url('/images/natural-birth/natural-birth-preferences-background-v1.png')] bg-cover bg-center" />
      <VbacReveal className="container-birthwave">
        <div className="max-w-2xl">
          <p className="eyebrow">{vbacConsultationCover.eyebrow}</p>
          <h2 id="vbac-conversation-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
            {vbacConsultationCover.heading}
          </h2>
        </div>

        {/* 3-column flat editorial panels */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {vbacConsultationCover.topics.map((topic, idx) => (
            <div
              key={topic.title}
              className="flex flex-col justify-between rounded-sm border border-[var(--color-border)] bg-paper p-6 sm:p-7 shadow-2xs transition-colors hover:border-terracotta/40"
            >
              <div>
                <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-3">
                  <span className="font-body text-xs font-semibold tracking-wider text-terracotta-deep uppercase">
                    Topic 0{idx + 1}
                  </span>
                  <span className="size-1.5 rounded-full bg-terracotta/60" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-ink sm:text-xl">{topic.title}</h3>
                <p className="mt-2.5 text-sm leading-[var(--leading-relaxed)] text-ink-soft">{topic.body}</p>
              </div>

              <div className="mt-6 pt-3 text-xs font-medium tracking-wide text-terracotta-deep uppercase">
                Clinical Focus →
              </div>
            </div>
          ))}
        </div>
      </VbacReveal>
    </section>
  );
}

/**
 * Section 04 — VBAC: BENEFITS, RISKS & ALTERNATIVES:
 * Structured 3-column comparison layout with aligned headings and visual emphasis on middle clinical-safeguards column.
 */
export function VbacBenefitsRisks() {
  return (
    <section id="vbac-benefits-risks" aria-labelledby="vbac-benefits-risks-heading" className="relative isolate overflow-hidden bg-[var(--vbac-coral-wash)] section-pad border-t border-[var(--color-border)]">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[url('/images/natural-birth/natural-birth-support-background-v1.png')] bg-cover bg-center" />
      <VbacReveal className="container-birthwave">
        <div className="max-w-2xl">
          <p className="eyebrow">{vbacBenefitsRisks.eyebrow}</p>
          <h2 id="vbac-benefits-risks-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
            {vbacBenefitsRisks.heading}
          </h2>
          <p className="mt-4 text-base leading-[var(--leading-relaxed)] text-ink-soft sm:text-lg">
            {vbacBenefitsRisks.intro}
          </p>
        </div>

        {/* 3-column comparison matrix */}
        <div className="mt-10 grid gap-6 lg:grid-cols-3 lg:gap-8 items-stretch">
          {vbacBenefitsRisks.cards.map((card, idx) => {
            const isMiddle = idx === 1; // "Risks to understand" clinical safeguards column
            return (
              <div
                key={card.title}
                className={`flex flex-col justify-between rounded-sm bg-paper p-7 sm:p-8 transition-shadow ${
                  isMiddle
                    ? "border-2 border-terracotta/60 shadow-md relative"
                    : "border border-[var(--color-border)] shadow-2xs"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border)]">
                    <span
                      className={`font-body text-xs font-semibold tracking-[var(--tracking-wider)] uppercase ${
                        isMiddle
                          ? "rounded-xs bg-[var(--vbac-coral-wash)] px-2.5 py-1 text-terracotta-deep"
                          : "text-terracotta-deep"
                      }`}
                    >
                      {card.tag}
                    </span>
                    {isMiddle && (
                      <span className="text-[0.6875rem] font-semibold tracking-wider text-terracotta uppercase">
                        Safeguards
                      </span>
                    )}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-ink sm:text-xl">{card.title}</h3>
                  <p className="mt-3 text-sm leading-[var(--leading-relaxed)] text-ink-soft">{card.body}</p>
                </div>

                <div className="mt-8 pt-4 border-t border-[var(--color-border)]">
                  <span className="text-xs font-medium text-ink-soft">
                    {idx === 0
                      ? "Physiological recovery & birth pathway"
                      : idx === 1
                      ? "Tertiary hospital & continuous monitoring"
                      : "Surgical planning & family clarity"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 max-w-2xl">
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
