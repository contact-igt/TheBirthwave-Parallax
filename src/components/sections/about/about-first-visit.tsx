"use client";

import { useEffect, useRef } from "react";
import { aboutFirstVisit } from "@/content/about-clinic-content";
import { useReducedMotion } from "@/motion/reduced-motion";
import { ensureScrollTriggerRegistered, gsap, SIGNATURE_EASE } from "@/motion/gsap-scroll";

/**
 * Section: "Your First Visit"
 *
 * Three structured steps explaining what to expect when visiting the clinic.
 * Uses a warm, clean card container with large subtle numerals and staggered entrance animation.
 */
export function AboutFirstVisit() {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const container = containerRef.current;
    const cards = cardsRef.current;
    if (!container || !cards) return;

    ensureScrollTriggerRegistered();
    const ctx = gsap.context(() => {
      const stepCards = cards.querySelectorAll<HTMLElement>("[data-visit-step]");
      if (!stepCards.length) return;

      gsap.fromTo(
        stepCards,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: SIGNATURE_EASE,
          scrollTrigger: {
            trigger: cards,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );
    }, container);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={containerRef}
      id="first-visit"
      aria-labelledby="first-visit-heading"
      className="section-pad bg-paper relative overflow-hidden"
    >
      <div className="container-birthwave max-w-5xl">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <p className="eyebrow text-terracotta mb-3">{aboutFirstVisit.eyebrow}</p>
          <h2
            id="first-visit-heading"
            className="text-[clamp(1.9rem,1.5rem+1.8vw,3rem)] font-light leading-[1.15] tracking-[var(--tracking-tight)] text-espresso"
          >
            {aboutFirstVisit.heading}
          </h2>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {aboutFirstVisit.steps.map((step) => (
            <div
              key={step.index}
              data-visit-step
              className="relative p-7 sm:p-8 rounded-2xl bg-[#FBF8F4] border border-[#EAE1D7] flex flex-col justify-between transition-shadow duration-300 hover:shadow-[0_8px_24px_rgba(42,32,28,0.04)]"
            >
              <div>
                <span
                  className="block text-4xl sm:text-5xl font-light text-terracotta/30 tracking-tight mb-4 font-serif"
                  aria-hidden="true"
                >
                  {step.index}
                </span>
                <h3 className="text-lg sm:text-xl font-normal text-espresso mb-3 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-muted">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
