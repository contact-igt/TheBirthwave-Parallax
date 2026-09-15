"use client";

import Image from "next/image";
import { MediaPlaceholder } from "@/components/ui/media-placeholder";
import { useParallax } from "@/motion/image-motion";
import { cx } from "@/lib/cx";

type PortraitCorner = "tr" | "tl" | "br" | "bl";

/** The three confirmed brand hues, cycled by index — never a fourth
 * invented colour, same set `accentVar`/every other per-person cycling
 * treatment on this site already draws from. */
const PORTRAIT_GRADIENTS = [
  "linear-gradient(155deg, var(--color-paper-dim) 0%, var(--color-terracotta) 100%)",
  "linear-gradient(155deg, var(--color-paper-dim) 0%, var(--color-sky) 100%)",
  "linear-gradient(155deg, var(--color-paper-dim) 0%, var(--color-coral) 100%)",
] as const;

export function portraitGradient(index: number): string {
  return PORTRAIT_GRADIENTS[index % PORTRAIT_GRADIENTS.length];
}

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
  className,
  drift = false,
  sizes = "(max-width: 639px) 70vw, (max-width: 1023px) 35vw, 360px",
}: {
  photo: { src?: string | null; alt: string; placeholderLabel: string };
  index?: number;
  corner?: PortraitCorner;
  className?: string;
  drift?: boolean;
  sizes?: string;
}) {
  // Always called (rules of hooks) — the hook itself already no-ops
  // below `minViewportWidth` and under reduced motion; only whether its
  // ref/transform are actually wired up below depends on `drift`.
  const driftRef = useParallax<HTMLDivElement>({ factor: 0.05, maxOffsetPx: 12, minViewportWidth: 1024 });

  if (photo.src) {
    return (
      <div
        role="img"
        aria-label={photo.alt}
        className={cx(
          "relative aspect-[4/5] overflow-hidden bg-paper-dim ring-1 ring-[var(--color-border)]",
          CORNER_CLASSES[corner],
          className,
        )}
      >
        <div
          ref={drift ? driftRef : undefined}
          style={drift ? { transform: "translate3d(0, var(--parallax-y, 0px), 0)" } : undefined}
          className={cx("absolute inset-0", drift && "scale-110")}
        >
          <Image src={photo.src} alt="" fill sizes={sizes} className="object-cover" />
        </div>
      </div>
    );
  }

  return (
    <div role="img" aria-label={photo.alt}>
      <MediaPlaceholder
        alt={photo.placeholderLabel}
        gradient={portraitGradient(index)}
        corner={corner}
        aspect="aspect-[4/5]"
        className={cx("ring-1 ring-[var(--color-border)]", className)}
      />
    </div>
  );
}
