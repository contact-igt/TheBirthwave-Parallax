import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ComponentType, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import styles from "./service-related-care.module.css";

interface RelatedCareProps {
  id: string;
  eyebrow: string;
  heading: string;
  description?: string;
  services: readonly { title: string; description: string; href: string }[];
  cta?: { label: string; href: string };
  Reveal?: ComponentType<{ className?: string; children: ReactNode }>;
}

/** Pregnancy's related-care cards, with each service page's original content. */
export function ServiceRelatedCare({ id, eyebrow, heading, description, services, cta, Reveal }: RelatedCareProps) {
  const Container = Reveal ?? "div";
  return (
    <section id={id} aria-labelledby={`${id}-heading`} data-service-related-care className={styles.section}>
      <Container className="container-birthwave">
        <header className={styles.header}>
          <p className={styles.eyebrow}><span aria-hidden="true" />{eyebrow}</p>
          <h2 id={`${id}-heading`}>{heading}</h2>
          {description ? <p className={styles.description}>{description}</p> : null}
        </header>
        <ul className={styles.grid}>
          {services.map((service, index) => (
            <li key={`${service.href}-${index}`}>
              <Link href={service.href} className={styles.card}>
                <div className={styles.titleRow}>
                  <h3>{service.title}</h3>
                  <span className={styles.arrow} aria-hidden="true"><ArrowUpRight size={16} /></span>
                </div>
                <p>{service.description}</p>
              </Link>
            </li>
          ))}
        </ul>
        {cta ? <div className={styles.cta}><Button href={cta.href} variant="ghost">{cta.label}</Button></div> : null}
      </Container>
    </section>
  );
}
