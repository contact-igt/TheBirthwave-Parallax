"use client";

import Image from "next/image";
import { birthApproachSection } from "@/content/our-services-content";
import { servicesOverviewImagery } from "@/content/services-overview-imagery";
import { Button } from "@/components/ui/button";
import styles from "./services-overview.module.css";

/**
 * Section 08 — The BirthWave Approach to Birth ("Your Birth Experience").
 * Reassuring editorial focus on communication, birth preferences, doula/partner involvement,
 * and adaptive care during labour.
 */
export function ServicesBirthApproach() {
  const image = servicesOverviewImagery.birthApproach;

  return (
    <section
      id={birthApproachSection.id}
      aria-labelledby="birth-approach-heading"
      className={`relative isolate scroll-mt-[calc(var(--header-height)+var(--services-nav-clearance)+1.5rem)] ${styles.section} ${styles.birthApproach}`}
    >
      <div className="container-birthwave">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          {/* Editorial Content */}
          <div className="max-w-xl">
            <p className="eyebrow text-terracotta-deep font-semibold">
              {birthApproachSection.eyebrow}
            </p>
            <h2
              id="birth-approach-heading"
              className="mt-4 text-h2 leading-[1.12] font-semibold tracking-[var(--tracking-tight)] text-ink"
            >
              {birthApproachSection.heading}
            </h2>

            <div className="mt-5 space-y-3.5 text-base leading-[var(--leading-relaxed)] text-ink-soft">
              {birthApproachSection.intro.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-5">
              {birthApproachSection.points.map((point) => (
                <div key={point.title}>
                  <h3 className="font-body text-sm font-semibold tracking-wider text-terracotta-deep uppercase">
                    {point.title}
                  </h3>
                  <p className="mt-1.5 text-base leading-[var(--leading-relaxed)] text-ink-soft">
                    {point.body}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Button href={birthApproachSection.cta.href} variant="primary">
                {birthApproachSection.cta.label.replace(/\s*→$/, "")}
              </Button>
            </div>
          </div>

          {/* Editorial Photograph */}
          <div className="relative aspect-[4/3] sm:aspect-[4/3.5] lg:aspect-[4/4.8] w-full overflow-hidden rounded-tl-panel rounded-tr-xs rounded-br-panel rounded-bl-xs border border-[var(--color-border)] bg-paper shadow-md">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 1023px) 90vw, 520px"
              className="object-cover"
              style={{ objectPosition: "center 25%" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
