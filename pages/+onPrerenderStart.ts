export { onPrerenderStart };

import type { PrerenderContext } from "vike/types";
import { locales, localizePath } from "@/i18n/locales";

// Every page is prerendered once per locale (fr/en/hy), always prefixed —
// including fr, unlike the un-prefixed-default-locale pattern from Vike's
// own i18n guide. The un-prefixed root URL is handled separately: see
// pages/+onBeforeRoute.ts and scripts/write-root-redirect.mjs.
//
// URLs get a trailing slash (localizePath, matching every internal <Link>)
// so the prerendered dist/client/fr/carte/index.html is reachable at
// /fr/carte/ on a plain static file server, without needing "clean URL"
// support from the host.
function onPrerenderStart(prerenderContext: PrerenderContext) {
  const pageContexts = prerenderContext.pageContexts.flatMap((pageContext) =>
    locales.map((locale) => ({
      ...pageContext,
      urlOriginal: localizePath(locale, pageContext.urlOriginal),
      locale,
    })),
  );

  return {
    prerenderContext: {
      pageContexts,
    },
  };
}
