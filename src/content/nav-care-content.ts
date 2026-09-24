/**
 * Navigation care mega-dropdown groups — mapped strictly from `services` in services-content.ts.
 * Source of truth for grouped service links in both desktop mega-dropdown and mobile accordion.
 */
import { services, type ServiceContent } from "./services-content";

export interface NavCareGroup {
  id: string;
  title: string;
  services: ServiceContent[];
}

export const navCareGroups: NavCareGroup[] = [
  {
    id: "womens-health",
    title: "WOMEN'S HEALTH",
    services: [
      services.find((s) => s.slug === "fertility-preconception")!,
      services.find((s) => s.slug === "gynaecology")!,
      services.find((s) => s.slug === "vaginismus")!,
    ],
  },
  {
    id: "pregnancy",
    title: "PREGNANCY",
    services: [
      services.find((s) => s.slug === "pregnancy-antenatal-care")!,
      services.find((s) => s.slug === "nutrition-emotional-wellbeing")!,
    ],
  },
  {
    id: "birth-preparation",
    title: "BIRTH PREPARATION",
    services: [
      services.find((s) => s.slug === "birth-preparation")!,
      services.find((s) => s.slug === "natural-birth")!,
    ],
  },
  {
    id: "birth",
    title: "BIRTH",
    services: [
      services.find((s) => s.slug === "normal-birth-delivery")!,
      services.find((s) => s.slug === "vbac")!,
    ],
  },
  {
    id: "after-birth",
    title: "AFTER BIRTH",
    services: [
      services.find((s) => s.slug === "postpartum-care")!,
      services.find((s) => s.slug === "lactation")!,
      services.find((s) => s.slug === "newborn-pediatric-care")!,
    ],
  },
];
