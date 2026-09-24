"use client";

import type { ReactNode } from "react";
import { useScrollReveal } from "@/motion/scroll-scenes";
import { cx } from "@/lib/cx";

/**
 * The one below-fold entrance every section on this page shares — same
 * one-shot 8–16px/350–500ms reveal as `pregnancy-antenatal-reveal.tsx`.
 * `useScrollReveal` never flips back once revealed, so content "remains
 * visible on reverse scroll," and already reports `revealed: true`
 * immediately under reduced motion.
 *
 * NO-JS SAFETY NET: `useScrollReveal`'s `revealed` state starts `false`
 * and only ever flips via an `IntersectionObserver` effect — confirmed by
 * reading the server-rendered HTML directly (`curl`), every instance of
 * this component ships as `opacity-0` in the initial markup. Without JS
 * to ever run that effect, every section below the hero would stay
 * permanently invisible — exactly the regression the brief's own
 * "JavaScript-disabled loads must show readable content... reduced-motion
 * classes alone do not establish JavaScript-disabled visibility" rule
 * warns about (the same rule `team-journey.tsx`'s own `<noscript>` block
 * documents). The `birth-prep-reveal` class plus the single `<noscript>`
 * override in `birth-preparation-landing-page.tsx` forces every instance
 * back to its settled, fully visible state when JS is unavailable.
 */
export function BirthPrepReveal({ className, children }: { className?: string; children: ReactNode }) {
  const { ref, revealed } = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={cx(
        "birth-prep-reveal transition-[opacity,transform] duration-[var(--duration-base)] ease-[var(--ease-signature)] motion-reduce:translate-y-0 motion-reduce:opacity-100",
        revealed ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
        className,
      )}
    >
      {children}
    </div>
  );
}
