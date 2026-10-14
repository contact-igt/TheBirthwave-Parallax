"use client";

import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { serviceNavigation } from "@/content/our-services-content";
import { useScrollReveal } from "@/motion/scroll-scenes";
import { Button } from "@/components/ui/button";

/**
 * Section 02 — Service Navigation ("Start Where You Are").
 * Features 7 clear doorways into our service chapters with direct in-page anchor links.
 */
export function ServicesNavigationSection() {
  const { ref, revealed } = useScrollReveal<HTMLDivElement>({ threshold: 0.08 });

  return (
    <section
      id="service-navigation"
      aria-labelledby="services-nav-heading"
      className="relative isolate scroll-mt-[calc(var(--header-height)+1.5rem)] border-y border-[var(--color-border)] bg-paper py-16 sm:py-20 lg:py-24"
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
        <div
          ref={ref}
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch"
        >
          {serviceNavigation.items.map((item, index) => {
            const num = String(index + 1).padStart(2, "0");
            return (
              <Link
                key={item.title}
                href={item.href}
                className="group relative flex flex-col justify-between rounded-xs border border-[var(--color-border)] bg-paper-warm/50 p-6 sm:p-7 transition-all duration-[var(--duration-fast)] ease-[var(--ease-signature)] hover:-translate-y-1 hover:border-terracotta hover:bg-paper hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-body text-xs font-semibold tracking-wider text-terracotta-deep">
                      {num}
                    </span>
                    <ArrowDown className="size-4 text-ink-soft transition-transform duration-[var(--duration-fast)] group-hover:translate-y-0.5 group-hover:text-terracotta" />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold leading-snug text-ink group-hover:text-terracotta-deep transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-[var(--leading-relaxed)] text-ink-soft">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[var(--color-border)] flex items-center justify-between text-xs font-semibold tracking-wider uppercase text-terracotta-deep">
                  <span>Explore chapter</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* View All Services Action */}
        <div className="mt-12 flex justify-center">
          <Button href={serviceNavigation.cta.href} variant="primary">
            {serviceNavigation.cta.label.replace(/\s*→$/, "")}
          </Button>
        </div>
      </div>
    </section>
  );
}
