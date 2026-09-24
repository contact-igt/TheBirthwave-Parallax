"use client";

import Image from "next/image";
import { normalBirthImagery, type NormalBirthImageKey } from "@/content/normal-birth-delivery-imagery";
import { useParallax } from "@/motion/image-motion";
import { cx } from "@/lib/cx";

const corners = {
  tr: "rounded-tr-panel rounded-tl-xs rounded-br-xs rounded-bl-xs",
  tl: "rounded-tl-panel rounded-tr-xs rounded-br-xs rounded-bl-xs",
  br: "rounded-br-panel rounded-tl-xs rounded-tr-xs rounded-bl-xs",
  bl: "rounded-bl-panel rounded-tl-xs rounded-tr-xs rounded-br-xs",
} as const;

/** Measure the static frame; the inset image has 16px overscan for its 12px drift. */
export function NormalBirthImage({ imageKey, corner = "tr", aspect = "aspect-[4/5]", className, drift = false }: {
  imageKey: NormalBirthImageKey;
  corner?: keyof typeof corners;
  aspect?: string;
  className?: string;
  drift?: boolean;
}) {
  const image = normalBirthImagery[imageKey];
  const ref = useParallax<HTMLDivElement>({ factor: 0.05, maxOffsetPx: 12, minViewportWidth: 1024 });
  return (
    <div ref={drift ? ref : undefined} data-nbd-image={imageKey} className={cx("relative overflow-hidden bg-paper-dim", aspect, corners[corner], className)}>
      <div className={cx("absolute inset-0", drift && "lg:-inset-y-4")} style={drift ? { transform: "translate3d(0, var(--parallax-y, 0px), 0)" } : undefined}>
        <Image src={image.src} alt={image.alt} fill sizes="(max-width: 1023px) 92vw, 600px" loading="lazy" className="object-cover" style={{ objectPosition: image.objectPosition }} />
      </div>
      <p className="absolute right-3 bottom-3 left-3 z-10 w-fit max-w-[calc(100%-1.5rem)] rounded-xs bg-paper/95 px-2 py-1 font-body text-[0.6875rem] leading-snug text-ink-soft">
        AI-generated illustration
      </p>
    </div>
  );
}
