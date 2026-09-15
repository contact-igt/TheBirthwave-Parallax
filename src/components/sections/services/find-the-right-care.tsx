"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { findTheRightCare } from "@/content/services-content";
import { useScrollReveal } from "@/motion/scroll-scenes";
import { cx } from "@/lib/cx";

/**
 * Section 04 — Find the Right Care. Back in normal document flow after
 * the sticky showcase releases — no cards, no icon grid: a large
 * question, a thin divider, a short answer naming the real service it
 * points to, and an arrow link. Two-column on desktop
 * (`sm:grid-cols-[1.1fr_1fr]`, the same "question/answer split with a
 * shared baseline" convention `who-should-you-consult.tsx` already
 * establishes for a near-identical layout problem), a natural single
 * column on mobile.
 *
 * "Not a diagnosis, just a place to begin" — `findTheRightCare.intro`
 * says this explicitly, and every answer below links straight to the
 * real service it names rather than making a determination.
 */
export function FindTheRightCare() {
  return (
    <section
      id="find-the-right-care"
      aria-labelledby="find-the-right-care-heading"
      // `scroll-mt` accounts for the fixed header (Quick Overview's own
      // "Skip treatment showcase" link lands here) so this section's own
      // heading isn't tucked behind it after the jump.
      className="relative isolate scroll-mt-[var(--header-height)] bg-paper-dim section-pad"
    >
      <div className="container-birthwave">
        <div className="max-w-2xl">
          <p className="eyebrow">{findTheRightCare.eyebrow}</p>
          <h2
            id="find-the-right-care-heading"
            className="mt-4 text-[clamp(2.1rem,1.6rem+2.2vw,3rem)] leading-[1.08] font-semibold tracking-[var(--tracking-tight)] text-ink"
          >
            {findTheRightCare.heading}
          </h2>
          <p className="mt-5 text-lg leading-[var(--leading-relaxed)] text-ink-soft">{findTheRightCare.intro}</p>
        </div>

        <div className="mt-14 flex flex-col border-t border-[var(--color-border)]">
          {findTheRightCare.pairings.map((pairing) => (
            <PairingRow key={pairing.slug} {...pairing} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PairingRow({
  question,
  answerLabel,
  slug,
}: {
  question: string;
  answerLabel: string;
  slug: string;
}) {
  const { ref, revealed } = useScrollReveal<HTMLAnchorElement>();

  return (
    <Link
      ref={ref}
      href={`/services/${slug}`}
      className={cx(
        "group grid gap-2 border-b border-[var(--color-border)] py-8 transition-[transform,opacity,background-color] duration-[var(--duration-slow)] ease-[var(--ease-signature)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-focus-ring)] motion-reduce:translate-y-0 motion-reduce:opacity-100 sm:grid-cols-[1.1fr_1fr] sm:items-center sm:gap-10",
        revealed ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
      )}
    >
      <p className="text-[clamp(1.35rem,1.15rem+0.9vw,1.75rem)] leading-[1.2] font-semibold text-ink">{question}</p>
      <span className="inline-flex items-center gap-1.5 text-lg font-medium text-terracotta-deep transition-colors duration-[var(--duration-fast)] group-hover:text-ink">
        {answerLabel}
        <ArrowUpRight
          aria-hidden="true"
          className="size-4 shrink-0 transition-transform duration-[var(--duration-fast)] ease-[var(--ease-signature)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </span>
    </Link>
  );
}
