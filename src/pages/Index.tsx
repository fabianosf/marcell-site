import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Team } from "@/components/Team";
import { Treatments } from "@/components/Treatments";
import { Process } from "@/components/Process";
import { Gallery } from "@/components/Gallery";
import { Reviews } from "@/components/Reviews";
import { Faq } from "@/components/Faq";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Seo } from "@/components/Seo";
import { PATH_TO_SECTION_ID, scrollToSection } from "@/lib/sections";

const Index = () => {
  const location = useLocation();
  const { t } = useTranslation();

  // Links diretos como /tratamentos levam à seção correspondente
  useEffect(() => {
    const sectionId = PATH_TO_SECTION_ID[location.pathname];
    if (sectionId && sectionId !== "inicio") {
      const timer = window.setTimeout(() => scrollToSection(sectionId), 60);
      return () => window.clearTimeout(timer);
    }
    if (sectionId === "inicio") window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <div id="inicio" className="min-h-screen bg-background">
      <Seo />
      <a
        href="#conteudo"
        className="sr-only z-50 rounded-full bg-primary px-5 py-3 text-primary-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        {t("nav.skip")}
      </a>
      <Header />
      <main id="conteudo">
        <Hero />
        <Team />
        <Treatments />
        <Process />
        <Gallery />
        <Reviews />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
