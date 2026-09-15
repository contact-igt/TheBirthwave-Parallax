"use client";

import Image from "next/image";
import { servicesImagery, type ServicesImageKey } from "@/content/services-imagery";
import { useParallax } from "@/motion/image-motion";
import { cx } from "@/lib/cx";

/**
 * Pregnancy & Antenatal Care landing page — its own image wrapper, not a
 * change to the shared `services-editorial-image.tsx` (that component
 * only supports two corners — "tr"/"tl" — and every other service page
 * still renders through it; changing its own corner set would be a
 * shared-component change touching pages outside this task's scope). This
 * page's approved reference uses all four single-corner treatments
 * (`120px 4px 4px 4px`, `80px 4px 4px 4px`, `4px 80px 4px 4px`, `4px 4px
 * 90px 4px`) across its different sections, so this local wrapper reuses
 * the SAME four-corner class set `media-placeholder.tsx` already
 * establishes site-wide, just scoped to this page's own component.
 *
 * `drift`: the brief's own "selected desktop photographs may drift by
 * approximately 12px inside clipped, sufficiently oversized frames" —
 * the existing `useParallax` hook (not a new mechanism), a small
 * `maxOffsetPx`, desktop-only via `minViewportWidth`, and already
 * disabled under reduced motion on its own. `scale-110` provides the
 * "sufficiently oversized frame" the drift clips into, so the small
 * translate never exposes an edge.
 */
const CORNER_CLASSES = {
  tr: "rounded-tr-panel rounded-tl-xs rounded-br-xs rounded-bl-xs",
  tl: "rounded-tl-panel rounded-tr-xs rounded-br-xs rounded-bl-xs",
  br: "rounded-br-panel rounded-tl-xs rounded-tr-xs rounded-bl-xs",
  bl: "rounded-bl-panel rounded-tl-xs rounded-tr-xs rounded-br-xs",
} as const;

export function PregnancyAntenatalImage({
  imageKey,
  corner = "tr",
  aspect = "aspect-[4/5]",
  className,
  sizes = "(max-width: 639px) 90vw, (max-width: 1023px) 45vw, 620px",
  eager = false,
  objectPosition,
  drift = false,
}: {
  imageKey: ServicesImageKey;
  corner?: keyof typeof CORNER_CLASSES;
  aspect?: string;
  className?: string;
  sizes?: string;
  eager?: boolean;
  objectPosition?: string;
  drift?: boolean;
}) {
  const image = servicesImagery[imageKey];
  const driftRef = useParallax<HTMLDivElement>({ factor: 0.05, maxOffsetPx: 12, minViewportWidth: 1024 });

  return (
    <div className={cx("relative overflow-hidden bg-paper-dim", aspect, CORNER_CLASSES[corner], className)}>
      <div
        ref={drift ? driftRef : undefined}
        style={drift ? { transform: "translate3d(0, var(--parallax-y, 0px), 0)" } : undefined}
        className={cx("absolute inset-0", drift && "scale-110")}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : undefined}
          className="object-cover"
          style={objectPosition ? { objectPosition } : undefined}
        />
      </div>
      <p className="absolute right-3 bottom-3 left-3 z-10 w-fit max-w-[calc(100%-1.5rem)] rounded-xs bg-paper/95 px-2 py-1 font-body text-[0.6875rem] leading-snug text-ink-soft">
        AI-generated illustration · Clinic photography pending
      </p>
    </div>
  );
}
