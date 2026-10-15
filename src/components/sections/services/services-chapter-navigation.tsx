"use client";

import { useLayoutEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { serviceNavigation } from "@/content/our-services-content";
import styles from "./services-overview.module.css";

const labels = ["Women's health", "Fertility", "Pregnancy", "Birth preparation", "Birth & delivery", "Postpartum", "Newborn & paediatric"];

function ChapterLinks() {
  return (
    <nav aria-label="Care chapters" className={styles.navLinks}>
      {serviceNavigation.items.map((item, index) => (
        <a key={item.href} href={item.href} aria-label={item.title}>{labels[index]}</a>
      ))}
    </nav>
  );
}

/** Native anchors and details keep the directory usable without JavaScript. */
export function ServicesChapterNavigation() {
  const navRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const nav = navRef.current;
    const root = nav?.closest<HTMLElement>("[data-services-overview]");
    const header = document.querySelector("body > header");
    if (!nav || !root || !header) return;
    let frame = 0;
    const measure = () => {
      root.style.setProperty("--services-header-clearance", `${header.getBoundingClientRect().bottom}px`);
      root.style.setProperty("--services-nav-clearance", `${window.innerWidth >= 1024 ? nav.offsetHeight : 0}px`);
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(nav);
    observer.observe(header);
    window.addEventListener("resize", schedule);
    measure();
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <div ref={navRef} id="care-chapters" className={styles.chapterNav}>
      <div className="container-birthwave">
        <div className={styles.desktopNav}><ChapterLinks /></div>
        <details className={styles.mobileNav}>
          <summary>Jump to a care chapter <ChevronDown aria-hidden="true" className="size-4 shrink-0" /></summary>
          <ChapterLinks />
        </details>
      </div>
    </div>
  );
}
