import type { Metadata } from "next";
import { BottomBannerSection } from "@/components/BottomBannerSection";
import { HeroBanner } from "@/components/HeroBanner";
import { ProgramCard } from "@/components/ProgramCard";
import { SectionContainer } from "@/components/SectionContainer";
import { SectionHeading } from "@/components/SectionHeading";
import { WeAcceptSection } from "@/components/WeAcceptSection";
import { programCards } from "@/data/programs";

export const metadata: Metadata = {
  title: {
    absolute:
      "Ava's Hub | Life Skills & Independence for Kids, Teens & Young Adults",
  },
  description:
    "Ava's Hub provides occupational therapy-based life skills, independence, social skills, after-school programs, and vocational support for children, teens, and young adults in East Orange, NJ.",
  keywords: [
    "occupational therapy East Orange NJ",
    "pediatric OT",
    "teen life skills",
    "autism support",
    "NJ FamilyCare OT",
    "DDD programs",
    "Ava's Hub",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    url: "/",
    title:
      "Ava's Hub | Life Skills & Independence for Kids, Teens & Young Adults",
    description:
      "Occupational therapy-based life skills, after-school programs, and vocational support for neurodiverse youth in East Orange, NJ.",
  },
};

export default function HomePage() {
  return (
    <main className="flex-1">
      <h1 className="sr-only">
        Ava&apos;s Hub | Real-Life Skills and Independence for Kids, Teens, and
        Young Adults
      </h1>
      <p className="sr-only">
        Ava&apos;s Hub provides occupational therapy-based life skills,
        independence, social skills, after-school programs, and vocational
        support for children, teens, and young adults in East Orange, NJ.
      </p>

      <HeroBanner showCtas />

      <section
        id="programs"
        className="bg-gradient-to-b from-white via-brand-lavender/40 to-white py-14 sm:py-16 lg:py-20"
      >
        <SectionContainer>
          <SectionHeading title="Programs for Every Stage of Life" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-4 lg:gap-7 xl:gap-8">
            {programCards.map((program) => (
              <ProgramCard key={program.title} program={program} />
            ))}
          </div>
        </SectionContainer>
      </section>

      <WeAcceptSection />

      <BottomBannerSection />
    </main>
  );
}
