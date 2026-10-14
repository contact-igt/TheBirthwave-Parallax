"use client";

import { useEffect, useRef } from "react";
import { aboutClinicStrip } from "@/content/about-clinic-content";
import { Button } from "@/components/ui/button";
import { useReducedMotion } from "@/motion/reduced-motion";
import { ensureScrollTriggerRegistered, gsap, SIGNATURE_EASE } from "@/motion/gsap-scroll";

/**
 * Section 10: "Visit The BirthWave" — clinic location strip
 *
 * Displays clinic name, address, phone, email, and Get Directions CTA.
 */
export function AboutClinicStrip() {
  const stripRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const strip = stripRef.current;
    if (!strip) return;

    ensureScrollTriggerRegistered();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        strip,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: SIGNATURE_EASE,
          scrollTrigger: {
            trigger: strip,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        },
      );
    }, strip);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={stripRef}
      id="clinic-location"
      aria-labelledby="clinic-strip-heading"
      className="py-12 sm:py-16 bg-[#F5EFEB] border-y border-[#E8DFC8]/40"
    >
      <div className="container-birthwave">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12">
          {/* Clinic Details */}
          <div className="space-y-3 max-w-xl">
            <p className="eyebrow text-terracotta">{aboutClinicStrip.eyebrow}</p>
            <h2
              id="clinic-strip-heading"
              className="text-2xl sm:text-3xl font-light text-espresso tracking-tight"
            >
              {aboutClinicStrip.heading}
            </h2>
            <p className="font-semibold text-espresso text-base sm:text-lg">
              {aboutClinicStrip.clinicName}
            </p>
            <p className="text-sm sm:text-base text-muted leading-relaxed">
              {aboutClinicStrip.address}
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm pt-1">
              <a
                href={`tel:${aboutClinicStrip.phone.replace(/[^+\d]/g, "")}`}
                className="text-espresso hover:text-terracotta font-medium transition-colors"
              >
                Phone: {aboutClinicStrip.phone}
              </a>
              <span className="text-muted/40" aria-hidden="true">·</span>
              <a
                href={`mailto:${aboutClinicStrip.email}`}
                className="text-espresso hover:text-terracotta font-medium transition-colors"
              >
                Email: {aboutClinicStrip.email}
              </a>
            </div>
          </div>

          {/* Action Button: Get Directions */}
          <div className="flex items-center gap-4 shrink-0">
            <Button
              href={aboutClinicStrip.directionsHref}
              variant="primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              {aboutClinicStrip.directionsLabel} &rarr;
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
