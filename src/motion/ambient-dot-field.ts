/**
 * Ambient DotField — every setting the shared post-hero background texture
 * uses (src/components/ui/backgrounds/dot-field.tsx, wrapped by
 * src/components/layout/dot-field-region.tsx). Sections and routes never
 * set these inline — they import from here, same discipline as the rest
 * of src/motion (see image-motion.ts, scroll-scenes.ts,
 * section-transitions.ts).
 *
 * Adapted from a supplied React Bits DotField source. The numbers below
 * are deliberately far more restrained than that component's defaults —
 * see docs/implementation-brief.md for the full before/after — because
 * this is ambient texture behind an editorial page, not an interactive
 * tech-product feature.
 */

/**
 * Canvas can't read CSS custom properties directly (`ctx.fillStyle =
 * "var(--x)"` is not resolved). This names which token to resolve at
 * runtime instead — see `resolveTokenColor` in dot-field.tsx — with an
 * alpha applied on top of it. Keeping the token *name* here rather than a
 * baked hex means these stay correct automatically if tokens.css ever
 * changes, and it's how "confirmed Birthwave tokens only" is actually
 * enforced rather than just promised in a comment.
 */
export interface DotFieldColorToken {
  /** A custom property defined in src/styles/tokens.css. */
  token: string;
  /** 0–1, applied when resolving the token to a canvas-usable color. */
  alpha: number;
}

/**
 * `--color-coral` (#f88379, confirmed brand accent — the peach/coral hue
 * from the brand guide's own palette page) fading toward `--color-ink-soft`
 * (#5b4a43, confirmed muted body-text neutral) — both real tokens from
 * src/styles/tokens.css, nothing baked or guessed. Coral carries the field:
 * it's the one confirmed hue that reads unmistakably as the brand's warm
 * blush/peach accent rather than a generic neutral. Ink-soft only ever
 * appears at the far ("depth") end of the gradient, never as the dominant
 * tone. No blue (`--color-sky` is deliberately excluded), no purple, no
 * black/grey default, no invented hex.
 *
 * Alphas (this darken-slightly pass): coral `0.22` → `0.32` — a measured
 * step, not a guess, picked so dots read immediately at normal zoom while
 * staying visibly softer than heading/body ink (see
 * docs/implementation-brief.md §20 for the contrast re-check this was
 * verified against — text contrast and paper brightness are both
 * untouched by this, since only the dots' own alpha changed). Ink-soft
 * `0.1` → `0.13`, within the requested ≤0.14 ceiling — a small nudge so
 * the "depth" end of the gradient (only ever reached near the very bottom
 * of the whole region, by FAQ) keeps pace with the stronger coral rather
 * than reading flat by comparison, without becoming its own competing
 * tone.
 */
export const dotFieldColorTokens = {
  gradientFrom: { token: "--color-coral", alpha: 0.32 } satisfies DotFieldColorToken,
  gradientTo: { token: "--color-ink-soft", alpha: 0.13 } satisfies DotFieldColorToken,
  /** Unused while glowRadius is 0 below — named now so turning the glow
   * back on later is a settings change, not a color guess. */
  glow: { token: "--color-coral", alpha: 0.3 } satisfies DotFieldColorToken,
} as const;

