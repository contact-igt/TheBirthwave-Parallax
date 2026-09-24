import { lactationImagery, type LactationImageKey } from "@/content/lactation-landing-imagery";
import { MediaPlaceholder } from "@/components/ui/media-placeholder";

/**
 * The four conceptual image spots this page still needs (Trust-Building
 * Introduction, What We Can Talk Through, Questions & Planning Support,
 * First Consultation) — the hero's own real photograph is handled
 * separately in `lactation-hero.tsx`. No image-generation tool is available
 * in this session (see `lactation-landing-imagery.ts`'s own top comment), so
 * every instance here renders the site's established gradient
 * `MediaPlaceholder` rather than a real photograph. Swapping a real `src`
 * into `lactationImagery` once approved illustrations exist would mean
 * upgrading this component to a real `next/image`, exactly the same change
 * `GynaecologyImage`/`VaginismusImage` document for their own pending spots.
 */
export function LactationImage({
  imageKey,
  corner = "tr",
  aspect = "aspect-[4/5]",
  className,
}: {
  imageKey: Exclude<LactationImageKey, "hero">;
  corner?: "tr" | "tl" | "br" | "bl";
  aspect?: string;
  className?: string;
}) {
  const image = lactationImagery[imageKey];
  return <MediaPlaceholder alt={image.alt} gradient={image.gradient} corner={corner} aspect={aspect} className={className} />;
}
