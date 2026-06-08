import type { Metadata } from "next";
import Link from "next/link";
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
    icon: "handHeart",
    title: "Fine Motor Skills",
    explanation:
      "Fine motor skills are the small movements we make using our hands, fingers, wrists, and eyes together to complete everyday activities. These skills allow children to manipulate objects, hold utensils, fasten clothing, build with toys, color, cut with scissors, use school tools, and participate more independently in daily routines.",
    look: [
      "Difficulty holding crayons correctly",
      "Challenges opening containers, using utensils, or buttoning clothing",
      "Avoiding tasks that require using both hands together",
      "Tiring quickly or becoming frustrated during hand-based activities",
    ],
    helps:
      "At Ava's Hub, we use meaningful, play-based occupational therapy activities to strengthen these foundational skills in ways that feel motivating rather than frustrating. Sessions may include obstacle courses, crafts, grasp development, bilateral coordination games, dressing activities, cooking activities, and sensory-rich experiences.",
    note: "Rather than practicing isolated exercises repeatedly, we focus on helping children develop fine motor skills through real-life activities that connect directly to everyday success.",
  },
  {
    icon: "puzzlePiece",
    title: "Sensory Processing",
    explanation:
      "Sensory processing refers to how the brain receives, organizes, interprets, and responds to information from the environment and the body. Children constantly process sounds, movement, touch, textures, visual information, body awareness, and many other sensations throughout the day.",
    look: [
      "Overwhelm with clothing textures, foods, noise, or busy spaces",
      "Difficulty with transitions, attention, or emotional regulation",
      "Seeking constant movement, touch, or input",
      "Avoiding certain everyday sensory experiences",
    ],
    helps:
      "At Ava's Hub, we help children better understand and respond to sensory experiences through movement-based activities, sensory play, regulation strategies, obstacle courses, heavy work activities, visual supports, and structured routines.",
    note: "Our goal is not to eliminate sensory differences. We help children develop strategies, confidence, and participation so sensory experiences feel more manageable.",
  },
  {
    icon: "child",
    title: "Developmental Play",
    explanation:
      "Play is one of the primary ways young children learn. Through play, children develop problem solving, creativity, communication, emotional regulation, motor skills, social interaction, and confidence.",
    look: [
      "Limited pretend play",
      "Difficulty engaging with toys appropriately",
      "Rigid play patterns or frustration during play",
      "Challenges playing with peers",
    ],
    helps:
      "At Ava's Hub, we use play intentionally to support growth. Therapy sessions may include pretend play, sensory activities, movement games, social games, building activities, imaginative play scenarios, crafts, and structured challenges.",
    note: "We believe children learn best when therapy feels meaningful and enjoyable. Play is not separate from learning - it is learning.",
  },
  {
    icon: "compass",
    title: "Motor Planning",
    explanation:
      "Motor planning is the brain's ability to figure out how to move the body to complete a task. This includes knowing what movement is needed, organizing the steps, coordinating the body, and adjusting movements as activities change.",
    look: [
      "Appearing clumsy or unsure with movement",
      "Avoiding playground equipment or new activities",
      "Frustration with dressing tasks or movement sequences",
      "Needing repeated demonstrations to learn new skills",
    ],
    helps:
      "At Ava's Hub, we support motor planning through obstacle courses, movement games, climbing activities, dressing practice, sequencing activities, playground-style challenges, sports-based activities, and functional tasks.",
    note: "Our focus is helping children build confidence with movement so everyday activities feel easier, more successful, and less frustrating.",
  },
  {
    icon: "home",
    title: "Self-Care Routines",
    explanation:
      "Self-care skills include the everyday activities children participate in to care for themselves and become more independent. These routines include dressing, feeding, hygiene, toileting, grooming, sleep routines, and participating in household responsibilities.",
    look: [
      "Daily routines feeling stressful for children and families",
      "Difficulty dressing independently",
      "Avoiding hygiene tasks or feeding routines",
      "Becoming overwhelmed during everyday expectations",
    ],
    helps:
      "At Ava's Hub, we focus on building independence through real-life practice and meaningful routines. Therapy sessions may include dressing activities, feeding practice, grooming routines, kitchen activities, visual supports, sequencing tasks, and environmental modifications.",
    note: "We believe therapy should help children participate more confidently in real life - not only inside the therapy room.",
  },
  {
    icon: "community",
    title: "Early Social Participation",
    explanation:
      "Social participation involves engaging with others during play, daily routines, learning activities, and community experiences. These skills include turn-taking, emotional regulation, communication, flexibility, problem solving, and interacting with peers.",
    look: [
      "Preferring to play alone",
      "Struggling to enter play activities",
      "Becoming overwhelmed in groups",
      "Difficulty sharing or understanding social situations",
    ],
    helps:
      "At Ava's Hub, social participation is naturally embedded throughout therapy. Children practice these skills during movement activities, games, group experiences, cooking activities, pretend play, collaborative challenges, and everyday interactions.",
    note: "Our goal is not simply teaching social skills - it is helping children build meaningful relationships, confidence, and participation.",
  },
  {
    icon: "resources",
    title: "Pre-Writing Readiness",
    explanation:
      "Before children learn handwriting, they first develop many foundational skills that support writing success. These include posture, shoulder stability, bilateral coordination, visual-motor integration, grasp development, attention, body awareness, and hand strength.",
    look: [
      "Avoiding coloring or table activities",
      "Tiring quickly during early academic tasks",
      "Using awkward grasp patterns",
      "Becoming frustrated with writing readiness activities",
    ],
    helps:
      "At Ava's Hub, we build these skills through movement, climbing activities, crafts, sensory play, obstacle courses, fine motor games, strengthening activities, and playful experiences that naturally support writing development.",
    note: "Rather than focusing only on paper-and-pencil tasks, we build the foundation first - because strong foundations create more confident learners.",
  },
];

