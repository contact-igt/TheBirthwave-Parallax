import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, ChevronDown, Compass, MapPin, MessageSquare, Phone } from "lucide-react";
import {
  pregnancyLandingClinician,
  pregnancyLandingApproach,
  pregnancyLandingFaq,
  pregnancyLandingVisit,
} from "@/content/pregnancy-antenatal-landing-content";
import { servicesImagery } from "@/content/services-imagery";
import { PregnancyReveal } from "./pregnancy-antenatal-reveal";

/**
 * Section 5 — Doctor-Led Pregnancy Care.
 * Dr. Santoshi Nandigam featured spotlight card with verified bio and photography.
 */
export function PregnancyAntenatalClinician() {
  const { doctor } = pregnancyLandingClinician;

  return (
    <section
      id="pregnancy-clinician"
      aria-labelledby="pregnancy-clinician-heading"
      className="relative isolate bg-[#FAF6F2] section-pad"
    >
      <PregnancyReveal className="container-birthwave">
        {/* Section Header */}
        <div className="max-w-xl mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--color-terracotta)_28%,transparent)] bg-[color-mix(in_srgb,var(--color-terracotta)_10%,var(--color-paper))] px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-terracotta-deep mb-3.5">
            <span className="size-1.5 rounded-full bg-coral" aria-hidden="true" />
            {pregnancyLandingClinician.eyebrow}
          </div>
          <h2
            id="pregnancy-clinician-heading"
            className="text-[clamp(2.1rem,1.5rem+2.6vw,3.4rem)] leading-[1.12] font-semibold tracking-[var(--tracking-tight)] text-ink"
          >
            {pregnancyLandingClinician.heading}
          </h2>
        </div>

        {/* Featured Doctor Spotlight Card */}
        <div className="bg-white rounded-3xl border border-[color-mix(in_srgb,var(--color-terracotta)_22%,transparent)] shadow-[0_20px_50px_-16px_rgba(53,43,41,0.08)] overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-center">
          {/* Doctor Image Column */}
          <div className="lg:col-span-5 h-full min-h-[340px] sm:min-h-[420px] lg:min-h-[500px] relative bg-[#FAF6F2] overflow-hidden">
            <Image
              src={doctor.photo}
              alt={doctor.name}
              fill
              sizes="(max-width: 1023px) 92vw, 500px"
              className="object-cover object-top transition-transform duration-700 hover:scale-102"
              style={{ objectPosition: "50% 12%" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent lg:hidden pointer-events-none" />
            <div className="absolute bottom-4 left-4 text-white lg:hidden">
              <span className="text-xs uppercase font-semibold tracking-widest">Founder · The Birthwave</span>
            </div>
          </div>

          {/* Doctor Details Column */}
          <div className="lg:col-span-7 p-6 sm:p-10 md:p-12 lg:p-14 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="size-2 rounded-full bg-sky" aria-hidden="true" />
              <span className="font-body text-xs font-bold uppercase tracking-widest text-sky-deep">
                Consultant Obstetrician &amp; Gynaecologist
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-ink mb-1">
              {doctor.name}
            </h3>
            <p className="font-body text-xs font-semibold tracking-wider text-terracotta-deep uppercase mb-1">
              {doctor.credentials}
            </p>
            <p className="text-sm font-medium text-ink-soft mb-6">{doctor.role}</p>

            <div className="space-y-4 text-base sm:text-lg leading-[var(--leading-relaxed)] text-ink-soft font-normal mb-8">
              {doctor.bio.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>

            {/* Doctor Profile CTA */}
            <div>
              <Link
                href={doctor.cta.href}
                className="group inline-flex items-center gap-2 rounded-full bg-[color-mix(in_srgb,var(--color-terracotta)_12%,var(--color-paper))] px-6 py-3 font-body text-sm font-semibold tracking-wide text-ink border border-[color-mix(in_srgb,var(--color-terracotta)_30%,transparent)] shadow-2xs hover:bg-white hover:border-coral transition-all duration-[var(--duration-fast)] ease-[var(--ease-signature)] hover:-translate-y-0.5"
              >
                <span>{doctor.cta.label.replace(/\s*↗$/, "")}</span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4 text-terracotta-deep transition-transform duration-[var(--duration-fast)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>
          </div>
        </div>
      </PregnancyReveal>
    </section>
  );
}

/**
 * Section 6 — The Birthwave Approach.
 * Three minimal editorial principles with distinct icon badges.
 */
export function PregnancyAntenatalApproach() {
  const icons = [CheckCircle2, MessageSquare, Compass];
  const iconTones = [
    { bg: "bg-[#E5F3FA]", text: "text-[#4A8EB5]", border: "border-[#5DAEDB]/30" },
    { bg: "bg-[#FEEDEA]", text: "text-coral", border: "border-coral/30" },
    { bg: "bg-[#F5DDD6]", text: "text-terracotta-deep", border: "border-terracotta/40" },
  ];

  return (
    <section
      id="pregnancy-approach"
      aria-labelledby="pregnancy-approach-heading"
      className="relative isolate bg-white border-y border-[color-mix(in_srgb,var(--color-terracotta)_18%,transparent)] section-pad"
    >
      <PregnancyReveal className="container-birthwave">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--color-terracotta)_28%,transparent)] bg-[color-mix(in_srgb,var(--color-terracotta)_10%,var(--color-paper))] px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-terracotta-deep mb-3.5">
            <span className="size-1.5 rounded-full bg-coral" aria-hidden="true" />
            {pregnancyLandingApproach.eyebrow}
          </div>
          <h2
            id="pregnancy-approach-heading"
            className="text-[clamp(2.1rem,1.5rem+2.6vw,3.4rem)] leading-[1.12] font-semibold tracking-[var(--tracking-tight)] text-ink"
          >
            {pregnancyLandingApproach.heading.map((line, idx) => (
              <span key={line} className={idx === 1 ? "block text-terracotta-deep font-normal mt-0.5" : "block"}>
                {line}
              </span>
            ))}
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-ink-soft font-normal">
            {pregnancyLandingApproach.supportingLine}
          </p>
        </div>

        {/* 3 Editorial Approach Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {pregnancyLandingApproach.values.map((value, idx) => {
            const Icon = icons[idx] ?? CheckCircle2;
            const tone = iconTones[idx] ?? iconTones[0];
            return (
              <div
                key={value.title}
                className="group p-7 sm:p-8 rounded-3xl bg-[#FAF6F2] border border-[color-mix(in_srgb,var(--color-terracotta)_20%,transparent)] flex flex-col justify-between hover:bg-white hover:border-sky/40 transition-all duration-300 hover:-translate-y-1 shadow-xs hover:shadow-md"
              >
                <div>
                  <div
                    className={`size-11 rounded-full ${tone.bg} ${tone.text} border ${tone.border} flex items-center justify-center mb-6 shadow-2xs`}
                  >
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-ink mb-3">{value.title}</h3>
                  <p className="text-sm sm:text-base leading-[var(--leading-relaxed)] text-ink-soft font-normal">
                    {value.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </PregnancyReveal>
    </section>
  );
}

/**
 * Section 7 — FAQ: 12 comprehensive questions and answers.
 * Clean accordion direction with native details/summary accessibility.
 */
export function PregnancyAntenatalFaq() {
  const faqImage = servicesImagery["pregnancy-antenatal-faq-visual"];

  return (
    <section
      id="pregnancy-faq"
      aria-labelledby="pregnancy-faq-heading"
      className="relative isolate bg-[#FAF6F2] section-pad"
    >
      <PregnancyReveal className="container-birthwave">
        <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start lg:gap-14 xl:gap-16">
          {/* Left Column: Heading & Maternity Visual */}
          <div className="lg:sticky lg:top-28">
            <div className="inline-flex items-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--color-terracotta)_28%,transparent)] bg-[color-mix(in_srgb,var(--color-terracotta)_10%,var(--color-paper))] px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-terracotta-deep mb-3.5">
              <span className="size-1.5 rounded-full bg-coral" aria-hidden="true" />
              {pregnancyLandingFaq.eyebrow}
            </div>
            <h2
              id="pregnancy-faq-heading"
              className="text-[clamp(2.1rem,1.5rem+2.6vw,3.2rem)] leading-[1.12] font-semibold tracking-[var(--tracking-tight)] text-ink"
            >
              {pregnancyLandingFaq.heading}
            </h2>

            {/* Supporting Editorial Image Card */}
            <div className="mt-8 hidden overflow-hidden rounded-3xl border border-[color-mix(in_srgb,var(--color-terracotta)_22%,transparent)] bg-white shadow-[0_16px_40px_-16px_rgba(53,43,41,0.08)] lg:block">
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={faqImage.src}
                  alt={faqImage.alt}
                  fill
                  sizes="480px"
                  className="object-cover"
                  style={{ objectPosition: faqImage.objectPosition }}
                />
              </div>
              <div className="px-5 py-3.5 font-body text-xs text-ink-soft">
                Continuous reassurance throughout your pregnancy journey
              </div>
            </div>
          </div>

          {/* Right Column: Clean Accordion List (12 items) */}
          <div className="space-y-3.5 sm:space-y-4">
            {pregnancyLandingFaq.items.map((item, idx) => (
              <details
                key={item.question}
                className="group bg-white rounded-2xl border border-[color-mix(in_srgb,var(--color-terracotta)_20%,transparent)] overflow-hidden transition-all duration-300 open:shadow-xs"
                open={idx === 0}
              >
                <summary className="flex justify-between items-center p-5 sm:p-6 cursor-pointer list-none select-none text-left [&::-webkit-details-marker]:hidden">
                  <span className="font-body text-base sm:text-lg font-semibold text-ink group-hover:text-terracotta-deep transition-colors pr-4">
                    {item.question}
                  </span>
                  <span
                    aria-hidden="true"
                    className="size-7 rounded-full bg-[#FAF6F2] border border-terracotta/25 flex items-center justify-center text-terracotta-deep transition-transform duration-300 group-open:rotate-180 shrink-0"
                  >
                    <ChevronDown className="size-4" />
                  </span>
                </summary>
                <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base leading-[var(--leading-relaxed)] text-ink-soft border-t border-[color-mix(in_srgb,var(--color-terracotta)_12%,transparent)]">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </PregnancyReveal>
    </section>
  );
}

/**
 * Section 8 — Plan Your Visit.
 * Confirmed clinic address in Nungambakkam, phone contact, and Google Maps directions.
 */
export function PregnancyAntenatalVisit() {
  return (
    <section
      id="pregnancy-visit"
      aria-labelledby="pregnancy-visit-heading"
      className="relative isolate bg-[#F3E8E2]/50 border-t border-[color-mix(in_srgb,var(--color-terracotta)_18%,transparent)] section-pad"
    >
      <PregnancyReveal className="container-birthwave">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--color-terracotta)_28%,transparent)] bg-white/80 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-terracotta-deep mb-3.5 shadow-2xs">
            <span className="size-1.5 rounded-full bg-coral" aria-hidden="true" />
            {pregnancyLandingVisit.eyebrow}
          </div>
          <h2
            id="pregnancy-visit-heading"
            className="text-[clamp(2.1rem,1.5rem+2.6vw,3.4rem)] leading-[1.12] font-semibold tracking-[var(--tracking-tight)] text-ink"
          >
            {pregnancyLandingVisit.heading}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-ink-soft font-normal">
            {pregnancyLandingVisit.supportingLine}
          </p>
        </div>

        {/* 3 Structured Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Card 1: Location */}
          <div className="p-7 sm:p-8 rounded-3xl bg-white border border-[color-mix(in_srgb,var(--color-terracotta)_20%,transparent)] flex flex-col justify-between shadow-2xs hover:shadow-md transition-shadow">
            <div>
              <div className="size-10 rounded-full bg-[#FAF6F2] border border-terracotta/30 flex items-center justify-center text-terracotta-deep mb-5 shadow-2xs">
                <MapPin className="size-5" />
              </div>
              <h3 className="font-body text-xs font-bold uppercase tracking-wider text-terracotta-deep mb-2">
                Find us
              </h3>
              <p className="text-xl font-semibold text-ink leading-snug mb-3">
                {pregnancyLandingVisit.clinic.name}
              </p>
              <div className="text-sm leading-relaxed text-ink-soft font-normal">
                {pregnancyLandingVisit.clinic.addressLines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-[color-mix(in_srgb,var(--color-ink)_10%,transparent)] text-xs text-ink-soft/80 font-medium">
              Central Nungambakkam clinic location
            </div>
          </div>

          {/* Card 2: Contact */}
          <div className="p-7 sm:p-8 rounded-3xl bg-white border border-[color-mix(in_srgb,var(--color-terracotta)_20%,transparent)] flex flex-col justify-between shadow-2xs hover:shadow-md transition-shadow">
            <div>
              <div className="size-10 rounded-full bg-[#E5F3FA] border border-[#5DAEDB]/30 flex items-center justify-center text-[#4A8EB5] mb-5 shadow-2xs">
                <Phone className="size-5" />
              </div>
              <h3 className="font-body text-xs font-bold uppercase tracking-wider text-sky-deep mb-2">
                Contact the clinic
              </h3>
              <p className="text-xl font-semibold text-ink leading-snug mb-3">
                <a
                  href={`tel:${pregnancyLandingVisit.contact.phone.replace(/[^0-9+]/g, "")}`}
                  className="hover:text-sky-deep transition-colors underline decoration-terracotta/30 underline-offset-4"
                >
                  {pregnancyLandingVisit.contact.phone}
                </a>
              </p>
              <p className="text-sm leading-relaxed text-ink-soft font-normal">
                {pregnancyLandingVisit.appointments.text}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[color-mix(in_srgb,var(--color-ink)_10%,transparent)] text-xs text-ink-soft/80 font-medium">
              Phone &amp; WhatsApp assistance available
            </div>
          </div>

          {/* Card 3: Directions */}
          <div className="p-7 sm:p-8 rounded-3xl bg-white border border-[color-mix(in_srgb,var(--color-terracotta)_20%,transparent)] flex flex-col justify-between shadow-2xs hover:shadow-md transition-shadow">
            <div>
              <div className="size-10 rounded-full bg-[#FEEDEA] border border-coral/30 flex items-center justify-center text-coral mb-5 shadow-2xs">
                <Compass className="size-5" />
              </div>
              <h3 className="font-body text-xs font-bold uppercase tracking-wider text-coral mb-2">
                Getting here
              </h3>
              <p className="text-xl font-semibold text-ink leading-snug mb-3">
                Directions &amp; Navigation
              </p>
              <p className="text-sm leading-relaxed text-ink-soft font-normal">
                Easily accessible via Mahalingapuram Main Road. Directions and parking details are confirmed prior to your visit.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[color-mix(in_srgb,var(--color-ink)_10%,transparent)]">
              <Link
                href={pregnancyLandingVisit.cta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 font-body text-xs font-bold tracking-wider uppercase text-coral hover:text-terracotta-deep transition-colors"
              >
                <span>{pregnancyLandingVisit.cta.label.replace(/\s*↗$/, "")}</span>
                <ArrowUpRight className="size-3.5 transition-transform duration-[var(--duration-fast)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </PregnancyReveal>
    </section>
  );
}
