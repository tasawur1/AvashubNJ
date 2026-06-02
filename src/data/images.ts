/**
 * Central image paths — update files under public/images/ and adjust paths here only.
 */
export const siteImages = {
  logo: "/images/logo.png",
  /** About desktop hero — shown at `lg` and up */
  aboutHeroBanner: "/images/About/hero-banner-about.png",
  /** About mobile + tablet hero — shown below `lg` */
  aboutHeroBannerMobile: "/images/About/hero-banner-about-mobile.png",
  kidsProgram: "/images/home/kids-program.png",
  schoolAgeProgram: "/images/home/school-age-program.png",
  teensProgram: "/images/home/teens-program.png",
  youngAdultsProgram: "/images/home/young-adults-program.png",
  afterSchoolOne: "/images/home/after-school-1.png",
  afterSchoolTwo: "/images/home/after-school-2.png",
  afterSchoolThree: "/images/home/after-school-3.png",
  afterSchoolFour: "/images/home/after-school-4.png",
  bottomBanner: "/images/home/bottom-banner.png",
  homeFinalCta: "/images/home/bottom-banner.png",
} as const;

export type SiteImageKey = keyof typeof siteImages;
