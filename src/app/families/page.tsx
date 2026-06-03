import type { Metadata } from "next";
import { CTAButton } from "@/components/CTAButton";
import { HeroBanner } from "@/components/HeroBanner";
import { Icon } from "@/components/Icon";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { SectionContainer } from "@/components/SectionContainer";
import { SectionHeadingDecorated } from "@/components/SectionHeadingDecorated";
import type { IconName } from "@/data/icons";
import { familiesImages } from "@/data/pageImages/familiesImages";
import {
  cardInnerPad,
  cardShell,
  cardShellSoft,
  innerContentWrap,
  pageSectionPad,
} from "@/lib/pageSectionStyles";

export const metadata: Metadata = {
  title: "For Families | Ava's Hub Family Support & Parent Resources",
  description:
    "Ava's Hub supports families with parent education, caregiver training, emotional support, community resources, and real-life strategies that help children, teens, and young adults build independence.",
  alternates: { canonical: "/families" },
  openGraph: {
    url: "/families",
    title: "For Families | Ava's Hub Family Support & Parent Resources",
    description:
      "Parent education, caregiver support, community connection, and real-life tools for families.",
  },
};

type Tone = "purple" | "teal" | "gold";

type SupportCard = {
  icon: IconName;
  title: string;
  description: string;
  tone: Tone;
  image: string;
};

type JourneyStep = {
  icon: IconName;
  title: string;
  description: string;
  tone: Tone;
};

type FamilyCard = {
  icon: IconName;
  title: string;
  text: string;
  image: string;
  bullets?: string[];
  highlight?: string;
  tone: Tone;
};

type ActionItem = {
  icon: IconName;
  title: string;
  description: string;
  tone: Tone;
};

const toneStyles = {
  purple: {
    icon: "bg-brand-purple-deep text-white",
    text: "text-brand-purple-deep",
    soft: "bg-brand-lavender/55",
    ring: "ring-brand-purple-deep/10",
  },
  teal: {
    icon: "bg-brand-teal text-white",
    text: "text-brand-teal",
    soft: "bg-brand-teal-light/60",
    ring: "ring-brand-teal/10",
  },
  gold: {
    icon: "bg-brand-gold text-brand-navy",
    text: "text-brand-gold",
    soft: "bg-brand-gold/15",
    ring: "ring-brand-gold/20",
  },
} satisfies Record<Tone, Record<string, string>>;

const supportCards: SupportCard[] = [
  {
    icon: "family",
    title: "Family-Centered Care",
    tone: "teal",
    image: familiesImages.familyCenteredCareImage,
    description:
      "We listen, collaborate, and create personalized plans that reflect your family's goals and priorities.",
  },
  {
    icon: "bookOpen",
    title: "Education & Empowerment",
    tone: "purple",
    image: familiesImages.educationEmpowermentImage,
    description:
      "We provide knowledge and strategies you can use with confidence at home and in daily routines.",
  },
  {
    icon: "heart",
    title: "Emotional Support",
    tone: "gold",
    image: familiesImages.emotionalSupportImage,
    description:
      "We know this journey can feel overwhelming. We're here to listen, encourage, and walk with you.",
  },
  {
    icon: "support",
    title: "Community Connection",
    tone: "teal",
    image: familiesImages.communityConnectionImage,
    description:
      "We help you connect with resources, local supports, and other families who truly understand.",
  },
  {
    icon: "communication",
    title: "Ongoing Communication",
    tone: "purple",
    image: familiesImages.ongoingCommunicationImage,
    description:
      "You'll always know where your loved one stands and what's next because teamwork matters.",
  },
];

const journeySteps: JourneyStep[] = [
  {
    icon: "phone",
    title: "Getting Started",
    tone: "teal",
    description:
      "We make the process simple from your first call to the initial assessment.",
  },
  {
    icon: "check",
    title: "Personalized Plan",
    tone: "purple",
    description:
      "We create a customized plan based on your loved one's strengths, needs, and goals.",
  },
  {
    icon: "family",
    title: "Therapy & Support",
    tone: "gold",
    description:
      "Our therapists and team work together to build skills that improve daily life and independence.",
  },
  {
    icon: "home",
    title: "Home & Community",
    tone: "teal",
    description:
      "We help carry strategies into everyday routines so progress happens where life happens.",
  },
  {
    icon: "confidence",
    title: "Growth & Independence",
    tone: "purple",
    description:
      "We celebrate milestones and build skills that lead to greater independence and confidence.",
  },
];

