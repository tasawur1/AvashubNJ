/**
 * Global horizontal layout — keep in sync with SectionContainer and HeroBanner.
 */
export const sectionMaxWidthClass = "max-w-[1440px]";

/** Hero-aligned horizontal padding */
export const sectionPaddingXClass =
  "px-4 sm:px-6 lg:px-8 xl:px-10";

export const sectionContainerClass = [
  "mx-auto w-full",
  sectionMaxWidthClass,
  sectionPaddingXClass,
].join(" ");
