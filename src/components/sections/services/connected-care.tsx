"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { connectedCare } from "@/content/services-content";
import { useScrollReveal } from "@/motion/scroll-scenes";
import { cx } from "@/lib/cx";

/**
 * Section 04 — One Connected Approach (Care Philosophy).
 *
 * Distinct, compact composition rather than another service chapter.
 * Uses a well-composed editorial text treatment to present the core care philosophy
 * without fabricating imagery or misrepresenting illustrative people as the actual care team.
 */
export function ConnectedCare() {
  const { ref, revealed } = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });
  const [forceVisible, setForceVisible] = useState(false);
  const isVisible = revealed || forceVisible;

  return (
    <section
      aria-labelledby="connected-care-heading"
      className="relative isolate border-t border-[var(--color-border)] bg-paper-dim/40 py-20 sm:py-24"
      onFocusCapture={() => setForceVisible(true)}
    >
      <div className="container-birthwave">
        <div
          ref={ref}
          className={cx(
            "mx-auto max-w-3xl transition-[transform,opacity] duration-[var(--duration-base)] ease-[var(--ease-signature)] motion-reduce:translate-y-0 motion-reduce:opacity-100",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
          )}
        >
          <div className="text-center sm:text-left">
            <p className="eyebrow text-terracotta-deep font-semibold">{connectedCare.eyebrow}</p>
            <h2
              id="connected-care-heading"
              className="mt-3 text-[clamp(2.1rem,1.6rem+2.2vw,3rem)] leading-[1.08] font-semibold tracking-[var(--tracking-tight)] text-ink"
            >
              {connectedCare.heading}
            </h2>
          </div>

          {/* Staggered philosophical pillars */}
          <div className="mt-10 rounded-sm border border-[var(--color-border)] bg-paper/85 p-6 sm:p-9 shadow-[0_8px_24px_rgba(42,36,33,0.03)]">
            <ul className="flex flex-col gap-4 border-l-2 border-terracotta/40 pl-5 sm:pl-7">
              {connectedCare.philosophyLines.map((line) => (
                <li
                  key={line}
                  className="font-display text-base leading-[var(--leading-relaxed)] text-ink sm:text-lg italic"
                >
                  “{line}”
                </li>
              ))}
            </ul>

            <p className="mt-8 border-t border-[var(--color-border)] pt-6 text-base leading-[var(--leading-relaxed)] text-ink-soft sm:text-lg">
              {connectedCare.body}
            </p>

            <div className="mt-7">
              <Link
                href={connectedCare.cta.href}
                className="group inline-flex items-center gap-1.5 font-body text-sm font-semibold text-terracotta-deep transition-colors duration-[var(--duration-fast)] hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-focus-ring)] sm:text-base"
              >
                <span className="border-b border-current/40 pb-0.5 group-hover:border-current">
                  {connectedCare.cta.label}
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-[var(--duration-fast)] ease-[var(--ease-signature)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
