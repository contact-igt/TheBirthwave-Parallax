"use client";

import type { ReactNode } from "react";
import { useScrollReveal } from "@/motion/scroll-scenes";
import { cx } from "@/lib/cx";

/**
 * The one below-fold entrance every section on this page shares — same
 * ~420ms/12px settle every other dedicated landing page already uses
 * (`PregnancyReveal`, `FertilityReveal`). One-shot `IntersectionObserver`
 * via `useScrollReveal`; already reports `revealed: true` immediately under
 * reduced motion.
 */
export function VaginismusReveal({ className, children }: { className?: string; children: ReactNode }) {
  const { ref, revealed } = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={cx(
        "vaginismus-reveal transition-[opacity,transform] duration-[var(--duration-base)] ease-[var(--ease-signature)] motion-reduce:translate-y-0 motion-reduce:opacity-100",
        revealed ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
        className,
      )}
    >
      {children}
    </div>
  );
}
