import { CTAButton } from "@/components/CTAButton";
import { Icon } from "@/components/Icon";
import { SectionContainer } from "@/components/SectionContainer";

type ClosingCtaBannerProps = {
  heading: string;
  description: string;
  buttonLabel: string;
  buttonHref: string;
  id?: string;
};

/** Teal closing CTA band — same system as homepage BottomBannerSection */
export function ClosingCtaBanner({
  heading,
  description,
  buttonLabel,
  buttonHref,
  id = "closing-cta-heading",
}: ClosingCtaBannerProps) {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-brand-teal via-[#006a76] to-brand-teal py-12 text-white sm:py-14 lg:py-16"
      aria-labelledby={id}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, #FDBA2D 0, transparent 45%), radial-gradient(circle at 80% 0%, #5B2DC4 0, transparent 40%)",
        }}
        aria-hidden
      />
      <SectionContainer className="relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id={id}
            className="flex flex-wrap items-center justify-center gap-2 text-2xl font-extrabold leading-[1.15] sm:text-3xl lg:text-4xl"
          >
            {heading}
            <Icon name="heart" className="text-brand-gold" size="lg" />
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/90 sm:text-lg">
            {description}
          </p>
          <div className="mt-8 flex justify-center">
            <CTAButton
              href={buttonHref}
              className="!bg-brand-gold !text-brand-navy hover:!bg-white"
            >
              {buttonLabel}
            </CTAButton>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
