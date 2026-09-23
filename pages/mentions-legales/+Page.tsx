import { useTranslation } from "react-i18next";

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-2">
      <dt className="text-muted-foreground shrink-0 sm:w-48">{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

export default function Page() {
  const { t } = useTranslation();

  return (
    <section className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="font-heading text-3xl font-bold sm:text-4xl">{t("legal.mentions.title")}</h1>

      <h2 className="font-heading mt-8 text-lg font-semibold">{t("legal.mentions.editorTitle")}</h2>
      <dl className="mt-3 space-y-2 text-sm">
        <Row label={t("legal.mentions.editorTitle")} value={t("legal.mentions.editor")} />
        <Row label={t("legal.mentions.directorLabel")} value={t("legal.mentions.director")} />
        <Row label={t("legal.mentions.addressLabel")} value={t("legal.mentions.address")} />
        <Row label={t("legal.mentions.rcsLabel")} value={t("legal.mentions.rcs")} />
        <Row label={t("legal.mentions.capitalLabel")} value={t("legal.mentions.capital")} />
      </dl>

      <h2 className="font-heading mt-8 text-lg font-semibold">{t("legal.mentions.hostTitle")}</h2>
      <p className="mt-3 text-sm">{t("legal.mentions.host")}</p>

      <h2 className="font-heading mt-8 text-lg font-semibold">{t("legal.mentions.ipTitle")}</h2>
      <p className="text-muted-foreground mt-3 text-sm">{t("legal.mentions.ipText")}</p>
    </section>
  );
}
