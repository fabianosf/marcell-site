import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Phone, Award, MessageCircle } from "lucide-react";
import heroImage from "@/assets/dr-marcell-atendimento.jpg";

const WHATSAPP_URL =
  "https://wa.me/5521998667979?text=Ol%C3%A1%20Dr.%20Marcell%2C%20gostaria%20de%20agendar%20uma%20consulta.";

export const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Dr. Marcell Parente - Atendimento Odontológico"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/60" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 relative z-10 py-16 sm:py-0">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <Award className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
            <span className="text-xs sm:text-sm font-medium text-primary leading-tight">
              {t("hero.badge")}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
            {t("hero.title")}{" "}
            <span className="text-primary">{t("hero.highlight")}</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
            <strong className="text-foreground">Dr. Marcell Parente</strong> —{" "}
            {t("hero.subtitle")}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Button
              size="lg"
              className="bg-green-500 hover:bg-green-600 text-white shadow-medium hover:shadow-large transition-all duration-300 text-base sm:text-lg px-6 sm:px-8 w-full sm:w-auto"
              asChild
            >
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" />
                {t("hero.cta_whatsapp")}
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 text-base sm:text-lg px-6 sm:px-8 w-full sm:w-auto"
              asChild
            >
              <a href="tel:+5521998667979">
                <Phone className="mr-2 h-5 w-5" />
                {t("hero.cta_phone")}
              </a>
            </Button>
          </div>

          <div className="mt-6 sm:mt-8 flex items-center gap-3 text-xs sm:text-sm text-muted-foreground">
            <div className="h-px bg-border w-8 sm:w-12 flex-shrink-0" />
            <span className="leading-tight">{t("hero.cro")}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
