import type { Metadata } from "next";
import { BottomBannerSection } from "@/components/BottomBannerSection";
import { CTAButton } from "@/components/CTAButton";
import { HeroBanner } from "@/components/HeroBanner";
import { Icon } from "@/components/Icon";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { ProgramCard } from "@/components/ProgramCard";
import { SectionContainer } from "@/components/SectionContainer";
import { SectionHeading } from "@/components/SectionHeading";
import { WeAcceptSection } from "@/components/WeAcceptSection";
import { heroBannerImages } from "@/data/heroBannerImages";
import { siteImages } from "@/data/images";
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

const valueCards = [
  {
    icon: "home",
    title: "Real-Life Skills",
    description: "Practical skills for everyday success.",
  },
  {
    icon: "confidence",
    title: "Confidence",
    description: "Building self-esteem that lasts.",
  },
  {
    icon: "independence",
    title: "Independence",
    description: "Supporting growth at every step.",
  },
  {
    icon: "community",
    title: "Belonging",
    description: "A safe space to be seen and heard.",
  },
  {
    icon: "heart",
    title: "Relationship-Based Care",
    description: "Connection that makes a difference.",
  },
] as const;

const mobilePrograms = [
  {
    ...programCards[0],
    description:
      "Building the foundation for confidence, curiosity, and everyday success.",
  },
  {
    ...programCards[1],
    description:
      "Building independence and self-confidence at school and beyond.",
  },
  {
    ...programCards[2],
    description:
      "Skills and support for independence, life transitions, and self-advocacy.",
  },
  {
    ...programCards[3],
    description:
      "Real-world skills for work, community, and independent living.",
  },
];

