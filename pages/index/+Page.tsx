import { FlaskConical, GraduationCap, Sparkles, ShoppingBag, Leaf, Wheat, Wifi, ChefHat } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "@/components/Link";
import { Logo } from "@/components/Logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MenuItemCard } from "@/components/MenuItemCard";
import { NewsletterForm } from "@/components/NewsletterForm";
import { ProductImage } from "@/components/ProductImage";
import { TempScale } from "@/components/TempScale";
import { menu } from "@/content/menu";

const pillars = [
  { key: "sommelier", icon: FlaskConical },
  { key: "academie", icon: GraduationCap },
  { key: "innovation", icon: Sparkles },
  { key: "boutique", icon: ShoppingBag },
] as const;

const origins = [
  { key: "bresil", id: "bresil" },
  { key: "ethiopie", id: "ethiopie" },
  { key: "vietnam", id: "vietnam" },
] as const;

const engagements = [
  { key: "homemade", icon: ChefHat },
  { key: "bio", icon: Leaf },
  { key: "veganGlutenFree", icon: Wheat },
  { key: "wifi", icon: Wifi },
] as const;

export default function Page() {
  const { t } = useTranslation();
  const cafeOfWeek = menu.find((item) => item.featured);

  return (
    <>
      {/* Hero */}
      <section className="mx-auto flex max-w-3xl flex-col items-center gap-5 px-4 py-24 text-center">
        <Badge variant="secondary">{t("common.openingSoon")}</Badge>
        <h1>
          <Logo className="text-5xl sm:text-6xl" />
        </h1>
        <p className="text-muted-foreground text-lg">{t("home.heroSubtitle")}</p>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <Link href="/carte">{t("home.heroCta1")}</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/academie">{t("home.heroCta2")}</Link>
          </Button>
        </div>
      </section>

      {/* Concept en 4 piliers */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="font-heading text-center text-2xl font-bold sm:text-3xl">{t("home.pillarsTitle")}</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map(({ key, icon: Icon }) => (
            <Card key={key}>
              <CardContent className="flex flex-col items-start gap-3">
                <div className="bg-muted text-primary flex size-10 items-center justify-center rounded-full">
                  <Icon className="size-5" aria-hidden="true" />
                </div>
                <h3 className="font-heading font-semibold">{t(`home.pillars.${key}.title`)}</h3>
                <p className="text-muted-foreground text-sm">{t(`home.pillars.${key}.description`)}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* La précision thermique */}
      <section className="border-border border-y">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center">
          <h2 className="font-heading text-2xl font-bold sm:text-3xl">{t("home.thermalPrecisionTitle")}</h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-xl">{t("home.thermalPrecisionText")}</p>
          <TempScale />
        </div>
      </section>

      {/* Nos origines */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="font-heading text-center text-2xl font-bold sm:text-3xl">{t("home.originsTitle")}</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {origins.map(({ key, id }) => (
            <Card key={key} className="overflow-hidden py-0">
              <ProductImage
                id={id}
                slot="origin"
                bucket="pages"
                alt={t(`home.origins.${key}.name`)}
                label={t(`home.origins.${key}.name`)}
                className="rounded-none"
              />
              <CardContent className="px-4 pt-1 pb-4">
                <h3 className="font-heading font-semibold">{t(`home.origins.${key}.name`)}</h3>
                <p className="text-muted-foreground mt-1 text-sm">{t(`home.origins.${key}.description`)}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Café de la semaine */}
      {cafeOfWeek && (
        <section className="border-border border-y">
          <div className="mx-auto max-w-md px-4 py-16 text-center">
            <h2 className="font-heading text-2xl font-bold sm:text-3xl">{t("home.cafeOfWeekTitle")}</h2>
            <div className="mt-8 text-left">
              <MenuItemCard item={cafeOfWeek} />
            </div>
          </div>
        </section>
      )}

      {/* Engagements */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="font-heading text-center text-2xl font-bold sm:text-3xl">
          {t("home.engagementsTitle")}
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {engagements.map(({ key, icon: Icon }) => (
            <div key={key} className="flex flex-col items-center gap-3 text-center">
              <div className="bg-muted text-primary flex size-10 items-center justify-center rounded-full">
                <Icon className="size-5" aria-hidden="true" />
              </div>
              <h3 className="font-heading font-semibold">{t(`home.engagements.${key}.title`)}</h3>
              <p className="text-muted-foreground text-sm">{t(`home.engagements.${key}.description`)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="border-border border-t">
        <div className="mx-auto max-w-xl px-4 py-16 text-center">
          <h2 className="font-heading text-2xl font-bold sm:text-3xl">{t("home.newsletterTitle")}</h2>
          <p className="text-muted-foreground mt-3">{t("home.newsletterText")}</p>
          <div className="mt-6">
            <NewsletterForm />
          </div>
        </div>
      </section>
    </>
  );
}
