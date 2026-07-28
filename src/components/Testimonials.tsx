import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import testimonial1 from "@/assets/testimonial-1.jpg";
import testimonial2 from "@/assets/testimonial-2.jpg";
import testimonial3 from "@/assets/testimonial-3.jpg";

const TESTIMONIAL_IMAGES = [testimonial1, testimonial2, testimonial3];

export const Testimonials = () => {
  const { t } = useTranslation();

  const testimonials = t("testimonials.list", { returnObjects: true }) as Array<{
    name: string;
    text: string;
  }>;

  return (
    <section id="depoimentos" className="py-12 md:py-24 bg-gradient-soft">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-4">
            {t("testimonials.title")}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("testimonials.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="border-none shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={TESTIMONIAL_IMAGES[index]}
                    alt={`Foto de ${testimonial.name}`}
                    className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
                  />
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{t("testimonials.patient")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
