import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { getCookieConsent, setCookieConsent } from "@/lib/consent";
import { initAnalyticsIfConsented } from "@/lib/analytics";

export const CookieConsent = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (getCookieConsent() === null) setVisible(true);
    else initAnalyticsIfConsented();
  }, []);

  const choose = (granted: boolean) => {
    setCookieConsent(granted ? "granted" : "denied");
    setVisible(false);
    if (granted) initAnalyticsIfConsented();
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-desc"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 p-4 shadow-large backdrop-blur sm:p-6"
    >
      <div className="wrap flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="max-w-3xl text-sm text-muted-foreground">
          <p id="cookie-banner-title" className="font-medium text-foreground">
            {t("cookies.title")}
          </p>
          <p id="cookie-banner-desc" className="mt-1">
            {t("cookies.text")}{" "}
            <Link to="/privacidade" className="text-primary underline underline-offset-2 hover:text-primary-dark">
              {t("cookies.privacy_link")}
            </Link>
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <Button type="button" variant="outline" className="rounded-full" onClick={() => choose(false)}>
            {t("cookies.reject")}
          </Button>
          <Button type="button" className="rounded-full bg-primary text-primary-foreground hover:bg-primary-dark" onClick={() => choose(true)}>
            {t("cookies.accept")}
          </Button>
        </div>
      </div>
    </div>
  );
};