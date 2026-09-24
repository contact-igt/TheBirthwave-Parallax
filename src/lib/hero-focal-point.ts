/**
 * Shared per-image focal-point data shape and className builder for the
 * full-bleed photographic service heroes (Pregnancy & Antenatal Care,
 * Birth Preparation, Normal Birth & Delivery Care, Vaginismus & Intimate
 * Wellness, Gynaecology & Women's Wellness). VBAC and Fertility &
 * Preconception render a gradient placeholder instead of a real photo (no
 * image-generation tool was available while those two were built) and so
 * have no focal point to set — untouched by this module.
 *
 * Centralises the "object-position per breakpoint" values each of those
 * five heroes needs as plain data (matching this project's existing
 * "content/imagery file is the source of truth" convention) instead of a
 * hand-typed arbitrary Tailwind value string duplicated inline in every
 * hero component — swapping in real, differently-composed photography
 * later only means updating one value per image, not re-deriving a crop
 * inside JSX.
 *
 * Deliberately just `mobile`/`desktop` by default. Every one of these five
 * hero photographs is a fixed-aspect image inside a container whose own
 * aspect ratio only changes shape ONCE across the responsive range this
 * project supports — mobile's tall, offset-behind-text composition versus
 * the wide, side-by-side desktop composition — not continuously at every
 * width, so a third value rarely earns its own tier. `tablet` exists for
 * the rare image whose desktop crop visibly breaks specifically in the
 * 640–1023px band (verified by screenshot, not assumed) and is left unset
 * everywhere else.
 */
export interface HeroFocalPoint {
  /** `object-position`, e.g. "70% 25%" or "65% center" — applied below the `sm` breakpoint. */
  mobile: string;
  /** Applied from `sm` upward, unless `tablet` is set (then from `lg` upward). */
  desktop: string;
  /** Optional — applied only across `sm`–`md` (640–1023px) when a crop needs its own tablet tier; `desktop` still governs `lg` and above. */
  tablet?: string;
}

function toArbitraryValue(position: string): string {
  return position.trim().replace(/\s+/g, "_");
}

/** Builds the `object-[...]` Tailwind class stack for a `HeroFocalPoint`. */
export function heroFocalPointClassName(focal: HeroFocalPoint): string {
  const classes = [`object-[${toArbitraryValue(focal.mobile)}]`];
  if (focal.tablet) {
    classes.push(`sm:object-[${toArbitraryValue(focal.tablet)}]`, `lg:object-[${toArbitraryValue(focal.desktop)}]`);
  } else {
    classes.push(`sm:object-[${toArbitraryValue(focal.desktop)}]`);
  }
  return classes.join(" ");
}
