import "@/styles/theme.css";
import type { ReactNode } from "react";
import { I18nextProvider } from "react-i18next";
import { usePageContext } from "vike-react/usePageContext";
import { getI18nInstance } from "@/i18n";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function Layout({ children }: { children: ReactNode }) {
  const { locale } = usePageContext();
  const i18n = getI18nInstance(locale);

  return (
    <I18nextProvider i18n={i18n}>
      <TooltipProvider delayDuration={200}>
        <a
          href="#main-content"
          className="bg-primary text-primary-foreground focus:not-sr-only sr-only fixed top-2 left-2 z-50 rounded-md px-4 py-2"
        >
          {i18n.t("common.skipToContent")}
        </a>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        <Toaster />
      </TooltipProvider>
    </I18nextProvider>
  );
}
