import { useTranslation } from "react-i18next";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Faq = () => {
  const { t } = useTranslation();
  const list = t("faq.list", { returnObjects: true }) as Array<{ q: string; a: string }>;

  return (
    <section id="duvidas" aria-labelledby="duvidas-title" className="section-pad bg-card">
      <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <h2 id="duvidas-title" className="text-4xl text-foreground md:text-5xl">
            {t("faq.title")}
          </h2>
          <p className="mt-5 max-w-[36ch] text-lg text-muted-foreground">{t("faq.intro")}</p>
        </div>

        <Accordion type="single" collapsible className="lg:col-span-8">
          {list.map((item, i) => (
            <AccordionItem key={item.q} value={`faq-${i}`} className="border-border">
              <AccordionTrigger className="py-6 text-left font-display text-xl font-medium tracking-tight hover:no-underline md:text-2xl">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="max-w-[62ch] pb-6 text-base leading-relaxed text-muted-foreground">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
