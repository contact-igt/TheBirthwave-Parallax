import Image from "next/image";
import { cx } from "@/lib/cx";

// Temporary About-only assets. Replace each source, alt and caption together
// when approved clinic photography arrives; never assign this fictional portrait
// to a real clinician's roster entry.
const MEDIA = {
  consultation: {
    src: "/images/about/consultation-ai-preview-v1.webp",
    alt: "AI-generated illustration of a clinician and a woman talking in a sunlit consultation room.",
    caption: "AI-generated illustration · Clinic photography pending",
    aspect: "aspect-[3/2]",
    sizes: "(min-width: 1440px) 610px, (min-width: 1024px) 46vw, 100vw",
  },
  portrait: {
    src: "/images/about/team-portrait-ai-preview-v1.webp",
    alt: "AI-generated portrait of a fictional woman clinician; not a member of The Birthwave team.",
    caption: "AI-generated portrait · Not a real team member",
    aspect: "aspect-[4/5]",
    sizes: "(min-width: 1024px) 38vw, (min-width: 640px) 70vw, 100vw",
  },
} as const;

export function AboutPreviewImage({ kind, className }: {
  kind: keyof typeof MEDIA;
  className?: string;
}) {
  const media = MEDIA[kind];
  return (
    <div data-about-visual={kind === "consultation" ? "how-we-care-consultation" : "team-ai-preview"}
      className={cx("relative overflow-hidden rounded-tr-panel rounded-tl-xs rounded-br-xs rounded-bl-xs bg-paper-dim", media.aspect, className)}>
      <Image src={media.src} alt={media.alt} fill sizes={media.sizes}
        className="object-cover" />
      <p className="absolute right-3 bottom-3 left-3 rounded-xs bg-paper/95 px-2.5 py-1.5 font-body text-[0.6875rem] leading-relaxed text-ink-soft">
        {media.caption}
      </p>
    </div>
  );
}
