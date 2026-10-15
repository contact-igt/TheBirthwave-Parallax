import Image, { type StaticImageData } from "next/image";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CtaLink } from "@/components/ui/cta-link";
import { heroFocalPointClassName, heroFocalPointStyle, type HeroFocalPoint } from "@/lib/hero-focal-point";
import styles from "./fertility-preconception/fertility-preconception.module.css";

interface HeroLink {
  label: string;
  href: string;
}

interface HeroImage {
  src: string | StaticImageData;
  alt: string;
  objectPosition?: string;
  focalPoint?: HeroFocalPoint;
}

export interface CareServiceHeroProps {
  id?: string;
  eyebrow: string;
  heading: string;
  supporting: string;
  body?: string | readonly string[];
  primaryCta?: HeroLink;
  secondaryCta?: HeroLink;
  image?: HeroImage;
  fallbackLabel?: string;
  fallbackGradient?: string;
  disclosure?: string;
  location?: string;
}

const stripArrow = (label: string) => label.replace(/\s*[↗→↓]\s*$/, "");

/**
 * Shared hero for every care service route, built on the Fertility &
 * Preconception hero: copy and the primary action first, then one clean
 * photograph in a single frame. Stacked on mobile (text before image), two
 * balanced columns from `lg`. The frame height is clamped to the viewport so
 * the headline and primary button stay above the fold on short desktop screens.
 */
export function CareServiceHero({
  id,
  eyebrow,
  heading,
  supporting,
  body,
  primaryCta,
  secondaryCta,
  image,
  fallbackLabel = "Approved photography pending",
  fallbackGradient,
  disclosure,
  location,
}: CareServiceHeroProps) {
  const headingId = id ? `${id}-heading` : "care-service-hero-heading";
  const paragraphs = typeof body === "string" ? [body] : (body ?? []);

  return (
    <section id={id} aria-labelledby={headingId} className="relative isolate bg-paper">
      <div className="container-birthwave pt-[calc(var(--header-height)+2rem)] pb-14 lg:pt-[calc(var(--header-height)+2.5rem)] lg:pb-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="max-w-xl">
            <p className="eyebrow">{eyebrow}</p>
            <h1 id={headingId} className={`${styles.display} ${styles.h1} mt-5`}>
              {heading}
            </h1>
            <p className="mt-6 max-w-[44ch] text-xl leading-[var(--leading-relaxed)] font-medium text-ink">{supporting}</p>

            {paragraphs.length > 0 ? (
              <div className="mt-4 max-w-[48ch] space-y-3 text-base leading-[var(--leading-relaxed)] text-ink-soft">
                {paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            ) : null}

            {primaryCta || secondaryCta ? (
              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
                {primaryCta ? (
                  <Button href={primaryCta.href} variant="primary">
                    {stripArrow(primaryCta.label)}
                  </Button>
                ) : null}
                {secondaryCta ? <CtaLink href={secondaryCta.href}>{stripArrow(secondaryCta.label)}</CtaLink> : null}
              </div>
            ) : null}

            {location ? (
              <p className="mt-8 flex items-center gap-2 font-body text-sm text-ink-soft">
                <MapPin aria-hidden="true" className="size-4 shrink-0 text-terracotta-deep" />
                <span>{location}</span>
              </p>
            ) : null}
          </div>

          <figure className="w-full">
            <div className="relative aspect-[4/3] overflow-hidden rounded-t-[var(--radius-panel)] rounded-b-[var(--radius-md)] bg-paper-dim sm:aspect-[5/4] lg:aspect-auto lg:h-[clamp(28rem,calc(100dvh-14rem),38rem)]">
              {image ? (
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 1023px) 92vw, 540px"
                  className={`object-cover ${image.focalPoint ? heroFocalPointClassName(image.focalPoint) : ""}`}
                  style={image.focalPoint ? heroFocalPointStyle(image.focalPoint) : { objectPosition: image.objectPosition }}
                />
              ) : (
                <div
                  className="absolute inset-0 grid place-items-center px-8 text-center text-sm font-semibold tracking-[.08em] text-ink-soft uppercase"
                  style={{ backgroundImage: fallbackGradient }}
                >
                  {fallbackLabel}
                </div>
              )}
            </div>
            {disclosure ? <figcaption className="mt-2 font-body text-xs text-ink-soft">{disclosure}</figcaption> : null}
          </figure>
        </div>
      </div>
    </section>
  );
}
