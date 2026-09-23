import { Camera, Play, Music2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { site } from "@/content/site";

// lucide-react ships no brand marks, so Instagram/YouTube use neutral
// stand-ins (Camera, Play); TikTok never had one and uses Music2 (§10).
const networks = [
  { key: "instagram", icon: Camera, label: "Instagram", href: site.social.instagram },
  { key: "youtube", icon: Play, label: "YouTube", href: site.social.youtube },
  { key: "tiktok", icon: Music2, label: "TikTok", href: site.social.tiktok },
] as const;

export function SocialLinks({ className }: { className?: string }) {
  const { t } = useTranslation();

  return (
    <ul className={cn("flex items-center gap-1", className)}>
      {networks.map(({ key, icon: Icon, label, href }) => (
        <li key={key}>
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="text-muted-foreground hover:text-primary inline-flex size-9 items-center justify-center rounded-md transition-colors"
            >
              <Icon className="size-4" aria-hidden="true" />
            </a>
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <span
                  aria-label={`${label} — ${t("footer.soon")}`}
                  className="text-muted-foreground/50 inline-flex size-9 cursor-default items-center justify-center rounded-md"
                >
                  <Icon className="size-4" aria-hidden="true" />
                </span>
              </TooltipTrigger>
              <TooltipContent>{t("footer.soon")}</TooltipContent>
            </Tooltip>
          )}
        </li>
      ))}
    </ul>
  );
}
