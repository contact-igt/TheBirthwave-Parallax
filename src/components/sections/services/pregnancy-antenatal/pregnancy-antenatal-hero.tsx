import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock, MapPin } from "lucide-react";
import { pregnancyLandingHero } from "@/content/pregnancy-antenatal-landing-content";
import { servicesImagery } from "@/content/services-imagery";

/**
 * Section 1 — Hero: Pregnancy & Antenatal Care.
 * Layout-only redesign inspired by the reference composition:
 * - Two-column desktop composition (~56% / ~44%)
 * - Pill badge eyebrow with warm tint & dot
 * - Preserved typography & content hierarchy
 * - Filled accent primary CTA pill & light outlined secondary CTA pill
 * - Divider line & MapPin location reassurance
 * - Large organic portrait oval visual container with subtle border & shadow
 * - Floating "Unhurried Care" info card near lower-left of visual container
 * - Clean mobile stacking adhering to the preferred flow:
 *   eyebrow -> heading -> body -> CTAs -> visual -> info card -> location
 */
export function PregnancyAntenatalHero() {
  const image = servicesImagery["pregnancy-antenatal-hero"];

  return (
    <section
      id="pregnancy-hero"
      aria-label="Pregnancy & Antenatal Care"
      className="relative isolate overflow-hidden bg-[#FAF6F2] pt-[calc(var(--header-height)+1.5rem)] pb-16 sm:pt-[calc(var(--header-height)+2.25rem)] sm:pb-20 lg:pt-[calc(var(--header-height)+2.75rem)] lg:pb-24"
    >
      {/* Soft warm ambient lighting layers matching reference background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 -z-10 h-[580px] w-[580px] rounded-full bg-[radial-gradient(circle_at_center,rgba(235,165,148,0.2)_0%,rgba(243,232,226,0.35)_45%,transparent_70%)] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 -left-20 -z-10 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle_at_center,rgba(248,131,121,0.08)_0%,rgba(243,232,226,0.45)_50%,transparent_70%)] blur-2xl"
      />

      <div className="container-birthwave relative z-10 grid items-center gap-10 lg:grid-cols-[1.14fr_0.86fr] lg:gap-10 xl:gap-14">
        {/* Left Column (~56% desktop): Reassurance, Content & Actions */}
        <div className="max-w-xl lg:max-w-[560px]">
          {/* Eyebrow badge: pill container with dot */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--color-terracotta)_28%,transparent)] bg-[color-mix(in_srgb,var(--color-terracotta)_10%,var(--color-paper))] px-3.5 py-1.5 shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
            <span className="size-1.5 rounded-full bg-terracotta-deep" aria-hidden="true" />
            <span className="eyebrow text-terracotta-deep font-semibold tracking-wider">
              {pregnancyLandingHero.eyebrow}
            </span>
          </div>

          {/* Heading: strictly preserving typography classes with calibrated responsive fit */}
          <h1 className="mt-5 text-[clamp(2.15rem,1.4rem+2.2vw,3.65rem)] leading-[1.08] font-semibold tracking-[var(--tracking-tight)] text-ink">
            {pregnancyLandingHero.headingLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>

          {/* Supporting line */}
          <p className="mt-5 text-base sm:text-lg font-medium text-ink">
            {pregnancyLandingHero.supportingLine}
          </p>

          {/* Body paragraphs */}
          <div className="mt-4 space-y-3 text-sm sm:text-base leading-[var(--leading-relaxed)] text-ink-soft">
            {pregnancyLandingHero.body.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>

          {/* CTA Row: primary filled accent pill + secondary light outlined pill */}
          <div className="mt-8 flex flex-wrap items-center gap-3.5 sm:gap-4 lg:mt-9">
            <Link
              href={pregnancyLandingHero.primaryCta.href}
              className="group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-coral px-7 py-3.5 font-body text-xs sm:text-sm font-semibold tracking-[0.08em] uppercase text-white shadow-[0_10px_24px_-6px_rgba(248,131,121,0.42)] transition-all duration-[var(--duration-fast)] ease-[var(--ease-signature)] hover:bg-terracotta hover:shadow-[0_12px_28px_-6px_rgba(202,149,133,0.5)] focus-ring-on-brand"
            >
              <span>{pregnancyLandingHero.primaryCta.label.replace(/\s*↗$/, "")}</span>
              <ArrowUpRight
                aria-hidden="true"
                className="size-4 transition-transform duration-[var(--duration-fast)] ease-[var(--ease-signature)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>

            <Link
              href={pregnancyLandingHero.secondaryCta.href}
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--color-ink)_16%,transparent)] bg-white/90 px-6 py-3.5 font-body text-sm font-medium text-ink shadow-[0_2px_8px_rgba(53,43,41,0.04)] backdrop-blur-xs transition-all duration-[var(--duration-fast)] ease-[var(--ease-signature)] hover:border-ink/40 hover:bg-white hover:text-ink focus-visible:outline-2 focus-visible:outline-ink focus-visible:outline-offset-3"
            >
              <span>{pregnancyLandingHero.secondaryCta.label.replace(/\s*↗$/, "")}</span>
              <ArrowUpRight
                aria-hidden="true"
                className="size-4 text-ink/70 transition-transform duration-[var(--duration-fast)] ease-[var(--ease-signature)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink"
              />
            </Link>
          </div>

          {/* Desktop Location/Meta Row: divider & MapPin icon */}
          <div className="hidden lg:block mt-8 pt-6 border-t border-[color-mix(in_srgb,var(--color-terracotta)_18%,transparent)] max-w-md">
            <p className="flex items-center gap-2 font-body text-xs sm:text-sm text-ink-soft">
              <MapPin className="size-4 shrink-0 text-coral" aria-hidden="true" />
              <span>{pregnancyLandingHero.location}</span>
            </p>
          </div>
        </div>

        {/* Right Column (~44% desktop): Organic Visual Container & Floating Info Card */}
        <div className="relative flex flex-col items-center justify-center lg:items-center xl:items-end">
          {/* Visual container wrapper with halo & relative anchor for floating card */}
          <div className="relative w-fit pb-6 sm:pb-8 lg:pb-0">
            {/* Ambient warm blush halo behind organic container */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-6 -z-10 rounded-[50%] bg-[radial-gradient(circle_at_center,rgba(202,149,133,0.22)_0%,rgba(243,232,226,0.12)_60%,transparent_75%)] blur-2xl"
            />

            {/* Organic Oval/Circular Container */}
            <figure className="relative aspect-[1/1.06] w-[270px] sm:w-[330px] lg:w-[400px] xl:w-[460px] overflow-hidden rounded-[50%] border-2 border-white/80 bg-paper-dim shadow-[0_24px_50px_-16px_rgba(53,43,41,0.14),0_8px_24px_-8px_rgba(140,90,74,0.08)]">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority
                fetchPriority="high"
                sizes="(max-width: 639px) 270px, (max-width: 1023px) 330px, 460px"
                className="object-cover"
                style={{ objectPosition: "74% 14%" }}
              />
              <figcaption className="sr-only">
                AI-generated illustration: A pregnant woman in a softly lit, warm interior. Warm natural light · Antenatal care
              </figcaption>
            </figure>

            {/* Floating Info Card: anchored near lower-left edge of the visual container */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 sm:left-2 sm:translate-x-0 lg:-bottom-3 lg:-left-8 xl:-left-10 z-20 flex w-[calc(100%-1rem)] max-w-[285px] sm:max-w-[310px] items-center gap-3.5 rounded-2xl border border-[color-mix(in_srgb,var(--color-terracotta)_20%,transparent)] bg-white/95 px-4 py-3 sm:px-5 sm:py-3.5 shadow-[0_16px_36px_-8px_rgba(53,43,41,0.14),0_4px_12px_rgba(0,0,0,0.03)] backdrop-blur-md">
              <div
                aria-hidden="true"
                className="flex size-9 sm:size-10 shrink-0 items-center justify-center rounded-full bg-[#E5F3FA] text-[#4A8EB5]"
              >
                <Clock className="size-4 sm:size-4.5" strokeWidth={2.2} />
              </div>
              <div className="min-w-0">
                <span className="block font-body text-[0.6875rem] sm:text-xs font-bold tracking-[0.08em] uppercase text-terracotta-deep">
                  UNHURRIED CARE
                </span>
                <span className="mt-0.5 block font-body text-xs sm:text-[0.8125rem] leading-snug text-ink-soft">
                  Dedicated time to listen, answer, and support your choices.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Location/Meta Row: displayed below visual + card */}
        <div className="block lg:hidden w-full max-w-xl mx-auto pt-6 border-t border-[color-mix(in_srgb,var(--color-terracotta)_18%,transparent)]">
          <p className="flex items-center gap-2 font-body text-xs sm:text-sm text-ink-soft">
            <MapPin className="size-4 shrink-0 text-coral" aria-hidden="true" />
            <span>{pregnancyLandingHero.location}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
