import { postpartumImagery, type PostpartumImageKey } from "@/content/postpartum-care-landing-imagery";
import { MediaPlaceholder } from "@/components/ui/media-placeholder";

/**
 * Every image spot this page uses, hero included. No image-generation tool
 * is available in this session, and the one existing `services-imagery.ts`
 * asset for this slug was inspected and found to depict a prenatal (not
 * postpartum) scene (see `postpartum-care-landing-imagery.ts`'s own top
 * comment) — so every instance here renders the site's established
 * gradient `MediaPlaceholder` rather than a real photograph, a
 * reused/mislabelled image, or a fabricated file. Swapping a real `src`
 * into `postpartumImagery` once approved illustrations exist would mean
 * upgrading this component (and the hero, separately) to a real
 * `next/image`, exactly the same change `VbacImage`/`FertilityImage`
 * document for their own all-gradient pages.
 */
export function PostpartumImage({
  imageKey,
  corner = "tr",
  aspect = "aspect-[4/5]",
  className,
}: {
  imageKey: PostpartumImageKey;
  corner?: "tr" | "tl" | "br" | "bl";
  aspect?: string;
  className?: string;
}) {
  const image = postpartumImagery[imageKey];
  return <MediaPlaceholder alt={image.alt} gradient={image.gradient} corner={corner} aspect={aspect} className={className} />;
}
