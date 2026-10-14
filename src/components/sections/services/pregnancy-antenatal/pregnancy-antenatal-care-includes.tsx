import { Info } from "lucide-react";
import Image from "next/image";
import { pregnancyLandingCareIncludes, pregnancyLandingFirstConsultation } from "@/content/pregnancy-antenatal-landing-content";
import { servicesImagery } from "@/content/services-imagery";
import { PregnancyReveal } from "./pregnancy-antenatal-reveal";

/**
 * Section 3 — What Antenatal Care May Include.
 *
 * Clean structured two-part presentation inspired by reference:
 * - Left: Keeping track of your pregnancy (01-02) & Preparing for childbirth (07-08)
 * - Right: Supporting your wellbeing (03-06)
 * - Numbered items with fine horizontal dividers
 * - Important note reassurance capsule
 */
export function PregnancyAntenatalCareIncludes() {
  const keepingTrack = pregnancyLandingCareIncludes.groups[0];
  const wellbeing = pregnancyLandingCareIncludes.groups[1];
  const childbirth = pregnancyLandingCareIncludes.groups[2];

  return (
    <section
      id="pregnancy-included"
      aria-labelledby="pregnancy-included-heading"
      className="relative isolate bg-[#FAF6F2] section-pad"
    >
      <PregnancyReveal className="container-birthwave">
        {/* Header Block */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--color-terracotta)_28%,transparent)] bg-[color-mix(in_srgb,var(--color-terracotta)_10%,var(--color-paper))] px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-terracotta-deep mb-3.5">
            <span className="size-1.5 rounded-full bg-coral" aria-hidden="true" />
            {pregnancyLandingCareIncludes.eyebrow}
          </div>
          <h2
            id="pregnancy-included-heading"
            className="text-[clamp(2.1rem,1.5rem+2.6vw,3.4rem)] leading-[1.12] font-semibold tracking-[var(--tracking-tight)] text-ink"
          >
            {pregnancyLandingCareIncludes.heading.map((line, idx) => (
              <span key={line} className={idx === 1 ? "block text-terracotta-deep font-normal mt-0.5" : "block"}>
                {line}
              </span>
            ))}
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-ink-soft font-normal">
            {pregnancyLandingCareIncludes.supportingLine}
          </p>
        </div>

        {/* Structured Two-Part Presentation */}
        <div className="mt-12 sm:mt-14 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
          {/* Column 1: Keeping Track & Preparing for Childbirth */}
          <div className="flex flex-col gap-8">
            {/* Keeping Track of Your Pregnancy */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-[color-mix(in_srgb,var(--color-terracotta)_20%,transparent)] shadow-[0_4px_20px_rgba(53,43,41,0.04)] hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[color-mix(in_srgb,var(--color-ink)_10%,transparent)]">
                <span className="size-2.5 rounded-full bg-sky shrink-0" aria-hidden="true" />
                <h3 className="font-body text-xs font-bold tracking-widest text-sky-deep uppercase">
                  {keepingTrack.tag}
                </h3>
              </div>
              <div className="space-y-6 sm:space-y-8">
                {keepingTrack.items.map((item, idx) => (
                  <div key={item.number} className={idx > 0 ? "border-t border-[color-mix(in_srgb,var(--color-ink)_10%,transparent)] pt-6" : ""}>
                    <div className="font-body text-xs font-semibold text-terracotta-deep uppercase tracking-wider mb-1.5">
                      {item.number}
                    </div>
                    <h4 className="text-xl font-semibold text-ink mb-2">{item.title}</h4>
                    <p className="text-sm sm:text-base leading-[var(--leading-relaxed)] text-ink-soft font-normal">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Preparing for Childbirth */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-[color-mix(in_srgb,var(--color-terracotta)_20%,transparent)] shadow-[0_4px_20px_rgba(53,43,41,0.04)] hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[color-mix(in_srgb,var(--color-ink)_10%,transparent)]">
                <span className="size-2.5 rounded-full bg-terracotta shrink-0" aria-hidden="true" />
                <h3 className="font-body text-xs font-bold tracking-widest text-terracotta-deep uppercase">
                  {childbirth.tag}
                </h3>
              </div>
              <div className="space-y-6 sm:space-y-8">
                {childbirth.items.map((item, idx) => (
                  <div key={item.number} className={idx > 0 ? "border-t border-[color-mix(in_srgb,var(--color-ink)_10%,transparent)] pt-6" : ""}>
                    <div className="font-body text-xs font-semibold text-terracotta-deep uppercase tracking-wider mb-1.5">
                      {item.number}
                    </div>
                    <h4 className="text-xl font-semibold text-ink mb-2">{item.title}</h4>
                    <p className="text-sm sm:text-base leading-[var(--leading-relaxed)] text-ink-soft font-normal">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Supporting Your Wellbeing */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-[color-mix(in_srgb,var(--color-terracotta)_20%,transparent)] shadow-[0_4px_20px_rgba(53,43,41,0.04)] hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[color-mix(in_srgb,var(--color-ink)_10%,transparent)]">
                <span className="size-2.5 rounded-full bg-coral shrink-0" aria-hidden="true" />
                <h3 className="font-body text-xs font-bold tracking-widest text-coral uppercase">
                  {wellbeing.tag}
                </h3>
              </div>
              <div className="space-y-6 sm:space-y-7">
                {wellbeing.items.map((item, idx) => (
                  <div key={item.number} className={idx > 0 ? "border-t border-[color-mix(in_srgb,var(--color-ink)_10%,transparent)] pt-5 sm:pt-6" : ""}>
                    <div className="font-body text-xs font-semibold text-terracotta-deep uppercase tracking-wider mb-1.5">
                      {item.number}
                    </div>
                    <h4 className="text-xl font-semibold text-ink mb-2">{item.title}</h4>
                    <p className="text-sm sm:text-base leading-[var(--leading-relaxed)] text-ink-soft font-normal">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Important Note Reassurance Banner */}
        <div className="mt-10 sm:mt-12 bg-white/90 border border-[color-mix(in_srgb,var(--color-terracotta)_26%,transparent)] rounded-2xl p-5 sm:p-6 flex items-start gap-4 shadow-2xs">
          <div
            aria-hidden="true"
            className="size-7 rounded-full bg-coral/15 text-coral flex items-center justify-center shrink-0 mt-0.5"
          >
            <Info className="size-4" strokeWidth={2.2} />
          </div>
          <div>
            <h4 className="font-body text-xs font-bold uppercase tracking-wider text-terracotta-deep mb-1">
              Important Note
            </h4>
            <p className="text-sm sm:text-base leading-relaxed text-ink-soft font-normal">
              {pregnancyLandingCareIncludes.importantNote}
            </p>
          </div>
        </div>
      </PregnancyReveal>
    </section>
  );
}

/**
 * Section 4 — Your First Pregnancy Consultation.
 *
 * Clean Image + Steps composition:
 * - Left: Editorial consultation photography & narrative
 * - Right: Refined 3-step process (Listen, Review, Plan)
 * - Preparation reminder note at bottom
 */
export function PregnancyAntenatalFirstConsultation() {
  const clinicImage = servicesImagery["pregnancy-antenatal-first-consultation"];

  const stepMeta = [
    { badgeColor: "bg-[#E5F3FA] text-[#4A8EB5] border-[#5DAEDB]/30", tagColor: "text-sky-deep" },
    { badgeColor: "bg-[#F5DDD6] text-terracotta-deep border-terracotta/40", tagColor: "text-terracotta-deep" },
    { badgeColor: "bg-[#FEEDEA] text-coral border-coral/40", tagColor: "text-coral" },
  ];

  return (
    <section
      id="pregnancy-first"
      aria-labelledby="pregnancy-first-heading"
      className="relative isolate scroll-mt-[var(--header-height)] bg-[linear-gradient(180deg,#F3E8E2_0%,#FAF6F2_100%)] section-pad"
    >
      <PregnancyReveal className="container-birthwave">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-14 xl:gap-16">
          {/* Left Narrative with Clinic Consultation Image */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--color-terracotta)_28%,transparent)] bg-white/80 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-terracotta-deep mb-3.5 shadow-2xs">
                <span className="size-1.5 rounded-full bg-coral" aria-hidden="true" />
                {pregnancyLandingFirstConsultation.eyebrow}
              </div>
              <h2
                id="pregnancy-first-heading"
                className="text-[clamp(2.1rem,1.5rem+2.6vw,3.4rem)] leading-[1.12] font-semibold tracking-[var(--tracking-tight)] text-ink"
              >
                {pregnancyLandingFirstConsultation.heading}
              </h2>
              <p className="mt-4 text-base sm:text-lg leading-[var(--leading-relaxed)] text-ink-soft font-normal mb-8">
                {pregnancyLandingFirstConsultation.body}
              </p>
            </div>

            {/* Clinic Consultation Image */}
            <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden rounded-3xl border-2 border-white/90 shadow-[0_16px_36px_-10px_rgba(53,43,41,0.12)]">
              <Image
                src={clinicImage.src}
                alt={clinicImage.alt}
                fill
                sizes="(max-width: 1023px) 90vw, 460px"
                className="object-cover"
                style={{ objectPosition: clinicImage.objectPosition }}
              />
            </div>
          </div>

          {/* Right 3-Step Process List */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            {pregnancyLandingFirstConsultation.steps.map((step, idx) => (
              <div
                key={step.tag}
                className="p-6 sm:p-7 rounded-3xl bg-white border border-[color-mix(in_srgb,var(--color-terracotta)_20%,transparent)] shadow-[0_4px_16px_rgba(53,43,41,0.03)] hover:shadow-md hover:border-sky/40 transition-all duration-300 flex flex-col sm:flex-row gap-5 items-start"
              >
                <div
                  className={`size-12 rounded-2xl flex items-center justify-center font-body text-sm font-bold shrink-0 border ${stepMeta[idx]?.badgeColor ?? "bg-[#FAF6F2] text-ink"}`}
                >
                  {String(idx + 1).padStart(2, "0")}
                </div>
                <div>
                  <span
                    className={`font-body text-xs font-bold uppercase tracking-widest block mb-1.5 ${stepMeta[idx]?.tagColor ?? "text-terracotta-deep"}`}
                  >
                    {step.tag}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-semibold text-ink mb-2">{step.title}</h3>
                  <p className="text-sm sm:text-base leading-[var(--leading-relaxed)] text-ink-soft font-normal">
                    {step.body}
                  </p>
                </div>
              </div>
            ))}

            {/* Preparation Reminder Note */}
            <div className="bg-[#FAF6F2] border-l-4 border-terracotta p-4 sm:p-5 rounded-r-2xl text-sm leading-relaxed text-ink-soft">
              <strong className="font-semibold text-ink">Helpful reminder: </strong>
              {pregnancyLandingFirstConsultation.beforeAppointmentNote}
            </div>
          </div>
        </div>
      </PregnancyReveal>
    </section>
  );
}
