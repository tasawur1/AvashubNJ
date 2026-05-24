import { Icon } from "@/components/Icon";
import { SectionContainer } from "@/components/SectionContainer";
import { approachItems } from "@/data/aboutContent";

const sectionPad = "py-10 sm:py-12 lg:py-14";
const columnPad =
  "flex flex-col justify-center px-7 py-6 sm:px-9 sm:py-7 lg:px-10 lg:py-8";
const innerWrap = "mx-auto w-full max-w-[88%]";

export function AboutMissionApproachSection() {
  return (
    <section
      className={`bg-gradient-to-b from-white via-brand-lavender/25 to-white ${sectionPad}`}
      aria-labelledby="about-mission-heading"
    >
      <SectionContainer>
        <div className="overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-brand-teal/10 xl:rounded-[2rem]">
          <div className="grid lg:grid-cols-2 lg:items-stretch lg:divide-x lg:divide-brand-teal/10">
            <article className={columnPad}>
              <div className={innerWrap}>
                <h2
                  id="about-mission-heading"
                  className="text-2xl font-bold text-brand-teal sm:text-[1.75rem] lg:text-3xl"
                >
                  Our Mission
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-brand-navy/85 sm:text-base">
                  To provide high-quality, real-life skill development that helps
                  kids, teens, and young adults gain the confidence, independence,
                  and tools they need to thrive at home, in school, at work, and
                  in life.
                </p>
                <p className="mt-5 text-sm font-semibold leading-relaxed text-brand-purple-deep sm:text-base">
                  We believe every individual has potential. We&apos;re here to
                  help them build it.
                </p>
              </div>
            </article>

            <article
              className={`border-t border-brand-teal/10 ${columnPad} lg:border-t-0`}
            >
              <div className={innerWrap}>
                <h2 className="text-2xl font-bold text-brand-teal sm:text-[1.75rem] lg:text-3xl">
                  Our Approach
                </h2>
                <ul className="mt-4 space-y-3.5">
                  {approachItems.map((item) => (
                    <li key={item} className="flex gap-3">
                      <Icon
                        name="circleCheck"
                        className="mt-0.5 shrink-0 text-brand-teal"
                        size="lg"
                      />
                      <span className="text-sm leading-relaxed text-brand-navy/85 sm:text-base">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
