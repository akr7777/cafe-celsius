import type { PageContextServer } from "vike/types";
import { useConfig } from "vike-react/useConfig";
import { getDictionary, getPageMeta } from "@/i18n";

export function data(pageContext: PageContextServer) {
  const meta = getPageMeta("/mentions-legales", getDictionary(pageContext.locale));
  useConfig()({ title: meta.title, description: meta.description });
}
