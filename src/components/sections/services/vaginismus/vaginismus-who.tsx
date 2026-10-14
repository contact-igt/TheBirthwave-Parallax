import { vaginismusWho } from "@/content/vaginismus-landing-content";
import { VaginismusImage } from "./vaginismus-image";
import { VaginismusReveal } from "./vaginismus-reveal";
import { Button } from "@/components/ui/button";

/**
 * Section 3 — Is This Relevant to Me?
 * Identifies relatable symptoms/scenarios, addresses online counselling vs.
 * in-person multidisciplinary care, and features a detailed comparison table.
 */
export function VaginismusWho() {
  const { comparisonTable, onlineCounselling } = vaginismusWho;

  return (
    <section
      id="vaginismus-who"
      aria-labelledby="vaginismus-who-heading"
      className="relative isolate bg-[var(--vaginismus-rose-wash)] section-pad"
    >
      <VaginismusReveal className="container-birthwave">
        {/* Top: Relevance & Image */}
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
          <div className="order-2 lg:order-1">
            <VaginismusImage
              imageKey="who-this-is-for"
              corner="tl"
              aspect="aspect-[4/5] sm:aspect-[4/4.8]"
              className="w-full"
            />
          </div>

          <div className="order-1 max-w-2xl lg:order-2">
            <p className="eyebrow">{vaginismusWho.eyebrow}</p>
            <h2
              id="vaginismus-who-heading"
              className="mt-4 text-[clamp(2rem,1.5rem+2.6vw,3.4rem)] leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink"
            >
              {vaginismusWho.heading}
            </h2>

            <p className="mt-6 text-base font-medium text-ink">
              {vaginismusWho.intro}
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {vaginismusWho.points.map((point) => (
                <div
                  key={point.title}
                  className="rounded-xs border border-[var(--color-border)] bg-paper/80 p-5 backdrop-blur-xs"
                >
                  <h3 className="font-body text-sm font-semibold text-ink">
                    {point.title}
                  </h3>
                  <p className="mt-2 text-xs leading-[var(--leading-relaxed)] text-ink-soft">
                    {point.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Middle: Online counselling alone context */}
        <div className="mt-16 rounded-xs border border-[var(--color-border)] bg-paper p-8 sm:p-10 lg:mt-20">
          <div className="max-w-3xl">
            <h3 className="text-xl font-semibold text-ink sm:text-2xl">
              {onlineCounselling.heading}
            </h3>
            <div className="mt-4 space-y-3 text-base leading-[var(--leading-relaxed)] text-ink-soft">
              {onlineCounselling.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>

          {/* Comparison Table */}
          <div className="mt-10">
            <h4 className="font-body text-xs font-semibold tracking-[var(--tracking-wider)] text-terracotta-deep uppercase">
              {comparisonTable.heading}
            </h4>

            {/* Desktop / Tablet Table */}
            <div className="mt-4 hidden overflow-hidden rounded-xs border border-[var(--color-border)] sm:block">
              <table className="w-full text-left font-body text-sm">
                <thead className="bg-[#f0dfd8] text-xs font-semibold tracking-[var(--tracking-wide)] text-ink uppercase">
                  <tr>
                    {comparisonTable.headers.map((header, idx) => (
                      <th
                        key={header}
                        className={`p-4 ${idx === 2 ? "bg-[var(--vaginismus-sky-wash)] text-terracotta-deep font-bold" : ""}`}
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-border)]">
                  {comparisonTable.rows.map((row) => (
                    <tr key={row.area} className="hover:bg-paper-warm/50 transition-colors">
                      <td className="p-4 font-semibold text-ink">{row.area}</td>
                      <td className="p-4 text-ink-soft">{row.online}</td>
                      <td className="p-4 bg-[var(--vaginismus-sky-wash)]/40 font-medium text-ink">
                        {row.birthwave}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="mt-4 space-y-4 sm:hidden">
              {comparisonTable.rows.map((row) => (
                <div
                  key={row.area}
                  className="rounded-xs border border-[var(--color-border)] bg-paper-warm/40 p-4"
                >
                  <strong className="block font-body text-sm font-semibold text-ink">
                    {row.area}
                  </strong>
                  <div className="mt-3 space-y-2 text-xs leading-relaxed">
                    <div className="rounded-xs border border-[var(--color-border)] bg-paper p-3">
                      <span className="block font-semibold text-ink-soft/70 uppercase text-[0.6875rem]">
                        Online counselling-focused
                      </span>
                      <p className="mt-1 text-ink-soft">{row.online}</p>
                    </div>
                    <div className="rounded-xs border border-terracotta/30 bg-[var(--vaginismus-sky-wash)] p-3">
                      <span className="block font-semibold text-terracotta-deep uppercase text-[0.6875rem]">
                        The BirthWave coordinated care
                      </span>
                      <p className="mt-1 font-medium text-ink">{row.birthwave}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary text */}
            <div className="mt-8 space-y-3 max-w-3xl text-sm leading-[var(--leading-relaxed)] text-ink-soft">
              {comparisonTable.summary.map((sumText) => (
                <p key={sumText}>{sumText}</p>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8">
              <Button href={comparisonTable.cta.href} variant="primary">
                {comparisonTable.cta.label}
              </Button>
            </div>
          </div>
        </div>
      </VaginismusReveal>
    </section>
  );
}
