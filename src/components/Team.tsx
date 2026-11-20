import { useTranslation } from "react-i18next";
import { Award, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getWhatsAppHref, siteConfig, type ProfessionalId } from "@/lib/site";
import marcell from "@/assets/marcell/profile.webp";
import maria from "@/assets/maria/retrato.webp";

type Qual = { period: string; title: string; institution: string };

const PROFILES: Array<{ id: ProfessionalId; photo: string; photoKey: string; pos: string; accent: string; accentBg: string; accentBorder: string }> = [
  { id: "marcell", photo: marcell, photoKey: "marcell_profile", pos: "object-[50%_30%]", accent: "text-primary", accentBg: "bg-primary text-primary-foreground hover:bg-primary-dark", accentBorder: "border-primary" },
  { id: "maria", photo: maria, photoKey: "maria_retrato", pos: "object-[50%_18%]", accent: "text-maria", accentBg: "bg-maria text-primary-foreground hover:bg-maria/90", accentBorder: "border-maria" },
];

export const Team = () => {
  const { t } = useTranslation();

  return (
    <section id="equipe" aria-labelledby="equipe-title" className="section-pad">
      <div className="wrap">
        <div className="max-w-3xl">
          <h2 id="equipe-title" className="text-4xl text-foreground md:text-5xl">
            {t("team.title")}
          </h2>
          <p className="mt-5 max-w-[60ch] text-lg text-muted-foreground">{t("team.intro")}</p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-2 lg:gap-10">
          {PROFILES.map((p) => {
            const pro = siteConfig.professionals[p.id];
            const quals = t(`team.${p.id}.qualifications`, { returnObjects: true }) as Qual[];
            const waHref = getWhatsAppHref(t(`cta.whatsapp_${p.id}`));
            const email = pro.email;
            return (
              <article key={p.id} className={`flex flex-col overflow-hidden rounded-[2rem] border-t-4 bg-card shadow-medium ${p.accentBorder}`}>
                <img
                  src={p.photo}
                  alt={t(`gallery.photos.${p.photoKey}.alt`)}
                  width={960}
                  height={1280}
                  loading="lazy"
                  className={`aspect-[4/3.2] w-full object-cover ${p.pos}`}
                />
                <div className="flex flex-1 flex-col p-7 md:p-9">
                  <h3 className="text-3xl text-foreground md:text-4xl">{pro.name}</h3>
                  <p className={`mt-2 text-lg font-medium ${p.accent}`}>{t(`team.${p.id}.role`)}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{pro.cro}</p>

                  <p className="mt-6 text-foreground/85">{t(`team.${p.id}.p1`)}</p>
                  <p className="mt-3 text-muted-foreground">{t(`team.${p.id}.p2`)}</p>

                  <h4 className="mt-8 flex items-center gap-2 font-display text-lg text-foreground">
                    <Award className={`h-5 w-5 ${p.accent}`} aria-hidden="true" />
                    {t("team.academic_title")}
                  </h4>
                  <ul className="mt-3 space-y-3">
                    {quals.map((q) => (
                      <li key={q.title} className={`border-l-2 pl-4 ${p.accentBorder}`}>
                        {q.period && <p className={`text-sm font-medium ${p.accent}`}>{q.period}</p>}
                        <p className="font-medium text-foreground">{q.title}</p>
                        {q.institution && <p className="text-sm text-muted-foreground">{q.institution}</p>}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex flex-col gap-3 pt-8 sm:flex-row sm:items-center">
                    <Button asChild size="lg" className={`h-12 rounded-full px-6 text-base ${p.accentBg}`}>
                      <a href={waHref} target={waHref.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                        <MessageCircle className="mr-2 h-5 w-5" aria-hidden="true" />
                        {t(`team.${p.id}.cta`)}
                      </a>
                    </Button>
                    {email && (
                      <a href={`mailto:${email}`} className="inline-flex items-center gap-2 text-sm text-muted-foreground underline decoration-foreground/20 underline-offset-4 hover:text-foreground">
                        <Mail className="h-4 w-4" aria-hidden="true" />
                        {email}
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
