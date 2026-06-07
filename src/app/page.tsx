import type { Metadata } from "next";
import { CTAButton } from "@/components/CTAButton";
import { Icon } from "@/components/Icon";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { SectionContainer } from "@/components/SectionContainer";
import { heroBannerImages } from "@/data/heroBannerImages";
import { siteImages } from "@/data/images";
import { programsImages } from "@/data/pageImages/programsImages";
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

const desktopProgramCards = [
  {
    image: programsImages.kidsProgramImage,
    imagePosition: "object-[50%_38%]",
    title: "Kids Program",
    age: "Ages 3-7",
    description:
      "Play-based occupational therapy support that helps young children build the foundation for confidence, curiosity, regulation, and everyday independence.",
    workOn: [
      "Fine motor skills",
      "Sensory processing",
      "Developmental play",
      "Motor planning",
      "Self-care routines",
      "Early social participation",
      "Pre-writing readiness",
    ],
    goodFit: [
      "Children who avoid tasks",
      "Children who struggle with transitions",
      "Children needing help with play, routines, or regulation",
    ],
  },
  {
    image: programsImages.schoolAgeProgramImage,
    imagePosition: "object-[50%_34%]",
    title: "School-Age Program",
    age: "Ages 8-13",
    description:
      "Practical support for school-aged children who need help with confidence, organization, handwriting, emotional regulation, and participation at school and home.",
    workOn: [
      "Executive functioning",
      "Handwriting and fine motor skills",
      "Daily routines",
      "Attention and task completion",
      "Social participation",
      "Movement and coordination",
      "Emotional regulation",
      "ADL independence",
    ],
    goodFit: [
      "Children who struggle with homework routines",
      "Children with messy handwriting",
      "Children who need support with organization, confidence, or independence",
    ],
  },
  {
    image: programsImages.teenProgramImage,
    imagePosition: "object-[50%_32%]",
    title: "Teen Life Skills Program",
    age: "Ages 14-18",
    description:
      "Real-world therapy and coaching that helps teens build independence, confidence, self-advocacy, and daily life skills before adulthood.",
    workOn: [
      "Self-care and hygiene routines",
      "Executive functioning",
      "Time management",
      "Meal prep and kitchen safety",
      "Community participation",
      "Emotional regulation",
      "Social confidence",
      "Self-advocacy",
      "Transition planning",
    ],
    goodFit: [
      "Teens preparing for high school independence",
      "Teens needing life skills beyond worksheets",
      "Teens who need confidence, structure, and real-world practice",
    ],
  },
  {
    image: programsImages.youngAdultProgramImage,
    imagePosition: "object-[50%_34%]",
    title: "Young Adult Life Readiness",
    age: "Ages 19-21+",
    description:
      "Functional, community-based skill-building for young adults preparing for work, independence, social participation, and meaningful daily routines.",
    workOn: [
      "Vocational readiness",
      "Work habits",
      "Community participation",
      "Independent living skills",
      "Money and time management",
      "Meal planning",
      "Household routines",
      "Social communication",
      "Daily structure",
    ],
    goodFit: [
      "Young adults transitioning out of school",
      "Young adults needing real-life practice",
      "Young adults building confidence for work and community life",
    ],
  },
] as const;

const desktopResourceCards = [
  {
    icon: "bookOpen",
    title: "Parent Guides & Resources",
    text: "Practical tools, visual schedules, and downloads.",
  },
  {
    icon: "training",
    title: "Workshops & Events",
    text: "Parent education, support groups, and more.",
  },
  {
    icon: "calendar",
    title: "Community Calendar",
    text: "Events, meetups, and social opportunities.",
  },
] as const;

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

