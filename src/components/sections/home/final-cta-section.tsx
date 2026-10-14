"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { finalCta } from "@/content/site-content";
import { Button } from "@/components/ui/button";
import { useParallax } from "@/motion/image-motion";
import { useScrollReveal } from "@/motion/scroll-scenes";
import { emergenceBand, finalCtaEmergence } from "@/motion/section-transitions";
import { cx } from "@/lib/cx";

/**
 * Section 4: Final CTA / Pre-Footer Section — "Start Where You Are".
 *
 * Enhanced pre-footer closing invitation:
 * - Rich dark espresso base (#241a17 / bg-ink) with seamless footer alignment.
 * - Restrained atmospheric background: low-opacity parallax photograph combined
 *   with a gentle, warm maternal light falloff (soft coral radial glaze).
 * - Drifting resolving BirthWave line in coral above the headline.
 * - Crisp, high-contrast, luminous warm ivory typography (#FAF6F2) guaranteed against dark fill.
 * - Dual prominent CTA actions:
 *   - Primary: Glowing dusty rose / coral button.
 *   - Secondary: Elegant warm outline button with arrow nudge.
 * - Smooth top emergence band bridging the light ivory of FAQ into dark espresso.
 * - Hairline pre-footer separator for an intentional, architectural closure.
 * - Full accessibility and motion-reduction compliance.
 */
export function FinalCtaSection() {
  const pathRef = useParallax<HTMLDivElement>({ factor: 0.08, maxOffsetPx: 18 });
  const bgImageRef = useParallax<HTMLDivElement>({ factor: 0.04, maxOffsetPx: 14 });
  const { ref: textRevealRef, revealed } = useScrollReveal<HTMLDivElement>();

  return (
    <section
      id="connect"
      aria-labelledby="final-cta-heading"
      className="relative isolate overflow-hidden bg-ink py-24 sm:py-28 lg:py-36 border-b border-paper/[0.08]"
    >
      {/* Background Photograph — Subtle atmospheric wash */}
      <div
        ref={bgImageRef}
        aria-hidden="true"
        style={{ transform: "translate3d(0, var(--parallax-y, 0px), 0)" }}
        className="absolute inset-0 -z-20 scale-110 opacity-[0.24]"
      >
        <Image
          src={finalCta.media.src}
          alt={finalCta.media.alt}
          fill
          sizes="100vw"
          className="object-cover object-[35%_45%]"
        />
      </div>

      {/* Dark Espresso Base Scrim */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink/75" />

      {/* Top Emergence Band: Smooth transition from Warm Ivory to Espresso */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-(--space-fade-final)"
        style={{ backgroundImage: emergenceBand.fromPaper(finalCtaEmergence.top) }}
      />

      <div className="container-birthwave relative z-10">
        {/* Resolving BirthWave Line SVG with Parallax */}
        <div
          ref={pathRef}
          aria-hidden="true"
          className="w-40 text-coral sm:w-52"
          style={{ transform: "translate3d(0, var(--parallax-y, 0px), 0)", color: "#F88379" }}
        >
          <svg viewBox="0 0 240 40" fill="none" focusable="false">
            <path
              d="M4 22 C 38 4, 66 38, 98 20 S 158 8, 196 20 L 236 20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Text & Action Column */}
        <div
          ref={textRevealRef}
          // Shown at rest without JavaScript (site-header.tsx's <noscript>).
          data-reveal=""
          className={cx(
            "mt-8 max-w-3xl transition-[transform,opacity] duration-[var(--duration-slow)] ease-[var(--ease-signature)] motion-reduce:translate-y-0 motion-reduce:opacity-100 sm:mt-10",
            revealed ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
          )}
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-3">
            <span
              aria-hidden="true"
              className="h-px w-6 bg-coral/60"
            />
            <p
              className="eyebrow !tracking-[0.2em] text-xs font-semibold uppercase !text-coral"
              style={{ color: "#F88379" }}
            >
              {finalCta.eyebrow}
            </p>
            <span
              aria-hidden="true"
              className="h-px w-6 bg-coral/60"
            />
          </div>

          {/* Statement Headline — explicitly styled with luminous ivory so global h2 styles never override it */}
          <h2
            id="final-cta-heading"
            className="mt-4 text-balance text-h2 font-semibold leading-[1.06] tracking-[var(--tracking-tight)] !text-[#FAF6F2]"
            style={{ color: "#FAF6F2" }}
          >
            {finalCta.statementLines.map((line, idx) => (
              <span
                key={line}
                className={cx("block text-[#FAF6F2]", idx === 1 && "serif-emphasis")}
                style={{ color: "#FAF6F2" }}
              >
                {line}
              </span>
            ))}
          </h2>

          {/* Supporting Statement */}
          <p
            className="mt-6 max-w-2xl text-lg leading-[1.7] !text-[#FAF6F2]/90 sm:text-xl"
            style={{ color: "rgba(250, 246, 242, 0.9)" }}
          >
            {finalCta.supporting}
          </p>

          {/* Prominent Dual CTAs — destinations and labels from finalCta
              (site-content.ts), which records why neither is a booking
              system or a wa.me link yet. */}
          <div className="mt-10 flex flex-col items-stretch gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-5">
            {/* Primary CTA Button */}
            <Button
              href={finalCta.primaryCta.href}
              variant="primary"
              className="min-h-[3.25rem] px-8 text-center justify-center rounded-xs shadow-md transition-all hover:bg-coral hover:shadow-lg sm:w-auto"
            >
              {finalCta.primaryCta.label}
            </Button>

            {/* Secondary CTA Outline Button — linking to verified contact details */}
            <Link
              href={finalCta.secondaryCta.href}
              className="group inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-xs border border-white/30 bg-white/[0.06] px-7 py-3.5 font-body text-sm font-semibold tracking-[0.08em] uppercase !text-[#FAF6F2] transition-all duration-200 hover:border-coral hover:bg-white/10 hover:!text-coral focus-visible:outline focus-visible:outline-2 focus-visible:outline-paper focus-visible:outline-offset-2"
              style={{ color: "#FAF6F2" }}
            >
              <span className="!text-[#FAF6F2] group-hover:!text-coral" style={{ color: "inherit" }}>
                {finalCta.secondaryCta.label}
              </span>
              <ArrowUpRight
                aria-hidden="true"
                className="size-4 text-paper/80 transition-all duration-200 ease-[var(--ease-signature)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-coral"
              />
            </Link>
          </div>

          {/* Reassuring Note */}
          <p
            className="mt-8 max-w-xl text-sm leading-[1.65] !text-[#FAF6F2]/70"
            style={{ color: "rgba(250, 246, 242, 0.7)" }}
          >
            {finalCta.note}
          </p>
        </div>
      </div>
    </section>
  );
}
