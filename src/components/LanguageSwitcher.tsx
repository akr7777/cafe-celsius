import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";
import { usePageContext } from "vike-react/usePageContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { locales, localeLabels, localizePath, stripLocaleFromPath } from "@/i18n/locales";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const { t } = useTranslation();
  const { locale, urlOriginal } = usePageContext();
  // Same page, other locale: swap only the leading /fr, /en or /hy segment.
  const pathWithoutLocale = stripLocaleFromPath(urlOriginal, locale);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={t("languageSwitcher.label")}>
          <Languages className="size-4" aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((targetLocale) => (
          <DropdownMenuItem key={targetLocale} asChild>
            <a
              href={localizePath(targetLocale, pathWithoutLocale)}
              className={cn(targetLocale === locale && "font-semibold")}
              aria-current={targetLocale === locale ? "true" : undefined}
            >
              {localeLabels[targetLocale]}
            </a>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
