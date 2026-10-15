import Image from "next/image";
import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";
import styles from "./service-conversion.module.css";

interface ServiceFaqProps {
  id: string;
  eyebrow: string;
  heading: string;
  description?: string;
  items: readonly { question: string; answer: string; ctaLink?: { label: string; href: string } }[];
  media?: { src: string; alt: string; objectPosition?: string };
  mediaCaption?: string;
  children?: ReactNode;
}

/** Pregnancy's editorial split and card accordion, shared by service pages. */
export function ServiceFaqSection({ id, eyebrow, heading, description, items, media, mediaCaption, children }: ServiceFaqProps) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} data-service-faq className={styles.faq}>
      <div className={`container-birthwave ${styles.faqGrid}`}>
        <div className={styles.faqIntro}>
          <p className={styles.eyebrow}><span aria-hidden="true" />{eyebrow}</p>
          <h2 id={`${id}-heading`} className={styles.faqHeading}>{heading}</h2>
          {description ? <p className={styles.description}>{description}</p> : null}
          {media ? (
            <figure className={styles.faqMedia}>
              <div className={styles.faqPhoto}>
                <Image src={media.src} alt={media.alt} fill sizes="(max-width: 1023px) 90vw, 480px" className={styles.image} style={{ objectPosition: media.objectPosition }} />
              </div>
              {mediaCaption ? <figcaption>{mediaCaption}</figcaption> : null}
            </figure>
          ) : null}
          {children}
        </div>
        <div className={styles.accordion}>
          {items.map((item, index) => (
            <details key={item.question} open={index === 0} className={styles.faqItem}>
              <summary id={`${id}-q-${index}`}><span>{item.question}</span><span className={styles.chevron} aria-hidden="true"><ChevronDown size={16} /></span></summary>
              <div id={`${id}-a-${index}`} className={styles.answer}>
                {item.answer}
                {item.ctaLink ? <a href={item.ctaLink.href}>{item.ctaLink.label}</a> : null}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
