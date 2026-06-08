import type { Metadata } from "next";
import { CTAButton } from "@/components/CTAButton";
import { Icon } from "@/components/Icon";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { SectionContainer } from "@/components/SectionContainer";
import type { IconName } from "@/data/icons";
import { programsImages } from "@/data/pageImages/programsImages";

export const metadata: Metadata = {
  title: "Ava's Hub Programs | Pediatric OT, Life Skills & Family Support",
  description:
    "Explore Ava's Hub programs for kids, school-age children, teens, young adults, and families, including occupational therapy, life skills, executive functioning, ADLs, sensory support, social participation, and parent coaching.",
  alternates: { canonical: "/programs" },
  openGraph: {
    url: "/programs",
    title: "Ava's Hub Programs | Pediatric OT, Life Skills & Family Support",
    description:
      "Programs for kids, school-age children, teens, young adults, and families, including OT, life skills, sensory support, and parent coaching.",
  },
};

type Tone = "purple" | "teal" | "gold" | "pink";

type SupportCard = {
  icon: IconName;
  title: string;
  eyebrow: string;
  bullets: string[];
  tagline: string;
  tone: Exclude<Tone, "pink">;
};

type FeatureItem = {
  icon: IconName;
  title: string;
  description: string;
  tone: Exclude<Tone, "pink">;
};

const toneStyles = {
  purple: {
    icon: "bg-brand-purple-deep text-white",
    softIcon: "bg-brand-lavender text-brand-purple-bright",
    text: "text-brand-purple-deep",
    pill: "bg-brand-purple-deep text-white",
    card: "bg-brand-lavender/70 ring-brand-purple-deep/10",
  },
  teal: {
    icon: "bg-brand-teal text-white",
    softIcon: "bg-brand-teal-light text-brand-teal",
    text: "text-brand-teal",
    pill: "bg-brand-teal text-white",
    card: "bg-brand-teal-light/70 ring-brand-teal/10",
  },
  gold: {
    icon: "bg-brand-gold text-brand-navy",
    softIcon: "bg-brand-gold/20 text-brand-navy",
    text: "text-brand-gold",
    pill: "bg-brand-gold text-brand-navy",
    card: "bg-brand-gold/12 ring-brand-gold/20",
  },
  pink: {
    softIcon: "bg-[#FBE7EC] text-brand-purple-bright",
    card: "bg-[#FFF1F4] ring-brand-purple-deep/10",
  },
} satisfies Record<string, Record<string, string>>;

const supportCards: SupportCard[] = [
  {
    icon: "community",
    title: "Individual Parent Coaching",
    eyebrow: "(OT-Based)",
    tone: "purple",
    bullets: [
      "Coping strategies & emotional regulation",
      "Executive functioning support",
      "Burnout prevention & stress management",
      "Building routines & systems that work for your family",
    ],
    tagline: "Focus on YOU and your well-being.",
  },
  {
    icon: "family",
    title: "Parent + Child Coaching",
    eyebrow: "(OT-Based)",
    tone: "teal",
    bullets: [
      "Play skills you can do together",
      "Co-regulation & connection strategies",
      "Real-time coaching during interactions",
      "Strengthen communication & engagement",
      "Make everyday moments meaningful",
    ],
    tagline: "Better connection. Better outcomes.",
  },
  {
    icon: "heart",
    title: "Parent Partnership Sessions",
    eyebrow: "(OT-Based)",
    tone: "gold",
    bullets: [
      "Work as a team & stay aligned",
      "Division of responsibilities & consistent routines",
      "Support each other in caregiving roles",
      "Reduce overwhelm & build a stronger partnership",
    ],
    tagline: "Stronger parents. Stronger families.",
  },
];

const insuranceOptions = [
  "Major Insurance Plans",
  "NJ FamilyCare / Medicaid",
  "Private Pay Options",
  "Superbills Available",
] as const;

const benefits = [
  "Reduce stress and overwhelm",
  "Build confidence in your parenting",
  "Improve routines and daily flow",
  "Strengthen family relationships",
  "Prevent burnout and feel supported",
  "Create a happier, more connected home",
];

