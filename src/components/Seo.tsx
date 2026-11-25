import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getMapsUrl, phoneE164, siteConfig } from "@/lib/site";

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
    const origin = siteConfig.siteUrl.replace(/\/$/, "");
    const mapsUrl = getMapsUrl();
    const telephone = phoneE164();

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
      alternateName: siteConfig.clinicName,
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
      areaServed: [
        { "@type": "Place", name: siteConfig.postalAddress.addressNeighborhood },
        { "@type": "City", name: siteConfig.postalAddress.addressLocality },
      ],
      geo: {
        "@type": "GeoCoordinates",
        latitude: siteConfig.geo.latitude,
        longitude: siteConfig.geo.longitude,
      },
    };
    if (telephone) dentist.telephone = telephone;
    if (siteConfig.email) dentist.email = siteConfig.email;
    if (siteConfig.address) {
      dentist.address = {
        "@type": "PostalAddress",
        streetAddress: siteConfig.postalAddress.streetAddress,
        addressLocality: siteConfig.postalAddress.addressLocality,
        addressRegion: siteConfig.postalAddress.addressRegion,
        postalCode: siteConfig.postalAddress.postalCode,
        addressCountry: siteConfig.postalAddress.addressCountry,
      };
    }
    if (mapsUrl) {
      dentist.hasMap = mapsUrl;
    }

    const sameAs: string[] = [];
    if (mapsUrl) sameAs.push(mapsUrl);
    if (siteConfig.instagram) sameAs.push(`https://instagram.com/${siteConfig.instagram.replace(/^@/, "")}`);
    if (sameAs.length) dentist.sameAs = sameAs;

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
