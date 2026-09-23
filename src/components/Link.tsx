import type { ReactNode } from "react";
import { usePageContext } from "vike-react/usePageContext";
import { localizePath, type Locale } from "@/i18n/locales";
import { cn } from "@/lib/utils";

/**
 * Locale-aware link: `href` is always locale-agnostic (e.g. "/carte", "/")
 * and gets the current locale prefixed automatically, matching the URL
 * scheme from +onBeforeRoute.ts (every page lives under /fr, /en or /hy).
 */
export function Link({
  href,
  children,
  className,
  onClick,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const pageContext = usePageContext();
  const { locale, urlOriginal } = pageContext;
  const localizedHref = localizePath(locale, href);
  const isActive = href === "/" ? urlOriginal === localizedHref : urlOriginal.startsWith(localizedHref);

  return (
    <a
      href={localizedHref}
      className={className}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
    >
      {children}
    </a>
  );
}

export function isActiveHref(urlOriginal: string, locale: Locale, href: string): boolean {
  const localizedHref = localizePath(locale, href);
  return href === "/" ? urlOriginal === localizedHref : urlOriginal.startsWith(localizedHref);
}

// Keep className computation next to the component so callers don't hand-roll active-state styling.
export function navLinkClassName(isActive: boolean) {
  return cn(
    "text-sm font-medium transition-colors hover:text-primary",
    isActive ? "text-primary" : "text-foreground/80",
  );
}
