"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/motion/reduced-motion";

import { ensureScrollTriggerRegistered, gsap } from "@/motion/gsap-scroll";

export type CareWavePreset =
  | "team"
  | "principles"
  | "services"
  | "journey"
  | "first-visit"
  | "clinic"
  | "dark-cta"
  | "hero-lower";

interface CareWaveBackgroundProps {
  preset: CareWavePreset;
  /** Optional custom class for outer wrapper */
  className?: string;
  /** Parallax intensity factor. Default: 0.06 (~25-35px offset) */
  parallaxFactor?: number;
}

/**
 * CareWaveBackground
 *
 * Professional, aesthetic animated background inspired by gentle flowing care waves.
 *
 * Design features:
 * - Softly blurred blush (#CA9585 / #F88379) and pale sky-blue (#5DAEDB) washes near section edges.
 * - Fine, flowing SVG bezier curves with terracotta, sky-blue, and coral accents.
 * - Subtle, static decorative satellite points along curves.
 * - Pure pointer-events-none, aria-hidden="true" decorative layers.
 *
 * Team section refinement:
 * - Scoped specifically to "Meet the people behind your care".
 * - Two large, sculpted organic shapes framing Dr. Santoshi (blush/terracotta) and Dr. Deepika (sky-blue).
 * - Single fine contour line accent per shape.
 * - Dual-speed scroll-linked parallax (~28px left, ~18px right on desktop) for subtle optical depth.
 * - No continuous ambient movement on team preset. Static on mobile and reduced-motion.
 */
export function CareWaveBackground({
  preset,
  className = "",
  parallaxFactor = 0.06,
}: CareWaveBackgroundProps) {
  // Team preset has its own intentional dual-shape composition and independent parallax rates
  if (preset === "team") {
    return <TeamCareBackground className={className} />;
  }

  return (
    <StandardCareWaveBackground
      preset={preset}
      className={className}
      parallaxFactor={parallaxFactor}
    />
  );
}

/**
 * TeamCareBackground
 *
 * Refined background composition for "Meet the people behind your care":
 * 1. Broad, shallow, flowing wave silhouettes positioned in the lower half of the section.
 * 2. Left portrait (Dr. Santoshi): softly filled terracotta/blush wave extending outside the left edge.
 * 3. Right portrait (Dr. Deepika): smaller, shallower pale sky-blue wave extending outside the right edge.
 * 4. Asymmetrical, balanced proportions without mirroring.
 * 5. Generous clear ivory space surrounding heading, description, button, and profile text.
 * 6. Smooth, simple curves with controlled edges — no outline arcs, no scattered dots, no blur halos.
 * 7. Subtle scroll-linked vertical movement on desktop only (15–20px total), static on mobile and reduced-motion.
 */
