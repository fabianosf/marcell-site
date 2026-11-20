import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <main className="grid min-h-screen place-items-center bg-background px-6">
      <div className="max-w-md">
        <p className="font-display text-7xl text-primary">404</p>
        <h1 className="mt-4 text-3xl text-foreground">{t("notfound.title")}</h1>
        <p className="mt-3 text-muted-foreground">{t("notfound.text")}</p>
        <Link
          to="/"
          className="mt-8 inline-flex h-12 items-center rounded-full bg-primary px-7 font-medium text-primary-foreground hover:bg-primary-dark"
        >
          {t("notfound.back")}
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
