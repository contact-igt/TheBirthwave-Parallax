/**
 * /doctors post-Hero section surfaces. Every section sits on the same
 * translucent warm paper so the shared ambient layer (DoctorsAmbientBackdrop)
 * reads through continuously, with no colour step between sections. Where
 * a section wants the deeper paper-dim tone, it's a soft band that fades in
 * and out at its own edges — never a hard rectangle.
 *
 * Literal class strings on purpose: Tailwind's scanner only compiles
 * classes it can read statically.
 */
export const DOCTORS_SURFACE = "bg-paper/55";

export const DOCTORS_SURFACE_TONED =
  "bg-[linear-gradient(to_bottom,color-mix(in_srgb,var(--color-paper)_55%,transparent),color-mix(in_srgb,var(--color-paper-dim)_60%,transparent)_18%,color-mix(in_srgb,var(--color-paper-dim)_60%,transparent)_82%,color-mix(in_srgb,var(--color-paper)_55%,transparent))]";
