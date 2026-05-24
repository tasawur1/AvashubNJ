import Image from "next/image";
import { CTAButton } from "@/components/CTAButton";
import { Icon } from "@/components/Icon";
import { SectionContainer } from "@/components/SectionContainer";
import { siteImages } from "@/data/images";

export function BottomBannerSection() {
  return (
    <section
      className="relative flex flex-col overflow-hidden bg-gradient-to-br from-brand-teal via-[#006a76] to-brand-teal pb-0 text-white lg:min-h-[600px] lg:overflow-visible"
      aria-labelledby="bottom-banner-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, #FDBA2D 0, transparent 45%), radial-gradient(circle at 80% 0%, #5B2DC4 0, transparent 40%)",
        }}
        aria-hidden
      />

      <SectionContainer className="relative z-10 pt-14 pb-0 sm:pt-16 lg:py-20">
        <div className="relative z-20 max-w-xl lg:max-w-[min(100%,32rem)] lg:w-[38%] lg:py-4">
          <h2
            id="bottom-banner-heading"
            className="flex flex-wrap items-center gap-2 text-3xl font-extrabold leading-[1.15] sm:text-4xl lg:text-[2.5rem]"
          >
            Building Skills. Building Confidence. Building Futures.
            <Icon name="heart" className="text-brand-gold" size="lg" />
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/90 sm:text-lg">
            Ava&apos;s Hub is more than a therapy center — it&apos;s a place
            where abilities grow and independence begins.
          </p>
          <div className="mt-8">
            <CTAButton
              href="/contact"
              className="!bg-brand-gold !text-brand-navy hover:!bg-white"
            >
              Get in Touch
            </CTAButton>
          </div>
        </div>
      </SectionContainer>

      {/* Tablet + mobile: wide bottom-anchored group image */}
      <div className="relative z-10 mt-8 flex w-full items-end justify-center overflow-hidden lg:hidden">
        <Image
          src={siteImages.bottomBanner}
          alt="Families and staff celebrating progress at Ava's Hub"
          width={1400}
          height={1200}
          className="mb-0 block h-auto w-[120%] max-w-none leading-[0] object-contain object-[bottom_center] sm:w-[122%] md:w-[125%]"
          sizes="100vw"
        />
      </div>

      {/* Desktop (lg+): unchanged — absolute right, bottom-anchored, top overflow */}
      <div
        className="pointer-events-none absolute bottom-0 right-0 z-10 hidden h-[calc(100%+80px)] w-[60%] max-w-[920px] items-end justify-end pr-4 sm:pr-6 lg:flex lg:pr-8 xl:pr-10"
        aria-hidden
      >
        <Image
          src={siteImages.bottomBanner}
          alt=""
          width={1400}
          height={1200}
          className="h-auto w-full object-contain object-bottom object-right drop-shadow-[0_20px_40px_rgba(0,0,0,0.18)]"
          sizes="(max-width: 1536px) 60vw, 900px"
        />
      </div>
    </section>
  );
}
