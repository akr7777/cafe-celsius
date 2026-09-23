import { useState } from "react";
import { Menu, ShoppingBag } from "lucide-react";
import { useTranslation } from "react-i18next";
import { usePageContext } from "vike-react/usePageContext";
import { Link, navLinkClassName, isActiveHref } from "@/components/Link";
import { Logo } from "@/components/Logo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ClickAndCollectDialog } from "@/components/ClickAndCollectDialog";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navItems = [
  { href: "/", key: "nav.home" },
  { href: "/carte", key: "nav.carte" },
  { href: "/academie", key: "nav.academie" },
  { href: "/boutique", key: "nav.boutique" },
  { href: "/a-propos", key: "nav.aPropos" },
  { href: "/contact", key: "nav.contact" },
] as const;

export function Header() {
  const { t } = useTranslation();
  const { locale, urlOriginal } = usePageContext();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="border-b-border bg-background/95 sticky top-0 z-40 border-b backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/" className="shrink-0">
          <Logo />
        </Link>

        <NavigationMenu className="hidden max-w-none flex-1 justify-center lg:flex" viewport={false}>
          <NavigationMenuList>
            {navItems.map((item) => (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuLink asChild active={isActiveHref(urlOriginal, locale, item.href)}>
                  <Link
                    href={item.href}
                    className={navLinkClassName(isActiveHref(urlOriginal, locale, item.href))}
                  >
                    {t(item.key)}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-1">
          <ClickAndCollectDialog
            trigger={
              <Button variant="outline" size="sm" className="hidden sm:inline-flex">
                <ShoppingBag className="size-4" aria-hidden="true" />
                {t("nav.clickAndCollect")}
              </Button>
            }
          />
          <LanguageSwitcher />

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label={t("nav.menu")}>
                <Menu className="size-5" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col">
              <SheetHeader>
                <SheetTitle>
                  <Logo />
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4">
                {navItems.map((item) => (
                  <SheetClose key={item.href} asChild>
                    <Link
                      href={item.href}
                      className={
                        navLinkClassName(isActiveHref(urlOriginal, locale, item.href)) + " py-2 text-base"
                      }
                    >
                      {t(item.key)}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-auto px-4 pb-4">
                <ClickAndCollectDialog
                  trigger={
                    <Button variant="outline" className="w-full">
                      <ShoppingBag className="size-4" aria-hidden="true" />
                      {t("nav.clickAndCollect")}
                    </Button>
                  }
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
