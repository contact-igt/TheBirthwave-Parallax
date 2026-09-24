"use client";

import type { DoctorContent } from "@/content/doctors-content";
import { DoctorProfileContent } from "@/components/sections/doctors/doctor-profile-content";
import { useScrollReveal } from "@/motion/scroll-scenes";
import { cx } from "@/lib/cx";

/**
 * One team member's full-width editorial profile row — large-portrait
 * visual redesign. Still the vertical directory's own presentation
 * (team-directory rework) and the accessible/responsive FALLBACK for the
 * desktop horizontal team journey (`team-journey.tsx`, unchanged by this
 * pass). Portrait + info content itself lives in the shared
 * `DoctorProfileContent` (used identically by the horizontal journey's
 * own scenes) — this component only owns the row's own wrapper: the
 * hairline divider, the column ratio (approximately 43%/57% — "large
 * portrait" per the brief, up from the previous ~35%/65% split), the
 * spacing, and the one-shot scroll reveal.
 *
 * Reveal: one-shot `useScrollReveal` (opacity + translate, ~420ms) — the
 * same pattern every other below-fold section on this site already uses.
 * Never re-hides on reverse scroll; reports revealed immediately under
 * reduced motion.
 */
export function DoctorProfileRow({ doctor, index }: { doctor: DoctorContent; index: number }) {
  const { ref, revealed } = useScrollReveal<HTMLDivElement>();

  return (
    <article
      ref={ref}
      className={cx(
        // `overflow-x-hidden`: the portrait's own soft accent wash
        // (`accentWash`, PortraitPlaceholder) deliberately bleeds a few
        // px past the portrait frame itself for a soft, unclipped look —
        // on a narrow phone width where the portrait already runs
        // close to full container width, that bleed can extend a
        // fraction of a px past the viewport edge. Clipping it here, at
        // each profile block's own boundary, keeps the soft-edge look
        // intact (the block already spans the full column) while
        // guaranteeing no page-level horizontal scroll. Confirmed via a
        // real `scrollWidth` measurement at 360px, not guessed.
        "overflow-x-hidden border-t border-[var(--color-border)] py-12 transition-[opacity,transform] duration-[var(--duration-base)] ease-[var(--ease-signature)] first:border-t-0 first:pt-0 motion-reduce:translate-y-0 motion-reduce:opacity-100 sm:grid sm:grid-cols-[0.75fr_1fr] sm:items-start sm:gap-14 sm:py-16",
        revealed ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
      )}
    >
      <DoctorProfileContent
        doctor={doctor}
        index={index}
        drift
        portraitWrapperClassName="block w-full max-w-md sm:max-w-none"
      />
    </article>
  );
}
