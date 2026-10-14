import { vaginismusSupportWork } from "@/content/vaginismus-landing-content";
import { VaginismusReveal } from "./vaginismus-reveal";
import { Button } from "@/components/ui/button";

/**
 * Section 5 — How Support May Work / Individualised, Multidisciplinary Care.
 * Detailed 7-pillar multidisciplinary care framework with gynaecology,
 * pelvic floor therapy, psychological care, psychosexual support, yoga,
 * couple counselling, and individualised progression.
 */
export function VaginismusSupportWork() {
  return (
    <section
      id="vaginismus-support-work"
      aria-labelledby="vaginismus-support-work-heading"
      className="relative isolate bg-[var(--vaginismus-sky-wash)] section-pad"
    >
      <VaginismusReveal className="container-birthwave max-w-4xl">
        <p className="eyebrow">{vaginismusSupportWork.eyebrow}</p>
        <h2
          id="vaginismus-support-work-heading"
          className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink"
        >
          {vaginismusSupportWork.heading}
        </h2>

        {/* Intro */}
        <div className="mt-6 space-y-3 text-base leading-[var(--leading-relaxed)] text-ink-soft">
          {vaginismusSupportWork.intro.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>

        {/* 7 Pillars */}
        <div className="mt-12 flex flex-col divide-y divide-[var(--color-border)]">
          {vaginismusSupportWork.pillars.map((pillar) => (
            <div key={pillar.number} className="py-8 first:pt-0">
              <div className="flex items-baseline gap-3">
                <span className="font-body text-xs font-semibold tracking-[var(--tracking-wider)] text-terracotta-deep uppercase">
                  {pillar.number}
                </span>
                <h3 className="text-xl font-semibold text-ink sm:text-2xl">
                  {pillar.title}
                </h3>
              </div>

              {pillar.subhead ? (
                <p className="mt-2 text-sm font-medium text-ink-soft italic">
                  {pillar.subhead}
                </p>
              ) : null}

              <div className="mt-4 space-y-3 text-sm leading-[var(--leading-relaxed)] text-ink-soft">
                {pillar.paragraphs.map((para, pIdx) => (
                  <p key={pIdx}>{para}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        {vaginismusSupportWork.cta ? (
          <div className="mt-10 border-t border-[var(--color-border)] pt-8">
            <Button href={vaginismusSupportWork.cta.href} variant="primary">
              {vaginismusSupportWork.cta.label}
            </Button>
          </div>
        ) : null}
      </VaginismusReveal>
    </section>
  );
}
