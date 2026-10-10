import { pregnancyLandingIntro } from "@/content/pregnancy-antenatal-landing-content";
import { PregnancyAntenatalImage } from "./pregnancy-antenatal-image";
import { PregnancyReveal } from "./pregnancy-antenatal-reveal";

/**
 * Section 2 — Pregnancy Journey Introduction.
 *
 * Warm ivory to soft rose surface with an alternating composition:
 * - Left: Calm consultation photograph with soft curved panel frame and gentle drift.
 * - Right: Thoughtful introductory copy and a delicate, connected vertical journey
 *   pathway showing the three progressive stages of care (early confirmation,
 *   trimester check-ins, birth preparation).
 */
export function PregnancyAntenatalIntro() {
  return (
    <section
      id="pregnancy-understand"
      aria-labelledby="pregnancy-understand-heading"
      className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#FAF6F2_0%,#F3E8E2_100%)] section-pad"
    >
      {/* Delicate botanical/soft light ambience */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-12 left-1/4 -z-10 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(202,149,133,0.1)_0%,transparent_70%)] blur-2xl"
      />

      <PregnancyReveal className="container-birthwave">
        {/* Section Top Header */}
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <p className="eyebrow text-terracotta-deep font-semibold">{pregnancyLandingIntro.eyebrow}</p>
          <div className="text-left font-body text-sm leading-relaxed text-ink-soft sm:text-right">
            {pregnancyLandingIntro.note.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </div>
        </div>

        {/* Editorial Journey Grid: Image Left / Text Right */}
        <div className="mt-12 grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16">
          {/* Visual Moment: Consultation in calm clinic room */}
          <div className="order-2 lg:order-1">
            <PregnancyAntenatalImage
              imageKey="pregnancy-antenatal-checkins-scans"
              corner="tl"
              aspect="aspect-[4/5] sm:aspect-[4/4.8]"
              objectPosition="50% 18%"
              className="shadow-[0_20px_48px_-14px_rgba(53,43,41,0.1)] border border-[color-mix(in_srgb,var(--color-terracotta)_20%,transparent)]"
              drift
            />
          </div>

          {/* Journey Narrative & Trimester Flow */}
          <div className="order-1 max-w-xl lg:order-2">
            <h2
              id="pregnancy-understand-heading"
              className="text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink"
            >
              {pregnancyLandingIntro.heading.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>

            {pregnancyLandingIntro.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-5 max-w-[52ch] text-base leading-[var(--leading-relaxed)] text-ink-soft">
                {paragraph}
              </p>
            ))}

            {/* Subtle Connected Journey Pathway */}
            <div className="relative mt-8 space-y-4 pl-6 before:absolute before:top-2 before:bottom-2 before:left-2 before:w-[1.5px] before:bg-[color-mix(in_srgb,var(--color-terracotta)_35%,transparent)]">
              {pregnancyLandingIntro.points.map((point) => (
                <div key={point.number} className="relative flex items-baseline gap-3.5">
                  {/* Subtle marker node */}
                  <span
                    aria-hidden="true"
                    className="absolute -left-6 top-1.5 size-2 rounded-full border border-terracotta bg-paper"
                  />
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
