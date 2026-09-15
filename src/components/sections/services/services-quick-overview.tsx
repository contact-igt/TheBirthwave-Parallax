import Link from "next/link";
import { careChapters, servicesShowcaseOrder, servicesQuickOverview } from "@/content/services-content";
import { accentVar } from "@/lib/accent-tint";

/**
 * Section 02 — Quick Care Overview (existing-page refinement). Every one
 * of the 11 confirmed services links DIRECTLY to its own `/services/
 * [slug]` page — a real `<Link>`, not a button that scrolls the Treatment
 * Showcase into a particular position. An earlier version of this
 * section used the latter (a `<button>` whose `onClick` computed a
 * scroll offset into the pinned stage), which the current brief rules
 * out explicitly: "visitors [must not be required] to use the animated
 * showcase" to reach a treatment, and a real link works identically with
 * JavaScript disabled, under reduced motion, and for a visitor who never
 * scrolls past this section at all.
 *
 * Grouped under the five confirmed chapter labels (`careChapters`,
 * services-content.ts) — the SAME presentation map the Treatment
 * Showcase itself reads, so the two never disagree about grouping or
 * order even though only the showcase's own first chapter is wired into
 * the pinned prototype so far.
 *
 * The visible "Skip treatment showcase" link sends a keyboard/screen-
 * reader visitor straight to Section 04 (Find the Right Care) without
 * needing to tab through the showcase's own reading sequence first.
 */
export function ServicesQuickOverview() {
  return (
    <section aria-labelledby="quick-overview-heading" className="relative isolate bg-paper section-pad">
      <div className="container-birthwave">
        <div className="flex max-w-2xl flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <div>
            <p className="eyebrow">{servicesQuickOverview.eyebrow}</p>
            <h2
              id="quick-overview-heading"
              className="mt-4 text-[clamp(2.1rem,1.6rem+2.2vw,3rem)] leading-[1.08] font-semibold tracking-[var(--tracking-tight)] text-ink"
            >
              {servicesQuickOverview.heading}
            </h2>
          </div>
          <a
            href={servicesQuickOverview.skipHref}
            className="shrink-0 text-sm font-medium text-ink-soft underline decoration-[var(--color-border-strong)] underline-offset-4 transition-colors duration-[var(--duration-fast)] hover:text-terracotta-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-focus-ring)]"
          >
            {servicesQuickOverview.skipLabel}
          </a>
        </div>

        <div className="mt-14 flex flex-col gap-12 sm:gap-14">
          {careChapters.map((chapter) => (
            <div key={chapter.id}>
              <p className="font-body text-sm font-semibold tracking-[var(--tracking-wider)] text-terracotta-deep uppercase">
                {chapter.label}
              </p>
              <ul className="mt-4 grid list-none border-t border-[var(--color-border)] sm:grid-cols-2">
                {chapter.services.map((service) => {
                  const globalIndex = servicesShowcaseOrder.indexOf(service);
                  return (
                    <li
                      key={service.slug}
                      className="border-b border-[var(--color-border)] sm:odd:border-r sm:[&:nth-last-child(-n+2)]:border-b-0"
                    >
                      <Link
                        href={`/services/${service.slug}`}
                        className="group flex w-full items-center gap-5 py-6 pr-4 transition-colors duration-[var(--duration-fast)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-focus-ring)] sm:pr-8"
                      >
                        <span
                          className="font-display shrink-0 text-lg font-semibold tabular-nums"
                          style={{ color: accentVar(globalIndex) }}
                        >
                          {String(globalIndex + 1).padStart(2, "0")}
                        </span>
                        <span className="flex-1 text-base font-medium text-ink transition-transform duration-[var(--duration-fast)] ease-[var(--ease-signature)] group-hover:translate-x-1 sm:text-lg">
                          {service.name}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
