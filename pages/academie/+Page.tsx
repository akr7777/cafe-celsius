import { useTranslation } from "react-i18next";
import { usePageContext } from "vike-react/usePageContext";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AcademieSubscribeDialog } from "@/components/AcademieSubscribeDialog";
import { ProductImage } from "@/components/ProductImage";
import { academiePrograms, type AcademieFormat } from "@/content/academie";
import { formatPriceValue } from "@/i18n/format";
import type { Locale } from "@/i18n/locales";

const formatDictKey = {
  onsite: "academie.format.onsite",
  online: "academie.format.online",
  corporate: "academie.format.corporate",
} as const satisfies Record<AcademieFormat, string>;

const faqItems = [
  { question: "academie.faq.q1", answer: "academie.faq.a1" },
  { question: "academie.faq.q2", answer: "academie.faq.a2" },
  { question: "academie.faq.q3", answer: "academie.faq.a3" },
  { question: "academie.faq.q4", answer: "academie.faq.a4" },
] as const;

export default function Page() {
  const { t } = useTranslation();
  const { locale } = usePageContext();
  const l = locale as Locale;

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="font-heading text-3xl font-bold sm:text-4xl">{t("nav.academie")}</h1>
      <p className="text-muted-foreground mt-3 max-w-2xl">{t("academie.intro")}</p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {academiePrograms.map((program) => (
          <Card key={program.id} className="overflow-hidden py-0">
            <ProductImage
              id={program.id}
              slot="academie"
              bucket="pages"
              alt={program.name[l]}
              label={program.name[l]}
              className="rounded-none"
            />
            <CardContent className="flex flex-col gap-2 px-4 pt-1 pb-4">
              {/* Not a heading — keeps the page outline at h1 → h2 (FAQ), see MenuItemCard. */}
              <p className="font-heading font-semibold">{program.name[l]}</p>
              <p className="text-muted-foreground text-sm">{program.description[l]}</p>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-sm">
                {program.duration && (
                  <span>
                    {t("academie.durationLabel")} : {program.duration[l]}
                  </span>
                )}
                <Badge variant="outline">{t(formatDictKey[program.format])}</Badge>
              </div>
              <div className="mt-1 flex items-center justify-between gap-3">
                <span className="font-medium">
                  {formatPriceValue(
                    program.price,
                    l,
                    // The online course is "coming soon" rather than "on request" (§7).
                    program.tags?.includes("online") ? t("common.comingSoon") : t("common.priceOnRequest"),
                  )}
                </span>
                <AcademieSubscribeDialog
                  programId={program.id}
                  trigger={
                    <Button size="sm" variant="outline">
                      {t("academie.subscribeCta")}
                    </Button>
                  }
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mx-auto mt-16 max-w-2xl">
        <h2 className="font-heading text-2xl font-bold">{t("academie.faq.title")}</h2>
        <Accordion type="single" collapsible className="mt-4">
          {faqItems.map(({ question, answer }) => (
            <AccordionItem key={question} value={question}>
              <AccordionTrigger>{t(question)}</AccordionTrigger>
              <AccordionContent>{t(answer)}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
