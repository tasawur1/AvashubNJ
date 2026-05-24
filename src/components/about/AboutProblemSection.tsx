import { Icon } from "@/components/Icon";
import { SectionContainer } from "@/components/SectionContainer";
import { SectionHeadingDecorated } from "@/components/SectionHeadingDecorated";
import { problemIconColors, problemItems } from "@/data/aboutContent";

const sectionPad = "py-10 sm:py-12 lg:py-14";
const cardInnerPad = "px-6 py-5 sm:px-8 sm:py-6 lg:px-10 lg:py-7";

export function AboutProblemSection() {
  return (
    <section className={sectionPad} aria-labelledby="about-problem-heading">
      <SectionContainer>
        <SectionHeadingDecorated
          id="about-problem-heading"
          title="The Problem We See"
          className="mb-8 sm:mb-10"
        />

        <div className="overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-brand-teal/10 xl:rounded-[2rem]">
          <div className={`border-b border-brand-teal/10 ${cardInnerPad}`}>
            <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-x-4 gap-y-5 sm:gap-x-5 sm:gap-y-6 md:grid-cols-3 lg:grid-cols-6 lg:gap-x-3 lg:gap-y-5">
              {problemItems.map((item) => (
                <li
                  key={item.text}
                  className="flex flex-col items-center px-2 text-center sm:px-3"
                >
                  <span className="inline-flex [&_svg]:!h-9 [&_svg]:!w-9 [&_svg]:!max-h-none [&_svg]:!max-w-none sm:[&_svg]:!h-10 sm:[&_svg]:!w-10">
                    <Icon
                      name={item.icon}
                      size="2x"
                      className={problemIconColors[item.color]}
                    />
                  </span>
                  <p className="mt-3 max-w-[11rem] text-xs font-medium leading-snug text-brand-navy sm:max-w-[12.5rem] sm:text-[0.8125rem] lg:max-w-[10.5rem] lg:text-xs lg:leading-relaxed">
                    {item.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gradient-to-b from-brand-teal-light/30 to-white px-6 py-6 text-center sm:px-10 sm:py-7">
            <p className="mx-auto max-w-2xl text-base font-semibold leading-relaxed text-brand-teal sm:text-lg">
              At Ava&apos;s Hub, we don&apos;t just build skills—we create
              opportunities for connection, friendships, and meaningful social
              experiences.{" "}
              <Icon
                name="heart"
                className="inline-block align-middle text-brand-gold"
                size="lg"
              />
            </p>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
