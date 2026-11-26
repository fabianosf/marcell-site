import { showContactSection } from "@/lib/site";

const ALL_SECTIONS = [
  { path: "/", id: "inicio" },
  { path: "/equipe", id: "equipe" },
  { path: "/tratamentos", id: "tratamentos" },
  { path: "/atendimento", id: "atendimento" },
  { path: "/galeria", id: "galeria" },
  { path: "/avaliacoes", id: "avaliacoes" },
  { path: "/duvidas", id: "duvidas" },
  { path: "/contato", id: "contato" },
] as const;

export const SITE_SECTIONS = ALL_SECTIONS.filter((s) => s.id !== "contato" || showContactSection);

/** Itens exibidos no menu (o logo já leva ao início). */
export const NAV_SECTIONS = SITE_SECTIONS.filter((s) => s.id !== "inicio");

export const PATH_TO_SECTION_ID: Record<string, string> = Object.fromEntries(
  SITE_SECTIONS.map((section) => [section.path, section.id]),
);

export const scrollToSection = (sectionId: string) => {
  const el = document.getElementById(sectionId);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
};
