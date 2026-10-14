import { birthPrepGallery } from "@/content/birth-preparation-landing-content";
import { BirthPrepReveal } from "./birth-preparation-reveal";
import { Sparkles } from "lucide-react";

/**
 * Section 08 — Inside Our Workshops (A Look at the Learning Experience).
 * Visual reflections on practical preparation, partner support, and guided discussions.
 */
export function BirthPrepGallery() {
  return (
    <section
      id="birth-prep-gallery"
      aria-labelledby="birth-prep-gallery-heading"
      className="relative isolate bg-[var(--birth-prep-sky-wash)] section-pad"
    >
      <BirthPrepReveal className="container-birthwave">
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
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {birthPrepGallery.captions.map((caption, idx) => (
            <div
              key={caption}
              className="flex flex-col justify-between rounded-xs border border-[var(--color-border)] bg-paper p-7"
            >
              <div className="flex items-center justify-between">
                <span className="font-body text-xs font-semibold tracking-[var(--tracking-wider)] text-terracotta-deep uppercase">
                  Moment 0{idx + 1}
                </span>
                <Sparkles className="size-4 text-terracotta" aria-hidden="true" />
              </div>
              <p className="mt-6 text-lg font-semibold text-ink">
                {caption}
              </p>
            </div>
          ))}
        </div>
      </BirthPrepReveal>
    </section>
  );
}
