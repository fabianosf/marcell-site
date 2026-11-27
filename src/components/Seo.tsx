import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { getMapsUrl, hasReviewItems, hasReviewStats, phoneE164, siteConfig } from "@/lib/site";

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

const removeJsonLd = (id: string) => {
  document.getElementById(id)?.remove();
};

const upsertMetaByProperty = (property: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const upsertMetaByName = (name: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

type SeoProps = {
  /** Página 404 fora do roteador de seções. */
  variant?: "default" | "notfound";
};

/** Título, descrição, canonical por rota e dados estruturados (Google). */
export const Seo = ({ variant = "default" }: SeoProps) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const { pathname } = useLocation();

  useEffect(() => {
    const origin = siteConfig.siteUrl.replace(/\/$/, "");
    const homeUrl = `${origin}/`;
    const privacyUrl = `${origin}/privacidade`;
    const isHome = pathname === "/" || pathname === "";
    const isPrivacy = pathname === "/privacidade";
    const isNotFound = variant === "notfound";
    const pageUrl = isPrivacy ? privacyUrl : isNotFound ? `${origin}${pathname}` : homeUrl;

    const title = isNotFound ? t("meta.notfound_title") : isPrivacy ? t("meta.privacy_title") : t("meta.title");
    const description = isNotFound ? t("meta.notfound_description") : isPrivacy ? t("meta.privacy_description") : t("meta.description");
    const ogLocale = lang.startsWith("en") ? "en_US" : lang.startsWith("es") ? "es_ES" : "pt_BR";
    const ogImage = `${origin}/og-image.jpg`;

    document.documentElement.lang = lang.startsWith("en") ? "en" : lang.startsWith("es") ? "es" : "pt-BR";
    document.title = title;
    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[property="og:url"]', "content", pageUrl);
    setMeta('meta[name="twitter:title"]', "content", title);
    setMeta('meta[name="twitter:description"]', "content", description);
    setMeta('meta[property="og:locale"]', "content", ogLocale);
    upsertMetaByProperty("og:image", ogImage);
    upsertMetaByProperty("og:image:width", "1200");
    upsertMetaByProperty("og:image:height", "630");
    setMeta('meta[name="twitter:image"]', "content", ogImage);
    upsertMetaByName("twitter:image:alt", t("meta.og_image_alt"));
    setMeta(
      'meta[name="robots"]',
      "content",
      isNotFound
        ? "noindex, follow"
        : isHome || isPrivacy
          ? "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
          : "noindex, follow",
    );

    const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = isNotFound ? homeUrl : pageUrl;

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
    if (mapsUrl) dentist.hasMap = mapsUrl;
    const sameAs: string[] = [];
    if (mapsUrl) sameAs.push(mapsUrl);
    const ig = siteConfig.instagram.trim().replace(/^@/, "");
    if (ig) sameAs.push(`https://www.instagram.com/${ig}`);
    if (sameAs.length) dentist.sameAs = sameAs;
    if (hasReviewStats) {
      dentist.aggregateRating = {
        "@type": "AggregateRating",
        ratingValue: siteConfig.reviews.ratingValue,
        reviewCount: siteConfig.reviews.reviewCount,
        bestRating: 5,
        worstRating: 1,
      };
    }

    if (isPrivacy || isNotFound) {
      removeJsonLd("ld-dentist");
      removeJsonLd("ld-faq");
      removeJsonLd("ld-reviews");
      return;
    }

    upsertJsonLd("ld-dentist", dentist);

    if (hasReviewItems) {
      upsertJsonLd("ld-reviews", {
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: siteConfig.reviews.items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Review",
            author: { "@type": "Person", name: item.author },
            reviewRating: {
              "@type": "Rating",
              ratingValue: item.rating,
              bestRating: 5,
              worstRating: 1,
            },
            reviewBody: item.text,
            ...(item.date ? { datePublished: item.date } : {}),
            itemReviewed: { "@id": `${origin}/#dentist` },
          },
        })),
      });
    } else {
      removeJsonLd("ld-reviews");
    }

    upsertJsonLd("ld-faq", {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }, [t, lang, pathname, variant]);

  return null;
};
