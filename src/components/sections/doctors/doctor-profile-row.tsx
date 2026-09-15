"use client";

import type { DoctorContent } from "@/content/doctors-content";
import { DoctorProfileContent } from "@/components/sections/doctors/doctor-profile-content";
import { useScrollReveal } from "@/motion/scroll-scenes";
import { cx } from "@/lib/cx";

/**
 * One team member's full-width editorial profile row — the vertical
 * directory's own presentation (team-directory rework), and, since the
 * team-journey rework, also the accessible/responsive FALLBACK for the
 * desktop horizontal team journey (`team-journey.tsx`). Portrait + info
 * content itself now lives in the shared `DoctorProfileContent` (used
 * identically by the horizontal journey's own scenes) — this component
 * only owns the vertical row's own wrapper: the hairline divider, the
 * stacked spacing, and the one-shot scroll reveal.
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
        "border-t border-[var(--color-border)] py-10 transition-[opacity,transform] duration-[var(--duration-base)] ease-[var(--ease-signature)] first:border-t-0 first:pt-0 motion-reduce:translate-y-0 motion-reduce:opacity-100 sm:grid sm:grid-cols-[clamp(280px,35%,360px)_1fr] sm:items-start sm:gap-10 sm:py-12",
        revealed ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
      )}
    >
      <DoctorProfileContent doctor={doctor} index={index} drift />
    </article>
  );
}
