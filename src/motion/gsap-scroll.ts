"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Shared GSAP/ScrollTrigger setup for the three pinned "cinematic" scroll
 * scenes on the homepage — Philosophy, Journey, and Immersive (the dark
 * emotional scene, brought into this system in the interaction-correction
 * pass, docs/implementation-brief.md §25). Every other motion primitive on
 * the site (parallax, reveal-on-scroll, wipe transitions, Care's
 * dominant/quiet toggle) is still the existing hand-rolled
 * IntersectionObserver/rAF system in image-motion.ts and scroll-scenes.ts,
 * untouched. GSAP is scoped to these three sections because they need true
 * scroll-scrubbed pinning and progress-driven SVG/colour tweens, which that
 * hand-rolled system was never built for.
 *
 * Registered once, lazily, only on the client — never during SSR, and
 * never twice (React StrictMode/fast refresh can otherwise call a module's
 * top-level code more than once in dev).
 */
let registered = false;
export function ensureScrollTriggerRegistered() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

export { gsap, ScrollTrigger };

/** The exact breakpoint the rest of src/motion already uses (see
 * `minViewportWidth` defaults in image-motion.ts) — the three GSAP scenes
 * key their own `ScrollTrigger.matchMedia()` desktop/mobile split to the
 * same number so "desktop" means the same thing everywhere on the site. */
export const DESKTOP_QUERY = "(min-width: 769px)";

/** The site's signature ease (`--ease-signature` in tokens.css is
 * `cubic-bezier(0.22, 1, 0.36, 1)`) expressed as a literal GSAP ease
 * string — GSAP can't read a CSS custom property, so this is the same
 * curve re-declared here rather than a different one chosen by feel. */
export const SIGNATURE_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
