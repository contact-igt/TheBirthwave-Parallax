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
 *
 * Lower-page refinement: this is now the page's own final section before
 * the footer (the "Our Patient Journey"/"Multiple Specialties" section
 * that used to sit above the old appointment-CTA block is gone — see
 * app/doctors/page.tsx's own comment), so it carries a slightly stronger
 * close — a soft warm wash behind the heading (one static gradient, the
 * same low-opacity brand-token wash technique used for the chapter moods
 * elsewhere on this site, not a second CTA block) and a larger heading
 * size, matching the weight other pages give their own final section.
 * Still exactly one clear call to action: the form's own submit button —
 * no second competing button was added back in.
 */
export function DoctorsEnquiryFormSection() {
  return (
    <section
      id="doctors-enquiry"
      aria-labelledby="doctors-enquiry-heading"
      className="relative isolate overflow-hidden bg-paper-dim section-pad"
    >
      {/* Subtle warm close — a single static gradient, only ever present
          (never scroll-driven or repainted), so "a cleaner visual ending"
          costs nothing beyond one background layer. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(120% 100% at 85% 15%, color-mix(in srgb, var(--color-terracotta) 8%, transparent) 0%, transparent 65%)",
        }}
      />
      <div className="container-birthwave relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
        <div className="max-w-md">
          <p className="eyebrow">{doctorsEnquiryForm.eyebrow}</p>
          <h2
            id="doctors-enquiry-heading"
            className="mt-4 text-[clamp(2.1rem,1.6rem+2.2vw,3rem)] leading-[1.08] font-semibold tracking-[var(--tracking-tight)] text-ink"
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
