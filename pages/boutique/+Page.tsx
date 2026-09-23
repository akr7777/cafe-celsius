import { useTranslation } from "react-i18next";
import { usePageContext } from "vike-react/usePageContext";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ProductImage } from "@/components/ProductImage";
import { boutiqueItems, type BoutiqueCategory } from "@/content/boutique";
import type { Locale } from "@/i18n/locales";

const categoryDictKey = {
  grains: "boutique.categories.grains",
  materiel: "boutique.categories.materiel",
  merch: "boutique.categories.merch",
  livres: "boutique.categories.livres",
} as const satisfies Record<BoutiqueCategory, string>;

export default function Page() {
  const { t } = useTranslation();
  const { locale } = usePageContext();
  const l = locale as Locale;

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="font-heading text-3xl font-bold sm:text-4xl">{t("nav.boutique")}</h1>
      <p className="text-muted-foreground mt-3 max-w-2xl">{t("boutique.intro")}</p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {boutiqueItems.map((item) => (
          <Card key={item.id} className="overflow-hidden py-0">
            <ProductImage
              id={item.id}
              slot="boutique"
              alt={item.name[l]}
              label={item.name[l]}
              className="rounded-none"
            />
            <CardContent className="flex flex-col gap-2 px-4 pt-1 pb-4">
              <Badge variant="outline" className="w-fit">
                {t(categoryDictKey[item.category])}
              </Badge>
              <h3 className="font-heading font-semibold">{item.name[l]}</h3>
              <p className="text-muted-foreground text-sm">{item.description[l]}</p>
              <p className="text-primary mt-1 text-sm font-medium">{t("boutique.availableAtOpening")}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
