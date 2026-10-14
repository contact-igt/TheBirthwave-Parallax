"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  womensHealthSection,
  fertilityPreconceptionSection,
  pregnancyAntenatalSection,
  birthPreparationSection,
  birthOptionsSection,
  postpartumSection,
  newbornPediatricSection,
} from "@/content/our-services-content";
import { servicesImagery, type ServicesImageKey } from "@/content/services-imagery";
import { useParallax } from "@/motion/image-motion";
import { Button } from "@/components/ui/button";
import { cx } from "@/lib/cx";

interface ChapterItem {
  title: string;
  body: string;
  cta?: { label: string; href: string };
}

interface ChapterData {
  id: string;
  eyebrow: string;
  heading: string;
  intro: readonly string[];
  services: readonly ChapterItem[];
  cta?: { label: string; href: string };
  imageKey: ServicesImageKey;
  focalPoint?: string;
  sectionNumber: string;
}

const CHAPTERS_PART_1: ChapterData[] = [
  {
    ...womensHealthSection,
    sectionNumber: "03",
    imageKey: "care-journey-womens-health",
    focalPoint: "center 20%",
  },
  {
    ...fertilityPreconceptionSection,
    sectionNumber: "04",
    imageKey: "care-journey-planning-a-pregnancy",
    focalPoint: "center 25%",
  },
  {
    ...pregnancyAntenatalSection,
    sectionNumber: "05",
    imageKey: "care-journey-pregnancy-care",
    focalPoint: "center 25%",
  },
  {
    ...birthPreparationSection,
    sectionNumber: "06",
    imageKey: "care-journey-preparing-for-birth",
    focalPoint: "center 20%",
  },
  {
    ...birthOptionsSection,
    sectionNumber: "07",
    imageKey: "care-journey-birth-options",
    focalPoint: "center 25%",
  },
];

const CHAPTERS_PART_2: ChapterData[] = [
  {
    ...postpartumSection,
    sectionNumber: "09",
    imageKey: "care-journey-after-birth",
    focalPoint: "center 20%",
  },
  {
    ...newbornPediatricSection,
    sectionNumber: "10",
    imageKey: "care-journey-baby-care",
    focalPoint: "center 20%",
  },
];

/**
 * Single Chapter Article Renderer.
 */
