"use client";

/**
 * About page cinematic scroll-video system (Sections 01–04 only) —
 * isolated from the homepage's own motion (gsap-scroll.ts's `DESKTOP_QUERY`/
 * `SIGNATURE_EASE` are still reused as shared setup, but nothing here reads
 * or writes homepage state, and nothing homepage-side reads this file).
 * Pure, DOM-free helpers only — see about-cinematic-canvas.tsx for how
 * they're wired into one GSAP timeline + one `gsap.ticker` seek-smoother.
 */

/** The outer cinematic track's height, `lg:` and up only — see this
 * constant's own use in about-cinematic-canvas.tsx for why 320, not the
 * Phase 3 placeholder's 400: 400svh was an unstated visual-architecture
 * placeholder, never tuned against the real ~30s video. 320svh gives four
 * beats an average ~55vh of scroll each (at a 900px-tall viewport) —
 * enough room for a readable hold per beat without the sequence feeling
 * slow or trapped, confirmed via the real ~30.0s clip this drives (see
 * `mapAboutProgressToVideoTime` below). Kept as a named constant, not
 * inlined, so the one Tailwind arbitrary-height class that has to spell
 * it out literally (`h-[320svh]`, Tailwind can't read a JS constant) stays
 * next to the number it has to match by hand.
 */
export const ABOUT_TRACK_VH = 320;

/** This component's own desktop breakpoint — matches Tailwind's `lg`
 * (1024px) exactly, since the cinematic canvas's CSS visibility split
 * (`hidden motion-safe:lg:block` / `motion-safe:lg:hidden`, see the
 * component) is keyed to `lg`, not gsap-scroll.ts's shared `DESKTOP_QUERY`
 * (769px, tuned for the homepage's own sections). Using the homepage's
 * query here would let this component's JS activate at widths (769–1023px)
 * where its own desktop DOM is still CSS-hidden — a real mismatch, not
 * just an unused branch, since it would leave a ScrollTrigger and a
 * `gsap.ticker` seek-loop running against an invisible video. Local to
 * this file rather than added to gsap-scroll.ts, which stays untouched.
 */
export const ABOUT_DESKTOP_QUERY = "(min-width: 1024px)";

/**
 * Non-linear scroll-progress → video-`currentTime` mapping. The useful
 * content in the ~30s master isn't evenly distributed across its runtime
 * (per the approved shot list: a long reflective opening, a short
 * doorway/transition beat, a brief document handoff, then an extended
 * consultation/resolution) — a flat `progress * duration` would race
 * through the doorway/handoff beats and linger disproportionately on the
 * opening, unrelated to which text beat is actually dominant at that
 * point in the scroll.
 *
 * `SOURCE_BREAKPOINTS` are expressed against an *assumed* ~30s source
 * (matching the approved cut's own approximate visual timeline) and
 * scaled proportionally against the video's real, reported
 * `HTMLVideoElement.duration` (read from `loadedmetadata`, never
 * hard-coded — the real export measured 30.016s, not exactly 30.000)
 * before being applied, so the mapping still holds if a future re-export
 * runs slightly long or short.
 */
const SOURCE_BREAKPOINTS = [
  { p: 0.0, t: 0 },
  { p: 0.28, t: 11 },
  { p: 0.48, t: 17 },
  { p: 0.6, t: 20 },
  { p: 0.9, t: 28 },
  { p: 1.0, t: 30 },
] as const;

const ASSUMED_SOURCE_DURATION = 30;

export function mapAboutProgressToVideoTime(progress: number, duration: number): number {
  if (!Number.isFinite(duration) || duration <= 0) return 0;
  const p = Math.min(1, Math.max(0, progress));
  const scale = duration / ASSUMED_SOURCE_DURATION;

  for (let i = 0; i < SOURCE_BREAKPOINTS.length - 1; i++) {
    const a = SOURCE_BREAKPOINTS[i];
    const b = SOURCE_BREAKPOINTS[i + 1];
    if (p <= b.p) {
      const segmentT = b.p === a.p ? 0 : (p - a.p) / (b.p - a.p);
      const sourceTime = a.t + (b.t - a.t) * segmentT;
      return Math.min(duration, sourceTime * scale);
    }
  }
  return duration;
}

/**
 * Each beat's own enter/hold/exit as fractions of the cinematic timeline's
 * own 0→1 progress (the same numbers the GSAP timeline below is authored
 * against — see about-cinematic-canvas.tsx). Adjacent beats overlap by a
 * few percent (one exiting while the next enters) rather than meeting at a
 * single point, so there's never a frame where both are at zero opacity —
 * the same "short, deliberate overlap, not a sequential handoff" pattern
 * philosophy-section.tsx already established for its own beat handoffs.
 *
 * Belief has no small hold by accident: `0.50–0.73` (0.23 of the full
 * track) is deliberately the widest fully-settled window of the four,
 * matching the brief's "give this beat the strongest readable hold — the
 * emotional resolution." Founder has no `exit` at all: it holds all the
 * way to `1.0`, where the cinematic stage's own physical release (a
 * `position: sticky` box clearing the viewport, not a scripted fade) is
 * what actually removes it from view — see the component's own doc
 * comment on the founder handoff.
 */
export const ABOUT_BEAT_PHASES = {
  hero: { enter: [0.0, 0.04], exit: [0.22, 0.26] },
  problem: { enter: [0.24, 0.29], exit: [0.44, 0.48] },
  belief: { enter: [0.46, 0.5], exit: [0.73, 0.77] },
  founderIntro: { enter: [0.75, 0.79], exit: null },
} as const;
