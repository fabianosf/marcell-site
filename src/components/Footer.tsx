import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { NAV_SECTIONS, scrollToSection } from "@/lib/sections";
import { siteConfig, telHref } from "@/lib/site";
import { Brand } from "@/components/Brand";

export const Footer = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const year = new Date().getFullYear();
  const { marcell, maria } = siteConfig.professionals;

  const go = (path: string, id: string) => (location.pathname === path ? scrollToSection(id) : navigate(path));

  return (
    <footer className="bg-primary-dark text-background">
      <div className="wrap grid gap-10 py-14 md:grid-cols-12 md:py-16">
        <div className="md:col-span-4">
          <Brand inverted className="h-20" />
          <p className="mt-5 max-w-[38ch] text-[15px] text-background/70">{t("footer.description")}</p>
        </div>

        <nav aria-label={t("footer.navigate")} className="md:col-span-2">
          <h2 className="font-display text-lg">{t("footer.navigate")}</h2>
          <ul className="mt-4 space-y-1 text-[15px]">
            {NAV_SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={s.path}
                  onClick={(e) => {
                    e.preventDefault();
                    go(s.path, s.id);
                  }}
                  className="inline-block py-1 text-background/75 hover:text-background"
                >
                  {t(`nav.${s.id}`)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <h2 className="font-display text-lg">{t("footer.contact")}</h2>
          <ul className="mt-4 space-y-2 text-[15px] text-background/75">
            {siteConfig.address && <li>{siteConfig.address}</li>}
            {siteConfig.phone && (
              <li>
                <a href={telHref()} className="hover:text-background">{siteConfig.phone}</a>
              </li>
            )}
            {siteConfig.email && (
              <li className="break-all">
                <a href={`mailto:${siteConfig.email}`} className="hover:text-background">{siteConfig.email}</a>
              </li>
            )}
          </ul>
        </div>

        <div className="md:col-span-3">
          <h2 className="font-display text-lg">{t("footer.registry")}</h2>
          <ul className="mt-4 space-y-4 text-[15px]">
            <li>
              <p className="text-background">{marcell.name}, {marcell.cro}</p>
              <p className="text-sm text-background/60">{t("footer.marcell_spec")}</p>
            </li>
            <li>
              <p className="text-background">{maria.shortName}, {maria.cro}</p>
              <p className="text-sm text-background/60">{t("footer.maria_spec")}</p>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-background/15">
        <div className="wrap flex flex-col gap-2 py-6 text-sm text-background/60 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {siteConfig.clinicName}. {t("footer.rights")}
          </p>
          <p className="max-w-[60ch] md:text-right">{t("footer.disclaimer")}</p>
        </div>
        <div className="wrap pb-6 text-sm text-background/50">
          {t("footer.developed")}{" "}
          <a href={siteConfig.developer.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-background">
            {siteConfig.developer.name}
          </a>
        </div>
      </div>
    </footer>
  );
};
