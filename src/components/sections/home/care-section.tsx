import { care } from "@/content/site-content";
import { AnimatedContent } from "@/components/ui/animations/animated-content";
import { CareWaveBackground } from "@/components/ui/backgrounds/care-wave-background";

/**
 * Section: "How We Care"
 *
 * Requirements:
 * - Preserve all four principles (Listen First, Explain Clearly, Decide Together, Stay Connected).
 * - Use Poppins titles (font-display) and Plus Jakarta Sans descriptions (font-body).
 * - Replace all Cormorant Garamond / serif styling.
 * - Keep cards visually consistent, with restrained staggered entrances.
 * - Brand-aligned warm neutral surfaces with coral index accents.
 */
export function CareSection() {
  return (
    <section
      id="care-trust"
      aria-labelledby="care-heading"
      className="relative isolate overflow-hidden bg-[#FAF3EE] py-20 sm:py-24 lg:py-32"
    >
      {/* Animated flowing care waves & soft edge washes */}
      <CareWaveBackground preset="principles" />

      <div className="container-birthwave relative z-10">
        {/* Section Heading Block */}
        <div className="mx-auto max-w-[48rem] text-center">
          <p className="eyebrow mx-auto !tracking-[0.18em] text-xs sm:text-sm font-semibold uppercase text-terracotta-deep">
            {care.eyebrow}
          </p>
          <h2
            id="care-heading"
            className="mt-4 text-balance font-display text-[clamp(2.3rem,1.9rem+2.4vw,3.75rem)] font-semibold leading-[1.08] tracking-[var(--tracking-tight)] text-ink"
          >
            {care.heading}
          </h2>
        </div>

        {/* 4 Visually Consistent Editorial Principle Cards */}
        <ol className="mx-auto mt-14 grid grid-cols-1 gap-6 sm:mt-16 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 sm:gap-6 lg:gap-7 list-none">
          {care.principles.map((principle) => (
            <li key={principle.index} className="h-full">
              <AnimatedContent
                direction="vertical"
                distance={14}
                mobileDistance={8}
                duration={0.45}
                ease="power2.out"
                threshold={0.1}
                rowStagger={0.08}
                className="group relative flex h-full flex-col justify-start rounded-2xl sm:rounded-3xl border border-[#EFE5DF] bg-white p-7 sm:p-8 shadow-[0_4px_24px_rgba(53,43,41,0.03)] transition-all duration-300 ease-[var(--ease-signature)] hover:-translate-y-1 hover:border-coral/40 hover:shadow-[0_12px_32px_rgba(53,43,41,0.06)]"
              >
                {/* Coral Index Accent */}
                <span className="font-display text-sm font-semibold tracking-wider text-coral tabular-nums">
                  {principle.index}
                </span>

                {/* Poppins Principle Title */}
                <h3 className="mt-3.5 font-display text-[clamp(1.25rem,1.1rem+0.5vw,1.5rem)] font-semibold leading-[1.25] text-ink transition-colors duration-200 group-hover:text-ink">
                  {principle.title}
                </h3>

                {/* Plus Jakarta Sans Description */}
                <p className="mt-3.5 font-body text-sm sm:text-[0.9375rem] leading-[1.65] text-ink-soft">
                  {principle.text}
                </p>
              </AnimatedContent>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
