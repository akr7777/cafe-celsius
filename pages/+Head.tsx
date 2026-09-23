// https://vike.dev/Head

import { usePageContext } from "vike-react/usePageContext";
import { getDictionary, getPageMeta } from "@/i18n";
import { locales, localeDefault, localizePath, stripLocaleFromPath, type Locale } from "@/i18n/locales";

const siteUrl = (import.meta.env.PUBLIC_ENV__SITE_URL as string | undefined)?.replace(/\/$/, "") ?? "";

const ogLocale: Record<Locale, string> = {
  fr: "fr_FR",
  en: "en_US",
  hy: "hy_AM",
};

export function Head() {
  const { locale, urlOriginal } = usePageContext();
  const pathWithoutLocale = stripLocaleFromPath(urlOriginal, locale);
  const dict = getDictionary(locale);
  const meta = getPageMeta(pathWithoutLocale, dict);
  const canonicalUrl = siteUrl ? siteUrl + localizePath(locale, pathWithoutLocale) : undefined;
  const ogImageUrl = siteUrl ? `${siteUrl}/og-image.png` : undefined;

  return (
    <>
      {/* Favicon — §11: "°C" on blue, SVG + PNG 32/180/512 */}
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <link rel="icon" href="/favicon-32.png" type="image/png" sizes="32x32" />
      <link rel="icon" href="/favicon-512.png" type="image/png" sizes="512x512" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />

      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

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

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="CELSIUS" />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:locale" content={ogLocale[locale]} />
      {locales
        .filter((l) => l !== locale)
        .map((l) => (
          <meta key={l} property="og:locale:alternate" content={ogLocale[l]} />
        ))}
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      {ogImageUrl && (
        <>
          <meta property="og:image" content={ogImageUrl} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
        </>
      )}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      {ogImageUrl && <meta name="twitter:image" content={ogImageUrl} />}

      {/* JSON-LD: Organization only — no CafeOrCoffeeShop until there's an address (§11) */}
      {siteUrl && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "CELSIUS",
              url: siteUrl,
            }),
          }}
        />
      )}
    </>
  );
}
