import { vaginismusSupportWork } from "@/content/pages/vaginismus";
import { VaginismusReveal } from "./vaginismus-reveal";
import styles from "./vaginismus-page.module.css";
import { Button } from "@/components/ui/button";

/**
 * Section 5 — How Support May Work / Individualised, Multidisciplinary Care.
 * Detailed 7-pillar multidisciplinary care framework with gynaecology,
 * pelvic floor therapy, psychological care, psychosexual support, yoga,
 * couple counselling, and individualised progression.
 *
 * Layout redesign: pillars in an editorial two-column masonry-style grid
 * on desktop rather than a single-column divider list — each pillar is a
 * self-contained panel with number accent, so the section reads as a
 * coordinated framework rather than a long linear catalogue.
 */
export function VaginismusSupportWork() {
  return (
    <section
      id="vaginismus-support-work"
      aria-labelledby="vaginismus-support-work-heading"
      className="relative isolate bg-[var(--vaginismus-sky-wash)] section-pad"
    >
      <VaginismusReveal className="container-birthwave">
        {/* Section header — full-width, generous baseline */}
        <div className="max-w-3xl">
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
        </div>

        {/* 7 Pillars — editorial two-column grid on desktop */}
        <div className={styles.pillarGrid}>
          {vaginismusSupportWork.pillars.map((pillar, idx) => (
            <div
              key={pillar.number}
              className={`${styles.pillar} ${
                /* Last odd pillar spans full width so layout is balanced */
                idx === vaginismusSupportWork.pillars.length - 1 &&
                vaginismusSupportWork.pillars.length % 2 !== 0
                  ? "sm:col-span-2 sm:grid sm:grid-cols-[auto_1fr] sm:gap-x-10"
                  : ""
              }`}
            >
              <div className="relative">
                <span className="font-body text-[0.6875rem] font-semibold tracking-[var(--tracking-wider)] text-terracotta-deep uppercase">
                  {pillar.number}
                </span>

                <h3 className="mt-2 text-xl font-semibold text-ink sm:text-2xl">
                  {pillar.title}
                </h3>

                {pillar.subhead ? (
                  <p className="mt-1.5 text-sm font-medium text-ink-soft italic">
                    {pillar.subhead}
                  </p>
                ) : null}

                <div className="mt-4 space-y-3 text-base leading-[var(--leading-relaxed)] text-ink-soft">
                  {pillar.paragraphs.map((para, pIdx) => (
                    <p key={pIdx}>{para}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        {vaginismusSupportWork.cta ? (
          <div className="mt-12">
            <Button href={vaginismusSupportWork.cta.href} variant="primary">
              {vaginismusSupportWork.cta.label}
            </Button>
          </div>
        ) : null}
      </VaginismusReveal>
    </section>
  );
}
