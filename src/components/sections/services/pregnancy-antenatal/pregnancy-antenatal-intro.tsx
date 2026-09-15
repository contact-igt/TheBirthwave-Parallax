import { pregnancyLandingIntro } from "@/content/pregnancy-antenatal-landing-content";
import { PregnancyAntenatalImage } from "./pregnancy-antenatal-image";
import { PregnancyReveal } from "./pregnancy-antenatal-reveal";

/**
 * Section 2 — the substantial introduction. A full section, not a narrow
 * information strip: generous `section-pad`, a large consultation image
 * opposite the text, and a gentle sage→blue wash behind the whole
 * section (`--pregnancy-sage`, defined once on the page wrapper — see
 * `pregnancy-antenatal-landing-page.tsx`'s own comment on why one new,
 * page-scoped colour was necessary here: BirthWave's three confirmed
 * brand hues are dusty rose/blue/coral, none of them sage, and the
 * approved reference's own second-section wash is explicitly sage-toned).
 */
export function PregnancyAntenatalIntro() {
  return (
    <section id="pregnancy-understand" aria-labelledby="pregnancy-understand-heading" className="relative isolate bg-[var(--pregnancy-sage-wash)] section-pad">
      <PregnancyReveal className="container-birthwave">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row">
          <p className="eyebrow">{pregnancyLandingIntro.eyebrow}</p>
          <p className="text-right font-body text-sm leading-relaxed text-ink-soft sm:text-right">
            {pregnancyLandingIntro.note.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
        </div>

        <div className="mt-10 grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16">
          <PregnancyAntenatalImage
            imageKey="pregnancy-antenatal-checkins-scans"
            corner="tl"
            aspect="aspect-[4/5] sm:aspect-[4/4.9]"
            className="order-2 lg:order-1"
            drift
          />

          <div className="order-1 max-w-xl lg:order-2">
            <h2 id="pregnancy-understand-heading" className="text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
              {pregnancyLandingIntro.heading.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>

            {pregnancyLandingIntro.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-4 max-w-[52ch] text-base leading-[var(--leading-relaxed)] text-ink-soft">
                {paragraph}
              </p>
            ))}

            <div className="mt-8 flex flex-col">
              {pregnancyLandingIntro.points.map((point) => (
                <div key={point.number} className="flex items-center gap-4 border-t border-[var(--color-border)] py-3">
                  <span className="font-body text-xs font-semibold text-terracotta-deep">{point.number}</span>
                  <p className="font-body text-sm font-medium text-ink">{point.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PregnancyReveal>
    </section>
  );
}
