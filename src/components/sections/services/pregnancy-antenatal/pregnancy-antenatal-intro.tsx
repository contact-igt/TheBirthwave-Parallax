import { pregnancyLandingIntro } from "@/content/pregnancy-antenatal-landing-content";
import { PregnancyReveal } from "./pregnancy-antenatal-reveal";

/**
 * Section 2 — More Than a Check-In.
 *
 * Warm editorial healthcare composition:
 * - Generous whitespace and serene warm ivory/white surface
 * - Header with display typography and side editorial accent quote
 * - Two-column narrative lead paragraphs
 * - 3 refined editorial principles with distinct accent markers (cerulean, coral, terracotta)
 */
export function PregnancyAntenatalIntro() {
  const accentTags = ["01 — PERSPECTIVE", "02 — DIALOGUE", "03 — READINESS"];
  const accentDots = ["bg-sky", "bg-coral", "bg-terracotta"];

  return (
    <section
      id="pregnancy-understand"
      aria-labelledby="pregnancy-understand-heading"
      className="relative isolate overflow-hidden bg-white border-y border-[color-mix(in_srgb,var(--color-terracotta)_18%,transparent)] section-pad"
    >
      {/* Ambient subtle glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-12 left-1/3 -z-10 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(202,149,133,0.12)_0%,transparent_70%)] blur-3xl"
      />

      <PregnancyReveal className="container-birthwave">
        {/* Section Header: Heading + Editorial Side Quote */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[color-mix(in_srgb,var(--color-terracotta)_14%,transparent)]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--color-terracotta)_28%,transparent)] bg-[color-mix(in_srgb,var(--color-terracotta)_10%,var(--color-paper))] px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-terracotta-deep mb-3.5">
              <span className="size-1.5 rounded-full bg-coral" aria-hidden="true" />
              {pregnancyLandingIntro.eyebrow}
            </div>
            <h2
              id="pregnancy-understand-heading"
              className="text-[clamp(2.1rem,1.5rem+2.6vw,3.4rem)] leading-[1.12] font-semibold tracking-[var(--tracking-tight)] text-ink"
            >
              {pregnancyLandingIntro.heading.map((line, idx) => (
                <span key={line} className={idx === 1 ? "block text-terracotta-deep font-normal mt-0.5" : "block"}>
                  {line}
                </span>
              ))}
            </h2>
          </div>
          <p className="font-serif italic text-ink-soft max-w-xs border-l-2 border-coral/60 pl-4 py-1.5 text-sm sm:text-base leading-snug">
            Your pregnancy. Your questions. Your next step.
          </p>
        </div>

        {/* Narrative Lead Text: 2-Column Editorial Grid */}
        <div className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 mb-12 sm:mb-16">
          {pregnancyLandingIntro.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-base sm:text-lg leading-[var(--leading-relaxed)] text-ink-soft font-normal">
              {paragraph}
            </p>
          ))}
        </div>

        {/* 3 Refined Editorial Focus Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {pregnancyLandingIntro.points.map((point, idx) => (
            <div
              key={point.number}
              className="group p-7 sm:p-8 rounded-3xl bg-[#FAF6F2] border border-[color-mix(in_srgb,var(--color-terracotta)_22%,transparent)] shadow-[0_4px_16px_rgba(53,43,41,0.03)] hover:shadow-[0_12px_28px_-6px_rgba(53,43,41,0.08)] transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-body text-xs font-semibold tracking-widest text-terracotta-deep uppercase">
                  {accentTags[idx] ?? point.number}
                </span>
                <span
                  className={`size-2 rounded-full ${accentDots[idx] ?? "bg-terracotta"} opacity-85 group-hover:scale-125 transition-transform`}
                  aria-hidden="true"
                />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-ink mb-2.5">{point.title}</h3>
              <p className="text-sm sm:text-[0.9375rem] leading-[var(--leading-relaxed)] text-ink-soft font-normal">
                {point.body}
              </p>
            </div>
          ))}
        </div>
      </PregnancyReveal>
    </section>
  );
}
