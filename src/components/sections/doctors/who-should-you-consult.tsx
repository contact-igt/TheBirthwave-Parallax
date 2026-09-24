"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { whoShouldYouConsult } from "@/content/doctors-content";
import { useScrollReveal } from "@/motion/scroll-scenes";
import { cx } from "@/lib/cx";

/**
 * Section 02 (lower-page refinement) — Not Sure Who To See First? A SHORT
 * decision helper, not a second doctor grid and not a copy of the
 * Services page's own "Find the right care" (11 rows there; five
 * intentionally-high-value rows here, life-stage questions only —
 * concern-specific wayfinding to a named clinician now lives in
 * `WhoCanSupportYourCare` above instead, so the two no longer overlap).
 * Large editorial question + real answer link(s), divided by hairlines,
 * each settling into place on scroll (`useScrollReveal`, the same
 * one-shot IntersectionObserver reveal used elsewhere on this site — not
 * GSAP, not pinned). No accordion, no icon grid, no boxed cards.
 *
 * No bottom "meet the team" link — that data (`whoShouldYouConsult.cta`)
 * is kept for the pre-existing horizontal-journey fallback
 * (doctors-journey-scenes.tsx, out of scope for this pass) but omitted
 * here: circular on a page the visitor has already scrolled the team on.
 */
export function WhoShouldYouConsult() {
  return (
    <section
      id="who-should-you-consult"
      aria-labelledby="who-should-you-consult-heading"
      className="relative isolate bg-paper-dim section-pad"
    >
      <div className="container-birthwave">
        <div className="max-w-2xl">
          <p className="eyebrow">{whoShouldYouConsult.eyebrow}</p>
          <h2
            id="who-should-you-consult-heading"
            className="mt-4 text-[clamp(2.1rem,1.6rem+2.2vw,3rem)] leading-[1.08] font-semibold tracking-[var(--tracking-tight)] text-ink"
          >
            {whoShouldYouConsult.heading}
          </h2>
          <p className="mt-5 text-lg leading-[var(--leading-relaxed)] text-ink-soft">{whoShouldYouConsult.intro}</p>
        </div>

        <div className="mt-14 flex flex-col border-t border-[var(--color-border)]">
          {whoShouldYouConsult.concerns.map((concern) => (
            <ConcernRow key={concern.question} question={concern.question} answers={concern.answers} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ConcernRow({
  question,
  answers,
}: {
  question: string;
  answers: ReadonlyArray<{ label: string; slug: string }>;
}) {
  const { ref, revealed } = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={cx(
        "grid gap-3 border-b border-[var(--color-border)] py-8 transition-[transform,opacity] duration-[var(--duration-slow)] ease-[var(--ease-signature)] motion-reduce:translate-y-0 motion-reduce:opacity-100 sm:grid-cols-[1.1fr_1fr] sm:items-baseline sm:gap-10",
        revealed ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
      )}
    >
      <p className="text-[clamp(1.35rem,1.15rem+0.9vw,1.75rem)] leading-[1.2] font-semibold text-ink">{question}</p>
      <div className="flex flex-col items-start gap-2">
        {answers.map((answer) => (
          <Link
            key={answer.slug}
            href={`/services/${answer.slug}`}
            className="group inline-flex items-center gap-1.5 text-lg font-medium text-terracotta-deep transition-colors duration-[var(--duration-fast)] hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-focus-ring)]"
          >
            {answer.label}
            <ArrowUpRight
              aria-hidden="true"
              className="size-4 shrink-0 transition-transform duration-[var(--duration-fast)] ease-[var(--ease-signature)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
