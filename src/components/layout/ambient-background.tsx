const GRAIN_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'>
  <filter id='n'>
    <feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch' />
    <feColorMatrix type='saturate' values='0' />
  </filter>
  <rect width='100%' height='100%' filter='url(#n)' />
</svg>`;

const GRAIN_DATA_URL = `url("data:image/svg+xml,${encodeURIComponent(GRAIN_SVG)}")`;

/**
 * One continuous world behind the whole homepage: three oversized, very
 * soft radial blooms in the confirmed brand hues, drifting over ~110s, plus
 * a faint grain for a fabric-like quality — never particles, never a sharp
 * "gradient blob." Pure CSS (no scroll listener, no client component); the
 * drift keyframe itself is disabled under prefers-reduced-motion in
 * globals.css. Sections layer their own tinted, edge-masked fill above
 * this (see .section-tint* in globals.css) so it only ever shows through
 * at the soft transition zones between them, never behind text.
 */
export function AmbientBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-paper"
    >
      <div
        className="ambient-drift absolute -inset-[20%]"
        style={{
          backgroundImage: [
            "radial-gradient(38% 34% at 18% 18%, color-mix(in srgb, var(--color-terracotta) 16%, transparent) 0%, transparent 72%)",
            "radial-gradient(42% 38% at 84% 66%, color-mix(in srgb, var(--color-sky) 13%, transparent) 0%, transparent 72%)",
            "radial-gradient(36% 32% at 52% 96%, color-mix(in srgb, var(--color-coral) 13%, transparent) 0%, transparent 72%)",
          ].join(", "),
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-soft-light"
        style={{
          backgroundImage: GRAIN_DATA_URL,
          backgroundSize: "220px 220px",
        }}
      />
    </div>
  );
}
