import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CtaLink } from "@/components/ui/cta-link";
import { DotFieldRegion } from "@/components/layout/dot-field-region";
import { ServiceFaqSection } from "../shared/service-faq-section";
import { ServiceRelatedCare } from "../shared/service-related-care";
import {
  caesareanBirthClinician,
  caesareanBirthConsiderations,
  caesareanBirthConsultation,
  caesareanBirthDuring,
  caesareanBirthFaq,
  caesareanBirthHero,
  caesareanBirthImagery,
  caesareanBirthPreferences,
  caesareanBirthPreparation,
  caesareanBirthRecovery,
  caesareanBirthRelatedCare,
  caesareanBirthUnderstanding,
} from "@/content/pages/caesarean-birth";
import { CaesareanBirthReveal } from "./caesarean-birth-reveal";

type Item = { title: string; body: string };

const sectionBase = "relative isolate overflow-hidden section-pad border-t border-[var(--color-border)]";
const headingClass = "mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink";

function BackgroundArtwork({ src, position = "center" }: { src: string; position?: string }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 bg-cover bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(180deg, color-mix(in srgb, var(--color-paper) 84%, transparent), color-mix(in srgb, var(--color-paper) 72%, transparent)), url("${src}")`,
        backgroundPosition: position,
      }}
    />
  );
}

function SectionHeader({ id, eyebrow, heading, intro }: { id: string; eyebrow: string; heading: string; intro?: string }) {
  return (
    <header className="max-w-2xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className={headingClass}>{heading}</h2>
      {intro ? <p className="mt-4 text-base leading-[var(--leading-relaxed)] text-ink-soft sm:text-lg">{intro}</p> : null}
    </header>
  );
}

function NumberedRows({ items }: { items: readonly Item[] }) {
  return (
    <div className="mt-10 divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
      {items.map((item, index) => (
        <article key={item.title} className="grid gap-3 py-6 sm:grid-cols-[4rem_1fr] sm:gap-6">
          <span className="font-body text-sm font-semibold tracking-wider text-terracotta-deep">{String(index + 1).padStart(2, "0")}</span>
          <div>
            <h3 className="text-xl font-semibold text-ink">{item.title}</h3>
            <p className="mt-2 max-w-2xl text-base leading-[var(--leading-relaxed)] text-ink-soft">{item.body}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

function FactorGrid({ items }: { items: readonly Item[] }) {
  return (
    <div className="mt-10 grid gap-px overflow-hidden rounded-sm border border-[var(--color-border)] bg-[var(--color-border)] sm:grid-cols-2 lg:grid-cols-5">
      {items.map((item, index) => (
        <article key={item.title} className="flex flex-col bg-paper p-6 transition-colors hover:bg-paper-dim lg:p-5 xl:p-6">
          <span className="font-body text-xs font-semibold tracking-wider text-terracotta-deep">{String(index + 1).padStart(2, "0")}</span>
          <h3 className="mt-3 text-base font-semibold leading-snug text-ink">{item.title}</h3>
          <p className="mt-2 text-sm leading-[var(--leading-relaxed)] text-ink-soft">{item.body}</p>
        </article>
      ))}
    </div>
  );
}

export function CaesareanBirthUnderstanding() {
  const data = caesareanBirthUnderstanding;
  return (
    <section id="caesarean-understanding" aria-labelledby="caesarean-understanding-heading" className={`${sectionBase} bg-paper`}>
      <BackgroundArtwork src={caesareanBirthImagery.backgrounds.understanding} position="center 20%" />
      <CaesareanBirthReveal className="container-birthwave">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <SectionHeader id="caesarean-understanding-heading" eyebrow={data.eyebrow} heading={data.heading} />
          <div>
            <div className="space-y-3 text-lg leading-[var(--leading-relaxed)] text-ink-soft">
              {data.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <NumberedRows items={data.items} />
            <p className="mt-8 border-l-2 border-terracotta pl-4 text-sm leading-[var(--leading-relaxed)] text-ink-soft">{data.note}</p>
          </div>
        </div>
      </CaesareanBirthReveal>
    </section>
  );
}

export function CaesareanBirthConsiderations() {
  const data = caesareanBirthConsiderations;
  return (
    <section id="caesarean-considerations" aria-labelledby="caesarean-considerations-heading" className={`${sectionBase} bg-paper-dim/60`}>
      <BackgroundArtwork src={caesareanBirthImagery.backgrounds.considerations} position="center" />
      <CaesareanBirthReveal className="container-birthwave">
        <SectionHeader id="caesarean-considerations-heading" eyebrow={data.eyebrow} heading={data.heading} intro={data.intro} />
        <FactorGrid items={data.items} />
        <p className="mt-8 max-w-2xl text-sm leading-[var(--leading-relaxed)] text-ink-soft">{data.note}</p>
      </CaesareanBirthReveal>
    </section>
  );
}

export function CaesareanBirthPreparation() {
  const data = caesareanBirthPreparation;
  return (
    <section id="caesarean-preparation" aria-labelledby="caesarean-preparation-heading" className={`${sectionBase} bg-paper`}>
      <BackgroundArtwork src={caesareanBirthImagery.backgrounds.preparation} position="center" />
      <CaesareanBirthReveal className="container-birthwave grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <SectionHeader id="caesarean-preparation-heading" eyebrow={data.eyebrow} heading={data.heading} intro={data.intro} />
        <div>
          <NumberedRows items={data.items} />
          <p className="mt-8 border-l-2 border-terracotta pl-4 text-sm leading-[var(--leading-relaxed)] text-ink-soft">{data.note}</p>
        </div>
      </CaesareanBirthReveal>
    </section>
  );
}

export function CaesareanBirthDuring() {
  const data = caesareanBirthDuring;
  return (
    <section id="caesarean-during" aria-labelledby="caesarean-during-heading" className={`${sectionBase} bg-[color-mix(in_srgb,var(--color-sky)_10%,var(--color-paper))]`}>
      <BackgroundArtwork src={caesareanBirthImagery.backgrounds.during} position="center 35%" />
      <CaesareanBirthReveal className="container-birthwave">
        <SectionHeader id="caesarean-during-heading" eyebrow={data.eyebrow} heading={data.heading} />
        <NumberedRows items={data.items} />
        <p className="mt-8 max-w-2xl text-sm leading-[var(--leading-relaxed)] text-ink-soft">{data.note}</p>
      </CaesareanBirthReveal>
    </section>
  );
}

export function CaesareanBirthPreferences() {
  const data = caesareanBirthPreferences;
  return (
    <section id="caesarean-preferences" aria-labelledby="caesarean-preferences-heading" className={`${sectionBase} bg-paper`}>
      <BackgroundArtwork src={caesareanBirthImagery.backgrounds.preferences} position="center" />
      <CaesareanBirthReveal className="container-birthwave">
        <SectionHeader id="caesarean-preferences-heading" eyebrow={data.eyebrow} heading={data.heading} intro={data.intro} />
        <FactorGrid items={data.items} />
        <p className="mt-8 max-w-2xl text-sm leading-[var(--leading-relaxed)] text-ink-soft">{data.note}</p>
      </CaesareanBirthReveal>
    </section>
  );
}

export function CaesareanBirthRecovery() {
  const data = caesareanBirthRecovery;
  return (
    <section id="caesarean-recovery" aria-labelledby="caesarean-recovery-heading" className={`${sectionBase} bg-[color-mix(in_srgb,var(--color-coral)_10%,var(--color-paper))]`}>
      <BackgroundArtwork src={caesareanBirthImagery.backgrounds.recovery} position="center 25%" />
      <CaesareanBirthReveal className="container-birthwave">
        <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
          <SectionHeader id="caesarean-recovery-heading" eyebrow={data.eyebrow} heading={data.heading} intro={data.intro} />
          <div>
            <NumberedRows items={data.items} />
            <div className="mt-8 rounded-sm border border-[color-mix(in_srgb,var(--color-terracotta)_35%,transparent)] bg-paper/75 p-5 sm:p-6">
              <p className="text-sm leading-[var(--leading-relaxed)] text-ink">{data.riskNote}</p>
            </div>
            <div className="mt-8">
              <Button href={data.cta.href}>{data.cta.label.replace(/\s*↗$/, "")}</Button>
            </div>
          </div>
        </div>
      </CaesareanBirthReveal>
    </section>
  );
}

export function CaesareanBirthConsultation() {
  const data = caesareanBirthConsultation;
  return (
    <section id="caesarean-consultation" aria-labelledby="caesarean-consultation-heading" className={`${sectionBase} bg-paper`}>
      <BackgroundArtwork src={caesareanBirthImagery.backgrounds.consultation} position="center" />
      <CaesareanBirthReveal className="container-birthwave grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <SectionHeader id="caesarean-consultation-heading" eyebrow={data.eyebrow} heading={data.heading} intro={data.intro} />
        <div>
          <NumberedRows items={data.items} />
          <div className="mt-8"><Button href={data.cta.href}>{data.cta.label.replace(/\s*↗$/, "")}</Button></div>
        </div>
      </CaesareanBirthReveal>
    </section>
  );
}

export function CaesareanBirthClinician() {
  const { doctor } = caesareanBirthClinician;
  return (
    <section id="caesarean-clinician" aria-labelledby="caesarean-clinician-heading" className={`${sectionBase} bg-paper-dim/60`}>
      <BackgroundArtwork src={caesareanBirthImagery.backgrounds.clinician} position="center" />
      <CaesareanBirthReveal className="container-birthwave">
        <div className="grid gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:gap-16">
          <div className="relative mx-auto w-full max-w-sm">
            <div className="relative aspect-[4/5] overflow-hidden rounded-tl-panel rounded-tr-panel rounded-br-panel rounded-bl-sm border border-[var(--color-border)] bg-paper p-2.5 shadow-md">
              <div className="relative h-full w-full overflow-hidden rounded-tl-panel rounded-tr-panel rounded-br-panel rounded-bl-xs">
                <Image src={doctor.photo} alt={doctor.name} fill sizes="(max-width: 1023px) 90vw, 420px" className="object-cover" style={{ objectPosition: "50% 12%" }} />
              </div>
            </div>
            <div className="absolute -bottom-3 right-4 rounded-full border border-[var(--color-border)] bg-paper px-4 py-1.5 shadow-sm sm:right-6">
              <span className="font-body text-xs font-semibold tracking-wider text-terracotta-deep uppercase">{doctor.credentials}</span>
            </div>
          </div>
          <div className="max-w-xl">
            <SectionHeader id="caesarean-clinician-heading" eyebrow={caesareanBirthClinician.eyebrow} heading={caesareanBirthClinician.heading} />
            <div className="mt-6 border-l-2 border-terracotta pl-5">
              <h3 className="text-2xl font-semibold text-ink">{doctor.name}</h3>
              <p className="mt-1 font-body text-xs font-semibold tracking-wider text-terracotta-deep uppercase">{doctor.credentials}</p>
              <p className="mt-1 text-sm font-medium text-ink-soft">{doctor.role}</p>
              <span className="mt-2.5 inline-block rounded-xs bg-[color-mix(in_srgb,var(--color-coral)_14%,var(--color-paper))] px-2.5 py-1 text-xs font-semibold tracking-wide text-terracotta-deep">{doctor.specialty}</span>
            </div>
            <div className="mt-6 space-y-3.5 text-base leading-[var(--leading-relaxed)] text-ink-soft sm:text-lg">
              {doctor.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-[var(--color-border)] pt-6">
              <Button href={doctor.primaryCta.href}>{doctor.primaryCta.label.replace(/\s*↗$/, "")}</Button>
              <CtaLink href={doctor.secondaryCta.href}>{doctor.secondaryCta.label.replace(/\s*↗$/, "")}</CtaLink>
            </div>
          </div>
        </div>
      </CaesareanBirthReveal>
    </section>
  );
}

export function CaesareanBirthFaq() {
  return (
    <DotFieldRegion>
      <ServiceFaqSection
        id="caesarean-faq"
        eyebrow={caesareanBirthFaq.eyebrow}
        heading={caesareanBirthFaq.heading}
        description={caesareanBirthHero.supportingHeadline}
        items={caesareanBirthFaq.items}
        media={caesareanBirthImagery.faq}
        mediaCaption="Clear answers can make birth planning feel more manageable."
      />
    </DotFieldRegion>
  );
}

export function CaesareanBirthRelatedCare() {
  return (
    <ServiceRelatedCare
      id="caesarean-related-care"
      eyebrow={caesareanBirthRelatedCare.eyebrow}
      heading={caesareanBirthRelatedCare.heading}
      services={caesareanBirthRelatedCare.services.map((service) => ({ ...service, title: service.title.replace(/\s*↗$/, "") }))}
      Reveal={CaesareanBirthReveal}
    />
  );
}
