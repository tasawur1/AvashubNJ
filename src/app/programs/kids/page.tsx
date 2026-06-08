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

type GuideItem = {
  icon: IconName;
  title: string;
  intro: string;
  signs: string[];
  helps: string;
};

const workOnItems: GuideItem[] = [
  {
    icon: "handHeart",
    title: "Fine Motor Skills",
    intro:
      "Fine motor skills are the small movements children use with their hands, fingers, wrists, and eyes together to complete everyday activities.",
    signs: [
      "Difficulty holding crayons or school tools",
      "Frustration with buttons, zippers, or containers",
      "Avoiding coloring, cutting, crafts, or table tasks",
      "Challenges using utensils or manipulating toys",
    ],
    helps:
      "At Ava's Hub, we use obstacle courses, crafts, sensory activities, dressing practice, cooking activities, strengthening games, and real-life functional activities to build these skills naturally.",
  },
  {
    icon: "puzzlePiece",
    title: "Sensory Processing",
    intro:
      "Sensory processing is how the brain receives, organizes, and responds to information from the body and environment.",
    signs: [
      "Sensitivity to sounds, textures, clothing, or foods",
      "Difficulty with transitions, attention, or busy spaces",
      "Seeking constant movement, crashing, spinning, or touch",
      "Big emotions when sensory experiences feel overwhelming",
    ],
    helps:
      "We use movement-based activities, sensory play, regulation strategies, obstacle courses, heavy work, visual supports, and structured routines so children feel safer and more successful throughout the day.",
  },
  {
    icon: "child",
    title: "Developmental Play",
    intro:
      "Play is one of the primary ways young children learn communication, problem solving, emotional regulation, motor skills, and confidence.",
    signs: [
      "Limited pretend play or rigid play patterns",
      "Difficulty using toys in flexible or meaningful ways",
      "Frustration during play activities",
      "Challenges joining play with peers or adults",
    ],
    helps:
      "Therapy may include pretend play, sensory activities, movement games, social games, building activities, imaginative scenarios, crafts, and structured challenges that keep children engaged while building developmental skills.",
  },
  {
    icon: "compass",
    title: "Motor Planning",
    intro:
      "Motor planning is the brain's ability to figure out how to move the body, organize steps, and adjust movements to complete a task.",
    signs: [
      "Appearing clumsy or unsure with movement",
      "Avoiding playground equipment or new activities",
      "Difficulty with dressing steps or movement sequences",
      "Needing repeated demonstrations to learn new skills",
    ],
    helps:
      "We support motor planning through obstacle courses, movement games, climbing activities, dressing practice, sequencing activities, playground-style challenges, sports-based activities, and functional tasks.",
  },
  {
    icon: "home",
    title: "Self-Care Routines",
    intro:
      "Self-care routines include dressing, feeding, hygiene, toileting readiness, grooming, sleep routines, and everyday participation at home.",
    signs: [
      "Daily routines feel stressful or slow",
      "Difficulty dressing, feeding, or grooming independently",
      "Avoiding hygiene tasks or toileting routines",
      "Becoming overwhelmed during everyday expectations",
    ],
    helps:
      "We build independence through real-life practice, dressing activities, feeding practice, grooming routines, kitchen activities, visual supports, sequencing tasks, and realistic strategies for each family.",
  },
  {
    icon: "community",
    title: "Early Social Participation",
    intro:
      "Social participation means engaging with others during play, routines, learning activities, and community experiences.",
    signs: [
      "Preferring to play alone or struggling to enter play",
      "Difficulty sharing, turn-taking, or flexible play",
      "Feeling overwhelmed in groups",
      "Challenges with emotional regulation during social moments",
    ],
    helps:
      "Social participation is embedded into movement activities, games, group experiences, cooking activities, pretend play, collaborative challenges, and everyday interactions with therapists and peers.",
  },
  {
    icon: "resources",
    title: "Pre-Writing Readiness",
    intro:
      "Before handwriting begins, children need posture, shoulder stability, bilateral coordination, visual-motor integration, grasp development, attention, and hand strength.",
    signs: [
      "Avoiding coloring or table activities",
      "Tiring quickly during early school tasks",
      "Using awkward grasp patterns",
      "Feeling frustrated with pre-writing or fine motor activities",
    ],
    helps:
      "We build these foundations through movement, climbing activities, crafts, sensory play, obstacle courses, fine motor games, strengthening activities, and playful hands-on experiences.",
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

function GuideSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-brand-purple-deep/10 pt-8 lg:pt-10">
      <h2 className="text-[clamp(1.35rem,4.5vw,1.85rem)] font-extrabold leading-tight text-brand-navy">
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function WorkOnItem({ item }: { item: GuideItem }) {
  return (
    <div className="grid gap-4 sm:grid-cols-[3rem_1fr]">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-lavender text-brand-purple-bright">
        <Icon name={item.icon} size="sm" />
      </span>
      <div>
        <h3 className="text-lg font-extrabold leading-tight text-brand-navy">
          {item.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-brand-navy/70 lg:text-[0.95rem]">
          {item.intro}
        </p>
        <div className="mt-4 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-normal text-brand-purple-bright">
              How this may look
            </p>
            <ul className="mt-2 space-y-2">
              {item.signs.map((sign) => (
                <li
                  key={sign}
                  className="flex gap-2 text-sm leading-relaxed text-brand-navy/72"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-gold" />
                  <span>{sign}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-extrabold uppercase tracking-normal text-brand-teal">
              How Ava&apos;s Hub Helps
            </p>
            <p className="mt-2 text-sm leading-relaxed text-brand-navy/68">
              {item.helps}
            </p>
          </div>
        </div>
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
            <div className="max-w-6xl space-y-9">
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
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
                <GuideSection title="What We Work On">
                  <div className="space-y-6">
                    {workOnItems.map((item) => (
                      <WorkOnItem key={item.title} item={item} />
                    ))}
                  </div>
                </GuideSection>

                <GuideSection title="Who This Program Supports">
                  <ul className="grid gap-3 lg:grid-cols-2">
                    {goodFitItems.map((item) => (
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
                </GuideSection>

                <GuideSection title="What Sessions May Look Like">
                  <p className="max-w-3xl text-base leading-relaxed text-brand-navy/78">
                    Sessions are designed to feel playful while targeting real
                    developmental goals. A child may move through obstacle
                    courses, explore sensory materials, practice dressing or
                    feeding skills, complete fine motor activities, engage in
                    pretend play, or work through short routines with visual
                    supports.
                  </p>
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {sessionItems.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-3 text-sm font-extrabold text-brand-navy/85"
                      >
                        <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-brand-gold" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </GuideSection>
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
