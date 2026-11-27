import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Seo } from "@/components/Seo";
import { siteConfig } from "@/lib/site";

const Privacy = () => {
  const { t } = useTranslation();
  const sections = t("privacy.sections", { returnObjects: true }) as Array<{ title: string; body: string }>;
  const year = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-background">
      <Seo />
      <Header />
      <main id="conteudo" className="section-pad">
        <div className="wrap max-w-3xl">
          <p className="text-sm text-muted-foreground">{t("privacy.updated", { year })}</p>
          <h1 className="mt-2 font-display text-4xl text-foreground md:text-5xl">{t("privacy.title")}</h1>
          <p className="mt-6 text-lg text-muted-foreground">{t("privacy.intro", { clinic: siteConfig.clinicFullName })}</p>

          <ol className="mt-12 space-y-10">
            {sections.map((section, i) => (
              <li key={i}>
                <h2 className="font-display text-2xl text-foreground">{section.title}</h2>
                <p className="mt-3 whitespace-pre-line text-base leading-relaxed text-muted-foreground">{section.body}</p>
              </li>
            ))}
          </ol>

          <p className="mt-12 text-base text-muted-foreground">
            {t("privacy.contact_line")}{" "}
            <a href={`mailto:${siteConfig.email}`} className="text-primary underline underline-offset-2">
              {siteConfig.email}
            </a>
          </p>

          <Link
            to="/"
            className="mt-10 inline-flex h-12 items-center rounded-full bg-primary px-7 font-medium text-primary-foreground hover:bg-primary-dark"
          >
            {t("privacy.back")}
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;