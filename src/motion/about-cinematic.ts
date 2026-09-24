"use client";

/**
 * About page cinematic constants — UPDATED for 180-frame canvas sequence.
 *
 * `ABOUT_TRACK_VH` was 320 (tuned for the ~30s scroll-video system). Updated
 * to 400 for the frame sequence: 180 frames across 400svh gives ~2.2svh per
 * frame, a smooth progression at normal scroll speeds without an excessively
 * long pin. Desktop uses 400, tablet 330, mobile 270.
 *
 * `mapAboutProgressToVideoTime` and the video-specific `SOURCE_BREAKPOINTS`
 * are retired — the canvas system maps progress linearly to frame index
 * (`Math.round(progress * (FRAME_COUNT - 1))`). No non-linear mapping is
 * needed: each frame IS one moment in time, unlike a video whose useful
 * content was unevenly distributed. The function is kept for the build
 * to not break any import, but is no longer called at runtime.
 *
 * `ABOUT_BEAT_PHASES` and `ABOUT_DESKTOP_QUERY` are unchanged — the same
 * text-beat fractions drive the same overlay opacity/y tweens on the same
 * GSAP timeline; only the background medium changes (canvas vs. video).
 */

export const ABOUT_TRACK_VH = 400;

export const ABOUT_DESKTOP_QUERY = "(min-width: 1024px)";

/**
 * Chapter frame windows — used by the canvas component for beat-phase
 * alignment. Expressed as frame indices (0-based) into the 180-frame sequence.
 * The scroll-to-beat mapping (ABOUT_BEAT_PHASES) is independently authored
 * in fractions of the full 0→1 progress, so these windows are informational
 * context for QA and tuning, not imperatively read by the timeline.
 *
 *   Chapter 1 (Hero):         frames  0–34   (indices 0–34)
 *   Transition 1:             frames 35–44   (indices 35–44)
 *   Chapter 2 (Problem):      frames 45–79   (indices 45–79)
 *   Transition 2:             frames 80–89   (indices 80–89)
 *   Chapter 3 (Belief):       frames 90–124  (indices 90–124)
 *   Transition 3:             frames 125–134 (indices 125–134)
 *   Chapter 4 (Founder):      frames 135–169 (indices 135–169)
 *   Exit transition:          frames 170–179 (indices 170–179)
 */
export const ABOUT_CHAPTER_FRAMES = {
  hero:        { start: 0,   end: 34  },
  transition1: { start: 35,  end: 44  },
  problem:     { start: 45,  end: 79  },
  transition2: { start: 80,  end: 89  },
  belief:      { start: 90,  end: 124 },
  transition3: { start: 125, end: 134 },
  founderIntro:{ start: 135, end: 169 },
  exit:        { start: 170, end: 179 },
} as const;

export const ABOUT_BEAT_PHASES = {
  hero:        { enter: [0.0,  0.04] as const, exit: [0.22, 0.26] as const },
  problem:     { enter: [0.24, 0.29] as const, exit: [0.44, 0.48] as const },
  belief:      { enter: [0.46, 0.5]  as const, exit: [0.73, 0.77] as const },
  founderIntro:{ enter: [0.75, 0.79] as const, exit: null },
} as const;

/** Kept for backward-compatibility — no longer called at runtime. */
export function mapAboutProgressToVideoTime(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _p: number,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _d: number,
): number {
  return 0;
}
