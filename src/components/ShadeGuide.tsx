import { useState } from "react";
import { useTranslation } from "react-i18next";

/**
 * Escala de cor dos dentes (referência clássica A1–D2).
 * É a "linguagem" da dentística estética: restaurar é, antes de tudo, combinar cor.
 */
const SHADES = [
  { code: "B1", className: "bg-shade-b1", rotate: -4 },
  { code: "A1", className: "bg-shade-a1", rotate: -2 },
  { code: "A2", className: "bg-shade-a2", rotate: 0 },
  { code: "B2", className: "bg-shade-b2", rotate: 1.5 },
  { code: "A3", className: "bg-shade-a3", rotate: 3 },
  { code: "C1", className: "bg-shade-c1", rotate: 4.5 },
  { code: "D2", className: "bg-shade-d2", rotate: 6 },
];

export const ShadeGuide = () => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState("A2");

  return (
    <figure className="m-0" aria-label={t("treatments.shade_label")}>
      <div className="flex items-end gap-1.5 sm:gap-2" role="radiogroup" aria-label={t("treatments.shade_label")}>
        {SHADES.map((shade, i) => {
          const active = selected === shade.code;
          return (
            <button
              key={shade.code}
              type="button"
              role="radio"
              aria-checked={active}
              aria-label={`${t("treatments.shade_label")} ${shade.code}`}
              onClick={() => setSelected(shade.code)}
              style={{ ["--d" as string]: `${700 + i * 90}ms`, ["--r" as string]: `${shade.rotate}deg` }}
              className="shade-in group flex flex-col items-center gap-2 !min-h-0 !min-w-0 origin-bottom"
            >
              <span
                className={`${shade.className} block w-9 rounded-t-[16px] rounded-b-[7px] shadow-soft ring-1 ring-foreground/10 transition-all duration-300 sm:w-11 ${
                  active ? "h-24 -translate-y-1.5 ring-2 !ring-primary sm:h-28" : "h-[72px] group-hover:-translate-y-1 sm:h-20"
                }`}
              />
              <span className={`text-xs font-semibold tabular-nums ${active ? "text-primary" : "text-muted-foreground"}`}>
                {shade.code}
              </span>
            </button>
          );
        })}
      </div>
      <figcaption className="mt-4 max-w-[34ch] text-sm leading-snug text-muted-foreground">
        {t("treatments.shade_caption")}
      </figcaption>
    </figure>
  );
};
