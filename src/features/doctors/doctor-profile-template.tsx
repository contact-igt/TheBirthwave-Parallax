import type { DoctorContent } from "@/content/doctors-content";

/**
 * Renders one team member's profile. A photo panel with the single-corner
 * signature radius beside a plain editorial name/credentials/bio block —
 * no card border, no icon row of "specialties."
 */
export function DoctorProfileTemplate({ doctor }: { doctor: DoctorContent }) {
  return (
    <article className="relative [padding-block-start:calc(var(--header-height)+var(--space-section))] [padding-block-end:var(--space-section)]">
      <div className="container-birthwave">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
          <div className="relative aspect-[4/5] overflow-hidden rounded-tr-panel rounded-tl-xs rounded-br-xs rounded-bl-xs bg-[linear-gradient(155deg,var(--color-paper-dim)_0%,var(--color-sky)_100%)]">
            <p className="absolute right-4 bottom-4 rounded-xs bg-paper/90 px-2.5 py-1 font-body text-[0.6875rem] font-semibold tracking-[0.1em] text-ink-soft uppercase backdrop-blur-sm">
              {doctor.photo.alt}
            </p>
          </div>

          <div className="max-w-xl">
            <p className="eyebrow">{doctor.role}</p>
            <h1 className="mt-4 text-3xl font-semibold text-ink sm:text-4xl">
              {doctor.name}
            </h1>
            <p className="mt-3 text-lg font-medium text-terracotta-deep">
              {doctor.credentials}
            </p>
            <p className="mt-8 text-lg leading-[var(--leading-relaxed)] text-ink-soft">
              {doctor.bio}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
