import type { Dict } from "./dictionaries/fr";
import { formatTitle } from "./format";

type PageMetaKey = keyof Dict["meta"]["pages"];

// The locale-agnostic path (as used by <Link>/localizePath) for every route
// that has its own title/description, mapped to its dict.meta.pages key.
// Kept in one place so +Head.tsx (OG/Twitter tags) and each page's +data.ts
// (document <title>/<meta description>) always agree.
const routeToPageMetaKey: Record<string, PageMetaKey> = {
  "/carte": "carte",
  "/academie": "academie",
  "/boutique": "boutique",
  "/a-propos": "aPropos",
  "/contact": "contact",
  "/mentions-legales": "mentionsLegales",
  "/confidentialite": "confidentialite",
};

/**
 * Resolves the title (already run through the "%s · CELSIUS" template) and
 * description for a page, given its locale-agnostic path (e.g. "/carte") and
 * that locale's dictionary. Falls back to the site-wide default for "/" and
 * any unrecognized path.
 */
export function getPageMeta(pathWithoutLocale: string, dict: Dict): { title: string; description: string } {
  const key = routeToPageMetaKey[pathWithoutLocale];
  if (!key) return { title: dict.meta.defaultTitle, description: dict.meta.defaultDescription };
  const page = dict.meta.pages[key];
  return { title: formatTitle(dict, page.title), description: page.description };
}
