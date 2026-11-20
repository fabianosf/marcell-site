import { siteConfig } from "@/lib/site";
import logo from "@/assets/brand/logo-cero.webp";

/** Logo da CERO. Na versão "inverted" vira branco, para fundos escuros. */
export const Brand = ({ inverted = false, className = "h-12" }: { inverted?: boolean; className?: string }) => (
  <img
    src={logo}
    alt={siteConfig.clinicFullName}
    width={723}
    height={774}
    className={`w-auto ${className} ${inverted ? "brightness-0 invert" : ""}`}
  />
);
