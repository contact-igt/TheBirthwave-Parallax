import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cx } from "@/lib/cx";

type CtaLinkTone = "default" | "inverted";

type CtaLinkProps = {
  href: string;
  children: ReactNode;
  /** "inverted" for use on dark (ink) surfaces — e.g. the closing section. */
  tone?: CtaLinkTone;
} & Omit<ComponentPropsWithoutRef<typeof Link>, "href" | "children">;

// `!`-prefixed, not plain utilities: globals.css's `a { color: inherit; }`
// was winning the cascade against CtaLink's own text-colour utility on
// both tones — confirmed via a real computed-style check, not assumed
// from reading the CSS. Hero's existing "Book a Consult" link (`default`
// tone, untouched by this rework) was rendering plain ink instead of
// terracotta-deep; Final CTA's new secondary link (`inverted` tone) was
// rendering ink instead of paper — invisible against its own dark
// background. A pre-existing bug, not introduced by this rework, fixed
// here since it lives in the one shared component both tones go through.
// Tailwind's `!` modifier forces `!important` so the intended colour
// actually wins regardless of the anchor-selector specificity fight.
const toneClasses: Record<CtaLinkTone, string> = {
  default: "!text-terracotta-deep hover:!text-ink",
  inverted: "!text-paper hover:!text-coral",
};

/**
 * A restrained secondary CTA — text + arrow, no button chrome. Used where a
 * solid button would duplicate a primary action already on screen (e.g. the
 * header's persistent booking button), matching the "one primary CTA" rule.
 */
export function CtaLink({
  href,
  children,
  tone = "default",
  className,
  ...props
}: CtaLinkProps) {
  return (
    <Link
      href={href}
      className={cx(
        "group inline-flex items-center gap-1.5 rounded-xs py-1 font-body text-base font-semibold transition-colors duration-[var(--duration-fast)] ease-[var(--ease-signature)]",
        toneClasses[tone],
        className,
      )}
      {...props}
    >
      <span className="border-b border-current/40 pb-0.5 group-hover:border-current">
        {children}
      </span>
      <ArrowUpRight
        aria-hidden="true"
        className="size-4 transition-transform duration-[var(--duration-fast)] ease-[var(--ease-signature)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </Link>
  );
}
