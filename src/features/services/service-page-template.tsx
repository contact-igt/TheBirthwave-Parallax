import type { ServiceContent } from "@/content/services-content";

/**
 * Renders one service's page. Editorial layout — an oversized statement,
 * a flowing highlights list between hairline rules (the same device the
 * homepage's Trust section uses), and a placeholder media panel with the
 * single-corner signature radius — deliberately not a generic feature
 * card grid or icon-box list.
 */
export function ServicePageTemplate({ service }: { service: ServiceContent }) {
  return (
    <article className="relative [padding-block-start:calc(var(--header-height)+var(--space-section))] [padding-block-end:var(--space-section)]">
      <div className="container-birthwave">
        <div className="max-w-3xl">
          <p className="eyebrow">{service.eyebrow}</p>
          <h1 className="mt-4 text-[clamp(2.25rem,1.5rem+2.6vw,4rem)] leading-[1.02] font-semibold tracking-[var(--tracking-tight)] text-ink">
            {service.name}
          </h1>
          <p className="mt-6 text-xl leading-[var(--leading-relaxed)] text-ink-soft">
            {service.heroStatement}
          </p>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
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
                  <span className="font-display shrink-0 text-lg font-semibold text-terracotta">
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
  );
}
