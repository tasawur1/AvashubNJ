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
  title: "Young Adult Life Readiness Program | Ava's Hub",
  description:
    "Young adult occupational therapy and life readiness support focused on independence, community participation, work skills, routines, executive functioning, and real-world success.",
  alternates: { canonical: "/programs/young-adults" },
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
    icon: "home",
    title: "Independent Living Skills",
    explanation:
      "Independent living skills help young adults participate more independently in everyday life and prepare for adulthood responsibilities.",
    look: [
      "Difficulty completing routines independently",
      "Needing frequent reminders",
      "Challenges with household responsibilities",
      "Difficulty managing personal belongings",
      "Struggling with self-care tasks",
    ],
    helps:
      "We practice meaningful daily routines including dressing, hygiene, laundry, meal preparation, cleaning, organization systems, household participation, and everyday tasks that build independence.",
  },
  {
    icon: "compass",
    title: "Community Participation",
    explanation:
      "Participation within the community builds confidence, connection, and long-term independence.",
    look: [
      "Limited participation outside home",
      "Difficulty navigating new environments",
      "Anxiety in community settings",
      "Dependence on caregivers during outings",
      "Limited confidence in public spaces",
    ],
    helps:
      "We support community participation through outings, real-world practice, decision making, problem solving, transportation routines, community navigation, and participation experiences that build confidence.",
  },
  {
    icon: "independence",
    title: "Vocational Readiness & Work Skills",
    explanation:
      "Work readiness includes the skills needed to participate successfully in volunteer roles, employment opportunities, internships, and future workplace environments.",
    look: [
      "Difficulty following routines",
      "Limited work endurance",
      "Challenges completing tasks independently",
      "Difficulty communicating needs",
      "Difficulty learning new responsibilities",
    ],
    helps:
      "We use functional activities, task completion practice, routines, problem solving, communication practice, role responsibilities, and meaningful work-related experiences to support future readiness.",
  },
  {
    icon: "resources",
    title: "Executive Functioning & Organization",
    explanation:
      "Executive functioning becomes increasingly important during adulthood.",
    look: [
      "Difficulty managing schedules",
      "Missing appointments",
      "Difficulty planning tasks",
      "Trouble completing multi-step routines",
      "Poor organization",
    ],
    helps:
      "We practice planning systems, schedules, organization tools, checklists, routines, time management, problem solving, and real-life activities that support independence.",
  },
  {
    icon: "handHeart",
    title: "Self-Advocacy & Communication",
    explanation:
      "Young adults benefit from understanding themselves, communicating needs, and participating more independently in decisions.",
    look: [
      "Difficulty expressing needs",
      "Dependence on others to communicate",
      "Low confidence making decisions",
      "Difficulty asking for help",
    ],
    helps:
      "We support communication, confidence building, self-awareness, decision making, problem solving, and practicing real-life advocacy skills.",
  },
  {
    icon: "community",
    title: "Social Participation & Relationships",
    explanation:
      "Meaningful relationships and social participation continue to be important throughout adulthood.",
    look: [
      "Social isolation",
      "Difficulty building friendships",
      "Limited participation in groups",
      "Difficulty navigating conversations",
    ],
    helps:
      "We create opportunities for social participation through community experiences, collaborative activities, communication practice, group participation, and meaningful interactions.",
  },
  {
    icon: "heart",
    title: "Health, Wellness & Daily Routines",
    explanation:
      "Healthy routines support independence and long-term participation.",
    look: [
      "Inconsistent routines",
      "Poor sleep habits",
      "Difficulty preparing meals",
      "Difficulty managing responsibilities",
    ],
    helps:
      "We support routines, meal preparation, wellness habits, organization systems, scheduling, and practical life skills that support everyday success.",
  },
];

const goodFitItems = [
  "Young adults preparing for greater independence",
  "Difficulty managing routines",
  "Needing support with life skills",
  "Building work readiness",
  "Transitioning toward adulthood",
  "Wanting more community participation",
  "Developing confidence and self-advocacy",
  "Improving participation at home and in the community",
];

