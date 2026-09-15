"use client";

/**
 * Doctors page — MASTER horizontal parallax journey. Pure, DOM-light
 * helpers shared by `doctors-master-journey.tsx`; the actual GSAP wiring
 * (one ScrollTrigger, one pin, one `x` tween/timeline as the sole
 * horizontal-transform owner) lives in that component, matching the split
 * `about-cinematic.ts`/`about-cinematic-canvas.tsx` already established
 * for the About page's own motion system.
 *
 * Scope note (premium horizontal-parallax rework): this file previously
 * backed a *smaller* horizontal system scoped to the doctor list alone
 * (Section 02 only), with Hero/Consult/Multidisciplinary Care/CTA as
 * separate normal-flow sections around it. This rework folds ALL of
 * those into the one pinned horizontal track — "everything from Hero
 * through the closing form belongs to the same horizontal journey," per
 * the brief — so every constant below now describes the master track,
 * not a doctor-only sub-journey. Below `lg`, and under
 * `prefers-reduced-motion: reduce` at any width, none of this file's
 * math ever runs — the existing standalone section components
 * (`doctors-hero.tsx`, `who-should-you-consult.tsx`,
 * `multidisciplinary-care.tsx`, `doctors-appointment-cta.tsx`) plus a new
 * form section render as an ordinary stacked page instead. See
 * `doctors-master-journey.tsx`'s own top comment for the full split.
 */

/** Below this width the pinned horizontal track never engages. Matches
 * Tailwind's `lg` (1024px), not `gsap-scroll.ts`'s shared `DESKTOP_QUERY`
 * (769px, tuned for the homepage's own sections) — a horizontal journey
 * needs real width to read as spacious rather than cramped, and this
 * page's own CSS visibility split (`hidden motion-safe:lg:block` /
 * `motion-safe:lg:hidden`) is keyed to the same `lg` boundary, so the
 * JS pin and the CSS that sizes its content never disagree. */
export const DOCTORS_DESKTOP_QUERY = "(min-width: 1024px)";

/** A single doctor scene needs at least this many siblings before a
 * pinned "journey" of *doctors specifically* means anything — but the
 * master track itself always runs once real widths exist (Hero, Allied
 * Care, Consult, CTA and the Form are always present regardless of
 * doctor count). Below this, the track still renders the one known
 * doctor as a real scene, it just never cycles through five layout
 * variants for a roster of one. */
export const MIN_DOCTORS_FOR_VARIANT_CYCLE = 2;

/** The final hold once the form panel has fully arrived: this fraction of
 * the ScrollTrigger's own total scroll range produces ZERO further
 * horizontal movement, so a visitor can click into fields, tab between
 * them and submit without the page still sliding sideways under the
 * cursor — "user must comfortably click fields, tab, type, select,
 * submit," per the brief. Implemented as a real scroll-distance hold
 * (see `doctors-master-journey.tsx`), not a visual illusion: the track's
 * own `x` travel completes at `TRACK_TRAVEL_FRACTION` of the trigger's
 * total range and a `.set()` anchor holds it there for the rest. 0.15
 * lands inside the requested 12–18%.
 *
 * This is the ONLY reserved-distance mechanism for the closing hold — an
 * earlier draft also appended a trailing blank spacer `<div>` to the
 * track itself (inherited from this file's previous, doctor-list-only
 * scope), which produced a real, confirmed-via-QA framing bug: `x`'s
 * mechanical end (`-track.scrollWidth + viewportWidth`) then aligned the
 * *spacer's* trailing edge with the viewport's right edge, not the Form
 * panel's — the resting frame showed a blank strip on the right and cut
 * off the form's own left portion by contrast. Dropping the spacer and
 * computing `distance` from real content only (see
 * `doctors-master-journey.tsx`'s own `getDistance`) fixes this: the
 * timeline's `x` target now naturally rests with the Form panel's own
 * trailing edge flush against the viewport, and the dwell fraction below
 * supplies the extra hold-still scroll room instead. */
export const FORM_DWELL_FRACTION = 0.15;

/** The fraction of the ScrollTrigger's own total range the track's `x`
 * travel actually spans before the hold above takes over. */
export const TRACK_TRAVEL_FRACTION = 1 - FORM_DWELL_FRACTION;

