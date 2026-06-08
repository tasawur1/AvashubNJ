import type { Metadata } from "next";
import Link from "next/link";
import { CTAButton } from "@/components/CTAButton";
import { Icon } from "@/components/Icon";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { ResourceBottomCta } from "@/components/page/ResourceMobileComponents";
import { EmailSignupForm } from "@/components/page/EmailSignupForm";
import { SectionContainer } from "@/components/SectionContainer";
import type { IconName } from "@/data/icons";
import { programsImages } from "@/data/pageImages/programsImages";

export const metadata: Metadata = {
  title: "Kids Program | Ava's Hub",
  description:
    "Explore Ava's Hub Kids Program for ages 3-7, offering play-based occupational therapy support for fine motor skills, sensory processing, self-care routines, motor planning, and early social participation.",
  alternates: { canonical: "/programs/kids" },
};

type Tone = "purple" | "teal" | "gold";

type DetailCard = {
  icon: IconName;
  title: string;
  text: string;
  tone: Tone;
};

const toneStyles = {
  purple: {
    icon: "bg-brand-lavender text-brand-purple-bright",
    card: "bg-brand-lavender/55 ring-brand-purple-deep/10",
  },
  teal: {
    icon: "bg-brand-teal-light text-brand-teal",
    card: "bg-brand-teal-light/60 ring-brand-teal/10",
  },
  gold: {
    icon: "bg-brand-gold/25 text-brand-navy",
    card: "bg-brand-gold/12 ring-brand-gold/20",
  },
} satisfies Record<Tone, Record<string, string>>;

const workOnCards: DetailCard[] = [
  {
    icon: "handHeart",
    title: "Fine Motor Skills",
    tone: "purple",
    text: "Helping children build hand strength, coordination, grasp patterns, cutting skills, manipulating toys, and everyday classroom participation.",
  },
  {
    icon: "puzzlePiece",
    title: "Sensory Processing",
    tone: "teal",
    text: "Supporting children who may feel overwhelmed, avoid sensory experiences, seek movement, or struggle processing everyday environments.",
  },
  {
    icon: "child",
    title: "Developmental Play",
    tone: "gold",
    text: "Using play as the foundation for learning communication, problem solving, creativity, participation, and confidence.",
  },
  {
    icon: "compass",
    title: "Motor Planning",
    tone: "teal",
    text: "Building the ability to plan, sequence, and perform movements through play, obstacle courses, and functional activities like dressing, climbing, new games, and multi-step tasks.",
  },
  {
    icon: "home",
    title: "Self-Care Routines",
    tone: "purple",
    text: "Supporting independence with dressing, feeding, toileting, hygiene, and everyday participation.",
  },
  {
    icon: "community",
    title: "Early Social Participation",
    tone: "gold",
    text: "Building confidence engaging with peers, sharing, taking turns, and participating with others.",
  },
  {
    icon: "resources",
    title: "Pre-Writing Readiness",
    tone: "teal",
    text: "Developing foundational skills needed before handwriting, including posture, visual motor skills, grasp development, and bilateral coordination.",
  },
];

const fitCards: DetailCard[] = [
  {
    icon: "shieldHeart",
    title: "Children who avoid tasks",
    tone: "purple",
    text: "Avoiding dressing, crafts, writing, movement activities, or self-care routines.",
  },
  {
    icon: "clock",
    title: "Children who struggle with transitions",
    tone: "teal",
    text: "Difficulty moving between activities, routines, environments, or expectations.",
  },
  {
    icon: "heart",
    title: "Children needing support with play, routines, or regulation",
    tone: "gold",
    text: "Challenges participating independently at home, school, or in the community.",
  },
  {
    icon: "brain",
    title: "Children building confidence with everyday demands",
    tone: "purple",
    text: "Needing warm, practical support to try new tasks, stay engaged, and feel successful.",
  },
];

const sessionActivities = [
  "Obstacle courses",
  "Sensory play",
  "Movement activities",
  "Cooking",
  "Crafts",
  "Social games",
  "Pretend play",
  "Visual schedules",
  "Functional routines",
];

