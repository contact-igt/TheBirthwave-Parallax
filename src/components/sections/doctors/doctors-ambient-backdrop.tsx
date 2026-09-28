import type { ReactNode } from "react";
import { BirthwaveGalaxy } from "@/components/ui/backgrounds/birthwave-galaxy";

/**
 * /doctors — the shared ambient layer for everything AFTER the Hero.
 *
 * ONE BirthwaveGalaxy (one WebGL canvas) for the whole post-Hero page:
 * viewport-sized and sticky inside this wrapper, so it starts below the
 * Hero, follows the reader through Founder → team journey → Medical →
 * Allied → guidance → enquiry, and releases before the footer. It pauses
 * itself whenever this wrapper is off-screen (see galaxy.tsx).
 *
 * The sections inside keep their own tonal surfaces at ~70–80% opacity so
 * the light reads through while each still separates. The mask fades the
 * light in just after the Hero and out just before the footer, so there's
 * never a hard rectangle edge.
 */
export function DoctorsAmbientBackdrop({ children }: { children: ReactNode }) {
  return (
    <div className="relative isolate bg-paper">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-clip [mask-image:linear-gradient(to_bottom,transparent_0,black_120px,black_calc(100%-180px),transparent_100%)]"
      >
        <div className="sticky top-0 h-svh w-full overflow-clip">
          {/* Static blush light pools — the large, soft layer of the
              atmosphere (dusty rose, soft coral, warm cream), weighted to the
              outer areas. Pure CSS; nothing animates here. */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: [
                "radial-gradient(42% 48% at 8% 18%, color-mix(in srgb, #F88379 16%, transparent) 0%, transparent 100%)",
                "radial-gradient(46% 52% at 94% 78%, color-mix(in srgb, #CA9585 20%, transparent) 0%, transparent 100%)",
                "radial-gradient(38% 40% at 70% 6%, color-mix(in srgb, #F3E8E2 70%, transparent) 0%, transparent 100%)",
              ].join(", "),
            }}
          />
          {/* The moving glows, eased back behind the central content area
              and given more presence toward the edges. */}
          <div className="absolute inset-0 [mask-image:radial-gradient(60%_55%_at_50%_52%,rgba(0,0,0,0.45)_0%,black_100%)]">
            <BirthwaveGalaxy />
          </div>
        </div>
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
