import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { heroFocalPointClassName, heroFocalPointStyle, type HeroFocalPoint } from "@/lib/hero-focal-point";

interface HeroLink {
  label: string;
  href: string;
}

interface HeroImage {
  src: string | StaticImageData;
  alt: string;
  objectPosition?: string;
  focalPoint?: HeroFocalPoint;
}

export interface CareServiceHeroProps {
  id?: string;
  eyebrow: string;
  heading: string;
  supporting: string;
  body?: string;
  primaryCta?: HeroLink;
  secondaryCta?: HeroLink;
  image?: HeroImage;
  backgroundImage?: string;
  fallbackLabel?: string;
  fallbackGradient?: string;
  disclosure?: string;
  location?: string;
}

/** Shared hero for every care service route. Matches the reference design aesthetic. */
export function CareServiceHero({
  id,
  eyebrow,
  heading,
  supporting,
  body,
  primaryCta,
  secondaryCta,
  image,
  backgroundImage = "/images/services/care-service-hero-background-v1.png",
  fallbackLabel = "Approved photography pending",
  fallbackGradient,
  disclosure,
  location,
}: CareServiceHeroProps) {
  return (
    <section
      id={id}
      aria-labelledby="care-service-hero-heading"
      className="relative isolate overflow-hidden pt-[calc(var(--header-height)+1.75rem)] pb-16 sm:pb-20 lg:pt-[calc(var(--header-height)+2.5rem)] lg:pb-24"
    >
      {/* Background Clinic Sanctuary Interior */}
      <div className="absolute inset-0 -z-20">
        <Image
          src={backgroundImage}
          alt=""
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Atmospheric Soft Light Scrim Overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(255,250,248,0.92)_0%,rgba(255,250,248,0.80)_48%,rgba(255,248,245,0.36)_100%)] max-lg:bg-[linear-gradient(180deg,rgba(255,250,248,0.95)_0%,rgba(255,250,248,0.88)_55%,rgba(255,248,245,0.5)_100%)]"
      />

      <div className="container-birthwave relative z-10 grid items-center gap-8 sm:gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-12 xl:gap-20">
        {/* Left Column on Desktop / Bottom on Responsive: Eyebrow, Heading, Supporting, Body, CTAs */}
        <div className="order-2 lg:order-1 max-w-[44rem]">
          <p className="eyebrow text-terracotta-deep">{eyebrow}</p>
          <h1
            id="care-service-hero-heading"
            className="mt-3 text-[clamp(2.15rem,1.75rem+2.5vw,4.25rem)] font-bold tracking-[-0.035em] leading-[1.08] text-[#1A1615]"
          >
            {heading}
          </h1>

          <div className="mt-5 space-y-3.5 max-w-[530px] sm:mt-6">
            <p className="text-[clamp(0.9375rem,0.9rem+0.18vw,1.0625rem)] leading-[1.65] font-normal text-[#4A433F]">
              {supporting}
            </p>
            {body ? (
              <p className="text-[clamp(0.9375rem,0.9rem+0.18vw,1.0625rem)] leading-[1.65] font-normal text-[#5A524D]">
                {body}
              </p>
            ) : null}
          </div>

          {primaryCta || secondaryCta ? (
            <div className="mt-7 flex flex-wrap items-center gap-3.5 sm:mt-10 sm:gap-4">
              {primaryCta ? (
                <Link
                  href={primaryCta.href}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#B87866] hover:bg-[#A86957] text-white text-[13px] font-semibold tracking-[0.04em] uppercase px-6 py-3 sm:px-7 sm:py-3.5 shadow-[0_4px_16px_rgba(184,120,102,0.28)] transition-all duration-200"
                >
                  {primaryCta.label}
                  <ArrowUpRight aria-hidden="true" className="size-4 stroke-[2.5]" />
                </Link>
              ) : null}
              {secondaryCta ? (
                <Link
                  href={secondaryCta.href}
                  className="inline-flex items-center gap-2 rounded-xl bg-white hover:bg-[#FCF9F7] border border-[#DECFC6] hover:border-[#CEBEB4] text-[#1C1715] text-[13px] font-semibold tracking-[0.04em] uppercase px-6 py-3 sm:px-7 sm:py-3.5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-200"
                >
                  {secondaryCta.label}
                  <ArrowUpRight aria-hidden="true" className="size-4 stroke-[2.5]" />
                </Link>
              ) : null}
            </div>
          ) : null}

          {location ? (
            <p className="mt-5 flex items-center gap-2 text-sm text-[#5A524D] sm:mt-6">
              <MapPin aria-hidden="true" className="size-4 shrink-0 text-terracotta-deep" />
              {location}
            </p>
          ) : null}
        </div>

        {/* Right Column on Desktop / Top on Responsive: Rounded Arch Photo Card & Badge */}
        <figure className="order-1 lg:order-2 relative mx-auto w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[470px] lg:justify-self-end">
          <div className="relative aspect-[3/4] sm:aspect-[4/5] lg:h-[580px] w-full overflow-hidden rounded-[40px] sm:rounded-[44px] lg:rounded-[48px] shadow-[0_22px_55px_-12px_rgba(50,28,20,0.15)] border border-white/60 bg-[#E8DDD7]">
            {image ? (
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority
                fetchPriority="high"
                sizes="(max-width: 1024px) 90vw, 470px"
                className={`object-cover ${image.focalPoint ? heroFocalPointClassName(image.focalPoint) : ""}`}
                style={image.focalPoint ? heroFocalPointStyle(image.focalPoint) : { objectPosition: image.objectPosition ?? "center 12%" }}
              />
            ) : (
              <div
                className="absolute inset-0 grid place-items-center px-8 text-center text-sm font-semibold tracking-[.08em] text-ink-soft uppercase"
                style={{ backgroundImage: fallbackGradient }}
              >
                {fallbackLabel}
              </div>
            )}

            {disclosure ? (
              <figcaption className="absolute bottom-5 inset-x-3 sm:inset-x-5 flex justify-center">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/95 backdrop-blur-md px-4 sm:px-5 py-2 sm:py-2.5 shadow-[0_8px_24px_rgba(0,0,0,0.08)] border border-white/80">
                  <span className="text-[11.5px] sm:text-xs lg:text-[13px] font-medium text-[#221A17] tracking-tight whitespace-nowrap">
                    {disclosure}
                  </span>
                </div>
              </figcaption>
            ) : null}
          </div>
        </figure>
      </div>
    </section>
  );
}
