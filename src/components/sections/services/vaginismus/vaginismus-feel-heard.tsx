import { vaginismusFeelHeard } from "@/content/pages/vaginismus";
import { VaginismusReveal } from "./vaginismus-reveal";
import { Button } from "@/components/ui/button";

/**
 * Section 3A — A Space to Feel Heard / When Seeking Help Has Felt Difficult.
 * Empathetic editorial reassurance addressing medical trauma, dismissive past
 * experiences, and creating safe space for patient agency and informed consent.
 *
 * Layout redesign: eyebrow + heading + CTA as a full-width header band,
 * followed by the paragraph text in a flowing single-column editorial column
 * with a strong left border accent — giving the section the feel of a
 * considered statement rather than a two-column information layout.
 */
export function VaginismusFeelHeard() {
  return (
    <section
      id="vaginismus-feel-heard"
      aria-labelledby="vaginismus-feel-heard-heading"
      className="relative isolate bg-paper section-pad border-t border-[var(--color-border)]"
    >
      <VaginismusReveal className="container-birthwave">
        {/* Full-width header */}
        <div className="max-w-3xl">
          <p className="eyebrow">{vaginismusFeelHeard.eyebrow}</p>
          <h2
            id="vaginismus-feel-heard-heading"
            className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink"
          >
            {vaginismusFeelHeard.heading}
          </h2>
        </div>

        {/* Body — two-column on large screens, editorial left-border */}
        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left column: first half of paragraphs */}
          <div className="space-y-5 border-l-[3px] border-terracotta pl-6 text-base leading-[var(--leading-relaxed)] text-ink-soft">
            {vaginismusFeelHeard.paragraphs
              .slice(0, Math.ceil(vaginismusFeelHeard.paragraphs.length / 2))
              .map((p, idx) => (
                <p
                  key={idx}
                  className={
                    idx === 0 ? "font-medium text-ink text-lg leading-relaxed" : ""
                  }
                >
                  {p}
                </p>
              ))}
          </div>

          {/* Right column: second half of paragraphs + CTA */}
          <div className="space-y-5 text-base leading-[var(--leading-relaxed)] text-ink-soft">
            {vaginismusFeelHeard.paragraphs
              .slice(Math.ceil(vaginismusFeelHeard.paragraphs.length / 2))
              .map((p, idx) => (
                <p
                  key={idx}
                  className={
                    idx === 0 ? "font-medium text-ink text-lg leading-relaxed" : ""
                  }
                >
                  {p}
                </p>
              ))}

            <div className="pt-4">
              <Button href={vaginismusFeelHeard.cta.href} variant="primary">
                {vaginismusFeelHeard.cta.label}
              </Button>
            </div>
          </div>
        </div>
      </VaginismusReveal>
    </section>
  );
}
