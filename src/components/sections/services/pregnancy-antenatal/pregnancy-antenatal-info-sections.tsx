import Image from "next/image";
import { Plus, UserRound } from "lucide-react";
import {
  pregnancyLandingClinician,
  pregnancyLandingApproach,
  pregnancyLandingFaq,
  pregnancyLandingVisit,
} from "@/content/pregnancy-antenatal-landing-content";
import { servicesImagery } from "@/content/services-imagery";
import { PregnancyAntenatalImage } from "./pregnancy-antenatal-image";
import { PregnancyReveal } from "./pregnancy-antenatal-reveal";

/**
 * Section 5 — The Person Behind Your Care.
 *
 * Warm, transparent placeholder for confirmed clinician profile,
 * maintaining strict truth-in-advertising guidelines.
 */
export function PregnancyAntenatalClinician() {
  return (
    <section
      id="pregnancy-clinician"
      aria-labelledby="pregnancy-clinician-heading"
      className="relative isolate bg-[#FAF6F2] section-pad"
    >
      <PregnancyReveal className="container-birthwave grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
        <div
          role="img"
          aria-label="Actual clinician portrait — approved photography pending"
          className="flex aspect-[4/5] w-full flex-col items-center justify-center gap-5 rounded-tl-[64px] rounded-br-[32px] rounded-tr-xs rounded-bl-xs border border-[color-mix(in_srgb,var(--color-terracotta)_25%,transparent)] bg-[linear-gradient(135deg,#F3E8E2,#CA9585)] px-8 text-center text-ink-soft shadow-[0_20px_48px_-16px_rgba(53,43,41,0.08)]"
        >
          <div className="flex size-20 items-center justify-center rounded-full bg-white/40 shadow-inner">
            <UserRound aria-hidden="true" className="size-10 stroke-[1.25] text-ink" />
          </div>
          <span className="max-w-[240px] text-sm leading-relaxed whitespace-pre-line text-ink">
            {pregnancyLandingClinician.portraitNote}
          </span>
        </div>

        <div className="max-w-xl">
          <p className="eyebrow text-terracotta-deep font-semibold">{pregnancyLandingClinician.eyebrow}</p>
          <h2 id="pregnancy-clinician-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
            {pregnancyLandingClinician.heading.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <h3 className="mt-6 text-xl font-semibold text-ink">{pregnancyLandingClinician.namePlaceholder}</h3>
          <p className="mt-2 text-sm text-ink-soft">{pregnancyLandingClinician.credentialsPlaceholder}</p>
          <p className="mt-5 text-base leading-[var(--leading-relaxed)] text-ink-soft">{pregnancyLandingClinician.bioPlaceholder}</p>
          <p className="mt-8 border-t border-[color-mix(in_srgb,var(--color-ink)_12%,transparent)] pt-4 text-xs text-ink-soft">{pregnancyLandingClinician.footnote}</p>
        </div>
      </PregnancyReveal>
    </section>
  );
}

/**
 * Section 6 — The BirthWave Approach.
 *
 * Warm soft-rose wash pairing three core values with care-team imagery.
 */
export function PregnancyAntenatalApproach() {
  return (
    <section
      id="pregnancy-approach"
      aria-labelledby="pregnancy-approach-heading"
      className="relative isolate bg-[#F3E8E2] section-pad"
    >
      <PregnancyReveal className="container-birthwave grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
        <div className="max-w-xl">
          <p className="eyebrow text-terracotta-deep font-semibold">{pregnancyLandingApproach.eyebrow}</p>
          <h2 id="pregnancy-approach-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
            {pregnancyLandingApproach.heading}
          </h2>

          <div className="mt-8 flex flex-col">
            {pregnancyLandingApproach.values.map((value) => (
              <div key={value.title} className="border-t border-[color-mix(in_srgb,var(--color-ink)_12%,transparent)] py-6 first:border-t-0 first:pt-2">
                <h3 className="text-lg font-semibold text-ink">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{value.body}</p>
              </div>
            ))}
          </div>
        </div>

        <PregnancyAntenatalImage
          imageKey={pregnancyLandingApproach.imageKey}
          corner="br"
          aspect="aspect-[4/4.5] sm:aspect-[5/4] lg:aspect-[4/4.5]"
          objectPosition="50% 20%"
          className="border border-[color-mix(in_srgb,var(--color-terracotta)_20%,transparent)] shadow-[0_20px_48px_-16px_rgba(53,43,41,0.1)]"
          drift
        />
      </PregnancyReveal>
    </section>
  );
}

/**
 * Section 7 — FAQ: Premium editorial 2-column layout.
 *
 * Left: Sticky header, reassurance summary and warm supporting maternity image.
 * Right: Clean accordion list with subtle plus/minus icons, delicate dividers,
 * and soft active highlight.
 */
export function PregnancyAntenatalFaq() {
  const faqImage = servicesImagery["pregnancy-antenatal-faq-visual"];

  return (
    <section id="pregnancy-faq" aria-labelledby="pregnancy-faq-heading" className="relative isolate bg-[#FAF6F2] section-pad">
      <PregnancyReveal className="container-birthwave">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
          {/* Left Column: Heading & Maternity Visual */}
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow text-terracotta-deep font-semibold">{pregnancyLandingFaq.eyebrow}</p>
            <h2 id="pregnancy-faq-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.2rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
              {pregnancyLandingFaq.heading}
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-ink-soft">
              Clear guidance on starting care, appointment rhythms, scans, and birth options. Your clinician will gladly discuss every question in detail during your visit.
            </p>

            {/* Supporting Editorial Image Card */}
            <div className="mt-8 hidden overflow-hidden rounded-t-[48px] rounded-br-[24px] rounded-bl-[12px] border border-[color-mix(in_srgb,var(--color-terracotta)_20%,transparent)] bg-paper-dim shadow-[0_16px_40px_-16px_rgba(53,43,41,0.08)] lg:block">
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={faqImage.src}
                  alt={faqImage.alt}
                  fill
                  sizes="480px"
                  className="object-cover"
                  style={{ objectPosition: faqImage.objectPosition }}
                />
              </div>
              <div className="px-4 py-3 font-body text-[0.6875rem] text-ink-soft">
                Continuous reassurance throughout your pregnancy journey
              </div>
            </div>
          </div>

          {/* Right Column: Accordion List */}
          <div className="border-t border-[color-mix(in_srgb,var(--color-ink)_12%,transparent)]">
            {pregnancyLandingFaq.items.map((item) => (
              <details
                key={item.question}
                className="group border-b border-[color-mix(in_srgb,var(--color-ink)_12%,transparent)] py-5 transition-colors duration-200 group-open:bg-[#F3E8E2]/35"
              >
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 px-3 font-body text-base font-semibold text-balance text-ink transition-colors group-hover:text-terracotta-deep sm:text-lg [&::-webkit-details-marker]:hidden">
                  <span>{item.question}</span>
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white/70 border border-terracotta/30 text-terracotta-deep transition-transform duration-[var(--duration-fast)] group-open:rotate-45">
                    <Plus aria-hidden="true" className="size-4" />
                  </span>
                </summary>
                <div className="mt-3 px-3">
                  <p className="max-w-2xl text-sm leading-[var(--leading-relaxed)] text-ink-soft sm:text-base">
                    {item.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </PregnancyReveal>
    </section>
  );
}

/**
 * Section 8 — Visit Information.
 *
 * Clean, minimal 2x2 grid with warm paper surface and subtle border accents.
 */
export function PregnancyAntenatalVisit() {
  return (
    <section
      id="pregnancy-visit"
      aria-labelledby="pregnancy-visit-heading"
      className="relative isolate bg-[#F3E8E2]/50 section-pad"
    >
      <PregnancyReveal className="container-birthwave">
        <p className="eyebrow text-terracotta-deep font-semibold">{pregnancyLandingVisit.eyebrow}</p>
        <h2 id="pregnancy-visit-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
          {pregnancyLandingVisit.heading}
        </h2>
        <p className="mt-4 max-w-md text-base text-ink-soft">{pregnancyLandingVisit.note}</p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pregnancyLandingVisit.info.map((item) => (
            <div
              key={item.label}
              className="rounded-md border border-[color-mix(in_srgb,var(--color-terracotta)_16%,transparent)] bg-[#FAF6F2] p-6 shadow-xs"
            >
              <strong className="block font-body text-sm font-semibold text-terracotta-deep">{item.label}</strong>
              <div className="mt-3 text-sm leading-relaxed text-ink-soft">
                {item.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </PregnancyReveal>
    </section>
  );
}
