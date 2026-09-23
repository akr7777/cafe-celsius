export { onBeforeRender };

import type { PageContextServer } from "vike/types";
import { useConfig } from "vike-react/useConfig";
import { getDictionary } from "@/i18n";

// Runs for every page (root-level hook) and sets the site-wide default
// <title>/description for the current locale. A page's own +data.ts can
// still override these via useConfig() for a more specific title.
function onBeforeRender(pageContext: PageContextServer) {
  const dict = getDictionary(pageContext.locale);
  const config = useConfig();
  config({
    title: dict.meta.defaultTitle,
    description: dict.meta.defaultDescription,
  });
}
