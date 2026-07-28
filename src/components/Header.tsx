import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Menu, X, MessageCircle } from "lucide-react";
import logoImage from "@/assets/logo-cero.png";
import { SITE_SECTIONS, scrollToSection } from "@/lib/sections";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

const WHATSAPP_URL =
  "https://wa.me/5521998667979?text=Ol%C3%A1%20Dr.%20Marcell%2C%20gostaria%20de%20agendar%20uma%20consulta.";

export const Header = () => {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSectionNavigation = (path: string, sectionId: string) => {
    if (location.pathname === path) {
      scrollToSection(sectionId);
    } else {
      navigate(path);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-soft"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleSectionNavigation("/inicio", "inicio")}
            className="flex items-center gap-3 group"
          >
            <img
              src={logoImage}
              alt="Dr. Marcell Parente"
              className="h-12 w-auto transition-transform group-hover:scale-105"
            />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {SITE_SECTIONS.map((link) => (
              <button
                key={link.path}
                onClick={() => handleSectionNavigation(link.path, link.id)}
                className={`text-foreground hover:text-primary transition-colors font-medium ${
                  location.pathname === link.path ? "text-primary" : ""
                }`}
              >
                {t(`nav.${link.id}`)}
              </button>
            ))}
            <LanguageSwitcher />
            <Button
              asChild
              className="bg-primary hover:bg-primary-dark text-primary-foreground"
            >
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-4 w-4" />
                {t("nav.whatsapp")}
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-foreground"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 space-y-4 bg-background rounded-lg shadow-medium">
            {SITE_SECTIONS.map((link) => (
              <button
                key={link.path}
                onClick={() => handleSectionNavigation(link.path, link.id)}
                className={`block w-full text-left px-4 py-2 hover:text-primary hover:bg-muted transition-colors ${
                  location.pathname === link.path ? "text-primary" : "text-foreground"
                }`}
              >
                {t(`nav.${link.id}`)}
              </button>
            ))}
            <div className="px-4 flex items-center justify-between">
              <LanguageSwitcher />
            </div>
            <div className="px-4">
              <Button asChild className="w-full bg-primary hover:bg-primary-dark text-primary-foreground">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  {t("nav.whatsapp")}
                </a>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
