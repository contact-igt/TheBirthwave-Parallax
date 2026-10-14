import { care } from "@/content/site-content";
import { AnimatedContent } from "@/components/ui/animations/animated-content";

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
      className="relative isolate overflow-hidden bg-[#FAF4EE] py-20 sm:py-24 lg:py-32"
    >
      <div className="container-birthwave relative z-10">
        {/* Section Heading Block */}
        <div className="mx-auto max-w-[48rem] text-center">
          <p className="eyebrow mx-auto !tracking-[0.18em] text-xs sm:text-sm font-semibold uppercase text-terracotta-deep">
            {care.eyebrow}
          </p>
          <h2
            id="care-heading"
            className="mt-4 text-balance font-display text-h2 font-semibold leading-[1.08] tracking-[var(--tracking-tight)] text-ink"
          >
            {care.heading}
          </h2>
        </div>

        {/* 4 Professional & Clean Principle Cards */}
        <ol className="mx-auto mt-12 sm:mt-14 lg:mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6 lg:gap-6 list-none items-stretch">
          {care.principles.map((principle, idx) => (
            <li key={principle.index} className="h-full">
              <AnimatedContent
                direction="vertical"
                distance={14}
                mobileDistance={8}
                duration={0.45}
                delay={idx * 0.08}
                ease="power2.out"
                className="group relative flex h-full flex-col justify-start overflow-hidden rounded-2xl sm:rounded-3xl border border-[#EADBCE] bg-white p-7 sm:p-8 xl:p-8.5 shadow-[0_4px_20px_rgba(53,43,41,0.035)] transition-all duration-300 ease-[var(--ease-signature)] hover:-translate-y-1 hover:border-terracotta/45 hover:shadow-[0_14px_36px_rgba(53,43,41,0.07)]"
              >
                {/* Subtle Dusty-Rose Top Hairline on Hover */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-terracotta/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />

                {/* Top Badge: Refined Circular Milestone & Indicator */}
                <div className="flex items-center justify-between">
                  <span className="flex size-9 items-center justify-center rounded-full bg-[#FAF3EE] border border-terracotta/20 font-display text-xs font-semibold text-terracotta-deep tabular-nums">
                    {principle.index}
                  </span>
                  <span
                    aria-hidden="true"
                    className="size-1.5 rounded-full bg-terracotta/30 transition-colors duration-300 group-hover:bg-terracotta"
                  />
                </div>

                {/* Principle Title */}
                <h3 className="mt-5 font-display text-xl sm:text-[1.25rem] xl:text-[1.35rem] font-semibold leading-[1.3] text-ink transition-colors duration-200 group-hover:text-terracotta-deep">
                  {principle.title}
                </h3>

                {/* Principle Description */}
                <p className="mt-3 font-body text-sm sm:text-[0.9375rem] leading-[1.65] text-ink-soft whitespace-pre-line">
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
