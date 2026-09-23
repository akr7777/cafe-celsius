import { useTranslation } from "react-i18next";
import { Link } from "@/components/Link";
import { Logo } from "@/components/Logo";
import { SocialLinks } from "@/components/SocialLinks";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t-border mt-16 border-t">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <Logo />
            <p className="text-muted-foreground mt-1 text-sm">{t("common.openingSoonParis")}</p>
          </div>
          <SocialLinks />
        </div>

        <Separator />

        <div className="text-muted-foreground flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>{t("footer.rights", { year })}</p>
          <nav className="flex gap-4">
            <Link href="/mentions-legales" className="hover:text-foreground transition-colors">
              {t("footer.legalMentions")}
            </Link>
            <Link href="/confidentialite" className="hover:text-foreground transition-colors">
              {t("footer.privacy")}
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
