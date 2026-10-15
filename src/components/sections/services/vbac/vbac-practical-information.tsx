import { vbacPractical } from "@/content/pages/vbac";
import { VbacReveal } from "./vbac-reveal";
import { Button } from "@/components/ui/button";

/**
 * Section 10 — PRACTICAL INFORMATION:
 * Compact, balanced information grid for visit essentials with centered header and CTA.
 */
export function VbacPracticalInformation() {
  return (
    <section id="vbac-practical" aria-labelledby="vbac-practical-heading" className="relative isolate overflow-hidden bg-[var(--vbac-sky-wash)]/40 section-pad border-t border-[var(--color-border)]">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[url('/images/natural-birth/natural-birth-practical-background-v1.png')] bg-cover bg-center" />
      <VbacReveal className="container-birthwave">
        <div className="max-w-2xl md:mx-auto md:text-center">
          <p className="eyebrow">{vbacPractical.eyebrow}</p>
          <h2 id="vbac-practical-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
            {vbacPractical.heading}
          </h2>
        </div>

        {/* Compact, balanced information grid */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
          {vbacPractical.items.map((item, idx) => {
            const isWide = idx === 2; // "What to bring" contains longer guidance
            return (
              <div
                key={item.label}
                className={`rounded-sm border border-[var(--color-border)] bg-paper p-5 sm:p-6 shadow-2xs hover:border-terracotta/40 transition-colors flex flex-col justify-start ${
                  isWide ? "sm:col-span-2 lg:col-span-2" : ""
                }`}
              >
                <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-2.5">
                  <strong className="block font-body text-xs font-semibold tracking-wider text-terracotta-deep uppercase">
                    {item.label}
                  </strong>
                  <span className="size-1.5 rounded-full bg-terracotta/40" />
                </div>
                <div className="mt-3 text-sm leading-relaxed text-ink">
                  {item.lines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex justify-start md:justify-center">
          <Button href={vbacPractical.cta.href} variant="primary">
            {vbacPractical.cta.label.replace(/\s*↗$/, "")}
          </Button>
        </div>
      </VbacReveal>
    </section>
  );
}
