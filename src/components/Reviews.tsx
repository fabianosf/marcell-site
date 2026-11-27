import { useTranslation } from "react-i18next";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getMapsUrl, getWhatsAppHref, hasReviewItems, hasReviewStats, hasWhatsApp, siteConfig } from "@/lib/site";

const Stars = ({ value, size = "md" }: { value: number; size?: "sm" | "md" | "lg" }) => {
  const cls = size === "lg" ? "h-6 w-6" : size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";
  return (
    <span className="inline-flex items-center gap-0.5 text-primary" aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => {
        const filled = i + 1 <= Math.round(value);
        return <Star key={i} className={`${cls} ${filled ? "fill-current" : "opacity-25"}`} />;
      })}
    </span>
  );
};

export const Reviews = () => {
  const { t } = useTranslation();
  const mapsUrl = getMapsUrl();
  const { ratingValue, reviewCount, items } = siteConfig.reviews;

  return (
    <section id="avaliacoes" aria-labelledby="avaliacoes-title" className="section-pad">
      <div className="wrap">
        <div className="max-w-[40rem]">
          <h2 id="avaliacoes-title" className="text-4xl text-foreground md:text-5xl">
            {t("reviews.title")}
          </h2>
          <p className="mt-5 max-w-[46ch] text-lg text-muted-foreground">{t("reviews.intro")}</p>
        </div>

        {hasReviewStats && (
          <div className="mt-10 flex flex-wrap items-end gap-x-6 gap-y-2 border-y border-border py-8">
            <div>
              <p className="text-sm text-muted-foreground">{t("reviews.rating_label")}</p>
              <p className="mt-1 font-display text-5xl text-foreground tabular-nums">{ratingValue.toFixed(1)}</p>
            </div>
            <div className="pb-1">
              <Stars value={ratingValue} size="lg" />
              <p className="mt-2 text-sm text-muted-foreground">{t("reviews.based_on", { count: reviewCount })}</p>
            </div>
            <p className="ml-auto self-center text-sm font-medium text-muted-foreground">{t("reviews.source")}</p>
          </div>
        )}

        {hasReviewItems ? (
          <ul className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
            {items.map((item) => (
              <li key={`${item.author}-${item.date ?? item.text.slice(0, 24)}`} className="border-t border-border pt-6">
                <Stars value={item.rating} size="sm" />
                <blockquote className="mt-4 text-base leading-relaxed text-foreground">
                  <p>“{item.text}”</p>
                </blockquote>
                <footer className="mt-4 text-sm text-muted-foreground">
                  <cite className="not-italic font-medium text-foreground">{item.author}</cite>
                  {item.date ? <span className="before:mx-2 before:content-['·']">{item.date}</span> : null}
                </footer>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-10 max-w-[48ch] space-y-3">
            <p className="text-base text-muted-foreground">{t("reviews.empty")}</p>
            <p className="text-base text-foreground">{t("reviews.empty_hint")}</p>
          </div>
        )}

        <div className="mt-10 flex flex-wrap gap-3">
          {mapsUrl && (
            <>
              <Button asChild size="lg" className="h-12 rounded-full bg-primary px-7 text-base text-primary-foreground hover:bg-primary-dark">
                <a href={mapsUrl} target="_blank" rel="noopener noreferrer" data-analytics="google_maps_view">
                  {t("reviews.view_google")}
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 rounded-full border-foreground/25 bg-transparent px-7 text-base">
                <a href={mapsUrl} target="_blank" rel="noopener noreferrer" data-analytics="google_review_click">
                  {t("reviews.leave_review")}
                </a>
              </Button>
            </>
          )}
          {hasWhatsApp && !hasReviewItems && (
            <Button asChild size="lg" variant="outline" className="h-12 rounded-full border-foreground/25 bg-transparent px-7 text-base">
              <a href={getWhatsAppHref(t("cta.whatsapp_praise"))} target="_blank" rel="noopener noreferrer">
                {t("reviews.whatsapp_praise")}
              </a>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};
