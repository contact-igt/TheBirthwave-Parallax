"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, ArrowUpRight } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { navigation } from "@/content/navigation-content";
import { navCareGroups } from "@/content/nav-care-content";
import { brand } from "@/content/site-content";
import { Button, buttonClasses } from "@/components/ui/button";
import { cx } from "@/lib/cx";

function isCrossPageHash(href: string): boolean {
  return href.startsWith("/#");
}

function useHashScrollCorrection() {
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;

    const scrollToTarget = () => {
      document.getElementById(id)?.scrollIntoView({ behavior: "auto", block: "start" });
    };

    scrollToTarget();
    const retryTimers = [150, 500, 1200, 2200].map((delay) => window.setTimeout(scrollToTarget, delay));

    return () => retryTimers.forEach((timer) => window.clearTimeout(timer));
  }, []);
}

export function SiteHeader() {
  useHashScrollCorrection();
  const pathname = usePathname();

  // Mobile menu state
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // Mobile Our Care accordion state
  const [mobileCareExpanded, setMobileCareExpanded] = useState(false);

  // Desktop Our Care mega-dropdown state
  const [desktopCareOpen, setDesktopCareOpen] = useState(false);
  const desktopCareTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const desktopCareDropdownRef = useRef<HTMLDivElement>(null);
  const desktopCareButtonRef = useRef<HTMLButtonElement>(null);

  // Check if Our Care route is active (/services or /services/*)
  const isServicesActive = pathname === "/services" || pathname.startsWith("/services/");

  // Close desktop mega-dropdown with slight delay
  const handleDesktopCareEnter = () => {
    if (desktopCareTimeoutRef.current) {
      clearTimeout(desktopCareTimeoutRef.current);
      desktopCareTimeoutRef.current = null;
    }
    // Slight open delay (60ms) for smooth intent
    desktopCareTimeoutRef.current = setTimeout(() => {
      setDesktopCareOpen(true);
    }, 60);
  };

  const handleDesktopCareLeave = () => {
    if (desktopCareTimeoutRef.current) {
      clearTimeout(desktopCareTimeoutRef.current);
      desktopCareTimeoutRef.current = null;
    }
    // Slight close delay (180ms) so cursor can move between trigger and panel
    desktopCareTimeoutRef.current = setTimeout(() => {
      setDesktopCareOpen(false);
    }, 180);
  };

  // Keyboard navigation & outside click handlers for desktop mega dropdown
  useEffect(() => {
    if (!desktopCareOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDesktopCareOpen(false);
        desktopCareButtonRef.current?.focus();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        desktopCareDropdownRef.current &&
        !desktopCareDropdownRef.current.contains(event.target as Node)
      ) {
        setDesktopCareOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [desktopCareOpen]);

  // Mobile menu escape key handler
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    firstLinkRef.current?.focus();

    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (desktopCareTimeoutRef.current) {
        clearTimeout(desktopCareTimeoutRef.current);
      }
    };
  }, []);

  return (
    <header id="top" className="fixed inset-x-0 top-0 z-50">
      <div className="container-birthwave flex h-(--header-height) items-center justify-between gap-4">
        {/* Mobile Wordmark */}
        <Link
          href="/"
          aria-label={`${brand.name} — home`}
          className="rounded-full bg-paper/75 px-2.5 py-2 shadow-[0_1px_2px_rgba(36,26,23,0.08)] backdrop-blur-md md:hidden"
        >
          <Image
            src={brand.logo.wordmarkMauve}
            alt={brand.logo.alt}
            width={320}
            height={157}
            className="h-auto w-[76px]"
          />
        </Link>

        {/* Desktop Primary Nav Pill */}
        <nav
          aria-label="Primary"
          className={cx(
            "hidden items-center gap-1 rounded-full bg-paper/75 px-2 py-2 shadow-[0_1px_2px_rgba(36,26,23,0.08)] backdrop-blur-md md:flex",
            // Homepage, desktop, motion allowed: leave room left of the pill
            // for the Hero logo, which settles there on scroll (see
            // hero-philosophy-scroll-scene.tsx — LOGO_* constants). Clears
            // the logo chip by ~12px: max(95px, 155px − container edge).
            pathname === "/" &&
              "lg:motion-safe:ml-[max(95px,calc(155px_-_var(--space-gutter)_-_max(0px,(100vw_-_var(--container-max))/2)))]",
          )}
        >
          {navigation.links.map((link) => {
            if (link.label === "Our Care") {
              return (
                <div
                  key={link.href}
                  ref={desktopCareDropdownRef}
                  className="relative"
                  onMouseEnter={handleDesktopCareEnter}
                  onMouseLeave={handleDesktopCareLeave}
                >
                  <button
                    ref={desktopCareButtonRef}
                    type="button"
                    aria-expanded={desktopCareOpen}
                    aria-haspopup="true"
                    onClick={() => setDesktopCareOpen((v) => !v)}
                    className={cx(
                      "group inline-flex items-center gap-1 rounded-full px-4 py-2 font-body text-sm font-medium tracking-[0.02em] transition-colors duration-[var(--duration-fast)]",
                      desktopCareOpen || isServicesActive
                        ? "bg-paper text-ink font-semibold"
                        : "text-ink-soft hover:bg-paper hover:text-ink",
                    )}
                  >
                    <span>Our Care</span>
                    <ChevronDown
                      aria-hidden="true"
                      className={cx(
                        "size-3.5 transition-transform duration-[var(--duration-fast)] ease-[var(--ease-signature)]",
                        desktopCareOpen ? "rotate-180 text-terracotta-deep" : "text-ink-soft/70 group-hover:text-ink",
                      )}
                    />
                  </button>

                  {/* Mega Dropdown Panel */}
                  <div
                    className={cx(
                      "absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-[200ms] ease-[var(--ease-signature)]",
                      desktopCareOpen
                        ? "pointer-events-auto opacity-100 translate-y-0"
                        : "pointer-events-none opacity-0 -translate-y-2",
                    )}
                  >
                    <div className="w-[880px] max-w-[92vw] rounded-[1.25rem] border border-[var(--color-border)] bg-paper p-8 shadow-[0_12px_40px_rgba(36,26,23,0.08)] backdrop-blur-md">
                      {/* Top Row: 5 Service Groups */}
                      <div className="grid grid-cols-5 gap-6">
                        {navCareGroups.map((group) => (
                          <div key={group.id} className="flex flex-col">
                            <span className="font-body text-[11px] font-semibold tracking-[0.14em] text-terracotta-deep uppercase">
                              {group.title}
                            </span>
                            <ul className="mt-3.5 flex flex-col gap-2.5">
                              {group.services.map((service) => (
                                <li key={service.slug}>
                                  <Link
                                    href={`/services/${service.slug}`}
                                    onClick={() => setDesktopCareOpen(false)}
                                    className="group block font-body text-[13px] leading-snug font-medium text-ink transition-colors duration-[var(--duration-fast)] hover:text-terracotta-deep"
                                  >
                                    {service.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>

                      {/* Bottom Row: View All Care Bar */}
                      <div className="mt-7 flex items-center justify-between border-t border-[var(--color-border)] pt-4">
                        <p className="font-body text-xs text-ink-soft">
                          Comprehensive support connected across pregnancy, birth, and recovery.
                        </p>
                        <Link
                          href="/services"
                          onClick={() => setDesktopCareOpen(false)}
                          className="group inline-flex items-center gap-1.5 font-body text-xs font-semibold tracking-[0.04em] text-terracotta-deep uppercase transition-colors duration-[var(--duration-fast)] hover:text-ink"
                        >
                          <span>View All Care</span>
                          <ArrowUpRight
                            aria-hidden="true"
                            className="size-3.5 transition-transform duration-[var(--duration-fast)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            const linkClassName = cx(
              "rounded-full px-4 py-2 font-body text-sm font-medium tracking-[0.02em] transition-colors duration-[var(--duration-fast)] hover:bg-paper hover:text-ink",
              pathname === link.href ? "text-ink font-semibold" : "text-ink-soft",
            );

            return isCrossPageHash(link.href) ? (
              <a key={link.href} href={link.href} className={linkClassName}>
                {link.label}
              </a>
            ) : (
              <Link key={link.href} href={link.href} className={linkClassName}>
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Book a Consult CTA */}
        <div className="ml-auto hidden md:block">
          {isCrossPageHash(navigation.cta.href) ? (
            <a href={navigation.cta.href} className={cx(buttonClasses("primary"), "text-xs")}>
              {navigation.cta.label}
            </a>
          ) : (
            <Button href={navigation.cta.href} variant="primary" className="text-xs">
              {navigation.cta.label}
            </Button>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <button
          ref={toggleRef}
          type="button"
          data-mobile-menu-toggle=""
          className="ml-auto inline-flex size-11 items-center justify-center rounded-full bg-paper/75 text-ink shadow-[0_1px_2px_rgba(36,26,23,0.08)] backdrop-blur-md md:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <X aria-hidden="true" className="size-5" />
          ) : (
            <Menu aria-hidden="true" className="size-5" />
          )}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        id={menuId}
        hidden={!open}
        className="fixed inset-x-0 top-(--header-height) z-40 max-h-[calc(100dvh-var(--header-height))] overflow-y-auto border-t border-[var(--color-border)] bg-paper shadow-lg md:hidden"
      >
        <nav aria-label="Mobile" className="container-birthwave flex flex-col gap-1 py-4">
          {navigation.links.map((link, index) => {
            if (link.label === "Our Care") {
              return (
                <div key={link.href} className="flex flex-col border-b border-[var(--color-border)] py-1">
                  <button
                    type="button"
                    aria-expanded={mobileCareExpanded}
                    onClick={() => setMobileCareExpanded((v) => !v)}
                    className="flex min-h-[44px] w-full items-center justify-between rounded-xs px-2 py-3 font-body text-base font-medium text-ink transition-colors duration-[var(--duration-fast)] hover:bg-paper-dim"
                  >
                    <span className={isServicesActive ? "font-semibold text-terracotta-deep" : ""}>
                      Our Care
                    </span>
                    <ChevronDown
                      aria-hidden="true"
                      className={cx(
                        "size-4 transition-transform duration-[var(--duration-fast)]",
                        mobileCareExpanded ? "rotate-180 text-terracotta-deep" : "text-ink-soft/70",
                      )}
                    />
                  </button>

                  {mobileCareExpanded && (
                    <div className="flex flex-col gap-4 px-3 pt-2 pb-4">
                      {navCareGroups.map((group) => (
                        <div key={group.id} className="flex flex-col">
                          <span className="font-body text-[11px] font-semibold tracking-[0.12em] text-terracotta-deep uppercase">
                            {group.title}
                          </span>
                          <div className="mt-1.5 flex flex-col gap-1">
                            {group.services.map((service) => (
                              <Link
                                key={service.slug}
                                href={`/services/${service.slug}`}
                                onClick={() => setOpen(false)}
                                className="flex min-h-[44px] items-center rounded-xs py-2 pr-2 font-body text-sm font-medium text-ink transition-colors hover:text-terracotta-deep"
                              >
                                {service.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}

                      {/* View All Care mobile link */}
                      <Link
                        href="/services"
                        onClick={() => setOpen(false)}
                        className="flex min-h-[44px] items-center gap-1 border-t border-[var(--color-border)] pt-3 font-body text-sm font-semibold tracking-[0.04em] text-terracotta-deep uppercase"
                      >
                        <span>View All Care</span>
                        <ArrowUpRight aria-hidden="true" className="size-4" />
                      </Link>
                    </div>
                  )}
                </div>
              );
            }

            const linkClassName = cx(
              "flex min-h-[44px] items-center rounded-xs px-2 py-3.5 font-body text-base font-medium transition-colors duration-[var(--duration-fast)] hover:bg-paper-dim",
              pathname === link.href ? "text-ink font-semibold" : "text-ink",
            );

            return isCrossPageHash(link.href) ? (
              <a
                key={link.href}
                ref={index === 0 ? firstLinkRef : undefined}
                href={link.href}
                onClick={() => setOpen(false)}
                className={linkClassName}
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                ref={index === 0 ? firstLinkRef : undefined}
                href={link.href}
                onClick={() => setOpen(false)}
                className={linkClassName}
              >
                {link.label}
              </Link>
            );
          })}

          {/* Book a Consult CTA in mobile menu */}
          {isCrossPageHash(navigation.cta.href) ? (
            <a
              href={navigation.cta.href}
              onClick={() => setOpen(false)}
              className={cx(buttonClasses("primary"), "mt-2 w-full min-h-[44px]")}
            >
              {navigation.cta.label}
            </a>
          ) : (
            <Button
              href={navigation.cta.href}
              variant="primary"
              className="mt-2 w-full min-h-[44px]"
              onClick={() => setOpen(false)}
            >
              {navigation.cta.label}
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
