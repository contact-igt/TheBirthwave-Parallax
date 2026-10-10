import Image from "next/image";
import { MapPin } from "lucide-react";
import { fertilityHero } from "@/content/fertility-preconception-landing-content";
import { fertilityImagery, fertilityImageDisclosure } from "@/content/fertility-preconception-landing-imagery";
import { Button } from "@/components/ui/button";
import { CtaLink } from "@/components/ui/cta-link";
import { cx } from "@/lib/cx";
import styles from "./fertility-preconception.module.css";

/**
 * Hero: copy and the primary action first, then one clean photograph in a
 * single frame. Stacked on mobile (text before image), two balanced columns
 * from `lg`. The frame height is clamped to the viewport so the headline and
 * primary button stay above the fold on short desktop screens. The
 * illustration disclosure sits under the frame, not over the photograph.
 */
export function FertilityHero() {
  const image = fertilityImagery.hero;

  return (
    <section id="fertility-hero" aria-labelledby="fertility-hero-heading" className="relative isolate bg-paper">
      <div className="container-birthwave pt-[calc(var(--header-height)+2rem)] pb-14 lg:pt-[calc(var(--header-height)+2.5rem)] lg:pb-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="max-w-xl">
            <p className="eyebrow">{fertilityHero.eyebrow}</p>
            <h1 id="fertility-hero-heading" className={cx(styles.display, styles.h1, "mt-5")}>
              {fertilityHero.heading}
            </h1>
            <p className="mt-6 max-w-[40ch] text-xl leading-[var(--leading-relaxed)] font-medium text-ink">{fertilityHero.supportingLine}</p>
            <p className="mt-4 max-w-[46ch] text-lg leading-[var(--leading-relaxed)] text-ink-soft">{fertilityHero.body}</p>

            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Button href={fertilityHero.primaryCta.href} variant="primary">
                {fertilityHero.primaryCta.label}
              </Button>
              <CtaLink href={fertilityHero.secondaryCta.href}>{fertilityHero.secondaryCta.label}</CtaLink>
            </div>

            <p className="mt-8 flex items-center gap-2 font-body text-sm text-ink-soft">
              <MapPin aria-hidden="true" className="size-4 shrink-0 text-terracotta-deep" />
              <span>
                {fertilityHero.location} · {fertilityHero.locationNote}
              </span>
            </p>
          </div>

          <figure className="w-full">
            <div className="relative aspect-[4/3] overflow-hidden rounded-t-[var(--radius-panel)] rounded-b-[var(--radius-md)] bg-paper-dim sm:aspect-[5/4] lg:aspect-auto lg:h-[clamp(28rem,calc(100dvh-14rem),38rem)]">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority
                fetchPriority="high"
                sizes="(max-width: 1023px) 92vw, 540px"
                className="object-cover"
                style={{ objectPosition: image.objectPosition }}
              />
            </div>
            <figcaption className="mt-2 font-body text-xs text-ink-soft">{fertilityImageDisclosure}</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
