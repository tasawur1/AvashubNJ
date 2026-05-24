import type { IconName } from "@/data/icons";

/** HTML intro below page hero banner (text is not baked into hero images) */
export type PageIntroContent = {
  heading: string;
  subheading?: string;
  description: string;
  tagline?: string;
  cta?: { label: string; href: string };
};

export type JourneyStep = {
  icon: IconName;
  title: string;
  description: string;
};

export type EventCategory = {
  id: string;
  label: string;
  icon: IconName;
  description: string;
};
