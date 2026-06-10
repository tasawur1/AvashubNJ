import type { Metadata } from "next";
import Link from "next/link";
import { CTAButton } from "@/components/CTAButton";
import { Icon } from "@/components/Icon";
import { StartIntakeButton } from "@/components/intake/StartIntakeButton";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { ResourceBottomCta } from "@/components/page/ResourceMobileComponents";
import { EmailSignupForm } from "@/components/page/EmailSignupForm";
import { SectionContainer } from "@/components/SectionContainer";
import type { IconName } from "@/data/icons";
import { programsImages } from "@/data/pageImages/programsImages";

export const metadata: Metadata = {
  title: "Teen Life Skills Program | Ava's Hub",
  description:
    "Teen occupational therapy and life skills support for adolescents ages 14-18 focusing on independence, executive functioning, social participation, and future readiness.",
  alternates: { canonical: "/programs/teens" },
};

type GuideItem = {
  icon: IconName;
  title: string;
  explanation: string;
  look: string[];
  helps: string;
  note?: string;
};

const workOnItems: GuideItem[] = [
  {
    icon: "resources",
    title: "Executive Functioning",
    explanation:
      "Executive functioning includes the thinking skills used to plan, organize, prioritize, manage time, complete tasks, shift attention, and solve problems. These skills become increasingly important as teens gain more responsibilities at home, in school, and in the community.",
    look: [
      "Forgetting assignments",
      "Missing deadlines",
      "Difficulty starting tasks",
      "Poor organization",
      "Needing constant reminders",
      "Struggling with routines",
      "Difficulty managing multiple responsibilities",
    ],
    helps:
      "We build executive functioning through planning activities, real-life routines, organization systems, visual supports, task sequencing, problem solving, and meaningful functional activities that help teens develop strategies they can use independently.",
  },
  {
    icon: "home",
    title: "Daily Living Skills",
    explanation:
      "Daily living skills help teens participate more independently in everyday life. These include dressing, hygiene, meal preparation, laundry, organization, household routines, money management, and personal responsibility.",
    look: [
      "Needing help completing routines",
      "Difficulty preparing meals",
      "Forgetting hygiene tasks",
      "Trouble organizing belongings",
      "Difficulty following multi-step activities",
    ],
    helps:
      "Teens practice real-world routines using meaningful activities including cooking, organization systems, meal preparation, self-care routines, home tasks, and practical life skills training.",
  },
  {
    icon: "community",
    title: "Social Confidence & Relationships",
    explanation:
      "Adolescence introduces more complex friendships, social situations, communication demands, and peer expectations.",
    look: [
      "Difficulty making friends",
      "Social anxiety",
      "Trouble joining conversations",
      "Difficulty interpreting social situations",
      "Avoiding group activities",
    ],
    helps:
      "We support social confidence through group activities, role play, collaborative challenges, communication practice, real-world participation opportunities, and meaningful social experiences.",
  },
  {
    icon: "heart",
    title: "Emotional Regulation & Coping Skills",
    explanation:
      "Teens experience increasing emotional demands across school, friendships, family life, and community participation.",
    look: [
      "Frustration",
      "Emotional shutdowns",
      "Anxiety during transitions",
      "Difficulty coping with changes",
      "Emotional outbursts",
    ],
    helps:
      "We teach regulation strategies, self-awareness, coping tools, routines, sensory supports, and practical techniques that help teens navigate daily challenges.",
  },
  {
    icon: "compass",
    title: "Community Participation & Independence",
    explanation:
      "Independence develops through participation.",
    look: [
      "Difficulty navigating community spaces",
      "Limited confidence outside home",
      "Dependence on caregivers",
      "Fear of unfamiliar situations",
    ],
    helps:
      "We create opportunities to practice community skills through real-life experiences, outings, routines, decision making, and functional participation.",
  },
  {
    icon: "handHeart",
    title: "Self-Advocacy & Future Readiness",
    explanation:
      "Teens increasingly need to understand themselves, communicate their needs, and prepare for adulthood.",
    look: [
      "Difficulty expressing needs",
      "Limited confidence making decisions",
      "Dependence on adults to speak for them",
      "Uncertainty about future goals",
    ],
    helps:
      "We help teens practice decision making, communication, problem solving, goal setting, self-awareness, and skills that support future independence.",
  },
  {
    icon: "independence",
    title: "Movement, Coordination & Participation",
    explanation:
      "Movement remains important during adolescence.",
    look: [
      "Avoiding physical activities",
      "Poor endurance",
      "Low confidence with movement",
      "Coordination challenges",
    ],
    helps:
      "We incorporate movement activities, coordination tasks, strengthening, balance activities, sports-related skills, and functional movement to build participation and confidence.",
  },
];

