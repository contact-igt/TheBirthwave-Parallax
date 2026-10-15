"use client";

import { ChevronDown } from "lucide-react";
import { fertilityFaq } from "@/content/pages/fertility-preconception";
import { useScrollReveal } from "@/motion/scroll-scenes";
import { cx } from "@/lib/cx";

/**
 * Section 9 — FAQ: Questions before you visit.
 * Layout and visual treatment matched to PregnancyAntenatalFaq:
 * - Warm ivory background (#FAF6F2)
 * - Terracotta pill eyebrow with coral dot
 * - 2-column editorial grid with sticky heading
 * - Rounded-2xl white accordion rows with thin warm border
 * - Circular badge affordance with rotating ChevronDown
 * - First item open by default
 * - Native accessible <details>/<summary> with visible focus outline
 */
export function FertilityFaq() {
  const { ref, revealed } = useScrollReveal<HTMLDivElement>();

  return (
    <section
      id="fertility-faq"
      aria-labelledby="fertility-faq-heading"
      className="relative isolate scroll-mt-[var(--header-height)] bg-[#FAF6F2] section-pad"
    >
      <div
        ref={ref}
        className={cx(
          "container-birthwave transition-[opacity,transform] duration-[var(--duration-base)] ease-[var(--ease-signature)] motion-reduce:translate-y-0 motion-reduce:opacity-100",
          revealed ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
        )}
      >
        <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start lg:gap-14 xl:gap-16">
          {/* Left Column: Heading */}
          <div className="lg:sticky lg:top-28">
            <div className="inline-flex items-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--color-terracotta)_28%,transparent)] bg-[color-mix(in_srgb,var(--color-terracotta)_10%,var(--color-paper))] px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-terracotta-deep mb-3.5">
              <span className="size-1.5 rounded-full bg-coral" aria-hidden="true" />
              {fertilityFaq.eyebrow}
            </div>
            <h2
              id="fertility-faq-heading"
              className="text-[clamp(2.1rem,1.5rem+2.6vw,3.2rem)] leading-[1.12] font-semibold tracking-[var(--tracking-tight)] text-ink"
            >
              {fertilityFaq.heading}
            </h2>
          </div>

          {/* Right Column: Clean Accordion List */}
          <div className="space-y-3.5 sm:space-y-4">
            {fertilityFaq.items.map((item, idx) => (
              <details
                key={item.question}
                className="group bg-white rounded-2xl border border-[color-mix(in_srgb,var(--color-terracotta)_20%,transparent)] overflow-hidden transition-all duration-300 open:shadow-xs"
                open={idx === 0}
              >
                <summary className="flex justify-between items-center p-5 sm:p-6 cursor-pointer list-none select-none text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta-deep [&::-webkit-details-marker]:hidden">
                  <span className="font-body text-base sm:text-lg font-semibold text-ink group-hover:text-terracotta-deep transition-colors pr-4">
                    {item.question}
                  </span>
                  <span
                    aria-hidden="true"
                    className="size-7 rounded-full bg-[#FAF6F2] border border-terracotta/25 flex items-center justify-center text-terracotta-deep transition-transform duration-300 group-open:rotate-180 shrink-0"
                  >
                    <ChevronDown className="size-4" />
                  </span>
                </summary>
                <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base leading-[var(--leading-relaxed)] text-ink-soft border-t border-[color-mix(in_srgb,var(--color-terracotta)_12%,transparent)]">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
