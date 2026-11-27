const STORAGE_KEY = "cero_cookie_consent";

export type CookieConsent = "granted" | "denied" | null;

export const getCookieConsent = (): CookieConsent => {
  if (typeof window === "undefined") return null;
  const v = localStorage.getItem(STORAGE_KEY);
  if (v === "granted" || v === "denied") return v;
  return null;
};

export const setCookieConsent = (value: Exclude<CookieConsent, null>) => {
  localStorage.setItem(STORAGE_KEY, value);
  window.dispatchEvent(new CustomEvent("cero:consent", { detail: value }));
};