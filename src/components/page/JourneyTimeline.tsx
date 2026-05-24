import { Icon } from "@/components/Icon";
import type { JourneyStep } from "@/data/pageContent/types";
import { SectionContainer } from "@/components/SectionContainer";
import { SectionHeadingDecorated } from "@/components/SectionHeadingDecorated";
import { cardShell, pageSectionPad } from "@/lib/pageSectionStyles";

type JourneyTimelineProps = {
  id: string;
  title: string;
  subtitle?: string;
  steps: JourneyStep[];
};

export function JourneyTimeline({
  id,
  title,
  subtitle,
  steps,
}: JourneyTimelineProps) {
  return (
    <section className={pageSectionPad} aria-labelledby={id}>
      <SectionContainer>
        <SectionHeadingDecorated
          id={id}
          title={title}
          subtitle={subtitle}
          className="mb-8 sm:mb-10"
        />
        <div className={cardShell}>
          <div className="px-5 py-6 sm:px-7 sm:py-7 lg:px-8 lg:py-8">
            <ol className="flex flex-col gap-7 sm:gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-4 xl:gap-6">
              {steps.map((step, index) => (
                <li
                  key={step.title}
                  className="flex flex-1 flex-col items-center px-1 text-center lg:max-w-[12rem] lg:px-2"
                >
                  <span className="inline-flex [&_svg]:!h-10 [&_svg]:!w-10 [&_svg]:!max-h-none [&_svg]:!max-w-none sm:[&_svg]:!h-11 sm:[&_svg]:!w-11">
                    <Icon name={step.icon} className="text-brand-teal" size="2x" />
                  </span>
                  <span className="mt-3 text-xs font-bold uppercase tracking-wide text-brand-purple-bright">
                    Step {index + 1}
                  </span>
                  <h3 className="mt-2 text-base font-bold text-brand-teal sm:text-lg">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-navy/85">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
