import { AnimatedContent } from "@/components/ui/animations/animated-content";
import { Button } from "@/components/ui/button";

/**
 * Section: "Your First Visit, Made Clearer"
 *
 * Requirements:
 * - Open three-step layout:
 *   1. Request a consultation.
 *   2. Discuss your needs.
 *   3. Understand your next steps.
 * - Left-aligned section label and heading.
 * - Introductory description beside heading on wide screens, below on smaller screens.
 * - Existing homepage H2 size preserved.
 * - Three numbered markers connected with fine horizontal line on desktop, vertical line on mobile.
 * - Small outline icon (28-36px), H3 heading, description, quiet supporting note per step.
 * - Subtle vertical separators between desktop columns (hidden when stacked).
 * - No pill badges or boxed cards. Consistent text alignment without fixed heights.
 * - Single "Request a Consultation" button below linking to /contact.
 * - Corner decorations: lightweight SVG blush shape (lower left) and pale-blue curve (lower right).
 * - Restrained entrance animation (12px upward fade, short stagger), fully accessible with reduced motion.
 */

const steps = [
  {
    number: "01",
    title: "Request a consultation.",
    description:
      "Reach out with your questions or preferred care pathway to schedule a dedicated consultation with our team.",
    note: "Consultations arranged by prior appointment.",
  },
  {
    number: "02",
    title: "Discuss your needs.",
    description:
      "Share your health background, current questions, and personal preferences in an unhurried, attentive setting.",
    note: "Space for open questions and preferences.",
  },
  {
    number: "03",
    title: "Understand your next steps.",
    description:
      "Receive clear clinical guidance, coordinated care options, and thoughtful recommendations for what comes next.",
    note: "Clear direction tailored to your stage.",
  },
] as const;

/* Bespoke outline icons (32px, stroke 1.5) matching brand direction */
function StepIconCalendar({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="18" rx="3" />
      <path d="M16 2v4" />
      <path d="M8 2v4" />
      <path d="M3 10h18" />
      <path d="m9 16 2 2 4-4" />
    </svg>
  );
}

function StepIconChat({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      <path d="M8 11.5h.01" />
      <path d="M12 11.5h.01" />
      <path d="M16 11.5h.01" />
    </svg>
  );
}

function StepIconCompass({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );
}

const stepIcons = [StepIconCalendar, StepIconChat, StepIconCompass] as const;

