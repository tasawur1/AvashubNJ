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
  title: "School-Age Occupational Therapy Program | Ava's Hub",
  description:
    "Ava's Hub School-Age Program supports children ages 8-13 with handwriting, executive functioning, sensory regulation, daily routines, fine motor skills, social participation, and school success.",
  alternates: { canonical: "/programs/school-age" },
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
      "Executive functioning includes the thinking skills children use to plan, organize, start tasks, manage time, shift attention, follow routines, and complete activities. These skills are important for schoolwork, homework, morning routines, transitions, and daily independence.",
    look: [
      "Difficulty starting tasks",
      "Messy backpack or desk",
      "Trouble following multi-step directions",
      "Difficulty finishing assignments",
      "Frequent reminders needed",
      "Frustration during transitions",
    ],
    helps:
      "Ava's Hub uses visual schedules, routines, planning activities, real-life problem solving, organization tasks, games, and functional challenges to help children build strategies they can use at home, in school, and in daily routines.",
  },
  {
    icon: "handHeart",
    title: "Handwriting & School Skills",
    explanation:
      "Handwriting depends on posture, hand strength, visual-motor coordination, attention, spacing, letter formation, and endurance. For many school-age children, handwriting struggles can affect confidence, school participation, and task completion.",
    look: [
      "Messy or hard-to-read writing",
      "Poor spacing or letter reversals",
      "Hand fatigue",
      "Avoiding writing tasks",
      "Difficulty copying from the board",
      "Slow written work",
    ],
    helps:
      "We support handwriting through fine motor strengthening, visual-motor activities, grasp development, posture support, multisensory writing practice, writing mechanics, and functional school-based activities that help children feel more confident and successful.",
  },
  {
    icon: "puzzlePiece",
    title: "Sensory Regulation",
    explanation:
      "Sensory regulation is the ability to notice, process, and respond to sensory information in a way that supports attention, emotional control, and participation. School-age children may struggle with noise, movement, touch, crowded spaces, transitions, or sitting for extended periods.",
    look: [
      "Constant movement seeking",
      "Difficulty sitting still",
      "Covering ears or avoiding certain textures",
      "Emotional outbursts",
      "Shutting down in busy environments",
      "Difficulty calming after frustration",
    ],
    helps:
      "We use movement activities, heavy work, sensory tools, regulation routines, body awareness activities, visual supports, and calming strategies to help children understand what their bodies need and participate more successfully.",
  },
  {
    icon: "home",
    title: "Daily Routines & Independence",
    explanation:
      "School-age children are often expected to take on more responsibility for dressing, hygiene, homework, chores, packing bags, managing materials, and following routines. These skills can be difficult when children struggle with sequencing, attention, motor skills, or regulation.",
    look: [
      "Needing repeated reminders",
      "Trouble completing morning routines",
      "Difficulty organizing school materials",
      "Avoiding hygiene tasks",
      "Difficulty following step-by-step routines",
      "Dependence on adults for daily tasks",
    ],
    helps:
      "Ava's Hub practices real-life routines using visual supports, sequencing activities, checklists, role play, dressing and grooming practice, organization tasks, and meaningful daily living activities that support independence.",
  },
  {
    icon: "handHeart",
    title: "Fine Motor Skills",
    explanation:
      "Fine motor skills continue to be important during school-age years for handwriting, typing, using tools, completing crafts, opening containers, managing clothing fasteners, and participating in classroom activities.",
    look: [
      "Weak grasp",
      "Difficulty cutting",
      "Trouble opening containers",
      "Messy work or hand fatigue",
      "Difficulty manipulating small objects",
      "Avoiding crafts or school tools",
    ],
    helps:
      "We use strengthening activities, crafts, tool use, games, cooking activities, school tool practice, bilateral coordination activities, and real-life fine motor tasks to improve hand skills in a meaningful way.",
  },
  {
    icon: "community",
    title: "Social Participation & Confidence",
    explanation:
      "School-age children are building friendships, learning teamwork, navigating group activities, and developing self-confidence. Some children may need support understanding social expectations, managing frustration, or participating with peers.",
    look: [
      "Difficulty joining play",
      "Avoiding group activities",
      "Frustration with losing or waiting",
      "Trouble taking turns",
      "Limited confidence",
      "Difficulty expressing needs",
      "Challenges with peer interaction",
    ],
    helps:
      "We embed social participation into games, group activities, collaborative problem solving, movement tasks, role play, and real-life routines so children practice confidence and connection in natural ways.",
  },
  {
    icon: "compass",
    title: "Movement & Coordination",
    explanation:
      "Movement and coordination help children participate in playground activities, sports, physical education, classroom movement, dressing, and daily routines. Some children may struggle with balance, body awareness, strength, motor planning, or coordination.",
    look: [
      "Clumsiness",
      "Avoiding playground equipment",
      "Difficulty with sports or PE",
      "Poor balance",
      "Trouble learning new movements",
      "Low endurance",
      "Difficulty coordinating both sides of the body",
    ],
    helps:
      "We use obstacle courses, balance activities, strengthening games, movement challenges, motor planning activities, ball skills, and functional play to help children feel more confident in their bodies.",
  },
];

