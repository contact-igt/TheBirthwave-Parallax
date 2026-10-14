import { birthPrepIntro } from "@/content/birth-preparation-landing-content";
import { BirthPrepImage } from "./birth-preparation-image";
import { BirthPrepReveal } from "./birth-preparation-reveal";

/**
 * Section 02 — Why Prepare for Birth? (Before Your Little One Arrives).
 */
export function BirthPrepIntro() {
  return (
    <section id="birth-prep-understand" aria-labelledby="birth-prep-understand-heading" className="relative isolate bg-[var(--birth-prep-rose-wash)] section-pad">
      <BirthPrepReveal className="container-birthwave">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16">
          <BirthPrepImage imageKey="birth-prep-landing-consultation" corner="tl" aspect="aspect-[4/5] sm:aspect-[4/4.9]" className="order-2 lg:order-1" drift />

          <div className="order-1 max-w-xl lg:order-2">
            <p className="eyebrow">{birthPrepIntro.eyebrow}</p>
            <h2 id="birth-prep-understand-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
              {birthPrepIntro.heading}
            </h2>

            <div className="mt-6 space-y-4 text-base leading-[var(--leading-relaxed)] text-ink-soft">
              {birthPrepIntro.paragraphs.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8 flex flex-col">
              {birthPrepIntro.points.map((point) => (
                <div key={point.title} className="border-t border-[var(--color-border)] py-5">
                  <h3 className="text-lg font-semibold text-ink">{point.title}</h3>
                  <p className="mt-2 text-sm leading-[var(--leading-relaxed)] text-ink-soft">{point.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </BirthPrepReveal>
    </section>
  );
}
