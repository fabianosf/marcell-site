import { useTranslation } from "react-i18next";
import { getWhatsAppHref, hasWhatsApp } from "@/lib/site";

const WhatsAppIcon = () => (
  <svg viewBox="0 0 32 32" className="h-7 w-7 fill-current" aria-hidden="true">
    <path d="M16.04 3C9.4 3 4 8.4 4 15.04c0 2.12.56 4.2 1.62 6.03L4 28l7.1-1.86a12 12 0 0 0 4.94 1.06h.01C22.68 27.2 28 21.8 28 15.16 28 8.5 22.7 3 16.04 3Zm0 21.9h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-4.2 1.1 1.12-4.1-.24-.38A9.9 9.9 0 1 1 16.04 24.9Zm5.43-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.23 1.36.2 1.88.12.57-.09 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35Z" />
  </svg>
);

export const WhatsAppButton = () => {
  const { t } = useTranslation();
  if (!hasWhatsApp) return null;

  return (
    <a
      href={getWhatsAppHref(t("cta.whatsapp_message"))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("cta.whatsapp")}
      className="fixed bottom-4 right-4 z-30 grid h-14 w-14 place-items-center rounded-full bg-[#1FA855] text-white shadow-large transition-transform hover:scale-105 active:scale-95 sm:bottom-6 sm:right-6"
    >
      <WhatsAppIcon />
    </a>
  );
};
