"use client";

import { useEffect, useRef } from "react";
import type { DoctorContent } from "@/content/doctors-content";
import { DoctorProfileContent } from "@/components/sections/doctors/doctor-profile-content";
import { useReducedMotion } from "@/motion/reduced-motion";
import { ensureScrollTriggerRegistered, gsap } from "@/motion/gsap-scroll";
import { cx } from "@/lib/cx";

export function DoctorProfileRow({ doctor, index }: { doctor: DoctorContent; index: number }) {
  const rowRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const el = rowRef.current;
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

  return (
    <article
      ref={rowRef}
      className={cx(
        "overflow-x-hidden border-t border-[var(--color-border)] py-12 first:border-t-0 first:pt-0 sm:grid sm:grid-cols-[0.75fr_1fr] sm:items-start sm:gap-14 sm:py-16",
      )}
    >
      <DoctorProfileContent
        doctor={doctor}
        index={index}
        drift
        portraitWrapperClassName="block w-full max-w-md sm:max-w-none"
      />
    </article>
  );
}
