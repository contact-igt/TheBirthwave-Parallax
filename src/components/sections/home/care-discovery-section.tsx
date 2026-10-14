import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatedContent } from "@/components/ui/animations/animated-content";
import { careDiscovery } from "@/content/site-content";

/**
 * Service Overview Section — "Find the care you need"
 *
 * Requirements:
 * - Real WebP background asset saved in /images/services/care-discovery-bg.webp.
 * - Header layout matching mockup reference:
 *   - Eyebrow: CARE OVERVIEW
 *   - Title: Find the care you need.
 *   - Subtitle: Explore care for your health, pregnancy, birth and beyond.
 *   - Action button on right: VIEW ALL SERVICES →
 * - 6 Opaque cards in responsive grid: 3 cols desktop, 2 cols tablet, 1 col mobile.
 * - Removed "Stage X of 6" and redundant dividers.
 * - Real line-art icons for Women's Health, Pregnancy, Birth Prep, Birth, After Birth, and Baby.
 * - Aligned card links at the bottom with smooth micro-interactions.
 */

function SproutIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="#B86B5A"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-8 sm:size-9 shrink-0"
      aria-hidden="true"
    >
      <path d="M16 26V14" />
      <path d="M16 14C16 8.5 20.5 5.5 25 5.5C25 10 21 14 16 14Z" />
      <path d="M16 18C12.5 18 9 15.5 8 11.5C12.5 10.5 15.5 13.5 16 18Z" />
    </svg>
  );
}

function PregnantIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="#B86B5A"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-8 sm:size-9 shrink-0"
      aria-hidden="true"
    >
      <circle cx="20.5" cy="8.5" r="2.8" />
      <path d="M18 11.5C16.5 13 15 15.5 15 18C15 22 17.5 25 19.5 27" />
      <path d="M18 14C19.5 15 21 15.8 21.5 17C22.2 18.2 22 19.5 20.5 21C18 23 16 23.5 17 26.5" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="#B86B5A"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-8 sm:size-9 shrink-0"
      aria-hidden="true"
    >
      <path d="M16 10C18.5 7.5 22 7.5 25 8V22C22 21.5 18.5 21.5 16 24C13.5 21.5 10 21.5 7 22V8C10 7.5 13.5 7.5 16 10Z" />
      <line x1="16" y1="10" x2="16" y2="24" />
    </svg>
  );
}

function WaveRibbonIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="#B86B5A"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-8 sm:size-9 shrink-0"
      aria-hidden="true"
    >
      <path d="M6 21C9.5 22 12.5 20.5 14.5 17.5C16.5 14 18.5 11 22 10C25.5 9 27.5 11 26.5 13.5C24.5 16.5 20 18.5 16 20.5C12 22.5 8.5 22 6 21Z" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="#B86B5A"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-8 sm:size-9 shrink-0"
      aria-hidden="true"
    >
      <path d="M16 26S7 20 7 13.5C7 9.5 10 7 13 7C14.8 7 15.8 8 16 9C16.2 8 17.2 7 19 7C22 7 25 9.5 25 13.5C25 20 16 26 16 26Z" />
    </svg>
  );
}

function BabyIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="#B86B5A"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-8 sm:size-9 shrink-0"
      aria-hidden="true"
    >
      <circle cx="16" cy="17" r="7" />
      <path d="M16 10C16 8 17.5 7.5 18 8.5C18.5 9.5 17 10 16 10Z" />
      <circle cx="13.5" cy="16" r="0.8" fill="#B86B5A" stroke="none" />
      <circle cx="18.5" cy="16" r="0.8" fill="#B86B5A" stroke="none" />
      <path d="M13.8 19C14.5 20.2 17.5 20.2 18.2 19" />
    </svg>
  );
}

const SERVICE_ICONS = [
  <SproutIcon key="sprout" />,
  <PregnantIcon key="pregnant" />,
  <BookIcon key="book" />,
  <WaveRibbonIcon key="wave" />,
  <HeartIcon key="heart" />,
  <BabyIcon key="baby" />,
];