export function FirstVisitSection() {
  return (
    <section
      id="first-visit"
      aria-labelledby="first-visit-heading"
      className="relative isolate overflow-hidden bg-paper py-20 sm:py-24 lg:py-32 border-t border-ink/6"
    >
      {/* Background Decorative SVGs (static corner accents, cropped at edges) */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute bottom-0 left-0 w-[280px] sm:w-[380px] lg:w-[460px] max-w-[45vw] h-auto -translate-x-6 sm:-translate-x-10 translate-y-6 sm:translate-y-8 -z-0"
      >
        <svg
          viewBox="0 0 460 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <defs>
            <linearGradient id="corner-blush-1" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#CA9585" stopOpacity="0.32" />
              <stop offset="60%" stopColor="#E5C7B8" stopOpacity="0.20" />
              <stop offset="100%" stopColor="#F5E8E0" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="corner-blush-2" x1="0%" y1="100%" x2="100%" y2="20%">
              <stop offset="0%" stopColor="#B87D6E" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#E8C9B8" stopOpacity="0.06" />
            </linearGradient>
          </defs>
          <path
            d="M-40 340 C60 260 140 180 260 140 C340 110 400 130 460 180 L460 340 Z"
            fill="url(#corner-blush-1)"
          />
          <path
            d="M-40 340 C40 280 120 220 220 200 C300 180 340 210 380 260 C400 285 410 315 420 340 Z"
            fill="url(#corner-blush-2)"
          />
        </svg>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute bottom-0 right-0 w-[260px] sm:w-[360px] lg:w-[440px] max-w-[45vw] h-auto translate-x-4 sm:translate-x-8 translate-y-6 sm:translate-y-8 -z-0"
      >
        <svg
          viewBox="0 0 440 280"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <defs>
            <linearGradient id="corner-sky" x1="100%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#5DAEDB" stopOpacity="0.28" />
              <stop offset="50%" stopColor="#92C7E5" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#D8ECF8" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0 280 C120 280 200 240 280 170 C340 120 390 80 460 60 L460 280 Z"
            fill="url(#corner-sky)"
          />
        </svg>
      </div>

      <div className="container-birthwave relative z-10">
        {/* Section Heading Block */}
        <AnimatedContent distance={12} duration={0.5} ease="power2.out">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 sm:gap-6 lg:gap-12 text-left">
            <div className="max-w-2xl">
              <p className="eyebrow text-terracotta-deep">
                BEFORE YOU ARRIVE
              </p>
              <h2
                id="first-visit-heading"
                className="mt-3.5 text-balance font-display text-h2 font-semibold leading-[1.08] tracking-[var(--tracking-tight)] text-ink"
              >
                Your first visit, made clearer.
              </h2>
            </div>
            <div className="max-w-md lg:pb-1">
              <p className="font-body text-base sm:text-lg leading-[1.65] text-ink-soft">
                A thoughtful, structured conversation designed to give you clarity and direction from the start.
              </p>
            </div>
          </div>
        </AnimatedContent>

        {/* Open Three-Step Process Layout */}
        <div className="relative mt-14 sm:mt-16 lg:mt-22">
          <ol className="grid grid-cols-1 lg:grid-cols-3 list-none gap-10 sm:gap-12 lg:gap-0">
            {steps.map((step, idx) => {
              const Icon = stepIcons[idx];
              const isFirst = idx === 0;
              const isMiddle = idx === 1;
              const isLast = idx === steps.length - 1;

              return (
                <li
                  key={step.number}
                  className={`group relative flex flex-col ${
                    isFirst ? "lg:pr-8 xl:pr-12" : ""
                  } ${
                    isMiddle
                      ? "lg:px-8 xl:px-12 lg:border-l lg:border-r lg:border-ink/10"
                      : ""
                  } ${isLast ? "lg:pl-8 xl:pl-12" : ""}`}
                >
                  {/* Step Milestone Marker Row */}
                  <div className="relative flex items-center">
                    {/* Desktop Horizontal Connecting Line Segment */}
                    {isFirst && (
                      <div
                        aria-hidden="true"
                        className="hidden lg:block absolute top-1/2 left-5 right-0 h-[1.5px] bg-[#DFCFBE] -translate-y-1/2 -z-0"
                      />
                    )}
                    {isMiddle && (
                      <div
                        aria-hidden="true"
                        className="hidden lg:block absolute top-1/2 left-0 right-0 h-[1.5px] bg-[#DFCFBE] -translate-y-1/2 -z-0"
                      />
                    )}
                    {isLast && (
                      <div
                        aria-hidden="true"
                        className="hidden lg:block absolute top-1/2 left-0 right-[calc(100%-1.25rem)] h-[1.5px] bg-[#DFCFBE] -translate-y-1/2 -z-0"
                      />
                    )}

                    {/* Mobile Vertical Spine extending down to next step */}
                    {!isLast && (
                      <div
                        aria-hidden="true"
                        className="lg:hidden absolute left-5 sm:left-5.5 top-10 sm:top-11 bottom-[-2.5rem] sm:bottom-[-3rem] w-[1.5px] bg-[#DFCFBE] -z-0"
                      />
                    )}

                    {/* Numbered Marker: dark ink text on crisp white node */}
                    <div className="relative z-10 flex size-10 sm:size-11 items-center justify-center rounded-full bg-white border border-[#DCCEC2] shadow-[0_1px_4px_rgba(36,26,23,0.06)] shrink-0">
                      <span className="font-display text-sm sm:text-[0.9375rem] font-semibold text-ink tabular-nums">
                        {step.number}
                      </span>
                    </div>
                  </div>

                  {/* Step Content */}
                  <AnimatedContent
                    distance={12}
                    duration={0.5}
                    delay={0.08 * idx}
                    ease="power2.out"
                    className="flex flex-col flex-1 min-w-0 mt-6 sm:mt-7 lg:mt-9"
                  >
                    {/* Small Outline Icon (32px, terracotta accent) */}
                    <div className="mb-4 flex items-center text-terracotta-deep">
                      <Icon className="size-8" />
                    </div>

                    {/* H3 Heading */}
                    <h3 className="font-display text-xl sm:text-[1.375rem] font-semibold leading-[1.25] text-ink lg:min-h-[3.5rem] flex items-start">
                      {step.title}
                    </h3>

                    {/* Step Description */}
                    <p className="mt-3 font-body text-sm sm:text-[0.9375rem] leading-[1.65] text-ink-soft flex-1">
                      {step.description}
                    </p>

                    {/* Quiet Supporting Note (No pill container) */}
                    <div className="mt-6 pt-4 border-t border-ink/8">
                      <p className="font-body text-xs sm:text-[0.8125rem] leading-relaxed text-ink-soft/80 flex items-center gap-2">
                        <span className="size-1.5 rounded-full bg-terracotta/75 shrink-0" aria-hidden="true" />
                        <span>{step.note}</span>
                      </p>
                    </div>
                  </AnimatedContent>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Primary Action Button */}
        <AnimatedContent
          distance={12}
          duration={0.5}
          delay={0.25}
          ease="power2.out"
          className="mt-14 sm:mt-16 lg:mt-20 flex justify-center"
        >
          <Button href="/contact" variant="primary">
            Request a Consultation
          </Button>
        </AnimatedContent>
      </div>
    </section>
  );
}
