"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import type { CareChapter, CareGroup, ServiceContent } from "@/content/services-content";
import { careChapters } from "@/content/services-content";
import { servicesImagery, type ServicesImageKey } from "@/content/services-imagery";
import { useParallax } from "@/motion/image-motion";
import { useReducedMotion } from "@/motion/reduced-motion";
import { ensureScrollTriggerRegistered, gsap, ScrollTrigger } from "@/motion/gsap-scroll";
import { cx } from "@/lib/cx";

type ResolvedChapter = CareChapter & { services: ServiceContent[] };

const CHAPTER_IMAGE_KEY: Record<CareGroup, ServicesImageKey> = {
  "womens-health": "care-journey-womens-health",
  "planning-a-pregnancy": "care-journey-planning-a-pregnancy",
  "pregnancy-care": "care-journey-pregnancy-care",
  "preparing-for-birth": "care-journey-preparing-for-birth",
  "birth-options": "care-journey-birth-options",
  "after-birth": "care-journey-after-birth",
  "baby-care": "care-journey-baby-care",
};

const CHAPTER_IMAGE_FOCAL_POINT: Record<CareGroup, string> = {
  "womens-health": "center 20%",
  "planning-a-pregnancy": "center 25%",
  "pregnancy-care": "center 25%",
  "preparing-for-birth": "center 20%",
  "birth-options": "center 25%",
  "after-birth": "center 20%",
  "baby-care": "center 20%",
};

/**
 * Section 03 — The Seven Care Chapters.
 *
 * Consistently applied across all seven chapters:
 * - Chapter label, prominent heading and introduction at the top.
 * - ~40% large photograph on the left.
 * - ~60% vertical service-card list on the right.
 * - Women's Health features a bounded editorial scrollbar matching the photo height with hover cue.
 * - Interactive hover states: elevation lift, terracotta glow, arrow movement, and subtle image scale.
 */
