import { useTranslation } from "react-i18next";

export default function Page() {
  const { t } = useTranslation();

  return (
    <section className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="font-heading text-3xl font-bold sm:text-4xl">{t("legal.privacy.title")}</h1>

      <h2 className="font-heading mt-8 text-lg font-semibold">{t("legal.privacy.cookiesTitle")}</h2>
      <p className="text-muted-foreground mt-3">{t("legal.privacy.cookiesText")}</p>

      <h2 className="font-heading mt-8 text-lg font-semibold">{t("legal.privacy.formsTitle")}</h2>
      <p className="text-muted-foreground mt-3">{t("legal.privacy.formsText")}</p>

      <h2 className="font-heading mt-8 text-lg font-semibold">{t("legal.privacy.rgpdTitle")}</h2>
      <p className="text-muted-foreground mt-3">
        {t("legal.privacy.rgpdText")} {t("legal.privacy.contact")}
      </p>
    </section>
  );
}
