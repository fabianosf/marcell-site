import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { NAV_SECTIONS, SITE_SECTIONS, scrollToSection } from "@/lib/sections";
import { getWhatsAppHref, siteConfig } from "@/lib/site";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Brand } from "@/components/Brand";

export const Header = () => {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("inicio");
  const navigate = useNavigate();
  const location = useLocation();
  const whatsappHref = getWhatsAppHref(t("cta.whatsapp_message"));

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 16);
      if (window.scrollY < 80) setActiveId("inicio");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Destaca no menu a seção que está na tela
  useEffect(() => {
    const els = SITE_SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.2, 0.5, 1] },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const go = (path: string, id: string) => {
    setMenuOpen(false);
    if (location.pathname === path) {
      // aguarda o menu móvel fechar para o scroll não ser interrompido
      window.setTimeout(() => scrollToSection(id), 50);
    } else {
      navigate(path);
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
        isScrolled ? "bg-background/90 shadow-soft backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav aria-label="Principal" className="mx-auto flex h-[80px] w-full max-w-[1280px] px-5 sm:px-8 items-center justify-between gap-6">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            go("/", "inicio");
          }}
          aria-label={`${siteConfig.clinicFullName}, início`}
          className="rounded-full text-foreground"
        >
          <Brand className="h-[64px]" />
        </a>

        <ul className="hidden items-center gap-1 xl:flex">
          {NAV_SECTIONS.map((link) => (
            <li key={link.id}>
              <a
                href={link.path}
                onClick={(e) => {
                  e.preventDefault();
                  go(link.path, link.id);
                }}
                aria-current={activeId === link.id ? "true" : undefined}
                className={`rounded-full px-3.5 py-2 text-[15px] font-medium transition-colors ${
                  activeId === link.id ? "bg-primary/10 text-primary" : "text-foreground/75 hover:text-primary"
                }`}
              >
                {t(`nav.${link.id}`)}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 xl:flex">
          <LanguageSwitcher />
          <Button asChild className="rounded-full bg-primary px-5 text-primary-foreground hover:bg-primary-dark">
            <a href={whatsappHref} target={whatsappHref.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-4 w-4" aria-hidden="true" />
              {t("nav.agendar")}
            </a>
          </Button>
        </div>

        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger asChild>
            <button
              type="button"
              aria-label={t("nav.open_menu")}
              className="grid h-11 w-11 place-items-center rounded-full text-foreground hover:bg-muted xl:hidden"
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="flex w-[88%] max-w-sm flex-col bg-background">
            <SheetHeader className="text-left">
              <SheetTitle className="font-display text-xl">{t("nav.menu_title")}</SheetTitle>
              <SheetDescription className="sr-only">{t("nav.menu_title")}</SheetDescription>
            </SheetHeader>
            <ul className="mt-6 flex flex-col">
              {NAV_SECTIONS.map((link) => (
                <li key={link.id} className="border-b border-border/70">
                  <a
                    href={link.path}
                    onClick={(e) => {
                      e.preventDefault();
                      go(link.path, link.id);
                    }}
                    className="flex items-center py-4 font-display text-2xl tracking-tight text-foreground"
                  >
                    {t(`nav.${link.id}`)}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-auto flex flex-col gap-4 pt-8">
              <LanguageSwitcher />
              <Button asChild size="lg" className="rounded-full bg-primary text-primary-foreground hover:bg-primary-dark">
                <a
                  href={whatsappHref}
                  target={whatsappHref.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                >
                  <MessageCircle className="mr-2 h-5 w-5" aria-hidden="true" />
                  {t("nav.agendar")}
                </a>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
};
