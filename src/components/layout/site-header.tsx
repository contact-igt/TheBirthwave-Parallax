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
  const desktopCarePanelId = useId();
  // When hover opened the panel — a click right after that must not
  // immediately toggle it shut again.
  const desktopCareHoverOpenedAt = useRef(0);

  // Close the panel on any route change (back/forward included).
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setDesktopCareOpen(false);
  }

  // Check if Our Care route is active (/services or /services/*)
  const isServicesActive = pathname === "/services" || pathname.startsWith("/services/");

  // Hover intent — mouse only, so touch laptops rely on the click toggle.
  const handleDesktopCareEnter = (event: React.PointerEvent) => {
    if (event.pointerType !== "mouse") return;
    if (desktopCareTimeoutRef.current) {
      clearTimeout(desktopCareTimeoutRef.current);
      desktopCareTimeoutRef.current = null;
    }
    // Slight open delay (60ms) for smooth intent
    desktopCareTimeoutRef.current = setTimeout(() => {
      setDesktopCareOpen((wasOpen) => {
        if (!wasOpen) desktopCareHoverOpenedAt.current = Date.now();
        return true;
      });
    }, 60);
  };

  const handleDesktopCareClick = () => {
    if (desktopCareTimeoutRef.current) {
      clearTimeout(desktopCareTimeoutRef.current);
      desktopCareTimeoutRef.current = null;
    }
    const justHoverOpened = Date.now() - desktopCareHoverOpenedAt.current < 600;
    desktopCareHoverOpenedAt.current = 0;
    setDesktopCareOpen((v) => (v && justHoverOpened ? true : !v));
  };

  const handleDesktopCareLeave = (event: React.PointerEvent) => {
    if (event.pointerType !== "mouse") return;
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

    const handleClickOutside = (event: PointerEvent) => {
      if (
        desktopCareDropdownRef.current &&
        !desktopCareDropdownRef.current.contains(event.target as Node)
      ) {
        setDesktopCareOpen(false);
      }
    };

    // The desktop nav hides below its breakpoint (display:none) — close
    // rather than leave an invisible "open" state to reappear later.
    const handleResize = () => {
      if (desktopCareButtonRef.current?.offsetParent === null) setDesktopCareOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handleClickOutside);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handleClickOutside);
      window.removeEventListener("resize", handleResize);
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

  // One white header bar on every page: logo link, then the nav + CTA from
  // 1024px, or the menu button below it. On the homepage (motion allowed)
  // the Hero logo travels into this bar's logo slot on scroll and hands off
  // to the real link here once it settles (hero-philosophy-scroll-scene.tsx),
  // so the link starts hidden there; reduced motion and no-JS show it.
  const isHome = pathname === "/";

  return (
    <header
      id="top"
      // Read by the homepage logo traveller, which hides while either
      // overlay is open so it never sits on top of them.
      data-overlay-open={open || desktopCareOpen ? "" : undefined}
      className="fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)]"
    >
      {isHome && (
        // No JavaScript: nothing will hand the logo over, so show the header
        // logo from the start and drop the Hero's copy (one logo at a time).
        // The Hero → Philosophy scene can't scrub either, so it becomes a
        // static flow (Hero, then Philosophy, each at least a screen tall)
        // with Philosophy's pre-hydration `opacity: 0` lifted; scroll-reveal
        // blocks tagged `data-reveal` are shown at rest.
        <noscript>
          <style>
            {"#top [data-header-wordmark]{visibility:visible!important}[data-hero-logo]{display:none!important}" +
              '[data-home-scene="hero-philosophy"]{height:auto!important}' +
              '[data-home-scene="hero-philosophy"]>div{position:relative!important;height:auto!important}' +
              "#hero-section,#philosophy{position:relative!important;min-height:100vh}" +
              "#philosophy [style*='opacity']{opacity:1!important}" +
              "[data-reveal]{opacity:1!important;transform:none!important}" +
              // FAQ toggles need JS — show every answer open instead.
              "#faq [role=region]{grid-template-rows:1fr!important;opacity:1!important}"}
          </style>
        </noscript>
      )}
      <div className="container-birthwave flex h-(--header-height) items-center">
        <div
          data-header-bar=""
          className="relative isolate flex w-full items-center gap-3 py-1 pr-1 pl-2 lg:gap-6 lg:pr-1.5 lg:pl-3"
        >
          {/* The bar's white surface — a plain positioned layer (no blur,
              transform or overflow), so the Our Care panel's fixed
              positioning stays relative to the viewport. Its left edge can
              be drawn in: the homepage scene sets --header-surface-inset
              (px, measured) and --header-surface-reveal (0→1) so the surface
              grows to meet the arriving logo. Unset: the full bar. */}
          <span
            aria-hidden="true"
            data-header-surface=""
            className="pointer-events-none absolute inset-y-0 right-0 -z-10 rounded-xl border border-[color-mix(in_srgb,var(--color-ink)_7%,transparent)] bg-white shadow-[0_8px_24px_-16px_rgba(36,26,23,0.35)]"
            style={{ left: "calc(var(--header-surface-inset, 0px) * (1 - var(--header-surface-reveal, 1)))" }}
          />

          {/* Logo — the Home link, on every page and breakpoint. */}
          <Link
            href="/"
            aria-label={`${brand.name} — home`}
            data-header-wordmark=""
            className="inline-flex shrink-0 items-center rounded-lg px-1.5 py-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ink)]"
          >
            <Image
              src={brand.logo.wordmarkMauve}
              alt={brand.logo.alt}
              width={320}
              height={157}
              priority
              // min(): only bites below ~220 CSS px (e.g. a phone at 200% zoom),
              // so the bar never overflows or squeezes the menu button.
              className="h-auto w-[min(88px,38vw)] sm:w-[96px] lg:w-[104px]"
            />
          </Link>

          {/* Desktop Primary Nav */}
          <nav
            aria-label="Primary"
            className={cx(
              // Desktop nav from 1024px on every page: below that the pill and
              // CTA crowd together (36px apart at 768), so the mobile menu
              // takes over — the same handoff the homepage already used.
              // It sits on the bar's shared white surface — no fill, blur or
              // transform of its own (any of those would also become the
              // containing block for the Our Care panel's `position: fixed`).
              "hidden items-center gap-1 lg:flex",
            )}
          >
            {navigation.links.map((link) => {
              if (link.label === "Our Care") {
                return (
                  <div
                    key={link.href}
                    ref={desktopCareDropdownRef}
                    onPointerEnter={handleDesktopCareEnter}
                    onPointerLeave={handleDesktopCareLeave}
                    onBlur={(event) => {
                      // Tabbing out past the last link (or back before the
                      // trigger) closes the disclosure.
                      const next = event.relatedTarget as Node | null;
                      if (next && !event.currentTarget.contains(next)) setDesktopCareOpen(false);
                    }}
                  >
                    <button
                      ref={desktopCareButtonRef}
                      type="button"
                      aria-expanded={desktopCareOpen}
                      aria-controls={desktopCarePanelId}
                      onClick={handleDesktopCareClick}
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

                    {/* Mega Dropdown Panel — fixed to the viewport (not the
                        narrow trigger): 24px clear of both edges, capped at
                        70rem, starting under the header, and never taller
                        than the space below it (scrolls inside instead).
                        `inert` + `invisible` while closed keep its links out
                        of the Tab order and the accessibility tree. */}
                    <div
                      id={desktopCarePanelId}
                      inert={!desktopCareOpen}
                      className={cx(
                        "fixed inset-x-6 top-(--header-height) mx-auto max-w-[70rem]",
                        // Invisible hover bridge over the gap up to the pill.
                        "before:absolute before:inset-x-0 before:-top-4 before:h-4",
                        "transition-[opacity,translate,visibility] duration-200 ease-[var(--ease-signature)] motion-reduce:transition-none",
                        desktopCareOpen
                          ? "visible translate-y-0 opacity-100"
                          : "pointer-events-none invisible -translate-y-2 opacity-0 motion-reduce:translate-y-0",
                      )}
                    >
                      <div className="@container max-h-[calc(100dvh-var(--header-height)-1.5rem)] overflow-y-auto overscroll-contain rounded-[1.25rem] border border-[var(--color-border)] bg-paper px-6 py-7 shadow-[0_16px_48px_-12px_rgba(36,26,23,0.14)] sm:px-8 sm:py-8">
                        {/* Service groups: two columns, three from 40rem of
                            content width, five only from 63rem — where every
                            column keeps ≥ ~176px for 15px service names. Each
                            group stays one unit (label + its links). */}
                        <div className="grid grid-cols-2 gap-x-8 gap-y-7 @min-[40rem]:grid-cols-3 @min-[63rem]:grid-cols-5">
                          {navCareGroups.map((group) => (
                            <div key={group.id} className="flex min-w-0 flex-col">
                              <span className="font-body text-xs leading-snug font-semibold tracking-[0.12em] text-terracotta-deep uppercase">
                                {group.title}
                              </span>
                              <ul className="mt-2.5 flex flex-col">
                                {group.services.map((service) => (
                                  <li key={service.slug}>
                                    <Link
                                      href={`/services/${service.slug}`}
                                      onClick={() => setDesktopCareOpen(false)}
                                      className="-mx-2 flex min-h-10 items-center rounded-lg px-2 py-1.5 font-body text-[0.9375rem] leading-[1.4] font-medium text-pretty text-ink transition-colors duration-[var(--duration-fast)] hover:bg-paper-dim hover:text-terracotta-deep"
                                    >
                                      {service.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>

                        {/* Bottom Row: View All Care Bar — stacks when narrow */}
                        <div className="mt-6 flex flex-col items-start gap-2 border-t border-[var(--color-border)] pt-4 @min-[40rem]:flex-row @min-[40rem]:items-center @min-[40rem]:justify-between @min-[40rem]:gap-6">
                          <p className="font-body text-sm leading-snug text-ink-soft">
                            Comprehensive support connected across pregnancy, birth, and recovery.
                          </p>
                          <Link
                            href="/services"
                            onClick={() => setDesktopCareOpen(false)}
                            className="group -mx-2 inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-lg px-2 font-body text-xs font-semibold tracking-[0.06em] text-terracotta-deep uppercase transition-colors duration-[var(--duration-fast)] hover:text-ink"
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
          <div className="ml-auto hidden lg:block">
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
            className={cx(
              // 44px target on the bar's white surface (which keeps it legible
              // over the dark Immersive section).
              "ml-auto inline-flex size-11 shrink-0 items-center justify-center rounded-lg text-ink transition-colors duration-[var(--duration-fast)] hover:bg-paper-dim lg:hidden",
            )}
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
      </div>

      {/* Mobile Drawer */}
      <div
        id={menuId}
        hidden={!open}
        className={cx(
          "fixed inset-x-0 z-40 max-h-[calc(100dvh-var(--header-height))] overflow-y-auto border-t border-[var(--color-border)] bg-paper shadow-lg",
          // The header pads the top safe area on every page.
          "top-[calc(var(--header-height)+env(safe-area-inset-top))] lg:hidden",
        )}
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
