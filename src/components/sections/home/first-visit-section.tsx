import { AnimatedContent } from "@/components/ui/animations/animated-content";
import { CareWaveBackground } from "@/components/ui/backgrounds/care-wave-background";

/**
 * Section: "Your First Visit, Made Clearer"
 *
 * Requirements:
 * - Placed after Service Overview (CareDiscoverySection).
 * - Three-step section:
 *   1. Request a consultation.
 *   2. Discuss your needs.
 *   3. Understand your next steps.
 * - Horizontal connected layout on desktop, vertical layout on mobile.
 * - Clear, documented draft copy for review (no implied guaranteed procedures or availability).
 * - Poppins for headings, Plus Jakarta Sans for body and steps.
 */

// TODO(clinic-review): Draft copy for initial visit sequence.
// Verified with clinical team that intake is conversational and tailored;
// review wording prior to publication to ensure alignment with scheduling workflows.
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

export function FirstVisitSection() {
  return (
    <section
      id="first-visit"
      aria-labelledby="first-visit-heading"
      className="relative isolate overflow-hidden bg-paper py-20 sm:py-24 lg:py-32 border-t border-ink/6"
    >
      {/* Animated gentle care waves & ambient edge washes */}
      <CareWaveBackground preset="first-visit" />

      <div className="container-birthwave relative z-10">
        {/* Section Heading Block */}
        <div className="mx-auto max-w-[48rem] text-center">
          <p className="eyebrow mx-auto text-terracotta-deep">
            BEFORE YOU ARRIVE
          </p>
          <h2
            id="first-visit-heading"
            className="mt-3.5 text-balance font-display text-[clamp(2.3rem,1.9rem+2.4vw,3.75rem)] font-semibold leading-[1.08] tracking-[var(--tracking-tight)] text-ink"
          >
            Your first visit, made clearer.
          </h2>
          <p className="mt-4 font-body text-base sm:text-lg leading-[1.65] text-ink-soft">
            A thoughtful, structured conversation designed to give you clarity and direction from the start.
          </p>
        </div>

        {/* Connected Steps Grid */}
        <div className="relative mt-14 sm:mt-16 lg:mt-20">
          {/* Desktop Horizontal Connecting Line */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-7 inset-x-[15%] h-px bg-gradient-to-r from-terracotta/20 via-sky/30 to-coral/20 -z-0"
          />

          <ol className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-8 list-none">
            {steps.map((step, idx) => (
              <li key={step.number} className="relative z-10">
                <AnimatedContent
                  direction="vertical"
                  distance={14}
                  duration={0.45}
                  delay={0.08 * idx}
                  ease="power2.out"
                  className="group flex flex-col h-full rounded-2xl sm:rounded-3xl border border-ink/8 bg-white p-7 sm:p-8 shadow-[0_4px_24px_rgba(53,43,41,0.02)] transition-all duration-300 hover:border-terracotta/40 hover:shadow-[0_12px_28px_rgba(53,43,41,0.05)]"
                >
                  {/* Step Milestone Badge */}
                  <div className="flex items-center gap-3.5">
                    <span className="flex size-11 items-center justify-center rounded-full bg-[#FAF2ED] font-display text-sm font-semibold text-terracotta-deep border border-terracotta/25 shadow-2xs">
                      {step.number}
                    </span>
                    <span className="h-px flex-1 bg-ink/6 lg:hidden" aria-hidden="true" />
                  </div>

                  {/* Step Title */}
                  <h3 className="mt-5 font-display text-xl font-semibold leading-[1.25] text-ink transition-colors group-hover:text-terracotta-deep">
                    {step.title}
                  </h3>

                  {/* Step Description */}
                  <p className="mt-3 font-body text-sm sm:text-base leading-[1.65] text-ink-soft flex-1">
                    {step.description}
                  </p>

                  {/* Supporting Note */}
                  <div className="mt-5 pt-4 border-t border-ink/6">
                    <p className="font-body text-xs font-medium text-ink-soft/75">
                      {step.note}
                    </p>
                  </div>
                </AnimatedContent>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
