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

  /** WhatsApp só com números, DDI + DDD. */
  whatsapp: "5521998667979",
  phone: "(21) 99866-7979",
  email: "cerocopacabana@gmail.com",
  /** Usuário do Instagram, sem @. */
  instagram: "",

  address: "Av. Nossa Senhora de Copacabana, 330, sala 707, Copacabana, Rio de Janeiro / RJ, CEP 22020-001",
  /** Texto usado no mapa. */
  mapQuery: "Av. Nossa Senhora de Copacabana, 330, Copacabana, Rio de Janeiro, RJ",

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
