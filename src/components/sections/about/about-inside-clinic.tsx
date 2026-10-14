"use client";

import { useEffect, useRef } from "react";
import { aboutInsideClinic } from "@/content/about-clinic-content";
import { CtaLink } from "@/components/ui/cta-link";
import { useReducedMotion } from "@/motion/reduced-motion";
import { ensureScrollTriggerRegistered, gsap, SIGNATURE_EASE } from "@/motion/gsap-scroll";

/**
 * "Inside The BirthWave" — A large, responsive clinic video showcase.
 *
 * Replaces the multi-image gallery with a single spacious video frame showing
 * the clinic interior.
 *
 * Playback behavior:
 * - Native controls enabled (play/pause, volume, fullscreen, seeker).
 * - Defaults to muted with playsInline for mobile compatibility.
 * - IntersectionObserver attempts autoplay when substantially visible (>= 50%),
 *   and pauses when scrolling away (< 20%).
 * - User manual pause is strictly respected; the observer will not restart playback
 *   if the user explicitly paused.
 * - Under prefers-reduced-motion or Save-Data preferences, autoplay is disabled
 *   in favor of user-initiated click-to-play.
 *
 * Animation:
 * - Desktop: GSAP ScrollTrigger gently expands the outer frame from a subtle inset
 *   (scale 0.94) to full container width as the section scrolls into view.
 * - Mobile: Clean, quick fade-in.
 * - Reduced motion: Displays full layout immediately with zero transforms.
 */
export function AboutInsideClinic() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoFrameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const reducedMotion = useReducedMotion();
  const userPausedRef = useRef(false);
  const isProgrammaticActionRef = useRef(false);

  const { video } = aboutInsideClinic;

  // Intersection-based smart autoplay & pause on scroll
  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    // Check data-saver preference
    const nav = typeof navigator !== "undefined" ? (navigator as unknown as { connection?: { saveData?: boolean } }) : null;
    const isDataSaver = Boolean(nav?.connection?.saveData);
    const allowAutoplay = !reducedMotion && !isDataSaver;

    if (!allowAutoplay) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            // Only autoplay if user hasn't manually paused
            if (!userPausedRef.current && videoEl.paused) {
              isProgrammaticActionRef.current = true;
              const playPromise = videoEl.play();
              if (playPromise !== undefined) {
                playPromise
                  .catch(() => {
                    // Autoplay blocked by browser policy; user can tap native play control
                  })
                  .finally(() => {
                    isProgrammaticActionRef.current = false;
                  });
              } else {
                isProgrammaticActionRef.current = false;
              }
            }
          } else if (!entry.isIntersecting || entry.intersectionRatio < 0.2) {
            // When leaving view, pause playback
            if (!videoEl.paused) {
              isProgrammaticActionRef.current = true;
              videoEl.pause();
              setTimeout(() => {
                isProgrammaticActionRef.current = false;
              }, 50);
            }
          }
        }
      },
      {
        threshold: [0, 0.2, 0.5, 0.8],
      },
    );

    observer.observe(videoEl);
    return () => observer.disconnect();
  }, [reducedMotion]);

  // Subtle scroll-expand on the outer frame
  useEffect(() => {
    if (reducedMotion) return;
    const section = sectionRef.current;
    const frame = videoFrameRef.current;
    if (!section || !frame) return;

    ensureScrollTriggerRegistered();
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop: subtle scroll-expand (keeps video undistorted and controls stable)
      mm.add("(min-width: 769px)", () => {
        gsap.fromTo(
          frame,
          { scale: 0.94, opacity: 0.92 },
          {
            scale: 1,
            opacity: 1,
            ease: SIGNATURE_EASE,
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              end: "top 35%",
              scrub: 0.5,
            },
          },
        );
      });

      // Mobile: simple short fade-in
      mm.add("(max-width: 768px)", () => {
        gsap.fromTo(
          frame,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: frame,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          },
        );
      });
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  const handlePause = () => {
    if (!isProgrammaticActionRef.current) {
      userPausedRef.current = true;
    }
  };

  const handlePlay = () => {
    if (!isProgrammaticActionRef.current) {
      userPausedRef.current = false;
    }
  };

  return (
    <section
      ref={sectionRef}
      id="about-inside-clinic"
      aria-labelledby="about-inside-clinic-heading"
      className="relative isolate bg-paper section-pad"
    >
      <div className="container-birthwave">
        <p className="eyebrow">{aboutInsideClinic.eyebrow}</p>
        <h2
          id="about-inside-clinic-heading"
          className="mt-4 max-w-2xl text-[clamp(2.1rem,1.6rem+2.2vw,3rem)] leading-[1.08] font-semibold tracking-[var(--tracking-tight)] text-ink"
        >
          {aboutInsideClinic.heading}
        </h2>
        <div className="mt-5 max-w-2xl space-y-4 text-lg leading-[var(--leading-relaxed)] text-ink-soft">
          {aboutInsideClinic.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-8">
          <CtaLink href={aboutInsideClinic.cta.href}>
            {aboutInsideClinic.cta.label}
          </CtaLink>
        </div>

        {/* Spacious Landscape Video Frame */}
        <div className="mt-12 overflow-hidden sm:mt-14">
          <div
            ref={videoFrameRef}
            className="relative w-full overflow-hidden rounded-2xl bg-[#2A201C] ring-1 ring-[var(--color-border)] shadow-[0_4px_24px_rgba(42,32,28,0.04)]"
            style={{
              aspectRatio: video.aspectRatio,
              transformOrigin: "center center",
            }}
          >
            <video
              ref={videoRef}
              src={video.src}
              poster={video.poster}
              controls
              muted
              playsInline
              preload="metadata"
              onPause={handlePause}
              onPlay={handlePlay}
              className="h-full w-full object-contain"
              aria-label={video.title}
            >
              Your browser does not support the video tag.
            </video>
          </div>

          {video.caption ? (
            <p className="mt-3 text-sm text-ink-soft">
              {video.caption}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