export function ServicesCareJourney() {
  return (
    <section
      id="care-chapters"
      aria-label="Care chapters directory"
      className="relative isolate bg-paper py-(--space-section)"
    >
      <div className="container-birthwave flex flex-col gap-24 sm:gap-28 lg:gap-32">
        {careChapters.map((chapter, index) => (
          <ChapterSection
            key={chapter.id}
            chapter={chapter}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}

/**
 * Shared Chapter Section Component used across all seven care chapters.
 */
function ChapterSection({
  chapter,
  index,
}: {
  chapter: ResolvedChapter;
  index: number;
}) {
  const cardsContainerRef = useRef<HTMLUListElement | null>(null);
  const reducedMotion = useReducedMotion();
  const [forceVisible, setForceVisible] = useState(false);

  const chapterNumber = String(index + 1).padStart(2, "0");
  const imageKey = CHAPTER_IMAGE_KEY[chapter.id];
  const image = servicesImagery[imageKey];
  const focalPoint = CHAPTER_IMAGE_FOCAL_POINT[chapter.id] ?? "center center";

  // Women's Health has 8 services: enable internal editorial scrolling matching photo height
  const isScrollable = chapter.id === "womens-health";
  // Sticking is used for unconstrained long lists (>= 4 services)
  const isStickyEligible = !isScrollable && chapter.services.length >= 4;

  const parallaxRef = useParallax<HTMLDivElement>({
    factor: 0.06,
    maxOffsetPx: 18,
    minViewportWidth: 1024,
  });

  useEffect(() => {
    if (reducedMotion || !cardsContainerRef.current) return;

    ensureScrollTriggerRegistered();

    const cards = Array.from(
      cardsContainerRef.current.querySelectorAll<HTMLLIElement>(".chapter-service-card"),
    );
    if (!cards.length) return;

    const isMobile = window.innerWidth < 768;
    const yDistance = isMobile ? 12 : 20;

    const ctx = gsap.context(() => {
      // Set initial hidden state
      gsap.set(cards, { opacity: 0, y: yDistance });

      if (isScrollable) {
        // For the scrollable list in Women's Health, stagger-reveal all cards when the list enters view
        ScrollTrigger.create({
          trigger: cardsContainerRef.current,
          start: "top 88%",
          once: true,
          onEnter: () => {
            gsap.to(cards, {
              opacity: 1,
              y: 0,
              duration: 0.55,
              stagger: 0.06,
              ease: "power2.out",
              clearProps: "transform,opacity",
            });
          },
          onEnterBack: () => {
            gsap.to(cards, {
              opacity: 1,
              y: 0,
              duration: 0.55,
              stagger: 0.06,
              ease: "power2.out",
              clearProps: "transform,opacity",
            });
          },
        });
      } else {
        // Trigger each card as it enters the viewport; batch cards entering together with 80ms stagger
        ScrollTrigger.batch(cards, {
          start: "top 92%",
          once: true,
          onEnter: (batch) => {
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: 0.55,
              stagger: 0.08,
              ease: "power2.out",
              clearProps: "transform,opacity",
            });
          },
          onEnterBack: (batch) => {
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: 0.55,
              stagger: 0.08,
              ease: "power2.out",
              clearProps: "transform,opacity",
            });
          },
        });
      }
    }, cardsContainerRef);

    return () => {
      ctx.revert();
    };
  }, [reducedMotion, isScrollable]);

  // Immediately reveal card if focused via keyboard
  const handleCardFocus = (e: React.FocusEvent<HTMLLIElement>) => {
    gsap.to(e.currentTarget, { opacity: 1, y: 0, duration: 0.2, overwrite: "auto", clearProps: "transform,opacity" });
  };

  return (
    <article
      id={chapter.id}
      aria-labelledby={`chapter-${chapter.id}-heading`}
      className="scroll-mt-[calc(var(--header-height)+1.5rem)]"
      onFocusCapture={() => setForceVisible(true)}
    >
      {/* ── Category Header (Headline and introduction above grid) ── */}
      <header className="max-w-3xl">
        <p className="eyebrow text-terracotta-deep font-semibold">
          {chapterNumber} — {chapter.label}
        </p>
        <h2
          id={`chapter-${chapter.id}-heading`}
          className="mt-3 text-[clamp(2rem,1.55rem+2vw,2.75rem)] leading-[1.08] font-semibold tracking-[var(--tracking-tight)] text-ink"
        >
          {chapter.heading}
        </h2>
        <p className="mt-4 max-w-[56ch] text-base leading-[var(--leading-relaxed)] text-ink-soft sm:text-lg">
          {chapter.intro}
        </p>
      </header>

      {/* ── Main Chapter Grid: ~40% Image Left / ~60% Service Cards Right ── */}
      <div className="mt-10 lg:mt-12 md:grid md:grid-cols-12 md:gap-8 lg:gap-10 xl:gap-14">
        {/* Left Column: Photograph */}
        <div className="md:col-span-5">
          <div
            className={cx(
              "group/image relative w-full overflow-hidden rounded-[16px] sm:rounded-[18px] bg-paper-dim shadow-[0_12px_36px_rgba(42,36,33,0.04)] transition-shadow duration-500 hover:shadow-[0_16px_40px_rgba(42,36,33,0.08)]",
              isStickyEligible && "chapter-photo-sticky",
              "max-h-[min(540px,calc(100vh-var(--header-height)-4rem))]",
              "aspect-[4/3]",
            )}
          >
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
                style={{ objectPosition: focalPoint }}
              />
            </div>
            <p className="absolute right-3 bottom-3 left-3 z-10 w-fit max-w-[calc(100%-1.5rem)] rounded-xs bg-paper/95 px-2.5 py-1 font-body text-[0.6875rem] leading-snug text-ink-soft backdrop-blur-xs select-none">
              AI-generated illustration · Clinic photography pending
            </p>
          </div>
        </div>

        {/* Right Column: Service Cards List */}
        <div className="mt-8 md:mt-0 md:col-span-7">
          {/* Header above cards with accurate service count and scroll hint for scrollable chapters */}
          <div className="mb-4 flex items-center justify-between text-xs text-ink-soft">
            <span className="font-semibold uppercase tracking-wider text-terracotta-deep">
              {chapter.services.length} {chapter.services.length === 1 ? "Area of Care" : "Areas of Care"}
            </span>
            {isScrollable && (
              <span className="inline-flex items-center gap-1.5 font-medium text-ink-soft/80 select-none">
                <span>Scroll to view all</span>
                <ArrowDown aria-hidden="true" className="size-3 text-terracotta animate-bounce" />
              </span>
            )}
          </div>

          <div
            tabIndex={isScrollable ? 0 : undefined}
            role={isScrollable ? "region" : undefined}
            aria-label={isScrollable ? `${chapter.label} services list` : undefined}
            className={cx(
              isScrollable &&
                "max-h-[460px] sm:max-h-[500px] lg:max-h-[540px] overflow-y-auto overscroll-contain pr-2 sm:pr-3 scrollbar-editorial scroll-smooth rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)]",
            )}
          >
            <ul ref={cardsContainerRef} className={cx("flex flex-col gap-4", isScrollable && "py-1 pl-1")}>
              {chapter.services.map((service) => (
                <li
                  key={service.slug}
                  className={cx(
                    "chapter-service-card will-change-[transform,opacity]",
                    (reducedMotion || forceVisible) && "!opacity-100 !translate-y-0",
                  )}
                  onFocusCapture={handleCardFocus}
                >
                  <Link
                    href={`/services/${service.slug}`}
                    aria-label={`Explore care: ${service.name}`}
                    className="group block rounded-[12px] border border-[var(--color-border)] bg-white p-6 sm:p-7 transition-all duration-[var(--duration-fast)] ease-[var(--ease-signature)] hover:-translate-y-1 hover:border-terracotta/50 hover:bg-[#FDFBF9] hover:shadow-[0_12px_28px_-6px_rgba(196,112,89,0.12),0_4px_12px_rgba(42,36,33,0.04)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)]"
                  >
                    <h3 className="text-base sm:text-lg font-semibold tracking-[var(--tracking-tight)] text-ink transition-colors duration-[var(--duration-fast)] group-hover:text-terracotta-deep">
                      {service.name}
                    </h3>
                    <p className="mt-2 text-sm leading-[var(--leading-relaxed)] text-ink-soft transition-colors duration-[var(--duration-fast)] group-hover:text-ink">
                      {service.shortDescription}
                    </p>
                    <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-terracotta transition-colors duration-[var(--duration-fast)] group-hover:text-terracotta-deep">
                      <span>Explore care</span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-3.5 transition-transform duration-[var(--duration-fast)] group-hover:translate-x-1 group-hover:-translate-y-1"
                      />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Optional chapter clinical note (e.g. Chapter 05 Birth Options guidance) */}
          {chapter.note && (
            <p className="mt-6 border-t border-[var(--color-border)] pt-4 text-sm italic text-ink-soft/85 leading-relaxed">
              {chapter.note}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
