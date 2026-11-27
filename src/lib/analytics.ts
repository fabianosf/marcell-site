import { getCookieConsent } from "@/lib/consent";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const measurementId = import.meta.env.VITE_GA4_MEASUREMENT_ID?.trim() ?? "";

export const hasAnalyticsConfig = Boolean(measurementId);

let loaded = false;

const injectGtag = () => {
  if (loaded || !measurementId) return;
  loaded = true;

  window.dataLayer = window.dataLayer ?? [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", measurementId, { anonymize_ip: true });

  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  document.head.appendChild(s);
};

export const initAnalyticsIfConsented = () => {
  if (getCookieConsent() === "granted") injectGtag();
};

export const trackEvent = (name: string, params?: Record<string, string>) => {
  if (getCookieConsent() !== "granted" || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
};

export const attachConversionClickTracking = () => {
  const onClick = (e: MouseEvent) => {
    if (getCookieConsent() !== "granted") return;
    const target = (e.target as Element | null)?.closest("a[href]");
    if (!target) return;
    const href = target.getAttribute("href") ?? "";
    const dataAnalytics = target.getAttribute("data-analytics");
    if (dataAnalytics) {
      trackEvent(dataAnalytics, { link_url: href.slice(0, 120) });
      return;
    }
    if (href.includes("wa.me") || href.includes("api.whatsapp.com")) {
      trackEvent("whatsapp_click", { link_url: href.slice(0, 120) });
    } else if (href.startsWith("tel:")) {
      trackEvent("phone_click", { link_url: href });
    } else if (href.startsWith("mailto:")) {
      trackEvent("email_click", { link_url: href });
    } else if (href.includes("google.com/maps") || href.includes("goo.gl") || href.includes("g.page")) {
      trackEvent("maps_click", { link_url: href.slice(0, 120) });
    }
  };

  document.addEventListener("click", onClick, true);
  return () => document.removeEventListener("click", onClick, true);
};