/**
 * Per-layer relative-speed reference, exactly as the brief frames it
 * ("master track speed = 1.00; primary portrait ~0.88–0.94; …") — kept
 * here as documentation of *intent* even though the actual per-frame
 * offsets below are computed as clamped, normalized pixel drifts (see
 * `sceneParallaxOffsets`) rather than raw `distance * (1 - rate)`: an
 * unclamped rate-based offset grows without bound for a scene sitting far
 * from centre on a long multi-panel track (the Allied Care chapter alone
 * is ~125vw), which would show as excessive, unrestrained drift while a
 * scene is still queued off-screen. The two are equivalent near centre;
 * clamping only bounds the extremes, which is what "keep travel
 * restrained" asks for.
 */
export const PARALLAX_SPEED_REFERENCE = {
  masterTrack: 1.0,
  primaryPortrait: 0.91,
  secondaryImage: 0.83,
  textContent: 0.99,
  indexNumber: 1.11,
  backgroundWord: 1.14,
  // Reduced from 0.88 (connecting-line/direction-thread rework): at 0.88
  // the line could lag far enough behind the track (12% of the full
  // scroll distance, which on this track is several hundred pixels) that
  // its own visible portion no longer lined up with the actual scene
  // transition it was meant to mark — the line's positional read and its
  // new hold/travel opacity read (see CONNECTING_LINE_* below) could
  // disagree about "where" the journey currently is. 0.96 keeps a hint of
  // depth without meaningfully decoupling the two. Per the brief: content
  // readability and correctness take priority over preserving an existing
  // value merely because it was already there.
  connectingLine: 0.96,
} as const;

/** Concrete per-layer drift, in px, at the clamp's own extreme
 * (`normalizedDelta = ±1`) — tuned by feel against
 * `PARALLAX_SPEED_REFERENCE`'s relative ordering (secondary image drifts
 * further than the primary portrait; the background word and index
 * number lead furthest since they read as closest/foreground). Negative
 * = lags behind the track (reads as further back); positive = leads
 * ahead (reads as closer). */
export const SCENE_PARALLAX_PX = {
  primaryPortrait: -30,
  secondaryImage: -40,
  textContent: -10,
  indexNumber: 55,
  backgroundWord: 45,
  connectingLine: -16,
} as const;

/** How many pixels of viewport-centre distance it takes to reach the full
 * drift above — a fraction of a typical scene width, not the whole
 * track, so the drift reads as "this scene arriving/departing," not a
 * slow background creep the entire time it's queued off-screen. */
export const PARALLAX_NORMALIZE_RANGE_PX = 640;

/** Portrait reveal as a scene approaches centre — scale and opacity only,
 * no rotation, no aggressive zoom, no blur. Values match the brief's own
 * "1.045 → 1.00 / 0.80 → 1" almost exactly. */
export const PORTRAIT_REST = {
  scale: 1.045,
  opacity: 0.8,
} as const;

/** How many pixels of viewport-centre distance the reveal above spans. */
export const ACTIVATION_RANGE_PX = 520;

/** Clamped linear interpolation, 0 at `range` or beyond, 1 at 0 — the one
 * calculation the portrait-reveal above needs, applied to a scene's own
 * current distance from the viewport's horizontal centre (read fresh from
 * `getBoundingClientRect()` every tick, not recomputed by hand). */
export function activation(distanceFromCenterPx: number, range: number = ACTIVATION_RANGE_PX): number {
  return 1 - Math.min(1, Math.abs(distanceFromCenterPx) / range);
}

/** Clamped, signed -1..1 normalization of a scene's viewport-centre
 * distance — the shared input every per-layer drift in
 * `SCENE_PARALLAX_PX` is multiplied against. */
export function normalizedDelta(distanceFromCenterPx: number, range: number = PARALLAX_NORMALIZE_RANGE_PX): number {
  return Math.max(-1, Math.min(1, distanceFromCenterPx / range));
}

/**
 * The master track's own connecting line — an original horizontal thread,
 * not Journey's vertical zig-zag or Final CTA's resolved flat line copied
 * sideways. A gentle, symmetric crest/trough wave that repeats once per
 * "cell" (`CONNECTING_LINE_CELL_WIDTH` viewBox units), stretched to the
 * track's real pixel width via `preserveAspectRatio="none"` — the same
 * "author proportional viewBox units, stretch to the real rendered size"
 * technique `journey-section.tsx`'s own path already uses, just a
 * different (horizontal, wave-not-zigzag) shape. Pure path-string math,
 * no DOM — the component only needs to know how many cells to generate.
 */
export const CONNECTING_LINE_CELL_WIDTH = 100;
export const CONNECTING_LINE_VIEWBOX_HEIGHT = 160;

