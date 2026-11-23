"use client";

import type { ReactNode } from "react";
import { useScrollReveal } from "@/motion/scroll-scenes";
import { cx } from "@/lib/cx";

export function CaesareanBirthReveal({ className, children }: { className?: string; children: ReactNode }) {
  const { ref, revealed } = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={cx(
        "caesarean-birth-reveal transition-[opacity,transform] duration-[var(--duration-base)] ease-[var(--ease-signature)] motion-reduce:translate-y-0 motion-reduce:opacity-100",
        revealed ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
        className,
      )}
    >
      {children}
    </div>
  );
}
