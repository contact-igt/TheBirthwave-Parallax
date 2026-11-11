'use client';

import { useEffect, useRef, useState } from 'react';
import type { ArticleSection } from '@/lib/blog/toc';
import styles from './blog.module.css';

export function BlogTableOfContents({ sections }: { sections: ArticleSection[] }) {
  const [active, setActive] = useState(sections[0]?.id);
  const mobileMenu = useRef<HTMLDetailsElement>(null);

  useEffect(() => { mobileMenu.current?.setAttribute('data-ready', 'true'); }, []);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const headerOffset = 160;
      let current = sections[0]?.id;
      for (const section of sections) {
        const heading = document.getElementById(section.id);
        if (heading && heading.getBoundingClientRect().top <= headerOffset) current = section.id;
      }
      setActive(current);
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [sections]);

  const links = (mobile: boolean) => sections.map((section) => (
    <a key={section.id} href={`#${encodeURIComponent(section.id)}`}
      aria-current={active === section.id ? 'location' : undefined}
      onClick={mobile ? () => { if (mobileMenu.current) mobileMenu.current.open = false; } : undefined}>
      {section.title}
    </a>
  ));

  return <aside className={styles.toc} aria-label="Article contents">
    <nav className={styles.tocDesktop} aria-label="In this article">
      <p className={styles.tocTitle}>In this article</p>
      <div className={styles.tocLinks}>{links(false)}</div>
    </nav>
    <details ref={mobileMenu} className={styles.tocMobile}>
      <summary>In this article <span>Jump to section</span></summary>
      <nav aria-label="In this article">{links(true)}</nav>
    </details>
  </aside>;
}
