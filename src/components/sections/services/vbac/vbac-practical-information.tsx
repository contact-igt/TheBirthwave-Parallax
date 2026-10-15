import { vbacPractical } from "@/content/pages/vbac";
import { VbacReveal } from "./vbac-reveal";
import { Button } from "@/components/ui/button";

/**
 * Section 10 — PRACTICAL INFORMATION:
 * Location, consulting doctor, records to bring, and contact info.
 */
export function VbacPracticalInformation() {
  return (
    <section id="vbac-practical" aria-labelledby="vbac-practical-heading" className="relative isolate bg-[var(--vbac-coral-wash)] section-pad">
      <VbacReveal className="container-birthwave max-w-4xl">
        <p className="eyebrow">{vbacPractical.eyebrow}</p>
        <h2 id="vbac-practical-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
          {vbacPractical.heading}
        </h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {vbacPractical.items.map((item) => (
            <div key={item.label} className="rounded-xs border border-[var(--color-border)] bg-paper p-6">
              <strong className="block font-body text-xs font-semibold tracking-wider text-terracotta-deep uppercase">
                {item.label}
              </strong>
              <div className="mt-2 text-sm leading-relaxed text-ink">
                {item.lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Button href={vbacPractical.cta.href} variant="primary">
            {vbacPractical.cta.label.replace(/\s*↗$/, "")}
          </Button>
        </div>
      </VbacReveal>
    </section>
  );
}
