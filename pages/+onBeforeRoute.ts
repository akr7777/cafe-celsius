export { onBeforeRoute };

import type { PageContextServer } from "vike/types";
import { extractLocale } from "@/i18n/extractLocale";
import { localeDefault } from "@/i18n/locales";

// The production build never actually serves a bare "/": onPrerenderStart
// below only emits locale-prefixed URLs, and scripts/write-root-redirect.mjs
// writes a plain static dist/client/index.html (meta-refresh to /fr/) after
// the build — see §4 of the spec. If `vike dev` is hit at "/" directly (or
// any other unprefixed path), we still render it, defaulting to `fr`, purely
// as a local convenience; it never happens on the deployed static site.
function onBeforeRoute(pageContext: PageContextServer) {
  const { locale, urlLogical } = extractLocale(pageContext.urlParsed.pathname, pageContext.urlOriginal);

  return {
    pageContext: {
      locale: locale ?? localeDefault,
      urlLogical,
    },
  };
}
