import { useTranslation } from "react-i18next";
import { Clock, Instagram, Mail, MapPin, MessageCircle, Phone, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getWhatsAppHref, hasWhatsApp, showContactSection, siteConfig, telHref } from "@/lib/site";

type Row = { icon: LucideIcon; label: string; value: string; href?: string };

export const Contact = () => {
  const { t } = useTranslation();
  const whatsappHref = getWhatsAppHref(t("cta.whatsapp_message"));
  const { marcell, maria } = siteConfig.professionals;

  const rows: Row[] = [
    siteConfig.address && { icon: MapPin, label: t("contact.location"), value: siteConfig.address },
    siteConfig.phone && { icon: Phone, label: t("contact.phone"), value: siteConfig.phone, href: telHref() },
    siteConfig.email && { icon: Mail, label: t("contact.email"), value: siteConfig.email, href: `mailto:${siteConfig.email}` },
    { icon: Clock, label: t("contact.hours"), value: t("contact.hours_value") },
    siteConfig.instagram && {
      icon: Instagram,
      label: t("contact.instagram"),
      value: `@${siteConfig.instagram.replace(/^@/, "")}`,
      href: `https://instagram.com/${siteConfig.instagram.replace(/^@/, "")}`,
    },
  ].filter(Boolean) as Row[];

  const mapSrc = siteConfig.mapQuery
    ? `https://maps.google.com/maps?q=${encodeURIComponent(siteConfig.mapQuery)}&z=16&ie=UTF8&iwloc=B&output=embed`
    : "";

  if (!showContactSection) return null;

  return (
    <section id="contato" aria-labelledby="contato-title" className="section-pad">
      <div className="wrap">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <h2 id="contato-title" className="text-4xl text-foreground md:text-5xl">
              {t("contact.title")}
            </h2>
            <p className="mt-5 max-w-[46ch] text-lg text-muted-foreground">{t("contact.intro")}</p>

            {hasWhatsApp && (
              <Button asChild size="lg" className="mt-8 h-12 rounded-full bg-primary px-7 text-base text-primary-foreground shadow-medium hover:bg-primary-dark">
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5" aria-hidden="true" />
                  {t("contact.cta")}
                </a>
              </Button>
            )}

            <dl className="mt-10 divide-y divide-border border-y border-border">
              {rows.map((row) => (
                <div key={row.label} className="flex items-start gap-4 py-4">
                  <row.icon className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  <div className="min-w-0">
                    <dt className="text-sm text-muted-foreground">{row.label}</dt>
                    <dd className="break-words text-lg text-foreground">
                      {row.href ? (
                        <a href={row.href} target={row.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="underline decoration-primary/30 underline-offset-4 hover:decoration-primary">
                          {row.value}
                        </a>
                      ) : (
                        row.value
                      )}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>

            <div className="mt-8 rounded-2xl bg-primary px-6 py-5 text-primary-foreground shadow-medium">
              <p className="text-sm text-primary-foreground/80">{t("contact.registry")}</p>
              <ul className="mt-2 space-y-1">
                {[marcell, maria].map((p) => (
                  <li key={p.name} className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <span className="font-display text-lg">{p.name}</span>
                    <span className="font-medium">{p.cro}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 border-t border-white/20 pt-2 text-xs text-primary-foreground/75">{t("contact.council")}</p>
            </div>
          </div>

          {mapSrc && (
            <div className="h-80 overflow-hidden rounded-[2rem] border border-border shadow-medium lg:col-span-6 lg:h-auto lg:min-h-[520px]">
              <iframe
                title={t("contact.map_title")}
                src={mapSrc}
                width="100%"
                height="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
