"use client";

/**
 * Our Care / Treatments — Sticky Treatment Showcase.
 *
 * Pure, DOM-light helpers shared by `services-sticky-showcase.tsx`,
 * matching the split `doctors-journey.ts`/`doctors-master-journey.tsx`
 * already establishes elsewhere: the actual GSAP wiring (one
 * ScrollTrigger, one pin, one progress owner) lives in the component;
 * this file is the math and content-independent constants only.
 *
 * Refinement pass (existing-page refinement, execution-gated to the
 * first 3 presentation scenes — see `PROTOTYPE_SCENE_COUNT`): this
 * replaces an earlier version of the same system that had a real,
 * confirmed-via-screenshot crossfade bug (adjacent scenes staying
 * double-exposed across most of a scene's own dwell, not just a brief
 * transition — see `sceneActivation`'s own comment) and a 4-variant
 * cycling layout the current brief explicitly asks to drop in favour of
 * one consistent composition. Both are fixed here, not carried forward.
 */

/** Below this width — or in a viewport too SHORT for the pinned stage to
 * stay readable — the pinned split-screen never engages; the vertical
 * fallback in `services-sticky-showcase.tsx` renders instead. Combines a
 * width check (`lg`, matching `doctors-journey.ts`'s own
 * `DOCTORS_DESKTOP_QUERY` reasoning: a pinned system needs real width to
 * read as spacious) with a height floor — a short desktop window (a
 * laptop at 1024×640, a maximized-but-short external-monitor window)
 * left too little vertical room for the image+text composition below to
 * stay comfortably readable while pinned, the same real problem
 * about-founder-story.tsx's own sticky portrait already had to guard
 * against. Used for BOTH the CSS split that decides which subtree even
 * renders (so a short-but-wide viewport gets the real, readable vertical
 * sequence, not a broken stacked DOM with no working pin) and the JS
 * `matchMedia` that creates the ScrollTrigger — the two must agree
 * exactly, or the JS could try to pin an element the CSS never shows. */
export const SERVICES_DESKTOP_QUERY = "(min-width: 1024px) and (min-height: 700px)";
/** The identical query also appears as a literal Tailwind arbitrary
 * variant directly in `services-sticky-showcase.tsx`'s own className
 * strings (`[@media(min-width:1024px)_and_(min-height:700px)]:block` /
 * `:hidden`) — NOT built from this constant. Tailwind's JIT scanner does
 * static text analysis of the source; a class name assembled at runtime
 * via string interpolation of a shared constant is invisible to it and
 * never gets compiled — confirmed as a real bug this exact way (the
 * desktop branch silently rendered `display: none` at every viewport
 * until the class strings were written out literally). If this query
 * ever changes, the literal strings in that component must be updated by
 * hand alongside it. */

/** Full confirmed roster. */
export const SERVICE_SCENE_COUNT = 11;

/** Execution gate: only the first `PROTOTYPE_SCENE_COUNT` presentation
 * scenes (Chapter 1 — Before/Women's Health: Fertility & Preconception,
 * Vaginismus & Intimate Wellness, Gynaecology & Women's Wellness) get the
 * PINNED split-screen crossfade treatment — that scene count and its
 * timing (`SCENE_DWELL_VH`) stay exactly as approved. The other 8 are
 * NOT hidden or pin-only-reachable, though: on the desktop-eligible path
 * they render immediately after the pinned stage releases, as normal-flow
 * rows (`ShowcaseDesktopContinuation`, services-sticky-showcase.tsx) —
 * fixing a real, confirmed gap where they previously had no on-page
 * editorial presentation at all on an eligible desktop viewport, only
 * Quick Overview's own direct links. Raise this constant only after the
 * pinned 3-scene prototype itself has had further visual review — it
 * governs the PIN's own scope, not whether the remaining services are
 * visible on the page. */
export const PROTOTYPE_SCENE_COUNT = 3;

/** Reserved scroll distance per treatment, as a fraction of the viewport
 * height (a GSAP ScrollTrigger `+=NN%` value — the same "percentage of
 * `window.innerHeight`, not a measured pixel distance" approach
 * `immersive-section.tsx` already uses for its own pinned dwell, the
 * right unit for a vertical stack with no `scrollWidth` to measure).
 * 90vh, not a round "start here and tune" placeholder carried over from
 * a previous 11-scene pass — chosen directly for THIS 3-scene prototype:
 * one short title, one ~1-sentence description and a link is a 3–4
 * second read at a comfortable pace, and 90vh of scroll at typical wheel/
 * trackpad speed spans roughly that long without feeling stuck, still
 * leaving real, brief transition room on each side (see
 * `sceneActivation`). Confirmed by scrolling the actual prototype, not
 * assumed from the number alone — see this task's own QA section. */
export const SCENE_DWELL_VH = 90;
export const PROTOTYPE_TRACK_VH = SCENE_DWELL_VH * PROTOTYPE_SCENE_COUNT;

/** Given the master timeline's own raw progress (0–1) and the scene
 * count actually wired into the pin, returns a continuous scene
 * `position` (0 at scene 0's own centre, `count - 1` at the LAST scene's
 * own centre) and the nearest whole scene index for display purposes
 * (the counter).
 *
 * `position = progress * (count - 1)`, not `progress * count` — a real,
 * confirmed-via-screenshot bug in an earlier version of this file used
 * the latter, which maps `progress===1` onto `position===count` (one
 * whole scene PAST the last one's own index). Since every scene's own
 * activation is computed from its distance to `position`
 * (`sceneActivation`), that left the last scene's own activation hit
 * ZERO exactly at the pin's own release point — the final treatment
 * visibly faded to a blank stage right at the handoff into Find the
 * Right Care, exactly the failure mode the brief explicitly warns
 * against. Dividing by `count - 1` instead makes `position === count - 1`
 * (the last scene's own index, distance 0, full activation) the value at
 * `progress === 1`, so "finish with the last service fully readable"
 * holds structurally, not by chance — and `count - 1` transitions happen
 * across the full range, matching "N scenes require N−1 transitions"
 * exactly. */
