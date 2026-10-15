"use client";

import { aboutFirstVisit } from "@/content/about-clinic-content";

/**
 * Section: "Your First Visit"
 *
 * Three structured steps explaining what to expect when visiting the clinic.
 * Matches the reference design with clean white cards, top-right numerals,
 * and warm, calming aesthetics.
 */
export function AboutFirstVisit() {
  return (
    <section
      id="first-visit"
      aria-labelledby="first-visit-heading"
      style={{ backgroundColor: "#FAF5F0" }}
      className="py-16 sm:py-24 relative overflow-hidden"
    >
      <div className="container-birthwave max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <p
            style={{ color: "#B37055" }}
            className="font-semibold tracking-[0.2em] text-[11px] sm:text-xs uppercase mb-3"
          >
            {aboutFirstVisit.eyebrow}
          </p>
          <h2
            id="first-visit-heading"
            style={{ color: "#241A17" }}
            className="text-[clamp(2rem,1.6rem+2vw,3rem)] font-light leading-[1.18] tracking-tight"
          >
            {aboutFirstVisit.heading}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {aboutFirstVisit.steps.map((step) => (
            <div
              key={step.index}
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#EFE5DC",
              }}
              className="relative p-7 sm:p-8 rounded-2xl border shadow-[0_4px_24px_rgba(36,26,23,0.03)] flex flex-col justify-between transition-all duration-300 hover:shadow-[0_10px_32px_rgba(36,26,23,0.06)] hover:-translate-y-0.5"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-3.5">
                  <h3
                    style={{ color: "#241A17" }}
                    className="text-lg sm:text-xl font-medium tracking-tight"
                  >
                    {step.title}
                  </h3>
                  <span
                    style={{ color: "#D5C2B4" }}
                    className="font-serif text-3xl sm:text-4xl font-light select-none shrink-0 leading-none"
                    aria-hidden="true"
                  >
                    {step.index}
                  </span>
                </div>
                <p
                  style={{ color: "#6E5D53" }}
                  className="text-sm sm:text-[15px] leading-relaxed"
                >
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
