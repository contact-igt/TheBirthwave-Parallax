import { birthPrepIntro } from "@/content/birth-preparation-landing-content";
import { BirthPrepImage } from "./birth-preparation-image";
import { BirthPrepReveal } from "./birth-preparation-reveal";

const LEARNING_IMAGES = [
  "birth-prep-landing-learning-labour",
  "birth-prep-landing-learning-movement",
  "birth-prep-landing-learning-support",
  "birth-prep-landing-preferences",
] as const;

/** Section 2 — learning outcomes illustrated with real workshop photography. */
export function BirthPrepIntro() {
  return (
    <section id="birth-prep-understand" aria-labelledby="birth-prep-understand-heading" className="relative isolate overflow-hidden bg-paper section-pad">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[url('/images/services/birth-prep-starting-point-background-v1.png')] bg-cover bg-center" />

      <BirthPrepReveal className="relative z-10 container-birthwave">
        <header className="mx-auto max-w-[96rem] text-center">
          <p className="eyebrow mx-auto w-fit text-center">{birthPrepIntro.eyebrow}</p>
          <h2 id="birth-prep-understand-heading" className="mx-auto mt-4 text-[clamp(2.35rem,1.7rem+2vw,3.6rem)] leading-[1.04] font-semibold tracking-[var(--tracking-tight)] text-ink">
            {birthPrepIntro.heading}
          </h2>
          <div className="mx-auto mt-5 max-w-5xl space-y-2 text-base leading-[var(--leading-relaxed)] text-ink-soft sm:text-lg">
            {birthPrepIntro.paragraphs.map((paragraph) => <p key={paragraph} className="mx-auto text-center">{paragraph}</p>)}
          </div>
        </header>

        <ol className="relative mx-auto mt-12 grid max-w-[96rem] gap-10 xl:grid-cols-3 xl:gap-10">
          {birthPrepIntro.points.map((point, index) => (
            <li key={point.title} className={`relative grid grid-cols-1 items-start gap-6 sm:grid-cols-[13rem_minmax(0,1fr)] sm:gap-5 xl:grid-cols-[minmax(10rem,12.5rem)_minmax(0,1fr)] xl:gap-6${index === birthPrepIntro.points.length - 1 && birthPrepIntro.points.length % 3 === 1 ? " xl:col-start-2" : ""}`}>
              <BirthPrepImage
                imageKey={LEARNING_IMAGES[index]}
                corner="tl"
                aspect="aspect-[4/5]"
                className="mx-auto w-full max-w-[14rem] sm:mx-0 sm:max-w-none !rounded-[48%] border-[0.85rem] border-[color-mix(in_srgb,var(--color-terracotta)_10%,var(--color-paper))] shadow-none"
              />
              <div className="pt-0 sm:pt-3">
                <div className="flex items-center gap-4 xl:min-w-[13rem]">
                  <span className="flex size-16 shrink-0 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--color-terracotta)_13%,var(--color-paper))] font-display text-xl font-semibold text-terracotta-deep">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-5 text-[clamp(1.35rem,1rem+0.75vw,1.9rem)] leading-tight font-semibold tracking-[var(--tracking-tight)] text-ink">{point.title}</h3>
                <p className="mt-3 text-base leading-[var(--leading-relaxed)] text-ink-soft">{point.body}</p>
              </div>
              {index < birthPrepIntro.points.length - 1 && (
                <span aria-hidden="true" className="absolute top-10 -right-7 z-20 hidden h-px w-[150px] bg-[color-mix(in_srgb,var(--color-terracotta)_55%,transparent)] xl:block">
                  <span className="absolute -top-5 right-0 flex size-10 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--color-terracotta)_40%,transparent)] bg-paper text-terracotta-deep">
                    <svg viewBox="0 0 16 16" className="size-5 fill-none stroke-current" strokeWidth="1.5">
                      <path d="m6 3 5 5-5 5" />
                    </svg>
                  </span>
                </span>
              )}
            </li>
          ))}
        </ol>

      </BirthPrepReveal>
    </section>
  );
}
