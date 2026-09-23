import { modifyUrl } from "vike/modifyUrl";
import { isLocale, type Locale } from "./locales";

/**
 * Reads the locale from the URL's first path segment (e.g. `/fr/carte`) and
 * returns the URL Vike should actually route against (`/carte`), search and
 * hash left untouched. `locale` is `null` when the URL carries no known
 * locale prefix (notably the bare `/` — see pages/+onBeforeRoute.ts).
 */
export function extractLocale(
  pathname: string,
  urlOriginal: string,
): { locale: Locale | null; urlLogical: string } {
  const segments = pathname.split("/");
  const maybeLocale = segments[1];
  if (maybeLocale && isLocale(maybeLocale)) {
    const pathnameWithoutLocale = "/" + segments.slice(2).join("/");
    return {
      locale: maybeLocale,
      urlLogical: modifyUrl(urlOriginal, { pathname: pathnameWithoutLocale }),
    };
  }
  return { locale: null, urlLogical: urlOriginal };
}