const featureItems: FeatureItem[] = [
  {
    icon: "family",
    title: "OT-Based Coaching",
    description: "Practical. Effective. Evidence-informed.",
    tone: "purple",
  },
  {
    icon: "shieldHeart",
    title: "Parent Focused",
    description: "Support for YOU, so your child can thrive.",
    tone: "teal",
  },
  {
    icon: "home",
    title: "Real-Life Strategies",
    description: "Tools you can use every day.",
    tone: "gold",
  },
  {
    icon: "heart",
    title: "Stronger Families",
    description: "Better connection. Better outcomes.",
    tone: "purple",
  },
  {
    icon: "confidence",
    title: "Made With Love",
    description: "For families in our community.",
    tone: "gold",
  },
];

const helpCards = [
  {
    icon: "resources",
    title: "Executive Function & Daily Life Skills",
    intro:
      "My child struggles with attention, routines, organization, or transitions.",
    tone: "teal",
  },
  {
    icon: "heart",
    title: "Social Skills & Relationship Building",
    intro:
      "My child struggles with friendships, emotions, social situations, or confidence.",
    tone: "purple",
  },
  {
    icon: "home",
    title: "Life Skills & Independence",
    intro:
      "My child needs support with dressing, hygiene, self-care, or independence.",
    tone: "gold",
  },
  {
    icon: "puzzlePiece",
    title: "Developmental Play & Early Skills",
    intro:
      "I'm worried about development, sensory needs, play skills, or milestones.",
    tone: "pink",
  },
] as const;