export function buildConnectingLinePath(cellCount: number): string {
  const baseline = CONNECTING_LINE_VIEWBOX_HEIGHT / 2;
  const amplitude = CONNECTING_LINE_VIEWBOX_HEIGHT * 0.25;
  let d = `M 0 ${baseline}`;
  for (let i = 0; i < cellCount; i++) {
    const x0 = i * CONNECTING_LINE_CELL_WIDTH;
    const midY = i % 2 === 0 ? baseline - amplitude : baseline + amplitude;
    const x1 = x0 + CONNECTING_LINE_CELL_WIDTH * 0.25;
    const x2 = x0 + CONNECTING_LINE_CELL_WIDTH * 0.75;
    const x3 = x0 + CONNECTING_LINE_CELL_WIDTH;
    d += ` C ${x1} ${midY}, ${x2} ${midY}, ${x3} ${baseline}`;
  }
  return d;
}

/**
 * Direction-thread rework — the connecting line's HOLD/TRAVEL rhythm.
 * Geometry (the path above) is unchanged; what changes is how much of it
 * is actually drawn/visible at any moment, driven entirely by the same
 * per-scene `activation()` values `doctors-master-journey.tsx` already
 * computes each tick for portrait settle — no second progress source.
 *
 * The line now renders as two strokes sharing one `d`:
 *   - a BASE trace, revealed from the start via stroke-dasharray/
 *     dashoffset as `trackProgress` advances (a real "line draw," not a
 *     translated copy) — reads as the journey's own PAST, at a constant,
 *     quiet opacity.
 *   - a HIGHLIGHT window, a short "on" dash riding the same path, whose
 *     position tracks the current draw-point and whose OPACITY is driven
 *     by `transitionActivation = 1 - max(activation of every scene)` —
 *     near-invisible while any one scene is centered (HOLD), rising to
 *     its strongest as scroll moves between two scenes (TRAVEL), then
 *     settling again as the next scene arrives. This is the literal
 *     "sceneActivation = 1 when centered; transitionActivation = 1 -
 *     sceneActivation" formula the brief describes, generalized across
 *     however many scenes exist via one `Math.max`.
 *
 * `ACTIVATION_RANGE_PX` (already established, reused unchanged) is what
 * makes this "use actual scene geometry, not page percentages": it's
 * applied to each scene's own real `getBoundingClientRect()` distance
 * from viewport centre, so a scene's own width already shapes how long it
 * reads as HOLD vs TRAVEL without a separate per-panel timing table.
 */
export const CONNECTING_LINE_HOLD_OPACITY = 0.24;
export const CONNECTING_LINE_TRAVEL_OPACITY = 0.65;
/** The BASE (past-trace) stroke's own constant opacity — deliberately at
 * the quiet end of the HOLD range: "past" should read as a settled
 * record of ground already covered, not something competing for
 * attention the way the travelling HIGHLIGHT is meant to. */
export const CONNECTING_LINE_BASE_OPACITY = 0.2;
/** The HIGHLIGHT window's length, as a fraction of the path's own total
 * length — long enough to read as a deliberate travelling segment, short
 * enough that it never spans more than roughly one scene-to-scene gap. */
export const CONNECTING_LINE_HIGHLIGHT_FRACTION = 0.22;

/**
 * Alignment + thread-safe-zone rework — the connecting line's whole
 * vertical position, not just its horizontal masking, is what actually
 * keeps it clear of readable content now.
 *
 * The previous approach lived at mid-screen (`top-[30%] h-[30%]`, i.e.
 * squarely inside every scene's own vertically-centered content band)
 * and tried to dodge content with a horizontal-only vignette that hid
 * the *middle* third of the viewport and showed the line at the *edges*.
 * That was backwards for how these scenes are actually built: every
 * scene puts its readable text (and usually its media too) in the left
 * and right thirds, with the open gap *between* them — so a mask that
 * hides the middle and shows the edges guarantees the line paints
 * exactly where the text and portraits already are. Confirmed on real
 * screenshots, not assumed: the line was visibly crossing Hero's own
 * headline, the doctor scene's name/credentials block, and the Consult
 * concern-list rows — all of them sitting in the "visible" edge zones
 * the old mask defined.
 *
 * The fix moves the whole thread down into genuine negative space below
 * the content band instead of trying to dodge content horizontally at
 * all — "below the main content," one of the two placements the brief
 * itself sanctions, and the one that holds for every scene layout
 * uniformly (text-left/media-right, text-right/media-left, full-bleed,
 * centered) without needing per-scene knowledge. `THREAD_BAND_TOP_PERCENT`
 * paired with the media-height trims in doctors-journey-scenes.tsx (each
 * scene's own portrait/media block pulled in from ~74–80% of the scene
 * height to ~60–64%) is what actually makes this safe: at the old
 * heights several scenes' own media blocks extended down to ~87–90% of
 * the viewport, which would have put a "below content" band in direct
 * conflict with the portrait itself. The horizontal mask below is now
 * ONLY a soft edge-fade for visual polish (softening the thread's own
 * entry/exit at the pin's left/right edges), not a safety mechanism —
 * content safety comes entirely from the vertical placement now.
 */
