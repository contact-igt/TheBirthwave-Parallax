import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { doctors } from "@/content/doctors-content";
import { AnimatedContent } from "@/components/ui/animations/animated-content";

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
  const pick = (slug: string, photoPos: string, photoOverride?: string) => {
    const doctor = doctors.find((d) => d.slug === slug);
    if (!doctor || !doctor.photo.src) return null;
    return {
      doctor,
      photoSrc: photoOverride ?? doctor.photo.src,
      photoAlt: doctor.photo.alt,
      role: doctor.role,
      focus: doctor.specialFocus ?? doctor.careAreas?.join(" · ") ?? null,
      photoPos,
    };
  };

  const drSantoshi = pick("dr-santoshi-nandigam", "46% 30%", "/images/doctors/dr-santoshi-web.jpg");
  const drDeepika = pick("dr-deepika-sivathanu", "50% 14%");

  if (!drSantoshi || !drDeepika) return null;

  const clinicians = [
    {
      ...drSantoshi,
      badge: "FOUNDER",
      badgeStyle: "bg-[#FAF0E8] text-[#B86B5A] border border-[#F2DACD]",
      dotStyle: "bg-[#B86B5A]",
      accentText: "text-[#B86B5A]",
      roleTitle: "Founder - Obstetrician & Gynaecologist",
      focusSubtitle: "Natural Birth & VBAC Specialist · Holistic Fertility Coach",
      description:
        drSantoshi.doctor.description ??
        "The Birthwave is designed as one continuous care journey, with space for questions, preferences, preparation and follow-up — across pregnancy, birth and recovery.",
    },
    {
      ...drDeepika,
      badge: "PAEDIATRICS",
      badgeStyle: "bg-[#EBF5FB] text-[#3582A8] border border-[#D5EBF5]",
      dotStyle: "bg-[#3582A8]",
      accentText: "text-[#3582A8]",
      roleTitle: "Paediatrician",
      focusSubtitle: "Newborn & Pediatric Care",
      description:
        drDeepika.doctor.description ??
        "Newborn and paediatric care, early parenting guidance and support as your baby’s journey begins.",
    },
  ];

  return (
    <section
      id="team-introduction"
      aria-labelledby="team-intro-heading"
      className="relative isolate overflow-hidden bg-paper py-20 sm:py-24 lg:py-28"
    >
      {/* Background Architectural Artwork Image */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 select-none overflow-hidden"
      >
        <Image
          src="/images/doctors/team-section-bg.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-bottom"
          priority
        />
      </div>

      <div className="container-birthwave relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 pb-8 border-b border-[#E2D5CC]">
          <div className="max-w-2xl">
            <p className="eyebrow text-terracotta-deep">
              THE PEOPLE BEHIND YOUR CARE
            </p>
            <h2
              id="team-intro-heading"
              className="mt-3 font-display text-[clamp(2.3rem,1.9rem+2.2vw,3.5rem)] font-bold leading-[1.08] tracking-[var(--tracking-tight)] text-ink"
            >
              Meet the people<br />behind your care.
            </h2>
            <p className="mt-3.5 text-base sm:text-lg leading-[1.6] text-ink-soft">
              Get to know The Birthwave’s medical and allied-care team.
            </p>
          </div>

          <div className="shrink-0 pt-2 lg:pt-0">
            <Link
              href="/doctors"
              className="group inline-flex items-center gap-2 rounded-xs border border-[#D6C5B8] bg-[#F7EFE9]/70 px-5 py-3 font-body text-xs font-bold tracking-[0.08em] uppercase text-ink transition-all duration-200 hover:border-ink hover:bg-paper"
            >
              <span>Explore Our Care Team</span>
              <ArrowUpRight
                aria-hidden="true"
                className="size-3.5 text-ink-soft transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink"
              />
            </Link>
          </div>
        </div>

        {/* Clinician Profiles: Dr. Santoshi & Dr. Deepika */}
        <div className="mt-10 sm:mt-12 lg:mt-14 grid grid-cols-1 lg:grid-cols-2 gap-7 xl:gap-8 items-stretch">
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
                className="group relative flex flex-col sm:flex-row overflow-hidden rounded-[28px] sm:rounded-[32px] border border-[#EADBCE]/85 bg-white/95 shadow-[0_8px_30px_rgba(53,43,41,0.04)] backdrop-blur-xs transition-all duration-300 hover:shadow-[0_16px_40px_rgba(53,43,41,0.07)]"
              >
                {/* Doctor Portrait */}
                <div className="relative aspect-[4/5] sm:aspect-auto w-full sm:w-[45%] lg:w-[46%] shrink-0 overflow-hidden bg-paper-dim min-h-[280px] sm:min-h-[380px]">
                  <Image
                    src={item.photoSrc}
                    alt={item.photoAlt}
                    fill
                    sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.015]"
                    style={{ objectPosition: item.photoPos }}
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-ink/15 via-transparent to-transparent sm:hidden"
                  />
                </div>

                {/* Information Column */}
                <div className="flex flex-col justify-between p-6 sm:p-7 lg:p-8 flex-1 min-w-0">
                  <div>
                    <div
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-body text-[11px] font-semibold uppercase tracking-wider ${item.badgeStyle}`}
                    >
                      <span className={`size-1.5 rounded-full ${item.dotStyle}`} />
                      <span>{item.badge}</span>
                    </div>

                    <h3 className="mt-3.5 font-display text-[1.6rem] sm:text-[1.75rem] font-bold tracking-tight text-ink leading-tight">
                      {item.doctor.name}
                    </h3>

                    {item.doctor.credentials && (
                      <p className="mt-1 font-body text-xs font-medium text-ink-soft/90">
                        {item.doctor.credentials}
                      </p>
                    )}

                    <div className="mt-3.5">
                      <p className={`font-body text-xs sm:text-[13px] font-bold ${item.accentText}`}>
                        {item.roleTitle}
                      </p>
                      {item.focusSubtitle && (
                        <p className="mt-0.5 font-body text-[11px] text-ink-soft/90">
                          {item.focusSubtitle}
                        </p>
                      )}
                    </div>

                    {item.description && (
                      <p className="mt-3.5 font-body text-xs sm:text-[12.5px] leading-[1.65] text-ink-soft/95">
                        {item.description}
                      </p>
                    )}
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#EADBCE]/70">
                    <Link
                      href={`/doctors/${item.doctor.slug}`}
                      className="group/cta inline-flex items-center gap-1.5 font-body text-xs font-bold tracking-wider uppercase text-ink hover:text-terracotta-deep transition-colors"
                    >
                      <span>View Profile</span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-3.5 transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
                      />
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
