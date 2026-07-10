import type { Metadata } from "next";
import { CTAButton } from "@/components/CTAButton";
import { Icon } from "@/components/Icon";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { SectionContainer } from "@/components/SectionContainer";
import { TiltedHeartOutline } from "@/components/page/ResourceMobileComponents";
import { AdventureCohortsCarousel } from "@/components/page/AdventureCohortsCarousel";
import { adventureSessionCards } from "@/data/adventureSessionCards";
import { cohortsImages } from "@/data/pageImages/cohortsImages";
import type { IconName } from "@/data/icons";

export const metadata: Metadata = {
  title: "Adventure Cohorts (Ages 5–11) | Ava's Hub",
  description:
    "Immersive, hands-on OT group experiences for children ages 5–11 in East Orange, NJ. Six adventure-themed cohorts building confidence, friendships, and real-life skills.",
  alternates: { canonical: "/cohorts/adventure" },
  openGraph: {
    url: "/cohorts/adventure",
    title: "Adventure Cohorts (Ages 5–11) | Ava's Hub",
    description:
      "Where play has purpose. OT-led small group adventures for ages 5–11 — building confidence, social skills, and real-world independence.",
  },
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const sessionCards = adventureSessionCards;

const buildSkills: string[] = [
  "Executive Function",
  "Social Skills",
  "Emotional Regulation",
  "Motor Planning",
  "Fine & Gross Motor Skills",
  "Attention & Focus",
  "Self-Confidence",
  "Independence",
];

const parentApproved: string[] = [
  "Small groups (4–6 children)",
  "OT-led and goal-focused",
  "Hands-on, engaging, and fun!",
  "Every child is welcome.",
  "Every child belongs.",
];

const perfectForKids: string[] = [
  "Learn differently",
  "Need support with social skills",
  "Benefit from structure & routine",
  "Love hands-on activities",
  "Need help building confidence",
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
    title: "We Build Skills That Last",
    items: buildSkills,
    iconStyle: "bg-brand-teal-light text-brand-teal",
    listIcon: "circleCheck",
    listIconClass: "text-brand-teal",
  },
  {
    icon: "family",
    tone: "purple",
    title: "Parent Approved. Kid Loved.",
    items: parentApproved,
    iconStyle: "bg-brand-lavender text-brand-purple-bright",
    listIcon: "circleCheck",
    listIconClass: "text-brand-purple-bright",
  },
  {
    icon: "heart",
    tone: "gold",
    title: "Perfect for Kids Who:",
    items: perfectForKids,
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
  { icon: "family", label: "Small Groups", detail: "4–6 children per cohort for personalised support.", tone: "teal" },
  { icon: "calendar", label: "90-Minute Sessions", detail: "Packed with hands-on fun and purposeful learning.", tone: "purple" },
  { icon: "brain", label: "6-Week Cohorts", detail: "A brand-new adventure theme every session block.", tone: "gold" },
  { icon: "home", label: "Indoor & Outdoor", detail: "Designed for growth, movement, and real-world play.", tone: "teal" },
];

const insuranceOptions = [
  "Major Insurance Plans",
  "NJ FamilyCare / Medicaid",
  "Private Pay Options",
  "Superbills Available",
] as const;

const statIconStyles: Record<CardTone, string> = {
  teal: "bg-brand-teal-light text-brand-teal",
  purple: "bg-brand-lavender text-brand-purple-bright",
  gold: "bg-brand-gold/25 text-brand-navy",
};

// ─── Mobile ───────────────────────────────────────────────────────────────────

function MobileAdventurePage() {
  return (
    <div className="bg-[#fffaf4] xl:hidden">
      <h1 className="sr-only">Adventure Cohorts at Ava&apos;s Hub</h1>

      {/* 1 — Hero */}
      <section className="pb-8">
        <div className="mx-auto w-full overflow-hidden rounded-b-[2rem] bg-brand-teal-light shadow-card">
          <PlaceholderImage
            src={cohortsImages.adventureOverview}
            alt="Adventure Cohorts at Ava's Hub — Ages 5–11"
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
              OT Small Group · Ages 5–11
            </p>
            <p className="inline-flex rounded-full bg-brand-teal-light px-3 py-1 text-xs font-extrabold uppercase tracking-normal text-brand-teal">
              Play. Learn. Grow. Belong.
            </p>
          </div>
          <h2 className="mt-5 text-[clamp(2rem,9vw,2.35rem)] font-extrabold leading-[1.05] tracking-tight text-brand-navy">
            Adventure Cohorts
          </h2>
          <p className="mt-2 text-[clamp(0.92rem,4.35vw,1.08rem)] font-extrabold leading-snug text-brand-purple-bright">
            Immersive, Hands-On Adventures Designed by Occupational Therapists
          </p>
          <p className="mt-5 text-base leading-relaxed text-brand-navy/85">
            Building confidence, friendships, and real-life skills — one adventure at
            a time. Each 6-week cohort is a themed mission led by our OT team in small
            groups of 4–6 children.
          </p>

          <div className="mt-6 rounded-[1.5rem] bg-white/90 p-4 shadow-sm ring-1 ring-brand-teal/10">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-gold/25 text-brand-purple-bright">
                <Icon name="heart" size="sm" />
              </span>
              <p className="text-sm font-semibold leading-snug text-brand-navy">
                Inclusive. Accepting. Empowering. Fun!
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <CTAButton href="/contact" className="w-full">
              <span className="inline-flex items-center gap-2">
                Reserve a Spot
                <Icon name="arrowRight" size="sm" />
              </span>
            </CTAButton>
            <CTAButton href="#cohorts-mobile" variant="secondary" className="w-full">
              Explore Cohorts
            </CTAButton>
          </div>
        </div>
      </section>

      {/* 2 — Each 6-Week Cohort */}
      <section id="cohorts-mobile" className="px-6 pb-10">
        <h2 className="font-serif text-[1.85rem] font-semibold leading-tight text-brand-navy">
          Each 6-Week Cohort is a New Adventure!
          <span className="ml-2 text-brand-purple-bright/55">
            <TiltedHeartOutline />
          </span>
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-brand-navy/70">
          Six unique themes. Real skills. Real fun.
        </p>
        <div className="-mx-6 mt-6 overflow-x-auto px-6 pb-2">
          <div className="flex min-w-max snap-x snap-mandatory gap-4">
            {sessionCards.map((card) => (
              <article
                key={card.name}
                className="w-[72vw] max-w-[18rem] snap-start overflow-hidden rounded-[1.75rem] bg-white/90 shadow-card ring-1 ring-brand-teal/10"
              >
                <div className="relative aspect-[3/2] bg-brand-teal-light">
                  <PlaceholderImage
                    src={card.image}
                    alt={`${card.name} cohort at Ava's Hub`}
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
                    {card.skills.map((skill) => (
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

      {/* 3 — Skills / Parent Approved / Perfect for Kids */}
      <section className="px-6 pb-10">
        <h2 className="font-serif text-[1.9rem] font-semibold leading-tight text-brand-navy">
          Built for Every Child
          <span className="ml-2 text-brand-purple-bright/55">
            <TiltedHeartOutline />
          </span>
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-brand-navy/70">
          Skills that last. Families that love it. Kids who belong.
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
                  card.title === "We Build Skills That Last"
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
          Small groups of 4–6 children fill up quickly. Secure your child&apos;s
          spot in the next cohort before it&apos;s gone.
        </p>
        <div className="mt-7">
          <CTAButton
            href="/contact"
            className="!shadow-lg !shadow-brand-purple-bright/30"
          >
            <span className="inline-flex items-center gap-2">
              Reserve a Spot
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
            Every Adventure Cohort includes:
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
      <section className="px-6 pb-14">
        <div className="overflow-hidden rounded-[1.75rem] bg-brand-lavender/45 shadow-card ring-1 ring-brand-purple-deep/10">
          <div className="relative min-h-48 bg-brand-teal-light">
            <PlaceholderImage
              src={cohortsImages.adventureOverview}
              alt="Adventure Cohorts at Ava's Hub"
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
              Spots are limited to 4–6 children per cohort. Many fill before registration closes.
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
                Reserve a Spot
              </CTAButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── Desktop ──────────────────────────────────────────────────────────────────

function DesktopAdventurePage() {
  return (
    <div className="hidden bg-[#fffaf4] xl:block">
      <h1 className="sr-only">Adventure Cohorts at Ava&apos;s Hub</h1>

      {/* 1 — Hero */}
      <section className="py-9 xl:py-12" aria-labelledby="desktop-adventure-heading">
        <SectionContainer className="grid min-h-[74vh] items-center gap-10 xl:grid-cols-[0.43fr_0.57fr] xl:gap-12 2xl:gap-16">
          <div className="rounded-[2.25rem] bg-[#fffaf4]/95 p-8 shadow-card ring-1 ring-brand-purple-deep/10 xl:p-10 2xl:p-12">
            <div className="flex flex-wrap gap-2">
              <p className="inline-flex rounded-full bg-brand-lavender px-4 py-2 text-sm font-extrabold uppercase tracking-normal text-brand-purple-deep">
                OT Small Group Experience · Ages 5–11
              </p>
              <p className="inline-flex rounded-full bg-brand-teal-light px-4 py-2 text-sm font-extrabold uppercase tracking-normal text-brand-teal">
                Play. Learn. Grow. Belong.
              </p>
            </div>
            <h2
              id="desktop-adventure-heading"
              className="mt-6 text-[clamp(3rem,4.7vw,5.6rem)] font-extrabold leading-[0.96] tracking-tight text-brand-navy"
            >
              Adventure Cohorts
            </h2>
            <p className="mt-4 text-[clamp(1.15rem,1.7vw,1.75rem)] font-extrabold leading-tight text-brand-purple-bright">
              Immersive, Hands-On Adventures Designed by Occupational Therapists
            </p>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-brand-navy/82">
              Building confidence, friendships, and real-life skills — one adventure at
              a time. Six themed missions, small groups of 4–6 children, each led by
              our occupational therapy team.
            </p>

            <div className="mt-7 rounded-[1.65rem] bg-white/90 p-5 shadow-sm ring-1 ring-brand-teal/10">
              <div className="flex items-start gap-4">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-gold/25 text-brand-purple-bright">
                  <Icon name="heart" size="lg" />
                </span>
                <div>
                  <h3 className="text-lg font-extrabold leading-tight text-brand-navy">
                    Inclusive. Accepting. Empowering. Fun!
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-navy/75">
                    Every child is welcome. Every child belongs.
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
                  Reserve a Spot
                  <Icon name="arrowRight" size="sm" />
                </span>
              </CTAButton>
              <CTAButton
                href="#cohorts-desktop"
                variant="secondary"
                className="min-w-[13rem]"
              >
                Explore Cohorts
              </CTAButton>
            </div>
          </div>

          <div className="overflow-hidden rounded-[4rem_2rem_4rem_2rem] bg-brand-teal-light shadow-card ring-1 ring-brand-purple-deep/10 xl:rounded-[7rem_3rem_7rem_3rem]">
            <PlaceholderImage
              src={cohortsImages.adventureOverview}
              alt="Adventure Cohorts at Ava's Hub — Ages 5–11"
              width={1122}
              height={1402}
              priority
              className="h-[min(76vh,48rem)] w-full object-cover object-[50%_32%]"
              sizes="(min-width: 1280px) 55vw, 100vw"
            />
          </div>
        </SectionContainer>
      </section>

      {/* 2 — Each 6-Week Cohort (Carousel) */}
      <section id="cohorts-desktop" className="pb-14">
        <SectionContainer>
          <div className="text-center">
            <h2 className="inline-flex items-center gap-2 font-serif text-[clamp(2rem,3vw,3rem)] font-semibold leading-tight text-brand-navy">
              <span>Each 6-Week Cohort is a New Adventure!</span>
              <span className="shrink-0 text-brand-purple-bright/55">
                <TiltedHeartOutline />
              </span>
            </h2>
            <p className="mt-3 text-base leading-relaxed text-brand-navy/70">
              Six unique themes, real skills, and real fun — rotating every session block.
            </p>
          </div>
          <div className="mt-8 px-5">
            <AdventureCohortsCarousel cards={sessionCards} />
          </div>
        </SectionContainer>
      </section>

      {/* 3 — Skills / Parent Approved / Perfect for Kids (3-col, like Our Services) */}
      <section className="pb-14">
        <SectionContainer>
          <h2 className="font-serif text-[clamp(2rem,3vw,3rem)] font-semibold leading-tight text-brand-navy">
            Built for Every Child
            <span className="ml-3 text-brand-purple-bright/55">
              <TiltedHeartOutline />
            </span>
          </h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-brand-navy/70">
            Skills that last. Families that love it. Kids who belong.
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
                    card.title === "We Build Skills That Last"
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

      {/* 4 — Spaces Are Limited! Reserve Now */}
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
              Small groups of 4–6 children fill up quickly. Secure your child&apos;s
              spot in the next Adventure Cohort before it&apos;s gone.
            </p>
            <div className="mt-8">
              <CTAButton
                href="/contact"
                className="!px-10 !py-4 !shadow-xl !shadow-brand-purple-bright/30"
              >
                <span className="inline-flex items-center gap-2 text-base">
                  Reserve a Spot
                  <Icon name="arrowRight" size="sm" />
                </span>
              </CTAButton>
            </div>
          </div>
        </SectionContainer>
      </section>

      {/* 5 — What's Included + Insurance (like Resources & Support for Families) */}
      <section className="pb-14">
        <SectionContainer>
          <div className="grid gap-6 xl:grid-cols-[0.52fr_0.48fr] xl:items-stretch">

            {/* Left — What's Included (like Resources & Support) */}
            <div className="h-full rounded-[1.75rem] bg-white/80 p-7 shadow-card ring-1 ring-brand-teal/10">
              <h2 className="font-serif text-[clamp(1.8rem,2.5vw,2.5rem)] font-semibold leading-tight text-brand-navy">
                What&apos;s Included
                <span className="ml-3 text-brand-purple-bright/55">
                  <TiltedHeartOutline />
                </span>
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-brand-navy/70">
                Every Adventure Cohort comes with everything your child needs to thrive.
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

            {/* Right — Insurance */}
            <div className="h-full flex flex-col rounded-[1.75rem] bg-white/95 p-7 shadow-card ring-1 ring-brand-purple-deep/10">
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
                Adventure Cohorts may be eligible for insurance billing depending on
                your child&apos;s plan and clinical needs. Private pay and superbills
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
      <section className="pb-16">
        <SectionContainer>
          <div className="overflow-hidden rounded-[2rem] bg-brand-lavender/45 shadow-card ring-1 ring-brand-purple-deep/10">
            <div className="grid h-full items-stretch xl:grid-cols-[0.38fr_0.62fr]">
              <div className="relative min-h-52 bg-brand-teal-light xl:min-h-[17rem]">
                <PlaceholderImage
                  src={cohortsImages.adventureOverview}
                  alt="Adventure Cohorts at Ava's Hub"
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
                  Spots are limited to 4–6 children per cohort. Many fill before
                  registration closes. Call or email to reserve your child&apos;s spot.
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
                    Reserve a Spot
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

export default function AdventureCohortsPage() {
  return (
    <main className="flex-1 bg-[#fffaf4]">
      <MobileAdventurePage />
      <DesktopAdventurePage />
    </main>
  );
}