function DesktopHomePage() {
  return (
    <div className="hidden bg-[#fffaf4] lg:block">
      {/*
        HOME PAGE DESKTOP MEMORY:
        Desktop grows from the mobile homepage instead of using a separate
        legacy layout. Preserve mobile content, warm spacing, rounded cards,
        emotional language, and app-like card styling; only expand and reflow.
        Reuse detailed page-specific cards/accordions and support sections
        when they strengthen desktop depth without changing mobile.
      */}
      <section className="min-h-[calc(100vh-5rem)] py-9 xl:py-12">
        <SectionContainer className="grid min-h-[74vh] items-center gap-10 xl:grid-cols-[0.43fr_0.57fr] xl:gap-12 2xl:gap-16">
          <div className="rounded-[2.25rem] bg-[#fffaf4]/95 p-8 shadow-card ring-1 ring-brand-purple-deep/10 xl:p-10 2xl:p-12">
            <p className="inline-flex rounded-full bg-brand-lavender px-4 py-1.5 text-xs font-extrabold uppercase tracking-normal text-brand-purple-deep">
              More Than Therapy
            </p>
            <h2 className="mt-6 max-w-xl text-[clamp(2.75rem,4.2vw,4.65rem)] font-extrabold leading-[1.02] tracking-tight text-brand-navy">
              A Place Where Your Child Can{" "}
              <span className="italic text-brand-purple-bright">
                Truly Belong
              </span>
              <span className="ml-3 whitespace-nowrap text-brand-purple-bright/55">
                <TiltedHeartOutline />
              </span>
            </h2>
            <p className="mt-6 max-w-lg text-[clamp(1rem,1.15vw,1.15rem)] leading-relaxed text-brand-navy/85">
              At Ava&apos;s Hub, we help children and teens build confidence,
              independence, friendships, and real-life skills through
              meaningful, relationship-based occupational therapy.
            </p>

            <div className="mt-8 flex max-w-lg gap-5 rounded-3xl bg-white/92 p-6 shadow-card ring-1 ring-brand-purple-deep/10">
              <Icon
                name="heart"
                className="mt-1 shrink-0 text-brand-purple-bright"
                size="2x"
              />
              <p className="text-base font-semibold leading-relaxed text-brand-navy/85">
                Because families deserve more than worksheets, waiting rooms,
                and one-size-fits-all therapy.
              </p>
            </div>

            <div className="mt-8 flex max-w-xl flex-wrap gap-4">
              <CTAButton href="/contact" className="min-w-[15rem]">
                <span className="inline-flex items-center gap-2">
                  <Icon name="calendar" size="sm" />
                  Schedule a Consultation
                </span>
              </CTAButton>
              <CTAButton
                href="#programs-desktop"
                variant="secondary"
                className="min-w-[13rem]"
              >
                <span className="inline-flex items-center gap-2">
                  <Icon name="resources" size="sm" />
                  See How We Help
                </span>
              </CTAButton>
            </div>
            <a
              href="/contact"
              className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-navy underline underline-offset-4"
            >
              <Icon name="community" size="sm" />
              Join the Waitlist
            </a>
          </div>

          <div className="relative">
            <div className="absolute -left-8 top-10 h-52 w-52 rounded-full bg-brand-lavender/45 blur-3xl" />
            <div className="absolute -bottom-10 right-8 h-56 w-56 rounded-full bg-brand-gold/20 blur-3xl" />
            <div className="relative overflow-hidden rounded-[4rem_2rem_4rem_2rem] bg-brand-teal-light shadow-card ring-1 ring-brand-teal/10 xl:rounded-[7rem_3rem_7rem_3rem]">
              <PlaceholderImage
                src={heroBannerImages.heroBannerMobile}
                alt="Ava's Hub child and caregiver occupational therapy"
                width={1021}
                height={1540}
                priority
                className="h-[min(78vh,50rem)] w-full object-cover object-[50%_36%]"
                sizes="(min-width: 1280px) 54vw, 50vw"
              />
            </div>
          </div>
        </SectionContainer>
      </section>

      <section className="pb-10">
        <SectionContainer>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {valueCards.map((card) => (
              <article
                key={card.title}
                className="rounded-3xl bg-white/90 p-6 text-center shadow-card ring-1 ring-brand-purple-deep/10"
              >
                <Icon
                  name={card.icon}
                  className="text-brand-purple-bright"
                  size="2x"
                />
                <h3 className="mt-4 text-base font-extrabold leading-snug text-brand-navy">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-brand-navy/75">
                  {card.description}
                </p>
              </article>
            ))}
          </div>
        </SectionContainer>
      </section>

      <section className="pb-12">
        <SectionContainer>
          <div className="rounded-[2rem] bg-gradient-to-br from-[#0f5758] to-[#063f46] p-10 text-white shadow-card">
            <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
              <div className="max-w-3xl">
                <h2 className="text-[clamp(2rem,2.8vw,3rem)] font-extrabold leading-tight">
                  Therapy should fit your child, not the other way around.
                </h2>
                <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/90">
                  We meet your child where they are and help them grow in ways
                  that matter most.
                </p>
              </div>
              <Icon name="independence" className="text-brand-gold" size="4x" />
            </div>
          </div>
        </SectionContainer>
      </section>

      <section id="programs-desktop" className="pb-12">
        <SectionContainer>
          <h2 className="font-serif text-[clamp(2.1rem,3.2vw,3.4rem)] font-semibold leading-tight tracking-tight text-brand-navy">
            Programs for Every Stage
            <span className="ml-3 text-brand-purple-bright/55">
              <TiltedHeartOutline />
            </span>
          </h2>
          <div className="mt-8 grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
            {desktopProgramCards.map((program) => (
              <article
                key={program.title}
                className="overflow-hidden rounded-3xl bg-white/90 shadow-card ring-1 ring-brand-teal/10"
              >
                <div className="relative h-48 bg-brand-teal-light xl:h-52">
                  <PlaceholderImage
                    src={program.image}
                    alt={`${program.title} at Ava's Hub`}
                    fill
                    className={`object-cover ${program.imagePosition}`}
                    sizes="(min-width: 1280px) 25vw, 50vw"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-extrabold leading-tight text-brand-navy">
                        {program.title}
                      </h3>
                      <p className="mt-1 text-sm font-bold text-brand-purple-bright">
                        {program.age}
                      </p>
                    </div>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-purple-bright text-white shadow-sm">
                      <Icon name="arrowRight" size="sm" />
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-brand-navy/80">
                    {program.description}
                  </p>

                  <details className="mt-4 rounded-2xl bg-brand-lavender/45 p-4">
                    <summary className="cursor-pointer text-sm font-extrabold text-brand-navy">
                      What we work on
                    </summary>
                    <ul className="mt-3 space-y-2">
                      {program.workOn.map((item) => (
                        <li
                          key={item}
                          className="flex gap-2 text-xs leading-relaxed text-brand-navy/80"
                        >
                          <Icon
                            name="check"
                            className="mt-0.5 shrink-0 text-brand-teal"
                            size="sm"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </details>

                  <details className="mt-3 rounded-2xl bg-brand-teal-light/70 p-4">
                    <summary className="cursor-pointer text-sm font-extrabold text-brand-navy">
                      Good fit for
                    </summary>
                    <ul className="mt-3 space-y-2">
                      {program.goodFit.map((item) => (
                        <li
                          key={item}
                          className="flex gap-2 text-xs leading-relaxed text-brand-navy/80"
                        >
                          <Icon
                            name="heart"
                            className="mt-0.5 shrink-0 text-brand-purple-bright"
                            size="sm"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </details>
                </div>
              </article>
            ))}
          </div>
        </SectionContainer>
      </section>

      <section className="pb-12">
        <SectionContainer>
          <h2 className="font-serif text-[clamp(2rem,3vw,3rem)] font-semibold leading-tight text-brand-navy">
            Resources & Support for Families
            <span className="ml-3 text-brand-purple-bright/55">
              <TiltedHeartOutline />
            </span>
          </h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-brand-navy/70">
            Tools, education, and community, just for you.
          </p>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {desktopResourceCards.map((card) => (
              <article
                key={card.title}
                className="rounded-[1.75rem] bg-white/90 p-6 shadow-card ring-1 ring-brand-purple-deep/10"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-lavender text-brand-purple-bright">
                  <Icon name={card.icon} size="lg" />
                </span>
                <h3 className="mt-5 text-xl font-extrabold leading-tight text-brand-navy">
                  {card.title}
                </h3>
                <p className="mt-3 min-h-12 text-sm leading-relaxed text-brand-navy/75">
                  {card.text}
                </p>
                <span className="mt-5 flex h-9 w-9 items-center justify-center rounded-full border border-brand-purple-deep text-brand-purple-deep">
                  <Icon name="arrowRight" size="sm" />
                </span>
              </article>
            ))}
          </div>
        </SectionContainer>
      </section>

      <section className="pb-14">
        <SectionContainer>
          <div className="grid gap-5 xl:grid-cols-[1fr_0.85fr]">
            <div className="rounded-[2rem] bg-brand-lavender/70 p-8 shadow-card ring-1 ring-brand-purple-deep/10">
              <TiltedHeartOutline className="text-[3rem] text-brand-purple-bright/55" />
              <p className="mt-5 text-2xl font-extrabold leading-relaxed text-brand-navy">
                Every child is unique.
                <br />
                Every stage is important.
              </p>
              <p className="mt-3 text-2xl font-extrabold text-brand-purple-bright">
                We&apos;re here for every step of the way.
              </p>
            </div>

            <div className="rounded-[2rem] bg-brand-purple-bright p-8 text-white shadow-card">
              <div className="flex h-full items-center justify-between gap-8">
                <div>
                  <h2 className="text-2xl font-extrabold leading-tight">
                    Ready to Get Started?
                  </h2>
                  <p className="mt-2 text-base text-white/90">
                    We&apos;d love to meet your family.
                  </p>
                </div>
                <CTAButton
                  href="/contact"
                  variant="secondary"
                  className="shrink-0 !border-white !bg-white !px-6 !py-3 !text-brand-purple-deep hover:!bg-brand-lavender"
                >
                  <span className="inline-flex items-center justify-center gap-2">
                    <Icon name="calendar" size="sm" />
                    Schedule Consultation
                  </span>
                </CTAButton>
              </div>
            </div>
          </div>
        </SectionContainer>
      </section>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="flex-1 bg-[#fffaf4]">
      <h1 className="sr-only">
        Ava&apos;s Hub | Real-Life Skills and Independence for Kids, Teens, and
        Young Adults
      </h1>
      <p className="sr-only">
        Ava&apos;s Hub provides occupational therapy-based life skills,
        independence, social skills, after-school programs, and vocational
        support for children, teens, and young adults in East Orange, NJ.
      </p>

      <div className="lg:hidden">
        <section className="px-6 pb-8 pt-5">
          <div className="rounded-[2rem] bg-[#fffaf4]">
            <div className="mx-auto w-full overflow-hidden rounded-[2rem] bg-brand-teal-light shadow-card">
              <PlaceholderImage
                src={heroBannerImages.heroBannerMobile}
                alt="Ava's Hub child and caregiver occupational therapy"
                width={1021}
                height={1540}
                priority
                className="block h-auto w-full"
                sizes="100vw"
              />
            </div>

            <div className="mt-7">
              <p className="inline-flex rounded-full bg-brand-lavender px-3 py-1 text-xs font-extrabold uppercase tracking-normal text-brand-purple-deep">
                More Than Therapy
              </p>
              <h2 className="mt-5 text-[clamp(2rem,9vw,2.35rem)] font-extrabold leading-[1.05] tracking-tight text-brand-navy">
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

        <section id="programs-mobile" className="px-5 pb-8 min-[520px]:px-6">
          <h2 className="whitespace-nowrap font-serif text-[clamp(1.32rem,6vw,1.72rem)] font-semibold leading-tight tracking-tight text-brand-navy">
            Programs for Every Stage
            <span className="ml-2 text-brand-purple-bright/55 min-[520px]:ml-3">
              <TiltedHeartOutline />
            </span>
          </h2>
          <div className="mt-5 space-y-4">
            {mobilePrograms.map((program) => (
              <article
                key={program.title}
                className="grid grid-cols-[clamp(5.75rem,28vw,8rem)_minmax(0,1fr)_2.25rem] items-center gap-3 rounded-3xl bg-white/90 p-3 shadow-card ring-1 ring-brand-teal/10 min-[520px]:grid-cols-[8rem_1fr_auto] min-[520px]:gap-4"
              >
                <div className="relative h-20 overflow-hidden rounded-2xl bg-brand-teal-light min-[520px]:h-24">
                  <PlaceholderImage
                    src={siteImages[program.imageKey]}
                    alt={`${program.title} program`}
                    fill
                    className="object-cover"
                    sizes="128px"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="text-[clamp(0.95rem,4.2vw,1.125rem)] font-extrabold leading-tight text-brand-purple-bright">
                    {program.title}
                    <span className="ml-1.5 text-[clamp(0.86rem,3.8vw,1rem)] font-bold text-brand-navy/50 min-[520px]:ml-2">
                      {program.ageRange}
                    </span>
                  </h3>
                  <p className="mt-1.5 text-[clamp(0.78rem,3.4vw,0.875rem)] leading-relaxed text-brand-navy/85 min-[520px]:mt-2">
                    {program.description}
                  </p>
                </div>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-purple-bright text-white shadow-sm min-[520px]:h-10 min-[520px]:w-10">
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

      <DesktopHomePage />
    </main>
  );
}
