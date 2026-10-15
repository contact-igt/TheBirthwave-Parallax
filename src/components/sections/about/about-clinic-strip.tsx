import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { aboutClinicStrip } from "@/content/about-clinic-content";
import { Button } from "@/components/ui/button";
import styles from "./about-clinic-strip.module.css";

export function AboutClinicStrip() {
  return (
    <section id="clinic-location" aria-labelledby="clinic-strip-heading" className={styles.section}>
      <div className="container-birthwave">
        <div className={styles.card}>
          <div className={styles.details}>
          <header className={styles.header}>
            <p className="eyebrow">{aboutClinicStrip.eyebrow}</p>
            <h2 id="clinic-strip-heading">{aboutClinicStrip.heading}</h2>
          </header>
          <div className={styles.grid}>
            <div className={styles.location}>

              <h3>{aboutClinicStrip.clinicName}</h3>
              <address>{aboutClinicStrip.address}</address>

            </div>
            <div className={styles.contact}>
              <a className={styles.contactLink} href={`tel:${aboutClinicStrip.phone.replace(/[^+\d]/g, "")}`}>

                <span><span className={styles.label}>Phone</span>{aboutClinicStrip.phone}</span>

              </a>
              <a className={styles.contactLink} href={`mailto:${aboutClinicStrip.email}`}>

                <span><span className={styles.label}>Email</span>{aboutClinicStrip.email}</span>

              </a>
            </div>
            <div className={styles.actions}>
              <a className={styles.directions} href={aboutClinicStrip.directionsHref} target="_blank" rel="noopener noreferrer">
                {aboutClinicStrip.directionsLabel}<ArrowUpRight size={20} aria-hidden="true" />
              </a>
              <div className={styles.appointment}>
                <Button href={aboutClinicStrip.appointmentHref}>{aboutClinicStrip.appointmentLabel}</Button>
              </div>
            </div>
          </div>
          </div>
        <div className={styles.photo}>
          <Image src="/images/about/section1/frame_0071_7.00s.jpg" alt="The Birthwave clinic exterior and entrance" fill sizes="(min-width: 1024px) 38vw, 90vw" className={styles.image} />
        </div>
        </div>
      </div>
    </section>
  );
}