export function CareDiscoverySection() {
  return (
    <section
      id="care-discovery"
      aria-labelledby="care-discovery-heading"
      className="relative isolate overflow-hidden py-20 sm:py-24 lg:py-28"
    >
      {/* Section Background Artwork */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 select-none overflow-hidden"
      >
        <Image
          src="/images/services/care-discovery-bg.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[50%_75%] sm:object-[50%_60%] lg:object-center"
          priority
        />
      </div>

      <div className="container-birthwave relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="max-w-2xl">
            <p className="eyebrow text-terracotta-deep">
              {careDiscovery.eyebrow}
            </p>
            <h2
              id="care-discovery-heading"
              className="mt-2.5 font-display text-[clamp(2.3rem,1.9rem+2.2vw,3.5rem)] font-bold leading-[1.08] tracking-[var(--tracking-tight)] text-ink"
            >
              {careDiscovery.heading}
            </h2>
          </div>

          <div className="shrink-0 pt-2 lg:pt-0">
            <Link
              href={careDiscovery.viewAllCta.href}
              className="group/cta inline-flex items-center gap-2 rounded-xs border border-[#D6C5B8] bg-[#F7EFE9]/80 px-6 py-3.5 font-body text-xs font-bold tracking-[0.08em] uppercase text-[#B86B5A] transition-all duration-200 hover:border-ink hover:bg-paper hover:text-ink"
            >
              <span>{careDiscovery.viewAllCta.label}</span>
              <ArrowRight
                aria-hidden="true"
                className="size-4 text-[#B86B5A] transition-transform duration-200 group-hover/cta:translate-x-1 group-hover/cta:text-ink"
              />
            </Link>
          </div>
        </div>

        {/* 6 Opaque Service Cards in 3-column / 2-column / 1-column layout */}
        <ul className="mx-auto mt-12 sm:mt-14 lg:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 list-none items-stretch">
          {careDiscovery.services.map((service, index) => (
            <li key={service.title} className="h-full">
              <AnimatedContent
                distance={14}
                duration={0.45}
                ease="power2.out"
                delay={index * 0.06}
                threshold={0.1}
                className="group relative flex h-full flex-col justify-between rounded-[20px] sm:rounded-[24px] border border-[#EADBCE]/85 bg-white p-6 sm:p-7 lg:p-8 shadow-[0_4px_24px_rgba(53,43,41,0.035)] transition-all duration-300 hover:border-terracotta/40 hover:shadow-[0_12px_36px_rgba(53,43,41,0.065)]"
              >
                <div>
                  {/* Card Top: Category and Icon */}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-body text-[11px] sm:text-xs font-semibold tracking-[0.16em] uppercase text-[#B86B5A]">
                        {service.category}
                      </p>
                      <h3 className="mt-1.5 font-display text-xl sm:text-2xl font-bold leading-snug text-ink transition-colors duration-200 group-hover:text-terracotta-deep">
                        {service.title}
                      </h3>
                    </div>
                    {SERVICE_ICONS[index]}
                  </div>

                  {/* Description */}
                  <p className="mt-3.5 sm:mt-4 font-body text-xs sm:text-[13px] leading-[1.65] text-ink-soft">
                    {service.description}
                  </p>
                </div>

                {/* Card Footer Link */}
                <div className="mt-6 pt-2">
                  <Link
                    href={service.cta.href}
                    className="group/link inline-flex items-center gap-1.5 font-body text-xs sm:text-[13px] font-semibold text-[#B86B5A] transition-colors duration-200 group-hover/link:text-ink"
                  >
                    <span className="border-b border-transparent group-hover/link:border-current pb-0.5 transition-colors">
                      {service.cta.label}
                    </span>
                    <ArrowRight
                      aria-hidden="true"
                      className="size-3.5 transition-transform duration-200 group-hover/link:translate-x-1"
                    />
                  </Link>
                </div>
              </AnimatedContent>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
