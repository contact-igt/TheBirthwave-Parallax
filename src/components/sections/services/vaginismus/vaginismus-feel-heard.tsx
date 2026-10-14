import { vaginismusFeelHeard } from "@/content/vaginismus-landing-content";
import { VaginismusReveal } from "./vaginismus-reveal";
import { Button } from "@/components/ui/button";

/**
 * Section 3A — A Space to Feel Heard / When Seeking Help Has Felt Difficult.
 * Empathetic editorial reassurance addressing medical trauma, dismissive past
 * experiences, and creating safe space for patient agency and informed consent.
 */
export function VaginismusFeelHeard() {
  return (
    <section
      id="vaginismus-feel-heard"
      aria-labelledby="vaginismus-feel-heard-heading"
      className="relative isolate bg-paper section-pad border-t border-[var(--color-border)]"
    >
      <VaginismusReveal className="container-birthwave">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-16">
          <div className="max-w-xl">
            <p className="eyebrow">{vaginismusFeelHeard.eyebrow}</p>
            <h2
              id="vaginismus-feel-heard-heading"
              className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink"
            >
              {vaginismusFeelHeard.heading}
            </h2>

            <div className="mt-8">
              <Button href={vaginismusFeelHeard.cta.href} variant="primary">
                {vaginismusFeelHeard.cta.label}
              </Button>
            </div>
          </div>

          <div className="space-y-5 rounded-xs border-l-2 border-terracotta pl-6 lg:pl-8 text-base leading-[var(--leading-relaxed)] text-ink-soft">
            {vaginismusFeelHeard.paragraphs.map((p, idx) => (
              <p
                key={idx}
                className={
                  idx === 0 || idx === 4 || idx === 8
                    ? "font-medium text-ink text-lg leading-relaxed"
                    : ""
                }
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </VaginismusReveal>
    </section>
  );
}
