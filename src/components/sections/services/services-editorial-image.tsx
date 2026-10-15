import Image from "next/image";
import { servicesOverviewImagery, type ServicesOverviewImageKey } from "@/content/services-overview-imagery";
import { cx } from "@/lib/cx";

const corners = {
  tr: "rounded-tr-panel rounded-tl-xs rounded-br-xs rounded-bl-xs",
  tl: "rounded-tl-panel rounded-tr-xs rounded-br-xs rounded-bl-xs",
};

type Props = {
  imageKey: ServicesOverviewImageKey;
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
  const image = servicesOverviewImagery[imageKey];
  return (
    <div data-care-image={imageKey} className={cx("relative overflow-hidden bg-paper-dim", aspect, corners[corner], className)}>
      <Image
        src={image.src} alt={image.alt} fill sizes={sizes}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={imageKey === "hero" ? "high" : undefined}
        className="object-cover object-center"
      />
    </div>
  );
}
