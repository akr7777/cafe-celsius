export const locales = ["fr", "en", "hy"] as const;
export type Locale = (typeof locales)[number];
export const localeDefault: Locale = "fr";

export const localeLabels: Record<Locale, string> = {
  fr: "FR",
  en: "EN",
  hy: "ՀՅ",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/**
 * `/fr/carte/` + "fr" → `/carte` (used to rebuild the same page's URL in
 * another locale). Always returns the no-trailing-slash form — "/" or
 * "/some-page" — which is the one canonical shape `localizePath` below and
 * the `href` prop of <Link> agree on.
 */
export function stripLocaleFromPath(urlPathname: string, locale: Locale): string {
  const stripped = urlPathname.slice(`/${locale}`.length) || "/";
  return stripped === "/" ? "/" : stripped.replace(/\/+$/, "");
}

/**
 * Builds the actual, trailing-slash URL for a locale-agnostic path (e.g.
 * "/carte" or "/") in a given locale — "/fr/carte/". Every internal link and
 * the prerendered output (`dist/client/fr/carte/index.html`) agree on this
 * shape, which is what lets a plain static file server (nginx, S3, GitHub
 * Pages, …) resolve it to that file without needing "clean URL" support.
 */
export function localizePath(locale: Locale, path: string): string {
  return path === "/" ? `/${locale}/` : `/${locale}${path}/`;
}
