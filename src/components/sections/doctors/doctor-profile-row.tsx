"use client";

import { useEffect, useRef } from "react";
import type { DoctorContent } from "@/content/doctors-content";
import { DoctorProfileContent } from "@/components/sections/doctors/doctor-profile-content";
import { useReducedMotion } from "@/motion/reduced-motion";
import { ensureScrollTriggerRegistered, gsap } from "@/motion/gsap-scroll";

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
      gsap.set(imgEl, { opacity: 0, y: 16, scale: 0.98 });
      gsap.set(contentEl, { opacity: 0, y: 16 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 82%",
          end: "top 52%",
          toggleActions: "play none none none",
        },
      });

      tl.to(imgEl, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.65,
        ease: "power2.out",
      }).to(
        contentEl,
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: "power2.out",
        },
        "-=0.5",
      );
    }, el);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <article
      ref={rowRef}
      className="relative py-10 sm:py-14 border-b border-[var(--color-border)] last:border-b-0"
    >
      <div className="grid gap-8 sm:grid-cols-[1.15fr_0.85fr] lg:grid-cols-[1.2fr_0.8fr] sm:items-center sm:gap-12 lg:gap-16">
        <DoctorProfileContent
          doctor={doctor}
          index={index}
          drift
          portraitWrapperClassName="relative block w-full max-w-[320px] sm:max-w-[340px] mx-auto order-1 sm:order-2"
          contentClassName="max-w-[38rem] order-2 sm:order-1"
        />
      </div>
    </article>
  );
}