const goodFitItems = [
  "Teens struggling with independence",
  "Difficulty with executive functioning",
  "Challenges completing routines",
  "Limited confidence",
  "Difficulty building friendships",
  "Challenges transitioning toward adulthood",
  "Needing support with life skills",
  "Wanting more independence at home and in the community",
];

const sessionItems = [
  "Cooking and meal preparation",
  "Community participation",
  "Organization systems",
  "Social activities",
  "Movement challenges",
  "Daily living routines",
  "Executive functioning activities",
  "Self-advocacy practice",
];

const otherPrograms = [
  {
    image: programsImages.kidsProgramImage,
    title: "Kids Program",
    age: "Ages 3-7",
    text: "Play-based occupational therapy support for confidence, regulation, motor skills, and early independence.",
    href: "/programs/kids",
  },
  {
    image: programsImages.schoolAgeProgramImage,
    title: "School-Age Program",
    age: "Ages 8-13",
    text: "Practical support for confidence, organization, handwriting, regulation, and school participation.",
    href: "/programs/school-age",
  },
  {
    image: programsImages.youngAdultProgramImage,
    title: "Young Adult Life Readiness",
    age: "Ages 19-21+",
    text: "Functional skill-building for work, independence, community life, and meaningful routines.",
    href: "/programs/young-adults",
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
        d="M12 20.4C7.05 16.2 4 13.36 4 9.8 4 7.25 5.93 5.2 8.35 5.2c1.4 0 2.75.7 3.65 1.82A4.64 4.64 0 0 1 15.65 5.2C18.07 5.2 20 7.25 20 9.8c0 3.56-3.05 6.4-8 10.6Z"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GuideSection({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-brand-purple-deep/10 pt-8 lg:pt-10">
      <h2 className="flex items-center whitespace-nowrap font-serif text-[clamp(1.25rem,5vw,2.75rem)] font-semibold leading-tight text-brand-navy">
        <span>{title}</span>
        <span className="ml-2 shrink-0 text-brand-purple-bright/55 sm:ml-3">
          <TiltedHeartOutline />
        </span>
      </h2>
      {subtitle ? (
        <p className="mt-3 max-w-xl text-base leading-relaxed text-brand-navy/70">
          {subtitle}
        </p>
      ) : null}
      <div className="mt-6">{children}</div>
    </section>
  );
}

function WorkOnCard({ item }: { item: GuideItem }) {
  return (
    <article className="flex h-full min-w-0 flex-col rounded-[1.75rem] bg-white/90 p-6 shadow-card ring-1 ring-brand-purple-deep/10">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-lavender text-brand-purple-bright">
        <Icon name={item.icon} size="lg" />
      </span>
      <h3 className="mt-5 text-xl font-extrabold leading-tight text-brand-navy">
        {item.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-brand-navy/75">
        {item.explanation}
      </p>

      <div className="mt-5 rounded-2xl bg-[#fffaf4] p-4 ring-1 ring-brand-purple-deep/10">
        <p className="text-xs font-extrabold uppercase tracking-normal text-brand-purple-bright">
          How this may look
        </p>
        <ul className="mt-3 space-y-2.5">
          {item.look.map((look) => (
            <li key={look} className="flex gap-2 text-sm leading-relaxed text-brand-navy/75">
              <Icon name="check" className="mt-1 shrink-0 text-brand-teal" size="sm" />
              <span>{look}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5">
        <p className="text-xs font-extrabold uppercase tracking-normal text-brand-teal">
          How Ava&apos;s Hub helps
        </p>
        <p className="mt-2 text-sm leading-relaxed text-brand-navy/75">
          {item.helps}
        </p>
        {item.note ? (
          <p className="mt-3 text-sm font-semibold italic leading-relaxed text-brand-purple-deep/75">
            {item.note}
          </p>
        ) : null}
      </div>
    </article>
  );
}

function ProgramSupportsCard({ items }: { items: string[] }) {
  return (
    <div className="h-full rounded-[1.75rem] bg-white/90 p-6 shadow-card ring-1 ring-brand-purple-deep/10">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-lavender text-brand-purple-bright">
        <Icon name="community" size="lg" />
      </span>
      <h2 className="mt-5 text-[clamp(1.35rem,2.2vw,2rem)] font-extrabold leading-tight text-brand-navy">
        Who This Program Supports
      </h2>
      <ul className="mt-5 grid gap-3">
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-3 rounded-2xl bg-[#fffaf4] px-4 py-3 text-sm font-semibold leading-relaxed text-brand-navy/78 ring-1 ring-brand-purple-deep/10"
          >
            <Icon
              name="check"
              className="mt-1 shrink-0 text-brand-teal"
              size="sm"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SessionsCard() {
  return (
    <div className="h-full rounded-[1.75rem] bg-white/90 p-6 shadow-card ring-1 ring-brand-teal/10">
      <div className="grid gap-6">
        <div>
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-teal-light text-brand-teal">
            <Icon name="child" size="lg" />
          </span>
          <h2 className="mt-5 text-[clamp(1.35rem,2.2vw,2rem)] font-extrabold leading-tight text-brand-navy">
            What Sessions May Look Like
          </h2>
          <p className="mt-5 text-base leading-relaxed text-brand-navy/78 lg:text-lg">
            Sessions are designed to feel age appropriate, functional, and
            meaningful. Teens may participate in cooking activities,
            organization tasks, community activities, social groups, movement
            challenges, executive functioning activities, life skills training,
            problem solving tasks, and real-world participation experiences.
          </p>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2">
          {sessionItems.map((item) => (
            <li
              key={item}
              className="flex gap-3 rounded-2xl bg-[#fffaf4] px-4 py-3 text-sm font-extrabold leading-relaxed text-brand-navy/80 ring-1 ring-brand-purple-deep/10"
            >
              <Icon name="check" className="mt-1 shrink-0 text-brand-teal" size="sm" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

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

export default function TeenProgramPage() {
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
          <span className="text-brand-purple-bright">Teen Life Skills Program</span>
        </nav>
      </SectionContainer>

      <section className="pb-8 lg:pb-10" aria-labelledby="teen-program-heading">
        <SectionContainer>
          <article className="rounded-[2.25rem] bg-white/95 p-4 shadow-card ring-1 ring-brand-purple-deep/10 lg:rounded-[2.75rem] lg:p-6">
            <div className="grid gap-6 lg:grid-cols-[0.4fr_0.6fr] lg:items-center lg:gap-8">
              <div className="overflow-hidden rounded-[1.75rem] bg-brand-teal-light ring-1 ring-brand-teal/10">
                <div className="relative aspect-[4/3] lg:h-[24rem] lg:aspect-auto xl:h-[26rem]">
                    <PlaceholderImage
                      src={programsImages.teenProgramImage}
                      alt="Teen Life Skills Program at Ava's Hub"
                      fill
                      priority
                      className="object-cover object-center"
                      sizes="(min-width: 1024px) 40vw, 100vw"
                    />
                </div>
              </div>

              <div className="px-2 pb-3 lg:px-4 lg:py-4 xl:px-6">
                <header>
                  <h1
                    id="teen-program-heading"
                    className="text-[clamp(2.55rem,8vw,5rem)] font-extrabold leading-[0.98] tracking-tight text-brand-navy"
                  >
                    Teen Life Skills Program
                  </h1>
                  <p className="mt-4 max-w-2xl text-lg font-extrabold leading-snug text-brand-purple-bright lg:text-xl">
                    Helping teens build confidence, independence, life skills,
                    and real-world participation.
                  </p>
                  <p className="mt-5 inline-flex rounded-full bg-brand-lavender px-4 py-2 text-sm font-extrabold text-brand-purple-bright">
                    Ages 14-18
                  </p>
                  <p className="mt-5 max-w-3xl text-base leading-relaxed text-brand-navy/82 lg:text-lg">
                    The Teen Life Skills Program at Ava&apos;s Hub helps
                    adolescents build the practical skills needed for greater
                    independence at home, in school, in the community, and for
                    future adulthood. Sessions focus on executive functioning,
                    life skills, self-advocacy, social participation, emotional
                    regulation, community readiness, and real-world experiences
                    that support confidence and independence.
                  </p>
                  <StartIntakeButton className="mt-6" />
                </header>
              </div>
            </div>
          </article>
        </SectionContainer>
      </section>

      <section className="pb-10 lg:pb-14">
        <SectionContainer>
          <GuideSection
                  title="What We Work On"
                  subtitle="Age-appropriate support for independence, confidence, and future readiness."
                >
                  <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                    {workOnItems.map((item) => (
                      <WorkOnCard key={item.title} item={item} />
                    ))}
                  </div>
          </GuideSection>
        </SectionContainer>
      </section>

      <section className="pb-10 lg:pb-14">
        <SectionContainer>
          <div className="mx-auto grid max-w-[78rem] gap-6 xl:grid-cols-2 xl:items-stretch">
            <div className="min-w-0"><ProgramSupportsCard items={goodFitItems} /></div>
            <div className="min-w-0"><SessionsCard /></div>
          </div>
        </SectionContainer>
      </section>

      <section className="py-10 lg:py-14" aria-labelledby="other-programs-heading">
        <SectionContainer>
          <SectionHeading
            title="Explore Other Programs"
            subtitle="Support grows with your child and adapts as daily life changes."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {otherPrograms.map((program) => (
              <article
                key={program.title}
                className="flex h-full min-w-0 flex-col overflow-hidden rounded-[1.75rem] bg-white/95 shadow-card ring-1 ring-brand-teal/10"
              >
                <div className="relative h-52 bg-brand-teal-light xl:h-56">
                  <PlaceholderImage
                    src={program.image}
                    alt={`${program.title} at Ava's Hub`}
                    fill
                    className="object-cover object-center"
                    sizes="(min-width: 768px) 33vw, 100vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-xl font-extrabold leading-tight text-brand-navy">
                    {program.title}
                  </h3>
                  <p className="mt-1 text-sm font-bold text-brand-purple-bright">
                    {program.age}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-brand-navy/75">
                    {program.text}
                  </p>
                  {"href" in program ? (
                    <div className="mt-auto pt-5">
                      <CTAButton href={program.href} className="w-full !py-2.5">
                        Learn More
                      </CTAButton>
                    </div>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </SectionContainer>
      </section>

      <section className="py-10 lg:py-14" aria-labelledby="teen-newsletter-heading">
        <SectionContainer>
          <div className="overflow-hidden rounded-[1.75rem] bg-brand-lavender/45 shadow-card ring-1 ring-brand-purple-deep/10 lg:rounded-[2rem]">
            <div className="grid h-full items-stretch lg:grid-cols-[0.38fr_0.62fr]">
              <div className="relative min-h-52 bg-brand-teal-light lg:min-h-[17rem]">
                <PlaceholderImage
                  src="/images/resources/mobile/newsletter-card.png"
                  alt="Family updates from Ava's Hub"
                  fill
                  className="object-cover object-center"
                  sizes="(min-width: 1024px) 38vw, 100vw"
                />
              </div>
              <div className="flex flex-col justify-center p-6 text-center lg:p-10">
              <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-white text-brand-purple-bright shadow-sm">
              <Icon name="email" size="lg" />
            </span>
            <h2
              id="teen-newsletter-heading"
              className="mt-4 text-2xl font-extrabold text-brand-navy lg:text-3xl"
            >
              Stay Connected
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-brand-navy/75 lg:text-base">
              Get updates about programs, events, and resources from Ava&apos;s Hub.
            </p>
            <div className="mx-auto mt-6 max-w-xl">
              <EmailSignupForm placeholder="Enter your email address" source="programs/teens" />
            </div>
            <p className="mt-4 text-xs font-semibold text-brand-navy/60">
              We respect your privacy. Unsubscribe anytime.
            </p>
              </div>
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
