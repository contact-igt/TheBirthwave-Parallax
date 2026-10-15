"use client";

import Image from "next/image";
import { ArrowUpRight, ImageIcon } from "lucide-react";
import { aboutClinicStrip } from "@/content/about-clinic-content";

interface AboutClinicStripProps {
  /** Optional custom image path once ready. If omitted, displays the visual placeholder. */
  imageSrc?: string;
  imageAlt?: string;
}

/**
 * Section: "Visit Us" — Clinic location card
 *
 * Displays clinic name, address, contact details, "Get Directions" button,
 * and an image placeholder formatted to match the reference design.
 */
export function AboutClinicStrip({ imageSrc, imageAlt }: AboutClinicStripProps) {
  return (
    <section
      id="clinic-location"
      aria-labelledby="clinic-strip-heading"
      className="py-12 sm:py-16 bg-[#FAF5F0]"
    >
      <div className="container-birthwave max-w-5xl lg:max-w-6xl mx-auto px-4 sm:px-6">
        <div
          style={{ backgroundColor: "#EFE7E0", borderColor: "#E4D9CF" }}
          className="border rounded-3xl p-7 sm:p-10 lg:p-12 shadow-[0_4px_24px_rgba(36,26,23,0.02)]"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10 lg:gap-12">
            {/* Left Details */}
            <div className="w-full md:flex-1 flex flex-col justify-center">
              <p
                style={{ color: "#B37055" }}
                className="font-semibold tracking-[0.2em] text-[11px] sm:text-xs uppercase mb-2"
              >
                {aboutClinicStrip.eyebrow}
              </p>
              <h2
                id="clinic-strip-heading"
                style={{ color: "#241A17" }}
                className="text-[clamp(1.75rem,1.4rem+1.6vw,2.5rem)] font-light tracking-tight leading-snug mb-3.5"
              >
                {aboutClinicStrip.heading}
              </h2>
              <p
                style={{ color: "#241A17" }}
                className="font-semibold text-base sm:text-lg mb-1"
              >
                {aboutClinicStrip.clinicName}
              </p>
              <p
                style={{ color: "#6E5D53" }}
                className="text-sm sm:text-base leading-relaxed mb-4 max-w-md"
              >
                {aboutClinicStrip.address}
              </p>

              <div
                style={{ color: "#6E5D53" }}
                className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm mb-6"
              >
                <div>
                  <span style={{ color: "#241A17" }} className="font-semibold">
                    Phone:
                  </span>{" "}
                  <a
                    href={`tel:${aboutClinicStrip.phone.replace(/[^+\d]/g, "")}`}
                    className="hover:underline transition-colors"
                  >
                    {aboutClinicStrip.phone}
                  </a>
                </div>
                <div>
                  <span style={{ color: "#241A17" }} className="font-semibold">
                    Email:
                  </span>{" "}
                  <a
                    href={`mailto:${aboutClinicStrip.email}`}
                    className="hover:underline transition-colors"
                  >
                    {aboutClinicStrip.email}
                  </a>
                </div>
              </div>

              <div>
                <a
                  href={aboutClinicStrip.directionsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ backgroundColor: "#8C4B35" }}
                  className="inline-flex items-center gap-2 rounded-md px-6 py-3 text-xs sm:text-sm font-semibold tracking-wider text-white uppercase shadow-sm transition-all duration-200 hover:opacity-90 hover:shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8C4B35] focus-visible:ring-offset-2"
                >
                  <span>{aboutClinicStrip.directionsLabel}</span>
                  <ArrowUpRight className="size-4 shrink-0" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Right: Image Placeholder */}
            <div className="w-full md:w-[320px] lg:w-[400px] shrink-0">
              {imageSrc ? (
                <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-md">
                  <Image
                    src={imageSrc}
                    alt={imageAlt || aboutClinicStrip.clinicName}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 400px"
                  />
                </div>
              ) : (
                <div
                  style={{ backgroundColor: "#E2D8CF", borderColor: "#C5B7AA" }}
                  className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border-2 border-dashed flex flex-col items-center justify-center p-6 text-center shadow-sm"
                >
                  <div
                    style={{ backgroundColor: "#D6C7BC", color: "#8C4B35" }}
                    className="size-14 rounded-full flex items-center justify-center mb-3 shadow-inner"
                  >
                    <ImageIcon className="size-6" aria-hidden="true" />
                  </div>
                  <p
                    style={{ color: "#241A17" }}
                    className="text-sm font-medium tracking-tight"
                  >
                    Image Placeholder
                  </p>
                  <p
                    style={{ color: "#7A6A60" }}
                    className="text-xs mt-1 max-w-[200px] leading-relaxed"
                  >
                    Add clinic sanctuary or facade image here (recommended 4:3)
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
