import Image from "next/image";
import { birthPrepGallery } from "@/content/birth-preparation-landing-content";
import { BirthPrepReveal } from "./birth-preparation-reveal";
import { Sparkles } from "lucide-react";

const workshopPhotos = [
  { src: "/images/web-ready/exp04508.jpg", alt: "Childbirth educator addressing expectant parents" },
  { src: "/images/web-ready/exp04695.jpg", alt: "Participants exploring movement in a prenatal workshop" },
  { src: "/images/web-ready/exp04558.jpg", alt: "Birth partners practising supportive techniques" },
  { src: "/images/web-ready/exp04661.jpg", alt: "Educator demonstrating newborn care with a training doll" },
  { src: "/images/web-ready/exp04511.jpg", alt: "Families in conversation at a prenatal workshop" },
] as const;

/**
 * Section 08 — Inside Our Workshops (A Look at the Learning Experience).
 * Visual reflections on practical preparation, partner support, and guided discussions.
 */
export function BirthPrepGallery() {
  return (
    <section
      id="birth-prep-gallery"
      aria-labelledby="birth-prep-gallery-heading"
      className="relative isolate overflow-hidden bg-[#f8f9f8] section-pad"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_8%_18%,#f8ebe5_0%,transparent_38%),radial-gradient(circle_at_94%_80%,#eef2ee_0%,transparent_34%)]" />
      <BirthPrepReveal className="container-birthwave relative">
        <div className="max-w-3xl">
          <p className="eyebrow">{birthPrepGallery.eyebrow}</p>
          <h2
            id="birth-prep-gallery-heading"
            className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink"
          >
            {birthPrepGallery.heading}
          </h2>
          <div className="mt-5 space-y-3 text-base leading-[var(--leading-relaxed)] text-ink-soft">
            {birthPrepGallery.intro.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </div>

        {/* 5 Workshop Moments */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {birthPrepGallery.captions.map((caption, idx) => (
            <div
              key={caption}
              className="group overflow-hidden rounded-[1.5rem] border border-white/80 bg-white/90 shadow-[0_12px_32px_-22px_rgba(76,55,47,0.24)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_20px_38px_-22px_rgba(76,55,47,0.32)]"
            >
              <div className="relative aspect-[3/2] overflow-hidden bg-paper-dim">
                <Image src={workshopPhotos[idx].src} alt={workshopPhotos[idx].alt} fill sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="flex items-center justify-between px-6 pt-5">
                <span className="font-body text-xs font-semibold tracking-[var(--tracking-wider)] text-terracotta-deep uppercase">
                  Moment 0{idx + 1}
                </span>
                <span aria-hidden="true" className="flex size-9 items-center justify-center rounded-full bg-[#f9eae3] text-terracotta-deep">
                  <Sparkles className="size-4" strokeWidth={1.6} />
                </span>
              </div>
              <p className="px-6 pb-6 pt-4 text-lg font-semibold text-ink">
                {caption}
              </p>
            </div>
          ))}
        </div>
      </BirthPrepReveal>
    </section>
  );
}