const otherPrograms = [
  {
    image: programsImages.schoolAgeProgramImage,
    title: "School-Age Program",
    age: "Ages 8-13",
    text: "Practical support for confidence, organization, handwriting, regulation, and participation.",
  },
  {
    image: programsImages.teenProgramImage,
    title: "Teen Life Skills Program",
    age: "Ages 14-18",
    text: "Real-world therapy and coaching for independence, self-advocacy, and daily life skills.",
  },
  {
    image: programsImages.youngAdultProgramImage,
    title: "Young Adult Life Readiness",
    age: "Ages 19-21+",
    text: "Functional skill-building for work, independence, community life, and meaningful routines.",
  },
];

function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <h2 className="font-serif text-[clamp(2rem,6vw,3rem)] font-semibold leading-tight text-brand-navy">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 text-sm leading-relaxed text-brand-navy/70 sm:text-base">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

function DetailCard({ card }: { card: DetailCard }) {
  return (
    <article
      className={`h-full rounded-[1.75rem] p-6 shadow-card ring-1 ${toneStyles[card.tone].card}`}
    >
      <span
        className={`flex h-14 w-14 items-center justify-center rounded-full ${toneStyles[card.tone].icon}`}
      >
        <Icon name={card.icon} size="lg" />
      </span>
      <h3 className="mt-5 text-xl font-extrabold leading-tight text-brand-navy">
        {card.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-brand-navy/75">
        {card.text}
      </p>
    </article>
  );
}

export default function KidsProgramPage() {
  return (
    <main className="flex-1 bg-[#fffaf4]">
      <SectionContainer className="py-6 lg:py-8">
        <nav
          className="flex flex-wrap items-center gap-2 text-sm font-semibold text-brand-navy/55"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="transition hover:text-brand-purple-bright">
            Home
          </Link>
          <span aria-hidden>&gt;</span>
          <Link
            href="/programs"
            className="transition hover:text-brand-purple-bright"
          >
            Programs
          </Link>
          <span aria-hidden>&gt;</span>
          <span className="text-brand-purple-bright">Kids Program</span>
        </nav>
      </SectionContainer>

      <section className="pb-10 lg:pb-14" aria-labelledby="kids-program-heading">
        <SectionContainer>
          <div className="grid gap-6 lg:grid-cols-[0.4fr_0.6fr] lg:items-stretch lg:gap-8">
            <div className="overflow-hidden rounded-[2rem] bg-brand-teal-light shadow-card ring-1 ring-brand-teal/10 lg:rounded-[2.5rem]">
              <div className="relative aspect-[4/3] lg:h-full lg:min-h-[31rem]">
                <PlaceholderImage
                  src={programsImages.kidsProgramImage}
                  alt="Kids Program at Ava's Hub"
                  fill
                  priority
                  className="object-cover object-center"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
              </div>
            </div>

            <div className="rounded-[2rem] bg-white/95 p-6 shadow-card ring-1 ring-brand-purple-deep/10 lg:rounded-[2.5rem] lg:p-10 xl:p-12">
              <p className="inline-flex rounded-full bg-brand-lavender px-4 py-2 text-sm font-extrabold text-brand-purple-bright">
                Ages 3-7
              </p>
              <h1
                id="kids-program-heading"
                className="mt-5 text-[clamp(2.55rem,8vw,5rem)] font-extrabold leading-[0.98] tracking-tight text-brand-navy"
              >
                Kids Program
              </h1>
              <p className="mt-4 max-w-2xl text-xl font-extrabold leading-snug text-brand-purple-bright lg:text-2xl">
                Building confidence through play, movement, and meaningful
                everyday experiences.
              </p>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-brand-navy/82 lg:text-lg">
                Play-based occupational therapy support that helps young
                children build the foundation for confidence, curiosity,
                regulation, and everyday independence.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <CTAButton href="/contact" className="sm:min-w-[14rem]">
                  Schedule Consultation
                </CTAButton>
                <CTAButton
                  href="/forms/ot-intake.html"
                  variant="secondary"
                  className="sm:min-w-[12rem]"
                >
                  Start Intake
                </CTAButton>
              </div>
            </div>
          </div>
        </SectionContainer>
      </section>

      <section className="py-10 lg:py-14" aria-labelledby="work-on-heading">
        <SectionContainer>
          <SectionHeading
            title="What We Work On"
            subtitle="Support is practical, playful, and built around skills children use every day."
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {workOnCards.map((card) => (
              <DetailCard key={card.title} card={card} />
            ))}
          </div>
        </SectionContainer>
      </section>

      <section className="py-10 lg:py-14" aria-labelledby="good-fit-heading">
        <SectionContainer>
          <SectionHeading title="This Program May Be A Good Fit If..." />
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {fitCards.map((card) => (
              <DetailCard key={card.title} card={card} />
            ))}
          </div>
        </SectionContainer>
      </section>

      <section className="py-10 lg:py-14" aria-labelledby="sessions-heading">
        <SectionContainer>
          <div className="rounded-[2rem] bg-white/95 p-6 shadow-card ring-1 ring-brand-teal/10 lg:rounded-[2.5rem] lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.42fr_0.58fr] lg:items-center">
              <div>
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-teal-light text-brand-teal">
                  <Icon name="child" size="lg" />
                </span>
                <h2
                  id="sessions-heading"
                  className="mt-5 font-serif text-[clamp(2rem,6vw,3rem)] font-semibold leading-tight text-brand-navy"
                >
                  What Sessions May Look Like
                </h2>
                <p className="mt-4 text-base leading-relaxed text-brand-navy/75">
                  Sessions are designed to feel warm and meaningful, while
                  giving children chances to practice real skills through
                  movement, play, and everyday routines.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {sessionActivities.map((activity) => (
                  <div
                    key={activity}
                    className="rounded-2xl bg-[#fffaf4] px-4 py-3 text-sm font-extrabold text-brand-navy shadow-sm ring-1 ring-brand-purple-deep/10"
                  >
                    {activity}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SectionContainer>
      </section>

      <section className="py-10 lg:py-14" aria-labelledby="other-programs-heading">
        <SectionContainer>
          <SectionHeading
            title="Explore Other Programs"
            subtitle="Support grows with your child and adapts as daily life changes."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {otherPrograms.map((program) => (
              <article
                key={program.title}
                className="overflow-hidden rounded-[1.75rem] bg-white/95 shadow-card ring-1 ring-brand-teal/10"
              >
                <div className="relative h-44 bg-brand-teal-light">
                  <PlaceholderImage
                    src={program.image}
                    alt={`${program.title} at Ava's Hub`}
                    fill
                    className="object-cover object-center"
                    sizes="(min-width: 768px) 33vw, 100vw"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-extrabold leading-tight text-brand-navy">
                    {program.title}
                  </h3>
                  <p className="mt-1 text-sm font-bold text-brand-purple-bright">
                    {program.age}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-brand-navy/75">
                    {program.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </SectionContainer>
      </section>

      <section className="py-10 lg:py-14" aria-labelledby="kids-newsletter-heading">
        <SectionContainer>
          <div className="rounded-[2rem] bg-brand-lavender/45 p-6 text-center shadow-card ring-1 ring-brand-purple-deep/10 lg:p-10">
            <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-white text-brand-purple-bright shadow-sm">
              <Icon name="email" size="lg" />
            </span>
            <h2
              id="kids-newsletter-heading"
              className="mt-4 text-2xl font-extrabold text-brand-navy lg:text-3xl"
            >
              Stay Connected
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-brand-navy/75 lg:text-base">
              Get updates about programs, events, and resources from Ava&apos;s Hub.
            </p>
            <div className="mx-auto mt-6 max-w-xl">
              <EmailSignupForm placeholder="Enter your email address" />
            </div>
          </div>
        </SectionContainer>
      </section>

      <ResourceBottomCta
        title="Ready To Get Started?"
        text="We'd love to meet your family."
        buttonLabel="Schedule Consultation"
        buttonHref="/contact"
      />
    </main>
  );
}