function TiltedHeartOutline({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={`inline-block h-[1em] w-[1em] rotate-[-12deg] align-[-0.08em] ${className}`}
      fill="none"
    >
      <path
        d="M20.4 5.7c-1.8-1.9-4.7-1.9-6.5 0L12 7.6l-1.9-1.9c-1.8-1.9-4.7-1.9-6.5 0-1.9 2-1.9 5.1 0 7.1L12 21l8.4-8.2c1.9-2 1.9-5.1 0-7.1z"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function HomePage() {
  return (
    <main className="flex-1 bg-[#fffaf4] md:bg-white">
      <h1 className="sr-only">
        Ava&apos;s Hub | Real-Life Skills and Independence for Kids, Teens, and
        Young Adults
      </h1>
      <p className="sr-only">
        Ava&apos;s Hub provides occupational therapy-based life skills,
        independence, social skills, after-school programs, and vocational
        support for children, teens, and young adults in East Orange, NJ.
      </p>

      <div className="md:hidden">
        <section className="px-6 pb-8 pt-5">
          <div className="rounded-[2rem] bg-[#fffaf4]">
            <div className="relative mx-auto aspect-[4/3] w-full overflow-hidden rounded-[2rem] bg-brand-teal-light shadow-card">
              <PlaceholderImage
                src={heroBannerImages.heroBannerMobile}
                alt="Ava's Hub child and caregiver occupational therapy"
                fill
                priority
                className="object-cover object-center"
                sizes="100vw"
              />
            </div>

            <div className="mt-7">
              <p className="inline-flex rounded-full bg-brand-lavender px-3 py-1 text-xs font-extrabold uppercase tracking-normal text-brand-purple-deep">
                More Than Therapy
              </p>
              <h2 className="mt-5 text-[2.35rem] font-extrabold leading-[1.05] tracking-tight text-brand-navy">
                A Place Where Your Child Can{" "}
                <span className="italic text-brand-purple-bright">
                  Truly Belong
                </span>
                <span className="ml-3 whitespace-nowrap text-brand-purple-bright/55">
                  <TiltedHeartOutline />
                </span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-brand-navy/85">
                At Ava&apos;s Hub, we help children and teens build confidence,
                independence, friendships, and real-life skills through
                meaningful, relationship-based occupational therapy.
              </p>
            </div>

            <div className="mt-6 flex gap-4 rounded-3xl bg-white/90 p-5 shadow-card ring-1 ring-brand-purple-deep/10">
              <Icon name="heart" className="mt-1 text-brand-purple-bright" size="lg" />
              <p className="text-sm font-semibold leading-relaxed text-brand-navy/85">
                Because families deserve more than worksheets, waiting rooms,
                and one-size-fits-all therapy.
              </p>
            </div>

            <div className="mt-6 space-y-3">
              <CTAButton href="/contact" className="w-full">
                <span className="inline-flex items-center gap-2">
                  <Icon name="calendar" size="sm" />
                  Schedule a Consultation
                </span>
              </CTAButton>
              <CTAButton href="#programs-mobile" variant="secondary" className="w-full">
                <span className="inline-flex items-center gap-2">
                  <Icon name="resources" size="sm" />
                  See How We Help
                </span>
              </CTAButton>
              <a
                href="/contact"
                className="flex items-center justify-center gap-2 pt-1 text-sm font-bold text-brand-navy underline underline-offset-4"
              >
                <Icon name="community" size="sm" />
                Join the Waitlist
              </a>
            </div>
          </div>
        </section>

        <section className="pb-8">
          <div className="overflow-x-auto px-6 pb-2">
            <div className="flex min-w-max gap-4">
              {valueCards.map((card) => (
                <article
                  key={card.title}
                  className="w-36 rounded-3xl bg-white/90 p-5 text-center shadow-card ring-1 ring-brand-purple-deep/10"
                >
                  <Icon
                    name={card.icon}
                    className="text-brand-purple-bright"
                    size="2x"
                  />
                  <h3 className="mt-4 text-sm font-extrabold leading-snug text-brand-navy">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-brand-navy/75">
                    {card.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 pb-9">
          <div className="rounded-[1.75rem] bg-gradient-to-br from-[#0f5758] to-[#063f46] p-7 text-white shadow-card">
            <div className="grid grid-cols-[1fr_auto] gap-5">
              <div>
                <h2 className="text-2xl font-extrabold leading-tight">
                  Therapy should fit your child, not the other way around.
                </h2>
                <p className="mt-4 text-base leading-relaxed text-white/90">
                  We meet your child where they are and help them grow in ways
                  that matter most.
                </p>
              </div>
              <Icon name="independence" className="mt-2 text-brand-gold" size="2x" />
            </div>
          </div>
        </section>

        <section id="programs-mobile" className="px-6 pb-8">
          <h2 className="whitespace-nowrap font-serif text-[1.72rem] font-semibold leading-tight tracking-tight text-brand-navy">
            Programs for Every Stage
            <span className="ml-3 text-brand-purple-bright/55">
              <TiltedHeartOutline />
            </span>
          </h2>
          <div className="mt-5 space-y-4">
            {mobilePrograms.map((program) => (
              <article
                key={program.title}
                className="grid grid-cols-[8rem_1fr_auto] items-center gap-4 rounded-3xl bg-white/90 p-3 shadow-card ring-1 ring-brand-teal/10"
              >
                <div className="relative h-24 overflow-hidden rounded-2xl bg-brand-teal-light">
                  <PlaceholderImage
                    src={siteImages[program.imageKey]}
                    alt={`${program.title} program`}
                    fill
                    className="object-cover"
                    sizes="128px"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg font-extrabold leading-tight text-brand-purple-bright">
                    {program.title}
                    <span className="ml-2 text-base font-bold text-brand-navy/50">
                      {program.ageRange}
                    </span>
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-navy/85">
                    {program.description}
                  </p>
                </div>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-purple-bright text-white shadow-sm">
                  <Icon name="arrowRight" size="sm" />
                </span>
              </article>
            ))}
          </div>
        </section>

        <section className="px-6 pb-10">
          <div className="overflow-hidden rounded-[1.75rem] bg-brand-lavender/70 shadow-card ring-1 ring-brand-purple-deep/10">
            <div className="p-6">
              <TiltedHeartOutline className="text-[2.4rem] text-brand-purple-bright/55" />
              <p className="mt-4 text-lg font-extrabold leading-relaxed text-brand-navy">
                Every child is unique.
                <br />
                Every stage is important.
              </p>
              <p className="mt-3 text-lg font-extrabold text-brand-purple-bright">
                We&apos;re here for every step of the way.
              </p>
            </div>
          </div>

          <div className="mt-4 rounded-[1.75rem] bg-brand-purple-bright p-5 text-white shadow-card">
            <div className="flex flex-col gap-4">
              <div>
                <h2 className="text-xl font-extrabold leading-tight">
                  Ready to Get Started?
                </h2>
                <p className="mt-1 text-sm text-white/90">
                  We&apos;d love to meet your family.
                </p>
              </div>
              <CTAButton
                href="/contact"
                variant="secondary"
                className="w-full !border-white !bg-white !px-4 !py-3 !text-brand-purple-deep hover:!bg-brand-lavender"
              >
                <span className="inline-flex items-center justify-center gap-2">
                  <Icon name="calendar" size="sm" />
                  <span className="text-xs">Schedule Consultation</span>
                </span>
              </CTAButton>
            </div>
          </div>
        </section>
      </div>

      <div className="hidden md:block">
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
      </div>
    </main>
  );
}
