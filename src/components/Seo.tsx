import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { siteConfig } from "@/lib/site";

const setMeta = (selector: string, attr: "content", value: string) => {
  const el = document.head.querySelector<HTMLMetaElement>(selector);
  if (el) el.setAttribute(attr, value);
};

/** Título, descrição e dados estruturados (Google) no idioma atual. */
export const Seo = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  useEffect(() => {
    document.title = t("meta.title");
    setMeta('meta[name="description"]', "content", t("meta.description"));
    setMeta('meta[property="og:title"]', "content", t("meta.title"));
    setMeta('meta[property="og:description"]', "content", t("meta.description"));
    setMeta('meta[name="twitter:title"]', "content", t("meta.title"));
    setMeta('meta[name="twitter:description"]', "content", t("meta.description"));

    const faq = t("faq.list", { returnObjects: true }) as Array<{ q: string; a: string }>;
    const origin = window.location.origin;

    const person = (p: { name: string; cro: string }, jobTitle: string) => ({
      "@type": "Person",
      name: p.name,
      jobTitle,
      hasCredential: { "@type": "EducationalOccupationalCredential", credentialCategory: "Professional License", name: p.cro },
    });

    const dentist: Record<string, unknown> = {
      "@context": "https://schema.org",
      "@type": "Dentist",
      name: siteConfig.clinicFullName,
      description: t("meta.description"),
      image: `${origin}/og-image.jpg`,
      url: origin,
      medicalSpecialty: ["Dentistry", "Endodontics", "Dental Implants"],
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "00:00",
        closes: "23:59",
      },
      employee: [
        person(siteConfig.professionals.marcell, t("hero.marcell_role")),
        person(siteConfig.professionals.maria, t("hero.maria_role")),
      ],
    };
    if (siteConfig.phone) dentist.telephone = siteConfig.phone;
    if (siteConfig.email) dentist.email = siteConfig.email;
    if (siteConfig.address)
      dentist.address = {
        "@type": "PostalAddress",
        streetAddress: "Av. Nossa Senhora de Copacabana, 330, sala 707",
        addressLocality: "Rio de Janeiro",
        addressRegion: "RJ",
        postalCode: "22020-001",
        addressCountry: "BR",
      };
    if (siteConfig.instagram) dentist.sameAs = [`https://instagram.com/${siteConfig.instagram.replace(/^@/, "")}`];

    const faqPage = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    };

    const scripts = [dentist, faqPage].map((data) => {
      const s = document.createElement("script");
      s.type = "application/ld+json";
      s.text = JSON.stringify(data);
      document.head.appendChild(s);
      return s;
    });
    return () => scripts.forEach((s) => s.remove());
  }, [t, lang]);

  return null;
};
