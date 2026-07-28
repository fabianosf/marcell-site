export const SITE_SECTIONS = [
  { label: "Início", path: "/", id: "inicio" },
  { label: "Sobre", path: "/sobre", id: "sobre" },
  { label: "Serviços", path: "/servicos", id: "servicos" },
  { label: "Galeria", path: "/galeria", id: "galeria" },
  { label: "Depoimentos", path: "/depoimentos", id: "depoimentos" },
  { label: "Contato", path: "/contato", id: "contato" },
] as const;

export const PATH_TO_SECTION_ID: Record<string, string> = Object.fromEntries(
  SITE_SECTIONS.map((section) => [section.path, section.id]),
);

export const scrollToSection = (sectionId: string) => {
  document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
};
