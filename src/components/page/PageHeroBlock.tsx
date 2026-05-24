import { HeroBanner } from "@/components/HeroBanner";
import { PageIntroSection } from "@/components/page/PageIntroSection";
import type { PageIntroContent } from "@/data/pageContent/types";

export type PageHeroImages = {
  desktop: string;
  mobile?: string;
};

type PageHeroBlockProps = {
  srOnlyH1: string;
  srOnlyDescription?: string;
  images: PageHeroImages;
  imageAlt: string;
  intro: PageIntroContent;
  introCentered?: boolean;
};

/**
 * Standard inner-page hero: full-width HeroBanner (image only) + HTML intro below.
 * Matches homepage / About hero architecture and responsive behavior.
 */
export function PageHeroBlock({
  srOnlyH1,
  srOnlyDescription,
  images,
  imageAlt,
  intro,
  introCentered,
}: PageHeroBlockProps) {
  return (
    <>
      <h1 className="sr-only">{srOnlyH1}</h1>
      {srOnlyDescription ? (
        <p className="sr-only">{srOnlyDescription}</p>
      ) : null}
      <HeroBanner
        images={{
          desktop: images.desktop,
          mobile: images.mobile,
        }}
        alt={imageAlt}
        showCtas={false}
      />
      <PageIntroSection content={intro} centered={introCentered} />
    </>
  );
}
