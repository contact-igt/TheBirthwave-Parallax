"use client";

import { whoShouldYouConsult } from "@/content/doctors-content";
import { CtaLink } from "@/components/ui/cta-link";
import { useScrollReveal } from "@/motion/scroll-scenes";
import { cx } from "@/lib/cx";

/**
 * Section 03 — Who Should You Consult? Wayfinding by care concern, not a
 * second doctor grid: no doctor names, specialties or clinical claims are
 * matched here (no named, specialty-tagged roster exists yet to route
 * to — see doctors-content.ts's own comment). Large editorial question +
 * short response pairs, divided by hairlines, each settling into place on
 * scroll (`useScrollReveal`, the same one-shot IntersectionObserver
 * reveal Care/Journey already use elsewhere — not GSAP, not pinned). No
 * accordion, no icon grid, no boxed cards.
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
            <ConcernRow key={concern.question} question={concern.question} guidance={concern.guidance} />
          ))}
        </div>

        <div className="mt-14">
          <CtaLink href={whoShouldYouConsult.cta.href}>{whoShouldYouConsult.cta.label}</CtaLink>
        </div>
      </div>
    </section>
  );
}

function ConcernRow({ question, guidance }: { question: string; guidance: string }) {
  const { ref, revealed } = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={cx(
        "grid gap-2 border-b border-[var(--color-border)] py-8 transition-[transform,opacity] duration-[var(--duration-slow)] ease-[var(--ease-signature)] motion-reduce:translate-y-0 motion-reduce:opacity-100 sm:grid-cols-[1.1fr_1fr] sm:items-baseline sm:gap-10",
        revealed ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
      )}
    >
      <p className="text-[clamp(1.35rem,1.15rem+0.9vw,1.75rem)] leading-[1.2] font-semibold text-ink">{question}</p>
      <p className="text-lg leading-[var(--leading-relaxed)] text-ink-soft">{guidance}</p>
    </div>
  );
}
