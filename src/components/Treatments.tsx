import { useTranslation } from "react-i18next";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getWhatsAppHref, siteConfig, type ProfessionalId } from "@/lib/site";
import { ShadeGuide } from "@/components/ShadeGuide";

type Group = {
  title: string;
  who: "" | ProfessionalId;
  intro: string;
  items: Array<{ title: string; description: string }>;
};

export const Treatments = () => {
  const { t } = useTranslation();
  const groups = t("treatments.groups", { returnObjects: true }) as Group[];
  const href = getWhatsAppHref(t("cta.whatsapp_message"));

  return (
    <section id="tratamentos" aria-labelledby="tratamentos-title" className="section-pad bg-card">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <h2 id="tratamentos-title" className="text-4xl text-foreground md:text-5xl">
              {t("treatments.title")}
            </h2>
            <p className="mt-5 max-w-[40ch] text-lg text-muted-foreground">{t("treatments.intro")}</p>
            <p className="mt-6 max-w-[40ch] text-sm text-muted-foreground">{t("treatments.note")}</p>
          </div>
        </div>

        <div className="space-y-16 lg:col-span-8">
          {groups.map((group) => {
            const isMaria = group.who === "maria";
            const tag = group.who ? siteConfig.professionals[group.who].shortName : "";
            return (
              <div key={group.title}>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <h3 className="text-3xl text-foreground md:text-4xl">{group.title}</h3>
                  {tag && (
                    <span className={`rounded-full px-3 py-1 text-sm font-medium ${isMaria ? "bg-maria-soft text-maria" : "bg-secondary text-secondary-foreground"}`}>
                      {tag}
                    </span>
                  )}
                </div>
                {group.intro && <p className="mt-3 max-w-[60ch] text-muted-foreground">{group.intro}</p>}
                {isMaria && (
                  <div className="mt-8">
                    <ShadeGuide />
                  </div>
                )}

                <ul className="mt-6">
                  {group.items.map((item) => (
                    <li key={item.title} className="border-t border-border py-6 first:border-t-0 first:pt-2">
                      <h4 className="text-xl text-foreground md:text-2xl">{item.title}</h4>
                      <p className="mt-2 max-w-[62ch] text-muted-foreground">{item.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      <div className="wrap mt-20">
        <div className="flex flex-col items-start justify-between gap-6 rounded-[2rem] bg-primary p-8 text-primary-foreground md:flex-row md:items-center md:p-12">
          <div>
            <h3 className="max-w-[22ch] text-3xl md:text-4xl">{t("treatments.cta_title")}</h3>
            <p className="mt-3 max-w-[52ch] text-primary-foreground/85">{t("treatments.cta_text")}</p>
          </div>
          <Button asChild size="lg" className="h-12 shrink-0 rounded-full bg-background px-7 text-base text-primary hover:bg-secondary">
            <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-5 w-5" aria-hidden="true" />
              {t("nav.agendar")}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};
