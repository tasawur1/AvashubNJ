import type { Metadata } from "next";
import { CTAButton } from "@/components/CTAButton";
import { HeroBanner } from "@/components/HeroBanner";
import { Icon } from "@/components/Icon";
import { SectionContainer } from "@/components/SectionContainer";
import { SectionHeadingDecorated } from "@/components/SectionHeadingDecorated";
import type { IconName } from "@/data/icons";
import { programsImages } from "@/data/pageImages/programsImages";
import {
  cardInnerPad,
  cardShell,
  cardShellSoft,
  innerContentWrap,
  pageSectionPad,
} from "@/lib/pageSectionStyles";

export const metadata: Metadata = {
  title: "Ava's Hub Programs | OT-Based Life Skills, Parent Coaching & Support",
  description:
    "Explore Ava's Hub programs including OT-based parent coaching, life skills support, family strategies, private pay sessions, and real-life tools for children, teens, young adults, and families.",
  alternates: { canonical: "/programs" },
  openGraph: {
    url: "/programs",
    title: "Ava's Hub Programs | OT-Based Life Skills, Parent Coaching & Support",
    description:
      "OT-based parent coaching, family strategies, life skills support, and private pay sessions for children, teens, young adults, and families.",
  },
};

type Tone = "purple" | "teal" | "gold";

type SupportCard = {
  icon: IconName;
  title: string;
  eyebrow: string;
  bullets: string[];
  tagline: string;
  tone: Tone;
};

type PricingCard = {
  icon: IconName;
  title: string;
  price: string;
  meta: string;
  description: string;
  tone: Tone;
};

type FeatureItem = {
  icon: IconName;
  title: string;
  description: string;
  tone: Tone;
};

const toneStyles = {
  purple: {
    icon: "bg-brand-purple-deep text-white",
    text: "text-brand-purple-deep",
    pill: "bg-brand-purple-deep text-white",
  },
  teal: {
    icon: "bg-brand-teal text-white",
    text: "text-brand-teal",
    pill: "bg-brand-teal text-white",
  },
  gold: {
    icon: "bg-brand-gold text-brand-navy",
    text: "text-brand-gold",
    pill: "bg-brand-gold text-brand-navy",
  },
} satisfies Record<Tone, Record<string, string>>;

const supportCards: SupportCard[] = [
  {
    icon: "community",
    title: "Individual Parent Coaching",
    eyebrow: "(OT-Based)",
    tone: "purple",
    bullets: [
      "Coping strategies & emotional regulation",
      "Executive functioning support",
      "Burnout prevention & stress management",
      "Building routines & systems that work for your family",
    ],
    tagline: "Focus on YOU and your well-being.",
  },
  {
    icon: "family",
    title: "Parent + Child Coaching",
    eyebrow: "(OT-Based)",
    tone: "teal",
    bullets: [
      "Play skills you can do together",
      "Co-regulation & connection strategies",
      "Real-time coaching during interactions",
      "Strengthen communication & engagement",
      "Make everyday moments meaningful",
    ],
    tagline: "Better connection. Better outcomes.",
  },
  {
    icon: "heart",
    title: "Parent Partnership Sessions",
    eyebrow: "(OT-Based)",
    tone: "gold",
    bullets: [
      "Work as a team & stay aligned",
      "Division of responsibilities & consistent routines",
      "Support each other in caregiving roles",
      "Reduce overwhelm & build a stronger partnership",
    ],
    tagline: "Stronger parents. Stronger families.",
  },
];

const pricingCards: PricingCard[] = [
  {
    icon: "community",
    title: "Individual Parent Coaching",
    price: "$85 - $125",
    meta: "per session (45-60 min)",
    tone: "purple",
    description:
      "Personalized OT-based coaching focused on your goals, routines, and daily life strategies.",
  },
  {
    icon: "family",
    title: "Parent + Child Coaching",
    price: "$95 - $135",
    meta: "per session (45-60 min)",
    tone: "teal",
    description:
      "Hands-on strategies and play skills to build connection and support your child's growth.",
  },
  {
    icon: "heart",
    title: "Parent Partnership Sessions",
    price: "$100 - $150",
    meta: "per session (45-60 min)",
    tone: "gold",
    description:
      "OT-based sessions to help parents work together, reduce stress, and create consistency at home.",
  },
  {
    icon: "confidence",
    title: "Parent Reset Package (4 Sessions)",
    price: "$320 - $450",
    meta: "package",
    tone: "purple",
    description:
      "Save when you invest in a series of sessions tailored to your family's needs.",
  },
];

const benefits = [
  "Reduce stress and overwhelm",
  "Build confidence in your parenting",
  "Improve routines and daily flow",
  "Strengthen family relationships",
  "Prevent burnout and feel supported",
  "Create a happier, more connected home",
];

