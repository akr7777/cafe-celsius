import { useTranslation } from "react-i18next";
import { usePageContext } from "vike-react/usePageContext";
import { Link } from "@/components/Link";
import { Button } from "@/components/ui/button";

export default function Page() {
  const { t } = useTranslation();
  const { is404 } = usePageContext();

  return (
    <section className="mx-auto flex max-w-xl flex-col items-center gap-4 px-4 py-24 text-center">
      <h1 className="font-heading text-3xl font-bold">{is404 ? t("notFound.title") : t("error.title")}</h1>
      <p className="text-muted-foreground">{is404 ? t("notFound.description") : t("error.description")}</p>
      <Button asChild>
        <Link href="/">{t("notFound.backHome")}</Link>
      </Button>
    </section>
  );
}
