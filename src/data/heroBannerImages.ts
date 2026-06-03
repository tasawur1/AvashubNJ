/**
 * Hero banner image paths only — edit these when swapping desktop vs mobile art.
 * Place files under public/images/home/ (paths here start with /images/...).
 */
export const heroBannerImages = {
  /** Wide desktop hero (1920×800) — shown at `lg` and up */
  heroBanner: "/images/home/hero-banner.png",
  /**
   * Mobile + tablet hero — shown below `lg`.
   * Suggested export path on disk: public/images/home/mobile/hero-banner-mobile.png
   */
  heroBannerMobile: "/images/home/mobile/hero-banner-mobile.png",
} as const;

export type HeroBannerImageKey = keyof typeof heroBannerImages;
