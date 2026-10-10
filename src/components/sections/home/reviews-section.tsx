import { Star } from "lucide-react";
import { AnimatedContent } from "@/components/ui/animations/animated-content";

/**
 * Reviews Section — "Voices of Care"
 *
 * Requirements:
 * - Improve quote readability using Plus Jakarta Sans (font-body).
 * - Headings use Poppins (font-display).
 * - Remove intentional Cormorant Garamond / serif styling.
 * - Soften decoration behind text.
 * - Do not add fabricated testimonials, ratings or outcome claims.
 * - FLAG: Testimonials below are draft illustrative placeholders pending client sign-off.
 */

// TODO(client-approval): The following 3 testimonials are illustrative placeholders.
// No real clinical outcome claims or verified patient attributions are confirmed yet.
// Client must review, verify consent, and supply approved quotes prior to production deployment.
const reviews = [
  {
    stars: 5,
    tag: "Natural Vaginal Birth",
    quote:
      "The calmest, most empowering birth experience. Having the clinical team listen deeply to our preferences for our natural birth completely transformed our mindset.",
    initials: "AV",
    avatarBg: "bg-[#FAF2ED] text-terracotta-deep",
    name: "Ananya & Vikram R.",
    details: "Alwarpet, Chennai · Vaginal Birth",
  },
  {
    stars: 5,
    tag: "Fertility & Antenatal",
    quote:
      "We felt truly seen, cared for, and never rushed through our questions. From our very first preconception visit, the team gave us clarity and reassurance at each step.",
    initials: "DM",
    avatarBg: "bg-[#EDF5FA] text-[#2e6e93]",
    name: "Divya M.",
    details: "Nungambakkam · Antenatal Care",
  },
  {
    stars: 5,
    tag: "VBAC & Postpartum Care",
    quote:
      "Postpartum care is so often overlooked once the baby arrives. The Birthwave's lactation guidance and mental health support were invaluable during our recovery.",
    initials: "PK",
    avatarBg: "bg-[#FDF0ED] text-[#ca9585]",
    name: "Priya K.",
    details: "Chennai · VBAC & Lactation",
  },
];

export function ReviewsSection() {
  return (
    <section
      id="reviews"
      aria-labelledby="reviews-heading"
      className="relative isolate overflow-hidden bg-[#FAF3EE] py-20 sm:py-24 lg:py-32"
    >
      <div className="container-birthwave relative z-10">
        {/* Section Header */}
        <div className="mx-auto max-w-[48rem] text-center">
          <p className="eyebrow mx-auto text-sky-deep">
            VOICES OF MOTHERHOOD &amp; FAMILY
          </p>
          <h2
            id="reviews-heading"
            className="mt-4 text-balance font-display text-[clamp(2.3rem,1.9rem+2.4vw,3.75rem)] font-semibold leading-[1.08] tracking-[var(--tracking-tight)] text-ink"
          >
            Stories from families who walked this journey with us.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-balance font-body text-base sm:text-lg leading-[1.65] text-ink-soft">
            Experiences of unhurried consultations, respected birth preferences, and continuous postpartum support in Chennai.
          </p>
        </div>

        {/* 3 Review Cards */}
        <div className="mx-auto mt-14 grid grid-cols-1 gap-6 sm:mt-16 md:grid-cols-3 lg:mt-20 sm:gap-6 lg:gap-8">
          {reviews.map((review) => (
            <AnimatedContent
              key={review.name}
              direction="vertical"
              distance={14}
              duration={0.45}
              ease="power2.out"
              threshold={0.1}
              rowStagger={0.08}
              className="flex h-full flex-col justify-between rounded-2xl sm:rounded-3xl border border-[#EFE5DF] bg-white p-7 sm:p-8 shadow-[0_4px_24px_rgba(53,43,41,0.02)] transition-all duration-300 ease-[var(--ease-signature)] hover:-translate-y-1 hover:border-coral/40 hover:shadow-[0_12px_28px_rgba(53,43,41,0.05)]"
            >
              <div>
                {/* Top Row: Stars & Pathway Tag */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1 text-coral" aria-label="5 out of 5 stars">
                    {Array.from({ length: review.stars }).map((_, i) => (
                      <Star
                        key={i}
                        className="size-3.5 fill-coral text-coral"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <span className="font-body text-xs font-semibold text-ink-soft tracking-tight">
                    {review.tag}
                  </span>
                </div>

                {/* Quote in Plus Jakarta Sans for maximum clarity & readability */}
                <blockquote className="mt-5 font-body text-base leading-[1.7] text-ink/90 font-normal">
                  “{review.quote}”
                </blockquote>
              </div>

              {/* Bottom Row: Reviewer Details */}
              <div className="mt-8 flex items-center gap-3.5 border-t border-[var(--color-border)]/50 pt-5">
                <div
                  className={`flex size-10 shrink-0 items-center justify-center rounded-full font-display text-xs font-semibold ${review.avatarBg}`}
                  aria-hidden="true"
                >
                  {review.initials}
                </div>
                <div>
                  <p className="font-display text-sm font-semibold leading-tight text-ink">
                    {review.name}
                  </p>
                  <p className="mt-0.5 font-body text-xs text-ink-soft">
                    {review.details}
                  </p>
                </div>
              </div>
            </AnimatedContent>
          ))}
        </div>
      </div>
    </section>
  );
}
