import { useTranslation } from "react-i18next";
import { Phone, Mail, MapPin, MessageCircle, Award } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background py-10 md:py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="sm:col-span-2 md:col-span-1">
            <div className="mb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-background">Dr. Marcell Parente</h2>
              <p className="text-primary text-sm">Endodontia | Implantodontia</p>
            </div>
            <p className="text-background/80 text-sm leading-relaxed">
              {t("footer.description")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-base md:text-lg mb-3 md:mb-4">{t("footer.quick_links")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-background/80 hover:text-background transition-colors">
                  {t("nav.inicio")}
                </Link>
              </li>
              <li>
                <Link to="/sobre" className="text-background/80 hover:text-background transition-colors">
                  {t("footer.about_link")}
                </Link>
              </li>
              <li>
                <Link to="/servicos" className="text-background/80 hover:text-background transition-colors">
                  {t("footer.services_link")}
                </Link>
              </li>
              <li>
                <Link to="/galeria" className="text-background/80 hover:text-background transition-colors">
                  {t("footer.gallery_link")}
                </Link>
              </li>
              <li>
                <Link to="/contato" className="text-background/80 hover:text-background transition-colors">
                  {t("footer.contact_link")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-base md:text-lg mb-3 md:mb-4">{t("footer.contact")}</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-background/80 text-xs sm:text-sm">
                  Av. Nossa Senhora de Copacabana, 330 – sala 707, Copacabana, Rio de Janeiro / RJ – CEP 22020-001
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                <a
                  href="tel:+5521998667979"
                  className="text-background/80 hover:text-background transition-colors text-xs sm:text-sm"
                >
                  (21) 99866-7979
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                <a
                  href="mailto:cerocopacabana@gmail.com"
                  className="text-background/80 hover:text-background transition-colors text-xs sm:text-sm break-all"
                >
                  cerocopacabana@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                <a
                  href="https://wa.me/5521998667979?text=Ol%C3%A1%20Dr.%20Marcell%2C%20gostaria%20de%20agendar%20uma%20consulta."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-background/80 hover:text-background transition-colors text-xs sm:text-sm"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          {/* Credentials */}
          <div>
            <h3 className="font-semibold text-base md:text-lg mb-3 md:mb-4">{t("footer.credentials")}</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <Award className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-background font-medium text-xs sm:text-sm">CRO-RJ 43846</div>
                  <div className="text-background/60 text-xs">{t("footer.cro_council")}</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Award className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-background font-medium text-xs sm:text-sm">{t("footer.specialist")}</div>
                  <div className="text-background/60 text-xs">{t("footer.abo")}</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Award className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-background font-medium text-xs sm:text-sm">{t("footer.military")}</div>
                  <div className="text-background/60 text-xs">{t("footer.army")}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 pt-6 md:pt-8 text-center text-xs sm:text-sm text-background/60 space-y-1">
          <p>© {currentYear} Fabiano Freitas · Todos os direitos reservados.</p>
          <p>Desenvolvido e mantido com foco em alta performance.</p>
        </div>
      </div>
    </footer>
  );
};