export function getShowcaseState(progress: number, count: number) {
  const clamped = Math.max(0, Math.min(1, progress));
  const position = count > 1 ? clamped * (count - 1) : 0;
  const activeIndex = Math.max(0, Math.min(count - 1, Math.round(position)));
  return { position, activeIndex };
}

/** Smoothstep (3t²-2t³) — eases the local in/out crossfade windows below
 * rather than linear, approximating the site's own signature
 * deceleration (`SIGNATURE_EASE`) for a value computed per-frame in
 * `onUpdate` rather than through an actual GSAP tween. */
function smoothstep(t: number): number {
  const c = Math.max(0, Math.min(1, t));
  return c * c * (3 - 2 * c);
}

/** Per-scene text/image "settle" state, given how far the current
 * position sits from that scene's own centre, in whole-scene units (0 =
 * dead centre, 1 = one full scene away).
 *
 * A flat plateau (full opacity out to `PLATEAU`) plus a short falloff to
 * (near-)zero by `EDGE` — not a single smoothstep spanning the whole ±1
 * range. That was a real, confirmed-via-screenshot bug in an earlier
 * version of this file: neighbouring scene centres are exactly 1.0
 * apart, so the actual boundary between two scenes' own territory sits
 * at distance 0.5 from each — a falloff reaching zero only at distance 1
 * left TWO scenes both substantially readable across nearly the whole
 * width of each scene's own dwell, not a brief transition. `EDGE`
 * (0.56) reaches (near-)zero just past that boundary and `PLATEAU`
 * (0.3) is where the *other* scene's own falloff has already started —
 * together a transition zone roughly a quarter of a scene wide on each
 * side, "brief relative to the stable reading portion," with both
 * scenes still carrying a small residual opacity exactly at the
 * boundary itself (not a hard double-zero blank instant). */
const ACTIVATION_PLATEAU = 0.3;
const ACTIVATION_EDGE = 0.56;

export function sceneActivation(distanceInScenes: number): number {
  const d = Math.abs(distanceInScenes);
  if (d <= ACTIVATION_PLATEAU) return 1;
  if (d >= ACTIVATION_EDGE) return 0;
  const t = (d - ACTIVATION_PLATEAU) / (ACTIVATION_EDGE - ACTIVATION_PLATEAU);
  return 1 - smoothstep(t);
}

/** Text/image drift at the activation falloff's own extreme — kept
 * inside the brief's own "approximately 12–20px" range for text; image
 * drift stays smaller still ("subtle... only when it adds visible
 * depth," not a second, competing motion). Both are multiplied by the
 * SAME signed `distance` the opacity above already uses, so a scene
 * entering (positive distance, still ahead) drifts in from below by this
 * amount and a scene exiting (negative distance, already passed) lifts
 * out upward by it — no separate direction flag, this falls out of the
 * sign alone and works identically in reverse-scroll. */
export const TEXT_DRIFT_PX = 18;
export const IMAGE_DRIFT_PX = 10;
/** Image scale at rest vs. at the activation falloff's extreme — a
 * restrained 1.03→1.00, not the flashier "1.04" some earlier passes on
 * this site used, paired with `overflow-hidden` on the image stack's own
 * container (see the component) so this never exposes a frame edge. */
export const IMAGE_SCALE_REST = 1.03;

/** The showcase's own outer wrapper (the element that reserves the
 * reserved scroll distance around the pinned stage) carries this id —
 * the Hero's own primary CTA (`#treatment-showcase`) targets it as a
 * plain in-page anchor. */
export const SHOWCASE_WRAPPER_ID = "treatment-showcase";

/**
 * Background progression — "ivory → muted rose → restrained coral →
 * soft blue → ivory," mapped 1:1 onto the five confirmed chapters in
 * their own order (Before→ivory, Pregnancy→rose, Birth Preparation→
 * coral, Birth→blue, After Birth→ivory) rather than a colour chosen
 * per-chapter "by feel" — a direct, literal reading of the brief's own
 * sequence. Every hue referenced is an existing brand token
 * (`--color-terracotta`/Dusty Rose = "muted rose," `--color-sky`/
 * BirthWave Blue = "soft blue," `--color-coral`/BirthWave Coral =
 * "restrained coral") at a low mix percentage against plain paper, never
 * a new colour or a raw hex value. A soft, layered full-bleed tint, not
 * a section-colour block or a continuously-repainted gradient: five
 * static gradients rendered once, only their OPACITY changes per frame
 * (see the component's own onUpdate), so "gentle blends" costs one
 * opacity write per layer, not a recomputed background-image string. */
export const CARE_CHAPTER_WASH: Record<string, string> = {
  before: "var(--color-paper)",
  pregnancy:
    "radial-gradient(120% 90% at 20% 25%, color-mix(in srgb, var(--color-terracotta) 10%, var(--color-paper)) 0%, var(--color-paper) 72%)",
  "birth-preparation":
    "radial-gradient(120% 90% at 80% 25%, color-mix(in srgb, var(--color-coral) 10%, var(--color-paper)) 0%, var(--color-paper) 72%)",
  birth:
    "radial-gradient(120% 90% at 20% 75%, color-mix(in srgb, var(--color-sky) 10%, var(--color-paper)) 0%, var(--color-paper) 72%)",
  "after-birth": "var(--color-paper)",
};
