import { pregnancyLandingCareIncludes, pregnancyLandingFirstConsultation } from "@/content/pregnancy-antenatal-landing-content";
import { PregnancyAntenatalImage } from "./pregnancy-antenatal-image";
import { PregnancyReveal } from "./pregnancy-antenatal-reveal";
import { cx } from "@/lib/cx";

/**
 * Section 3 — What Care May Include. Two alternating image-and-text
 * compositions (rose, then soft blue), each pairing one photograph with
 * two of the four confirmed care points — matching the approved
 * reference's own `.bw-care-story` / `.bw-care-story-alt` pair exactly,
 * not a four-times-repeated single layout.
 */
export function PregnancyAntenatalCareIncludes() {
  return (
    <section id="pregnancy-included" aria-labelledby="pregnancy-included-heading" className="relative isolate bg-paper section-pad">
      <PregnancyReveal className="container-birthwave">
        <p className="eyebrow">{pregnancyLandingCareIncludes.eyebrow}</p>

        <div className="mt-4 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <h2 id="pregnancy-included-heading" className="text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
            {pregnancyLandingCareIncludes.heading.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="max-w-[29ch] text-base text-ink-soft">{pregnancyLandingCareIncludes.note}</p>
        </div>

        <div className="mt-10 flex flex-col gap-6">
          {pregnancyLandingCareIncludes.stories.map((story, index) => {
            const imageOnRight = index % 2 === 1;
            return (
              <div
                key={story.tag}
                className={cx(
                  "grid overflow-hidden rounded-xs lg:grid-cols-2 lg:items-stretch",
                  index === 0 ? "bg-[var(--color-paper-dim)]" : "bg-[var(--pregnancy-sky-wash)]",
                )}
              >
                <div className={cx("relative", imageOnRight && "lg:order-2")}>
                  <PregnancyAntenatalImage
                    imageKey={story.imageKey}
                    aspect="aspect-[4/3] lg:aspect-auto lg:h-full"
                    corner={index === 0 ? "tl" : "tr"}
                    className="h-full min-h-[280px] rounded-none"
                  />
                </div>

                <div className={cx("flex flex-col justify-center p-8 sm:p-10", imageOnRight && "lg:order-1")}>
                  <p className="font-body text-[0.6875rem] font-semibold tracking-[var(--tracking-wider)] text-terracotta-deep uppercase">
                    {story.tag}
                  </p>

                  <div className="mt-4 flex flex-col">
                    {story.items.map((item) => (
                      <div key={item.number} className="flex gap-4 border-t border-[var(--color-border)] py-6 first:border-t-0 first:pt-2">
                        <span className="mt-0.5 font-body text-sm text-terracotta-deep">{item.number}</span>
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

        <p className="mt-8 max-w-2xl border-l-2 border-terracotta pl-4 text-sm text-ink-soft">
          {pregnancyLandingCareIncludes.disclaimer}
        </p>
      </PregnancyReveal>
    </section>
  );
}

/**
 * Section 4 — First Consultation. A supporting image beside the intro,
 * three steps kept in normal document flow (never a carousel or
 * scroll-hijacked sequence), and the preparation note.
 */
export function PregnancyAntenatalFirstConsultation() {
  return (
    <section id="pregnancy-first" aria-labelledby="pregnancy-first-heading" className="relative isolate scroll-mt-[var(--header-height)] bg-paper section-pad">
      <PregnancyReveal className="container-birthwave">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <PregnancyAntenatalImage imageKey={pregnancyLandingFirstConsultation.imageKey} corner="bl" aspect="aspect-[4/5]" />

          <div className="max-w-xl">
            <p className="eyebrow">{pregnancyLandingFirstConsultation.eyebrow}</p>
            <h2 id="pregnancy-first-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
              {pregnancyLandingFirstConsultation.heading}
            </h2>
            <p className="mt-5 max-w-[46ch] text-lg leading-[var(--leading-relaxed)] text-ink-soft">{pregnancyLandingFirstConsultation.body}</p>

            <div className="mt-10 grid gap-8 sm:grid-cols-3">
              {pregnancyLandingFirstConsultation.steps.map((step) => (
                <div key={step.number} className="border-t border-[var(--color-border)] pt-5">
                  <span className="font-body text-xs font-semibold tracking-[var(--tracking-wider)] text-terracotta-deep uppercase">
                    {step.number}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold text-ink">{step.title}</h3>
                  <p className="mt-3 text-sm leading-[var(--leading-relaxed)] text-ink-soft">{step.body}</p>
                </div>
              ))}
            </div>

            <p className="mt-8 max-w-2xl border-l-2 border-terracotta pl-4 text-sm text-ink-soft">{pregnancyLandingFirstConsultation.note}</p>
          </div>
        </div>
      </PregnancyReveal>
    </section>
  );
}
