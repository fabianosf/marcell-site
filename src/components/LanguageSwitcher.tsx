import { useTranslation } from "react-i18next";

const LANGUAGES = [
  { code: "pt", label: "PT", name: "Português" },
  { code: "en", label: "EN", name: "English" },
  { code: "es", label: "ES", name: "Español" },
];

export const LanguageSwitcher = ({ className = "" }: { className?: string }) => {
  const { i18n, t } = useTranslation();
  const current = i18n.language?.slice(0, 2) || "pt";

  return (
    <div role="group" aria-label={t("nav.language")} className={`flex items-center gap-1 text-sm font-medium ${className}`}>
      {LANGUAGES.map((lang) => (
        <button
          key={lang.code}
          type="button"
          onClick={() => i18n.changeLanguage(lang.code)}
          aria-label={lang.name}
          aria-pressed={current === lang.code}
          className={`grid h-9 min-w-9 place-items-center rounded-full px-2 transition-colors ${
            current === lang.code
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
};
