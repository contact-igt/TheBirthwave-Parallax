import type { ServiceContent } from "@/content/services-content";
import { CareServiceHero } from "@/components/sections/services/care-service-hero";

/**
 * Renders one service's page. Editorial layout — an oversized statement,
 * a flowing highlights list between hairline rules (the same device the
 * homepage's Trust section uses), and a placeholder media panel with the
 * single-corner signature radius — deliberately not a generic feature
 * card grid or icon-box list.
 */
export function ServicePageTemplate({ service }: { service: ServiceContent }) {
  return (
    <>
      <CareServiceHero
        eyebrow={service.eyebrow}
        heading={service.name}
        supporting={service.heroStatement}
        fallbackLabel={service.media.alt}
      />
      <article className="relative [padding-block:var(--space-section)]">
        <div className="container-birthwave">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <p className="max-w-xl text-lg leading-[var(--leading-relaxed)] text-ink-soft">
              {service.overview}
            </p>

            <ol className="mt-10 list-none border-t border-[var(--color-border)]">
              {service.highlights.map((highlight, index) => (
                <li
                  key={highlight}
                  className="flex gap-6 border-b border-[var(--color-border)] py-6 sm:gap-8"
                >
                  <span className="font-display shrink-0 text-lg font-semibold text-terracotta-deep">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-lg leading-[var(--leading-relaxed)] text-ink-soft">
                    {highlight}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <div className="relative aspect-[4/5] overflow-hidden rounded-tr-panel rounded-tl-xs rounded-br-xs rounded-bl-xs bg-[linear-gradient(155deg,var(--color-paper-dim)_0%,var(--color-terracotta)_100%)]">
            <p className="absolute right-4 bottom-4 rounded-xs bg-paper/90 px-2.5 py-1 font-body text-[0.6875rem] font-semibold tracking-[0.1em] text-ink-soft uppercase backdrop-blur-sm">
              {service.media.alt}
            </p>
          </div>
          </div>
        </div>
      </article>
    </>
  );
}
