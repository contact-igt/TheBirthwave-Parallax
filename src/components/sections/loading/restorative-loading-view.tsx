"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface LoadingViewProps {
  /** Status announcement text. Default: "Loading The Birthwave…" */
  status?: string;
  /** Navigation destination for the preview helper. Default: "/" */
  targetHref?: string;
  /** Whether to show the subtle preview return link. Default: true for preview page */
  showReturnLink?: boolean;
  /** Additional wrapper class names */
  className?: string;
}

/**
 * The Birthwave Loading Component
 *
 * Requirements:
 * - Clean, professional, responsive loading view.
 * - Warm ivory background (#FAF6F2 / bg-paper).
 * - Original Birthwave logo, sharp and correctly proportioned.
 * - Subtle circular/orbital animation with Terracotta (#CA9585), Sky Blue (#5DAEDB), and Coral (#F88379) accents.
 * - Exactly one short status: "Loading The Birthwave…" in Plus Jakarta Sans.
 * - Centered composition with comfortable spacing across 360px, 390px, 768px, and 1440px.
 * - Removed: clinical claims, quotes, breathing cues, footer badges, triage links, fake progress percentages.
 * - Accessibility: aria-live="polite", decorative SVG aria-hidden, full prefers-reduced-motion support.
 */
export function RestorativeLoadingView({
  status = "Loading The Birthwave…",
  targetHref = "/",
  showReturnLink = true,
  className = "",
}: LoadingViewProps) {
  return (
    <div
      className={`min-h-screen w-full bg-paper text-ink relative flex flex-col justify-between items-center px-6 py-10 sm:py-16 overflow-hidden select-none ${className}`}
      style={{
        backgroundColor: "var(--color-paper, #fbf4f1)",
      }}
    >
      {/* Subtle warm ambient radial light in background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center"
      >
        <div className="w-[520px] h-[520px] sm:w-[680px] sm:h-[680px] rounded-full bg-[radial-gradient(circle,rgba(202,149,133,0.08)_0%,rgba(93,174,219,0.04)_45%,transparent_70%)] blur-2xl" />
      </div>

      {/* Invisible spacer for vertical optical centering */}
      <div className="w-full h-8 sm:h-12 pointer-events-none" aria-hidden="true" />

      {/* Main Centered Loading Card */}
      <main className="w-full max-w-md mx-auto my-auto flex flex-col items-center text-center z-10 px-4">
        {/* Brand Logo Lockup — Sharp & Correctly Proportioned */}
        <div className="relative mb-8 sm:mb-10">
          <Image
            src="/brand/wordmark-mauve.png"
            alt="The Birthwave"
            width={240}
            height={118}
            priority
            className="h-auto w-36 sm:w-44 lg:w-48 object-contain transition-opacity duration-300"
          />
        </div>

        {/* Small, Subtle Circular/Orbital Animation */}
        <div
          aria-hidden="true"
          className="relative size-16 sm:size-20 flex items-center justify-center mb-6 sm:mb-7"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute inset-0 rounded-full bg-terracotta/10 blur-md pointer-events-none motion-reduce:hidden animate-[orbit-pulse_3.6s_ease-in-out_infinite]" />

          {/* SVG Orbital Assembly */}
          <svg
            className="size-full overflow-visible"
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Primary Arc Gradient: Terracotta to Coral */}
              <linearGradient id="orbit-gradient-primary" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#CA9585" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#F88379" stopOpacity="0.85" />
              </linearGradient>

              {/* Secondary Arc Gradient: Coral to Sky Blue */}
              <linearGradient id="orbit-gradient-secondary" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#5DAEDB" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#CA9585" stopOpacity="0.4" />
              </linearGradient>
            </defs>

            {/* Static Outer Track Ring (Subtle hairline) */}
            <circle
              cx="40"
              cy="40"
              r="34"
              stroke="#CA9585"
              strokeOpacity="0.18"
              strokeWidth="1.25"
            />

            {/* Static Inner Track Ring */}
            <circle
              cx="40"
              cy="40"
              r="22"
              stroke="#5DAEDB"
              strokeOpacity="0.14"
              strokeWidth="1"
              strokeDasharray="2 4"
            />

            {/* Outer Orbital Rotating Arc (Clockwise) */}
            <g className="origin-center animate-[orbit-spin_3.2s_cubic-bezier(0.45,0.05,0.55,0.95)_infinite] motion-reduce:animate-none">
              <circle
                cx="40"
                cy="40"
                r="34"
                stroke="url(#orbit-gradient-primary)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="42 172"
              />
              {/* Outer Satellite Particle: Coral (#F88379) */}
              <circle
                cx="74"
                cy="40"
                r="3"
                fill="#F88379"
                className="drop-shadow-[0_0_4px_rgba(248,131,121,0.5)]"
              />
            </g>

            {/* Inner Counter-Rotating Orbit (Counter-Clockwise) */}
            <g className="origin-center animate-[orbit-reverse_4.6s_cubic-bezier(0.45,0.05,0.55,0.95)_infinite] motion-reduce:animate-none">
              <circle
                cx="40"
                cy="40"
                r="22"
                stroke="url(#orbit-gradient-secondary)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray="28 110"
              />
              {/* Inner Satellite Particle: Sky Blue (#5DAEDB) */}
              <circle
                cx="18"
                cy="40"
                r="2.5"
                fill="#5DAEDB"
                className="drop-shadow-[0_0_3px_rgba(93,174,219,0.45)]"
              />
            </g>

            {/* Central Harmonic Anchor Dot: Terracotta (#CA9585) */}
            <circle
              cx="40"
              cy="40"
              r="2.5"
              fill="#CA9585"
              fillOpacity="0.85"
              className="animate-[orbit-pulse_2.8s_ease-in-out_infinite] motion-reduce:animate-none"
            />
          </svg>
        </div>

        {/* Status Announcement — Plus Jakarta Sans, Politely Announced */}
        <p
          role="status"
          aria-live="polite"
          className="font-body text-sm sm:text-[0.9375rem] font-medium tracking-[0.02em] text-ink-soft leading-normal"
        >
          {status}
        </p>
      </main>

      {/* Bottom Preview Helper — Allows easy return to site from the preview route */}
      <footer className="w-full flex justify-center z-10 pt-4">
        {showReturnLink && (
          <Link
            href={targetHref}
            className="group inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-body text-xs font-medium text-ink-soft/75 hover:text-ink hover:bg-black/[0.03] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink focus-visible:outline-offset-2"
          >
            <ArrowLeft
              aria-hidden="true"
              className="size-3.5 transition-transform duration-200 group-hover:-translate-x-0.5 text-terracotta"
            />
            <span>Return to Homepage</span>
          </Link>
        )}
      </footer>

      {/* Scoped CSS Keyframes for the orbital rotations */}
      <style jsx global>{`
        @keyframes orbit-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes orbit-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }
        @keyframes orbit-pulse {
          0%,
          100% {
            transform: scale(0.92);
            opacity: 0.55;
          }
          50% {
            transform: scale(1.06);
            opacity: 0.95;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[orbit-spin_3\\.2s_cubic-bezier\\(0\\.45\\,0\\.05\\,0\\.55\\,0\\.95\\)_infinite\\],
          .animate-\\[orbit-reverse_4\\.6s_cubic-bezier\\(0\\.45\\,0\\.05\\,0\\.55\\,0\\.95\\)_infinite\\],
          .animate-\\[orbit-pulse_2\\.8s_ease-in-out_infinite\\],
          .animate-\\[orbit-pulse_3\\.6s_ease-in-out_infinite\\] {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}

/**
 * Named alias for future imports
 */
export { RestorativeLoadingView as BirthwaveLoadingView };