/**
 * Every non-color DotField prop. Colors (above) are locked/approved and
 * untouched here — this is a visibility-only pass. The previous values
 * (dotRadius 0.75, dotSpacing 28, bulgeStrength 6, cursorRadius 150,
 * waveAmplitude 0.2) produced dots too small to resolve as individual
 * circles at normal zoom — the field only ever read as a soft color wash,
 * never as dots.
 *
 * dotRadius went further than the brief's 1.4 starting point: dot-field.tsx
 * draws each dot at `dotRadius / 2` (see its `rad = propsRef.current
 * .dotRadius / 2`, both in `drawStatic` and the animation loop) — an
 * architectural detail in a file this task doesn't touch. At 1.4 that's a
 * 0.7px drawn radius (1.4px diameter), confirmed via a real normal-scale
 * screenshot to still read as an indistinct wash, not dots. 6.5 draws at a
 * 3.25px radius (6.5px diameter) — confirmed via screenshot (see
 * docs/implementation-brief.md §17) to resolve as individually visible,
 * elegant coral circles at normal zoom, still small and quiet. Spacing
 * stays at the brief's 22. Bulge, cursor radius, and wave amplitude are
 * all pulled back so the larger dots still move gently, not like a
 * reactive tech surface. glowRadius stays 0 and sparkle stays false — no
 * glow, no sparkle, per the brief.
 *
 * The `flow*` settings below (§22) replace §21's `breath*` entirely — the
 * breath (radius + batched-opacity pulse) read as dots individually
 * breathing/pulsing rather than one continuous field, per direct
 * feedback. This is a different kind of motion, not a retuning: position
 * only, no radius or opacity change at all, and a much larger spatial
 * wavelength so neighboring dots move together rather than each dot
 * having its own visibly separate pulse. Every number driving it in
 * dot-field.tsx's `tick()` is named and centralized here:
 *
 * - `flowAmplitudeX` (5px) / `flowAmplitudeY` (8px): peak position
 *   displacement on each axis. Pushed ~65% past the requested 3px/5px
 *   starting values (same 3:5 ratio kept) after measuring the starting
 *   values directly: at 3/5, a single row's y-position swept only ~11px
 *   peak-to-trough across the viewport (confirmed by detecting actual
 *   dot-center pixels, not eyeballed) — real, correctly travelling, but
 *   this session has twice already had a motion pass rejected as reading
 *   as static despite being real underneath, so this pushes further
 *   before calling it done rather than risk a third. Both axes share one
 *   phase (`Math.sin(...)`), so each dot moves back and forth along one
 *   diagonal line, not an ellipse — a "diagonal/vertical wave path", per
 *   the brief.
 * - `flowCycleSeconds` (6): full cycle length — exactly as requested.
 * - `flowWavelengthPx` (450): the travelling wave's spatial wavelength —
 *   within the requested 400–500px range. Roughly 3 cycles span a normal
 *   1440px viewport, broad enough that a straight row of dots reads as
 *   one gentle sine bend, not a busy ripple — this is what makes
 *   neighboring dots move "together as part of one soft travelling
 *   field" instead of each dot looking independently animated.
 * - `flowDirectionDeg` (-45): canvas-angle convention (0 = +x/right, 90 =
 *   +y/down), so -45 points right-and-up — lower-left toward upper-right,
 *   as requested. Confirmed by screenshot which way the pattern actually
 *   travels (see docs/implementation-brief.md §22), not assumed from the
 *   sign of the formula alone.
 *
 * `dot-field.tsx`'s `prefers-reduced-motion` branch never starts the
 * animation loop at all (draws once, static) — inherited unchanged, and
 * re-verified this pass — and the same tab-hidden/off-screen pause logic,
 * DPR cap, and single-instance architecture all wrap this loop too,
 * untouched. See docs/implementation-brief.md §22 for the recording-based
 * verification this was checked against — explicitly not pixel-diff
 * statistics, per the brief.
 */
export const dotFieldSettings = {
  dotRadius: 6.5,
  dotSpacing: 22,
  bulgeOnly: true,
  bulgeStrength: 4,
  cursorRadius: 130,
  cursorForce: 0.08,
  glowRadius: 0,
  sparkle: false,
  flowAmplitudeX: 5,
  flowAmplitudeY: 8,
  flowCycleSeconds: 6,
  flowWavelengthPx: 450,
  flowDirectionDeg: -45,
} as const;

/** The region's own opacity — a second, coarser knob on top of the
 * already-low gradient alpha above. Dropped 0.7 → 0.4 in the homepage
 * rework: the dot field used to wrap five sections (Purpose through FAQ);
 * per that rework's brief the repeated dotted background was "too
 * dominant" and "makes the page feel templated," so it's now used in
 * exactly one place (FAQ only — see page.tsx) and, per the same brief,
 * kept to "a very low-opacity texture" there rather than the same
 * strength it read at when carrying five sections' worth of texture. */
export const dotFieldRegionOpacity = 0.4;

/**
 * How far the shared region's own top/bottom edges fade to transparent —
 * reuses the exact same fade-distance tokens the section-tint system uses
 * (see section-transitions.ts), so the field's own edges read as part of
 * the same "one continuous world" as everything else, not a second,
 * unrelated fade system.
 */
export const dotFieldEdgeFade = {
  top: "var(--space-fade-strong)",
  bottom: "var(--space-fade-strong)",
} as const;
