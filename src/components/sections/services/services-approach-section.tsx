import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ourApproachSection } from "@/content/our-services-content";
import styles from "./services-overview.module.css";

/**
 * Section 12 — Our Approach ("Different needs. Connected care.").
 * Editorial care philosophy highlighting multi-disciplinary coordination.
 */
export function ServicesApproachSection() {
  return (
    <section
      id={ourApproachSection.id}
      aria-labelledby="services-approach-heading"
      className={`relative isolate ${styles.section} ${styles.approach}`}
    >
      <div className={`container-birthwave ${styles.lowerGrid}`}>
          <div>
            <p className="eyebrow text-terracotta-deep font-semibold">{ourApproachSection.eyebrow}</p>
            <h2
              id="services-approach-heading"
              className="mt-3 text-[clamp(2.1rem,1.6rem+2.2vw,3rem)] leading-[1.08] font-semibold tracking-[var(--tracking-tight)] text-ink"
            >
              {ourApproachSection.heading}
            </h2>
          </div>

          <div>
            <div className="space-y-4 text-base sm:text-lg leading-[var(--leading-relaxed)] text-ink-soft">
              {ourApproachSection.paragraphs.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>

            <div className="mt-6">
              <Link
                href={ourApproachSection.cta.href}
                className="group inline-flex min-h-11 items-center gap-1.5 font-body text-base font-semibold text-terracotta-deep transition-colors duration-[var(--duration-fast)] hover:text-ink"
              >
                <span className="border-b border-current/40 pb-0.5 group-hover:border-current">
                  {ourApproachSection.cta.label.replace(/\s*→$/, "")}
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-[var(--duration-fast)] ease-[var(--ease-signature)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>
          </div>
      </div>
    </section>
  );
}
