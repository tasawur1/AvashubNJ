import type { Metadata } from "next";
import { CTAButton } from "@/components/CTAButton";
import { Icon } from "@/components/Icon";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { SectionContainer } from "@/components/SectionContainer";
import {
  ResourceBottomCta,
  TiltedHeartOutline,
} from "@/components/page/ResourceMobileComponents";
import { AdventureCohortsCarousel } from "@/components/page/AdventureCohortsCarousel";
import { lifeReadyCategoryCards } from "@/data/adventureSessionCards";
import { cohortsImages } from "@/data/pageImages/cohortsImages";
import type { IconName } from "@/data/icons";

export const metadata: Metadata = {
  title: "Life Ready Cohorts (Ages 12–17) | Ava's Hub",
  description:
    "Real-life skill cohorts for teens ages 12–17 in East Orange, NJ. OT-led small groups building independence in self-care, home management, kitchen skills, community, and job readiness.",
  alternates: { canonical: "/cohorts/life-ready" },
  openGraph: {
    url: "/cohorts/life-ready",
    title: "Life Ready Cohorts (Ages 12–17) | Ava's Hub",
    description:
      "Real skills. Real life. OT-led small group cohorts for teens ages 12–17 — building independence for home, school, work, and the community.",
  },
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const categoryCards = lifeReadyCategoryCards;

const buildSkills: string[] = [
  "Self-Care & Hygiene",
  "Home Management",
  "Meal Preparation",
  "Money & Budgeting",
  "Community Safety",
  "Job Readiness",
  "Self-Advocacy",
  "Executive Function",
];

const parentApproved: string[] = [
  "Small groups (4–6 teens)",
  "OT-led and goal-focused",
  "Practical and hands-on",
  "Every teen is welcome.",
  "Every teen belongs.",
];

const perfectForTeens: string[] = [
  "Need support with daily routines",
  "Building home independence",
  "Preparing for work and community",
  "Benefit from structure & practice",
  "Working toward greater autonomy",
];

type CardTone = "teal" | "purple" | "gold";

const threeCards: {
  icon: IconName;
  tone: CardTone;
  title: string;
  items: string[];
  iconStyle: string;
  listIcon: IconName;
  listIconClass: string;
}[] = [
  {
    icon: "brain",
    tone: "teal",
    title: "Skills That Transfer to Real Life",
    items: buildSkills,
    iconStyle: "bg-brand-teal-light text-brand-teal",
    listIcon: "circleCheck",
    listIconClass: "text-brand-teal",
  },
  {
    icon: "family",
    tone: "purple",
    title: "Parent Approved. Teen Driven.",
    items: parentApproved,
    iconStyle: "bg-brand-lavender text-brand-purple-bright",
    listIcon: "circleCheck",
    listIconClass: "text-brand-purple-bright",
  },
  {
    icon: "heart",
    tone: "gold",
    title: "Great for Teens Who:",
    items: perfectForTeens,
    iconStyle: "bg-brand-gold/25 text-brand-navy",
    listIcon: "heart",
    listIconClass: "text-brand-purple-bright",
  },
];

const cardBg: Record<CardTone, string> = {
  teal: "bg-brand-teal-light/60 ring-brand-teal/10",
  purple: "bg-brand-lavender/60 ring-brand-purple-deep/10",
  gold: "bg-brand-gold/12 ring-brand-gold/20",
};

const sessionStats: { icon: IconName; label: string; detail: string; tone: CardTone }[] = [
  { icon: "family",   label: "Small Groups",        detail: "4–6 teens per cohort for focused, personalised support.", tone: "teal" },
  { icon: "calendar", label: "90-Minute Sessions",  detail: "Packed with practical skill-building and real-world practice.", tone: "purple" },
  { icon: "brain",    label: "6-Week Cohorts",      detail: "A dedicated skill area explored every session block.", tone: "gold" },
  { icon: "home",     label: "Real-World Practice", detail: "Designed for independence at home, school, work, and community.", tone: "teal" },
];

const insuranceOptions = [
  "Major Insurance Plans",
  "NJ FamilyCare / Medicaid",
  "Private Pay Options",
  "Superbills Available",
] as const;

const statIconStyles: Record<CardTone, string> = {
  teal:   "bg-brand-teal-light text-brand-teal",
  purple: "bg-brand-lavender text-brand-purple-bright",
  gold:   "bg-brand-gold/25 text-brand-navy",
};

// ─── Mobile ───────────────────────────────────────────────────────────────────

function MobileLifeReadyPage() {
  return (
    <div className="bg-[#fffaf4] xl:hidden">
      <h1 className="sr-only">Life Ready Cohorts at Ava&apos;s Hub</h1>

      {/* 1 — Hero */}
      <section className="pb-8">
        <div className="mx-auto w-full overflow-hidden rounded-b-[2rem] bg-brand-teal-light shadow-card">
          <PlaceholderImage
            src={cohortsImages.lifeReadyHeroMobile}
            alt="Life Ready Cohorts at Ava's Hub — Ages 12–17"
            width={1122}
            height={1402}
            priority
            className="block h-auto w-full"
            sizes="100vw"
          />
        </div>

        <div className="relative z-10 mx-6 -mt-12 rounded-[2rem] bg-[#fffaf4]/95 p-6 shadow-card ring-1 ring-brand-purple-deep/10">
          <div className="flex flex-wrap gap-2">
            <p className="inline-flex rounded-full bg-brand-lavender px-3 py-1 text-xs font-extrabold uppercase tracking-normal text-brand-purple-deep">
              OT Small Group · Ages 12–17
            </p>
            <p className="inline-flex rounded-full bg-brand-teal-light px-3 py-1 text-xs font-extrabold uppercase tracking-normal text-brand-teal">
              Real Skills. Real Life.
            </p>
          </div>
          <h2 className="mt-5 text-[clamp(2rem,9vw,2.35rem)] font-extrabold leading-[1.05] tracking-tight text-brand-navy">
            Life Ready Cohorts
          </h2>
          <p className="mt-2 text-[clamp(0.92rem,4.35vw,1.08rem)] font-extrabold leading-snug text-brand-purple-bright">
            Real-Life Skills Designed by Occupational Therapists
          </p>
          <p className="mt-5 text-base leading-relaxed text-brand-navy/85">
            As teens grow, parents begin asking bigger questions about independence.
            Life Ready Cohorts bridge the gap — building the everyday skills teens
            need at home, school, work, and in the community.
          </p>

          <div className="mt-6 rounded-[1.5rem] bg-white/90 p-4 shadow-sm ring-1 ring-brand-teal/10">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-gold/25 text-brand-purple-bright">
                <Icon name="heart" size="sm" />
              </span>
              <p className="text-sm font-semibold leading-snug text-brand-navy">
                Every activity has a purpose. Every session builds skills.
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <CTAButton href="/contact" className="w-full">
              <span className="inline-flex items-center gap-2">
                Join the Waitlist
                <Icon name="arrowRight" size="sm" />
              </span>
            </CTAButton>
            <CTAButton href="#categories-mobile" variant="secondary" className="w-full">
              Explore Categories
            </CTAButton>
          </div>
        </div>
      </section>

      {/* 2 — Life Ready Categories */}
      <section id="categories-mobile" className="px-6 pb-10">
        <h2 className="font-serif text-[1.85rem] font-semibold leading-tight text-brand-navy">
          Five Skill Areas. Real Independence.
          <span className="ml-2 text-brand-purple-bright/55">
            <TiltedHeartOutline />
          </span>
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-brand-navy/70">
          Five purposeful categories, each building a new layer of independence.
        </p>
        <div className="-mx-6 mt-6 overflow-x-auto px-6 pb-2">
          <div className="flex min-w-max snap-x snap-mandatory gap-4">
            {categoryCards.map((card) => (
              <article
                key={card.name}
                className="w-[72vw] max-w-[18rem] snap-start overflow-hidden rounded-[1.75rem] bg-white/90 shadow-card ring-1 ring-brand-teal/10"
              >
                <div className="relative aspect-[3/2] bg-brand-teal-light">
                  <PlaceholderImage
                    src={card.image}
                    alt={`${card.name} — Life Ready Cohorts at Ava's Hub`}
                    fill
                    className="object-cover object-top"
                    sizes="72vw"
                  />
                </div>
                <div className="p-4">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-extrabold ${
                      card.pillColor === "teal"
                        ? "bg-brand-teal-light text-brand-teal"
                        : card.pillColor === "purple"
                          ? "bg-brand-lavender text-brand-purple-bright"
                          : "bg-brand-gold/25 text-brand-navy"
                    }`}
                  >
                    {card.name}
                  </span>
                  <ul className="mt-3 space-y-2">
                    {card.skills.slice(0, 5).map((skill) => (
                      <li
                        key={skill}
                        className="flex items-start gap-2 text-sm leading-relaxed text-brand-navy/80"
                      >
                        <Icon
                          name="circleCheck"
                          className="mt-0.5 shrink-0 text-brand-teal"
                          size="sm"
                        />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3 — Skills / Parent Approved / Great for Teens */}
      <section className="px-6 pb-10">
        <h2 className="font-serif text-[1.9rem] font-semibold leading-tight text-brand-navy">
          Built for Every Teen
          <span className="ml-2 text-brand-purple-bright/55">
            <TiltedHeartOutline />
          </span>
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-brand-navy/70">
          Skills that last. Families that see the difference. Teens who grow.
        </p>
        <div className="mt-5 space-y-5">
          {threeCards.map((card) => (
            <article
              key={card.title}
              className={`rounded-[1.75rem] p-5 shadow-card ring-1 ${cardBg[card.tone]}`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[1rem] shadow-sm ${card.iconStyle}`}
                >
                  <Icon name={card.icon} size="lg" />
                </span>
                <h3 className="text-base font-extrabold leading-tight text-brand-navy">
                  {card.title}
                </h3>
              </div>
              <ul
                className={`mt-4 space-y-2 ${
                  card.title === "Skills That Transfer to Real Life"
                    ? "grid grid-cols-2 gap-x-4 gap-y-2 space-y-0"
                    : ""
                }`}
              >
                {card.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm leading-relaxed text-brand-navy/80"
                  >
                    <Icon
                      name={card.listIcon}
                      className={`mt-0.5 shrink-0 ${card.listIconClass}`}
                      size="sm"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* 4 — Spaces Are Limited */}
      <section className="mx-6 mb-10 overflow-hidden rounded-[2rem] bg-brand-lavender/35 px-6 py-9 text-center shadow-card ring-1 ring-brand-purple-deep/10">
        <p className="inline-flex rounded-full bg-brand-purple-bright px-4 py-1.5 text-xs font-extrabold uppercase tracking-wide text-white">
          Limited Spots Available
        </p>
        <h2 className="mt-5 font-serif text-[clamp(1.8rem,8vw,2.4rem)] font-semibold leading-tight text-brand-navy">
          Spaces Are Limited.{" "}
          <span className="text-brand-purple-bright">Reserve Now.</span>
          <span className="ml-2 text-brand-purple-bright/55">
            <TiltedHeartOutline />
          </span>
        </h2>
        <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-brand-navy/75">
          Small groups of 4–6 teens fill up quickly. Join the waitlist today to
          secure your teen&apos;s spot in the next cohort.
        </p>
        <div className="mt-7">
          <CTAButton href="/contact" className="!shadow-lg !shadow-brand-purple-bright/30">
            <span className="inline-flex items-center gap-2">
              Join the Waitlist
              <Icon name="arrowRight" size="sm" />
            </span>
          </CTAButton>
        </div>
      </section>

      {/* 5 — Session Details + Insurance */}
      <section className="px-6 pb-10">
        <div className="rounded-[1.75rem] bg-white/80 p-5 shadow-card ring-1 ring-brand-teal/10">
          <h3 className="font-serif text-xl font-semibold leading-tight text-brand-navy">
            What&apos;s Included
            <span className="ml-2 text-brand-purple-bright/55">
              <TiltedHeartOutline />
            </span>
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-brand-navy/70">
            Every Life Ready Cohort includes:
          </p>
          <div className="mt-4 space-y-3">
            {sessionStats.map((stat) => (
              <div key={stat.label} className="flex items-start gap-3">
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${statIconStyles[stat.tone]}`}
                >
                  <Icon name={stat.icon} size="sm" />
                </span>
                <div>
                  <p className="text-sm font-extrabold text-brand-navy">{stat.label}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-brand-navy/70">
                    {stat.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 flex h-full flex-col rounded-[1.75rem] bg-white/95 p-5 shadow-card ring-1 ring-brand-purple-deep/10">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-lavender text-brand-purple-bright">
              <Icon name="shieldHeart" size="lg" />
            </span>
            <div>
              <p className="text-xs font-extrabold uppercase tracking-normal text-brand-purple-bright">
                Insurance Based Model
              </p>
              <h3 className="mt-1 text-xl font-extrabold leading-tight text-brand-navy">
                Insurance &amp; Payment
              </h3>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-brand-navy/75">
            Some cohorts may be eligible for insurance billing. Private pay and
            superbills are also available.
          </p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {insuranceOptions.map((option) => (
              <li
                key={option}
                className="flex items-center gap-3 rounded-2xl bg-brand-teal-light/45 px-4 py-3 text-sm font-bold text-brand-navy ring-1 ring-brand-teal/10"
              >
                <Icon name="circleCheck" className="text-brand-teal" size="sm" />
                <span>{option}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-brand-navy/55">
            Coverage varies by plan. Our team can help review options before enrollment.
          </p>
        </div>
      </section>

      {/* 6 — Bottom CTA */}
      <ResourceBottomCta
        title="Their Independence Starts Here."
        text="Call us at (973) 905-5255, email hello@avashubnj.com, or join the waitlist to secure your teen's spot today."
        buttonLabel="Join the Waitlist"
        buttonHref="/contact"
      />
    </div>
  );
}

// ─── Desktop ──────────────────────────────────────────────────────────────────

function DesktopLifeReadyPage() {
  return (
    <div className="hidden bg-[#fffaf4] xl:block">
      <h1 className="sr-only">Life Ready Cohorts at Ava&apos;s Hub</h1>

      {/* 1 — Hero */}
      <section className="py-9 xl:py-12" aria-labelledby="desktop-life-ready-heading">
        <SectionContainer className="grid min-h-[74vh] items-center gap-10 xl:grid-cols-[0.43fr_0.57fr] xl:gap-12 2xl:gap-16">
          <div className="rounded-[2.25rem] bg-[#fffaf4]/95 p-8 shadow-card ring-1 ring-brand-purple-deep/10 xl:p-10 2xl:p-12">
            <div className="flex flex-wrap gap-2">
              <p className="inline-flex rounded-full bg-brand-lavender px-4 py-2 text-sm font-extrabold uppercase tracking-normal text-brand-purple-deep">
                OT Small Group Experience · Ages 12–17
              </p>
              <p className="inline-flex rounded-full bg-brand-teal-light px-4 py-2 text-sm font-extrabold uppercase tracking-normal text-brand-teal">
                Real Skills. Real Life.
              </p>
            </div>
            <h2
              id="desktop-life-ready-heading"
              className="mt-6 text-[clamp(3rem,4.7vw,5.6rem)] font-extrabold leading-[0.96] tracking-tight text-brand-navy"
            >
              Life Ready Cohorts
            </h2>
            <p className="mt-4 text-[clamp(1.15rem,1.7vw,1.75rem)] font-extrabold leading-tight text-brand-purple-bright">
              Real-Life Skills Designed by Occupational Therapists
            </p>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-brand-navy/82">
              As teens grow, parents begin asking bigger questions about independence.
              Life Ready Cohorts bridge the gap — building the everyday skills teens
              need for real life in small groups of 4–6, led by our OT team.
            </p>

            <div className="mt-7 rounded-[1.65rem] bg-white/90 p-5 shadow-sm ring-1 ring-brand-teal/10">
              <div className="flex items-start gap-4">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-gold/25 text-brand-purple-bright">
                  <Icon name="heart" size="lg" />
                </span>
                <div>
                  <h3 className="text-lg font-extrabold leading-tight text-brand-navy">
                    Every activity has a purpose.
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-navy/75">
                    Every session builds skills. Every success carries over into everyday life.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <CTAButton
                href="/contact"
                className="min-w-[13rem] !shadow-lg !shadow-brand-purple-bright/25"
              >
                <span className="inline-flex items-center gap-2">
                  Join the Waitlist
                  <Icon name="arrowRight" size="sm" />
                </span>
              </CTAButton>
              <CTAButton
                href="#categories-desktop"
                variant="secondary"
                className="min-w-[13rem]"
              >
                Explore Categories
              </CTAButton>
            </div>
          </div>

          <div className="overflow-hidden rounded-[4rem_2rem_4rem_2rem] bg-brand-teal-light shadow-card ring-1 ring-brand-purple-deep/10 xl:rounded-[7rem_3rem_7rem_3rem]">
            <PlaceholderImage
              src={cohortsImages.lifeReadyHero}
              alt="Life Ready Cohorts at Ava's Hub — Ages 12–17"
              width={1122}
              height={1402}
              priority
              className="h-[min(76vh,48rem)] w-full object-cover object-[50%_32%]"
              sizes="(min-width: 1280px) 55vw, 100vw"
            />
          </div>
        </SectionContainer>
      </section>

      {/* 2 — Life Ready Categories (Carousel) */}
      <section id="categories-desktop" className="pb-14">
        <SectionContainer>
          <div className="text-center">
            <h2 className="inline-flex items-center gap-2 font-serif text-[clamp(2rem,3vw,3rem)] font-semibold leading-tight text-brand-navy">
              <span>Five Skill Areas. Real Independence.</span>
              <span className="shrink-0 text-brand-purple-bright/55">
                <TiltedHeartOutline />
              </span>
            </h2>
            <p className="mt-3 text-base leading-relaxed text-brand-navy/70">
              Five purposeful categories, each building a new layer of independence.
            </p>
          </div>
          <div className="mt-8 px-5">
            <AdventureCohortsCarousel cards={categoryCards} />
          </div>
        </SectionContainer>
      </section>

      {/* 3 — Skills / Parent Approved / Great for Teens */}
      <section className="pb-14">
        <SectionContainer>
          <h2 className="font-serif text-[clamp(2rem,3vw,3rem)] font-semibold leading-tight text-brand-navy">
            Built for Every Teen
            <span className="ml-3 text-brand-purple-bright/55">
              <TiltedHeartOutline />
            </span>
          </h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-brand-navy/70">
            Skills that last. Families that see the difference. Teens who grow.
          </p>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {threeCards.map((card) => (
              <article
                key={card.title}
                className={`rounded-[1.75rem] p-6 shadow-card ring-1 ${cardBg[card.tone]}`}
              >
                <span
                  className={`flex h-16 w-16 items-center justify-center rounded-[1.2rem] shadow-sm ${card.iconStyle}`}
                >
                  <Icon name={card.icon} size="xl" />
                </span>
                <h3 className="mt-5 text-xl font-extrabold leading-tight text-brand-navy">
                  {card.title}
                </h3>
                <ul
                  className={`mt-5 ${
                    card.title === "Skills That Transfer to Real Life"
                      ? "grid grid-cols-2 gap-x-3 gap-y-2"
                      : "space-y-3"
                  }`}
                >
                  {card.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm leading-relaxed text-brand-navy/80"
                    >
                      <Icon
                        name={card.listIcon}
                        className={`mt-0.5 shrink-0 ${card.listIconClass}`}
                        size="sm"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </SectionContainer>
      </section>

      {/* 4 — Spaces Are Limited */}
      <section className="pb-14">
        <SectionContainer>
          <div className="overflow-hidden rounded-[2.25rem] bg-brand-lavender/35 px-10 py-12 text-center shadow-card ring-1 ring-brand-purple-deep/10 xl:px-16">
            <p className="inline-flex rounded-full bg-brand-purple-bright px-5 py-1.5 text-xs font-extrabold uppercase tracking-wide text-white">
              Limited Spots Available
            </p>
            <h2 className="mt-6 font-serif text-[clamp(2.4rem,4vw,4.5rem)] font-semibold leading-tight text-brand-navy">
              Spaces Are Limited.{" "}
              <span className="text-brand-purple-bright">Reserve Now.</span>
              <span className="ml-3 text-brand-purple-bright/55">
                <TiltedHeartOutline />
              </span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-brand-navy/75">
              Small groups of 4–6 teens fill up quickly. Join the waitlist today
              to secure your teen&apos;s spot in the next Life Ready Cohort.
            </p>
            <div className="mt-8">
              <CTAButton
                href="/contact"
                className="!px-10 !py-4 !shadow-xl !shadow-brand-purple-bright/30"
              >
                <span className="inline-flex items-center gap-2 text-base">
                  Join the Waitlist
                  <Icon name="arrowRight" size="sm" />
                </span>
              </CTAButton>
            </div>
          </div>
        </SectionContainer>
      </section>

      {/* 5 — What's Included + Insurance */}
      <section className="pb-14">
        <SectionContainer>
          <div className="grid gap-6 xl:grid-cols-[0.52fr_0.48fr] xl:items-stretch">

            <div className="h-full rounded-[1.75rem] bg-white/80 p-7 shadow-card ring-1 ring-brand-teal/10">
              <h2 className="font-serif text-[clamp(1.8rem,2.5vw,2.5rem)] font-semibold leading-tight text-brand-navy">
                What&apos;s Included
                <span className="ml-3 text-brand-purple-bright/55">
                  <TiltedHeartOutline />
                </span>
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-brand-navy/70">
                Every Life Ready Cohort comes with everything your teen needs to thrive.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {sessionStats.map((stat) => (
                  <article
                    key={stat.label}
                    className="flex flex-col rounded-[1.5rem] bg-white/90 p-5 shadow-sm ring-1 ring-brand-purple-deep/10"
                  >
                    <span
                      className={`flex h-12 w-12 items-center justify-center rounded-full ${statIconStyles[stat.tone]}`}
                    >
                      <Icon name={stat.icon} size="lg" />
                    </span>
                    <h3 className="mt-4 text-base font-extrabold leading-tight text-brand-navy">
                      {stat.label}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-brand-navy/75">
                      {stat.detail}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <div className="flex h-full flex-col rounded-[1.75rem] bg-white/95 p-7 shadow-card ring-1 ring-brand-purple-deep/10">
              <div className="flex items-start gap-5">
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-brand-lavender text-brand-purple-bright">
                  <Icon name="shieldHeart" size="lg" />
                </span>
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-normal text-brand-purple-bright">
                    Insurance Based Model
                  </p>
                  <h2 className="mt-2 text-3xl font-extrabold leading-tight text-brand-navy">
                    Insurance &amp; Payment Options
                  </h2>
                </div>
              </div>
              <p className="mt-5 max-w-md text-base leading-relaxed text-brand-navy/75">
                We believe meaningful occupational therapy should be accessible. Some
                Life Ready Cohorts may be eligible for insurance billing depending on
                your teen&apos;s plan and clinical needs. Private pay and superbills
                are also available.
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {insuranceOptions.map((option) => (
                  <li
                    key={option}
                    className="flex items-center gap-3 rounded-2xl bg-brand-teal-light/45 px-4 py-3 text-sm font-bold text-brand-navy ring-1 ring-brand-teal/10"
                  >
                    <Icon name="circleCheck" className="text-brand-teal" size="sm" />
                    <span>{option}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-brand-navy/55">
                Coverage varies by plan. Our team can help review options before enrollment.
              </p>
              <div className="mt-auto pt-6">
                <CTAButton href="/contact" variant="secondary" className="w-full !py-3">
                  <span className="inline-flex items-center gap-2">
                    Ask About Coverage
                    <Icon name="arrowRight" size="sm" />
                  </span>
                </CTAButton>
              </div>
            </div>

          </div>
        </SectionContainer>
      </section>

      {/* 6 — Bottom CTA */}
      <ResourceBottomCta
        title="Their Independence Starts Here."
        text="Call us at (973) 905-5255, email hello@avashubnj.com, or join the waitlist to secure your teen's spot today."
        buttonLabel="Join the Waitlist"
        buttonHref="/contact"
      />
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LifeReadyCohortsPage() {
  return (
    <main className="flex-1 bg-[#fffaf4]">
      <MobileLifeReadyPage />
      <DesktopLifeReadyPage />
    </main>
  );
}
