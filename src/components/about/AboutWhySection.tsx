import { Icon } from "@/components/Icon";
import { SectionContainer } from "@/components/SectionContainer";
import { SectionHeadingDecorated } from "@/components/SectionHeadingDecorated";
import { whyItems } from "@/data/aboutContent";

const sectionPad = "pb-10 sm:pb-12 lg:pb-14";
const cardPadX = "px-6 sm:px-8 lg:px-10";
const innerWrap = "mx-auto w-full max-w-[88%]";

export function AboutWhySection() {
  return (
    <section className={sectionPad} aria-labelledby="about-why-heading">
      <SectionContainer>
        <div className="overflow-hidden rounded-3xl bg-brand-teal-light/50 shadow-card ring-1 ring-brand-teal/15 xl:rounded-[2rem]">
          <div className={`${cardPadX} pt-8 sm:pt-9 lg:pt-10`}>
            <div className={innerWrap}>
              <SectionHeadingDecorated
                id="about-why-heading"
                title="Why We Do What We Do"
              />
            </div>
          </div>

          <div className={`mt-6 sm:mt-7 lg:mt-8 ${cardPadX}`}>
            <div className={innerWrap}>
              <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
                {whyItems.map((item) => (
                  <div key={item} className="flex gap-3">
                    <Icon
                      name="circleCheck"
                      className="mt-0.5 shrink-0 text-brand-teal"
                      size="lg"
                    />
                    <p className="text-sm leading-relaxed text-brand-navy/85 sm:text-base">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={`${cardPadX} max-sm:px-3 pb-6 pt-8 sm:pb-7 sm:pt-9 lg:pb-8`}>
            <div
              className={
                "mx-auto flex w-full max-w-full flex-row items-center justify-center rounded-[2.75rem] " +
                "bg-gradient-to-r from-brand-purple-deep via-brand-purple-bright to-brand-purple-deep " +
                "px-2.5 py-3.5 shadow-lg sm:w-fit sm:px-5 sm:py-6 lg:px-6"
              }
            >
              <div className="flex w-full flex-row items-center justify-center gap-2 sm:w-auto sm:gap-4 lg:gap-5">
                <span className="inline-flex shrink-0 max-sm:[&_svg]:!h-7 max-sm:[&_svg]:!w-7 [&_svg]:!max-h-none [&_svg]:!max-w-none sm:[&_svg]:!h-11 sm:[&_svg]:!w-11">
                  <Icon name="heart" className="text-brand-gold" size="2x" />
                </span>
                <p className="min-w-0 flex-1 text-center text-[0.5625rem] font-bold leading-[1.15] tracking-tight text-white min-[390px]:max-sm:text-[0.625rem] sm:flex-none sm:text-base lg:text-lg">
                  <span className="block max-sm:whitespace-nowrap sm:whitespace-normal">
                    Because every child deserves more than just therapy—
                  </span>
                  <span className="block max-sm:whitespace-nowrap sm:whitespace-normal">
                    they deserve a pathway to a meaningful future.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
