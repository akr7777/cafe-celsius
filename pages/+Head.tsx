// https://vike.dev/Head

import { usePageContext } from "vike-react/usePageContext";
import faviconUrl from "@/assets/favicon.svg";
import { locales, localeDefault, localizePath, stripLocaleFromPath } from "@/i18n/locales";

const siteUrl = (import.meta.env.PUBLIC_ENV__SITE_URL as string | undefined)?.replace(/\/$/, "") ?? "";

export function Head() {
  const { locale, urlOriginal } = usePageContext();
  const pathWithoutLocale = stripLocaleFromPath(urlOriginal, locale);

  return (
    <>
      <link rel="icon" href={faviconUrl} type="image/svg+xml" />
      {siteUrl && (
        <>
          {locales.map((l) => (
            <link key={l} rel="alternate" hrefLang={l} href={siteUrl + localizePath(l, pathWithoutLocale)} />
          ))}
          <link
            rel="alternate"
            hrefLang="x-default"
            href={siteUrl + localizePath(localeDefault, pathWithoutLocale)}
          />
        </>
      )}
    </>
  );
}