export const THREAD_BAND_TOP_PERCENT = 85;
export const THREAD_BAND_HEIGHT_PERCENT = 6;

export const CONNECTING_LINE_SAFE_ZONE_MASK =
  "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)";

/**
 * Alignment + thread-safe-zone rework — shared scene layout tokens.
 * Every desktop-track scene that pairs text with media (Hero, the five
 * DoctorScene variants, Allied/Connected) reads its own inter-column gap
 * and its media block's own height percentage from these two values
 * instead of a one-off `gap-10`/`h-[74%]`/`h-[80%]` per scene — the
 * "one shared grid, not one-off margins" requirement. Exposed as CSS
 * custom properties on the pin container (`doctors-master-journey.tsx`)
 * and consumed via `gap-[var(--doctor-scene-gap)]` /
 * `h-[var(--doctor-media-height)]` in doctors-journey-scenes.tsx, so a
 * single change here retunes every scene at once.
 *
 * `DOCTOR_SCENE_GAP` targets the brief's own "48–96px visible gap at
 * 1440" — `clamp()` keeps it inside that range from roughly 1024px (the
 * `lg` floor this whole track requires) up through ultra-wide desktops,
 * rather than a fixed px value that reads as too tight or too loose
 * outside 1440 specifically.
 *
 * `DOCTOR_MEDIA_HEIGHT_PERCENT` (62%, down from the previous per-scene
 * 68–80%) is the other half of the safe-zone fix, not a separate
 * cosmetic change: at the old heights a media block centered via
 * `items-center` inside a `h-full` row extended down to ~87–90% of the
 * viewport, leaving no real negative space below content for the thread
 * to live in. 62% centered leaves an even ~19% margin top and bottom —
 * enough for `THREAD_BAND_TOP_PERCENT`/`THREAD_BAND_HEIGHT_PERCENT`
 * above to sit entirely clear of it, confirmed by screenshot after the
 * change, not assumed from the arithmetic alone.
 */
export const DOCTOR_SCENE_GAP = "clamp(3rem, 5vw, 6rem)";
export const DOCTOR_MEDIA_HEIGHT_PERCENT = 62;

/** Five alternating editorial layouts for doctor scenes, cycling by
 * `index % 5` — a repeating system, not a random one, so however many
 * doctors eventually exist read as one intentional sequence. Only one
 * variant renders today (`doctors-content.ts` has exactly one real
 * entry) — the cycle exists so a future real roster expands into this
 * automatically, without new engineering. */
export const DOCTOR_SCENE_VARIANT_COUNT = 5;

/**
 * TEAM JOURNEY rework — `team-journey.tsx`'s own, deliberately smaller
 * horizontal system: all 10 roster members, one consistent scene layout,
 * no Hero/Consult/CTA/Form panels folded in, no connecting-line thread,
 * no per-scene scale/opacity settle. That system reuses
 * `DOCTORS_DESKTOP_QUERY`, `normalizedDelta` and the real-`getBoundingClientRect`
 * "distance from viewport centre" measurement technique above; the two
 * values below are the only genuinely new numbers it needs. See
 * `team-journey.tsx`'s own top comment for the full account of what was
 * reused from this file versus deliberately left out.
 */
/** Below this height the team journey's pin never engages even at a
 * `DOCTORS_DESKTOP_QUERY`-eligible width — paired with that width query
 * (not replacing it) via a combined `@media` in `team-journey.tsx`'s own
 * CSS gate, so a wide-but-short window (the brief's own "short desktop"
 * example, 1440×650) falls back to the vertical directory before content
 * ever has to actually overflow to be caught. */
export const TEAM_SCENE_MIN_HEIGHT_QUERY = "(min-height: 700px)";
/** Max px of the optional portrait depth drift — "approximately 8–12px,"
 * per the brief; applied only to a scene's own clipped image layer via
 * `normalizedDelta`'s existing -1..1 output, never to its text. */
export const TEAM_SCENE_PORTRAIT_DRIFT_PX = 10;
