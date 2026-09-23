import type { PageContextServer } from "vike/types";
import { useConfig } from "vike-react/useConfig";
import { getDictionary, formatTitle } from "@/i18n";

export function data(pageContext: PageContextServer) {
  const dict = getDictionary(pageContext.locale);
  useConfig()({ title: formatTitle(dict, dict.notFound.title), description: dict.notFound.description });
}
