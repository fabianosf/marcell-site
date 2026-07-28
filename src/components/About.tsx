import { useTranslation } from "react-i18next";
import { Award, Heart, GraduationCap, Microscope, Shield } from "lucide-react";
import dentistImage from "@/assets/dr-marcell-profile.jpg";
import { Card, CardContent } from "@/components/ui/card";

const FEATURE_ICONS = [GraduationCap, Microscope, Heart, Shield];

export const About = () => {
  const { t } = useTranslation();

  const features = t("about.features", { returnObjects: true }) as Array<{
    title: string;
    description: string;
  }>;

  const qualifications = t("about.qualifications", { returnObjects: true }) as Array<{
    period: string;
    title: string;
    institution: string;
  }>;

  return (
    <section id="sobre" className="py-12 md:py-24 bg-gradient-soft">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Image */}
          <div className="relative pb-10 md:pb-0">
            <div className="relative rounded-2xl overflow-hidden shadow-large">
              <img
                src={dentistImage}
                alt="Dr. Marcell Parente - Especialista em Endodontia e Implantodontia"
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Badge — fixed positioning so it never overflows horizontally */}
            <div className="absolute bottom-0 right-0 md:-bottom-6 md:-right-6 bg-primary text-primary-foreground px-5 py-4 md:p-6 rounded-xl shadow-medium">
              <div className="text-3xl md:text-4xl font-bold">{t("about.years_value")}</div>
              <div className="text-xs md:text-sm">{t("about.years_label")}</div>
            </div>
          </div>

          {/* Content */}
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6">
              {t("about.title")}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-4 leading-relaxed">
              {t("about.p1")}
            </p>
            <p className="text-base sm:text-lg text-muted-foreground mb-6 leading-relaxed">
              {t("about.p2")}
            </p>

            {/* Academic Background */}
            <div className="mb-6 sm:mb-8 space-y-3 sm:space-y-4">
              <h3 className="text-base sm:text-lg font-semibold text-foreground flex items-center gap-2">
                <Award className="h-5 w-5 text-primary flex-shrink-0" />
                {t("about.academic_title")}
              </h3>
              {qualifications.map((qual, index) => (
                <div key={index} className="border-l-2 border-primary pl-4 py-2">
                  {qual.period && (
                    <div className="text-xs sm:text-sm text-primary font-medium">{qual.period}</div>
                  )}
                  <div className="font-semibold text-foreground text-sm sm:text-base">{qual.title}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">{qual.institution}</div>
                </div>
              ))}
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {features.map((feature, index) => {
                const Icon = FEATURE_ICONS[index];
                return (
                  <Card key={index} className="border-none shadow-soft hover:shadow-medium transition-all duration-300">
                    <CardContent className="p-3 sm:p-4">
                      <Icon className="h-7 w-7 sm:h-8 sm:w-8 text-primary mb-2 sm:mb-3" />
                      <h3 className="font-semibold text-foreground mb-1 text-sm sm:text-base">{feature.title}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
