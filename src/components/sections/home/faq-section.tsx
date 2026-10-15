"use client";

import { useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import { faq } from "@/content/faq-content";
import { useParallax } from "@/motion/image-motion";
import { cx } from "@/lib/cx";

/**
 * Section 3: "Good to Know" / FAQ Section.
 *
 * Transformed into a balanced editorial split layout:
 * - DESKTOP (lg+):
 *   LEFT (cols 1-5): Eyebrow + large heading + calm supporting line + anchored editorial image.
 *   RIGHT (cols 6-12): The 9-item accordion list with hairline dividers.
 *   Eliminates previous awkward whitespace below the image.
 * - MOBILE:
 *   Sequential flow: Eyebrow → Heading → Supporting line → Image → Accordion.
 *   Achieved with clean responsive CSS Grid with zero duplicate DOM nodes.
 * - ACCORDION:
 *   - Smooth 0.35s ease-out height expansion via CSS Grid (0fr → 1fr).
 *   - Active row receives a subtle warm rose/paper wash (bg-[#F3E8E2]/40).
 *   - Active question typography darkens and gains weight.
 *   - Full keyboard accessibility with aria-expanded & aria-controls.
 *   - Zero motion on prefers-reduced-motion.
 * - Sits inside DotFieldRegion for delicate canvas dot texture.
 */
const noopSubscribe = () => () => {};

type FaqItem = {
  question: string;
  answer: string;
  ctaLink?: { label: string; href: string };
};

type FaqMedia = { src: string; alt: string; objectPosition?: string };

export function FaqSection({
  id = "faq",
  eyebrow = faq.eyebrow,
  heading = faq.heading,
  description = "Clear guidance and answers to the questions families ask most often when planning their care with The Birthwave.",
  items = faq.items,
  media = faq.media,
}: {
  id?: string;
  eyebrow?: string;
  heading?: string;
  description?: string;
  items?: readonly FaqItem[];
  media?: FaqMedia;
} = {}) {
  // false in the server HTML (and so without JavaScript), true once
  // hydrated — closed panels only become inert when the toggles can work.
  const hydrated = useSyncExternalStore(noopSubscribe, () => true, () => false);
  // Keep track of which accordion items are open (supports multi-item toggle)
  const [openIndices, setOpenIndices] = useState<Set<number>>(() => new Set([0]));

  const toggleItem = (index: number) => {
    setOpenIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="relative isolate py-(--space-section)"
    >
      <div className="container-birthwave relative z-10 grid grid-cols-1 gap-y-10 lg:grid-cols-12 lg:gap-x-14 lg:items-start">
        {/* LEFT COLUMN (Desktop: cols 1-5, row 1) / MOBILE (order 1) */}
        <div className="lg:col-span-5 lg:col-start-1 lg:row-start-1">
          <div className="inline-flex items-center gap-2">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-terracotta"
            />
            <p className="eyebrow !tracking-[0.16em] uppercase text-terracotta-deep">
              {eyebrow}
            </p>
          </div>
          <h2
            id={`${id}-heading`}
            className="mt-3.5 text-balance text-h2 font-semibold leading-[1.06] tracking-[var(--tracking-tight)] text-ink"
          >
            {heading}
          </h2>
          <p className="mt-4 text-base leading-[1.7] text-ink-soft sm:text-lg">
            {description}
          </p>
        </div>

        {/* IMAGE PANEL (Desktop: cols 1-5, row 2) / MOBILE (order 2, between heading & accordion) */}
        <div className="lg:col-span-5 lg:col-start-1 lg:row-start-2 lg:mt-8">
          <FaqVisual media={media} />
        </div>

        {/* RIGHT COLUMN: ACCORDION LIST (Desktop: cols 6-12, rows 1-2) / MOBILE (order 3) */}
        <div className="border-t border-[var(--color-border)] lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1">
          {items.map((item, index) => {
            const isOpen = openIndices.has(index);
            const questionId = `${id}-q-${index}`;
            const answerId = `${id}-a-${index}`;

            return (
              <div
                key={item.question}
                className={cx(
                  "border-b border-[var(--color-border)] transition-colors duration-300 ease-[var(--ease-signature)]",
                  isOpen
                    ? "rounded-xs bg-[#FAF5F2]/80 px-4 -mx-4 sm:px-5 sm:-mx-5"
                    : "hover:bg-[#FAF6F2]/40 px-0 mx-0",
                )}
              >
                <button
                  type="button"
                  id={questionId}
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => toggleItem(index)}
                  className="flex min-h-[4rem] w-full cursor-pointer items-center justify-between gap-6 py-5 text-left transition-colors duration-200 focus-visible:rounded-xs focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink focus-visible:outline-offset-2"
                >
                  <span
                    className={cx(
                      "font-display text-base leading-[1.3] text-balance sm:text-lg transition-colors duration-200",
                      isOpen
                        ? "font-semibold text-ink"
                        : "font-medium text-ink/90 hover:text-ink",
                    )}
                  >
                    {item.question}
                  </span>
                  <span
                    aria-hidden="true"
                    className="flex size-7 shrink-0 items-center justify-center rounded-full bg-paper/80 text-terracotta-deep transition-all duration-300 ease-[var(--ease-signature)]"
                  >
                    <Plus
                      className={cx(
                        "size-4.5 transition-transform duration-350 ease-[var(--ease-signature)] motion-reduce:transform-none text-terracotta-deep",
                        isOpen && "rotate-45",
                      )}
                    />
                  </span>
                </button>

                {/* Smooth CSS Grid Height Transition */}
                <div
                  id={answerId}
                  role="region"
                  aria-labelledby={questionId}
                  // Closed panels are only visually collapsed (0fr rows);
                  // inert keeps their text out of the accessibility tree
                  // so it matches aria-expanded. Never inert before
                  // hydration: without JS every answer is shown (see the
                  // <noscript> rule in site-header.tsx) and must stay readable.
                  inert={hydrated && !isOpen}
                  className="grid transition-[grid-template-rows,opacity] duration-350 ease-[var(--ease-signature)] motion-reduce:transition-none"
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <div className="overflow-hidden">
                    <p className="pb-6 pt-1 font-body text-base leading-[1.7] text-ink-soft whitespace-pre-line">
                      {item.answer}
                    </p>
                    {item.ctaLink ? (
                      <a href={item.ctaLink.href} className="mb-6 inline-block font-body text-sm font-semibold text-terracotta-deep underline underline-offset-4 hover:text-ink">
                        {item.ctaLink.label}
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/**
 * Editorial visual panel anchoring the left column under the heading on desktop,
 * and sitting smoothly between heading and accordion on mobile.
 */
function FaqVisual({ media }: { media: FaqMedia }) {
  const parallaxRef = useParallax<HTMLDivElement>({
    factor: 0.05,
    maxOffsetPx: 12,
    minViewportWidth: 1024,
  });

  return (
    <div
      ref={parallaxRef}
      style={{ transform: "translate3d(0, var(--parallax-y, 0px), 0)" }}
      className="relative aspect-[3/2] w-full overflow-hidden rounded-sm border border-ink/8 bg-paper shadow-xs"
    >
      <Image
        src={media.src}
        alt={media.alt}
        fill
        sizes="(min-width: 1024px) 38vw, 100vw"
        style={media.objectPosition ? { objectPosition: media.objectPosition } : undefined}
        className="object-cover transition-transform duration-700 ease-[var(--ease-signature)] hover:scale-102 motion-reduce:hover:scale-100"
      />
      {/* Subtle warm maternal gradient glaze */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/15 via-transparent to-transparent"
      />
    </div>
  );
}
