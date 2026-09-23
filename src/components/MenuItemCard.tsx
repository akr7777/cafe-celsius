import { useTranslation } from "react-i18next";
import { usePageContext } from "vike-react/usePageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProductImage } from "@/components/ProductImage";
import { formatPriceValue } from "@/i18n/format";
import type { MenuItem } from "@/content/types";
import type { Locale } from "@/i18n/locales";

export function MenuItemCard({ item }: { item: MenuItem }) {
  const { t } = useTranslation();
  const { locale } = usePageContext();
  const l = locale as Locale;

  return (
    <Card className="overflow-hidden py-0">
      <ProductImage
        id={item.id}
        alt={item.name[l]}
        slot={item.category}
        label={item.name[l]}
        className="rounded-none"
      />
      <CardContent className="flex flex-col gap-2 px-4 pt-1 pb-4">
        <div className="flex items-start justify-between gap-3">
          {/* Not a heading: a catalog of ~55 items shouldn't turn into 55 h3s in the page outline. */}
          <p className="font-heading font-semibold">{item.name[l]}</p>
          {item.tempC !== undefined && (
            <Badge variant="outline" className="shrink-0">
              {item.tempC} °C
            </Badge>
          )}
        </div>
        <p className="text-muted-foreground text-sm">{item.description[l]}</p>
        <div className="mt-1 flex items-center justify-between gap-3">
          <span className="font-medium">
            {formatPriceValue(item.price, l, t("common.priceOnRequest"), { supplement: item.supplement })}
            {item.unit && <span className="text-muted-foreground font-normal"> · {item.unit[l]}</span>}
          </span>
        </div>
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {item.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {t(`badges.${tag}`)}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
