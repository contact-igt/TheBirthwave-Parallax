import Image from "next/image";
import { MapPin } from "lucide-react";
import { pregnancyLandingHero as hero } from "@/content/pregnancy-antenatal-landing-content";
import { servicesImagery } from "@/content/services-imagery";
import { Button } from "@/components/ui/button";
import { CtaLink } from "@/components/ui/cta-link";
import styles from "../fertility-preconception/fertility-preconception.module.css";

/** Reuse the Fertility hero hierarchy with pregnancy-specific content. */
export function PregnancyAntenatalHero() {
  const image = servicesImagery["pregnancy-antenatal-hero"];
  return (
    <section id="pregnancy-hero" aria-labelledby="pregnancy-hero-heading" className="relative isolate bg-paper">
      <div className="container-birthwave pt-[calc(var(--header-height)+2rem)] pb-14 lg:pt-[calc(var(--header-height)+2.5rem)] lg:pb-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="max-w-xl">
            <p className="eyebrow">{hero.eyebrow}</p>
            <h1 id="pregnancy-hero-heading" className={`${styles.display} ${styles.h1} mt-5`}>{hero.headingLines.join(" ")}</h1>
            <p className="mt-6 max-w-[44ch] text-xl leading-[var(--leading-relaxed)] font-medium text-ink">{hero.supportingLine}</p>
            <div className="mt-4 space-y-3 max-w-[48ch] text-base leading-[var(--leading-relaxed)] text-ink-soft">
              {hero.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Button href={hero.primaryCta.href}>{hero.primaryCta.label.replace(/\s*↗$/, "")}</Button>
              <CtaLink href={hero.secondaryCta.href}>{hero.secondaryCta.label.replace(/\s*↗$/, "")}</CtaLink>
            </div>
            <p className="mt-8 flex items-center gap-2 font-body text-sm text-ink-soft">
              <MapPin aria-hidden="true" className="size-4 shrink-0 text-terracotta-deep" />
              <span>{hero.location}</span>
            </p>
          </div>
          <div className="min-w-0">
            <figure className="w-full">
              <div className="relative aspect-[4/3] overflow-hidden rounded-t-[var(--radius-panel)] rounded-b-[var(--radius-md)] bg-paper-dim sm:aspect-[5/4] lg:aspect-auto lg:h-[clamp(28rem,calc(100dvh-14rem),38rem)]">
                <Image src={image.src} alt={image.alt} fill priority fetchPriority="high" sizes="(max-width: 1023px) 92vw, 540px" className="object-cover" style={{ objectPosition: "74% 14%" }} />
              </div>
            </figure>
            <div className="mt-5 border-t border-[var(--color-border)] pt-4">
              <p className="font-body text-xs font-bold tracking-[0.08em] uppercase text-terracotta-deep">UNHURRIED CARE</p>
              <p className="mt-1 font-body text-sm leading-relaxed text-ink-soft">Dedicated time to listen, answer, and support your choices.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
