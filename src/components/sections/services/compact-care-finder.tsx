"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { doorwaysCareFinder, type CareFinderColumn } from "@/content/services-content";
import { servicesImagery } from "@/content/services-imagery";
import { useScrollReveal } from "@/motion/scroll-scenes";
import { useParallax } from "@/motion/image-motion";
import { cx } from "@/lib/cx";

/**
 * Section 02 — Doorways into Care ("What can we help you with?").
 *
 * Three borderless editorial columns on a warm ivory surface:
 * - Column 01: Your health (5 service links)
 * - Column 02: Pregnancy & birth (4 service links)
 * - Column 03: After birth & baby (2 service links + compact muted-blush help panel)
 *
 * Architectural arch photograph crowns each doorway with restrained internal parallax.
 * Service links are single semantic rows with fine hairline rules and subtle hover highlights.
 * Preserves all 11 existing destinations (in-page anchors and sub-service pages).
 */
export function CompactCareFinder() {
  const { ref, revealed } = useScrollReveal<HTMLDivElement>({ threshold: 0.08 });
  const [forceVisible, setForceVisible] = useState(false);
  const isVisible = revealed || forceVisible;

  return (
    <section
      id="find-care"
      aria-labelledby="care-finder-heading"
      className="relative isolate scroll-mt-[calc(var(--header-height)+1.5rem)] border-y border-[var(--color-border)] bg-paper py-16 sm:py-20 lg:py-24"
      onFocusCapture={() => setForceVisible(true)}
    >
      {/* Anchor alias so #find-the-right-care also lands cleanly here */}
      <div
        id="find-the-right-care"
        className="absolute -top-[calc(var(--header-height)+1.5rem)]"
        aria-hidden="true"
      />

      <div className="container-birthwave">
        {/* Section Header */}
        <header className="max-w-2xl">
          <p className="eyebrow text-terracotta-deep font-semibold">
            {doorwaysCareFinder.eyebrow}
          </p>
          <h2
            id="care-finder-heading"
            className="mt-3 text-[clamp(2rem,1.5rem+2vw,2.75rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink"
          >
            A place for every part of{" "}
            <span className="font-serif italic font-normal text-ink">you</span>.
          </h2>
          <p className="mt-4 max-w-[54ch] text-base leading-[var(--leading-relaxed)] text-ink-soft sm:text-lg">
            {doorwaysCareFinder.description}
          </p>
        </header>

        {/* Three-Column Doorways Grid */}
        <div
          ref={ref}
          className="mt-12 sm:mt-14 lg:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-12 lg:gap-10 xl:gap-12 items-start"
        >
          {doorwaysCareFinder.columns.map((column, index) => (
            <DoorwayColumn
              key={column.number}
              column={column}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Single Doorway Column with arch photograph, group heading, and service links.
 */
function DoorwayColumn({
  column,
  index,
  isVisible,
}: {
  column: CareFinderColumn;
  index: number;
  isVisible: boolean;
}) {
  const parallaxRef = useParallax<HTMLDivElement>({
    factor: 0.08,
    maxOffsetPx: 20,
    minViewportWidth: 1024,
  });

  const image = servicesImagery[column.imageKey];

  return (
    <article
      className={cx(
        "flex flex-col transition-[transform,opacity] duration-[var(--duration-base)] ease-[var(--ease-signature)] motion-reduce:translate-y-0 motion-reduce:opacity-100",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
      )}
      style={{
        transitionDelay: isVisible ? `${index * 80}ms` : "0ms",
      }}
    >
      {/* Arch-shaped photograph frame */}
      <div
        className="relative w-full aspect-[16/11] sm:aspect-[5/4] overflow-hidden bg-paper-dim shadow-[0_4px_24px_rgba(42,36,33,0.03)]"
        style={{
          borderTopLeftRadius: "50% 45%",
          borderTopRightRadius: "50% 45%",
          borderBottomLeftRadius: "0px",
          borderBottomRightRadius: "0px",
        }}
      >
        <div
          ref={parallaxRef}
          style={{ transform: "translate3d(0, var(--parallax-y, 0px), 0) scale(1.08)" }}
          className="relative h-full w-full will-change-transform"
        >
          <Image
            src={image.src}
            alt={column.imageAlt}
            fill
            sizes="(max-width: 767px) 92vw, (max-width: 1023px) 45vw, 360px"
            className="object-cover"
            style={{ objectPosition: column.imageFocalPoint }}
          />
        </div>

        {/* Clinical illustration disclaimer badge */}
        <p className="absolute bottom-2.5 right-2.5 left-2.5 z-10 w-fit max-w-[calc(100%-1.25rem)] rounded-xs bg-paper/95 px-2 py-0.5 font-body text-[0.625rem] leading-snug text-ink-soft backdrop-blur-xs select-none">
          AI-generated illustration · Clinic photography pending
        </p>
      </div>

      {/* Group Header: Chapter Number & Heading */}
      <div className="mt-6 sm:mt-7 flex items-baseline gap-2.5 sm:gap-3">
        <span
          className="font-serif italic text-terracotta text-xl sm:text-2xl font-normal leading-none select-none"
          aria-hidden="true"
        >
          {column.number}
        </span>
        <h3 className="text-xl sm:text-2xl font-semibold tracking-[var(--tracking-tight)] text-ink leading-tight">
          {column.heading}
        </h3>
      </div>

      {/* Service Links List */}
      <ul className="mt-5 border-t border-[var(--color-border)] divide-y divide-[var(--color-border)]">
        {column.links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="group -mx-2 sm:-mx-2.5 flex min-h-[48px] items-center justify-between gap-3 rounded-xs px-2 sm:px-2.5 py-3 sm:py-3.5 transition-colors duration-[var(--duration-fast)] hover:bg-terracotta/[0.04] focus-visible:bg-terracotta/[0.04] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)]"
            >
              <span className="text-[0.9375rem] sm:text-base font-medium text-ink transition-colors duration-[var(--duration-fast)] group-hover:text-terracotta-deep group-hover:underline group-focus-visible:underline underline-offset-4 decoration-terracotta/40 leading-snug">
                {link.label}
              </span>
              <span
                aria-hidden="true"
                className="shrink-0 text-ink-soft/70 transition-transform duration-[var(--duration-fast)] group-hover:text-terracotta-deep group-hover:translate-x-0.5"
              >
                {link.isAnchor ? (
                  <ArrowDown className="size-4" />
                ) : (
                  <ArrowUpRight className="size-4" />
                )}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Optional Compact Help Panel (beneath Column 03 links) */}
      {column.number === "03" && (
        <div className="mt-6 rounded-xs bg-[#F7EFEA] border border-terracotta/20 p-5 sm:p-6 transition-all duration-[var(--duration-fast)] hover:border-terracotta/40 text-left">
          <p className="font-display font-semibold text-ink text-base sm:text-lg">
            {doorwaysCareFinder.helpPanel.heading}
          </p>
          <Link
            href={doorwaysCareFinder.helpPanel.linkHref}
            className="group/help mt-3 inline-flex items-center gap-1.5 text-sm sm:text-[0.9375rem] font-semibold text-terracotta-deep transition-colors hover:text-terracotta focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)]"
          >
            <span className="underline-offset-4 group-hover/help:underline">
              {doorwaysCareFinder.helpPanel.linkText}
            </span>
            <ArrowUpRight
              aria-hidden="true"
              className="size-4 shrink-0 transition-transform duration-[var(--duration-fast)] group-hover/help:translate-x-0.5 group-hover/help:-translate-y-0.5"
            />
          </Link>
        </div>
      )}
    </article>
  );
}
