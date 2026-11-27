import { useEffect } from "react";
import { attachConversionClickTracking, initAnalyticsIfConsented } from "@/lib/analytics";

/** Inicializa GA4 após consentimento e rastreia cliques de conversão no documento. */
export const AnalyticsBoot = () => {
  useEffect(() => {
    initAnalyticsIfConsented();
    const onConsent = (e: Event) => {
      if ((e as CustomEvent<"granted" | "denied">).detail === "granted") {
        initAnalyticsIfConsented();
      }
    };
    window.addEventListener("cero:consent", onConsent);
    return attachConversionClickTracking();
  }, []);

  return null;
};