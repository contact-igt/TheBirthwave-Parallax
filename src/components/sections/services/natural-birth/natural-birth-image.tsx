import Image from "next/image";
import { naturalBirthImagery, type NaturalBirthImageKey } from "@/content/natural-birth-landing-imagery";
import { MediaPlaceholder } from "@/components/ui/media-placeholder";
import { cx } from "@/lib/cx";

const corners = {
  tr: "rounded-tr-panel rounded-tl-xs rounded-br-xs rounded-bl-xs",
  tl: "rounded-tl-panel rounded-tr-xs rounded-br-xs rounded-bl-xs",
  br: "rounded-br-panel rounded-tl-xs rounded-tr-xs rounded-bl-xs",
  bl: "rounded-bl-panel rounded-tl-xs rounded-tr-xs rounded-br-xs",
} as const;

/**
 * Editorial image wrapper for Natural Birth landing page.
 * Renders Next/Image with BirthWave's signature single-deep-corner styling,
 * preserving face/subject positioning, with MediaPlaceholder fallback.
 */
export function NaturalBirthImage({
  imageKey,
  corner = "tr",
  aspect = "aspect-[4/5]",
  className,
  sizes = "(max-width: 639px) 90vw, (max-width: 1023px) 45vw, 600px",
  eager = false,
}: {
  imageKey: Exclude<NaturalBirthImageKey, "hero">;
  corner?: keyof typeof corners;
  aspect?: string;
  className?: string;
  sizes?: string;
  eager?: boolean;
}) {
  const image = naturalBirthImagery[imageKey] as {
    src?: string;
    alt: string;
    objectPosition?: string;
    gradient?: string;
  };

  if (!image.src) {
    return (
      <MediaPlaceholder
        alt={image.alt}
        gradient={image.gradient ?? "linear-gradient(135deg, var(--color-paper-dim), var(--color-terracotta))"}
        corner={corner}
        aspect={aspect}
        className={className}
      />
    );
  }

  return (
    <div
      data-natural-birth-image={imageKey}
      className={cx("relative overflow-hidden bg-paper-dim", aspect, corners[corner], className)}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        loading={eager ? "eager" : "lazy"}
        className="object-cover"
        style={"objectPosition" in image && image.objectPosition ? { objectPosition: image.objectPosition } : undefined}
      />
      <span className="absolute right-3 bottom-3 left-3 z-10 w-fit max-w-[calc(100%-1.5rem)] rounded-xs bg-paper/95 px-2 py-1 font-body text-[0.6875rem] leading-snug text-ink-soft">
        AI-generated illustration
      </span>
    </div>
  );
}
