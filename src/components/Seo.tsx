import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { getMapsUrl, hasReviewStats, phoneE164, siteConfig } from "@/lib/site";

const setMeta = (selector: string, attr: "content", value: string) => {
  const el = document.head.querySelector<HTMLMetaElement>(selector);
  if (el) el.setAttribute(attr, value);
};

const upsertJsonLd = (id: string, data: Record<string, unknown>) => {
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = id;
    document.head.appendChild(el);
  }
  el.text = JSON.stringify(data);
};

/** Título, descrição, canonical por rota e dados estruturados (Google). */
export const Seo = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const { pathname } = useLocation();

  useEffect(() => {
    const origin = siteConfig.siteUrl.replace(/\/$/, "");
    // Uma página SPA: canônico sempre a home (evita "cópia / canônica diferente" no GSC).
    const homeUrl = `${origin}/`;
    const isHome = pathname === "/" || pathname === "";

    document.documentElement.lang = lang.startsWith("en") ? "en" : lang.startsWith("es") ? "es" : "pt-BR";
    document.title = t("meta.title");
    setMeta('meta[name="description"]', "content", t("meta.description"));
    setMeta('meta[property="og:title"]', "content", t("meta.title"));
    setMeta('meta[property="og:description"]', "content", t("meta.description"));
    setMeta('meta[property="og:url"]', "content", homeUrl);
    setMeta('meta[name="twitter:title"]', "content", t("meta.title"));
    setMeta('meta[name="twitter:description"]', "content", t("meta.description"));
    // Rotas de seção = mesmo conteúdo da home → não indexar como páginas distintas.
    setMeta(
      'meta[name="robots"]',
      "content",
      isHome
        ? "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        : "noindex, follow",
    );

    const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = homeUrl;

    const faq = t("faq.list", { returnObjects: true }) as Array<{ q: string; a: string }>;
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
      "@id": `${origin}/#dentist`,
      name: siteConfig.clinicFullName,
      alternateName: `${siteConfig.clinicName} Copacabana`,
      description: t("meta.description"),
      image: `${origin}/og-image.jpg`,
      logo: `${origin}/favicon.png`,
      url: origin,
      priceRange: "$$",
      medicalSpecialty: ["Dentistry", "Endodontics", "DentalImplant", "CosmeticDentistry"],
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
      knowsAbout: [
        "tratamento de canal",
        "endodontia",
        "implante dentário",
        "facetas de porcelana",
        "facetas em resina",
        "clareamento dental",
        "emergência dentária 24h",
        "dentista Copacabana",
      ],
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
      dentist.sameAs = [mapsUrl];
    }
    if (hasReviewStats) {
      dentist.aggregateRating = {
        "@type": "AggregateRating",
        ratingValue: siteConfig.reviews.ratingValue,
        reviewCount: siteConfig.reviews.reviewCount,
        bestRating: 5,
        worstRating: 1,
      };
    }

    upsertJsonLd("ld-dentist", dentist);
    upsertJsonLd("ld-faq", {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }, [t, lang, pathname]);

  return null;
};