const goodFitItems = [
  "Struggles with handwriting, spacing, letter formation, or written work",
  "Has difficulty with attention, organization, routines, or transitions",
  "Needs support with sensory regulation or emotional control",
  "Avoids school tasks, homework, crafts, or daily routines",
  "Needs help becoming more independent with self-care or responsibilities",
  "Has trouble joining peer activities or building confidence",
  "Struggles with movement, coordination, body awareness, or motor planning",
];

const sessionItems = [
  "Handwriting and visual-motor activities",
  "Executive functioning games and planning tasks",
  "Sensory regulation and movement activities",
  "Obstacle courses and coordination challenges",
  "School tool and organization practice",
  "Dressing, hygiene, and daily routine activities",
  "Social games and confidence-building activities",
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
    <article className="h-full rounded-[1.75rem] bg-white/90 p-6 shadow-card ring-1 ring-brand-purple-deep/10">
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

function CheckListCard({ items }: { items: string[] }) {
  return (
    <div className="h-full rounded-[1.75rem] bg-white/90 p-6 shadow-card ring-1 ring-brand-purple-deep/10">
      <ul className="grid gap-3">
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
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-teal-light text-brand-teal">
            <Icon name="child" size="lg" />
          </span>
          <p className="mt-5 text-base leading-relaxed text-brand-navy/78 lg:text-lg">
            Sessions are designed to connect school-age goals to real-life
            participation. A child may work through movement activities,
            handwriting practice, organization tasks, sensory regulation
            routines, daily living activities, games, problem-solving
            challenges, social participation activities, and functional routines
            that support success at home, in school, and in the community.
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

export default function SchoolAgeProgramPage() {
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
          <span className="text-brand-purple-bright">School-Age Program</span>
        </nav>
      </SectionContainer>

      <section className="pb-8 lg:pb-10" aria-labelledby="school-age-program-heading">
        <SectionContainer>
          <article className="rounded-[2.25rem] bg-white/95 p-4 shadow-card ring-1 ring-brand-purple-deep/10 lg:rounded-[2.75rem] lg:p-6">
            <div className="grid gap-6 lg:grid-cols-[0.4fr_0.6fr] lg:items-center lg:gap-8">
              <div className="overflow-hidden rounded-[1.75rem] bg-brand-teal-light ring-1 ring-brand-teal/10">
                <div className="relative aspect-[4/3] lg:h-[24rem] lg:aspect-auto xl:h-[26rem]">
                    <PlaceholderImage
                      src={programsImages.schoolAgeProgramImage}
                      alt="School-Age Program at Ava's Hub"
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
                    id="school-age-program-heading"
                    className="text-[clamp(2.55rem,8vw,5rem)] font-extrabold leading-[0.98] tracking-tight text-brand-navy"
                  >
                    School-Age Program
                  </h1>
                  <p className="mt-4 max-w-2xl text-lg font-extrabold leading-snug text-brand-purple-bright lg:text-xl">
                    Building confidence, independence, and school success
                    through real-life occupational therapy.
                  </p>
                  <p className="mt-5 inline-flex rounded-full bg-brand-lavender px-4 py-2 text-sm font-extrabold text-brand-purple-bright">
                    Ages 8-13
                  </p>
                  <p className="mt-5 max-w-3xl text-base leading-relaxed text-brand-navy/82 lg:text-lg">
                    The School-Age Program at Ava&apos;s Hub supports children
                    who are building independence at home, in school, and in the
                    community. Through occupational therapy-based activities,
                    children work on executive functioning, handwriting, sensory
                    regulation, daily routines, motor skills, social
                    participation, and confidence in ways that connect directly
                    to real life.
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
          <article className="rounded-[2.25rem] bg-white/95 p-6 shadow-card ring-1 ring-brand-purple-deep/10 lg:rounded-[2.75rem] lg:p-10 xl:p-12">
            <div className="w-full space-y-9">
                <GuideSection
                  title="What We Work On"
                  subtitle="Real-life occupational therapy support for school, home, and community participation."
                >
                  <div className="grid gap-5 lg:grid-cols-2">
                    {workOnItems.map((item) => (
                      <WorkOnCard key={item.title} item={item} />
                    ))}
                  </div>
                </GuideSection>

                <div className="grid gap-6 lg:grid-cols-2 lg:items-stretch">
                  <GuideSection title="Who This Program Supports">
                    <CheckListCard items={goodFitItems} />
                  </GuideSection>

                  <GuideSection title="What Sessions May Look Like">
                    <SessionsCard />
                  </GuideSection>
                </div>
            </div>
          </article>
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
                  {"href" in program ? (
                    <CTAButton href={program.href} className="mt-5 w-full !py-2.5">
                      Learn More
                    </CTAButton>
                  ) : null}
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
