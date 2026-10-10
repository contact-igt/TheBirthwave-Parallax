import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { doctors } from "@/content/doctors-content";
import { AnimatedContent } from "@/components/ui/animations/animated-content";
import { CareWaveBackground } from "@/components/ui/backgrounds/care-wave-background";

/**
 * Team Introduction Section (Repurposing "A Moment").
 *
 * Section Requirements:
 * - Eyebrow: THE PEOPLE BEHIND YOUR CARE
 * - Heading: Meet the people behind your care.
 * - Description: Get to know The Birthwave’s medical and allied-care team.
 * - Link: Explore Our Care Team → /doctors
 * - Uses 3 verified clinician portraits with approved credentials directly from doctors-content.ts.
 * - Asymmetric composition with subtle blush and sky shapes.
 * - Poppins for headings, Plus Jakarta Sans for body, labels and links.
 * - No invented qualifications, biographies or clinical claims.
 */
export function TeamIntroSection() {
  // Every name, credential, role, focus and photo below is read from the
  // approved doctor records in doctors-content.ts — nothing is re-typed
  // here, so this section can't drift from the Doctors pages. Only the
  // crop focal point is local to this layout.
  const pick = (slug: string, photoPos: string) => {
    const doctor = doctors.find((d) => d.slug === slug);
    if (!doctor || !doctor.photo.src) return null;
    return {
      doctor,
      photoSrc: doctor.photo.src,
      photoAlt: doctor.photo.alt,
      role: doctor.role,
      focus: doctor.specialFocus ?? doctor.careAreas?.join(" · ") ?? null,
      photoPos,
    };
  };

  const drSantoshi = pick("dr-santoshi-nandigam", "50% 22%");
  const drDeepika = pick("dr-deepika-sivathanu", "50% 20%");

  if (!drSantoshi || !drDeepika) return null;

  const clinicians = [
    {
      ...drSantoshi,
      badge: "FOUNDER",
      badgeStyle: "bg-[#FAF2ED] text-terracotta-deep",
      dotStyle: "bg-terracotta",
      hoverBorder: "hover:border-terracotta/40",
      accentText: "text-terracotta-deep",
      description:
        drSantoshi.doctor.description ??
        "The Birthwave is designed as one continuous care journey, with space for questions, preferences, preparation and follow-up — across pregnancy, birth and recovery.",
    },
    {
      ...drDeepika,
      badge: "PAEDIATRICS",
      badgeStyle: "bg-[#EDF6FA] text-sky-deep",
      dotStyle: "bg-sky",
      hoverBorder: "hover:border-sky/40",
      accentText: "text-sky-deep",
      description:
        drDeepika.doctor.description ??
        "Newborn and paediatric care, early parenting guidance and support as your baby’s journey begins.",
    },
  ];

  return (
    <section
      id="team-introduction"
      aria-labelledby="team-intro-heading"
      className="relative isolate overflow-hidden bg-paper py-20 sm:py-24 lg:py-32"
    >
      {/* Aesthetic animated flowing care waves & soft edge washes */}
      <CareWaveBackground preset="team" />

      <div className="container-birthwave relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 pb-12 sm:pb-16 border-b border-ink/8">
          <div className="max-w-2xl">
            <p className="eyebrow text-terracotta-deep">
              THE PEOPLE BEHIND YOUR CARE
            </p>
            <h2
              id="team-intro-heading"
              className="mt-3.5 text-balance font-display text-[clamp(2.3rem,1.9rem+2.2vw,3.5rem)] font-semibold leading-[1.08] tracking-[var(--tracking-tight)] text-ink"
            >
              Meet the people behind your care.
            </h2>
            <p className="mt-4 text-base sm:text-lg leading-[1.65] text-ink-soft">
              Get to know The Birthwave’s medical and allied-care team.
            </p>
          </div>

          <div className="shrink-0 pt-2 lg:pt-0">
            <Link
              href="/doctors"
              className="group inline-flex items-center gap-2 rounded-xs border border-ink/20 bg-paper-dim/60 px-6 py-3.5 font-body text-sm font-semibold tracking-[0.08em] uppercase text-ink transition-all duration-200 hover:border-ink hover:bg-paper"
            >
              <span>Explore Our Care Team</span>
              <ArrowUpRight
                aria-hidden="true"
                className="size-4 text-ink-soft transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink"
              />
            </Link>
          </div>
        </div>

        {/* Clinician Profiles: Dr. Santoshi & Dr. Deepika */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {clinicians.map((item, idx) => {
            if (!item.doctor || !item.photoSrc) return null;
            return (
              <AnimatedContent
                key={item.doctor.slug}
                direction="vertical"
                distance={16}
                duration={0.5}
                delay={idx * 0.12}
                ease="power2.out"
                className={`flex flex-col sm:flex-row overflow-hidden rounded-2xl sm:rounded-3xl border border-ink/10 bg-white shadow-[0_4px_24px_rgba(53,43,41,0.03)] transition-all duration-300 ${item.hoverBorder} hover:shadow-[0_12px_32px_rgba(53,43,41,0.06)]`}
              >
                <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full sm:w-[44%] shrink-0 overflow-hidden bg-paper-dim">
                  <Image
                    src={item.photoSrc}
                    alt={item.photoAlt}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 44vw, 100vw"
                    className="object-cover"
                    style={{ objectPosition: item.photoPos }}
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent sm:hidden"
                  />
                </div>

                <div className="flex flex-col justify-between p-6 sm:p-7 flex-1">
                  <div>
                    <div
                      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 font-body text-xs font-semibold uppercase tracking-wider ${item.badgeStyle}`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${item.dotStyle}`} />
                      {item.badge}
                    </div>

                    <h3 className="mt-4 font-display text-2xl font-semibold text-ink">
                      {item.doctor.name}
                    </h3>

                    {item.doctor.credentials && (
                      <p className="mt-1 font-body text-xs font-medium text-ink-soft/80">
                        {item.doctor.credentials}
                      </p>
                    )}

                    <p className={`mt-3 font-body text-sm font-semibold ${item.accentText}`}>
                      {item.role}
                    </p>

                    {item.focus && (
                      <p className="mt-1 text-xs text-ink-soft">{item.focus}</p>
                    )}

                    {item.description && (
                      <p className="mt-4 text-sm leading-[1.65] text-ink-soft">
                        {item.description}
                      </p>
                    )}
                  </div>

                  <div className="mt-6 pt-5 border-t border-ink/8">
                    <Link
                      href={`/doctors/${item.doctor.slug}`}
                      className={`inline-flex items-center gap-1.5 font-body text-xs font-semibold tracking-wider uppercase ${item.accentText} hover:text-ink transition-colors`}
                    >
                      <span className="border-b border-current/30 pb-0.5">View Profile</span>
                      <ArrowUpRight aria-hidden="true" className="size-3.5" />
                    </Link>
                  </div>
                </div>
              </AnimatedContent>
            );
          })}
        </div>
      </div>
    </section>
  );
}
