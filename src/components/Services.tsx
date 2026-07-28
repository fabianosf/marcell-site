import { useTranslation } from "react-i18next";
import { Activity, Shield, Smile, Sparkles, Wrench, Drill, Microscope, ScanLine } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import drMarcellRadiografia from "@/assets/dr-marcell-radiografia.jpg";

const SERVICE_ICONS = [Microscope, Drill, ScanLine, Activity, Wrench, Smile, Sparkles, Shield];
const FEATURED_INDICES = new Set([0, 1, 2]);

export const Services = () => {
  const { t } = useTranslation();

  const services = t("services.list", { returnObjects: true }) as Array<{
    title: string;
    description: string;
  }>;

  return (
    <section id="servicos" className="py-12 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-4">
            {t("services.title")}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("services.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10 md:mb-16">
          {services.map((service, index) => {
            const Icon = SERVICE_ICONS[index];
            const featured = FEATURED_INDICES.has(index);
            return (
              <Card
                key={index}
                className={`border-none shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1 ${
                  featured ? "ring-2 ring-primary/30 bg-primary/5" : ""
                }`}
              >
                <CardHeader>
                  <div
                    className={`w-14 h-14 rounded-lg flex items-center justify-center mb-4 ${
                      featured ? "bg-gradient-primary" : "bg-muted"
                    }`}
                  >
                    <Icon className={`h-7 w-7 ${featured ? "text-white" : "text-primary"}`} />
                  </div>
                  <CardTitle className="text-xl">
                    {service.title}
                    {featured && (
                      <span className="ml-2 text-xs font-medium text-primary">
                        {t("services.specialty_badge")}
                      </span>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Results Section */}
        <div className="bg-gradient-primary rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-12 shadow-large">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
            <div className="text-white">
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
                {t("services.cta_title")}
              </h3>
              <p className="text-base sm:text-lg opacity-90 mb-4 sm:mb-6">
                {t("services.cta_desc")}
              </p>
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                <div>
                  <div className="text-3xl sm:text-4xl font-bold mb-1">98%</div>
                  <div className="text-xs sm:text-sm opacity-80">{t("services.stat_satisfaction")}</div>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-bold mb-1">1000+</div>
                  <div className="text-xs sm:text-sm opacity-80">{t("services.stat_canals")}</div>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-bold mb-1">13+</div>
                  <div className="text-xs sm:text-sm opacity-80">{t("services.stat_years")}</div>
                </div>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src={drMarcellRadiografia}
                alt="Dr. Marcell Parente utilizando equipamento de radiografia digital"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
