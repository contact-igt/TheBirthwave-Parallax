"use client";

import type { ReactNode } from "react";
import { useScrollReveal } from "@/motion/scroll-scenes";
import { cx } from "@/lib/cx";

/**
 * The one below-fold entrance every section on this page shares — same
 * one-shot reveal as `VbacReveal`/`NormalBirthReveal`/`PregnancyReveal`.
 * `useScrollReveal` never flips back once revealed, so content remains
 * visible on reverse scroll, and already reports `revealed: true`
 * immediately under reduced motion.
 *
 * NO-JS SAFETY NET: `useScrollReveal`'s `revealed` state starts `false` and
 * only ever flips via an `IntersectionObserver` effect — every instance of
 * this component ships as `opacity-0` in the server-rendered HTML. Without
 * JS to ever run that effect, every section below the hero would stay
 * permanently invisible. The `fertility-reveal` class plus the single
 * `<noscript>` override in `fertility-preconception-landing-page.tsx`
 * forces every instance back to its settled, fully visible state when JS
 * is unavailable.
 */
export function FertilityReveal({ className, children }: { className?: string; children: ReactNode }) {
  const { ref, revealed } = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={cx(
        "fertility-reveal transition-[opacity,transform] duration-[var(--duration-base)] ease-[var(--ease-signature)] motion-reduce:translate-y-0 motion-reduce:opacity-100",
        revealed ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
        className,
      )}
    >
      {children}
    </div>
  );
}
