"use client";

import { useEffect, useRef } from "react";
import { doctors } from "@/content/doctors-content";

import { DoctorProfileContent } from "@/components/sections/doctors/doctor-profile-content";
import { useReducedMotion } from "@/motion/reduced-motion";
import { ensureScrollTriggerRegistered, gsap } from "@/motion/gsap-scroll";
import { DOCTORS_SURFACE } from "@/components/sections/doctors/doctors-surfaces";

export function FounderSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const founder = doctors.find((doctor) => doctor.team === "founder");

  useEffect(() => {
    if (reducedMotion) return;
    const el = sectionRef.current;
    if (!el) return;

    const imgEl = el.querySelector<HTMLElement>("[data-doctor-image]");
    const contentEl = el.querySelector<HTMLElement>("[data-doctor-content]");
    if (!imgEl || !contentEl) return;

    ensureScrollTriggerRegistered();
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;
      const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

      const imgStartX = isMobile ? 0 : isTablet ? -28 : -48;
      const imgStartY = isMobile ? 16 : 10;
      const imgStartScale = isMobile ? 0.99 : 0.98;

      const contentStartX = isMobile ? 0 : isTablet ? 28 : 48;
      const contentStartY = isMobile ? 14 : 10;

      gsap.set(imgEl, { opacity: 0, x: imgStartX, y: imgStartY, scale: imgStartScale });
      gsap.set(contentEl, { opacity: 0, x: contentStartX, y: contentStartY });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 78%",
          end: "top 48%",
          toggleActions: "play none none none",
        },
      });

      tl.to(imgEl, {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.75,
        ease: "power2.out",
      }).to(
        contentEl,
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.75,
          ease: "power2.out",
        },
        "-=0.63",
      );
    }, el);

    return () => ctx.revert();
  }, [reducedMotion]);


  if (!founder) return null;

  return (
    <section ref={sectionRef} aria-labelledby="founder-heading" className={`relative isolate overflow-hidden section-pad ${DOCTORS_SURFACE}`}>
      <div className="container-birthwave grid gap-12 overflow-x-hidden sm:grid-cols-[0.8fr_1.2fr] sm:items-start sm:gap-16">
        <DoctorProfileContent
          doctor={founder}
          index={0}
          drift
          featured
          headingId="founder-heading"
          headingLevel="h2"
          portraitWrapperClassName="block w-full"
        />
      </div>
    </section>
  );
}
