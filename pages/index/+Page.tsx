import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/Logo";

// Placeholder Accueil — the full page (concept pillars, temperature scale,
// origins, café de la semaine, engagements, newsletter) is built in stage 2.
export default function Page() {
  const { t } = useTranslation();

  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-4 py-24 text-center">
      <Badge variant="secondary">{t("common.openingSoon")}</Badge>
      <h1>
        <Logo className="text-5xl sm:text-6xl" />
      </h1>
      <p className="text-muted-foreground text-lg">{t("home.heroSubtitle")}</p>
    </section>
  );
}
