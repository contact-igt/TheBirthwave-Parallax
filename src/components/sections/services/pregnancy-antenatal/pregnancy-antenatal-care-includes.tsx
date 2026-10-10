import { pregnancyLandingCareIncludes, pregnancyLandingFirstConsultation } from "@/content/pregnancy-antenatal-landing-content";
import { PregnancyAntenatalImage } from "./pregnancy-antenatal-image";
import { PregnancyReveal } from "./pregnancy-antenatal-reveal";
import { cx } from "@/lib/cx";

/**
 * Section 3 — What Care May Include.
 *
 * Alternating editorial compositions on warm ivory / soft rose surfaces:
 * - Story 1 (Keeping track): Image Left, Text Right (Consultations & Investigations)
 * - Story 2 (Looking ahead): Text Left, Image Right (Nutrition, Movement & Birth Prep)
 */
export function PregnancyAntenatalCareIncludes() {
  return (
    <section id="pregnancy-included" aria-labelledby="pregnancy-included-heading" className="relative isolate bg-[#FAF6F2] section-pad">
      <PregnancyReveal className="container-birthwave">
        <p className="eyebrow text-terracotta-deep font-semibold">{pregnancyLandingCareIncludes.eyebrow}</p>

        <div className="mt-4 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <h2 id="pregnancy-included-heading" className="text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
            {pregnancyLandingCareIncludes.heading.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="max-w-[32ch] text-base leading-relaxed text-ink-soft">{pregnancyLandingCareIncludes.note}</p>
        </div>

        {/* Alternating Stories Rhythm */}
        <div className="mt-12 flex flex-col gap-8">
          {pregnancyLandingCareIncludes.stories.map((story, index) => {
            const imageOnRight = index % 2 === 1;
            return (
              <div
                key={story.tag}
                className={cx(
                  "grid overflow-hidden rounded-md border border-[color-mix(in_srgb,var(--color-terracotta)_18%,transparent)] shadow-[0_16px_40px_-16px_rgba(53,43,41,0.06)] lg:grid-cols-2 lg:items-stretch",
                  index === 0
                    ? "bg-[#F3E8E2]/65 rounded-tl-[48px] rounded-br-[24px]"
                    : "bg-white/80 rounded-tr-[48px] rounded-bl-[24px]",
                )}
              >
                <div className={cx("relative", imageOnRight && "lg:order-2")}>
                  <PregnancyAntenatalImage
                    imageKey={story.imageKey}
                    aspect="aspect-[4/3] lg:aspect-auto lg:h-full"
                    corner={index === 0 ? "tl" : "tr"}
                    className="h-full min-h-[300px] rounded-none border-0"
                    objectPosition={index === 0 ? "50% 18%" : "50% 16%"}
                  />
                </div>

                <div className={cx("flex flex-col justify-center p-8 sm:p-12", imageOnRight && "lg:order-1")}>
                  <p className="font-body text-[0.7rem] font-semibold tracking-[var(--tracking-wider)] text-terracotta-deep uppercase">
                    {story.tag}
                  </p>

                  <div className="mt-4 flex flex-col">
                    {story.items.map((item) => (
                      <div key={item.number} className="flex gap-4 border-t border-[color-mix(in_srgb,var(--color-ink)_10%,transparent)] py-6 first:border-t-0 first:pt-2">
                        <span className="mt-0.5 font-body text-sm font-semibold text-terracotta-deep">{item.number}</span>
                        <div>
                          <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
                          <p className="mt-2 text-sm leading-[var(--leading-relaxed)] text-ink-soft">{item.body}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-9 max-w-2xl border-l-2 border-terracotta pl-4 text-sm leading-relaxed text-ink-soft">
          {pregnancyLandingCareIncludes.disclaimer}
        </p>
      </PregnancyReveal>
    </section>
  );
}

/**
 * Section 4 — First Consultation: Clear step-by-step guidance in a warm,
 * restful consultation room setting.
 */
export function PregnancyAntenatalFirstConsultation() {
  return (
    <section id="pregnancy-first" aria-labelledby="pregnancy-first-heading" className="relative isolate scroll-mt-[var(--header-height)] bg-[linear-gradient(180deg,#F3E8E2_0%,#FAF6F2_100%)] section-pad">
      <PregnancyReveal className="container-birthwave">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          {/* Calm Consultation Photography */}
          <PregnancyAntenatalImage
            imageKey={pregnancyLandingFirstConsultation.imageKey}
            corner="bl"
            aspect="aspect-[4/5]"
            objectPosition="50% 20%"
            className="border border-[color-mix(in_srgb,var(--color-terracotta)_22%,transparent)] shadow-[0_20px_48px_-14px_rgba(53,43,41,0.1)]"
            drift
          />

          <div className="max-w-xl">
            <p className="eyebrow text-terracotta-deep font-semibold">{pregnancyLandingFirstConsultation.eyebrow}</p>
            <h2 id="pregnancy-first-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
              {pregnancyLandingFirstConsultation.heading}
            </h2>
            <p className="mt-5 max-w-[48ch] text-lg leading-[var(--leading-relaxed)] text-ink-soft">
              {pregnancyLandingFirstConsultation.body}
            </p>

            {/* Three Clear Steps */}
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {pregnancyLandingFirstConsultation.steps.map((step) => (
                <div key={step.number} className="rounded-sm border-t border-terracotta/40 pt-4">
                  <span className="font-body text-xs font-semibold tracking-[var(--tracking-wider)] text-terracotta-deep uppercase">
                    {step.number}
                  </span>
                  <h3 className="mt-2 text-base font-semibold text-ink">{step.title}</h3>
                  <p className="mt-2 text-xs leading-[var(--leading-relaxed)] text-ink-soft">{step.body}</p>
                </div>
              ))}
            </div>

            <p className="mt-8 max-w-2xl border-l-2 border-terracotta pl-4 text-sm leading-relaxed text-ink-soft">
              {pregnancyLandingFirstConsultation.note}
            </p>
          </div>
        </div>
      </PregnancyReveal>
    </section>
  );
}
