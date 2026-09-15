import type { SVGProps } from "react";

/**
 * A small, hand-authored pulse line — a quiet echo of the brand mark's
 * heartbeat stroke, at a scale meant for typographic sections (a divider,
 * not a watermark). Original linework, not a crop of the logo.
 */
export function QuietMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 64 20"
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path
        d="M1 11H21L26.5 3L32.5 18L37.5 8L41 11H63"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
