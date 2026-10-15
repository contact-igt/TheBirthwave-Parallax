import Image from "next/image";
import { vaginismusHero, vaginismusImagery } from "@/content/pages/vaginismus";
import { Button } from "@/components/ui/button";
import { CtaLink } from "@/components/ui/cta-link";
import styles from "./vaginismus-hero.module.css";

/** Copy and actions stay on paper; the consultation image has its own frame. */
export function VaginismusHero() {
  const image = vaginismusImagery.hero;
  return (
    <section id="vaginismus-hero" aria-labelledby="vaginismus-hero-heading" className={styles.hero}>
      <div className={`container-birthwave ${styles.grid}`}>
        <div className={styles.copy}>
          <p className="eyebrow">{vaginismusHero.eyebrow}</p>
          <h1 id="vaginismus-hero-heading" className={styles.heading}>{vaginismusHero.heading}</h1>
          <p className={styles.supporting}>{vaginismusHero.supportingHeadline}</p>
          <p className={styles.body}>{vaginismusHero.body}</p>
          <div className={styles.actions}>
            <Button href={vaginismusHero.primaryCta.href}>{vaginismusHero.primaryCta.label}</Button>
            <CtaLink href={vaginismusHero.secondaryCta.href}>{vaginismusHero.secondaryCta.label}</CtaLink>
          </div>
        </div>
        <figure className={styles.figure}>
          <div className={styles.frame}>
            <Image src={image.src} alt={image.alt} fill priority fetchPriority="high"
              sizes="(max-width: 1023px) 92vw, 580px" className={styles.image} />
          </div>
        </figure>
      </div>
    </section>
  );
}
