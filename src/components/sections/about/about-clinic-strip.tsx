"use client";

import { useEffect, useRef } from "react";
import { contactPlaceholders } from "@/content/contact-content";
import { aboutClinicStrip } from "@/content/about-clinic-content";
import { Button } from "@/components/ui/button";
import { useReducedMotion } from "@/motion/reduced-motion";
import { ensureScrollTriggerRegistered, gsap, SIGNATURE_EASE } from "@/motion/gsap-scroll";

/**
 * Section: "Visit The BirthWave" — compact clinic location strip
 *
 * Displays verified clinic address, phone, email, Google Maps link, and
 * appointment booking button in a refined horizontal strip.
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

  const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(contactPlaceholders.clinicAddress)}`;

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
            <p className="eyebrow text-terracotta">Visit Us</p>
            <h2
              id="clinic-strip-heading"
              className="text-2xl sm:text-3xl font-light text-espresso tracking-tight"
            >
              {aboutClinicStrip.heading}
            </h2>
            <p className="text-sm sm:text-base text-muted leading-relaxed">
              {contactPlaceholders.clinicAddress}
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm pt-1">
              <a
                href={`tel:${contactPlaceholders.phone.replace(/[^+\d]/g, "")}`}
                className="text-espresso hover:text-terracotta font-medium transition-colors"
              >
                {contactPlaceholders.phone}
              </a>
              <span className="text-muted/40" aria-hidden="true">·</span>
              <a
                href={`mailto:${contactPlaceholders.email}`}
                className="text-espresso hover:text-terracotta font-medium transition-colors"
              >
                {contactPlaceholders.email}
              </a>
              <span className="text-muted/40" aria-hidden="true">·</span>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-terracotta hover:underline font-medium inline-flex items-center gap-1"
              >
                <span>{aboutClinicStrip.directionsLabel}</span>
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex items-center gap-4 shrink-0">
            <Button href={aboutClinicStrip.appointmentHref} variant="primary">
              {aboutClinicStrip.appointmentLabel}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
