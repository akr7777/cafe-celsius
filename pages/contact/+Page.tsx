import { useTranslation } from "react-i18next";
import { ContactForm } from "@/components/ContactForm";
import { SocialLinks } from "@/components/SocialLinks";

export default function Page() {
  const { t } = useTranslation();

  return (
    <section className="mx-auto max-w-xl px-4 py-16">
      <h1 className="font-heading text-3xl font-bold sm:text-4xl">{t("nav.contact")}</h1>
      <p className="text-muted-foreground mt-3">
        {t("common.openingSoonCity")} {t("contact.addressSoon")}
      </p>

      <div className="mt-10">
        <h2 className="font-heading text-lg font-semibold">{t("contact.formTitle")}</h2>
        <div className="mt-4">
          <ContactForm />
        </div>
      </div>

      <div className="mt-12">
        <h2 className="font-heading text-lg font-semibold">{t("contact.socialTitle")}</h2>
        <SocialLinks className="mt-3" />
      </div>
    </section>
  );
}
