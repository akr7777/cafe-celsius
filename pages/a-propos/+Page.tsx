import { Check, User } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";

const founderBullets = ["bullet1", "bullet2", "bullet3", "bullet4"] as const;

export default function Page() {
  const { t } = useTranslation();

  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="font-heading text-3xl font-bold sm:text-4xl">{t("nav.aPropos")}</h1>

      <div className="mt-8">
        <h2 className="font-heading text-xl font-semibold">{t("aPropos.historyTitle")}</h2>
        <p className="text-muted-foreground mt-3">{t("aPropos.historyText")}</p>
      </div>

      <Card className="mt-12">
        <CardContent className="flex flex-col gap-6 sm:flex-row sm:items-start">
          {/* Photo placeholder — swap for a real portrait, see docs/image-prompts.md */}
          <div className="bg-muted text-muted-foreground mx-auto flex size-28 shrink-0 items-center justify-center rounded-full sm:mx-0">
            <User className="size-10" aria-hidden="true" />
          </div>
          <div>
            <h2 className="font-heading text-lg font-semibold">{t("aPropos.founderTitle")}</h2>
            <p className="mt-1 font-medium">{t("aPropos.founder.name")}</p>
            <p className="text-muted-foreground text-sm">{t("aPropos.founder.role")}</p>
            <ul className="mt-4 space-y-2 text-sm">
              {founderBullets.map((key) => (
                <li key={key} className="flex items-start gap-2">
                  <Check className="text-primary mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  <span>{t(`aPropos.founder.${key}`)}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
