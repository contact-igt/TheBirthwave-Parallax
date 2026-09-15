import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cx } from "@/lib/cx";

type ButtonVariant = "primary" | "ghost";

interface ButtonOwnProps {
  variant?: ButtonVariant;
  href: string;
  children: ReactNode;
  /** Shows the arrow glyph. On by default for primary, off for ghost. */
  withArrow?: boolean;
}

type ButtonProps = ButtonOwnProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, "href" | "children">;

const base =
  "group inline-flex min-h-11 items-center justify-center gap-2 rounded-xs px-6 py-3.5 font-body text-sm font-semibold tracking-[0.08em] uppercase transition-colors duration-[var(--duration-fast)] ease-[var(--ease-signature)]";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-terracotta text-[var(--color-on-brand)] hover:bg-coral focus-ring-on-brand",
  ghost:
    "border border-[var(--color-border-strong)] text-ink hover:border-ink hover:bg-paper-dim",
};

/** Exposed so a caller that can't use `next/link` for a specific href (see
 * site-header.tsx's own cross-page hash links) can still render something
 * pixel-identical to a real `Button`, instead of duplicating these classes
 * by hand. */
export function buttonClasses(variant: ButtonVariant = "primary", className?: string): string {
  return cx(base, variants[variant], className);
}

export function Button({
  variant = "primary",
  href,
  children,
  withArrow = variant === "primary",
  className,
  ...props
}: ButtonProps) {
  return (
    <Link href={href} className={cx(base, variants[variant], className)} {...props}>
      {children}
      {withArrow ? (
        <ArrowUpRight
          aria-hidden="true"
          className="size-4 transition-transform duration-[var(--duration-fast)] ease-[var(--ease-signature)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      ) : null}
    </Link>
  );
}
