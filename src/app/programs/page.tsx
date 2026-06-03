import type { Metadata } from "next";
import { CTAButton } from "@/components/CTAButton";
import { HeroBanner } from "@/components/HeroBanner";
import { Icon } from "@/components/Icon";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { SectionContainer } from "@/components/SectionContainer";
import { SectionHeadingDecorated } from "@/components/SectionHeadingDecorated";
import type { IconName } from "@/data/icons";
import { programsImages } from "@/data/pageImages/programsImages";
import {
  cardInnerPad,
  cardShell,
  cardShellSoft,
  innerContentWrap,
  pageSectionPad,
} from "@/lib/pageSectionStyles";

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

type PricingCard = {
  icon: IconName;
  title: string;
  price: string;
  meta: string;
  description: string;
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

const pricingCards: PricingCard[] = [
  {
    icon: "community",
    title: "Individual Parent Coaching",
    price: "$85 - $125",
    meta: "per session (45-60 min)",
    tone: "purple",
    description:
      "Personalized OT-based coaching focused on your goals, routines, and daily life strategies.",
  },
  {
    icon: "family",
    title: "Parent + Child Coaching",
    price: "$95 - $135",
    meta: "per session (45-60 min)",
    tone: "teal",
    description:
      "Hands-on strategies and play skills to build connection and support your child's growth.",
  },
  {
    icon: "heart",
    title: "Parent Partnership Sessions",
    price: "$100 - $150",
    meta: "per session (45-60 min)",
    tone: "gold",
    description:
      "OT-based sessions to help parents work together, reduce stress, and create consistency at home.",
  },
  {
    icon: "confidence",
    title: "Parent Reset Package (4 Sessions)",
    price: "$320 - $450",
    meta: "package",
    tone: "purple",
    description:
      "Save when you invest in a series of sessions tailored to your family's needs.",
  },
];

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
      "Helping children and teens build skills for independence and everyday life.",
    skills: [
      "Executive functioning",
      "Emotional regulation",
      "Handwriting & fine motor skills",
      "Sensory processing",
      "Self-care & daily routines",
      "Community participation",
    ],
    featured: true,
  },
  {
    icon: "heart",
    title: "Social & Emotional Builders",
    badge: "Weekly Skill Group",
    badgeClass: "bg-brand-lavender text-brand-purple-deep",
    description:
      "A playful, structured program that builds fine motor skills, sensory exploration, social readiness, emotional regulation, and school prep.",
    schedule: "Once a week for 60-75 minutes",
    skills: [
      "Fine motor skills",
      "Sensory exploration",
      "Social readiness",
      "Emotional regulation",
      "School preparation",
    ],
    featured: false,
  },
  {
    icon: "resources",
    title: "Executive Function Club",
    badge: "After-School Support",
    badgeClass: "bg-brand-teal-light text-brand-teal",
    description:
      "After-School Hub offers a supportive space where kids build regulation, cooperative play, motor skills, flexible thinking, and problem-solving.",
    schedule: "Once a week for 60-75 minutes",
    skills: [
      "Emotional regulation",
      "Cooperative play",
      "Motor skills",
      "Flexible thinking",
      "Problem-solving",
    ],
    featured: false,
  },
  {
    icon: "home",
    title: "Life Skills & Vocational Crew",
    badge: "Real-Life Practice",
    badgeClass: "bg-brand-gold/25 text-brand-navy",
    description:
      "A welcoming space where preteens and teens practice independence, flexibility, planning, and social communication through real-life activities.",
    schedule: "Creative challenges and collaborative problem solving",
    skills: [
      "Independence",
      "Planning",
      "Social communication",
      "Flexible thinking",
      "Collaborative problem-solving",
    ],
    featured: false,
  },
  {
    icon: "vocational",
    title: "Vocational Sensory Product Lab",
    badge: "Ages 15-21",
    badgeClass: "bg-brand-purple-bright text-white",
    description:
      "A hands-on vocational program where young adults create sensory products like slime, kinetic sand, and fidget items.",
    schedule: "Mixing, packaging, safety, and teamwork skills",
    skills: [
      "Product creation",
      "Work habits",
      "Safety awareness",
      "Packaging",
      "Teamwork",
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
            Programs That Meet Your Child Where They Are
          </p>
          <h2 className="mt-5 text-[clamp(2rem,9vw,2.35rem)] font-extrabold leading-[1.05] tracking-tight text-brand-navy">
            Real-Life Skills for{" "}
            <span className="italic text-brand-purple-bright">
              Every Stage
              <span className="ml-3 text-brand-purple-bright/55">
                <TiltedHeartOutline />
              </span>
            </span>{" "}
            of Growth
          </h2>
          <p className="mt-5 text-base leading-relaxed text-brand-navy/85">
            From early learning to teen independence and young adult life
            skills, Ava&apos;s Hub helps children and families build confidence
            through practical, relationship-based occupational therapy.
          </p>
        </div>

        <div className="mt-6 flex gap-4 rounded-3xl bg-white/90 p-5 shadow-card ring-1 ring-brand-purple-deep/10">
          <Icon name="heart" className="mt-1 text-brand-purple-bright" size="lg" />
          <p className="text-sm font-semibold leading-relaxed text-brand-navy/85">
            Because progress should show up at home, at school, and in real
            life.
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
    <div className="md:hidden">
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
                <div className="mt-2 grid grid-cols-[1fr_2.25rem] items-center gap-3">
                  <p className="text-xs leading-relaxed text-brand-navy/75">
                    {card.intro}
                  </p>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-purple-bright text-white shadow-sm">
                    <Icon name="arrowRight" size="sm" />
                  </span>
                </div>
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
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-extrabold leading-tight text-brand-navy">
                      {program.title}
                    </h3>
                    <p className="mt-1 text-sm font-bold text-brand-purple-bright">
                      {program.age}
                    </p>
                  </div>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-purple-bright text-white shadow-sm">
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
                  {"schedule" in service ? (
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

      <section className="px-6 pb-10">
        <h2 className="font-serif text-[1.9rem] font-semibold leading-tight text-brand-navy">
          Sessions & Pricing
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-brand-navy/70">
          Private pay options designed to support your family&apos;s goals.
        </p>
        <div className="mt-6 space-y-4">
          {pricingCards.map((card) => (
            <article
              key={card.title}
              className="rounded-[1.75rem] bg-white/90 p-6 shadow-card ring-1 ring-brand-purple-deep/10"
            >
              <Icon name={card.icon} className={toneStyles[card.tone].text} size="lg" />
              <h3 className="mt-4 text-lg font-extrabold text-brand-navy">
                {card.title}
              </h3>
              <p className="mt-4 text-3xl font-extrabold text-brand-purple-deep">
                {card.price}
              </p>
              <p className="mt-1 text-sm font-semibold text-brand-navy/70">
                {card.meta}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-brand-navy/80">
                {card.description}
              </p>
            </article>
          ))}
        </div>
        <div className="mt-5 rounded-2xl bg-brand-gold/15 px-5 py-4 ring-1 ring-brand-gold/30">
          <p className="text-sm font-semibold leading-relaxed text-brand-navy/85">
            Package options and monthly programs may be available. Payment is
            due at time of service for private pay sessions.
          </p>
        </div>
      </section>

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
                <span className="mt-5 flex h-9 w-9 items-center justify-center rounded-full border border-brand-purple-deep text-brand-purple-deep">
                  <Icon name="arrowRight" size="sm" />
                </span>
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
    <div className="hidden md:block">
      <HeroBanner
        images={{
          desktop: programsImages.programsHeroBanner,
          mobile: programsImages.programsHeroBannerMobile,
        }}
        alt="Ava's Hub programs hero banner"
        showCtas={false}
      />

      <section className={`bg-white ${pageSectionPad}`} aria-labelledby="support-heading">
        <SectionContainer>
          <SectionHeadingDecorated
            id="support-heading"
            title="How We Support You"
            className="mb-8 sm:mb-10"
          />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {supportCards.map((card) => (
              <article
                key={card.title}
                className="flex h-full flex-col rounded-3xl bg-white px-6 py-7 text-center shadow-card ring-1 ring-brand-teal/10"
              >
                <span
                  className={`mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full shadow-sm ${toneStyles[card.tone].icon}`}
                >
                  <Icon name={card.icon} size="lg" />
                </span>
                <h2 className={`mt-5 text-lg font-bold leading-snug ${toneStyles[card.tone].text}`}>
                  {card.title}
                  <span className="block text-base">{card.eyebrow}</span>
                </h2>
                <div className="mt-6 flex-1">
                  <CheckList items={card.bullets} />
                </div>
                <p
                  className={`mt-7 rounded-full px-4 py-2 text-sm font-bold ${toneStyles[card.tone].pill}`}
                >
                  {card.tagline}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-8 rounded-3xl bg-brand-lavender/60 px-6 py-5 ring-1 ring-brand-purple-deep/10 sm:px-8">
            <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-purple-deep text-white">
                <Icon name="shieldHeart" size="lg" />
              </span>
              <p className="text-sm leading-relaxed text-brand-navy/85 sm:text-base">
                This is not therapy or couples counseling. Our sessions are OT-based
                and focus on practical strategies, daily life skills, and building
                strong, healthy family systems.
              </p>
            </div>
          </div>
        </SectionContainer>
      </section>

      <section
        className={`bg-gradient-to-b from-brand-lavender/20 to-white ${pageSectionPad}`}
        aria-labelledby="pricing-heading"
      >
        <SectionContainer>
          <div className={cardShell}>
            <div className={`${cardInnerPad} lg:px-10`}>
              <div className={innerContentWrap}>
                <SectionHeadingDecorated
                  id="pricing-heading"
                  title="Our Sessions & Pricing (Private Pay)"
                  subtitle="Invest in yourself, your child, and your family."
                  className="mb-8"
                />

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {pricingCards.map((card) => (
                    <article
                      key={card.title}
                      className="flex h-full flex-col rounded-3xl bg-white px-5 py-6 text-center shadow-sm ring-1 ring-brand-teal/10"
                    >
                      <span
                        className={`mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full ${toneStyles[card.tone].icon}`}
                      >
                        <Icon name={card.icon} size="lg" />
                      </span>
                      <h3 className={`mt-4 text-base font-bold leading-snug ${toneStyles[card.tone].text}`}>
                        {card.title}
                      </h3>
                      <p className="mt-5 text-3xl font-extrabold leading-none text-brand-navy">
                        {card.price}
                      </p>
                      <p className="mt-2 text-sm font-semibold text-brand-navy/80">
                        {card.meta}
                      </p>
                      <p className="mt-5 flex-1 text-sm leading-relaxed text-brand-navy/80">
                        {card.description}
                      </p>
                    </article>
                  ))}
                </div>

                <div className="mt-7 rounded-2xl bg-brand-gold/15 px-5 py-4 ring-1 ring-brand-gold/30">
                  <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-center sm:text-left">
                    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-gold text-brand-navy">
                      <Icon name="circleCheck" size="sm" />
                    </span>
                    <p className="text-sm font-semibold leading-relaxed text-brand-navy/85">
                      Payment is due at time of service for private pay sessions.
                      Package options and monthly programs may be available.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SectionContainer>
      </section>

      <section className={pageSectionPad} aria-labelledby="benefits-heading">
        <SectionContainer>
          <div className="grid gap-6 lg:grid-cols-[1.35fr_0.9fr]">
            <div className={`${cardShellSoft} p-6 sm:p-7 lg:p-8`}>
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-purple-deep text-white">
                  <Icon name="heart" size="lg" />
                </span>
                <div className="min-w-0">
                  <h2 id="benefits-heading" className="text-2xl font-bold text-brand-purple-deep">
                    Benefits for Parents
                  </h2>
                  <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                    {benefits.map((benefit) => (
                      <li
                        key={benefit}
                        className="flex gap-3 text-sm leading-relaxed text-brand-navy/85"
                      >
                        <Icon name="check" className="mt-1 text-brand-teal" size="sm" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <aside className={`${cardShell} p-6 sm:p-7 lg:p-8`}>
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-teal text-white">
                <Icon name="calendar" size="lg" />
              </span>
              <h2 className="mt-5 text-2xl font-bold text-brand-purple-deep">
                Ready to Get Started?
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-brand-navy/85 sm:text-base">
                You deserve support, tools, and a community that understands.
                Let&apos;s build a plan that works for you and your family.
              </p>
              <CTAButton href="/contact" className="mt-6 w-full sm:w-auto">
                Request a Session
              </CTAButton>
            </aside>
          </div>
        </SectionContainer>
      </section>

      <section className={`bg-white ${pageSectionPad}`} aria-label="Program features">
        <SectionContainer>
          <div className="overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-brand-teal/10">
            <div className="grid gap-0 sm:grid-cols-2 lg:grid-cols-5">
              {featureItems.map((item, index) => (
                <div
                  key={item.title}
                  className={
                    `flex gap-4 px-5 py-6 text-left sm:flex-col sm:items-center sm:text-center lg:min-h-40 lg:justify-center ` +
                    (index === 0 ? "" : "lg:border-l lg:border-brand-teal/15")
                  }
                >
                  <Icon
                    name={item.icon}
                    size="2x"
                    className={toneStyles[item.tone].text}
                  />
                  <div>
                    <h3 className="text-sm font-bold text-brand-teal">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-brand-navy/80 sm:text-sm">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionContainer>
      </section>
    </div>
  );
}

export default function ProgramsPage() {
  return (
    <main className="flex-1 bg-[#fffaf4] md:bg-white">
      <h1 className="sr-only">Ava&apos;s Hub Programs</h1>
      <MobileProgramsPage />
      <DesktopProgramsPage />
    </main>
  );
}
