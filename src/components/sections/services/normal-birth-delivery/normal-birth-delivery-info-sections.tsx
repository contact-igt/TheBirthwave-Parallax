import { Plus } from "lucide-react";
import { normalBirthCareTeam, normalBirthArrangements, normalBirthFaq } from "@/content/normal-birth-delivery-landing-content";
import { MediaPlaceholder } from "@/components/ui/media-placeholder";
import { PortraitPlaceholder } from "@/components/ui/portrait-placeholder";
import { NormalBirthReveal } from "./normal-birth-delivery-reveal";

/**
 * Section 7 — Meet the Care Team. No confirmed clinician is mapped to
 * this programme (see the content file's own top comment) — the shared
 * `PortraitPlaceholder` (reused unchanged, `photo.src: null`) stands in
 * for a real portrait, name, qualification, role and introduction until
 * one is confirmed. No "View Full Profile" link, since there is nothing
 * confirmed yet to link to, and the footnote is explicit that a related
 * mapping alone would not confirm attendance at any individual birth.
 */
export function NormalBirthCareTeam() {
  return (
    <section
      id="nbd-care-team"
      aria-labelledby="nbd-care-team-heading"
      className="relative isolate border-t border-[var(--color-border)] bg-paper section-pad"
    >
      <NormalBirthReveal className="container-birthwave grid gap-10 lg:grid-cols-[0.7fr_1fr] lg:items-center lg:gap-16">
        <PortraitPlaceholder
          photo={{ src: null, alt: "Actual clinician portrait — approved photography pending", placeholderLabel: normalBirthCareTeam.portraitPendingLabel }}
          index={0}
          className="max-w-sm"
        />

        <div className="max-w-xl">
          <p className="eyebrow">{normalBirthCareTeam.eyebrow}</p>
          <h2 id="nbd-care-team-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
            {normalBirthCareTeam.heading}
          </h2>
          <h3 className="mt-6 text-xl font-semibold text-ink">{normalBirthCareTeam.namePlaceholder}</h3>
          <p className="mt-2 text-sm text-ink-soft">{normalBirthCareTeam.credentialsPlaceholder}</p>
          <p className="mt-5 text-base leading-[var(--leading-relaxed)] text-ink-soft">{normalBirthCareTeam.introPlaceholder}</p>
          <p className="mt-8 border-t border-[var(--color-border)] pt-4 text-sm text-ink-soft">{normalBirthCareTeam.footnote}</p>
        </div>
      </NormalBirthReveal>
    </section>
  );
}

/**
 * Section 8 — Delivery Arrangements. Every field is a confirmed-pending
 * placeholder (see the content file's own comment); the consultation
 * location and the delivery facility are explicitly called out as
 * possibly-different places rather than left ambiguous. No photograph
 * implies a real delivery facility — the shared `MediaPlaceholder` stands
 * in until one is confirmed.
 */
export function NormalBirthArrangements() {
  return (
    <section
      id="nbd-arrangements"
      aria-labelledby="nbd-arrangements-heading"
      className="relative isolate bg-[var(--nbd-rose-wash)] section-pad"
    >
      <NormalBirthReveal className="container-birthwave grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
        <MediaPlaceholder
          alt="Actual delivery-facility photograph — approved photography pending"
          gradient="linear-gradient(135deg, var(--color-paper-dim) 0%, var(--color-sky) 100%)"
          corner="tr"
          aspect="aspect-[4/5]"
          className="w-full"
        />

        <div>
          <p className="eyebrow">{normalBirthArrangements.eyebrow}</p>
          <h2 id="nbd-arrangements-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
            {normalBirthArrangements.heading}
          </h2>
          <p className="mt-4 max-w-[52ch] text-base leading-[var(--leading-relaxed)] text-ink-soft">{normalBirthArrangements.intro}</p>

          <div className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2">
            {normalBirthArrangements.info.map((item) => (
              <div key={item.label}>
                <strong className="block font-body text-sm font-semibold text-ink">{item.label}</strong>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {item.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </div>
            ))}
          </div>
        </div>
      </NormalBirthReveal>
    </section>
  );
}

/** Section 9 — FAQ. Native `<details>/<summary>` — the same accessible
 * accordion `faq-section.tsx` and every other landing page already
 * establish site-wide. */
export function NormalBirthFaq() {
  return (
    <section id="nbd-faq" aria-labelledby="nbd-faq-heading" className="relative isolate bg-paper section-pad">
      <NormalBirthReveal className="container-birthwave max-w-3xl">
        <p className="eyebrow">{normalBirthFaq.eyebrow}</p>
        <h2 id="nbd-faq-heading" className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink">
          {normalBirthFaq.heading}
        </h2>

        <div className="mt-10 border-t border-[var(--color-border)]">
          {normalBirthFaq.items.map((item) => (
            <details key={item.question} className="group border-b border-[var(--color-border)] py-6">
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 font-body text-lg font-medium text-balance text-ink [&::-webkit-details-marker]:hidden">
                {item.question}
                <Plus
                  aria-hidden="true"
                  className="size-5 shrink-0 text-terracotta transition-transform duration-[var(--duration-fast)] ease-[var(--ease-signature)] group-open:rotate-45"
                />
              </summary>
              <p className="mt-4 max-w-2xl text-base leading-[var(--leading-relaxed)] text-ink-soft">{item.answer}</p>
            </details>
          ))}
        </div>
      </NormalBirthReveal>
    </section>
  );
}
