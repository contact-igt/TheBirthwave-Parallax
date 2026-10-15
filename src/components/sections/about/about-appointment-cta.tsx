import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { aboutAppointmentCta } from "@/content/about-content";

/**
 * Section: "Ready When You Are" — Final consultation CTA
 *
 * Designed to match the soft blush palette, centered editorial typography,
 * and warm terracotta button from the reference design.
 */
export function AboutAppointmentCta() {
  return (
    <section
      id="about-appointment-cta"
      aria-labelledby="about-appointment-cta-heading"
      data-about-scene="appointment-cta"
      style={{ backgroundColor: "#FDF2EC" }}
      className="py-20 sm:py-28 relative overflow-hidden"
    >
      <div className="container-birthwave max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <p
          style={{ color: "#B37055" }}
          className="font-semibold tracking-[0.2em] text-[11px] sm:text-xs uppercase mb-3"
        >
          {aboutAppointmentCta.eyebrow}
        </p>

        <h2
          id="about-appointment-cta-heading"
          style={{ color: "#241A17" }}
          className="text-[clamp(2.1rem,1.7rem+2vw,3.25rem)] font-light leading-[1.2] tracking-tight max-w-2xl mx-auto mb-5"
        >
          {aboutAppointmentCta.heading}
        </h2>

        <p
          style={{ color: "#6E5D53" }}
          className="text-base sm:text-[17px] leading-relaxed max-w-xl mx-auto mb-9"
        >
          {aboutAppointmentCta.supporting}
        </p>

        <div className="flex justify-center">
          <Link
            href={aboutAppointmentCta.primaryCta.href}
            style={{ backgroundColor: "#8C4B35" }}
            className="inline-flex items-center justify-center gap-2 rounded-md px-7 py-3.5 text-xs sm:text-sm font-semibold tracking-wider text-white uppercase shadow-sm transition-all duration-200 hover:opacity-90 hover:shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8C4B35] focus-visible:ring-offset-2"
          >
            <span>{aboutAppointmentCta.primaryCta.label}</span>
            <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
