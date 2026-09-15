import type { CSSProperties, ReactNode } from "react";
import { DotField } from "@/components/ui/backgrounds/dot-field";
import {
  dotFieldSettings,
  dotFieldColorTokens,
  dotFieldRegionOpacity,
  dotFieldEdgeFade,
} from "@/motion/ambient-dot-field";

/**
 * The one shared DotField instance for the homepage — as of the premium
 * homepage rework (docs/implementation-brief.md §24), wraps exactly ONE
 * section, FAQ (see src/app/page.tsx), not every section between the hero
 * and the closing dark CTA the way it used to. That rework's brief called
 * the repeated dotted background "too dominant" and said it should exist
 * "in ONE scene only as a very low-opacity texture" — Philosophy, Journey,
 * Immersive and Care all now carry their own backgrounds (colour
 * breathing, photography, dark full-bleed, plain paper) instead. Never
 * rendered inside the hero or the CTA. Still a generic wrapper — nothing
 * about the component itself assumes a specific child — so it composes
 * around one section exactly the way it used to compose around five.
 *
 * Layer order (see docs/implementation-brief.md §19 for the original bug
 * this fixed, still true with one child instead of five): the canvas is
 * the lowest visual layer, one shared very-transparent paper tint sits
 * above it, and section content sits above both. A wrapped section must
 * not paint its own opaque or near-opaque background — it would fully
 * occlude the canvas behind it, which is exactly what happened when five
 * sections each owned a `.section-tint` fill before that fix.
 *
 * The canvas itself still fades to transparent at its own top and bottom
 * edges (`dotFieldEdgeFade`), so it visibly settles in and recedes rather
 * than starting as a hard rectangle, even now that it only spans one
 * section's height.
 */
export function DotFieldRegion({ children }: { children: ReactNode }) {
  const maskImage = `linear-gradient(to bottom, transparent 0, black ${dotFieldEdgeFade.top}, black calc(100% - ${dotFieldEdgeFade.bottom}), transparent 100%)`;
  const fieldStyle: CSSProperties = {
    opacity: dotFieldRegionOpacity,
    maskImage,
    WebkitMaskImage: maskImage,
  };

  return (
    <div className="relative isolate">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0" style={fieldStyle}>
        <DotField
          dotRadius={dotFieldSettings.dotRadius}
          dotSpacing={dotFieldSettings.dotSpacing}
          bulgeOnly={dotFieldSettings.bulgeOnly}
          bulgeStrength={dotFieldSettings.bulgeStrength}
          cursorRadius={dotFieldSettings.cursorRadius}
          cursorForce={dotFieldSettings.cursorForce}
          glowRadius={dotFieldSettings.glowRadius}
          sparkle={dotFieldSettings.sparkle}
          flowAmplitudeX={dotFieldSettings.flowAmplitudeX}
          flowAmplitudeY={dotFieldSettings.flowAmplitudeY}
          flowCycleSeconds={dotFieldSettings.flowCycleSeconds}
          flowWavelengthPx={dotFieldSettings.flowWavelengthPx}
          flowDirectionDeg={dotFieldSettings.flowDirectionDeg}
          gradientFrom={dotFieldColorTokens.gradientFrom}
          gradientTo={dotFieldColorTokens.gradientTo}
          glowColor={dotFieldColorTokens.glow}
        />
      </div>

      {/* The one shared, very-transparent paper tint — above the canvas,
          below all content. Keeps every wrapped section's text safely on
          AA contrast without any section owning its own background fill.
          See docs/implementation-brief.md §19 for the measured contrast
          this alpha was picked against. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[5] bg-paper/45" />

      <div className="relative z-10">{children}</div>
    </div>
  );
}
