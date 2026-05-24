import type { Metadata } from "next";
import { HeroBanner } from "@/components/HeroBanner";
import { Icon } from "@/components/Icon";
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
  title: "Ava's Hub For Families | Parent Support, Family Guidance & OT-Based Care",
  description:
    "Ava's Hub partners with families through parent education, caregiver support, community connection, therapy strategies, and real-life tools that support children, teens, and young adults.",
  alternates: { canonical: "/families" },
  openGraph: {
    url: "/families",
    title:
      "Ava's Hub For Families | Parent Support, Family Guidance & OT-Based Care",
    description:
      "Parent education, caregiver support, community connection, and OT-based real-life tools for families.",
  },
};

type Tone = "purple" | "teal" | "gold";

type SupportCard = {
  icon: IconName;
  title: string;
  description: string;
  tone: Tone;
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
  },
  teal: {
    icon: "bg-brand-teal text-white",
    text: "text-brand-teal",
    soft: "bg-brand-teal-light/60",
  },
  gold: {
    icon: "bg-brand-gold text-brand-navy",
    text: "text-brand-gold",
    soft: "bg-brand-gold/15",
  },
} satisfies Record<Tone, Record<string, string>>;

const supportCards: SupportCard[] = [
  {
    icon: "family",
    title: "Family-Centered Care",
    tone: "teal",
    description:
      "We listen, collaborate, and create personalized plans that reflect your family's goals and priorities.",
  },
  {
    icon: "bookOpen",
    title: "Education & Empowerment",
    tone: "purple",
    description:
      "We provide the knowledge and strategies you need to support your loved one with confidence.",
  },
  {
    icon: "heart",
    title: "Emotional Support",
    tone: "gold",
    description:
      "We know this journey can be overwhelming. We're here to listen, encourage, and walk with you.",
  },
  {
    icon: "support",
    title: "Community Connection",
    tone: "teal",
    description:
      "We help you connect with resources, local supports, and other families who truly understand.",
  },
  {
    icon: "communication",
    title: "Ongoing Communication",
    tone: "purple",
    description:
      "You'll always know where your loved one stands and what's next because we believe in transparency and teamwork.",
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
    text: "We equip parents and caregivers with practical skills and real-world strategies, including:",
    bullets: [
      "De-escalation Training",
      "Crisis Management",
      "Positive Behavior Support",
      "Communication Strategies",
      "Daily Routines & Life Skills Support",
    ],
  },
  {
    icon: "heart",
    title: "You Deserve Support Too",
    tone: "teal",
    text: "Caring for a loved one is a big job. Let us help with guidance, resources, and a community that has your back.",
    highlight:
      "Take care of you, so you can continue to take care of them.",
  },
  {
    icon: "resources",
    title: "Helpful Resources",
    tone: "gold",
    text: "We connect families with trusted resources including:",
    bullets: [
      "Financial & Insurance Guidance",
      "Special Education Support",
      "Community Services",
      "Respite Care Options",
      "Transition & Future Planning",
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

export default function FamiliesPage() {
  return (
    <main className="flex-1 bg-white">
      <h1 className="sr-only">Ava's Hub For Families</h1>
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
                We're more than a therapy center; we're a partner in your
                family's journey. Together, we build skills. Together, we build
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
    </main>
  );
}
