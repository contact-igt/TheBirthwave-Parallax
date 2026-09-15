/**
 * Section-to-section blending for the site's full-bleed dark moments
 * (Immersive, Final CTA) — which don't sit inside a shared tinted layer,
 * their own background *is* the fill. A paper-tinted gradient at the edge
 * makes the dark surface read as emerging/receding rather than cutting in
 * as a hard rectangle.
 *
 * The old `sectionFadeZones`/`sectionFadeStyle`/`.section-tint*` system
 * this file used to also describe (for Purpose/Pathways/Experience/Trust/
 * FAQ's shared paper-tint fades) was retired along with those sections in
 * the homepage rework — see docs/implementation-brief.md §24. Philosophy,
 * Journey and Care own their own backgrounds now; nothing left needs a
 * per-section edge fade against a shared tint layer.
 */

/**
 * Emergence bands — for the two full-bleed dark moments (Immersive,
 * Final CTA). A paper-tinted gradient at the edge makes the dark surface
 * read as emerging/receding rather than cutting in.
 */
export const emergenceBand = {
  fromPaper: (opacityPercent: number) =>
    `linear-gradient(to bottom, color-mix(in srgb, var(--color-paper) ${opacityPercent}%, transparent) 0%, transparent 100%)`,
  toPaper: (opacityPercent: number) =>
    `linear-gradient(to top, color-mix(in srgb, var(--color-paper) ${opacityPercent}%, transparent) 0%, transparent 100%)`,
} as const;

/** Immersive section's top/bottom emergence strength (0–100). Bumped
 * 60 → 68 and its band widened to `--space-fade-final` (was
 * `--space-fade-strong`) in the interaction-correction pass so entry and
 * exit both read as gradual — "previous section begins darkening
 * gradually... at exit, darkness should transition gracefully" — rather
 * than a quicker dip. */
export const immersiveEmergence = { top: 68, bottom: 68 } as const;

/** Final CTA fades in at the top only — its bottom is flush against the
 * same-tone footer, already seamless without a gradient. Strength bumped
 * (38 → 45) and the band itself widened (`--space-fade-strong` →
 * `--space-fade-final`, see tokens.css) in the homepage rework so the
 * warm-to-dark-brown transition reads as gradual rather than a quick dip —
 * "the visitor approaches the final CTA" is meant to be a held moment,
 * not a snap. */
export const finalCtaEmergence = { top: 45 } as const;
