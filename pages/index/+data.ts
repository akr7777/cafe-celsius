import type { PageContextServer } from "vike/types";
import { useConfig } from "vike-react/useConfig";
import { getDictionary } from "@/i18n";

export function data(pageContext: PageContextServer) {
  const dict = getDictionary(pageContext.locale);
  useConfig()({ title: dict.meta.defaultTitle, description: dict.meta.defaultDescription });
}
