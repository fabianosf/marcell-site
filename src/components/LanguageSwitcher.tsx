import { useTranslation } from "react-i18next";

const LANGUAGES = [
  { code: "pt", label: "PT" },
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
];

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const current = i18n.language?.slice(0, 2) || "pt";

  return (
    <div className="flex items-center rounded-lg border border-border overflow-hidden bg-background/80 backdrop-blur-sm text-xs font-semibold">
      {LANGUAGES.map((lang, index) => (
        <button
          key={lang.code}
          onClick={() => i18n.changeLanguage(lang.code)}
          aria-label={`Idioma: ${lang.label}`}
          className={[
            "px-3 py-1.5 h-8 transition-colors",
            index !== LANGUAGES.length - 1 ? "border-r border-border" : "",
            current === lang.code
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-muted",
          ].join(" ")}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
};
