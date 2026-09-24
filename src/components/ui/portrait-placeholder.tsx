"use client";

import Image from "next/image";
import { MediaPlaceholder } from "@/components/ui/media-placeholder";
import { portraitGradient } from "@/components/ui/portrait-gradient";
import { useParallax } from "@/motion/image-motion";
import { cx } from "@/lib/cx";

type PortraitCorner = "tr" | "tl" | "br" | "bl";

/** Re-exported for existing importers of `portraitGradient` from this
 * module — the gradient array/function itself now lives in
 * `portrait-gradient.ts` (a plain, server-safe module) so a Server
 * Component can use it too; nothing about the values or behaviour here
 * changed. */
export { portraitGradient };

const CORNER_CLASSES: Record<PortraitCorner, string> = {
  tr: "rounded-tr-panel rounded-tl-xs rounded-br-xs rounded-bl-xs",
  tl: "rounded-tl-panel rounded-tr-xs rounded-br-xs rounded-bl-xs",
  br: "rounded-br-panel rounded-tl-xs rounded-tr-xs rounded-bl-xs",
  bl: "rounded-bl-panel rounded-tl-xs rounded-tr-xs rounded-br-xs",
};

/**
 * The one portrait spot used everywhere a team member's photo belongs —
 * the Hero, the Founder section, every Medical & Clinical/Allied Care
 * Team directory row, and every individual `/doctors/[slug]` profile.
 * Every instance shares the same aspect ratio, corner radius and border
 * treatment, so a person's portrait never reads as a one-off developer
 * placeholder.
 *
 * Reads `photo.src` directly: `null` (every confirmed entry today) renders
 * the site's established `MediaPlaceholder` built-visual placeholder;
 * a real path renders an actual `next/image` at the exact same box,
 * aspect ratio and corner treatment. Swapping one entry's `src: null` for
 * a real path in doctors-content.ts is the only change needed once
 * approved photography exists — nothing here or in any consumer changes
 * shape.
 *
 * `drift`: an optional ~12px desktop-only parallax (existing `useParallax`
 * hook, not a new mechanism) applied to the image layer inside this
 * component's own clipped frame — never to the surrounding text. Off by
 * default; callers opt in only where it improves the result (the team
 * directory rows).
 */
export function PortraitPlaceholder({
  photo,
  index = 0,
  corner = "tr",
  shape = "arch",
  className,
  drift = false,
  sizes = "(max-width: 639px) 70vw, (max-width: 1023px) 35vw, 360px",
  objectPosition,
  accentWash = false,
}: {
  photo: { src?: string | null; alt: string; placeholderLabel: string };
  index?: number;
  corner?: PortraitCorner;
  /** `"arch"` (default) is the site's established signature frame — one
   * deep rounded corner, three small (`CORNER_CLASSES`), used everywhere
   * a portrait appears today (Hero, Founder, every team directory row,
   * every `/doctors/[slug]` page) and unaffected by this prop existing.
   * `"rect"` is a plain, uniformly-rounded rectangle (no arch, no
   * asymmetric corner) — opt-in only, for a context that specifically
   * wants a calmer, more compact editorial tile (the "Who Can Support"
   * specialty rows) instead of the signature shape. `corner` is ignored
   * when `shape` is `"rect"`. */
  shape?: "arch" | "rect";
  className?: string;
  drift?: boolean;
  sizes?: string;
  /** A CSS `object-position` value (e.g. `"50% 25%"`) — per-photo focal
   * point override for a real image; undefined keeps `object-cover`'s own
   * default center crop. No effect on the gradient placeholder below. */
  objectPosition?: string;
  /** A soft, blurred BirthWave-toned wash behind the frame — one static
   * radial gradient (brand tokens at low opacity, `aria-hidden`), never a
   * per-image variation. Off by default so every existing caller (Hero,
   * the profile template page, the team directory rows before this prop
   * existed) keeps its exact current look; doctor-profile-content.tsx
   * opts in for its own "soft BirthWave background treatment." */
  accentWash?: boolean;
}) {
  // Always called (rules of hooks) — the hook itself already no-ops
  // below `minViewportWidth` and under reduced motion; only whether its
  // ref/transform are actually wired up below depends on `drift`.
  const driftRef = useParallax<HTMLDivElement>({ factor: 0.05, maxOffsetPx: 12, minViewportWidth: 1024 });

  const shapeClass = shape === "rect" ? "rounded-2xl" : CORNER_CLASSES[corner];

  const frame = photo.src ? (
    <div
      role="img"
      aria-label={photo.alt}
      className={cx(
        "relative aspect-[4/5] overflow-hidden bg-paper-dim ring-1 ring-[var(--color-border)]",
        shapeClass,
        !accentWash && className,
      )}
    >
      <div
        ref={drift ? driftRef : undefined}
        style={drift ? { transform: "translate3d(0, var(--parallax-y, 0px), 0)" } : undefined}
        className={cx("absolute inset-0", drift && "scale-110")}
      >
        <Image
          src={photo.src}
          alt=""
          fill
          sizes={sizes}
          className="object-cover"
          style={objectPosition ? { objectPosition } : undefined}
        />
      </div>
    </div>
  ) : shape === "rect" ? (
    // Bypasses `MediaPlaceholder` (its own corner system is the same
    // asymmetric `CORNER_CLASSES` this prop exists to avoid, and it
    // doesn't accept a style/radius override) — same gradient generator,
    // same "built visual placeholder, never a fake face" contract, just a
    // plain rounded rectangle instead of a caption-chip panel, sized right
    // for a compact ~90px tile rather than a large placeholder spot.
    <div
      role="img"
      aria-label={photo.alt}
      className={cx(
        "relative aspect-[4/5] overflow-hidden ring-1 ring-[var(--color-border)]",
        shapeClass,
        !accentWash && className,
      )}
      style={{ backgroundImage: portraitGradient(index) }}
    />
  ) : (
    <div role="img" aria-label={photo.alt}>
      <MediaPlaceholder
        alt={photo.placeholderLabel}
        gradient={portraitGradient(index)}
        corner={corner}
        aspect="aspect-[4/5]"
        className={cx("ring-1 ring-[var(--color-border)]", !accentWash && className)}
      />
    </div>
  );

  if (!accentWash) return frame;

  return (
    <div className={cx("relative", className)}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] opacity-70 blur-2xl sm:-inset-8"
        style={{
          backgroundImage:
            "radial-gradient(120% 120% at 20% 15%, color-mix(in srgb, var(--color-terracotta) 16%, transparent) 0%, transparent 60%), radial-gradient(100% 100% at 85% 90%, color-mix(in srgb, var(--color-coral) 12%, transparent) 0%, transparent 65%)",
        }}
      />
      {frame}
    </div>
  );
}
