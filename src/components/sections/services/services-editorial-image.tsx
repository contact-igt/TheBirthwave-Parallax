import Image from "next/image";
import { servicesImagery, type ServicesImageKey } from "@/content/services-imagery";
import { cx } from "@/lib/cx";

const corners = {
  tr: "rounded-tr-panel rounded-tl-xs rounded-br-xs rounded-bl-xs",
  tl: "rounded-tl-panel rounded-tr-xs rounded-br-xs rounded-bl-xs",
};

type Props = {
  imageKey: ServicesImageKey;
  corner?: keyof typeof corners;
  aspect?: string;
  className?: string;
  eager?: boolean;
  sizes?: string;
};

export function ServicesEditorialImage({
  imageKey, corner = "tr", aspect = "aspect-[4/5]", className,
  eager = false, sizes = "(max-width: 639px) 85vw, (max-width: 1023px) 45vw, 560px",
}: Props) {
  const image = servicesImagery[imageKey];
  return (
    <div data-care-image={imageKey} className={cx("relative overflow-hidden bg-paper-dim", aspect, corners[corner], className)}>
      <Image
        src={image.src} alt={image.alt} fill sizes={sizes}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={imageKey === "services-hero" ? "high" : undefined}
        className="object-cover object-center"
      />
      <p className="absolute right-3 bottom-3 left-3 z-10 w-fit max-w-[calc(100%-1.5rem)] rounded-xs bg-paper/95 px-2 py-1 font-body text-[0.6875rem] leading-snug text-ink-soft">
        AI-generated illustration · Clinic photography pending
      </p>
    </div>
  );
}
