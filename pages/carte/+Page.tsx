import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MenuItemCard } from "@/components/MenuItemCard";
import { menu, menuCategories } from "@/content/menu";
import type { MenuCategoryId, MenuTag } from "@/content/types";

const legendTags: MenuTag[] = ["vegan", "glutenFree", "homemade", "decafAvailable"];

const categoryDictKey = {
  espresso: "carte.categories.espresso",
  degustation: "carte.categories.degustation",
  froid: "carte.categories.froid",
  signatures: "carte.categories.signatures",
  "sans-cafe": "carte.categories.sansCafe",
  fraicheur: "carte.categories.fraicheur",
  douceurs: "carte.categories.douceurs",
  sale: "carte.categories.sale",
  formules: "carte.categories.formules",
} as const satisfies Record<MenuCategoryId, string>;

export default function Page() {
  const { t } = useTranslation();

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="font-heading text-3xl font-bold sm:text-4xl">{t("nav.carte")}</h1>
      <p className="text-muted-foreground mt-3 max-w-2xl">{t("carte.intro")}</p>

      <Tabs defaultValue={menuCategories[0]} className="mt-10">
        <TabsList className="group-data-[orientation=horizontal]/tabs:h-auto w-full justify-start gap-1 overflow-x-auto p-1.5">
          {menuCategories.map((category) => (
            <TabsTrigger key={category} value={category} className="h-auto shrink-0 px-4 py-2.5 text-base">
              {t(categoryDictKey[category])}
            </TabsTrigger>
          ))}
        </TabsList>
        {menuCategories.map((category) => (
          <TabsContent key={category} value={category}>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {menu
                .filter((item) => item.category === category)
                .map((item) => (
                  <MenuItemCard key={item.id} item={item} />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <Separator className="my-10" />

      <div className="space-y-2 text-sm">
        <p className="text-muted-foreground">{t("common.priceDisclaimer")}</p>
        <p className="text-muted-foreground">{t("carte.tempNote")}</p>
        <p className="text-muted-foreground">{t("carte.allergensNote")}</p>
      </div>

      <div className="mt-6">
        <h2 className="font-heading text-lg font-semibold">{t("carte.legendTitle")}</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {legendTags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {t(`badges.${tag}`)}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
}
