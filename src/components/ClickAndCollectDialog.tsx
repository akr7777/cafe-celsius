import type { ReactNode } from "react";
import { Clock } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

/**
 * §9: Click & Collect is a placeholder everywhere it appears (header, menu
 * page) — no order form, just the "coming soon" message.
 */
export function ClickAndCollectDialog({ trigger }: { trigger: ReactNode }) {
  const { t } = useTranslation();

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className="bg-muted text-muted-foreground mb-2 inline-flex size-10 items-center justify-center rounded-full">
            <Clock className="size-5" aria-hidden="true" />
          </div>
          <DialogTitle>{t("clickAndCollect.title")}</DialogTitle>
          <DialogDescription>{t("clickAndCollect.description")}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
