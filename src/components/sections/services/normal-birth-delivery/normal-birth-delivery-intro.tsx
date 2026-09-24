import { normalBirthIntro } from "@/content/normal-birth-delivery-landing-content";
import { NormalBirthImage } from "./normal-birth-delivery-image";
import { NormalBirthReveal } from "./normal-birth-delivery-reveal";

/**
 * Section 2 — the substantial introduction. A full section with a
 * generous consultation image opposite the text, matching the same
 * balanced editorial composition the pregnancy and birth-preparation
 * intros already establish — not compressed into a narrow text strip.
 */
export function NormalBirthIntro() {
  return (
    <section id="nbd-understand" aria-labelledby="nbd-understand-heading" className="relative isolate bg-paper section-pad">
      <NormalBirthReveal className="container-birthwave">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16">
          <NormalBirthImage
            imageKey="consultation"
            drift
            corner="tl"
            aspect="aspect-[4/5] sm:aspect-[4/4.9]"
            className="order-2 lg:order-1"
          />

          <div className="order-1 max-w-xl lg:order-2">
            <p className="eyebrow">{normalBirthIntro.eyebrow}</p>
            <h2 id="nbd-understand-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
              {normalBirthIntro.heading.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>

            {normalBirthIntro.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-4 max-w-[52ch] text-base leading-[var(--leading-relaxed)] text-ink-soft">
                {paragraph}
              </p>
            ))}

            <div className="mt-8 flex flex-col">
              {normalBirthIntro.points.map((point) => (
                <div key={point.title} className="border-t border-[var(--color-border)] py-5">
                  <h3 className="text-lg font-semibold text-ink">{point.title}</h3>
                  <p className="mt-2 text-sm leading-[var(--leading-relaxed)] text-ink-soft">{point.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </NormalBirthReveal>
    </section>
  );
}
