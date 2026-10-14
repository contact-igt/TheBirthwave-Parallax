"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ourApproachSection } from "@/content/our-services-content";
import { useScrollReveal } from "@/motion/scroll-scenes";
import { cx } from "@/lib/cx";

/**
 * Section 12 — Our Approach ("Different needs. Connected care.").
 * Editorial care philosophy highlighting multi-disciplinary coordination.
 */
export function ServicesApproachSection() {
  const { ref, revealed } = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section
      id={ourApproachSection.id}
      aria-labelledby="services-approach-heading"
      className="relative isolate border-t border-[var(--color-border)] bg-paper-dim/40 py-20 sm:py-24"
    >
      <div className="container-birthwave">
        <div
          ref={ref}
          className={cx(
            "mx-auto max-w-3xl transition-[transform,opacity] duration-[var(--duration-base)] ease-[var(--ease-signature)]",
            revealed ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
          )}
        >
          <div className="text-center sm:text-left">
            <p className="eyebrow text-terracotta-deep font-semibold">{ourApproachSection.eyebrow}</p>
            <h2
              id="services-approach-heading"
              className="mt-3 text-[clamp(2.1rem,1.6rem+2.2vw,3rem)] leading-[1.08] font-semibold tracking-[var(--tracking-tight)] text-ink"
            >
              {ourApproachSection.heading}
            </h2>
          </div>

          <div className="mt-8 rounded-sm border border-[var(--color-border)] bg-paper/90 p-7 sm:p-9 shadow-[0_8px_24px_rgba(42,36,33,0.03)]">
            <div className="space-y-4 text-base sm:text-lg leading-[var(--leading-relaxed)] text-ink-soft">
              {ourApproachSection.paragraphs.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-[var(--color-border)]">
              <Link
                href={ourApproachSection.cta.href}
                className="group inline-flex items-center gap-1.5 font-body text-sm font-semibold text-terracotta-deep transition-colors duration-[var(--duration-fast)] hover:text-ink sm:text-base"
              >
                <span className="border-b border-current/40 pb-0.5 group-hover:border-current">
                  {ourApproachSection.cta.label.replace(/\s*→$/, "")}
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-[var(--duration-fast)] ease-[var(--ease-signature)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
