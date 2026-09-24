import { vbacImagery, type VbacImageKey } from "@/content/vbac-landing-imagery";
import { MediaPlaceholder } from "@/components/ui/media-placeholder";

/**
 * The one non-hero image spot this page uses. No image-generation tool was
 * available while this page was built (see `vbac-landing-imagery.ts`'s own
 * top comment), so every instance renders the site's established
 * "built visual placeholder" — `MediaPlaceholder` with a page-local brand
 * gradient — rather than a real photograph. Swapping a real `src` into
 * `vbacImagery` once approved illustrations exist would mean upgrading this
 * component to a real `next/image`, exactly the same change
 * `PortraitPlaceholder` documents for a clinician photo — no consumer below
 * needs to change shape.
 */
export function VbacImage({
  imageKey,
  corner = "tr",
  aspect = "aspect-[4/5]",
  className,
}: {
  imageKey: VbacImageKey;
  corner?: "tr" | "tl" | "br" | "bl";
  aspect?: string;
  className?: string;
}) {
  const image = vbacImagery[imageKey];
  return <MediaPlaceholder alt={image.alt} gradient={image.gradient} corner={corner} aspect={aspect} className={className} />;
}
