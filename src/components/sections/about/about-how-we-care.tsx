import { aboutHowWeCare } from "@/content/about-content";
import { AboutPreviewImage } from "./about-preview-image";

/** A compact editorial composition: one consultation scene supports all four
 * care principles. Both columns stay in normal document flow. */
export function AboutHowWeCare() {
  return (
    <section
      id="about-how-we-care"
      aria-labelledby="about-how-we-care-heading"
      data-about-scene="how-we-care"
      className="relative isolate section-pad"
      style={{ backgroundImage: "linear-gradient(to bottom, var(--color-paper) 0%, var(--color-paper-dim) 18%, var(--color-paper-dim) 82%, var(--color-paper) 100%)" }}
    >
      <div className="container-birthwave grid items-start gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16 xl:gap-24">
        <div className="min-w-0">
          <p className="eyebrow">{aboutHowWeCare.eyebrow}</p>
          <h2 id="about-how-we-care-heading"
            className="mt-4 max-w-xl text-[clamp(2.1rem,1.6rem+2.2vw,3rem)] leading-[1.08] font-semibold tracking-[var(--tracking-tight)] text-ink">
            {aboutHowWeCare.heading}
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-[var(--leading-relaxed)] text-ink-soft">
            {aboutHowWeCare.intro}
          </p>
          <AboutPreviewImage kind="consultation" className="mt-8 w-full sm:mt-10" />
        </div>

        <ol className="min-w-0 border-b border-[var(--color-border)]">
          {aboutHowWeCare.principles.map((principle) => (
            <li key={principle.index}
              className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3 border-t border-[var(--color-border)] py-7 sm:grid-cols-[2.5rem_minmax(0,1fr)] sm:gap-4 sm:py-8">
              <span aria-hidden="true" className="pt-1 font-display text-sm font-semibold text-terracotta">
                {principle.index}
              </span>
              <div>
                <h3 className="text-[clamp(1.45rem,1.1rem+1vw,2rem)] leading-[1.15] font-semibold tracking-[var(--tracking-tight)] text-ink">
                  {principle.label}
                </h3>
                <p className="mt-3 max-w-md text-base leading-[var(--leading-relaxed)] text-ink-soft">
                  {principle.statement}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
