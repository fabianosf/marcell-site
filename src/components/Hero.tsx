import { useTranslation } from "react-i18next";
import { Check, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getWhatsAppHref, siteConfig, telHref } from "@/lib/site";
import { scrollToSection } from "@/lib/sections";
import marcell from "@/assets/marcell/profile.webp";
import maria from "@/assets/maria/retrato.webp";

export const Hero = () => {
  const { t } = useTranslation();
  const href = getWhatsAppHref(t("cta.whatsapp_message"));
  const points = t("hero.points", { returnObjects: true }) as string[];

  const portraits = [
    { src: marcell, alt: t("gallery.photos.marcell_profile.alt"), name: siteConfig.professionals.marcell.name, role: t("hero.marcell_role"), pos: "object-[50%_30%]", offset: "" },
    { src: maria, alt: t("gallery.photos.maria_retrato.alt"), name: siteConfig.professionals.maria.shortName, role: t("hero.maria_role"), pos: "object-[50%_18%]", offset: "mt-10 md:mt-16" },
  ];

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden pb-16 pt-28 md:pb-24 md:pt-36">
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 top-10 h-[620px] w-[620px] rounded-full bg-secondary/60 blur-3xl" />

      <div className="wrap relative grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <p className="hero-in mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card px-4 py-1.5 text-sm font-medium text-primary" style={{ ["--d" as string]: "50ms" }}>
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-primary" />
            {t("hero.badge")}
          </p>

          <h1 id="hero-title" className="hero-in text-[clamp(2.4rem,5.2vw,4.3rem)] text-foreground" style={{ ["--d" as string]: "150ms" }}>
            {t("hero.title")}
          </h1>

          <p className="hero-in mt-6 max-w-[50ch] text-lg leading-relaxed text-muted-foreground md:text-xl" style={{ ["--d" as string]: "300ms" }}>
            {t("hero.subtitle")}
          </p>

          <div className="hero-in mt-9 flex flex-col gap-3 sm:flex-row" style={{ ["--d" as string]: "420ms" }}>
            <Button asChild size="lg" className="h-12 rounded-full bg-primary px-7 text-base text-primary-foreground shadow-medium hover:bg-primary-dark">
              <a href={href} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" aria-hidden="true" />
                {t("nav.agendar")}
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 rounded-full border-foreground/25 bg-transparent px-7 text-base text-foreground hover:bg-card">
              <a href={telHref()}>
                <Phone className="mr-2 h-5 w-5" aria-hidden="true" />
                {t("cta.call")}
              </a>
            </Button>
          </div>

          <ul className="hero-in mt-8 flex flex-col gap-2 text-[15px] text-foreground/80" style={{ ["--d" as string]: "520ms" }}>
            {points.map((p) => (
              <li key={p} className="flex items-center gap-2">
                <Check className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>

          <button type="button" onClick={() => scrollToSection("equipe")} className="hero-in mt-6 text-[15px] font-medium text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary" style={{ ["--d" as string]: "600ms" }}>
            {t("hero.cta_secondary")}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:col-span-6">
          {portraits.map((p, i) => (
            <figure key={p.name} className={`hero-in relative m-0 ${p.offset}`} style={{ ["--d" as string]: `${250 + i * 180}ms` }}>
              <img
                src={p.src}
                alt={p.alt}
                width={960}
                height={1280}
                fetchPriority="high"
                className={`aspect-[3/4.3] w-full rounded-[1.5rem] object-cover shadow-large ring-1 ring-foreground/10 ${p.pos}`}
              />
              <figcaption className="absolute inset-x-2 bottom-2 rounded-2xl bg-primary-dark/90 px-3.5 py-3 text-primary-foreground backdrop-blur-sm sm:inset-x-3 sm:bottom-3 sm:px-4">
                <span className="block font-display text-base leading-tight sm:text-xl">{p.name}</span>
                <span className="mt-0.5 block text-xs leading-snug text-primary-foreground/80 sm:text-sm">{p.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};