function TeamCareBackground({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const leftShapeRef = useRef<HTMLDivElement | null>(null);
  const rightShapeRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const leftEl = leftShapeRef.current;
    const rightEl = rightShapeRef.current;
    const container = containerRef.current;
    if (!leftEl || !rightEl || !container || reducedMotion) return;

    ensureScrollTriggerRegistered();

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const section = container.closest("section") ?? container;

      // Left terracotta wave: subtle scroll-linked vertical movement (~20px total)
      gsap.fromTo(
        leftEl,
        { y: 10 },
        {
          y: -10,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          },
        }
      );

      // Right sky-blue wave: slightly smaller movement (~15px total) for natural depth
      gsap.fromTo(
        rightEl,
        { y: 7.5 },
        {
          y: -7.5,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          },
        }
      );
    });

    return () => {
      mm.revert();
    };
  }, [reducedMotion]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden select-none ${className}`}
    >
      {/* Dr. Santoshi (Left) - Broad, shallow terracotta/blush flowing wave silhouette */}
      <div
        ref={leftShapeRef}
        className="absolute top-[380px] sm:top-[320px] lg:top-auto lg:bottom-0 -left-8 sm:-left-10 lg:-left-16 w-[320px] sm:w-[440px] lg:w-[680px] xl:w-[740px] h-[240px] sm:h-[300px] lg:h-[400px] xl:h-[430px] will-change-transform"
        style={{ transform: reducedMotion ? "none" : undefined }}
      >
        <svg
          viewBox="0 0 700 400"
          className="size-full overflow-visible"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient
              id="team-terracotta-wave-fill"
              x1="0%"
              y1="0%"
              x2="80%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#CA9585" stopOpacity="0.22" />
              <stop offset="40%" stopColor="#F88379" stopOpacity="0.16" />
              <stop offset="75%" stopColor="#FAF2ED" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#CA9585" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Flowing, shallow wave crest framing lower portrait and left edge */}
          <path
            d="M 0,400 L 0,140 C 140,80 280,95 420,170 C 530,230 620,280 700,300 L 700,400 Z"
            fill="url(#team-terracotta-wave-fill)"
          />
        </svg>
      </div>

      {/* Dr. Deepika (Right) - Smaller, shallower pale sky-blue flowing wave silhouette */}
      <div
        ref={rightShapeRef}
        className="absolute bottom-0 -right-6 sm:-right-8 lg:-right-14 w-[280px] sm:w-[380px] lg:w-[540px] xl:w-[580px] h-[200px] sm:h-[260px] lg:h-[320px] xl:h-[340px] will-change-transform"
        style={{ transform: reducedMotion ? "none" : undefined }}
      >
        <svg
          viewBox="0 0 560 320"
          className="size-full overflow-visible"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient
              id="team-sky-wave-fill"
              x1="100%"
              y1="0%"
              x2="15%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#5DAEDB" stopOpacity="0.20" />
              <stop offset="45%" stopColor="#EDF6FA" stopOpacity="0.15" />
              <stop offset="75%" stopColor="#5DAEDB" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#5DAEDB" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Gentle, shallow counter-wave framing lower right card and edge */}
          <path
            d="M 0,320 L 0,260 C 100,240 210,180 330,145 C 430,115 500,135 560,170 L 560,320 Z"
            fill="url(#team-sky-wave-fill)"
          />
        </svg>
      </div>
    </div>
  );
}

/**
 * StandardCareWaveBackground
 * Handles other sections (principles, services, journey, etc.) which remain unchanged.
 */
function StandardCareWaveBackground({
  preset,
  className = "",
  parallaxFactor = 0.06,
}: CareWaveBackgroundProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();
  const [isPageHidden, setIsPageHidden] = useState(false);

  useEffect(() => {
    const handleVisibility = () => {
      setIsPageHidden(document.hidden);
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || reducedMotion) return;

    let ticking = false;
    let inView = false;

    const clamp = (val: number, limit: number) =>
      Math.max(-limit, Math.min(limit, val));

    const updateParallax = () => {
      ticking = false;
      if (!inView) return;
      if (window.innerWidth < 768) {
        node.style.setProperty("--parallax-y", "0px");
        return;
      }
      const rect = node.getBoundingClientRect();
      const viewportMid = window.innerHeight / 2;
      const elementMid = rect.top + rect.height / 2;
      const distanceFromCenter = elementMid - viewportMid;
      const offset = clamp(-distanceFromCenter * parallaxFactor, 36);
      node.style.setProperty("--parallax-y", `${offset.toFixed(2)}px`);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateParallax);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) onScroll();
      },
      { rootMargin: "25% 0px 25% 0px" },
    );

    observer.observe(node);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    updateParallax();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reducedMotion, parallaxFactor]);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden select-none ${className}`}
    >
      <div
        ref={containerRef}
        style={{
          transform: reducedMotion
            ? "none"
            : "translate3d(0, var(--parallax-y, 0px), 0)",
          willChange: reducedMotion ? "auto" : "transform",
        }}
        className="size-full"
      >
        <div
          className={`size-full relative ${
            reducedMotion || isPageHidden ? "" : "care-wave-ambient-motion"
          }`}
        >
          {preset === "principles" && <PrinciplesPreset />}
          {preset === "services" && <ServicesPreset />}
          {preset === "journey" && <JourneyPreset />}
          {preset === "first-visit" && <FirstVisitPreset />}
          {preset === "clinic" && <ClinicPreset />}
          {preset === "dark-cta" && <DarkCtaPreset />}
          {preset === "hero-lower" && <HeroLowerPreset />}
        </div>
      </div>

      <style jsx>{`
        @keyframes careWaveDriftSlow {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(12px, -8px, 0) scale(1.015);
          }
          100% {
            transform: translate3d(-8px, 6px, 0) scale(0.99);
          }
        }
        .care-wave-ambient-motion {
          animation: careWaveDriftSlow 38s ease-in-out infinite alternate;
        }
        @media (max-width: 767px) {
          .care-wave-ambient-motion {
            animation: none !important;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .care-wave-ambient-motion {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}

// ----------------------------------------------------------------------
// 2. Principles ("How We Care") Preset
// Flowing waves & edge washes across the 4 principle cards
// ----------------------------------------------------------------------
function PrinciplesPreset() {
  return (
    <>
      {/* Top-left blush wash */}
      <div className="absolute -left-28 -top-16 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(202,149,133,0.12)_0%,rgba(248,131,121,0.05)_45%,transparent_70%)] blur-3xl opacity-85" />

      {/* Bottom-right pale sky wash */}
      <div className="absolute -right-24 bottom-10 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(93,174,219,0.11)_0%,rgba(93,174,219,0.03)_50%,transparent_70%)] blur-3xl opacity-80" />

      {/* Center ambient warm depth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(248,131,121,0.04)_0%,transparent_70%)] blur-3xl" />

      {/* Flowing SVG curves */}
      <svg
        className="absolute inset-0 size-full overflow-visible"
        viewBox="0 0 1440 700"
        fill="none"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="principles-grad-1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#CA9585" stopOpacity="0" />
            <stop offset="20%" stopColor="#CA9585" stopOpacity="0.25" />
            <stop offset="60%" stopColor="#F88379" stopOpacity="0.22" />
            <stop offset="90%" stopColor="#5DAEDB" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#5DAEDB" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="principles-grad-2" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#5DAEDB" stopOpacity="0" />
            <stop offset="30%" stopColor="#5DAEDB" stopOpacity="0.18" />
            <stop offset="70%" stopColor="#CA9585" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#CA9585" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Primary flowing wave across cards */}
        <path
          d="M-40,160 C260,240 500,110 820,200 C1140,290 1340,160 1480,220"
          stroke="url(#principles-grad-1)"
          strokeWidth="1.25"
          strokeLinecap="round"
        />

        {/* Lower counter-rhythm wave */}
        <path
          d="M-30,480 C340,380 620,520 960,420 C1240,340 1380,460 1480,390"
          stroke="url(#principles-grad-2)"
          strokeWidth="1"
          strokeLinecap="round"
        />

        {/* Subtle accent points */}
        <circle cx="360" cy="210" r="2.5" fill="#F88379" fillOpacity="0.5" />
        <circle cx="820" cy="200" r="2.5" fill="#CA9585" fillOpacity="0.5" />
        <circle cx="1180" cy="250" r="2" fill="#5DAEDB" fillOpacity="0.45" />
      </svg>
    </>
  );
}

// ----------------------------------------------------------------------
// 3. Services ("Care Discovery") Preset
// Faint flowing curves and edge washes around the 6 service cards
// ----------------------------------------------------------------------
function ServicesPreset() {
  return (
    <>
      <div className="absolute -left-20 top-1/4 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(202,149,133,0.11)_0%,transparent_70%)] blur-3xl opacity-80" />
      <div className="absolute -right-20 top-2/3 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(93,174,219,0.12)_0%,transparent_70%)] blur-3xl opacity-85" />

      <svg
        className="absolute inset-0 size-full overflow-visible"
        viewBox="0 0 1440 900"
        fill="none"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="services-grad-1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#CA9585" stopOpacity="0" />
            <stop offset="25%" stopColor="#F88379" stopOpacity="0.2" />
            <stop offset="70%" stopColor="#5DAEDB" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#5DAEDB" stopOpacity="0" />
          </linearGradient>
        </defs>

        <path
          d="M-40,280 C320,180 580,340 900,240 C1220,140 1360,290 1480,210"
          stroke="url(#services-grad-1)"
          strokeWidth="1.25"
          strokeLinecap="round"
        />

        <circle cx="450" cy="235" r="2.5" fill="#CA9585" fillOpacity="0.45" />
        <circle cx="1060" cy="190" r="2.5" fill="#5DAEDB" fillOpacity="0.45" />
      </svg>
    </>
  );
}

// ----------------------------------------------------------------------
// 4. Journey Preset
// Rule: Preserve connecting line. Restrained colour washes only,
// NO extra curves duplicating the care route.
// ----------------------------------------------------------------------
function JourneyPreset() {
  return (
    <>
      <div className="absolute left-[-8%] top-[15%] h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(202,149,133,0.08)_0%,transparent_70%)] blur-3xl" />
      <div className="absolute right-[-6%] top-[45%] h-[540px] w-[540px] rounded-full bg-[radial-gradient(circle,rgba(93,174,219,0.08)_0%,transparent_70%)] blur-3xl" />
      <div className="absolute left-[-5%] top-[75%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(248,131,121,0.07)_0%,transparent_70%)] blur-3xl" />
    </>
  );
}

// ----------------------------------------------------------------------
// 5. First Visit Preset ("Before You Arrive")
// Gentle connected cadence
// ----------------------------------------------------------------------
function FirstVisitPreset() {
  return (
    <>
      <div className="absolute -left-16 top-10 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(202,149,133,0.1)_0%,transparent_70%)] blur-3xl opacity-80" />
      <div className="absolute -right-16 bottom-12 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(93,174,219,0.1)_0%,transparent_70%)] blur-3xl opacity-80" />

      <svg
        className="absolute inset-0 size-full overflow-visible"
        viewBox="0 0 1440 600"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M-40,320 C360,240 640,400 980,300 C1280,210 1400,340 1480,280"
          stroke="rgba(202,149,133,0.16)"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <circle cx="780" cy="330" r="2" fill="#5DAEDB" fillOpacity="0.4" />
      </svg>
    </>
  );
}

// ----------------------------------------------------------------------
// 6. Clinic Video Preset ("Visit The Birthwave")
// Outside video frame & interactive controls
// ----------------------------------------------------------------------
function ClinicPreset() {
  return (
    <>
      <div className="absolute -left-24 top-1/4 h-[440px] w-[440px] rounded-full bg-[radial-gradient(circle,rgba(202,149,133,0.09)_0%,transparent_70%)] blur-3xl opacity-75" />
      <div className="absolute -right-24 bottom-1/4 h-[440px] w-[440px] rounded-full bg-[radial-gradient(circle,rgba(93,174,219,0.09)_0%,transparent_70%)] blur-3xl opacity-75" />
    </>
  );
}

// ----------------------------------------------------------------------
// 7. Final Dark CTA Preset ("Start Where You Are")
// Continued wave motif in muted terracotta and coral for dark background
// ----------------------------------------------------------------------
function DarkCtaPreset() {
  return (
    <>
      {/* Deep warm maternal radial light falloffs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(202,149,133,0.12)_0%,transparent_70%)] blur-3xl" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(248,131,121,0.1)_0%,transparent_70%)] blur-3xl" />

      {/* Wave motif in muted terracotta and coral */}
      <svg
        className="absolute inset-0 size-full overflow-visible"
        viewBox="0 0 1440 600"
        fill="none"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="dark-cta-grad-1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#CA9585" stopOpacity="0" />
            <stop offset="30%" stopColor="#CA9585" stopOpacity="0.28" />
            <stop offset="70%" stopColor="#F88379" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#F88379" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="dark-cta-grad-2" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#5DAEDB" stopOpacity="0" />
            <stop offset="40%" stopColor="#5DAEDB" stopOpacity="0.18" />
            <stop offset="80%" stopColor="#CA9585" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#CA9585" stopOpacity="0" />
          </linearGradient>
        </defs>

        <path
          d="M-40,240 C320,160 580,320 900,220 C1220,130 1380,260 1480,200"
          stroke="url(#dark-cta-grad-1)"
          strokeWidth="1.25"
          strokeLinecap="round"
        />

        <path
          d="M-30,380 C360,450 640,310 960,390 C1240,460 1380,350 1480,410"
          stroke="url(#dark-cta-grad-2)"
          strokeWidth="1"
          strokeDasharray="4 8"
          strokeLinecap="round"
        />

        <circle cx="580" cy="270" r="2.5" fill="#F88379" fillOpacity="0.6" />
        <circle cx="1060" cy="200" r="2" fill="#CA9585" fillOpacity="0.5" />
      </svg>
    </>
  );
}

// ----------------------------------------------------------------------
// 8. Hero Lower Edge Preset
// Subtle transition wave near lower edge only
// ----------------------------------------------------------------------
function HeroLowerPreset() {
  return (
    <div className="absolute inset-x-0 bottom-0 h-40 overflow-hidden">
      <svg
        className="absolute bottom-0 inset-x-0 w-full h-32 overflow-visible"
        viewBox="0 0 1440 160"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M-40,80 C340,30 680,120 1020,60 C1280,20 1400,90 1480,70"
          stroke="rgba(202,149,133,0.14)"
          strokeWidth="1.25"
          strokeLinecap="round"
        />
        <circle cx="850" cy="75" r="2" fill="#F88379" fillOpacity="0.35" />
      </svg>
    </div>
  );
}