function ChapterArticle({ chapter }: { chapter: ChapterData }) {
  const image = servicesImagery[chapter.imageKey];
  const parallaxRef = useParallax<HTMLDivElement>({
    factor: 0.06,
    maxOffsetPx: 18,
    minViewportWidth: 1024,
  });

  return (
    <article
      id={chapter.id}
      aria-labelledby={`chapter-${chapter.id}-heading`}
      className="scroll-mt-[calc(var(--header-height)+1.5rem)]"
    >
      {/* Category Header */}
      <header className="max-w-3xl">
        <p className="eyebrow text-terracotta-deep font-semibold">
          {chapter.sectionNumber} — {chapter.eyebrow}
        </p>
        <h2
          id={`chapter-${chapter.id}-heading`}
          className="mt-3 text-h2 leading-[1.08] font-semibold tracking-[var(--tracking-tight)] text-ink"
        >
          {chapter.heading}
        </h2>
        <div className="mt-4 max-w-[56ch] space-y-2 text-base leading-[var(--leading-relaxed)] text-ink-soft sm:text-lg">
          {chapter.intro.map((para) => (
            <p key={para}>{para}</p>
          ))}
        </div>
      </header>

      {/* Main Chapter Grid: ~42% Image Left / ~58% Service Cards Right */}
      <div className="mt-10 lg:mt-12 md:grid md:grid-cols-12 md:gap-8 lg:gap-10 xl:gap-14">
        {/* Left Column: Photograph */}
        <div className="md:col-span-5">
          <div className="group/image relative w-full overflow-hidden rounded-[16px] sm:rounded-[18px] bg-paper-dim shadow-[0_12px_36px_rgba(42,36,33,0.04)] aspect-[4/3] md:aspect-[4/4.5] lg:aspect-[4/5] md:sticky md:top-[calc(var(--header-height)+2rem)]">
            <div
              ref={parallaxRef}
              style={{ transform: "translate3d(0, var(--parallax-y, 0px), 0) scale(1.08)" }}
              className="relative h-full w-full will-change-transform transition-transform duration-700 ease-out group-hover/image:scale-[1.12]"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 639px) 92vw, (max-width: 1023px) 80vw, 480px"
                className="object-cover"
                style={{ objectPosition: chapter.focalPoint ?? "center center" }}
              />
            </div>
            <p className="absolute right-3 bottom-3 left-3 z-10 w-fit max-w-[calc(100%-1.5rem)] rounded-xs bg-paper/95 px-2.5 py-1 font-body text-[0.6875rem] leading-snug text-ink-soft backdrop-blur-xs select-none">
              AI-generated illustration · Clinic photography pending
            </p>
          </div>
        </div>

        {/* Right Column: Service Cards List */}
        <div className="mt-8 md:mt-0 md:col-span-7">
          <div className="mb-4 flex items-center justify-between text-xs text-ink-soft">
            <span className="font-semibold uppercase tracking-wider text-terracotta-deep">
              {chapter.services.length} {chapter.services.length === 1 ? "Area of Care" : "Areas of Care"}
            </span>
          </div>

          <ul className="flex flex-col gap-4">
            {chapter.services.map((service) => (
              <li
                key={service.title}
                className="group rounded-[12px] border border-[var(--color-border)] bg-white p-6 sm:p-7 transition-all duration-[var(--duration-fast)] ease-[var(--ease-signature)] hover:-translate-y-1 hover:border-terracotta/50 hover:bg-[#FDFBF9] hover:shadow-[0_12px_28px_-6px_rgba(196,112,89,0.12),0_4px_12px_rgba(42,36,33,0.04)]"
              >
                <h3 className="text-xl font-semibold tracking-[var(--tracking-tight)] text-ink transition-colors duration-[var(--duration-fast)] group-hover:text-terracotta-deep">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-[var(--leading-relaxed)] text-ink-soft">
                  {service.body}
                </p>

                {service.cta ? (
                  <div className="mt-4 pt-3 border-t border-[var(--color-border)]/60">
                    <Link
                      href={service.cta.href}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-terracotta-deep transition-colors duration-[var(--duration-fast)] hover:text-ink"
                    >
                      <span>{service.cta.label.replace(/\s*→$/, "")}</span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-3.5 transition-transform duration-[var(--duration-fast)] group-hover:translate-x-1 group-hover:-translate-y-1"
                      />
                    </Link>
                  </div>
                ) : null}
              </li>
            ))}
          </ul>

          {/* Optional Chapter-level CTA */}
          {chapter.cta ? (
            <div className="mt-8">
              <Button href={chapter.cta.href} variant="primary">
                {chapter.cta.label.replace(/\s*→$/, "")}
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}

/**
 * Sections 03 to 07 — Care Chapters Phase 1:
 * - Women's Health (03)
 * - Fertility & Preconception (04)
 * - Pregnancy & Antenatal Care (05)
 * - Birth Preparation & Childbirth Education (06)
 * - Birth & Delivery Options (07)
 */
export function ServicesCareJourneyPart1() {
  return (
    <section aria-label="Care chapters directory part 1" className="relative isolate bg-paper py-16 sm:py-20 lg:py-24">
      <div className="container-birthwave flex flex-col gap-24 sm:gap-28 lg:gap-32">
        {CHAPTERS_PART_1.map((chapter) => (
          <ChapterArticle key={chapter.id} chapter={chapter} />
        ))}
      </div>
    </section>
  );
}

/**
 * Sections 09 and 10 — Care Chapters Phase 2:
 * - Postpartum Recovery & Care (09)
 * - Newborn & Paediatric Care (10)
 */
export function ServicesCareJourneyPart2() {
  return (
    <section aria-label="Care chapters directory part 2" className="relative isolate bg-paper py-16 sm:py-20 lg:py-24">
      <div className="container-birthwave flex flex-col gap-24 sm:gap-28 lg:gap-32">
        {CHAPTERS_PART_2.map((chapter) => (
          <ChapterArticle key={chapter.id} chapter={chapter} />
        ))}
      </div>
    </section>
  );
}

/** Alias for backward compatibility if imported elsewhere */
export function ServicesCareJourney() {
  return (
    <>
      <ServicesCareJourneyPart1 />
      <ServicesCareJourneyPart2 />
    </>
  );
}