const familyCards: FamilyCard[] = [
  {
    icon: "training",
    title: "Parent & Caregiver Training",
    tone: "purple",
    image: familiesImages.parentCaregiverTrainingImage,
    text: "We equip parents and caregivers with practical skills and real-world strategies.",
    bullets: [
      "De-escalation training",
      "Crisis management",
      "Positive behavior support",
      "Communication strategies",
      "Daily routines & life skills support",
    ],
  },
  {
    icon: "heart",
    title: "You Deserve Support Too",
    tone: "teal",
    image: familiesImages.youDeserveSupportImage,
    text: "Caring for a loved one is a big job. Let us help with guidance, resources, and a community that has your back.",
    highlight:
      "Take care of you, so you can continue to take care of them.",
    bullets: ["Take care of you, so you can continue to take care of them."],
  },
  {
    icon: "resources",
    title: "Helpful Resources",
    tone: "gold",
    image: familiesImages.helpfulResourcesImage,
    text: "We connect families with trusted resources including:",
    bullets: [
      "Financial & insurance guidance",
      "Special education support",
      "Community services",
      "Respite care options",
      "Transition & future planning",
    ],
  },
];

const actionItems: ActionItem[] = [
  {
    icon: "calendar",
    title: "Schedule a Tour",
    description: "Come see our center and meet our team.",
    tone: "teal",
  },
  {
    icon: "phone",
    title: "Call or Text Us",
    description: "(908) 758-4692",
    tone: "purple",
  },
  {
    icon: "email",
    title: "Email Us",
    description: "info@avashub.com",
    tone: "gold",
  },
  {
    icon: "community",
    title: "Join Our Community",
    description: "Follow us for tips, events, and family resources.",
    tone: "teal",
  },
  {
    icon: "heart",
    title: "We're Here for You",
    description: "Every step of the way.",
    tone: "purple",
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
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-relaxed text-brand-navy/85">
          <Icon name="circleCheck" className="mt-0.5 text-brand-teal" size="sm" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
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

function MobileFamiliesHero() {
  return (
    <section className="px-6 pb-8 pt-5">
      <div className="rounded-[2rem] bg-[#fffaf4]">
        <div className="mx-auto w-full overflow-hidden rounded-[2rem] bg-brand-teal-light shadow-card">
          <PlaceholderImage
            src={familiesImages.familiesMobileHero}
            alt="Ava's Hub families mobile hero banner"
            width={1182}
            height={1331}
            priority
            className="block h-auto w-full"
            sizes="100vw"
          />
        </div>

        <div className="mt-7">
          <p className="inline-flex rounded-full bg-brand-lavender px-3 py-1 text-xs font-extrabold uppercase tracking-normal text-brand-purple-deep">
            For Families
          </p>
          <h2 className="mt-5 text-[clamp(2rem,9vw,2.35rem)] font-extrabold leading-[1.05] tracking-tight text-brand-navy">
            You&apos;re Not Alone.
            <br />
            We&apos;re Here With You.{" "}
            <span aria-hidden className="align-[0.02em] text-brand-gold">
              💛
            </span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-brand-navy/85">
            At Ava&apos;s Hub, we partner with families every step of the way,
            providing support, guidance, and tools to help your loved one thrive
            at home, in the community, and in life.
          </p>
        </div>

        <div className="mt-6 flex gap-4 rounded-3xl bg-white/90 p-5 shadow-card ring-1 ring-brand-purple-deep/10">
          <Icon name="heart" className="mt-1 text-brand-purple-bright" size="lg" />
          <p className="text-base font-extrabold leading-relaxed text-brand-navy">
            Strong families build strong futures.
          </p>
        </div>

        <div className="mt-6 space-y-3">
          <CTAButton href="/contact" className="w-full">
            <span className="inline-flex items-center gap-2">
              <Icon name="calendar" size="sm" />
              Schedule Consultation
            </span>
          </CTAButton>
          <CTAButton href="#family-support-mobile" variant="secondary" className="w-full">
            <span className="inline-flex items-center gap-2">
              <Icon name="family" size="sm" />
              How We Support You
            </span>
          </CTAButton>
        </div>
      </div>
    </section>
  );
}

function MobileFamiliesPage() {
  return (
    <div className="md:hidden">
      <MobileFamiliesHero />

      <section id="family-support-mobile" className="px-6 pb-10">
        <h2 className="font-serif text-[1.85rem] font-semibold leading-tight text-brand-navy">
          How We Support Your Family
          <span className="ml-2 text-brand-purple-bright/55">
            <TiltedHeartOutline />
          </span>
        </h2>
        <div className="mt-6 space-y-5">
          {supportCards.map((card) => (
            <article
              key={card.title}
              className={`overflow-hidden rounded-[1.75rem] shadow-card ring-1 ${toneStyles[card.tone].soft} ${toneStyles[card.tone].ring}`}
            >
              <div className="relative h-56 bg-brand-teal-light">
                <PlaceholderImage
                  src={card.image}
                  alt={`${card.title} at Ava's Hub`}
                  fill
                  className="object-cover object-center"
                  sizes="100vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-extrabold leading-tight text-brand-navy">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-brand-navy/80">
                  {card.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="px-6 pb-10">
        <h2 className="font-serif text-[1.85rem] font-semibold leading-tight text-brand-navy">
          We&apos;re Here for Every Step of the Journey
          <span className="ml-2 text-brand-purple-bright/55">
            <TiltedHeartOutline />
          </span>
        </h2>
        <div className="mt-6 space-y-3">
          {journeySteps.map((step, index) => (
            <div key={step.title}>
              <article className="rounded-[1.75rem] bg-white/90 p-5 shadow-card ring-1 ring-brand-teal/10">
                <div className="grid grid-cols-[4rem_1fr] items-center gap-4">
                  <span
                    className={`flex h-14 w-14 items-center justify-center rounded-full ${toneStyles[step.tone].icon}`}
                  >
                    <Icon name={step.icon} size="lg" />
                  </span>
                <div>
                  <h3 className="text-lg font-extrabold leading-tight text-brand-navy">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-navy/75">
                    {step.description}
                  </p>
                </div>
              </div>
              </article>
              {index < journeySteps.length - 1 ? (
                <div className="flex justify-center py-2" aria-hidden>
                  <svg
                    className="h-10 w-16 text-brand-purple-bright/70"
                    viewBox="0 0 64 40"
                    fill="none"
                  >
                    <path
                      d="M19 4c20 3 26 13 17 27"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeDasharray="2 6"
                    />
                    <path
                      d="M31 29l5 6 7-4"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 pb-10">
        <div className="space-y-5">
          {familyCards.map((card) => (
            <article
              key={card.title}
              className={`overflow-hidden rounded-[1.75rem] shadow-card ring-1 ${toneStyles[card.tone].soft} ${toneStyles[card.tone].ring}`}
            >
              <div className="relative h-48 bg-brand-teal-light">
                <PlaceholderImage
                  src={card.image}
                  alt={`${card.title} family support`}
                  fill
                  className="object-cover object-center"
                  sizes="100vw"
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-extrabold leading-tight text-brand-navy">
                  {card.title}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-brand-navy/85">
                  {card.text}
                </p>
                <div className="mt-5">
                  <CheckList items={card.bullets ?? []} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="px-6 pb-5">
        <div className="overflow-hidden rounded-[1.75rem] bg-brand-lavender/70 shadow-card ring-1 ring-brand-purple-deep/10">
          <div className="relative h-56 bg-brand-teal-light">
            <PlaceholderImage
              src={familiesImages.familyFinalCtaImage}
              alt="Family support and belonging at Ava's Hub"
              fill
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>
          <div className="p-6">
            <h2 className="text-2xl font-extrabold leading-tight text-brand-navy">
              We&apos;re more than a therapy center. We&apos;re a partner in
              your family&apos;s journey.
            </h2>
            <p className="mt-4 text-base font-extrabold leading-relaxed text-brand-purple-bright">
              Together, we build skills. Together, we build independence.
              Together, we build futures.
            </p>
            <CTAButton href="/contact" className="mt-5 w-full">
              <span className="inline-flex items-center gap-2">
                <Icon name="calendar" size="sm" />
                Schedule Consultation
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

function DesktopFamiliesPage() {
  return (
    <div className="hidden md:block">
      <HeroBanner
        images={{
          desktop: familiesImages.familiesHeroBanner,
          mobile: familiesImages.familiesHeroBannerMobile,
        }}
        alt="Ava's Hub families hero banner"
        showCtas={false}
      />

      <section className={`bg-white ${pageSectionPad}`} aria-labelledby="family-support-heading">
        <SectionContainer>
          <SectionHeadingDecorated
            id="family-support-heading"
            title="How We Support Your Family"
            className="mb-8 sm:mb-10"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {supportCards.map((card) => (
              <article
                key={card.title}
                className="flex h-full flex-col items-center rounded-3xl bg-white px-5 py-7 text-center shadow-card ring-1 ring-brand-teal/10"
              >
                <span
                  className={`inline-flex h-16 w-16 items-center justify-center rounded-full shadow-sm ${toneStyles[card.tone].icon}`}
                >
                  <Icon name={card.icon} size="lg" />
                </span>
                <h2 className={`mt-5 text-lg font-bold leading-tight ${toneStyles[card.tone].text}`}>
                  {card.title}
                </h2>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-brand-navy/80">
                  {card.description}
                </p>
              </article>
            ))}
          </div>
        </SectionContainer>
      </section>

      <section
        className={`bg-gradient-to-b from-brand-lavender/20 to-white ${pageSectionPad}`}
        aria-labelledby="journey-heading"
      >
        <SectionContainer>
          <div className={cardShell}>
            <div className={`${cardInnerPad} lg:px-10`}>
              <div className={innerContentWrap}>
                <SectionHeadingDecorated
                  id="journey-heading"
                  title="We're Here for Every Step of the Journey"
                  className="mb-8"
                />
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
                  {journeySteps.map((step) => (
                    <article
                      key={step.title}
                      className="rounded-3xl bg-white px-5 py-6 text-center ring-1 ring-brand-teal/10"
                    >
                      <span
                        className={`mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full ${toneStyles[step.tone].icon}`}
                      >
                        <Icon name={step.icon} size="lg" />
                      </span>
                      <h3 className={`mt-4 text-base font-bold leading-tight ${toneStyles[step.tone].text}`}>
                        {step.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-brand-navy/80">
                        {step.description}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </SectionContainer>
      </section>

      <section className={pageSectionPad} aria-labelledby="family-cards-heading">
        <SectionContainer>
          <h2 id="family-cards-heading" className="sr-only">
            Family support resources
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {familyCards.map((card) => (
              <article
                key={card.title}
                className={`flex h-full flex-col rounded-3xl px-6 py-7 shadow-card ring-1 ring-brand-teal/10 ${toneStyles[card.tone].soft}`}
              >
                <div className="flex items-start gap-4">
                  <span
                    className={`inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${toneStyles[card.tone].icon}`}
                  >
                    <Icon name={card.icon} size="lg" />
                  </span>
                  <div>
                    <h2 className={`text-xl font-bold leading-tight ${toneStyles[card.tone].text}`}>
                      {card.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-brand-navy/85">
                      {card.text}
                    </p>
                  </div>
                </div>
                {card.bullets ? (
                  <div className="mt-6">
                    <CheckList items={card.bullets} />
                  </div>
                ) : null}
                {card.highlight ? (
                  <div className="mt-8 flex items-center gap-4 rounded-2xl bg-white/75 px-5 py-4 ring-1 ring-brand-teal/10">
                    <Icon name="heart" className="text-brand-teal" size="2x" />
                    <p className="text-base font-bold leading-relaxed text-brand-teal">
                      {card.highlight}
                    </p>
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </SectionContainer>
      </section>

      <section className="pb-6 sm:pb-8 lg:pb-10" aria-label="Family partnership message">
        <SectionContainer>
          <div className="rounded-3xl bg-gradient-to-r from-brand-purple-deep to-brand-purple-bright px-6 py-6 text-center text-white shadow-card sm:px-8 lg:px-12">
            <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-4 sm:flex-row">
              <Icon name="heart" className="text-brand-gold" size="2x" />
              <p className="text-base font-bold leading-relaxed sm:text-lg">
                We&apos;re more than a therapy center; we&apos;re a partner in your
                family&apos;s journey. Together, we build skills. Together, we build
                independence. Together, we build futures.
              </p>
            </div>
          </div>
        </SectionContainer>
      </section>

      <section className={`bg-white ${pageSectionPad}`} aria-label="Family contact actions">
        <SectionContainer>
          <div className="overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-brand-teal/10">
            <div className="grid gap-0 sm:grid-cols-2 lg:grid-cols-5">
              {actionItems.map((item, index) => (
                <div
                  key={item.title}
                  className={
                    `flex gap-4 px-5 py-6 text-left sm:flex-col sm:items-center sm:text-center lg:min-h-36 lg:justify-center ` +
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

export default function FamiliesPage() {
  return (
    <main className="flex-1 bg-[#fffaf4] md:bg-white">
      <h1 className="sr-only">Ava&apos;s Hub For Families</h1>
      <MobileFamiliesPage />
      <DesktopFamiliesPage />
    </main>
  );
}
