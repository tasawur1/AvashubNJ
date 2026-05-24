import type { Metadata } from "next";
import { AboutMissionApproachSection } from "@/components/about/AboutMissionApproachSection";
import { AboutProblemSection } from "@/components/about/AboutProblemSection";
import { AboutWhySection } from "@/components/about/AboutWhySection";
import { HeroBanner } from "@/components/HeroBanner";
import { siteImages } from "@/data/images";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Ava's Hub — our mission, approach, and commitment to real-life skills, social participation, and independence for children, teens, and young adults in East Orange, NJ.",
  alternates: { canonical: "/about" },
  openGraph: {
    url: "/about",
    title: "About Us | Ava's Hub",
    description:
      "Discover how Ava's Hub helps neurodiverse youth build confidence, independence, and meaningful connections through real-life skill development.",
  },
};

const ABOUT_HERO_ALT =
  "Ava\u2019s Hub About Us — occupational therapy-based life skills and independence";

export default function AboutPage() {
  return (
    <main className="flex-1 bg-white">
      <h1 className="sr-only">Ava&apos;s Hub About Us</h1>
      <p className="sr-only">
        Ava&apos;s Hub provides occupational therapy-based life skills, social
        participation, independence training, and real-life support for children,
        teens, and young adults.
      </p>

      <HeroBanner
        images={{
          desktop: siteImages.aboutHeroBanner,
          mobile: siteImages.aboutHeroBannerMobile,
        }}
        alt={ABOUT_HERO_ALT}
        showCtas={false}
      />

      <AboutProblemSection />
      <AboutMissionApproachSection />
      <AboutWhySection />
    </main>
  );
}
