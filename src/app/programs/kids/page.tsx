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
  text: string;
};

const workOnItems: GuideItem[] = [
  {
    icon: "handHeart",
    title: "Fine Motor Skills",
    text: "We help children build hand strength, coordination, grasp patterns, and control needed for play, feeding, dressing, cutting, pre-writing, and classroom activities.",
  },
  {
    icon: "puzzlePiece",
    title: "Sensory Processing",
    text: "Some children feel overwhelmed by sounds, textures, movement, or busy environments, while others seek extra input. We use supportive sensory activities to help children feel more organized and ready to participate.",
  },
  {
    icon: "child",
    title: "Developmental Play",
    text: "Play is how young children learn. We use play to support problem solving, social interaction, creativity, communication, attention, and confidence.",
  },
  {
    icon: "compass",
    title: "Motor Planning",
    text: "Motor planning is the ability to figure out how to move the body to complete a task. At Ava's Hub, we support this through obstacle courses, movement games, dressing practice, playground-style activities, and step-by-step routines.",
  },
  {
    icon: "home",
    title: "Self-Care Routines",
    text: "We support early independence with dressing, feeding, toileting readiness, hygiene routines, and everyday participation in ways that feel realistic for each child and family.",
  },
  {
    icon: "community",
    title: "Early Social Participation",
    text: "We help children practice sharing, turn-taking, group participation, peer interaction, and emotional regulation during play and daily routines.",
  },
  {
    icon: "resources",
    title: "Pre-Writing Readiness",
    text: "Before handwriting begins, children need posture, hand strength, visual-motor coordination, bilateral coordination, and grasp development. We build these skills through meaningful play and hands-on activities.",
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
      <h2 className="font-serif text-[clamp(1.7rem,5vw,2.35rem)] font-semibold leading-tight text-brand-navy">
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
        <p className="mt-2 text-sm leading-relaxed text-brand-navy/75 lg:text-base">
          {item.text}
        </p>
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

      <section className="pb-10 lg:pb-14" aria-labelledby="kids-program-heading">
        <SectionContainer>
          <article className="overflow-hidden rounded-[2.25rem] bg-white/95 shadow-card ring-1 ring-brand-purple-deep/10 lg:rounded-[2.75rem]">
            <div className="grid gap-0 lg:grid-cols-[0.4fr_0.6fr] lg:items-start">
              <div className="p-4 pb-0 lg:p-6 lg:pr-0">
                <div className="overflow-hidden rounded-[1.75rem] bg-brand-teal-light ring-1 ring-brand-teal/10 lg:sticky lg:top-24">
                  <div className="relative aspect-[4/3] lg:aspect-[4/5]">
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
              </div>

              <div className="space-y-9 p-6 lg:p-10 xl:p-12">
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
                  <p className="mt-4 max-w-2xl text-xl font-extrabold leading-snug text-brand-purple-bright lg:text-2xl">
                    Building confidence through play, movement, and meaningful
                    everyday experiences.
                  </p>
                  <p className="mt-6 max-w-3xl text-base leading-relaxed text-brand-navy/82 lg:text-lg">
                    At Ava&apos;s Hub, our Kids Program uses play-based
                    occupational therapy to help young children build the skills
                    they need for everyday life. Sessions are designed to feel
                    fun, supportive, and meaningful while helping children
                    develop confidence, regulation, motor skills, independence,
                    and early participation at home, in school, and in the
                    community.
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
                </header>

                <GuideSection title="What We Work On">
                  <div className="space-y-6">
                    {workOnItems.map((item) => (
                      <WorkOnItem key={item.title} item={item} />
                    ))}
                  </div>
                </GuideSection>

                <GuideSection title="This Program May Be A Good Fit If Your Child...">
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
