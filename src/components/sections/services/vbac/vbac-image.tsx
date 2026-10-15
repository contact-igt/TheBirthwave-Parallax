import Image from "next/image";
import { vbacImagery, type VbacImageKey } from "@/content/pages/vbac";
import { MediaPlaceholder } from "@/components/ui/media-placeholder";
import { cx } from "@/lib/cx";

const corners = {
  tr: "rounded-tr-panel rounded-tl-xs rounded-br-xs rounded-bl-xs",
  tl: "rounded-tl-panel rounded-tr-xs rounded-br-xs rounded-bl-xs",
  br: "rounded-br-panel rounded-tl-xs rounded-tr-xs rounded-bl-xs",
  bl: "rounded-bl-panel rounded-tl-xs rounded-tr-xs rounded-br-xs",
} as const;

/**
 * Editorial image wrapper for VBAC landing page.
 * Renders Next/Image when a real src exists with fallback to MediaPlaceholder.
 */
export function VbacImage({
  imageKey,
  corner = "tr",
  aspect = "aspect-[4/5]",
  className,
}: {
  imageKey: VbacImageKey;
  corner?: keyof typeof corners;
  aspect?: string;
  className?: string;
}) {
  const image = vbacImagery[imageKey] as {
    src?: string;
    alt: string;
    gradient?: string;
    objectPosition?: string;
  };

  if (image.src) {
    return (
      <div
        data-vbac-image={imageKey}
        className={cx(
          "relative overflow-hidden border border-[var(--color-border)] bg-paper shadow-sm",
          aspect,
          corners[corner],
          className
        )}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 639px) 90vw, (max-width: 1023px) 45vw, 600px"
          className="object-cover"
          style={{ objectPosition: image.objectPosition ?? "50% 35%" }}
        />
      </div>
    );
  }

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

