import { useTranslation } from "react-i18next";
import radiografiaExame from "@/assets/maria/radiografia-exame.webp";
import diagnostico from "@/assets/marcell/diagnostico.webp";

export const Process = () => {
  const { t } = useTranslation();
  const steps = t("process.steps", { returnObjects: true }) as Array<{ title: string; description: string }>;

  return (
    <section id="atendimento" aria-labelledby="atendimento-title" className="section-pad bg-primary-dark text-background">
      <div className="wrap grid items-start gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <h2 id="atendimento-title" className="text-4xl md:text-5xl">
            {t("process.title")}
          </h2>
          <p className="mt-5 max-w-[48ch] text-lg text-background/75">{t("process.intro")}</p>

          {/* Aqui os números fazem sentido: é uma sequência real */}
          <ol className="mt-12 space-y-0">
            {steps.map((step, i) => (
              <li key={step.title} className="relative grid grid-cols-[auto_1fr] gap-x-6 pb-10 last:pb-0">
                {i < steps.length - 1 && (
                  <span aria-hidden="true" className="absolute left-[19px] top-11 h-[calc(100%-2.75rem)] w-px bg-background/25" />
                )}
                <span className="grid h-10 w-10 place-items-center rounded-full bg-secondary font-display text-lg font-semibold text-primary-dark">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-2xl">{step.title}</h3>
                  <p className="mt-1.5 max-w-[52ch] text-background/75">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:col-span-5 lg:pt-6">
          <img
            src={radiografiaExame}
            alt={t("gallery.photos.maria_exame.alt")}
            width={836}
            height={1280}
            loading="lazy"
            className="aspect-[3/4.4] w-full rounded-[1.5rem] object-cover"
          />
          <img
            src={diagnostico}
            alt={t("gallery.photos.marcell_diagnostico.alt")}
            width={960}
            height={1280}
            loading="lazy"
            className="mt-10 aspect-[3/4.4] w-full rounded-[1.5rem] object-cover"
          />
        </div>
      </div>
    </section>
  );
};
