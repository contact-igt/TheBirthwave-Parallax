"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CareChapter, CareGroup, ServiceContent } from "@/content/services-content";
import { careChapters, careJourneyIntro, servicesShowcaseOrder } from "@/content/services-content";
import { ServicesEditorialImage } from "./services-editorial-image";
import type { ServicesImageKey } from "@/content/services-imagery";
import { useScrollReveal } from "@/motion/scroll-scenes";
import { accentVar } from "@/lib/accent-tint";
import { cx } from "@/lib/cx";

/**
 * Section 02 — Care Journey (image-density refinement of the previous
 * Quick Overview + Sticky Showcase pair). ONE editorial spread per
 * chapter — oversized chapter number, one chapter image, a short intro,
 * and an asymmetric column of service links carrying the visual rhythm
 * through typography rather than one photo per service.
 *
 * Deliberately not pinned and not scroll-scrubbed: the previous Sticky
 * Showcase's `ScrollTrigger` pin (11 crossfading per-service images) is
 * the exact pattern this refinement removes — "images introduce
 * chapters, they do not illustrate every service link." Every chapter
 * renders in plain document flow with one `useScrollReveal` one-shot
 * fade/rise per spread (chapter image + service links share the same
 * reveal, links getting a small `transitionDelay` stagger) — no pin, no
 * reserved scroll distance, no continuous parallax.
 */

type ResolvedChapter = CareChapter & { services: ServiceContent[] };

const CHAPTER_IMAGE_KEY: Record<CareGroup, ServicesImageKey> = {
  before: "care-journey-before",
  pregnancy: "care-journey-pregnancy",
  "birth-preparation": "care-journey-birth-preparation",
  birth: "care-journey-birth",
  "after-birth": "care-journey-after-birth",
};

export function ServicesCareJourney() {
  return (
    <section
      id="treatment-showcase"
      aria-labelledby="care-journey-heading"
      className="relative isolate bg-paper section-pad"
    >
      <div className="container-birthwave">
        <div className="flex max-w-2xl flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <div>
            <p className="eyebrow">{careJourneyIntro.eyebrow}</p>
            <h2
              id="care-journey-heading"
              className="mt-4 text-[clamp(2.1rem,1.6rem+2.2vw,3rem)] leading-[1.08] font-semibold tracking-[var(--tracking-tight)] text-ink"
            >
              {careJourneyIntro.heading}
            </h2>
          </div>
          <a
            href={careJourneyIntro.jumpHref}
            className="shrink-0 text-sm font-medium text-ink-soft underline decoration-[var(--color-border-strong)] underline-offset-4 transition-colors duration-[var(--duration-fast)] hover:text-terracotta-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-focus-ring)]"
          >
            {careJourneyIntro.jumpLabel}
          </a>
        </div>

        <div className="mt-16 flex flex-col gap-24 sm:gap-28 lg:gap-32">
          {careChapters.map((chapter, index) => (
            <ChapterSpread key={chapter.id} chapter={chapter} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ChapterSpread({ chapter, index }: { chapter: ResolvedChapter; index: number }) {
  const { ref, revealed } = useScrollReveal<HTMLDivElement>({ threshold: 0.12 });
  const imageOnRight = index % 2 === 1;
  const chapterNumber = String(index + 1).padStart(2, "0");
  const imageKey = CHAPTER_IMAGE_KEY[chapter.id];

  return (
    <div ref={ref} className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-8">
      <div
        className={cx(
          "lg:col-span-5",
          imageOnRight ? "lg:order-2 lg:col-start-8" : "lg:col-start-1",
        )}
      >
        <div className="flex items-baseline gap-4">
          <span className="font-display text-5xl font-semibold text-terracotta/25 tabular-nums sm:text-6xl">
            {chapterNumber}
          </span>
          <p className="font-body text-sm font-semibold tracking-[var(--tracking-wider)] text-terracotta-deep uppercase">
            {chapter.label}
          </p>
        </div>

        <div
          className={cx(
            "relative mt-6 w-[80vw] max-w-md transition-[transform,opacity] duration-[var(--duration-base)] ease-[var(--ease-signature)] motion-reduce:translate-y-0 motion-reduce:opacity-100 sm:w-full lg:max-w-none",
            imageOnRight ? "ml-auto lg:ml-0" : "mr-auto",
            revealed ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
          )}
        >
          <ServicesEditorialImage
            imageKey={imageKey}
            corner={imageOnRight ? "tl" : "tr"}
            aspect="aspect-[4/5]"
            sizes="(max-width: 639px) 80vw, (max-width: 1023px) 60vw, 34vw"
          />
        </div>
      </div>

      <div
        className={cx(
          "mt-10 lg:col-span-6 lg:mt-0",
          imageOnRight ? "lg:order-1 lg:col-start-1" : "lg:col-start-7",
        )}
      >
        <p className="max-w-[46ch] text-lg leading-[var(--leading-relaxed)] text-ink-soft">{chapter.intro}</p>

        <ul className="mt-8 flex flex-col border-t border-[var(--color-border)]">
          {chapter.services.map((service, serviceIndex) => (
            <ServiceLink
              key={service.slug}
              service={service}
              chapterServiceIndex={serviceIndex}
              revealed={revealed}
              delayMs={120 + serviceIndex * 70}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

function ServiceLink({
  service,
  chapterServiceIndex,
  revealed,
  delayMs,
}: {
  service: ServiceContent;
  chapterServiceIndex: number;
  revealed: boolean;
  delayMs: number;
}) {
  const globalIndex = servicesShowcaseOrder.indexOf(service);
  // The chapter's own first/lead service reads slightly larger — a small
  // scale variance so hierarchy comes from typography, not a repeated
  // photo per link (per the brief's own "service names may vary in scale
  // slightly within a chapter").
  const isLead = chapterServiceIndex === 0;

  return (
    <li
      className={cx(
        "border-b border-[var(--color-border)] py-6 transition-[transform,opacity] duration-[var(--duration-base)] ease-[var(--ease-signature)] motion-reduce:translate-y-0 motion-reduce:opacity-100 sm:py-7",
        chapterServiceIndex % 2 === 1 && "sm:pl-8",
        revealed ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
      )}
      style={{ transitionDelay: revealed ? `${delayMs}ms` : "0ms" }}
    >
      <Link
        href={`/services/${service.slug}`}
        aria-label={`Explore Care: ${service.name}`}
        className="group flex items-start gap-5"
      >
        <span
          className="font-display shrink-0 pt-1 text-sm font-semibold tabular-nums"
          style={{ color: accentVar(globalIndex) }}
        >
          {String(globalIndex + 1).padStart(2, "0")}
        </span>
        <span className="flex-1">
          <span
            className={cx(
              "block font-semibold text-ink transition-transform duration-[var(--duration-fast)] ease-[var(--ease-signature)] group-hover:translate-x-1",
              isLead ? "text-2xl sm:text-[1.75rem]" : "text-xl",
            )}
          >
            {service.name}
          </span>
          <span className="mt-1.5 block max-w-[40ch] text-[0.9375rem] leading-[var(--leading-relaxed)] text-ink-soft">
            {service.shortDescription}
          </span>
          <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-terracotta-deep transition-colors duration-[var(--duration-fast)] group-hover:text-ink">
            Explore care
            <ArrowUpRight
              aria-hidden="true"
              className="size-3.5 transition-transform duration-[var(--duration-fast)] ease-[var(--ease-signature)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
        </span>
      </Link>
    </li>
  );
}
