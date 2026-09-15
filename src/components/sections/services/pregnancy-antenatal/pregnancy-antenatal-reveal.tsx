"use client";

import type { ReactNode } from "react";
import { useScrollReveal } from "@/motion/scroll-scenes";
import { cx } from "@/lib/cx";

/**
 * The one below-fold entrance every section on this page shares — "reveal
 * once with approximately 350–500ms opacity/8–16px movement, remains
 * visible on reverse scroll," per the brief. `--duration-base` (420ms) is
 * the existing token that already sits inside that range; `translate-y-3`
 * is exactly 12px. `useScrollReveal` (existing, not new) is a one-shot
 * `IntersectionObserver` — once `revealed` flips true it never flips back,
 * which is what "remains visible on reverse scroll" requires, and it
 * already reports `revealed: true` immediately under reduced motion (no
 * separate branch needed here).
 */
export function PregnancyReveal({ className, children }: { className?: string; children: ReactNode }) {
  const { ref, revealed } = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={cx(
        "transition-[opacity,transform] duration-[var(--duration-base)] ease-[var(--ease-signature)] motion-reduce:translate-y-0 motion-reduce:opacity-100",
        revealed ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
        className,
      )}
    >
      {children}
    </div>
  );
}
