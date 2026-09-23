import { useTranslation } from "react-i18next";
import { PagePlaceholder } from "@/components/PagePlaceholder";

export default function Page() {
  const { t } = useTranslation();
  return <PagePlaceholder title={t("footer.legalMentions")} />;
}
