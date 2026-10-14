import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { vbacRelatedCare } from "@/content/vbac-landing-content";
import { VbacReveal } from "./vbac-reveal";

/**
 * Section 13 — RELATED CARE:
 * 5 connected care services for pregnancy, birth and postpartum recovery.
 */
export function VbacRelatedCare() {
  return (
    <section id="vbac-related-care" aria-labelledby="vbac-related-care-heading" className="relative isolate border-t border-[var(--color-border)] bg-paper section-pad">
      <VbacReveal className="container-birthwave">
        <p className="eyebrow">{vbacRelatedCare.eyebrow}</p>
        <h2 id="vbac-related-care-heading" className="mt-4 max-w-xl text-[clamp(1.6rem,1.3rem+1.4vw,2.4rem)] leading-[1.15] font-semibold tracking-[var(--tracking-tight)] text-ink">
          {vbacRelatedCare.heading}
        </h2>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {vbacRelatedCare.services.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="group flex flex-col justify-between rounded-xs border border-[var(--color-border)] bg-[var(--vbac-sky-wash)]/40 p-6 transition-colors hover:border-terracotta-deep hover:bg-[var(--vbac-coral-wash)]/30"
            >
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-body text-base font-semibold text-ink group-hover:text-terracotta-deep transition-colors">
                    {service.title.replace(/\s*↗$/, "")}
                  </h3>
                  <ArrowUpRight className="size-4 text-terracotta-deep transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <p className="mt-2 text-sm leading-[var(--leading-relaxed)] text-ink-soft">
                  {service.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </VbacReveal>
    </section>
  );
}
