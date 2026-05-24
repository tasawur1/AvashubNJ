/**
 * Hero banner image paths only — edit these when swapping desktop vs mobile art.
 * Place files under public/images/home/ (paths here start with /images/...).
 */
export const heroBannerImages = {
  /** Wide desktop hero (1920×800) — shown at `lg` and up */
  heroBanner: "/images/home/hero-banner.png",
  /**
   * Mobile + tablet hero (e.g. 1080×1080) — shown below `lg`.
   * Suggested export name on disk: hero-banner-mobile.png
   */
  heroBannerMobile: "/images/home/hero-banner-mobile.png",
} as const;

export type HeroBannerImageKey = keyof typeof heroBannerImages;