const mobilePrograms = [
  {
    image: programsImages.kidsProgramImage,
    title: "Kids Program",
    age: "Ages 3-7",
    detailHref: "/programs/kids",
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
    title: "School-Age Program",
    age: "Ages 8-13",
    detailHref: "/programs/school-age",
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
    title: "Teen Life Skills Program",
    age: "Ages 14-18",
    detailHref: "/programs/teens",
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
];

const serviceCards = [
  {
    icon: "shieldHeart",
    title: "Occupational Therapy",
    badge: "Now Accepting Clients",
    badgeClass: "bg-brand-gold/25 text-brand-navy",
    description:
      "Helping children and teens build independence, confidence, and everyday life skills through meaningful activities.",
    skills: [
      "Fine Motor Skills",
      "Handwriting & School Skills",
      "Sensory Processing Support",
      "Executive Functioning",
      "Daily Living Skills (ADLs)",
      "Social Participation",
    ],
    featured: true,
  },
  {
    icon: "communication",
    title: "Speech Therapy",
    badge: "Coming Soon",
    badgeClass: "bg-brand-lavender text-brand-purple-deep",
    description:
      "Supporting communication, language development, social interaction, and confidence through meaningful participation.",
    skills: [
      "Expressive & Receptive Language",
      "Social Communication Skills",
      "Articulation Support",
      "AAC & Communication Tools",
      "Feeding & Oral Motor Support",
      "Functional Communication",
    ],
    featured: false,
  },
  {
    icon: "independence",
    title: "Physical Therapy",
    badge: "Coming Soon",
    badgeClass: "bg-brand-teal-light text-brand-teal",
    description:
      "Helping children build strength, coordination, movement confidence, and participation in everyday activities.",
    skills: [
      "Gross Motor Skills",
      "Balance & Coordination",
      "Strength & Endurance",
      "Mobility & Movement",
      "Posture & Body Awareness",
      "Functional Participation",
    ],
    featured: false,
  },
] as const;

const resourceCards = [
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

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3 text-left">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-relaxed text-brand-navy/85">
          <Icon name="check" className="mt-1 text-brand-teal" size="sm" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function MobileProgramHero() {
  return (
    <section className="px-6 pb-8 pt-5">
      <div className="rounded-[2rem] bg-[#fffaf4]">
        <div className="mx-auto w-full overflow-hidden rounded-[2rem] bg-brand-teal-light shadow-card">
          <PlaceholderImage
            src={programsImages.programsHeroMobile}
            alt="Ava's Hub programs mobile hero banner"
            width={1122}
            height={1402}
            priority
            className="block h-auto w-full"
            sizes="100vw"
          />
        </div>

        <div className="mt-7">
          <p className="inline-flex rounded-full bg-brand-lavender px-3 py-1 text-xs font-extrabold uppercase tracking-normal text-brand-purple-deep">
            Our Programs
          </p>
          <h2 className="mt-5 text-[clamp(2rem,9vw,2.35rem)] font-extrabold leading-[1.05] tracking-tight text-brand-navy">
            Real Skills.
            <br />
            Real Growth.
            <br />
            Real Futures.{" "}
            <span className="text-brand-gold">
              <Icon name="heart" size="sm" />
            </span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-brand-navy/85">
            At Ava&apos;s Hub, we provide evidence-based occupational therapy
            services that help children, teens, and young adults build
            independence, confidence, participation, and meaningful life skills
            through real-world experiences.
          </p>
        </div>

        <div className="mt-6 flex gap-4 rounded-3xl bg-white/90 p-5 shadow-card ring-1 ring-brand-purple-deep/10">
          <Icon name="heart" className="mt-1 text-brand-purple-bright" size="lg" />
          <p className="text-sm font-semibold leading-relaxed text-brand-navy/85">
            We help neurodiverse children and teens thrive at home, school, and
            in their communities.
          </p>
        </div>

        <div className="mt-6 space-y-3">
          <CTAButton href="/contact" className="w-full">
            <span className="inline-flex items-center gap-2">
              <Icon name="calendar" size="sm" />
              Schedule Consultation
            </span>
          </CTAButton>
          <CTAButton href="#program-list-mobile" variant="secondary" className="w-full">
            <span className="inline-flex items-center gap-2">
              <Icon name="resources" size="sm" />
              Explore Programs
            </span>
          </CTAButton>
        </div>
      </div>
    </section>
  );
}

function InsuranceOptionsCard({ className = "" }: { className?: string }) {
  return (
    <section className={className} aria-labelledby="insurance-options-heading">
      <div className="flex h-full flex-col rounded-[1.75rem] bg-white/95 p-6 shadow-card ring-1 ring-brand-purple-deep/10">
        <div className="flex items-start gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-lavender text-brand-purple-bright">
            <Icon name="shieldHeart" size="lg" />
          </span>
          <div>
            <p className="text-xs font-extrabold uppercase tracking-normal text-brand-purple-bright">
              Insurance Based Model
            </p>
            <h2
              id="insurance-options-heading"
              className="mt-2 text-2xl font-extrabold leading-tight text-brand-navy"
            >
              Insurance & Payment Options
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-brand-navy/75">
              We believe therapy should be accessible.
            </p>
          </div>
        </div>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {insuranceOptions.map((option) => (
            <li
              key={option}
              className="flex items-center gap-3 rounded-2xl bg-brand-teal-light/45 px-4 py-3 text-sm font-bold text-brand-navy ring-1 ring-brand-teal/10"
            >
              <Icon name="circleCheck" className="text-brand-teal" size="sm" />
              <span>{option}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function MobileFinalCta() {
  return (
    <div className="rounded-[1.75rem] bg-brand-purple-bright p-5 text-white shadow-card">
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
  );
}

function MobileProgramsPage() {
  return (
    <div className="lg:hidden">
      <MobileProgramHero />

      <section className="px-6 pb-10">
        <h2 className="font-serif text-[1.9rem] font-semibold leading-tight text-brand-navy">
          How Can We Help?
          <span className="ml-2 text-brand-purple-bright/55">
            <TiltedHeartOutline />
          </span>
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-brand-navy/70">
          Find support for what matters most right now.
        </p>
        <div className="mt-5 space-y-4">
          {helpCards.map((card) => (
            <article
              key={card.title}
              className={`grid grid-cols-[6.25rem_1fr] items-center gap-4 rounded-3xl p-5 shadow-card ring-1 ${toneStyles[card.tone].card}`}
            >
              <span
                className={`flex h-24 w-24 items-center justify-center rounded-[1.4rem] shadow-sm ${toneStyles[card.tone].softIcon}`}
              >
                <Icon name={card.icon} size="2x" />
              </span>
              <div className="min-w-0">
                <h3 className="text-[1.05rem] font-extrabold leading-tight text-brand-navy">
                  {card.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-brand-navy/75">
                  {card.intro}
                </p>
              </div>
            </article>
          ))}
        </div>
        <a
          href="/contact"
          className="mt-5 flex items-center justify-center gap-3 text-sm font-semibold text-brand-navy underline underline-offset-4"
        >
          Not sure where to start? We&apos;re here to help.
          <Icon name="arrowRight" size="sm" />
        </a>
      </section>

      <section id="program-list-mobile" className="px-6 pb-10">
        <h2 className="font-serif text-[1.85rem] font-semibold leading-tight text-brand-navy">
          Programs for Every Stage of Life
          <span className="ml-2 text-brand-purple-bright/55">
            <TiltedHeartOutline />
          </span>
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-brand-navy/70">
          Support that grows with your child.
        </p>
        <div className="mt-6 space-y-5">
          {mobilePrograms.map((program) => (
            <article
              key={program.title}
              className="overflow-hidden rounded-[1.75rem] bg-white/90 shadow-card ring-1 ring-brand-teal/10"
            >
              <div className="relative h-44 bg-brand-teal-light">
                <PlaceholderImage
                  src={program.image}
                  alt={`${program.title} at Ava's Hub`}
                  fill
                  className="object-cover object-center"
                  sizes="100vw"
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-extrabold leading-tight text-brand-navy">
                  {program.title}
                </h3>
                <p className="mt-1 text-sm font-bold text-brand-purple-bright">
                  {program.age}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-brand-navy/80">
                  {program.description}
                </p>

                <details className="mt-4 rounded-2xl bg-brand-lavender/45 p-4">
                  <summary className="cursor-pointer text-sm font-extrabold text-brand-navy">
                    What we work on
                  </summary>
                  <ul className="mt-3 space-y-2">
                    {program.workOn.map((item) => (
                      <li key={item} className="flex gap-2 text-sm text-brand-navy/80">
                        <Icon name="check" className="mt-0.5 text-brand-teal" size="sm" />
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
                      <li key={item} className="flex gap-2 text-sm text-brand-navy/80">
                        <Icon name="heart" className="mt-0.5 text-brand-purple-bright" size="sm" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </details>
                {"detailHref" in program ? (
                  <CTAButton href={program.detailHref} className="mt-5 w-full !py-2.5">
                    Learn More
                  </CTAButton>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="px-6 pb-10">
        <h2 className="font-serif text-[1.9rem] font-semibold leading-tight text-brand-navy">
          Our Services
          <span className="ml-2 text-brand-purple-bright/55">
            <TiltedHeartOutline />
          </span>
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-brand-navy/70">
          Evidence-based care. Personalized for your child.
        </p>
        <div className="mt-6 space-y-4">
          {serviceCards.map((service) => (
            <article
              key={service.title}
              className={`rounded-[1.75rem] bg-white/90 p-6 shadow-card ring-1 ${
                service.featured ? "ring-brand-teal/20" : "ring-brand-purple-deep/10"
              }`}
            >
              <div className="flex gap-5">
                <span
                  className={`flex h-16 w-16 items-center justify-center rounded-full ${
                    service.featured
                      ? "bg-brand-teal text-white"
                      : "bg-brand-lavender text-brand-purple-bright"
                  }`}
                >
                  <Icon name={service.icon} size="lg" />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-xl font-extrabold text-brand-navy">
                    {service.title}
                  </h3>
                  <span
                    className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-bold ${service.badgeClass}`}
                  >
                    {service.badge}
                  </span>
                  <p className="mt-4 text-sm leading-relaxed text-brand-navy/80">
                    {service.description}
                  </p>
                  {"schedule" in service && typeof service.schedule === "string" ? (
                    <p className="mt-3 rounded-2xl bg-brand-lavender/45 px-4 py-3 text-xs font-bold leading-relaxed text-brand-navy/75">
                      {service.schedule}
                    </p>
                  ) : null}
                  {service.skills.length ? (
                    <ul className="mt-4 space-y-2">
                      {service.skills.map((skill) => (
                        <li key={skill} className="flex gap-2 text-sm text-brand-navy/80">
                          <Icon name="check" className="mt-0.5 text-brand-teal" size="sm" />
                          <span>{skill}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  <CTAButton
                    href="/contact"
                    variant={service.featured ? "primary" : "secondary"}
                    className="mt-5 w-full !py-2.5"
                  >
                    Learn More
                  </CTAButton>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <InsuranceOptionsCard className="px-6 pb-10" />

      <section className="px-6 pb-10">
        <h2 className="font-serif text-[1.85rem] font-semibold leading-tight text-brand-navy">
          Resources & Support for Families
          <span className="ml-2 text-brand-purple-bright/55">
            <TiltedHeartOutline />
          </span>
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-brand-navy/70">
          Tools, education, and community, just for you.
        </p>
        <div className="-mx-6 mt-6 overflow-x-auto px-6 pb-2">
          <div className="flex min-w-max snap-x snap-mandatory gap-4">
            {resourceCards.map((card) => (
              <article
                key={card.title}
                className="w-[76vw] max-w-[20rem] snap-start rounded-[1.75rem] bg-white/90 p-6 shadow-card ring-1 ring-brand-purple-deep/10"
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
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-5">
        <div className="overflow-hidden rounded-[1.75rem] bg-brand-lavender/70 shadow-card ring-1 ring-brand-purple-deep/10">
          <div className="relative h-56 bg-brand-teal-light">
            <PlaceholderImage
              src={programsImages.familySupportImage}
              alt="Family support at Ava's Hub"
              fill
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>
          <div className="p-6">
              <h2 className="text-2xl font-extrabold leading-tight text-brand-navy">
                You don&apos;t have to figure this out alone.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-brand-navy/80">
                We support your child, your family, and your future.
              </p>
              <CTAButton href="/contact" className="mt-5 !px-5">
                <span className="inline-flex items-center gap-2">
                  Let&apos;s Connect
                  <TiltedHeartOutline />
                </span>
              </CTAButton>
          </div>
        </div>
      </section>

      <section className="px-6 pb-10">
        <MobileFinalCta />
      </section>
    </div>
  );
}

function DesktopProgramsPage() {
  return (
    <div className="hidden bg-[#fffaf4] lg:block">
      <section className="py-9 xl:py-12">
        <SectionContainer className="grid min-h-[74vh] items-center gap-10 xl:grid-cols-[0.43fr_0.57fr] xl:gap-12 2xl:gap-16">
          <div className="rounded-[2.25rem] bg-[#fffaf4]/95 p-8 shadow-card ring-1 ring-brand-purple-deep/10 xl:p-10 2xl:p-12">
            <p className="inline-flex rounded-full bg-brand-lavender px-4 py-1.5 text-xs font-extrabold uppercase tracking-normal text-brand-purple-deep">
              Our Programs
            </p>
            <h2 className="mt-6 max-w-xl text-[clamp(2.6rem,4vw,4.35rem)] font-extrabold leading-[1.03] tracking-tight text-brand-navy">
              Real Skills.
              <br />
              Real Growth.
              <br />
              Real Futures.{" "}
              <span className="text-brand-gold">
                <Icon name="heart" size="sm" />
              </span>
            </h2>
            <p className="mt-6 max-w-xl text-[clamp(1rem,1.1vw,1.125rem)] leading-relaxed text-brand-navy/85">
              At Ava&apos;s Hub, we provide evidence-based occupational therapy
              services that help children, teens, and young adults build
              independence, confidence, participation, and meaningful life skills
              through real-world experiences.
            </p>

            <div className="mt-8 flex max-w-lg gap-5 rounded-3xl bg-white/92 p-6 shadow-card ring-1 ring-brand-purple-deep/10">
              <Icon
                name="heart"
                className="mt-1 shrink-0 text-brand-purple-bright"
                size="2x"
              />
              <p className="text-base font-semibold leading-relaxed text-brand-navy/85">
                We help neurodiverse children and teens thrive at home, school,
                and in their communities.
              </p>
            </div>

            <div className="mt-8 flex max-w-xl flex-wrap gap-4">
              <CTAButton href="/contact" className="min-w-[14rem]">
                <span className="inline-flex items-center gap-2">
                  <Icon name="calendar" size="sm" />
                  Schedule Consultation
                </span>
              </CTAButton>
              <CTAButton
                href="#program-list-desktop"
                variant="secondary"
                className="min-w-[13rem]"
              >
                <span className="inline-flex items-center gap-2">
                  <Icon name="resources" size="sm" />
                  Explore Programs
                </span>
              </CTAButton>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-8 top-10 h-52 w-52 rounded-full bg-brand-lavender/45 blur-3xl" />
            <div className="absolute -bottom-10 right-8 h-56 w-56 rounded-full bg-brand-gold/20 blur-3xl" />
            <div className="relative overflow-hidden rounded-[4rem_2rem_4rem_2rem] bg-brand-teal-light shadow-card ring-1 ring-brand-teal/10 xl:rounded-[7rem_3rem_7rem_3rem]">
              <PlaceholderImage
                src={programsImages.programsHeroMobile}
                alt="Ava's Hub programs mobile hero banner"
                width={1122}
                height={1402}
                priority
                className="h-[min(76vh,48rem)] w-full object-cover object-[50%_36%]"
                sizes="(min-width: 1280px) 54vw, 50vw"
              />
            </div>
          </div>
        </SectionContainer>
      </section>

      <section className="pb-12">
        <SectionContainer>
          <h2 className="font-serif text-[clamp(2rem,3vw,3rem)] font-semibold leading-tight text-brand-navy">
            How Can We Help?
            <span className="ml-3 text-brand-purple-bright/55">
              <TiltedHeartOutline />
            </span>
          </h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-brand-navy/70">
            Find support for what matters most right now.
          </p>
          <div className="mt-8 grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
            {helpCards.map((card) => (
              <article
                key={card.title}
                className={`rounded-[1.75rem] p-6 shadow-card ring-1 ${toneStyles[card.tone].card}`}
              >
                <span
                  className={`flex h-16 w-16 items-center justify-center rounded-[1.2rem] shadow-sm ${toneStyles[card.tone].softIcon}`}
                >
                  <Icon name={card.icon} size="xl" />
                </span>
                <h3 className="mt-5 text-lg font-extrabold leading-tight text-brand-navy">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-brand-navy/75">
                  {card.intro}
                </p>
              </article>
            ))}
          </div>
        </SectionContainer>
      </section>

      <section id="program-list-desktop" className="pb-12">
        <SectionContainer>
          <h2 className="font-serif text-[clamp(2rem,3vw,3rem)] font-semibold leading-tight text-brand-navy">
            Programs for Every Stage of Life
            <span className="ml-3 text-brand-purple-bright/55">
              <TiltedHeartOutline />
            </span>
          </h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-brand-navy/70">
            Support that grows with your child.
          </p>
          <div className="mt-8 grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
            {mobilePrograms.map((program) => (
              <article
                key={program.title}
                className="overflow-hidden rounded-3xl bg-white/90 shadow-card ring-1 ring-brand-teal/10"
              >
                <div className="relative h-48 bg-brand-teal-light xl:h-52">
                  <PlaceholderImage
                    src={program.image}
                    alt={`${program.title} at Ava's Hub`}
                    fill
                    className="object-cover object-center"
                    sizes="(min-width: 1280px) 25vw, 50vw"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-extrabold leading-tight text-brand-navy">
                    {program.title}
                  </h3>
                  <p className="mt-1 text-sm font-bold text-brand-purple-bright">
                    {program.age}
                  </p>
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
                  {"detailHref" in program ? (
                    <CTAButton href={program.detailHref} className="mt-5 w-full !py-2.5">
                      Learn More
                    </CTAButton>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </SectionContainer>
      </section>

      <section className="pb-12">
        <SectionContainer>
          <h2 className="font-serif text-[clamp(2rem,3vw,3rem)] font-semibold leading-tight text-brand-navy">
            Our Services
            <span className="ml-3 text-brand-purple-bright/55">
              <TiltedHeartOutline />
            </span>
          </h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-brand-navy/70">
            Evidence-based care. Personalized for your child.
          </p>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {serviceCards.map((service) => (
              <article
                key={service.title}
                className={`rounded-[1.75rem] bg-white/90 p-6 shadow-card ring-1 ${
                  service.featured ? "ring-brand-teal/20" : "ring-brand-purple-deep/10"
                }`}
              >
                <span
                  className={`flex h-16 w-16 items-center justify-center rounded-full ${
                    service.featured
                      ? "bg-brand-teal text-white"
                      : "bg-brand-lavender text-brand-purple-bright"
                  }`}
                >
                  <Icon name={service.icon} size="lg" />
                </span>
                <h3 className="mt-5 text-xl font-extrabold text-brand-navy">
                  {service.title}
                </h3>
                <span
                  className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-bold ${service.badgeClass}`}
                >
                  {service.badge}
                </span>
                <p className="mt-4 text-sm leading-relaxed text-brand-navy/80">
                  {service.description}
                </p>
                <ul className="mt-4 space-y-2">
                  {service.skills.map((skill) => (
                    <li key={skill} className="flex gap-2 text-sm text-brand-navy/80">
                      <Icon name="check" className="mt-0.5 text-brand-teal" size="sm" />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
                <CTAButton
                  href="/contact"
                  variant={service.featured ? "primary" : "secondary"}
                  className="mt-5 w-full !py-2.5"
                >
                  Learn More
                </CTAButton>
              </article>
            ))}
          </div>
        </SectionContainer>
      </section>

      <section className="pb-12">
        <SectionContainer>
          <div className="grid gap-6 xl:grid-cols-[0.48fr_0.52fr] xl:items-stretch">
            <div className="h-full">
              <InsuranceOptionsCard className="h-full" />
            </div>

            <div className="h-full rounded-[1.75rem] bg-white/80 p-6 shadow-card ring-1 ring-brand-purple-deep/10 xl:p-7">
              <h2 className="font-serif text-[clamp(1.8rem,2.5vw,2.5rem)] font-semibold leading-tight text-brand-navy">
                Resources & Support for Families
                <span className="ml-3 text-brand-purple-bright/55">
                  <TiltedHeartOutline />
                </span>
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-brand-navy/70">
                Tools, education, and community, just for you.
              </p>
              <div className="mt-6 grid gap-4 lg:grid-cols-3">
                {resourceCards.map((card) => (
                  <article
                    key={card.title}
                    className="flex h-full flex-col rounded-[1.5rem] bg-white/90 p-5 shadow-sm ring-1 ring-brand-purple-deep/10"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-lavender text-brand-purple-bright">
                      <Icon name={card.icon} size="lg" />
                    </span>
                    <h3 className="mt-4 text-base font-extrabold leading-tight text-brand-navy">
                      {card.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-brand-navy/75">
                      {card.text}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </SectionContainer>
      </section>

      <section className="pb-14">
        <SectionContainer>
          <div className="rounded-[2rem] bg-brand-purple-bright p-8 text-white shadow-card">
            <div className="flex items-center justify-between gap-8">
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
        </SectionContainer>
      </section>
    </div>
  );
}

export default function ProgramsPage() {
  return (
    <main className="flex-1 bg-[#fffaf4]">
      <h1 className="sr-only">Ava&apos;s Hub Programs</h1>
      <MobileProgramsPage />
      <DesktopProgramsPage />
    </main>
  );
}
