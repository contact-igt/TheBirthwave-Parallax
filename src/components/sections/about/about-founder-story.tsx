import Image from "next/image";
import { aboutFounderStory } from "@/content/about-content";
import { CtaLink } from "@/components/ui/cta-link";

/**
 * Section 05 — The Story Behind The BirthWave
 * Desktop: Large portrait sticky in left column while the story narrative scrolls on the right.
 */
export function AboutFounderStory() {
  return (
    <section
      id="about-founder-story"
      aria-labelledby="about-founder-story-heading"
      data-about-scene="founder-story"
      className="relative isolate section-pad"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, var(--color-paper) 0%, var(--color-paper-dim) 18%, var(--color-paper-dim) 82%, var(--color-paper) 100%)",
      }}
    >
      <div className="container-birthwave grid gap-14 lg:grid-cols-2 lg:items-start lg:gap-x-20">
        <div
          className="lg:self-start [@media(min-width:1024px)_and_(min-height:700px)]:sticky [@media(min-width:1024px)_and_(min-height:700px)]:top-[calc(var(--header-height)+3.5rem)]"
        >
          <div
            data-about-visual="founder-portrait"
            className="relative aspect-[4/5] w-full overflow-hidden rounded-tr-panel rounded-tl-xs rounded-br-xs rounded-bl-xs bg-paper-dim shadow-sm"
          >
            <Image
              src={aboutFounderStory.media.src}
              alt={aboutFounderStory.media.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-center"
              priority
            />
          </div>
        </div>

        <div className="max-w-xl">
          <p className="eyebrow">{aboutFounderStory.eyebrow}</p>
          <h2
            id="about-founder-story-heading"
            className="mt-4 text-[clamp(2.2rem,1.7rem+2.2vw,3.25rem)] leading-[1.08] font-semibold tracking-[var(--tracking-tight)] text-ink"
          >
            {aboutFounderStory.heading}
          </h2>

          <div className="mt-8 space-y-5">
            {aboutFounderStory.body.map((paragraph, index) => (
              <p key={index} className="text-lg leading-[var(--leading-relaxed)] text-ink-soft">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-10">
            <CtaLink href={aboutFounderStory.cta.href}>{aboutFounderStory.cta.label}</CtaLink>
          </div>
        </div>
      </div>
    </section>
  );
}
