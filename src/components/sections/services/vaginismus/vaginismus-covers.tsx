import { vaginismusCovers } from "@/content/vaginismus-landing-content";
import { VaginismusImage } from "./vaginismus-image";
import { VaginismusReveal } from "./vaginismus-reveal";
import { Button } from "@/components/ui/button";

/**
 * Section 4 — Your First Experience at The BirthWave.
 * 5 clear, unhurried steps from sharing your story to planning care together,
 * with explicit informed consent note and consultation booking CTA.
 */
export function VaginismusCovers() {
  return (
    <section
      id="vaginismus-covers"
      aria-labelledby="vaginismus-covers-heading"
      className="relative isolate scroll-mt-[var(--header-height)] bg-paper section-pad"
    >
      <VaginismusReveal className="container-birthwave">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
          <div className="sticky top-24">
            <VaginismusImage
              imageKey="consultation"
              corner="bl"
              aspect="aspect-[4/5]"
              className="w-full"
            />
          </div>

          <div className="max-w-xl">
            <p className="eyebrow">{vaginismusCovers.eyebrow}</p>
            <h2
              id="vaginismus-covers-heading"
              className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink"
            >
              {vaginismusCovers.heading}
            </h2>

            {/* Intro paragraphs */}
            <div className="mt-6 space-y-3 text-base leading-[var(--leading-relaxed)] text-ink-soft">
              {vaginismusCovers.intro.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>

            {/* 5 Steps */}
            <div className="mt-8 flex flex-col">
              {vaginismusCovers.steps.map((step) => (
                <div
                  key={step.number}
                  className="flex gap-4 border-t border-[var(--color-border)] py-6 first:border-t-0 first:pt-4"
                >
                  <span className="mt-0.5 font-body text-sm font-semibold text-terracotta-deep">
                    {step.number}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-ink">{step.title}</h3>
                    <p className="mt-2 text-sm leading-[var(--leading-relaxed)] text-ink-soft">
                      {step.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Consent note */}
            {vaginismusCovers.note ? (
              <p className="mt-6 border-l-2 border-terracotta pl-4 text-sm leading-relaxed text-ink-soft">
                {vaginismusCovers.note}
              </p>
            ) : null}

            {/* CTA */}
            {vaginismusCovers.cta ? (
              <div className="mt-8">
                <Button href={vaginismusCovers.cta.href} variant="primary">
                  {vaginismusCovers.cta.label}
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      </VaginismusReveal>
    </section>
  );
}
