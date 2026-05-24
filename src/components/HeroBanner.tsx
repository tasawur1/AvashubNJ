import Link from "next/link";
import { heroBannerImages } from "@/data/heroBannerImages";
import { sectionContainerClass } from "@/lib/sectionLayout";

const DEFAULT_ALT =
  "Ava's Hub hero banner showing real-life skills and independence for kids, teens, and young adults";

export type HeroBannerImages = {
  desktop: string;
  /** Falls back to desktop when omitted */
  mobile?: string;
};

export type HeroBannerProps = {
  images?: HeroBannerImages;
  alt?: string;
  /** Show overlaid CTA links (homepage only) */
  showCtas?: boolean;
  /** Lets mobile banners touch the screen edges while desktop stays contained. */
  mobileFullBleed?: boolean;
};

function HeroCTALinks({ className }: { className?: string }) {
  return (
    <div
      className={`flex flex-wrap gap-4 ${className ?? ""}`}
      role="navigation"
      aria-label="Hero calls to action"
    >
      {/* CTA buttons are intentionally overlaid so the banner image can be replaced without changing page content. */}
      <Link href="/programs" className="hero-cta hero-cta-primary">
        Our Programs
      </Link>
      <Link href="/contact" className="hero-cta hero-cta-secondary">
        Schedule a Tour
      </Link>
    </div>
  );
}

const desktopOuterClass = `${sectionContainerClass} hidden pb-6 pt-2 sm:pb-7 md:block lg:pb-8 xl:pb-10`;
const mobileOuterClass = "pb-6 pt-2 sm:pb-7 md:hidden";

export function HeroBanner({
  images = {
    desktop: heroBannerImages.heroBanner,
    mobile: heroBannerImages.heroBannerMobile,
  },
  alt = DEFAULT_ALT,
  showCtas = false,
  mobileFullBleed = true,
}: HeroBannerProps) {
  const mobileSrc = images.mobile ?? images.desktop;

  return (
    <section className="w-full bg-white" aria-label="Hero">
      <div className={mobileOuterClass}>
        <div
          className={
            `relative overflow-hidden bg-white ` +
            (mobileFullBleed
              ? "w-screen max-w-none rounded-none"
              : "mx-4 rounded-2xl ring-1 ring-brand-teal/10")
          }
        >
          <picture>
            <source media="(min-width: 768px)" srcSet={images.desktop} />
            <img
              src={mobileSrc}
              alt={alt}
              className="block h-auto w-full"
              loading="eager"
              decoding="async"
            />
          </picture>
        </div>
        {showCtas ? (
          <div className="flex w-full justify-center px-4 pt-4 sm:pt-5">
            <HeroCTALinks className="justify-center" />
          </div>
        ) : null}
      </div>

      <div className={desktopOuterClass}>
        <div className="relative w-full overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-brand-teal/10 xl:rounded-3xl">
          <picture>
            <source media="(max-width: 767px)" srcSet={mobileSrc} />
            <img
              src={images.desktop}
              alt={alt}
              className="block h-auto w-full"
              loading="eager"
              decoding="async"
            />
          </picture>
          {showCtas ? (
            <div className="absolute bottom-[10%] left-[6%] z-10 lg:bottom-[11%] xl:bottom-[12%]">
              <HeroCTALinks />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
