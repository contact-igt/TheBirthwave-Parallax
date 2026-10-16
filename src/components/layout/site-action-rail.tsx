import Link from "next/link";
import type { ReactNode } from "react";
import { CalendarDays, Phone } from "lucide-react";
import { InstagramIcon, YouTubeIcon } from "@/components/layout/site-footer";
import { contactDirectDetails } from "@/content/contact-content";
import { footer } from "@/content/site-content";
import styles from "./site-action-rail.module.css";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={styles.icon}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.888 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662a11.835 11.835 0 005.712 1.463h.005c6.554 0 11.89-5.335 11.893-11.894a11.82 11.82 0 00-3.483-8.414z" />
    </svg>
  );
}

type RailAction = {
  id: string;
  href: string;
  label: string;
  title: string;
  icon: ReactNode;
  external?: boolean;
  internal?: boolean;
  primary?: boolean;
};

export function SiteActionRail() {
  const whatsappHref = contactDirectDetails.items.find((item) => item.id === "whatsapp-chat")?.actionHref;
  const phoneHref = contactDirectDetails.items.find((item) => item.id === "call")?.actionHref;
  const instagramHref = footer.socialLinks.find((item) => item.id === "instagram")?.href;

  const actions: RailAction[] = [
    ...(whatsappHref ? [{ id: "whatsapp", href: whatsappHref, label: "Chat with The Birthwave on WhatsApp", title: "WhatsApp", icon: <WhatsAppIcon />, external: true }] : []),
    ...(phoneHref ? [{ id: "call", href: phoneHref, label: "Call The Birthwave", title: "Call us", icon: <Phone aria-hidden="true" className={styles.icon} strokeWidth={1.8} />, primary: true }] : []),
    ...(instagramHref ? [{ id: "instagram", href: instagramHref, label: "The Birthwave on Instagram", title: "Instagram", icon: <InstagramIcon className={styles.icon} />, external: true }] : []),
    { id: "appointment", href: "/contact", label: "Book an appointment with The Birthwave", title: "Book an appointment", icon: <CalendarDays aria-hidden="true" className={styles.icon} strokeWidth={1.8} />, internal: true },
    { id: "youtube", href: "https://www.youtube.com/@thebirthwaveclinic", label: "The Birthwave on YouTube", title: "YouTube", icon: <YouTubeIcon className={styles.icon} />, external: true },
  ];
  const actionsById = new Map(actions.map((action) => [action.id, action]));

  function renderList(order: string[], className: string) {
    return (
      <ul className={`${styles.list} ${className}`}>
        {order.map((id) => {
          const action = actionsById.get(id);
          if (!action) return null;

          const className = `${styles.action}${action.primary ? ` ${styles.primary}` : ""}`;
          return (
            <li key={id}>
              {action.internal ? (
                <Link className={className} href={action.href} aria-label={action.label} title={action.title}>{action.icon}</Link>
              ) : (
                <a className={className} href={action.href} aria-label={action.label} title={action.title} target={action.external ? "_blank" : undefined} rel={action.external ? "noopener noreferrer" : undefined}>{action.icon}</a>
              )}
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <nav className={styles.rail} aria-label="Quick contact and social links">
      {renderList(["whatsapp", "call", "instagram", "appointment", "youtube"], styles.desktopList)}
      {renderList(["whatsapp", "instagram", "call", "appointment", "youtube"], styles.mobileList)}
    </nav>
  );
}