const featureItems: FeatureItem[] = [
  {
    icon: "family",
    title: "OT-Based Coaching",
    description: "Practical. Effective. Evidence-informed.",
    tone: "purple",
  },
  {
    icon: "shieldHeart",
    title: "Parent Focused",
    description: "Support for YOU, so your child can thrive.",
    tone: "teal",
  },
  {
    icon: "home",
    title: "Real-Life Strategies",
    description: "Tools you can use every day.",
    tone: "gold",
  },
  {
    icon: "heart",
    title: "Stronger Families",
    description: "Better connection. Better outcomes.",
    tone: "purple",
  },
  {
    icon: "confidence",
    title: "Made With Love",
    description: "For families in our community.",
    tone: "gold",
  },
];

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3 text-left">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-relaxed text-brand-navy/85">
          <Icon name="check" className="mt-1 text-brand-teal" size="sm" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function ProgramsPage() {
  return (
    <main className="flex-1 bg-white">
      <h1 className="sr-only">Ava's Hub Programs</h1>
      <HeroBanner
        images={{
          desktop: programsImages.programsHeroBanner,
          mobile: programsImages.programsHeroBannerMobile,
        }}
        alt="Ava's Hub programs hero banner"
        showCtas={false}
      />

      <section className={`bg-white ${pageSectionPad}`} aria-labelledby="support-heading">
        <SectionContainer>
          <SectionHeadingDecorated
            id="support-heading"
            title="How We Support You"
            className="mb-8 sm:mb-10"
          />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {supportCards.map((card) => (
              <article
                key={card.title}
                className="flex h-full flex-col rounded-3xl bg-white px-6 py-7 text-center shadow-card ring-1 ring-brand-teal/10"
              >
                <span
                  className={`mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full shadow-sm ${toneStyles[card.tone].icon}`}
                >
                  <Icon name={card.icon} size="lg" />
                </span>
                <h2 className={`mt-5 text-lg font-bold leading-snug ${toneStyles[card.tone].text}`}>
                  {card.title}
                  <span className="block text-base">{card.eyebrow}</span>
                </h2>
                <div className="mt-6 flex-1">
                  <CheckList items={card.bullets} />
                </div>
                <p
                  className={`mt-7 rounded-full px-4 py-2 text-sm font-bold ${toneStyles[card.tone].pill}`}
                >
                  {card.tagline}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-8 rounded-3xl bg-brand-lavender/60 px-6 py-5 ring-1 ring-brand-purple-deep/10 sm:px-8">
            <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-purple-deep text-white">
                <Icon name="shieldHeart" size="lg" />
              </span>
              <p className="text-sm leading-relaxed text-brand-navy/85 sm:text-base">
                This is not therapy or couples counseling. Our sessions are OT-based
                and focus on practical strategies, daily life skills, and building
                strong, healthy family systems.
              </p>
            </div>
          </div>
        </SectionContainer>
      </section>

      <section
        className={`bg-gradient-to-b from-brand-lavender/20 to-white ${pageSectionPad}`}
        aria-labelledby="pricing-heading"
      >
        <SectionContainer>
          <div className={cardShell}>
            <div className={`${cardInnerPad} lg:px-10`}>
              <div className={innerContentWrap}>
                <SectionHeadingDecorated
                  id="pricing-heading"
                  title="Our Sessions & Pricing (Private Pay)"
                  subtitle="Invest in yourself, your child, and your family."
                  className="mb-8"
                />

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {pricingCards.map((card) => (
                    <article
                      key={card.title}
                      className="flex h-full flex-col rounded-3xl bg-white px-5 py-6 text-center shadow-sm ring-1 ring-brand-teal/10"
                    >
                      <span
                        className={`mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full ${toneStyles[card.tone].icon}`}
                      >
                        <Icon name={card.icon} size="lg" />
                      </span>
                      <h3 className={`mt-4 text-base font-bold leading-snug ${toneStyles[card.tone].text}`}>
                        {card.title}
                      </h3>
                      <p className="mt-5 text-3xl font-extrabold leading-none text-brand-navy">
                        {card.price}
                      </p>
                      <p className="mt-2 text-sm font-semibold text-brand-navy/80">
                        {card.meta}
                      </p>
                      <p className="mt-5 flex-1 text-sm leading-relaxed text-brand-navy/80">
                        {card.description}
                      </p>
                    </article>
                  ))}
                </div>

                <div className="mt-7 rounded-2xl bg-brand-gold/15 px-5 py-4 ring-1 ring-brand-gold/30">
                  <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-center sm:text-left">
                    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-gold text-brand-navy">
                      <Icon name="circleCheck" size="sm" />
                    </span>
                    <p className="text-sm font-semibold leading-relaxed text-brand-navy/85">
                      Payment is due at time of service for private pay sessions.
                      Package options and monthly programs may be available.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SectionContainer>
      </section>

      <section className={pageSectionPad} aria-labelledby="benefits-heading">
        <SectionContainer>
          <div className="grid gap-6 lg:grid-cols-[1.35fr_0.9fr]">
            <div className={`${cardShellSoft} p-6 sm:p-7 lg:p-8`}>
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-purple-deep text-white">
                  <Icon name="heart" size="lg" />
                </span>
                <div className="min-w-0">
                  <h2 id="benefits-heading" className="text-2xl font-bold text-brand-purple-deep">
                    Benefits for Parents
                  </h2>
                  <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                    {benefits.map((benefit) => (
                      <li
                        key={benefit}
                        className="flex gap-3 text-sm leading-relaxed text-brand-navy/85"
                      >
                        <Icon name="check" className="mt-1 text-brand-teal" size="sm" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <aside className={`${cardShell} p-6 sm:p-7 lg:p-8`}>
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-teal text-white">
                <Icon name="calendar" size="lg" />
              </span>
              <h2 className="mt-5 text-2xl font-bold text-brand-purple-deep">
                Ready to Get Started?
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-brand-navy/85 sm:text-base">
                You deserve support, tools, and a community that understands.
                Let's build a plan that works for you and your family.
              </p>
              <CTAButton href="/contact" className="mt-6 w-full sm:w-auto">
                Request a Session
              </CTAButton>
            </aside>
          </div>
        </SectionContainer>
      </section>

      <section className={`bg-white ${pageSectionPad}`} aria-label="Program features">
        <SectionContainer>
          <div className="overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-brand-teal/10">
            <div className="grid gap-0 sm:grid-cols-2 lg:grid-cols-5">
              {featureItems.map((item, index) => (
                <div
                  key={item.title}
                  className={
                    `flex gap-4 px-5 py-6 text-left sm:flex-col sm:items-center sm:text-center lg:min-h-40 lg:justify-center ` +
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
