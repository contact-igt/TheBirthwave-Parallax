import { newbornImagery, type NewbornImageKey } from "@/content/newborn-pediatric-care-landing-imagery";
import { MediaPlaceholder } from "@/components/ui/media-placeholder";

/**
 * The four conceptual image spots this page still needs (Trust-Building
 * Introduction, What the Consultation May Cover, Questions Parents Often
 * Bring, First Consultation) — the hero's own real photograph is handled
 * separately in `newborn-pediatric-care-hero.tsx`. No image-generation tool
 * is available in this session (see
 * `newborn-pediatric-care-landing-imagery.ts`'s own top comment), so every
 * instance here renders the site's established gradient `MediaPlaceholder`
 * rather than a real photograph. Swapping a real `src` into
 * `newbornImagery` once approved illustrations exist would mean upgrading
 * this component to a real `next/image`, exactly the same change
 * `GynaecologyImage`/`NutritionImage` document for their own pending spots.
 */
export function NewbornImage({
  imageKey,
  corner = "tr",
  aspect = "aspect-[4/5]",
  className,
}: {
  imageKey: Exclude<NewbornImageKey, "hero">;
  corner?: "tr" | "tl" | "br" | "bl";
  aspect?: string;
  className?: string;
}) {
  const image = newbornImagery[imageKey];
  return <MediaPlaceholder alt={image.alt} gradient={image.gradient} corner={corner} aspect={aspect} className={className} />;
}
