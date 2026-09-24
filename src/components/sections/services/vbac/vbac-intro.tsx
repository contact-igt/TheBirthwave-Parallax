import { vbacIntro } from "@/content/vbac-landing-content";
import { VbacImage } from "./vbac-image";
import { VbacReveal } from "./vbac-reveal";

/**
 * Section 2 — Begin With Your Full Story. A full section with a generous
 * consultation image opposite the text, matching the balanced editorial
 * composition the other landing pages already establish for a comparable
 * need — informational content, not an eligibility checker.
 */
export function VbacIntro() {
  return (
    <section id="vbac-intro" aria-labelledby="vbac-intro-heading" className="relative isolate bg-paper section-pad">
      <VbacReveal className="container-birthwave">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16">
          <VbacImage imageKey="consultation" corner="tl" aspect="aspect-[4/5] sm:aspect-[4/4.9]" className="order-2 lg:order-1" />

          <div className="order-1 max-w-xl lg:order-2">
            <p className="eyebrow">{vbacIntro.eyebrow}</p>
            <h2 id="vbac-intro-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
              {vbacIntro.heading.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>

            {vbacIntro.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-4 max-w-[52ch] text-base leading-[var(--leading-relaxed)] text-ink-soft">
                {paragraph}
              </p>
            ))}

            <div className="mt-8 flex flex-col">
              {vbacIntro.points.map((point) => (
                <div key={point.title} className="border-t border-[var(--color-border)] py-5">
                  <h3 className="text-lg font-semibold text-ink">{point.title}</h3>
                  <p className="mt-2 text-sm leading-[var(--leading-relaxed)] text-ink-soft">{point.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </VbacReveal>
    </section>
  );
}
