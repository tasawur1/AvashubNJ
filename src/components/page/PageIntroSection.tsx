import { CTAButton } from "@/components/CTAButton";
import { SectionContainer } from "@/components/SectionContainer";
import type { PageIntroContent } from "@/data/pageContent/types";
import { pageSectionPad } from "@/lib/pageSectionStyles";

type PageIntroSectionProps = {
  content: PageIntroContent;
  /** Centered intro (families) vs default balanced layout */
  centered?: boolean;
};

export function PageIntroSection({
  content,
  centered = false,
}: PageIntroSectionProps) {
  const { heading, subheading, description, tagline, cta } = content;
  const align = centered ? "text-center mx-auto max-w-3xl" : "max-w-3xl";

  return (
    <section
      className={`bg-gradient-to-b from-white via-brand-lavender/30 to-white ${pageSectionPad}`}
      aria-labelledby="page-intro-heading"
    >
      <SectionContainer>
        <div className={align}>
          <h2
            id="page-intro-heading"
            className="text-[1.875rem] font-bold leading-[1.12] tracking-tight text-brand-teal sm:text-4xl lg:text-[2.5rem]"
          >
            {heading}
          </h2>
          {subheading ? (
            <p className="mt-3 text-base font-semibold text-brand-purple-bright sm:text-lg">
              {subheading}
            </p>
          ) : null}
          <p className="mt-4 text-sm leading-relaxed text-brand-navy/85 sm:text-base">
            {description}
          </p>
          {tagline ? (
            <div className="mt-6 flex w-full items-center rounded-2xl bg-brand-lavender/80 px-5 py-4 ring-1 ring-brand-purple-deep/10 sm:px-6">
              <p className="w-full text-sm font-semibold leading-relaxed text-brand-purple-deep sm:text-base">
                {tagline}
              </p>
            </div>
          ) : null}
          {cta ? (
            <div className={`mt-7 ${centered ? "flex justify-center" : ""}`}>
              <CTAButton href={cta.href}>{cta.label}</CTAButton>
            </div>
          ) : null}
        </div>
      </SectionContainer>
    </section>
  );
}
