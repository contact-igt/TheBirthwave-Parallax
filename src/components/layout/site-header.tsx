"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { navigation } from "@/content/navigation-content";
import { brand } from "@/content/site-content";
import { Button, buttonClasses } from "@/components/ui/button";
import { cx } from "@/lib/cx";

/**
 * Header nav rework: "Contact" and "Book a Consult" now resolve to
 * `/#connect` so they work from every route this global header renders on
 * (previously a bare `#connect`, which only ever worked from the homepage
 * itself, back when every nav link pointed at a homepage section). That
 * exposed two real, confirmed bugs, both fixed here without touching any
 * locked homepage section:
 *
 * 1. `next/link`'s client-side navigation across routes never scrolls to
 *    a hash target at all — confirmed via a settle-polling check
 *    (scrollY stayed at exactly 0 indefinitely after the route changed).
 *    A plain `<a>` forces a real navigation instead of the SPA
 *    transition, for cross-page hash hrefs only — same-page hashes and
 *    plain routes still use `next/link` via `Button`/`Link` as before.
 *
 * 2. Even a real hard navigation to `/#connect` still lands well short of
 *    the target — also confirmed (settled scrollY well above the
 *    element's real position, even after the `load` event and several
 *    seconds of polling). The browser positions a fragment once, early,
 *    against whatever layout exists at that moment; this homepage is
 *    long and image-heavy, and images finishing decode after that point
 *    push `#connect` further down without ever re-triggering the
 *    fragment scroll. `useHashScrollCorrection` below re-applies
 *    `scrollIntoView` a few times as the page settles, fixing the
 *    landing position without changing anything about the homepage's own
 *    images, sections or layout.
 *
 * Both fixes are local to this file: `Button`'s own behavior is
 * untouched, so About/Doctors pages' own `Button` usages (out of scope
 * for this task) are unaffected. */
function isCrossPageHash(href: string): boolean {
  return href.startsWith("/#");
}

/** Re-applies `scrollIntoView` for the current URL's hash target a few
 * times as the page settles — see this file's own top comment, point 2.
 * Runs once per full page load (this header remounts on every hard
 * navigation), does nothing when there's no hash, and never fights a
 * visitor's own subsequent scrolling (each retry targets the same fixed
 * element, not a re-computed "current" position). */
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

/**
 * Desktop: no wordmark by design, unchanged by the mobile rework below —
 * the hero carries the logo there (see components/sections/home/
 * hero-section.tsx). The header floats, transparent, over the full-bleed
 * hero video, so nav links live in a translucent glass pill that stays
 * legible over any footage — see docs/implementation-brief.md for why.
 *
 * Mobile (docs/implementation-brief.md §38): once the desktop nav pill
 * and its CTA are hidden below `md`, the fixed header has nothing in it
 * except the menu toggle — no brand presence at all once a visitor has
 * scrolled past Hero's own logo. `md:hidden`, so it never appears
 * alongside (or instead of) the desktop nav; sized within the requested
 * 75–90px, `h-auto` to keep the wordmark's real 320:157 aspect ratio.
 *
 * Global layout chrome — used on every route, not homepage-specific,
 * hence living in components/layout.
 */
export function SiteHeader() {
  useHashScrollCorrection();
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

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

  return (
    <header id="top" className="fixed inset-x-0 top-0 z-50">
      <div className="container-birthwave flex h-(--header-height) items-center justify-between gap-4">
        {/* `bg-paper/75 backdrop-blur-md` (docs/implementation-brief.md
            §38): without it, this floats over whatever scrolled content
            sits behind the fixed header with nothing to separate the
            two — confirmed by screenshot as a real double-exposed
            ghosting artefact against Journey's own stage numbers/photos.
            Matches the same translucent-pill treatment the desktop nav
            and the mobile menu toggle already use, so the logo reads as
            one more piece of the same floating chrome. */}
        <Link
          href="/"
          aria-label={brand.name}
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

        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 rounded-full bg-paper/75 px-2 py-2 shadow-[0_1px_2px_rgba(36,26,23,0.08)] backdrop-blur-md md:flex"
        >
          {navigation.links.map((link) => {
            const linkClassName =
              "rounded-full px-4 py-2 font-body text-sm font-medium tracking-[0.02em] text-ink-soft transition-colors duration-[var(--duration-fast)] hover:bg-paper hover:text-ink";
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

      <div
        id={menuId}
        hidden={!open}
        className="fixed inset-x-0 top-(--header-height) z-40 border-t border-[var(--color-border)] bg-paper shadow-lg md:hidden"
      >
        <nav aria-label="Mobile" className="container-birthwave flex flex-col gap-1 py-4">
          {navigation.links.map((link, index) => {
            const linkClassName =
              "rounded-xs px-2 py-3.5 font-body text-base font-medium text-ink transition-colors duration-[var(--duration-fast)] hover:bg-paper-dim";
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
          {isCrossPageHash(navigation.cta.href) ? (
            <a
              href={navigation.cta.href}
              onClick={() => setOpen(false)}
              className={cx(buttonClasses("primary"), "mt-2 w-full")}
            >
              {navigation.cta.label}
            </a>
          ) : (
            <Button
              href={navigation.cta.href}
              variant="primary"
              className="mt-2 w-full"
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
