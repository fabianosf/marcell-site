import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_URL =
  "https://wa.me/5521998667979?text=Ol%C3%A1%20Dr.%20Marcell%2C%20gostaria%20de%20agendar%20uma%20consulta.";

const CONTACT_ICONS = [MapPin, Phone, Mail, Clock];

export const Contact = () => {
  const { t } = useTranslation();

  const contactInfo = [
    {
      icon: MapPin,
      titleKey: "contact.location_label",
      content: t("contact.location_value"),
      link: undefined,
    },
    {
      icon: Phone,
      titleKey: "contact.phone_label",
      content: "(21) 99866-7979",
      link: "tel:+5521998667979",
    },
    {
      icon: Mail,
      titleKey: "contact.email_label",
      content: "cerocopacabana@gmail.com",
      link: "mailto:cerocopacabana@gmail.com",
    },
    {
      icon: Clock,
      titleKey: "contact.hours_label",
      content: t("contact.hours_value"),
      link: undefined,
    },
  ];

  return (
    <section id="contato" className="py-12 md:py-24 bg-gradient-soft">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-4">
            {t("contact.title")}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
          {/* Google Maps */}
          <div className="rounded-2xl overflow-hidden shadow-medium border border-border h-64 sm:h-80 lg:h-[520px]">
            <iframe
              title="Localização do consultório — Dr. Marcell Parente"
              src="https://maps.google.com/maps?q=Av.+Nossa+Senhora+de+Copacabana,+330,+Copacabana,+Rio+de+Janeiro,+RJ&t=&z=16&ie=UTF8&iwloc=B&output=embed"
              width="100%"
              height="100%"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
              className="w-full h-full"
            />
          </div>

          {/* Info + CTA */}
          <div className="flex flex-col gap-3 lg:h-[520px]">
            {contactInfo.map((info, index) => (
              <Card
                key={index}
                className="border-none shadow-soft hover:shadow-medium transition-all duration-300 flex-1 flex items-center min-h-[56px]"
              >
                <CardContent className="p-3 sm:p-4 flex items-center gap-3 w-full">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0">
                    <info.icon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-foreground text-xs sm:text-sm mb-0.5">
                      {t(info.titleKey)}
                    </h3>
                    {info.link ? (
                      <a
                        href={info.link}
                        className="text-muted-foreground hover:text-primary transition-colors text-xs sm:text-sm leading-snug break-all"
                      >
                        {info.content}
                      </a>
                    ) : (
                      <p className="text-muted-foreground text-xs sm:text-sm leading-snug">
                        {info.content}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* CTA WhatsApp */}
            <Button
              asChild
              size="lg"
              className="w-full bg-green-500 hover:bg-green-600 text-white text-sm sm:text-base flex-shrink-0"
            >
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" />
                {t("contact.cta")}
              </a>
            </Button>

            {/* CRO Badge */}
            <div className="bg-primary text-primary-foreground rounded-2xl px-4 py-3 text-center shadow-medium flex-shrink-0">
              <div className="text-xs uppercase tracking-wider mb-0.5 opacity-90">
                {t("contact.cro_label")}
              </div>
              <div className="text-xl sm:text-2xl font-bold leading-tight">CRO-RJ 43846</div>
              <div className="text-xs opacity-90">{t("contact.cro_council")}</div>
              <div className="text-xs opacity-75 border-t border-white/20 pt-1 mt-1">
                {t("contact.cro_specialty")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
