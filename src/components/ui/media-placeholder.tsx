import type { ComponentPropsWithoutRef } from "react";
import { cx } from "@/lib/cx";

type PanelCorner = "tr" | "tl" | "br" | "bl";

const CORNER_CLASSES: Record<PanelCorner, string> = {
  tr: "rounded-tr-panel rounded-tl-xs rounded-br-xs rounded-bl-xs",
  tl: "rounded-tl-panel rounded-tr-xs rounded-br-xs rounded-bl-xs",
  br: "rounded-br-panel rounded-tl-xs rounded-tr-xs rounded-bl-xs",
  bl: "rounded-bl-panel rounded-tl-xs rounded-tr-xs rounded-br-xs",
} as const;

/**
 * A "built visual placeholder" — the site's own established pattern for
 * approved-photography-pending spots (doctor-profile-template.tsx,
 * service-page-template.tsx, journey-section.tsx all inline this same
 * shape independently): a gradient/texture panel carrying the single-
 * deep-corner radius signature, with a small caption chip naming exactly
 * what real photography or footage belongs there — never downloaded stock
 * standing in for it (docs/implementation-brief.md's "imagery with intent"
 * rule). Extracted here since the About page needs it enough times
 * (~5 spots across Phase 1's sections) to justify one shared component
 * rather than a sixth inline copy; the three existing inline uses are
 * left as they are.
 */
type MediaPlaceholderProps = {
  /** What real photography/footage belongs here — shown as an on-panel caption. */
  alt: string;
  /** A `linear-gradient(...)` (or similar) CSS background-image value. */
  gradient: string;
  corner?: PanelCorner;
  aspect?: string;
} & Omit<ComponentPropsWithoutRef<"div">, "children" | "style">;

export function MediaPlaceholder({
  alt,
  gradient,
  corner = "tr",
  aspect = "aspect-[4/5]",
  className,
  ...rest
}: MediaPlaceholderProps) {
  return (
    <div
      className={cx("relative overflow-hidden", aspect, CORNER_CLASSES[corner], className)}
      style={{ backgroundImage: gradient }}
      {...rest}
    >
      <p className="absolute right-4 bottom-4 rounded-xs bg-paper/90 px-2.5 py-1 font-body text-[0.6875rem] font-semibold tracking-[0.1em] text-ink-soft uppercase backdrop-blur-sm">
        {alt}
      </p>
    </div>
  );
}
