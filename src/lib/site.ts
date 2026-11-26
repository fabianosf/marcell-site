/**
 * ============================================================
 *  DADOS DO SITE — edite SOMENTE este arquivo para atualizar
 *  telefone, e-mail, endereço, CRO e currículo dos profissionais.
 * ============================================================
 * Campos vazios ("") não aparecem no site.
 */
export const siteConfig = {
  clinicName: "CERO",
  clinicFullName: "CERO — Clínica de Emergências e Reabilitação Oral",
  /** Domínio canônico (schema, Open Graph, Search Console). */
  siteUrl: "https://www.cerocopacabana.com.br",

  /** WhatsApp só com números, DDI + DDD. */
  whatsapp: "5521998667979",
  phone: "(21) 99866-7979",
  email: "cerocopacabana@gmail.com",
  /** Usuário do Instagram, sem @. */
  instagram: "",

  address: "Av. Nossa Senhora de Copacabana, 330, sala 707, Copacabana, Rio de Janeiro / RJ, CEP 22020-001",
  /** Partes do endereço para schema / NAP. */
  postalAddress: {
    streetAddress: "Av. Nossa Senhora de Copacabana, 330, sala 707",
    addressLocality: "Rio de Janeiro",
    addressRegion: "RJ",
    addressNeighborhood: "Copacabana",
    postalCode: "22020-001",
    addressCountry: "BR",
  },
  /** Coordenadas aproximadas do endereço (SEO local / schema). */
  geo: {
    latitude: -22.9678,
    longitude: -43.1855,
  },
  /** Texto usado no mapa embutido. */
  mapQuery: "Av. Nossa Senhora de Copacabana, 330, Copacabana, Rio de Janeiro, RJ",
  /**
   * Link oficial do Google Meu Negócio / Maps (cole o link da ficha quando tiver).
   * Hoje aponta para o endereço no Maps; troque pelo g.page / maps/place da CERO.
   */
  googleMapsUrl: "https://maps.app.goo.gl/PQgrRyyxVunk6MpC8",

  /**
   * Avaliações Google exibidas no site.
   * Não invente textos: cole só reviews reais do Meu Negócio.
   * ratingValue/reviewCount vazios (0) escondem a média no schema.
   */
  reviews: {
    ratingValue: 0,
    reviewCount: 0,
    items: [] as Array<{ author: string; rating: number; text: string; date?: string }>,
  },

  professionals: {
    marcell: {
      name: "Dr. Marcell Parente",
      shortName: "Dr. Marcell Parente",
      cro: "CRO-RJ 43846",
      email: "",
    },
    maria: {
      name: "Dra. Maria Eugênia Ferreira Buta",
      shortName: "Dra. Maria Eugênia",
      cro: "CRO-RJ 42.128",
      email: "mferreirabuta@gmail.com",
    },
  },

  developer: {
    name: "Fabiano Sousa de Freitas",
    url: "https://fabianosf.com",
  },
};

export type ProfessionalId = keyof typeof siteConfig.professionals;

export const hasWhatsApp = Boolean(siteConfig.whatsapp.trim());

export const hasContact = Boolean(
  siteConfig.whatsapp || siteConfig.phone || siteConfig.email || siteConfig.address || siteConfig.instagram,
);
export const showContactSection = hasContact || import.meta.env.DEV;

export const getWhatsAppHref = (message: string) =>
  hasWhatsApp ? `https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(message)}` : "#contato";

export const telHref = () => `tel:+${siteConfig.whatsapp.replace(/\D/g, "")}`;

/** Telefone E.164 para schema e links. */
export const phoneE164 = () => {
  const digits = (siteConfig.whatsapp || siteConfig.phone).replace(/\D/g, "");
  return digits ? `+${digits}` : "";
};

/** URL do Google Maps (perfil GBP se preenchido, senão busca pelo endereço). */
export const getMapsUrl = () => {
  const gbp = siteConfig.googleMapsUrl.trim();
  if (gbp) return gbp;
  if (!siteConfig.mapQuery.trim()) return "";
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.mapQuery)}`;
};

export const hasReviewStats =
  siteConfig.reviews.ratingValue > 0 && siteConfig.reviews.reviewCount > 0;

export const hasReviewItems = siteConfig.reviews.items.length > 0;