const goodFitItems = [
  "Avoids or becomes frustrated with tasks like dressing, crafts, feeding, or pre-writing",
  "Has difficulty transitioning between activities or following routines",
  "Seems overwhelmed by sensory input or seeks constant movement",
  "Has trouble with fine motor skills like grasping, cutting, manipulating toys, or using utensils",
  "Needs support with play, attention, emotional regulation, or peer interaction",
  "Is working toward more independence in daily routines",
];

const sessionItems = [
  "Movement and obstacle courses",
  "Sensory play and regulation activities",
  "Fine motor games and crafts",
  "Pretend play and social practice",
  "Dressing, feeding, and daily routine practice",
  "Visual schedules and transition supports",
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
      <h2 className="font-serif text-[clamp(1.9rem,4.5vw,2.75rem)] font-semibold leading-tight text-brand-navy">
        {title}
        <span className="ml-3 text-brand-purple-bright/55">
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
            Sessions are designed to feel playful while targeting real
            developmental goals. A child may move through obstacle courses,
            explore sensory materials, practice dressing or feeding skills,
            complete fine motor activities, engage in pretend play, or work
            through short routines with visual supports.
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

      <section className="pb-8 lg:pb-10" aria-labelledby="kids-program-heading">
        <SectionContainer>
          <article className="rounded-[2.25rem] bg-white/95 p-4 shadow-card ring-1 ring-brand-purple-deep/10 lg:rounded-[2.75rem] lg:p-6">
            <div className="grid gap-6 lg:grid-cols-[0.4fr_0.6fr] lg:items-center lg:gap-8">
              <div className="overflow-hidden rounded-[1.75rem] bg-brand-teal-light ring-1 ring-brand-teal/10">
                <div className="relative aspect-[4/3] lg:h-[24rem] lg:aspect-auto xl:h-[26rem]">
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

              <div className="px-2 pb-3 lg:px-4 lg:py-4 xl:px-6">
                <header>
                  <p className="inline-flex rounded-full bg-brand-lavender px-4 py-2 text-sm font-extrabold text-brand-purple-bright">
                    Ages 3-7
                  </p>
                  <h1
                    id="kids-program-heading"
                    className="mt-5 text-[clamp(2.55rem,8vw,5rem)] font-extrabold leading-[0.98] tracking-tight text-brand-navy"
                  >
                    Kids Program
                  </h1>
                  <p className="mt-4 max-w-2xl text-lg font-extrabold leading-snug text-brand-purple-bright lg:text-xl">
                    Building confidence through play, movement, and meaningful
                    everyday experiences.
                  </p>
                  <p className="mt-5 max-w-3xl text-base leading-relaxed text-brand-navy/82 lg:text-lg">
                    The Kids Program at Ava&apos;s Hub uses play-based
                    occupational therapy to help young children build confidence,
                    regulation, motor skills, and everyday independence. Through
                    movement, sensory play, fine motor activities, self-care
                    practice, and social participation, children work on
                    real-life skills in a way that feels fun, supportive, and
                    meaningful.
                  </p>
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
                  subtitle="Play-based care that supports everyday confidence and participation."
                >
                  <div className="grid gap-5 lg:grid-cols-3">
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
