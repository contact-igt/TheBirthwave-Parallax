"use client";

import { useLayoutEffect, useRef } from "react";
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
import styles from "./services-overview.module.css";

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

/** Keep the whole narrative column sticky only when all its content fits. */
function useFittingChapterColumn() {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const column = ref.current;
    if (!column) return;
    const root = column.closest("[data-services-overview]");
    const nav = root?.querySelector("#care-chapters");
    const header = document.querySelector("body > header");
    let frame = 0;
    const measure = () => {
      const top = parseFloat(getComputedStyle(column).top) || 0;
      const fits = window.innerWidth >= 1024 && column.offsetHeight <= window.innerHeight - top - 24;
      column.dataset.sticky = fits ? "on" : "off";
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(column);
    if (nav) observer.observe(nav);
    if (header) observer.observe(header);
    window.addEventListener("resize", schedule);
    measure();
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", schedule);
    };
  }, []);
  return ref;
}

/**
 * Single Chapter Article Renderer.
 */
function ChapterArticle({ chapter, index }: { chapter: ChapterData; index: number }) {
  const narrativeRef = useFittingChapterColumn();
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
      className={cx(styles.chapter, index % 2 === 1 && styles.alternate)}
    >
      <div className={`container-birthwave ${styles.chapterGrid}`}>
        <div ref={narrativeRef} data-sticky="off" className={styles.chapterNarrative}>
          <header className={styles.chapterHeader}>
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

          {/* Parallax stays on the image, never the introduction or links. */}
          <div className={styles.chapterMedia}>
            <div className={styles.photoFrame}>
              <div
                ref={parallaxRef}
                style={{ transform: "translate3d(0, var(--parallax-y, 0px), 0) scale(1.08)" }}
                className="relative h-full w-full will-change-transform"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 1023px) 92vw, 480px"
                  className="object-cover"
                  style={{ objectPosition: chapter.focalPoint ?? "center center" }}
                />
              </div>
              <p className="absolute right-3 bottom-3 left-3 z-10 w-fit max-w-[calc(100%-1.5rem)] rounded-xs bg-paper/95 px-2.5 py-1 font-body text-[0.6875rem] leading-snug text-ink-soft backdrop-blur-xs select-none">
                AI-generated illustration · Clinic photography pending
              </p>
            </div>
          </div>

        </div>

        {/* Linked services are cards; informational items remain plain rows. */}
        <div className={styles.chapterServices}>
          <div className="mb-4 flex items-center justify-between text-xs text-ink-soft">
            <span className="font-semibold uppercase tracking-wider text-terracotta-deep">
              {chapter.services.length} {chapter.services.length === 1 ? "Area of Care" : "Areas of Care"}
            </span>
          </div>

          <ul className={styles.serviceList}>
            {chapter.services.map((service) => (
              <li key={service.title}>
                {service.cta ? (
                  <Link href={service.cta.href} className={styles.serviceCard}>
                    <h3 className={styles.serviceTitle}>{service.title}</h3>
                    <p className={styles.serviceBody}>{service.body}</p>
                    <span className={styles.serviceAction}>
                      <span>{service.cta.label.replace(/\s*→$/, "")}</span>
                      <ArrowUpRight aria-hidden="true" className="size-4 shrink-0" />
                    </span>
                  </Link>
                ) : (
                  <div className={styles.infoRow}>
                    <h3 className={styles.serviceTitle}>{service.title}</h3>
                    <p className={styles.serviceBody}>{service.body}</p>
                  </div>
                )}
              </li>
            ))}
          </ul>

          <div className={styles.chapterActions}>
            {chapter.cta ? (
              <Button href={chapter.cta.href} variant="primary">
                {chapter.cta.label.replace(/\s*→$/, "")}
              </Button>
            ) : null}
            <a href="#care-chapters" className={styles.backLink}>Back to care chapters</a>
          </div>
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
    <section aria-label="Care chapters directory part 1" className="relative isolate bg-paper">
      <div className={styles.chapters}>
        {CHAPTERS_PART_1.map((chapter, index) => (
          <ChapterArticle key={chapter.id} chapter={chapter} index={index} />
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
    <section aria-label="Care chapters directory part 2" className="relative isolate bg-paper">
      <div className={styles.chapters}>
        {CHAPTERS_PART_2.map((chapter, index) => (
          <ChapterArticle key={chapter.id} chapter={chapter} index={index + CHAPTERS_PART_1.length} />
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
