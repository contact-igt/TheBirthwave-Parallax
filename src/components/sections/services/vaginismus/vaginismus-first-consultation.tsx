import { vaginismusFirstConsultation } from "@/content/pages/vaginismus";
import { VaginismusImage } from "./vaginismus-image";
import { VaginismusReveal } from "./vaginismus-reveal";
import { Button } from "@/components/ui/button";

/**
 * Section 8 — Your First Conversation.
 * 3 clear, unhurried steps emphasizing no pre-diagnosis required,
 * safe listening, and collaborative option exploring.
 *
 * Layout redesign: header + 3 large-numbered steps span the left column
 * while the image fills the right — creating an editorial asymmetric split.
 * Steps are displayed as prominent numbered rows with a visual accent that
 * reads more like a process timeline than a plain divider list.
 */
export function VaginismusFirstConsultation() {
  return (
    <section
      id="vaginismus-first-consultation"
      aria-labelledby="vaginismus-first-consultation-heading"
      className="relative isolate bg-paper section-pad"
    >
      <VaginismusReveal className="container-birthwave">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16">
          {/* Left — header + steps */}
          <div>
            <p className="eyebrow">{vaginismusFirstConsultation.eyebrow}</p>
            <h2
              id="vaginismus-first-consultation-heading"
              className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink"
            >
              {vaginismusFirstConsultation.heading}
            </h2>

            {/* Steps — numbered big-index rows */}
            <div className="mt-10 space-y-0">
              {vaginismusFirstConsultation.steps.map((step, idx) => (
                <div
                  key={step.number}
                  className="flex items-start gap-6 border-b border-[var(--color-border)] py-7 first:border-t first:border-t-[var(--color-border)]"
                >
                  {/* Large number */}
                  <span
                    aria-hidden="true"
                    className="shrink-0 font-display text-[2.5rem] font-bold leading-none text-terracotta-deep/20 sm:text-[3rem]"
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div className="pt-1">
                    <span className="font-body text-[0.6875rem] font-semibold tracking-[var(--tracking-wider)] text-terracotta-deep uppercase">
                      {step.title}
                    </span>
                    <p className="mt-2 text-base leading-[var(--leading-relaxed)] text-ink-soft">
                      {step.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Button
                href={vaginismusFirstConsultation.cta.href}
                variant="primary"
              >
                {vaginismusFirstConsultation.cta.label}
              </Button>
            </div>
          </div>

          {/* Right — image */}
          <div>
            <VaginismusImage
              imageKey="first-consultation"
              corner="tr"
              aspect="aspect-[4/5]"
              className="w-full"
            />
          </div>
        </div>
      </VaginismusReveal>
    </section>
  );
}
