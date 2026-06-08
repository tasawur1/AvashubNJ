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
  paragraphs: string[];
};

const workOnItems: GuideItem[] = [
  {
    icon: "handHeart",
    title: "Fine Motor Skills",
    paragraphs: [
      "Fine motor skills are the small movements we make using our hands, fingers, wrists, and eyes together to complete everyday activities. These skills allow children to manipulate objects, hold utensils, fasten clothing, build with toys, color, cut with scissors, use school tools, and participate more independently in daily routines.",
      "When fine motor skills are difficult, children may appear clumsy, avoid tasks that require using their hands, become frustrated more easily, tire quickly during activities, or struggle keeping up with peers during play or classroom tasks. Parents may notice difficulty holding crayons correctly, opening containers, using utensils, buttoning clothing, manipulating toys, or completing activities that require both hands working together.",
      "At Ava's Hub, we use meaningful, play-based occupational therapy activities to strengthen these foundational skills in ways that feel motivating rather than frustrating. Sessions may include obstacle courses that build upper body strength and postural stability, crafts that encourage grasp development and bilateral coordination, games that improve finger strength and dexterity, dressing activities that target independence, cooking activities that practice functional hand skills, and sensory-rich experiences that support participation.",
      "Rather than practicing isolated exercises repeatedly, we focus on helping children develop fine motor skills through real-life activities that connect directly to everyday success at home, school, playgrounds, and within their communities.",
    ],
  },
  {
    icon: "puzzlePiece",
    title: "Sensory Processing",
    paragraphs: [
      "Sensory processing refers to how the brain receives, organizes, interprets, and responds to information from the environment and the body. Children constantly process sounds, movement, touch, textures, visual information, body awareness, and many other sensations throughout the day.",
      "Some children may become overwhelmed by sensory experiences, while others actively seek more movement, touch, or input. Parents may notice challenges with clothing textures, food preferences, noise sensitivity, emotional regulation, transitions, attention, busy environments, or constant movement seeking.",
      "At Ava's Hub, we help children better understand and respond to sensory experiences through movement-based activities, sensory play, regulation strategies, obstacle courses, heavy work activities, visual supports, and structured routines that help children feel safer and more successful throughout their day.",
      "Our goal is not to eliminate sensory differences. Instead, we help children develop strategies, confidence, and participation so sensory experiences feel more manageable at home, school, and within the community.",
    ],
  },
  {
    icon: "child",
    title: "Developmental Play",
    paragraphs: [
      "Play is one of the primary ways young children learn. Through play, children develop problem solving, creativity, communication, emotional regulation, motor skills, social interaction, and confidence.",
      "When developmental play skills are difficult, parents may notice limited pretend play, difficulty engaging with toys appropriately, challenges playing with peers, rigid play patterns, or frustration during play activities.",
      "At Ava's Hub, we use play intentionally to support growth. Therapy sessions may include pretend play, sensory activities, movement games, social games, building activities, imaginative play scenarios, crafts, and structured challenges designed to build developmental skills while keeping children engaged.",
      "We believe children learn best when therapy feels meaningful and enjoyable. Play is not separate from learning - it is learning.",
    ],
  },
  {
    icon: "compass",
    title: "Motor Planning",
    paragraphs: [
      "Motor planning is the brain's ability to figure out how to move the body to complete a task. This includes knowing what movement is needed, organizing the steps, coordinating the body, and adjusting movements as activities change.",
      "Children who struggle with motor planning may appear clumsy, avoid playground equipment, struggle learning new movements, become frustrated with dressing tasks, have difficulty following movement sequences, or require repeated demonstrations to learn new skills.",
      "At Ava's Hub, we support motor planning through obstacle courses, movement games, climbing activities, dressing practice, sequencing activities, playground-style challenges, sports-based activities, and functional tasks that encourage children to problem solve using their bodies.",
      "Our focus is helping children build confidence with movement so everyday activities feel easier, more successful, and less frustrating.",
    ],
  },
  {
    icon: "home",
    title: "Self-Care Routines",
    paragraphs: [
      "Self-care skills include the everyday activities children participate in to care for themselves and become more independent. These routines include dressing, feeding, hygiene, toileting, grooming, sleep routines, and participating in household responsibilities.",
      "When self-care becomes difficult, daily routines may feel stressful for both children and families. Parents may notice difficulty dressing independently, avoiding hygiene tasks, challenges feeding themselves, or becoming overwhelmed during everyday routines.",
      "At Ava's Hub, we focus on building independence through real-life practice and meaningful routines. Therapy sessions may include dressing activities, feeding practice, grooming routines, kitchen activities, visual supports, sequencing tasks, and environmental modifications that help children experience success.",
      "We believe therapy should help children participate more confidently in real life - not only inside the therapy room.",
    ],
  },
  {
    icon: "community",
    title: "Early Social Participation",
    paragraphs: [
      "Social participation involves engaging with others during play, daily routines, learning activities, and community experiences. These skills include turn-taking, emotional regulation, communication, flexibility, problem solving, and interacting with peers.",
      "Some children may prefer playing alone, struggle entering play activities, become overwhelmed in groups, have difficulty sharing, or experience challenges understanding social situations.",
      "At Ava's Hub, social participation is naturally embedded throughout therapy. Children practice these skills during movement activities, games, group experiences, cooking activities, pretend play, collaborative challenges, and everyday interactions with therapists and peers.",
      "Our goal is not simply teaching social skills - it is helping children build meaningful relationships, confidence, and participation.",
    ],
  },
  {
    icon: "resources",
    title: "Pre-Writing Readiness",
    paragraphs: [
      "Before children learn handwriting, they first develop many foundational skills that support writing success. These include posture, shoulder stability, bilateral coordination, visual-motor integration, grasp development, attention, body awareness, and hand strength.",
      "Children who struggle with these foundational skills may avoid coloring, dislike table activities, tire quickly, use awkward grasp patterns, or become frustrated during early academic tasks.",
      "At Ava's Hub, we build these skills through movement, climbing activities, crafts, sensory play, obstacle courses, fine motor games, strengthening activities, and playful experiences that naturally support writing development.",
      "Rather than focusing only on paper-and-pencil tasks, we build the foundation first - because strong foundations create more confident learners.",
    ],
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
    <div className="grid gap-4 border-b border-brand-purple-deep/10 pb-8 last:border-b-0 last:pb-0 sm:grid-cols-[3rem_minmax(0,1fr)] lg:gap-5">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-lavender text-brand-purple-bright">
        <Icon name={item.icon} size="sm" />
      </span>
      <div className="min-w-0">
        <h3 className="text-lg font-extrabold leading-tight text-brand-navy">
          {item.title}
        </h3>
        <div className="mt-3 space-y-4">
          {item.paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="max-w-none text-[1.08rem] leading-[1.78] text-brand-navy/74 lg:text-[1.22rem]"
            >
              {paragraph}
            </p>
          ))}
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
            <div className="w-full space-y-9">
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
                  <p className="max-w-none text-[1.08rem] leading-[1.78] text-brand-navy/78 lg:text-[1.18rem]">
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