const sessionItems = [
  "Cooking and meal preparation",
  "Community participation activities",
  "Vocational tasks",
  "Organization systems",
  "Daily living routines",
  "Social participation",
  "Executive functioning activities",
  "Life skills practice",
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
    image: programsImages.teenProgramImage,
    title: "Teen Life Skills Program",
    age: "Ages 14-18",
    text: "Real-world therapy and coaching for independence, self-advocacy, and daily life skills.",
    href: "/programs/teens",
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
            Sessions focus on real-world participation and meaningful
            experiences. Young adults may participate in cooking activities,
            community outings, organization systems, vocational activities,
            life skills training, social experiences, scheduling routines, and
            everyday participation activities that support independence.
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

export default function YoungAdultProgramPage() {
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
          <span className="text-brand-purple-bright">
            Young Adult Life Readiness Program
          </span>
        </nav>
      </SectionContainer>

      <section
        className="pb-8 lg:pb-10"
        aria-labelledby="young-adult-program-heading"
      >
        <SectionContainer>
          <article className="rounded-[2.25rem] bg-white/95 p-4 shadow-card ring-1 ring-brand-purple-deep/10 lg:rounded-[2.75rem] lg:p-6">
            <div className="grid gap-6 lg:grid-cols-[0.4fr_0.6fr] lg:items-center lg:gap-8">
              <div className="overflow-hidden rounded-[1.75rem] bg-brand-teal-light ring-1 ring-brand-teal/10">
                <div className="relative aspect-[4/3] lg:h-[24rem] lg:aspect-auto xl:h-[26rem]">
                    <PlaceholderImage
                      src={programsImages.youngAdultProgramImage}
                      alt="Young Adult Life Readiness Program at Ava's Hub"
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
                    id="young-adult-program-heading"
                    className="text-[clamp(2.55rem,8vw,5rem)] font-extrabold leading-[0.98] tracking-tight text-brand-navy"
                  >
                    Young Adult Life Readiness Program
                  </h1>
                  <p className="mt-4 max-w-2xl text-lg font-extrabold leading-snug text-brand-purple-bright lg:text-xl">
                    Building confidence for adulthood, community participation,
                    work, and independent living.
                  </p>
                  <p className="mt-5 inline-flex rounded-full bg-brand-lavender px-4 py-2 text-sm font-extrabold text-brand-purple-bright">
                    Ages 19-21+
                  </p>
                  <p className="mt-5 max-w-3xl text-base leading-relaxed text-brand-navy/82 lg:text-lg">
                    The Young Adult Life Readiness Program helps young adults
                    develop the practical skills needed for greater independence
                    at home, in the workplace, and within their communities.
                    Sessions focus on life skills, community participation,
                    executive functioning, vocational readiness, self-advocacy,
                    routines, and meaningful real-world experiences that support
                    long-term independence and participation.
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
                  subtitle="Real-world support for adulthood, work, community life, and independent living."
                >
                  <div className="grid gap-5 md:grid-cols-2">
                    {workOnItems.map((item) => (
                      <WorkOnCard key={item.title} item={item} />
                    ))}
                  </div>
                </GuideSection>

                <div className="grid gap-6 xl:grid-cols-2 xl:items-stretch">
                  <div className="min-w-0">
                    <GuideSection title="Who This Program Supports">
                      <CheckListCard items={goodFitItems} />
                    </GuideSection>
                  </div>

                  <div className="min-w-0">
                    <GuideSection title="What Sessions May Look Like">
                      <SessionsCard />
                    </GuideSection>
                  </div>
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
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {otherPrograms.map((program) => (
              <article
                key={program.title}
                className="flex h-full min-w-0 flex-col overflow-hidden rounded-[1.75rem] bg-white/95 shadow-card ring-1 ring-brand-teal/10"
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
                    <CTAButton href={program.href} className="mt-auto w-full !py-2.5">
                      Learn More
                    </CTAButton>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </SectionContainer>
      </section>

      <section
        className="py-10 lg:py-14"
        aria-labelledby="young-adult-newsletter-heading"
      >
        <SectionContainer>
          <div className="rounded-[2rem] bg-brand-lavender/45 p-6 text-center shadow-card ring-1 ring-brand-purple-deep/10 lg:p-10">
            <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-white text-brand-purple-bright shadow-sm">
              <Icon name="email" size="lg" />
            </span>
            <h2
              id="young-adult-newsletter-heading"
              className="mt-4 text-2xl font-extrabold text-brand-navy lg:text-3xl"
            >
              Stay Connected
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-brand-navy/75 lg:text-base">
              Get updates about programs, events, and resources from Ava&apos;s Hub.
            </p>
            <div className="mx-auto mt-6 max-w-xl">
              <EmailSignupForm placeholder="Enter your email address" source="programs/young-adults" />
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
