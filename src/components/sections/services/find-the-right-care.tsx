"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { findTheRightCare } from "@/content/services-content";
import { useScrollReveal } from "@/motion/scroll-scenes";
import { cx } from "@/lib/cx";

/**
 * Section 04 — Find the Right Care. A decision helper, not a second
 * service directory (Care Journey above already lists all 11 by name) —
 * five plain-language questions, each resolving to one or two real
 * services. No cards, no icon grid: a large question, a thin divider, one
 * or two answer links, an arrow. Two-column on desktop
 * (`sm:grid-cols-[1.1fr_1fr]`, the same "question/answer split with a
 * shared baseline" convention `who-should-you-consult.tsx` already
 * establishes for a near-identical layout problem), a natural single
 * column on mobile.
 *
 * A row's second answer (currently only VBAC, under "Preparing for
 * birth?") can be marked `secondary` in the content — rendered smaller
 * and quieter, a related route worth surfacing without competing with the
 * row's own primary answer.
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
            <PairingRow key={pairing.question} question={pairing.question} answers={pairing.answers} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PairingRow({
  question,
  answers,
}: {
  question: string;
  answers: ReadonlyArray<{ label: string; slug: string; secondary?: boolean }>;
}) {
  const { ref, revealed } = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={cx(
        "grid gap-3 border-b border-[var(--color-border)] py-8 transition-[transform,opacity] duration-[var(--duration-slow)] ease-[var(--ease-signature)] motion-reduce:translate-y-0 motion-reduce:opacity-100 sm:grid-cols-[1.1fr_1fr] sm:items-center sm:gap-10",
        revealed ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
      )}
    >
      <p className="text-[clamp(1.35rem,1.15rem+0.9vw,1.75rem)] leading-[1.2] font-semibold text-ink">{question}</p>
      <div className="flex flex-col items-start gap-2.5">
        {answers.map((answer) => (
          <AnswerLink key={answer.slug} {...answer} />
        ))}
      </div>
    </div>
  );
}

function AnswerLink({ label, slug, secondary }: { label: string; slug: string; secondary?: boolean }) {
  return (
    <Link
      href={`/services/${slug}`}
      className={cx(
        "group inline-flex items-center gap-1.5 font-medium transition-colors duration-[var(--duration-fast)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-focus-ring)]",
        secondary ? "text-base text-ink-soft hover:text-terracotta-deep" : "text-lg text-terracotta-deep hover:text-ink",
      )}
    >
      {secondary ? `Also consider: ${label}` : label}
      <ArrowUpRight
        aria-hidden="true"
        className={cx(
          "shrink-0 transition-transform duration-[var(--duration-fast)] ease-[var(--ease-signature)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
          secondary ? "size-3.5" : "size-4",
        )}
      />
    </Link>
  );
}
