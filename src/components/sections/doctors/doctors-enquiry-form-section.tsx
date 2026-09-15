import { doctorsEnquiryForm } from "@/content/doctors-content";
import { DoctorsEnquiryForm } from "@/components/sections/doctors/doctors-enquiry-form";

/**
 * The closing enquiry form section — extracted from
 * `doctors-master-journey.tsx` (where it originally only existed as that
 * file's own private `DoctorsVerticalJourney` fallback) into its own
 * standalone component so the team-directory rework's page composition
 * can render it directly without pulling in the horizontal journey's own
 * GSAP/ScrollTrigger track. `doctors-master-journey.tsx` now imports this
 * same component rather than keeping a second, duplicate copy of this
 * JSX, so its own reduced-motion/below-`lg` fallback still renders
 * identically.
 *
 * Form behaviour/destination unchanged — see `DoctorsEnquiryForm`'s own
 * comment: no backend exists yet, submitting only moves the form into a
 * local "received" state, never a fabricated "sent" claim.
 */
export function DoctorsEnquiryFormSection() {
  return (
    <section
      id="doctors-enquiry"
      aria-labelledby="doctors-enquiry-heading"
      className="relative isolate bg-paper-dim section-pad"
    >
      <div className="container-birthwave grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
        <div className="max-w-md">
          <p className="eyebrow">{doctorsEnquiryForm.eyebrow}</p>
          <h2
            id="doctors-enquiry-heading"
            className="mt-4 text-[clamp(2rem,1.6rem+1.8vw,2.75rem)] leading-[1.1] font-semibold text-ink"
          >
            {doctorsEnquiryForm.headingLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="mt-5 text-lg leading-[var(--leading-relaxed)] text-ink-soft">{doctorsEnquiryForm.supporting}</p>
        </div>

        <DoctorsEnquiryForm />
      </div>
    </section>
  );
}
