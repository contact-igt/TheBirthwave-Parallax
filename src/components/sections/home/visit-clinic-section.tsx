"use client";

import { aboutInsideClinic } from "@/content/about-clinic-content";

/**
 * Section: "Visit The Birthwave"
 *
 * Requirements:
 * - Placed before Final Consultation CTA.
 * - Uses existing clinic video in /public/brand/about/birthwave-hospital-experience.mp4
 *   with poster /public/brand/about/birthwave-hospital-experience-poster.jpg.
 * - Video has native playback controls and useful poster; NEVER forces autoplay with sound.
 * - Wide media panel with concise visit information.
 * - Poppins for headings, Plus Jakarta Sans for body and details.
 */
export function VisitClinicSection() {
  const { video } = aboutInsideClinic;

  return (
    <section
      id="visit-clinic"
      aria-labelledby="visit-clinic-heading"
      className="relative isolate overflow-hidden bg-paper-dim/40 py-20 sm:py-24 lg:py-32 border-t border-ink/8"
    >
      <div className="container-birthwave relative z-10">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow mx-auto text-terracotta-deep">
            OUR CLINIC
          </p>
          <h2
            id="visit-clinic-heading"
            className="mt-3.5 text-balance font-display text-h2 font-semibold leading-[1.08] tracking-[var(--tracking-tight)] text-ink"
          >
            Visit The Birthwave.
          </h2>
          <p className="mt-4 font-body text-base sm:text-lg leading-[1.65] text-ink-soft">
            Explore our calm, private consultation spaces in Nungambakkam, Chennai — designed to provide unhurried, focused care for you and your family.
          </p>
        </div>

        {/* Wide Media Panel (Clinic Video Showcase) */}
        <div className="mt-12 sm:mt-16 overflow-hidden rounded-2xl sm:rounded-3xl border border-ink/10 bg-white shadow-[0_8px_32px_rgba(53,43,41,0.04)]">
          <div className="relative aspect-video w-full bg-ink/5">
            <video
              controls
              playsInline
              preload="metadata"
              poster={video.poster}
              className="h-full w-full object-cover"
              aria-label={video.title}
            >
              <source src={video.src} type="video/mp4" />
              Your browser does not support HTML5 video.
            </video>
          </div>

          <div className="px-6 py-4 bg-paper-dim/30 border-t border-ink/6 flex items-center justify-between text-xs text-ink-soft font-body">
            <span>{video.caption}</span>
            <span className="hidden sm:inline-block font-medium text-terracotta-deep">Nungambakkam, Chennai</span>
          </div>
        </div>
      </div>
    </section>
  );
}
