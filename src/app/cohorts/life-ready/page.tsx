import type { Metadata } from "next";
import { CTAButton } from "@/components/CTAButton";
import { Icon } from "@/components/Icon";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { SectionContainer } from "@/components/SectionContainer";
import { TiltedHeartOutline } from "@/components/page/ResourceMobileComponents";
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

type CardTone = "teal" | "purple" | "gold";

const whyCards: {
  icon: IconName;
  tone: CardTone;
  title: string;
  description: string;
  iconStyle: string;
}[] = [
  {
    icon: "brain",
    tone: "teal",
    title: "Real OT for Real Life",
    description:
      "Life Ready Cohorts are not just classes or activities. They are occupational therapy small group experiences designed to help teens practice the skills they need at home, in school, in the community, and beyond.",
    iconStyle: "bg-brand-teal-light text-brand-teal",
  },
  {
    icon: "family",
    tone: "purple",
    title: "Small Groups",
    description:
      "Cohorts are intentionally limited to 4–6 teens so each participant receives support, coaching, and opportunities to practice at their own pace.",
    iconStyle: "bg-brand-lavender text-brand-purple-bright",
  },
  {
    icon: "heart",
    tone: "gold",
    title: "Meaningful Carryover",
    description:
      "The goal is not just progress during the session. The goal is carryover into everyday life: smoother mornings, more participation at home, greater confidence, stronger routines, and growing independence.",
    iconStyle: "bg-brand-gold/25 text-brand-navy",
  },
  {
    icon: "shieldHeart",
    tone: "purple",
    title: "Built for How Teens Learn",
    description:
      "Life Ready Cohorts are especially designed for teens with ADHD, autism, anxiety, learning differences, and other support needs who benefit from hands-on learning, structure, repetition, modeling, and encouragement.",
    iconStyle: "bg-brand-lavender text-brand-purple-bright",
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

const pricingOptions = [
  "$625 per 6-week cohort",
  "Pay directly, no authorization delays",
  "Superbill provided for out-of-network reimbursement",
  "Reserve your spot the same day you sign up",
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
            Occupational Therapy Small Group Experiences
          </p>
          <p className="mt-3 text-base font-extrabold leading-tight text-brand-navy">
            Preparing Today&apos;s Teens for Tomorrow&apos;s Independence.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-brand-navy/80">
            As children grow older, parents begin asking different questions:
          </p>
          <ul className="mt-2 space-y-1.5">
            {[
              "Will they remember to shower?",
              "Can they prepare their own meals?",
              "Will they help around the house?",
              "Will they be ready for adulthood?",
            ].map((q) => (
              <li key={q} className="flex items-start gap-2 text-sm leading-relaxed text-brand-navy/80">
                <Icon name="arrowRight" className="mt-0.5 shrink-0 text-brand-purple-bright" size="sm" />
                <span>{q}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm leading-relaxed text-brand-navy/85">
            Life Ready Cohorts provide occupational therapy through meaningful
            real-life experiences that teach teens the everyday skills they need
            for greater independence at home, school, work, and in the community.
          </p>

          <div className="mt-6 rounded-[1.5rem] bg-white/90 p-4 shadow-sm ring-1 ring-brand-teal/10">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-gold/25 text-brand-purple-bright">
                <Icon name="shieldHeart" size="sm" />
              </span>
              <div>
                <p className="text-xs leading-relaxed text-brand-navy/80">
                  Life Ready Cohorts are $625 for a full 6-week cohort. Six 90-minute, OT-led group sessions building real independence skills.
                </p>
                <div className="mt-2 flex w-fit items-center gap-2 rounded-full bg-brand-gold/20 px-3 py-1.5 ring-1 ring-brand-gold/30">
                  <span className="text-xs font-extrabold text-brand-navy">$625</span>
                  <span className="text-[11px] tracking-wider text-brand-navy/65">· 6-Week Cohort</span>
                </div>
              </div>
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
          What Teens Practice
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

      {/* 3 — Why Families Choose Life Ready Cohorts */}
      <section className="px-6 pb-10">
        <h2 className="font-serif text-[1.9rem] font-semibold leading-tight text-brand-navy">
          Why Families Choose Life Ready Cohorts
          <span className="ml-2 text-brand-purple-bright/55">
            <TiltedHeartOutline />
          </span>
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-brand-navy/70">
          Real occupational therapy. Real skills. Real life.
        </p>
        <div className="mt-5 space-y-5">
          {whyCards.map((card) => (
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
              <p className="mt-3 text-sm leading-relaxed text-brand-navy/80">
                {card.description}
              </p>
            </article>
          ))}
        </div>
        <div className="mt-5 rounded-[1.75rem] bg-white/90 p-5 shadow-card ring-1 ring-brand-purple-deep/10">
          <h3 className="text-base font-extrabold leading-tight text-brand-navy">
            You do not have to teach every life skill alone.
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-brand-navy/80">
            At Ava&apos;s Hub, we help teens build independence through supportive,
            hands-on occupational therapy experiences that meet them where they are
            and help them grow from there.
          </p>
          <p className="mt-3 text-sm font-semibold leading-relaxed text-brand-purple-bright">
            Because independence is not automatic. It is taught. It is practiced.
            It is built over time.
          </p>
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
                Private Pay Program
              </p>
              <h3 className="mt-1 text-xl font-extrabold leading-tight text-brand-navy">
                Enrollment &amp; Pricing
              </h3>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-brand-navy/75">
            Life Ready Cohorts are $625 for a full 6-week cohort. Six 90-minute,
            OT-led group sessions building real independence skills.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-brand-navy/75">
            This is a private pay program, so there&apos;s no wait for insurance
            approval. You reserve your teen&apos;s spot and start right away. We
            provide a detailed superbill after enrollment so families can submit to
            their insurance for possible out-of-network reimbursement.
          </p>
          <ul className="mt-5 grid gap-3">
            {pricingOptions.map((option, i) => (
              <li
                key={option}
                className={`flex items-center gap-3 rounded-full px-4 py-3 text-sm font-bold text-brand-navy ring-1 ${
                  i === 0
                    ? "bg-brand-gold/20 ring-brand-gold/30"
                    : "bg-brand-teal-light/45 ring-brand-teal/10"
                }`}
              >
                <Icon
                  name="circleCheck"
                  className={"text-brand-teal"}
                  size="sm"
                />
                <span>{option}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-brand-navy/55">
            Reimbursement varies by plan. We&apos;re happy to answer questions about
            the superbill process after you enroll.
          </p>
        </div>
      </section>

      {/* 6 — Bottom CTA */}
      <section className="px-6 pb-14">
        <div className="overflow-hidden rounded-[1.75rem] bg-brand-lavender/45 shadow-card ring-1 ring-brand-purple-deep/10">
          <div className="relative min-h-48 bg-brand-teal-light">
            <PlaceholderImage
              src={cohortsImages.lifeReadyOverview}
              alt="Life Ready Cohorts at Ava's Hub"
              fill
              className="object-cover object-[50%_32%]"
              sizes="100vw"
            />
          </div>
          <div className="flex flex-col items-center p-6 text-center">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white text-brand-purple-bright shadow-sm">
              <Icon name="heart" size="lg" />
            </span>
            <h2 className="mt-4 text-xl font-extrabold text-brand-navy">
              Cohorts Are Filling Up.
            </h2>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-brand-navy/75">
              Spots are limited to 4–6 teens per cohort. Many fill before registration closes.
            </p>
            <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a
                href="tel:+19739055255"
                className="inline-flex items-center gap-2.5 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-brand-navy shadow-sm ring-1 ring-brand-purple-deep/10"
              >
                <Icon name="phone" className="text-brand-purple-bright" size="sm" />
                <span>(973) 905-5255</span>
              </a>
              <a
                href="mailto:hello@avashubnj.com"
                className="inline-flex items-center gap-2.5 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-brand-navy shadow-sm ring-1 ring-brand-purple-deep/10"
              >
                <Icon name="email" className="text-brand-purple-bright" size="sm" />
                <span>hello@avashubnj.com</span>
              </a>
            </div>
            <div className="mt-5 w-full max-w-xs">
              <CTAButton href="/contact" className="w-full">
                Join the Waitlist
              </CTAButton>
            </div>
          </div>
        </div>
      </section>
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
              Occupational Therapy Small Group Experiences
            </p>
            <p className="mt-5 text-xl font-extrabold leading-tight text-brand-navy">
              Preparing Today&apos;s Teens for Tomorrow&apos;s Independence.
            </p>
            <p className="mt-5 text-base leading-relaxed text-brand-navy/80">
              As children grow older, parents begin asking different questions:
            </p>
            <ul className="mt-3 space-y-2">
              {[
                "Will they remember to shower?",
                "Can they prepare their own meals?",
                "Will they help around the house?",
                "Will they be ready for adulthood?",
              ].map((q) => (
                <li key={q} className="flex items-start gap-2.5 text-base leading-relaxed text-brand-navy/80">
                  <Icon name="arrowRight" className="mt-0.5 shrink-0 text-brand-purple-bright" size="sm" />
                  <span>{q}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-brand-navy/82">
              Life Ready Cohorts provide occupational therapy through meaningful
              real-life experiences that teach teens the everyday skills they need
              for greater independence at home, school, work, and in the community.
            </p>

            <div className="mt-7 rounded-[1.65rem] bg-white/90 p-5 shadow-sm ring-1 ring-brand-teal/10">
              <div className="flex items-center gap-4">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-gold/25 text-brand-purple-bright">
                  <Icon name="shieldHeart" size="lg" />
                </span>
                <div>
                  <p className="text-sm leading-relaxed text-brand-navy/80">
                    Life Ready Cohorts are $625 for a full 6-week cohort. Six 90-minute, OT-led group sessions building real independence skills.
                  </p>
                  <div className="mt-2.5 flex w-fit items-center gap-2.5 rounded-full bg-brand-gold/20 px-4 py-1.5 ring-1 ring-brand-gold/30">
                    <span className="text-sm font-extrabold text-brand-navy">$625</span>
                    <span className="text-xs tracking-wider text-brand-navy/65">· 6-Week Cohort</span>
                  </div>
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
              <span>What Teens Practice</span>
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

      {/* 3 — Why Families Choose Life Ready Cohorts */}
      <section className="pb-14">
        <SectionContainer>
          <h2 className="font-serif text-[clamp(2rem,3vw,3rem)] font-semibold leading-tight text-brand-navy">
            Why Families Choose Life Ready Cohorts
            <span className="ml-3 text-brand-purple-bright/55">
              <TiltedHeartOutline />
            </span>
          </h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-brand-navy/70">
            Real occupational therapy. Real skills. Real life.
          </p>
          <div className="mt-8 grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
            {whyCards.map((card) => (
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
                <p className="mt-3 text-sm leading-relaxed text-brand-navy/80">
                  {card.description}
                </p>
              </article>
            ))}
          </div>
          <div className="mt-6 rounded-[1.75rem] bg-white/90 p-7 shadow-card ring-1 ring-brand-purple-deep/10">
            <h3 className="text-xl font-extrabold leading-tight text-brand-navy">
              You do not have to teach every life skill alone.
            </h3>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-brand-navy/80">
              At Ava&apos;s Hub, we help teens build independence through supportive,
              hands-on occupational therapy experiences that meet them where they are
              and help them grow from there.
            </p>
            <p className="mt-4 text-base font-semibold leading-relaxed text-brand-purple-bright">
              Because independence is not automatic. It is taught. It is practiced.
              It is built over time.
            </p>
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
                    Private Pay Program
                  </p>
                  <h2 className="mt-2 text-3xl font-extrabold leading-tight text-brand-navy">
                    Enrollment &amp; Pricing
                  </h2>
                </div>
              </div>
              <p className="mt-5 text-base leading-relaxed text-brand-navy/75">
                Life Ready Cohorts are $625 for a full 6-week cohort. Six 90-minute,
                OT-led group sessions building real independence skills.
              </p>
              <p className="mt-4 text-base leading-relaxed text-brand-navy/75">
                This is a private pay program, so there&apos;s no wait for insurance
                approval. You reserve your teen&apos;s spot and start right away. We
                provide a detailed superbill after enrollment so families can submit to
                their insurance for possible out-of-network reimbursement.
              </p>
              <ul className="mt-6 grid gap-3">
                {pricingOptions.map((option, i) => (
                  <li
                    key={option}
                    className={`flex items-center gap-3 rounded-full px-4 py-3 text-sm font-bold text-brand-navy ring-1 ${
                      i === 0
                        ? "bg-brand-gold/20 ring-brand-gold/30"
                        : "bg-brand-teal-light/45 ring-brand-teal/10"
                    }`}
                  >
                    <Icon
                      name="circleCheck"
                      className={"text-brand-teal"}
                      size="sm"
                    />
                    <span>{option}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-brand-navy/55">
                Reimbursement varies by plan. We&apos;re happy to answer questions
                about the superbill process after you enroll.
              </p>
              <div className="mt-auto pt-6">
                <CTAButton href="/contact" className="w-full !py-3">
                  <span className="inline-flex items-center gap-2">
                    Reserve Your Spot — $625
                    <Icon name="arrowRight" size="sm" />
                  </span>
                </CTAButton>
              </div>
            </div>

          </div>
        </SectionContainer>
      </section>

      {/* 6 — Bottom CTA */}
      <section className="pb-16">
        <SectionContainer>
          <div className="overflow-hidden rounded-[2rem] bg-brand-lavender/45 shadow-card ring-1 ring-brand-purple-deep/10">
            <div className="grid h-full items-stretch xl:grid-cols-[0.38fr_0.62fr]">
              <div className="relative min-h-52 bg-brand-teal-light xl:min-h-[17rem]">
                <PlaceholderImage
                  src={cohortsImages.lifeReadyOverview}
                  alt="Life Ready Cohorts at Ava's Hub"
                  fill
                  className="object-cover object-[50%_32%]"
                  sizes="(min-width: 1280px) 38vw, 100vw"
                />
              </div>
              <div className="flex flex-col justify-center p-8 text-center xl:p-10">
                <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-white text-brand-purple-bright shadow-sm">
                  <Icon name="heart" size="lg" />
                </span>
                <h2 className="mt-4 text-2xl font-extrabold text-brand-navy xl:text-3xl">
                  Cohorts Are Filling Up.
                </h2>
                <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-brand-navy/75 xl:text-base">
                  Spots are limited to 4–6 teens per cohort. Many fill before
                  registration closes. Call or email to secure your teen&apos;s spot.
                </p>
                <div className="mt-5 flex flex-wrap justify-center gap-3">
                  <a
                    href="tel:+19739055255"
                    className="inline-flex items-center gap-2.5 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-brand-navy shadow-sm ring-1 ring-brand-purple-deep/10"
                  >
                    <Icon name="phone" className="text-brand-purple-bright" size="sm" />
                    <span>(973) 905-5255</span>
                  </a>
                  <a
                    href="mailto:hello@avashubnj.com"
                    className="inline-flex items-center gap-2.5 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-brand-navy shadow-sm ring-1 ring-brand-purple-deep/10"
                  >
                    <Icon name="email" className="text-brand-purple-bright" size="sm" />
                    <span>hello@avashubnj.com</span>
                  </a>
                </div>
                <div className="mx-auto mt-6 max-w-xs">
                  <CTAButton href="/contact" className="w-full">
                    Join the Waitlist
                  </CTAButton>
                </div>
              </div>
            </div>
          </div>
        </SectionContainer>
      </section>
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
