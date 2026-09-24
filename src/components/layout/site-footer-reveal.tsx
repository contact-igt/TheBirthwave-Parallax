"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "@/motion/reduced-motion";
import { ensureScrollTriggerRegistered, gsap, SIGNATURE_EASE } from "@/motion/gsap-scroll";

/**
 * The footer's only motion: a short, one-time entrance as it scrolls into
 * view — no pin, no scrub. Targets are marked by the (server-rendered)
 * footer itself: `data-footer-reveal="rise"` for the logo and columns,
 * `data-footer-reveal="fade"` for the divider/legal row.
 *
 * Content is fully visible in the server HTML; it's only hidden here, on
 * the client, and only when the footer is still below the fold — a
 * footer already on screen at mount (short pages) is left alone rather
 * than flashed out and back in.
 */
export function SiteFooterReveal({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reducedMotion) return;
    if (root.getBoundingClientRect().top < window.innerHeight) return;

    ensureScrollTriggerRegistered();
    const ctx = gsap.context(() => {
      // Logo first (16px), then description + columns (20px), in DOM order.
      const rise = root.querySelectorAll<HTMLElement>(
        '[data-footer-reveal="logo"], [data-footer-reveal="rise"]',
      );
      const fade = root.querySelectorAll('[data-footer-reveal="fade"]');
      gsap.set(rise, {
        autoAlpha: 0,
        y: (_: number, el: HTMLElement) => (el.dataset.footerReveal === "logo" ? 16 : 20),
      });
      gsap.set(fade, { autoAlpha: 0 });

      gsap
        .timeline({ scrollTrigger: { trigger: root, start: "top 88%", once: true } })
        .to(rise, { autoAlpha: 1, y: 0, duration: 0.7, ease: SIGNATURE_EASE, stagger: 0.08 })
        .to(fade, { autoAlpha: 1, duration: 0.6, ease: "power1.out" }, "-=0.35");
    }, root);

    return () => ctx.revert();
  }, [reducedMotion]);

  return <div ref={rootRef}>{children}</div>;
}
