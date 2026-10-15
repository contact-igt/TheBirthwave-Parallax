import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { serviceNavigation } from "@/content/our-services-content";
import { Button } from "@/components/ui/button";
import styles from "./services-overview.module.css";

/**
 * Section 02 — Service Navigation ("Start Where You Are").
 * Features 7 clear doorways into our service chapters with direct in-page anchor links.
 */
export function ServicesNavigationSection() {
  return (
    <section
      id="service-navigation"
      aria-labelledby="services-nav-heading"
      className={`relative isolate scroll-mt-[calc(var(--header-height)+1.5rem)] ${styles.section} ${styles.overview}`}
    >
      {/* Anchor alias so #find-care also lands cleanly here */}
      <div id="find-care" className="absolute -top-[calc(var(--header-height)+1.5rem)]" aria-hidden="true" />

      <div className="container-birthwave">
        {/* Section Header */}
        <header className="max-w-2xl">
          <p className="eyebrow text-terracotta-deep font-semibold">{serviceNavigation.eyebrow}</p>
          <h2
            id="services-nav-heading"
            className="mt-3 text-h2 leading-[1.1] font-semibold tracking-[var(--tracking-tight)] text-ink"
          >
            {serviceNavigation.heading}
          </h2>
        </header>

        {/* 7 Navigation Cards Grid */}
        <div className={styles.tiles}>
          {serviceNavigation.items.map((item, index) => {
            const num = String(index + 1).padStart(2, "0");
            return (
              <Link
                key={item.title}
                href={item.href}
                className={`group ${styles.tile}`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-body text-xs font-semibold tracking-wider text-terracotta-deep">
                      {num}
                    </span>
                    <ArrowDown aria-hidden="true" className="size-4 text-terracotta-deep" />
                  </div>
                  <div className={styles.tileContent}>
                  <h3 className="mt-4 text-xl font-semibold leading-snug text-ink group-hover:text-terracotta-deep transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-[var(--leading-relaxed)] text-ink-soft">
                    {item.description}
                  </p>
                  </div>
                </div>

                <div className={styles.tileFooter}>
                  <span>Explore chapter</span>
                  <span aria-hidden="true">→</span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* This action jumps into the chapters rather than reloading /services. */}
        <div className="mt-8">
          <Button href={serviceNavigation.cta.href} variant="primary">
            {serviceNavigation.cta.label.replace(/\s*→$/, "")}
          </Button>
        </div>
      </div>
    </section>
  );
}
