import { useState } from "react";
import { useTranslation } from "react-i18next";
import { X } from "lucide-react";
import drMarcellProfile from "@/assets/dr-marcell-profile.jpg";
import drMarcellAtendimento from "@/assets/dr-marcell-atendimento.jpg";
import drMarcellTomografia from "@/assets/dr-marcell-tomografia.jpg";
import drMarcellRadiografia from "@/assets/dr-marcell-radiografia.jpg";
import drMarcellDiagnostico from "@/assets/dr-marcell-diagnostico.jpg";
import drMarcellConsultorio from "@/assets/dr-marcell-consultorio.jpg";
import drMarcellTrabalho from "@/assets/dr-marcell-trabalho.jpg";

const GALLERY_IMAGES = [
  drMarcellProfile,
  drMarcellAtendimento,
  drMarcellTomografia,
  drMarcellRadiografia,
  drMarcellDiagnostico,
  drMarcellConsultorio,
  drMarcellTrabalho,
];

export const Gallery = () => {
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const items = t("gallery.items", { returnObjects: true }) as Array<{
    title: string;
    category: string;
  }>;

  return (
    <section id="galeria" className="py-12 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-16 animate-fade-in">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-4">
            {t("gallery.title")}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("gallery.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-7xl mx-auto">
          {items.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl cursor-pointer aspect-[4/3] bg-muted"
              onClick={() => setSelectedImage(index)}
            >
              <img
                src={GALLERY_IMAGES[index]}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 sm:p-6">
                <span className="text-primary text-xs sm:text-sm font-semibold mb-1 sm:mb-2">
                  {item.category}
                </span>
                <h3 className="text-foreground text-base sm:text-xl font-bold">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {selectedImage !== null && (
          <div
            className="fixed inset-0 bg-background/95 z-50 flex items-center justify-center p-4 animate-fade-in"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
              onClick={() => setSelectedImage(null)}
              aria-label={t("gallery.close")}
            >
              <X className="h-6 w-6 text-foreground" />
            </button>
            <div className="max-w-5xl w-full animate-scale-in">
              <img
                src={GALLERY_IMAGES[selectedImage]}
                alt={items[selectedImage]?.title}
                className="w-full h-auto rounded-xl shadow-large max-h-[70vh] object-contain"
                onClick={(e) => e.stopPropagation()}
              />
              <div className="text-center mt-4 sm:mt-6">
                <span className="text-primary text-sm font-semibold">
                  {items[selectedImage]?.category}
                </span>
                <h3 className="text-foreground text-lg sm:text-2xl font-bold mt-1 sm:mt-2">
                  {items[selectedImage]?.title}
                </h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
