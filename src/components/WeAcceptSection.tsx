import { Icon } from "@/components/Icon";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { SectionContainer } from "@/components/SectionContainer";
import { siteImages } from "@/data/images";

const acceptItems = [
  {
    icon: "shieldHeart" as const,
    title: "Major Insurance Plans",
    subtitle: null,
  },
  {
    icon: "heart" as const,
    title: "NJ FamilyCare",
    subtitle: "(Medicaid)",
  },
  {
    icon: "ddd" as const,
    title: "DDD",
    subtitle: "on select days",
  },
];

const afterSchoolImages = [
  { key: "afterSchoolOne" as const, alt: "After-school group activity at Ava's Hub" },
  { key: "afterSchoolTwo" as const, alt: "Children collaborating during an after-school program" },
  { key: "afterSchoolThree" as const, alt: "Therapist-led life skills session" },
  { key: "afterSchoolFour" as const, alt: "Social connection and play in our programs" },
];

const cardPad = "p-9 sm:p-10 lg:p-10 xl:p-12";

export function WeAcceptSection() {
  return (
    <section className="py-12 sm:py-14 lg:py-16" aria-labelledby="we-accept-heading">
      <SectionContainer>
        <div className="overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-brand-teal/10 xl:rounded-[2rem]">
          <div
            className={
              "flex flex-col md:grid md:grid-cols-2 md:items-start md:gap-0 " +
              "lg:grid lg:grid-cols-[minmax(0,34%)_minmax(0,38%)_minmax(0,28%)] lg:items-stretch lg:divide-x lg:divide-brand-teal/10"
            }
          >
            {/* We Accept */}
            <article
              className={`flex flex-col justify-start bg-brand-teal-light/50 ${cardPad}`}
            >
              <h2
                id="we-accept-heading"
                className="mb-8 text-center text-2xl font-bold text-brand-teal sm:text-[1.75rem]"
              >
                We Accept
              </h2>

              <ul className="mb-7 grid grid-cols-3 gap-4 sm:gap-5 lg:gap-4">
                {acceptItems.map((item) => (
                  <li
                    key={item.title}
                    className="flex flex-col items-center text-center"
                  >
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-brand-teal shadow-sm ring-1 ring-brand-teal/15">
                      <Icon name={item.icon} size="2x" className="text-brand-teal" />
                    </span>
                    <p className="mt-3 text-xs font-bold leading-snug text-brand-navy sm:text-sm">
                      {item.title}
                    </p>
                    {item.subtitle ? (
                      <p className="mt-0.5 text-[0.6875rem] font-medium text-brand-navy/70 sm:text-xs">
                        {item.subtitle}
                      </p>
                    ) : null}
                  </li>
                ))}
              </ul>

              <p className="mx-auto max-w-[90%] text-center text-sm leading-relaxed text-brand-navy/80 sm:text-[0.9375rem]">
                We&apos;re here to help you navigate benefits and find the best
                fit for your family.
              </p>
            </article>

            {/* After-School + Teen Job Training */}
            <article
              className={`flex flex-col justify-start border-t border-brand-teal/10 bg-brand-lavender/40 md:border-t-0 md:border-l md:border-brand-teal/10 ${cardPad} lg:border-0`}
            >
              <div className="flex w-full flex-col gap-8">
                <div>
                  <h3 className="flex items-center gap-2.5 text-xl font-bold text-brand-purple-deep sm:text-[1.35rem]">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/80 ring-1 ring-brand-purple-deep/10">
                      <Icon
                        name="school"
                        className="text-brand-purple-bright"
                        size="lg"
                      />
                    </span>
                    After-School Programs
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-brand-navy/85 sm:text-base">
                    Fun, engaging after-school programs that build skills
                    through real-life activities, groups, and social connection.
                  </p>
                </div>

                <div
                  className="h-px w-full shrink-0 bg-brand-purple-deep/10"
                  aria-hidden
                />

                <div>
                  <h3 className="flex items-center gap-2.5 text-xl font-bold text-brand-purple-deep sm:text-[1.35rem]">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/80 ring-1 ring-brand-purple-deep/10">
                      <Icon
                        name="vocational"
                        className="text-brand-purple-bright"
                        size="lg"
                      />
                    </span>
                    Teen Job Training
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-brand-navy/85 sm:text-base">
                    Hands-on job readiness, vocational training, and work
                    experiences to prepare for a successful future.
                  </p>
                </div>
              </div>
            </article>

            {/* Image grid — full width on tablet, fills column on desktop */}
            <div
              className={
                "w-full border-t border-brand-teal/10 bg-white p-9 sm:p-10 " +
                "md:col-span-2 md:border-t lg:col-span-1 lg:flex lg:h-full lg:flex-col lg:justify-start lg:border-0 lg:p-8 lg:px-5"
              }
            >
              <div
                className={
                  "grid w-full grid-cols-2 gap-3 " +
                  "md:grid-cols-4 md:gap-3 " +
                  "lg:h-full lg:flex-1 lg:grid-cols-2 lg:grid-rows-2 lg:gap-2.5 lg:self-stretch"
                }
              >
                {afterSchoolImages.map(({ key, alt }) => (
                  <div
                    key={key}
                    className="relative aspect-square w-full min-h-0 overflow-hidden rounded-2xl bg-brand-teal-light sm:rounded-3xl lg:aspect-auto lg:h-full lg:rounded-2xl"
                  >
                    <PlaceholderImage
                      src={siteImages[key]}
                      alt={alt}
                      fill
                      className="h-full w-full object-cover object-center"
                      sizes="(max-width: 768px) 45vw, (max-width: 1024px) 22vw, 14vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
