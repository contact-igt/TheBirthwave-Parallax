"use client";

import { useLayoutEffect, useRef, type HTMLAttributes, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ensureScrollTriggerRegistered } from "@/motion/gsap-scroll";

/**
 * React Bits "Animated Content" (AnimatedContent-TS-TW,
 * https://reactbits.dev/animations/animated-content), adapted locally.
 * Same mechanism as upstream — a GSAP tween started once by a ScrollTrigger
 * `onEnter` with `once: true` — with these project changes:
 *
 * - Visible without JavaScript: upstream renders `invisible` from the
 *   server; here the hidden start state is applied by GSAP only once it is
 *   ready, so a failed/blocked script leaves the content readable.
 * - prefers-reduced-motion: nothing is hidden or moved.
 * - Already on screen (or scrolled past) when mounted — e.g. navigating
 *   back to a restored scroll position — the element is left as is; the
 *   entrance never hides content the visitor can already see.
 * - `rowStagger`: delay = (position within its visual row) × rowStagger,
 *   read from the live layout when the trigger fires. A four-column row
 *   gets 0/1/2/3 steps, two columns 0/1, a stacked column 0.
 * - Keyboard focus inside a not-yet-finished element reveals it at once.
 * - Dropped the disappear/scale/custom-scroller options (unused here).
 */

interface AnimatedContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Start offset in px (positive = starts below and moves up). */
  distance?: number;
  /**
   * Optional smaller offset below 640px (the single-column layout). Unset:
   * `distance` everywhere. Read once when the entrance is set up.
   */
  mobileDistance?: number;
  direction?: "vertical" | "horizontal";
  reverse?: boolean;
  duration?: number;
  ease?: string;
  initialOpacity?: number;
  /** Fraction of the viewport from the bottom where the entrance fires. */
  threshold?: number;
  /** Fixed delay in seconds (added to any row stagger). */
  delay?: number;
  /** Seconds per position within the element's visual row (see above). */
  rowStagger?: number;
  /**
   * Element whose row position drives `rowStagger` — defaults to the
   * wrapper's parent (e.g. the grid item the wrapper sits in).
   */
  rowItem?: "self" | "parent";
}

/** 0-based index of `item` among its siblings that share its row. */
function rowPosition(item: Element): number {
  const parent = item.parentElement;
  if (!parent) return 0;
  const top = Math.round(item.getBoundingClientRect().top);
  const left = item.getBoundingClientRect().left;
  let position = 0;
  for (const sibling of parent.children) {
    if (sibling === item) continue;
    const r = sibling.getBoundingClientRect();
    if (Math.abs(Math.round(r.top) - top) <= 2 && r.left < left) position++;
  }
  return position;
}

export function AnimatedContent({
  children,
  distance = 100,
  mobileDistance,
  direction = "vertical",
  reverse = false,
  duration = 0.8,
  ease = "power3.out",
  initialOpacity = 0,
  threshold = 0.1,
  delay = 0,
  rowStagger = 0,
  rowItem = "parent",
  ...props
}: AnimatedContentProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Layout effect: the hidden start state lands before the browser paints
  // a client-side mount, so there is no visible → hidden flash.
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const startPct = (1 - threshold) * 100;
    // Already reached (in view or scrolled past): leave it fully visible.
    if (el.getBoundingClientRect().top <= window.innerHeight * (startPct / 100)) return;

    ensureScrollTriggerRegistered();
    const axis = direction === "horizontal" ? "x" : "y";
    const travel =
      mobileDistance !== undefined && window.matchMedia("(max-width: 639.98px)").matches
        ? mobileDistance
        : distance;
    const offset = reverse ? -travel : travel;
    gsap.set(el, { [axis]: offset, opacity: initialOpacity });

    const tween = gsap.to(el, {
      [axis]: 0,
      opacity: 1,
      duration,
      ease,
      paused: true,
      // Final state is the element's own styles — nothing left inline.
      clearProps: "transform,opacity",
    });

    const st = ScrollTrigger.create({
      trigger: el,
      start: `top ${startPct}%`,
      // "max", not the default "bottom top": a jump that lands anywhere past
      // the start (restored scroll on Back, fast flings, anchor links) still
      // counts as entered, so the content can never stay hidden.
      end: "max",
      once: true,
      onEnter: () => {
        const item = rowItem === "parent" ? el.parentElement : el;
        const stagger = rowStagger && item ? rowPosition(item) * rowStagger : 0;
        // restart(true) honours the delay (play() on a paused tween skips it).
        tween.delay(delay + stagger).restart(true);
      },
    });

    // Keyboard focus landing inside before the reveal has finished (still
    // hidden, delayed or mid-tween): show it fully at once and cancel the
    // trigger, so focus never sits on an invisible or moving link.
    const revealNow = () => {
      st.kill();
      tween.kill();
      gsap.set(el, { clearProps: "transform,opacity" });
      el.removeEventListener("focusin", revealNow);
    };
    el.addEventListener("focusin", revealNow);

    return () => {
      el.removeEventListener("focusin", revealNow);
      st.kill();
      tween.kill();
      gsap.set(el, { clearProps: "transform,opacity" });
    };
  }, [distance, mobileDistance, direction, reverse, duration, ease, initialOpacity, threshold, delay, rowStagger, rowItem]);

  return (
    <div ref={ref} {...props}>
      {children}
    </div>
  );
}
