import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import mProfile from "@/assets/marcell/profile.webp";
import mAtendimento from "@/assets/marcell/atendimento.webp";
import mTomografia from "@/assets/marcell/tomografia.webp";
import mRadiografia from "@/assets/marcell/radiografia.webp";
import mDiagnostico from "@/assets/marcell/diagnostico.webp";
import mTrabalho from "@/assets/marcell/trabalho.webp";
import eRetrato from "@/assets/maria/retrato.webp";
import eRadiografiaTela from "@/assets/maria/radiografia-tela.webp";
import eAtendimento from "@/assets/maria/atendimento.webp";
import eProcedimento from "@/assets/maria/procedimento.webp";
import eExame from "@/assets/maria/radiografia-exame.webp";
import eSala from "@/assets/maria/consultorio.webp";

type Who = "marcell" | "maria" | "clinica";
type Filter = "all" | "marcell" | "maria";

const PHOTOS: Array<{ id: string; who: Who; src: string; width: number; height: number }> = [
  { id: "marcell_profile", who: "marcell", src: mProfile, width: 960, height: 1280 },
  { id: "maria_retrato", who: "maria", src: eRetrato, width: 853, height: 1280 },
  { id: "marcell_atendimento", who: "marcell", src: mAtendimento, width: 960, height: 1280 },
  { id: "clinica_sala", who: "clinica", src: eSala, width: 1280, height: 853 },
  { id: "maria_radiografia_tela", who: "maria", src: eRadiografiaTela, width: 896, height: 1280 },
  { id: "marcell_radiografia", who: "marcell", src: mRadiografia, width: 960, height: 1280 },
  { id: "maria_atendimento", who: "maria", src: eAtendimento, width: 853, height: 1280 },
  { id: "marcell_tomografia", who: "marcell", src: mTomografia, width: 960, height: 1280 },
  { id: "maria_procedimento", who: "maria", src: eProcedimento, width: 853, height: 1280 },
  { id: "marcell_diagnostico", who: "marcell", src: mDiagnostico, width: 960, height: 1280 },
  { id: "maria_exame", who: "maria", src: eExame, width: 836, height: 1280 },
  { id: "marcell_trabalho", who: "marcell", src: mTrabalho, width: 960, height: 1280 },
];

export const Gallery = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<Filter>("all");
  const [open, setOpen] = useState<number | null>(null);

  const visible = useMemo(() => PHOTOS.filter((p) => filter === "all" || p.who === filter), [filter]);

  const step = useCallback(
    (dir: 1 | -1) => setOpen((c) => (c === null ? c : (c + dir + visible.length) % visible.length)),
    [visible.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, step]);

  const text = (id: string, field: "title" | "alt") => t(`gallery.photos.${id}.${field}`);
  const current = open !== null ? visible[open] : null;

  const FILTERS: Array<{ key: Filter; label: string }> = [
    { key: "all", label: t("gallery.filters.all") },
    { key: "marcell", label: t("gallery.filters.marcell") },
    { key: "maria", label: t("gallery.filters.maria") },
  ];

  return (
    <section id="galeria" aria-labelledby="galeria-title" className="section-pad">
      <div className="wrap">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 id="galeria-title" className="text-4xl text-foreground md:text-5xl">
              {t("gallery.title")}
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">{t("gallery.intro")}</p>
          </div>
          <div role="group" aria-label={t("gallery.filters.label")} className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                type="button"
                aria-pressed={filter === f.key}
                onClick={() => setFilter(f.key)}
                className={`h-10 rounded-full border px-4 text-sm font-medium transition-colors ${
                  filter === f.key ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-foreground/80 hover:border-primary/50"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <ul className="mt-12 columns-2 gap-4 md:columns-3 md:gap-5">
          {visible.map((photo, i) => (
            <li key={photo.id} className="mb-4 break-inside-avoid md:mb-5">
              <button type="button" onClick={() => setOpen(i)} className="group relative block w-full overflow-hidden rounded-[1.25rem] text-left shadow-soft">
                <img
                  src={photo.src}
                  alt={text(photo.id, "alt")}
                  width={photo.width}
                  height={photo.height}
                  loading="lazy"
                  decoding="async"
                  className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary-dark/85 to-transparent px-4 pb-3 pt-10 text-sm font-medium text-primary-foreground">
                  {text(photo.id, "title")}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <DialogPrimitive.Root open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-primary-dark/95 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
          <DialogPrimitive.Content aria-describedby={undefined} className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 outline-none sm:p-8">
            <DialogPrimitive.Title className="sr-only">{current ? text(current.id, "title") : ""}</DialogPrimitive.Title>
            <DialogPrimitive.Close aria-label={t("gallery.close")} className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-background/10 text-background hover:bg-background/20">
              <X className="h-6 w-6" aria-hidden="true" />
            </DialogPrimitive.Close>

            {current && (
              <figure className="flex max-h-full max-w-5xl flex-col items-center">
                <img src={current.src} alt={text(current.id, "alt")} className="max-h-[78vh] w-auto max-w-full rounded-2xl object-contain shadow-large" />
                <figcaption className="mt-4 text-center font-display text-xl text-background">{text(current.id, "title")}</figcaption>
              </figure>
            )}

            <button type="button" onClick={() => step(-1)} aria-label={t("gallery.prev")} className="absolute left-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-background/10 text-background hover:bg-background/20 sm:left-6">
              <ChevronLeft className="h-6 w-6" aria-hidden="true" />
            </button>
            <button type="button" onClick={() => step(1)} aria-label={t("gallery.next")} className="absolute right-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-background/10 text-background hover:bg-background/20 sm:right-6">
              <ChevronRight className="h-6 w-6" aria-hidden="true" />
            </button>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </section>
  );
};
