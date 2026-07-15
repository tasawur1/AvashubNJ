import type { Metadata } from "next";
import { CTAButton } from "@/components/CTAButton";
import { Icon } from "@/components/Icon";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { SectionContainer } from "@/components/SectionContainer";
import { TiltedHeartOutline } from "@/components/page/ResourceMobileComponents";
import { AdventureCohortsCarousel } from "@/components/page/AdventureCohortsCarousel";
import { adventureSessionCards, lifeReadyCategoryCards } from "@/data/adventureSessionCards";
import { cohortsImages } from "@/data/pageImages/cohortsImages";
import type { IconName } from "@/data/icons";

export const metadata: Metadata = {
  title: "Cohort Programs | Ava's Hub",
  description:
    "OT-led small group cohort experiences for children and teens in East Orange, NJ. Adventure Cohorts for ages 5–11 and Life Ready Cohorts for ages 12–17.",
  alternates: { canonical: "/cohorts" },
  openGraph: {
    url: "/cohorts",
    title: "Cohort Programs | Ava's Hub",
    description:
      "Real experiences. Skills that last a lifetime. Adventure and Life Ready Cohorts at Ava's Hub.",
  },
};

// ─── Data ─────────────────────────────────────────────────────────────────────

type Tone = "teal" | "purple" | "gold";

const lookingForCards: { icon: IconName; tone: Tone; title: string; body: string }[] = [
  {
    icon: "confidence",
    tone: "teal",
    title: "Build Confidence",
    body: "Gain real self-belief through meaningful accomplishments, peer support, and challenges they can actually handle.",
  },
  {
    icon: "family",
    tone: "purple",
    title: "Make Real Friendships",
    body: "Connect with peers who understand them and share experiences that create lasting bonds.",
  },
  {
    icon: "independence",
    tone: "gold",
    title: "Grow Independence",
    body: "Learn everyday life skills that carry over to home, school, and community.",
  },
  {
    icon: "brain",
    tone: "teal",
    title: "Generalize OT Skills",
    body: "Turn therapy goals into daily routines and real-world capabilities that stick.",
  },
];

const whyCards: { icon: IconName; title: string; body: string; tone: Tone }[] = [
  {
    icon: "shieldHeart",
    title: "Occupational Therapy That Looks Like Real Life",
    body: "Children and teens practice meaningful occupations: cooking, shopping, cleaning, organizing, problem-solving, and working together, in ways that make sense for real life.",
    tone: "purple",
  },
  {
    icon: "family",
    title: "Small Groups",
    body: "Cohorts are intentionally limited to 4–6 participants so each child receives more support, more participation, and more opportunities for success.",
    tone: "teal",
  },
  {
    icon: "confidence",
    title: "Skills That Carry Over",
    body: "Our goal is meaningful change at home, school, and throughout everyday life. Not just progress during therapy. Families see the difference where it matters most.",
    tone: "gold",
  },
  {
    icon: "heart",
    title: "Every Child Belongs",
    body: "Every cohort is welcoming, strengths-based, and flexible. The program is designed around your child, not the other way around.",
    tone: "purple",
  },
];

const pricingOptions = [
  "$625 per 6-week cohort",
  "Pay directly, no authorization delays",
  "Superbill provided for out-of-network reimbursement",
  "Reserve your spot the same day you sign up",
] as const;

// ─── Styles ───────────────────────────────────────────────────────────────────

const toneIcon: Record<Tone, string> = {
  teal: "bg-brand-teal-light text-brand-teal",
  purple: "bg-brand-lavender text-brand-purple-bright",
  gold: "bg-brand-gold/25 text-brand-navy",
};

const toneCard: Record<Tone, string> = {
  teal: "bg-brand-teal-light/60 ring-brand-teal/10",
  purple: "bg-brand-lavender/60 ring-brand-purple-deep/10",
  gold: "bg-brand-gold/12 ring-brand-gold/20",
};

const TAGLINE = "Every activity has a purpose. Every session builds skills. Every success carries over into everyday life.";

// ─── Mobile ───────────────────────────────────────────────────────────────────

function MobileCohortsPage() {
  return (
    <div className="bg-[#fffaf4] xl:hidden">
      <h1 className="sr-only">Cohort Programs at Ava&apos;s Hub</h1>

      {/* 1 — Hero */}
      <section className="pb-8">
        <div className="mx-auto w-full overflow-hidden rounded-b-[2rem] bg-brand-teal-light shadow-card">
          <PlaceholderImage
            src={cohortsImages.heroMobile}
            alt="Ava's Hub Cohort Programs"
            width={1182}
            height={1331}
            priority
            className="block h-auto w-full"
            sizes="100vw"
          />
        </div>

        <div className="relative z-10 mx-6 -mt-12 rounded-[2rem] bg-[#fffaf4]/95 p-6 shadow-card ring-1 ring-brand-purple-deep/10">
          <p className="inline-flex rounded-full bg-brand-lavender px-3 py-1 text-xs font-extrabold uppercase tracking-normal text-brand-purple-deep">
            OT Small Group Experiences
          </p>
          <h2 className="mt-5 text-[clamp(2rem,9vw,2.35rem)] font-extrabold leading-[1.05] tracking-tight text-brand-navy">
            Cohort Programs
          </h2>
          <p className="mt-3 text-[clamp(0.92rem,4.35vw,1.08rem)] font-extrabold leading-snug text-brand-purple-bright">
            More Than Therapy. Real Experiences. Skills That Last a Lifetime.
          </p>
          <p className="mt-5 text-sm leading-relaxed text-brand-navy/85">
            Children learn best when therapy feels meaningful. At Ava&apos;s Hub, our
            OT-led cohorts transform real-world occupations into exciting small group
            experiences that build confidence, friendships, independence, and everyday
            life skills that carry over to home, school, and beyond.
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
            <CTAButton href="#cohort-types-mobile" className="w-full">
              <span className="inline-flex items-center gap-2">
                Explore Cohorts
                <Icon name="arrowRight" size="sm" />
              </span>
            </CTAButton>
            <CTAButton href="/contact" variant="secondary" className="w-full">
              Join the Waitlist
            </CTAButton>
          </div>
        </div>
      </section>

      {/* 2 — Find the Right Cohort */}
      <section id="cohort-types-mobile" className="px-6 pb-10">
        <h2 className="font-serif text-[1.85rem] font-semibold leading-tight text-brand-navy">
          Find the Right Cohort for Your Child
          <span className="ml-2 text-brand-purple-bright/55">
            <TiltedHeartOutline />
          </span>
        </h2>

        <div className="mt-6 space-y-6">
          {/* Adventure card */}
          <article className="overflow-hidden rounded-[1.75rem] bg-white/90 shadow-card ring-1 ring-brand-teal/10">
            <div className="relative aspect-square bg-brand-teal-light">
              <PlaceholderImage
                src={cohortsImages.adventureOverview}
                alt="Adventure Cohorts at Ava's Hub"
                fill
                className="object-cover object-center"
                sizes="100vw"
              />
            </div>
            <div className="p-5">
              <p className="text-xs font-bold uppercase tracking-normal text-brand-purple-bright">
                Ages 5–11
              </p>
              <h3 className="mt-1 text-xl font-extrabold leading-tight text-brand-navy">
                Adventure Cohorts
              </h3>
              <p className="mt-3 text-sm font-extrabold leading-snug text-brand-teal">
                Where Play Has Purpose.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-brand-navy/80">
                Every six weeks becomes a brand-new adventure. Children become
                explorers, chefs, gardeners, pet care helpers, market shoppers, and
                community heroes while building the occupational therapy skills needed
                for everyday success.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-brand-navy/80">
                Through immersive real-world missions, children naturally develop
                confidence, friendships, executive function, fine and gross motor
                skills, emotional regulation, communication, and independence.
              </p>
              <p className="mt-3 text-xs font-semibold italic text-brand-navy/70">
                The adventure keeps them engaged. The occupational therapy creates
                lasting growth.
              </p>
              <CTAButton href="/cohorts/adventure" className="mt-5 w-full !py-2.5 !shadow-md !shadow-brand-purple-bright/30">
                <span className="inline-flex items-center gap-2">
                  Explore Adventure Cohorts
                  <Icon name="arrowRight" size="sm" />
                </span>
              </CTAButton>
            </div>
          </article>

          {/* Life Ready card */}
          <article className="overflow-hidden rounded-[1.75rem] bg-white/90 shadow-card ring-1 ring-brand-teal/10">
            <div className="relative aspect-square bg-brand-teal-light">
              <PlaceholderImage
                src={cohortsImages.lifeReadyOverview}
                alt="Life Ready Cohorts at Ava's Hub"
                fill
                className="object-cover object-center"
                sizes="100vw"
              />
            </div>
            <div className="p-5">
              <p className="text-xs font-bold uppercase tracking-normal text-brand-purple-bright">
                Ages 12–17
              </p>
              <h3 className="mt-1 text-xl font-extrabold leading-tight text-brand-navy">
                Life Ready Cohorts
              </h3>
              <p className="mt-3 text-sm font-extrabold leading-snug text-brand-teal">
                Preparing Today&apos;s Teens for Tomorrow&apos;s Independence.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-brand-navy/80">
                As children grow older, parents begin asking different questions.
              </p>
              <ul className="mt-3 space-y-1.5">
                {[
                  "Will they remember to shower?",
                  "Can they prepare their own meals?",
                  "Will they help around the house?",
                  "Will they be ready for adulthood?",
                ].map((q) => (
                  <li key={q} className="flex items-start gap-2 text-sm italic text-brand-navy/75">
                    <Icon name="heart" className="mt-0.5 shrink-0 text-brand-purple-bright" size="sm" />
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm leading-relaxed text-brand-navy/80">
                Life Ready Cohorts provide occupational therapy through meaningful
                real-life experiences that teach teens the everyday skills they need
                for greater independence at home, school, work, and in the community.
              </p>
              <p className="mt-3 text-xs font-semibold italic text-brand-navy/70">
                {TAGLINE}
              </p>
              <CTAButton href="/cohorts/life-ready" className="mt-5 w-full !py-2.5 !shadow-md !shadow-brand-purple-bright/30">
                <span className="inline-flex items-center gap-2">
                  Explore Life Ready Cohorts
                  <Icon name="arrowRight" size="sm" />
                </span>
              </CTAButton>
            </div>
          </article>
        </div>
      </section>

      {/* 3 — Is This What You're Looking For? */}
      <section className="px-6 pb-10">
        <p className="inline-flex rounded-full bg-brand-lavender px-3 py-1 text-xs font-extrabold uppercase tracking-normal text-brand-purple-bright">
          For Families Just Like Yours
        </p>
        <h2 className="mt-4 font-serif text-[1.85rem] font-semibold leading-tight text-brand-navy">
          Is This What You&apos;re Looking For?
          <span className="ml-2 text-brand-purple-bright/55">
            <TiltedHeartOutline />
          </span>
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-brand-navy/70">
          Find the right fit for your family.
        </p>
        <div className="mt-5 space-y-4">
          {lookingForCards.map((card) => (
            <article
              key={card.title}
              className={`grid grid-cols-[6.25rem_1fr] items-center gap-4 rounded-3xl p-5 shadow-card ring-1 ${toneCard[card.tone]}`}
            >
              <span
                className={`flex h-24 w-24 items-center justify-center rounded-[1.4rem] shadow-sm ${toneIcon[card.tone]}`}
              >
                <Icon name={card.icon} size="2x" />
              </span>
              <div className="min-w-0">
                <h3 className="text-[1.05rem] font-extrabold leading-tight text-brand-navy">
                  {card.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-brand-navy/75">
                  {card.body}
                </p>
              </div>
            </article>
          ))}
        </div>
        <a
          href="/contact"
          className="mt-5 flex items-center justify-center gap-3 text-sm font-semibold text-brand-navy underline underline-offset-4"
        >
          Not sure where to start? We&apos;re here to help.
          <Icon name="arrowRight" size="sm" />
        </a>
      </section>

      {/* 4 — Adventure Cohorts Deep Dive */}
      <section className="pb-10">
        <div className="px-6">
          <p className="inline-flex rounded-full bg-brand-teal-light px-3 py-1 text-xs font-extrabold uppercase tracking-normal text-brand-teal">
            Ages 5–11
          </p>
          <h2 className="mt-4 font-serif text-[1.85rem] font-semibold leading-tight text-brand-navy">
            Adventure Cohorts: 6 Themed Missions
            <span className="ml-2 text-brand-purple-bright/55">
              <TiltedHeartOutline />
            </span>
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-brand-navy/70">
            Six unique themes, real OT skills, and real fun. Rotating every six-week session block.
          </p>
        </div>
        <div className="mt-6 px-6 sm:px-8">
          <AdventureCohortsCarousel cards={adventureSessionCards} />
        </div>
      </section>

      {/* 5 — Life Ready Deep Dive */}
      <section className="pb-10">
        <div className="px-6">
          <p className="inline-flex rounded-full bg-brand-lavender px-3 py-1 text-xs font-extrabold uppercase tracking-normal text-brand-purple-bright">
            Ages 12–17
          </p>
          <h2 className="mt-4 font-serif text-[1.85rem] font-semibold leading-tight text-brand-navy">
            Life Ready Cohorts: What We Build Together
            <span className="ml-2 text-brand-purple-bright/55">
              <TiltedHeartOutline />
            </span>
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-brand-navy/70">
            Five skill areas preparing teens for real independence at home, in the community, and beyond.
          </p>
        </div>
        <div className="mt-6 px-6 sm:px-8">
          <AdventureCohortsCarousel cards={lifeReadyCategoryCards} />
        </div>
      </section>

      {/* 6 — Why Families Choose */}
      <section className="px-6 pb-10">
        <div className="rounded-[1.75rem] bg-white/80 p-5 shadow-card ring-1 ring-brand-teal/10">
          <h2 className="font-serif text-[1.85rem] font-semibold leading-tight text-brand-navy">
            Why Families Choose Ava&apos;s Hub Cohorts
            <span className="ml-2 text-brand-purple-bright/55">
              <TiltedHeartOutline />
            </span>
          </h2>
          <p className="mt-2 text-xs leading-relaxed text-brand-navy/70">
            Purpose-built experiences that make a real difference.
          </p>
          <div className="mt-4 space-y-3">
            {whyCards.map((card) => (
              <div key={card.title} className="flex items-start gap-3">
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${toneIcon[card.tone]}`}
                >
                  <Icon name={card.icon} size="sm" />
                </span>
                <div>
                  <p className="text-sm font-extrabold text-brand-navy">{card.title}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-brand-navy/70">{card.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7 — Enrollment & Pricing */}
      <section className="px-6 pb-10">
        <div className="flex h-full flex-col rounded-[1.75rem] bg-white/95 p-5 shadow-card ring-1 ring-brand-purple-deep/10">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-lavender text-brand-purple-bright">
              <Icon name="shieldHeart" size="lg" />
            </span>
            <div>
              <p className="text-xs font-extrabold uppercase tracking-normal text-brand-purple-bright">
                Private Pay Program
              </p>
              <h2 className="mt-1 text-xl font-extrabold leading-tight text-brand-navy">
                Enrollment &amp; Pricing
              </h2>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-brand-navy/75">
            Both Adventure and Life Ready Cohorts are $625 for a full 6-week cohort.
            Six 90-minute, OT-led small group sessions. No insurance approval needed.
            Reserve your child&apos;s spot and start right away. We provide a superbill
            after enrollment for possible out-of-network reimbursement.
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

      {/* 9 — Final CTA */}
      <section className="mx-6 mb-8 overflow-hidden rounded-[2rem] bg-brand-lavender/35 px-6 py-9 text-center shadow-card ring-1 ring-brand-purple-deep/10">
        <p className="inline-flex rounded-full bg-brand-purple-bright px-4 py-1.5 text-xs font-extrabold uppercase tracking-wide text-white">
          Limited Spots Available
        </p>
        <h2 className="mt-5 font-serif text-[clamp(1.8rem,8vw,2.4rem)] font-semibold leading-tight text-brand-navy">
          Their Future Starts With{" "}
          <span className="text-brand-purple-bright">Today&apos;s Opportunities.</span>
          <span className="ml-2 text-brand-purple-bright/55">
            <TiltedHeartOutline />
          </span>
        </h2>
        <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-brand-navy/75">
          Every child deserves experiences that prepare them for life. Cohorts fill
          quickly. Join the waitlist to secure your spot.
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

      {/* 8 — Urgency Banner (footer) */}
      <section className="px-6 pb-14">
        <div className="overflow-hidden rounded-[1.75rem] bg-brand-lavender/45 shadow-card ring-1 ring-brand-purple-deep/10">
          <div className="relative min-h-48 bg-brand-teal-light">
            <PlaceholderImage
              src={cohortsImages.hero}
              alt="Cohort programs at Ava's Hub"
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
              Cohorts Fill Quickly.
            </h2>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-brand-navy/75">
              Cohorts are intentionally limited to 4–6 participants. Many fill before
              registration closes. Join the waitlist today to receive priority
              enrollment.
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

function DesktopCohortsPage() {
  return (
    <div className="hidden bg-[#fffaf4] xl:block">
      <h1 className="sr-only">Cohort Programs at Ava&apos;s Hub</h1>

      {/* 1 — Hero */}
      <section className="py-9 xl:py-12" aria-labelledby="desktop-cohorts-hero-heading">
        <SectionContainer className="grid min-h-[74vh] items-center gap-10 xl:grid-cols-[0.46fr_0.54fr] xl:gap-12 2xl:gap-16">
          <div className="rounded-[2.25rem] bg-[#fffaf4]/95 p-8 shadow-card ring-1 ring-brand-purple-deep/10 xl:p-10 2xl:p-12">
            <p className="inline-flex rounded-full bg-brand-lavender px-4 py-2 text-sm font-extrabold uppercase tracking-normal text-brand-purple-bright">
              OT Small Group Experiences
            </p>
            <h2
              id="desktop-cohorts-hero-heading"
              className="mt-5 text-[clamp(2.8rem,4.3vw,5.2rem)] font-extrabold leading-[0.96] tracking-tight text-brand-navy"
            >
              Cohort Programs
            </h2>
            <p className="mt-4 text-[clamp(1.15rem,1.7vw,1.75rem)] font-extrabold leading-tight text-brand-purple-bright">
              More Than Therapy. Real Experiences. Skills That Last a Lifetime.
            </p>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-brand-navy/82">
              Children learn best when therapy feels meaningful. At Ava&apos;s Hub, our
              OT-led cohorts transform real-world occupations into exciting small group
              experiences that build confidence, friendships, independence, and everyday
              life skills that carry over to home, school, and beyond.
            </p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-brand-navy/75">
              Whether your child is learning through adventure or preparing for
              adulthood, every cohort is intentionally designed to help them succeed
              where it matters most.
            </p>

            <div className="mt-7 rounded-[1.65rem] bg-white/90 p-5 shadow-sm ring-1 ring-brand-teal/10">
              <div className="flex items-start gap-4">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-gold/25 text-brand-purple-bright">
                  <Icon name="heart" size="lg" />
                </span>
                <div>
                  <h3 className="text-base font-extrabold leading-tight text-brand-navy">
                    Every activity has a purpose.
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-navy/75">
                    Every session builds skills. Every success carries over into everyday life.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <CTAButton href="#cohort-types-desktop" className="min-w-[12rem]">
                Explore Cohorts
              </CTAButton>
              <CTAButton href="/contact" variant="secondary" className="min-w-[13rem]">
                Join the Waitlist
              </CTAButton>
            </div>
          </div>

          <div className="overflow-hidden rounded-[4rem_2rem_4rem_2rem] bg-brand-teal-light shadow-card ring-1 ring-brand-purple-deep/10 xl:rounded-[7rem_3rem_7rem_3rem]">
            <PlaceholderImage
              src={cohortsImages.hero}
              alt="Ava's Hub Cohort Programs"
              width={1182}
              height={1331}
              priority
              className="h-[min(76vh,48rem)] w-full object-cover object-[50%_32%]"
              sizes="(min-width: 1280px) 54vw, 100vw"
            />
          </div>
        </SectionContainer>
      </section>

      {/* 2 — Find the Right Cohort */}
      <section id="cohort-types-desktop" className="pb-14">
        <SectionContainer>
          <h2 className="font-serif text-[clamp(2rem,3vw,3rem)] font-semibold leading-tight text-brand-navy">
            Find the Right Cohort for Your Child
            <span className="ml-3 text-brand-purple-bright/55">
              <TiltedHeartOutline />
            </span>
          </h2>

          <div className="mt-8 grid gap-7">
            {/* Adventure Cohorts — image left */}
            <article className="flex min-h-[26rem] overflow-hidden rounded-3xl bg-white/90 shadow-card ring-1 ring-brand-teal/10">
              <div className="relative w-[42%] shrink-0 self-stretch bg-brand-teal-light">
                <PlaceholderImage
                  src={cohortsImages.adventureOverview}
                  alt="Adventure Cohorts at Ava's Hub"
                  fill
                  className="object-cover object-center"
                  sizes="42vw"
                />
              </div>
              <div className="flex flex-1 flex-col justify-center p-10 xl:p-12">
                <p className="text-sm font-bold text-brand-purple-bright">Ages 5–11</p>
                <h3 className="mt-1 text-[clamp(1.8rem,2.4vw,2.6rem)] font-extrabold leading-tight text-brand-navy">
                  Adventure Cohorts
                </h3>
                <p className="mt-3 text-base font-extrabold text-brand-teal">Where Play Has Purpose.</p>
                <p className="mt-2 text-sm leading-relaxed text-brand-navy/75">
                  Every six weeks becomes a brand-new adventure. Children become
                  explorers, chefs, gardeners, pet care helpers, market shoppers, and
                  community heroes while building the occupational therapy skills needed
                  for everyday success.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-brand-navy/75">
                  Through immersive real-world missions, children naturally develop
                  confidence, friendships, executive function, fine and gross motor
                  skills, emotional regulation, communication, and independence.
                </p>
                <p className="mt-3 text-sm font-semibold italic text-brand-navy/65">
                  The adventure keeps them engaged. The occupational therapy creates
                  lasting growth.
                </p>
                <div className="mt-7">
                  <CTAButton href="/cohorts/adventure" className="!px-8 !py-3 !shadow-lg !shadow-brand-purple-bright/25">
                    <span className="inline-flex items-center gap-2">
                      Explore Adventure Cohorts
                      <Icon name="arrowRight" size="sm" />
                    </span>
                  </CTAButton>
                </div>
              </div>
            </article>

            {/* Life Ready — image right */}
            <article className="flex min-h-[26rem] overflow-hidden rounded-3xl bg-white/90 shadow-card ring-1 ring-brand-teal/10">
              <div className="flex flex-1 flex-col justify-center p-10 xl:p-12">
                <p className="text-sm font-bold text-brand-purple-bright">Ages 12–17</p>
                <h3 className="mt-1 text-[clamp(1.8rem,2.4vw,2.6rem)] font-extrabold leading-tight text-brand-navy">
                  Life Ready Cohorts
                </h3>
                <p className="mt-3 text-base font-extrabold text-brand-teal">
                  Preparing Today&apos;s Teens for Tomorrow&apos;s Independence.
                </p>
                <p className="mt-2 text-sm leading-relaxed text-brand-navy/75">
                  As children grow older, parents begin asking different questions.
                </p>
                <ul className="mt-3 space-y-1.5">
                  {[
                    "Will they remember to shower?",
                    "Can they prepare their own meals?",
                    "Will they help around the house?",
                    "Will they be ready for adulthood?",
                  ].map((q) => (
                    <li key={q} className="flex items-center gap-2 text-sm italic text-brand-navy/70">
                      <Icon name="heart" className="shrink-0 text-brand-purple-bright/60" size="sm" />
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm leading-relaxed text-brand-navy/75">
                  Life Ready Cohorts provide occupational therapy through meaningful
                  real-life experiences that teach teens the everyday skills they need
                  for greater independence at home, school, work, and in the community.
                </p>
                <p className="mt-3 text-sm font-semibold italic text-brand-navy/65">
                  {TAGLINE}
                </p>
                <div className="mt-7">
                  <CTAButton href="/cohorts/life-ready" className="!px-8 !py-3 !shadow-lg !shadow-brand-purple-bright/25">
                    <span className="inline-flex items-center gap-2">
                      Explore Life Ready Cohorts
                      <Icon name="arrowRight" size="sm" />
                    </span>
                  </CTAButton>
                </div>
              </div>
              <div className="relative w-[42%] shrink-0 self-stretch bg-brand-teal-light">
                <PlaceholderImage
                  src={cohortsImages.lifeReadyOverview}
                  alt="Life Ready Cohorts at Ava's Hub"
                  fill
                  className="object-cover object-center"
                  sizes="42vw"
                />
              </div>
            </article>
          </div>
        </SectionContainer>
      </section>

      {/* 3 — Is This What You're Looking For? */}
      <section className="pb-14">
        <SectionContainer>
          <p className="inline-flex rounded-full bg-brand-lavender px-4 py-1.5 text-sm font-extrabold uppercase tracking-normal text-brand-purple-bright">
            For Families Just Like Yours
          </p>
          <div className="mt-4">
            <h2 className="inline-flex items-center gap-2 font-serif text-[clamp(2rem,3vw,3rem)] font-semibold leading-tight text-brand-navy">
              <span>Is This What You&apos;re Looking For?</span>
              <span className="shrink-0 text-brand-purple-bright/55">
                <TiltedHeartOutline />
              </span>
            </h2>
          </div>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-brand-navy/70">
            Find the right fit for your family.
          </p>
          <div className="mt-8 grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
            {lookingForCards.map((card) => (
              <article
                key={card.title}
                className={`rounded-[1.75rem] p-6 shadow-card ring-1 ${toneCard[card.tone]}`}
              >
                <span
                  className={`flex h-16 w-16 items-center justify-center rounded-[1.2rem] shadow-sm ${toneIcon[card.tone]}`}
                >
                  <Icon name={card.icon} size="xl" />
                </span>
                <h3 className="mt-5 text-lg font-extrabold leading-tight text-brand-navy">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-brand-navy/75">
                  {card.body}
                </p>
              </article>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <CTAButton href="/contact" className="!shadow-lg !shadow-brand-purple-bright/25">
              Join the Waitlist
            </CTAButton>
            <CTAButton href="#cohort-types-desktop" variant="secondary">
              Explore Cohorts
            </CTAButton>
          </div>
        </SectionContainer>
      </section>

      {/* 4 — Adventure Cohorts Deep Dive */}
      <section className="pb-14">
        <SectionContainer>
          <div className="text-center">
            <p className="inline-flex rounded-full bg-brand-teal-light px-4 py-1.5 text-sm font-extrabold uppercase tracking-normal text-brand-teal">
              Ages 5–11
            </p>
            <h2 className="mt-4 font-serif text-[clamp(2rem,3vw,3rem)] font-semibold leading-tight text-brand-navy">
              Adventure Cohorts: 6 Themed Missions
              <span className="ml-3 text-brand-purple-bright/55">
                <TiltedHeartOutline />
              </span>
            </h2>
            <p className="mt-3 text-base leading-relaxed text-brand-navy/70">
              Six unique themes, real OT skills, and real fun. Rotating every six-week session block.
            </p>
          </div>
          <div className="mt-8 px-5">
            <AdventureCohortsCarousel cards={adventureSessionCards} />
          </div>
        </SectionContainer>
      </section>

      {/* 5 — Life Ready Cohorts Deep Dive */}
      <section className="pb-14">
        <SectionContainer>
          <div className="text-center">
            <p className="inline-flex rounded-full bg-brand-lavender px-4 py-1.5 text-sm font-extrabold uppercase tracking-normal text-brand-purple-bright">
              Ages 12–17
            </p>
            <h2 className="mt-4 font-serif text-[clamp(2rem,3vw,3rem)] font-semibold leading-tight text-brand-navy">
              Life Ready Cohorts: What We Build Together
              <span className="ml-3 text-brand-purple-bright/55">
                <TiltedHeartOutline />
              </span>
            </h2>
            <p className="mt-3 text-base leading-relaxed text-brand-navy/70">
              Five skill areas preparing teens for real independence at home, in the community, and beyond.
            </p>
          </div>
          <div className="mt-8 px-5">
            <AdventureCohortsCarousel cards={lifeReadyCategoryCards} />
          </div>
        </SectionContainer>
      </section>

      {/* 6+7 — Why Families + Insurance (split) */}
      <section className="pb-14">
        <SectionContainer>
          <div className="grid gap-6 xl:grid-cols-[0.52fr_0.48fr] xl:items-stretch">

            {/* Left — Why Families Choose */}
            <div className="h-full rounded-[1.75rem] bg-white/80 p-7 shadow-card ring-1 ring-brand-teal/10">
              <h2 className="font-serif text-[clamp(1.8rem,2.5vw,2.5rem)] font-semibold leading-tight text-brand-navy">
                Why Families Choose Ava&apos;s Hub Cohorts
                <span className="ml-3 text-brand-purple-bright/55">
                  <TiltedHeartOutline />
                </span>
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-brand-navy/70">
                Purpose-built experiences that make a real difference.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {whyCards.map((card) => (
                  <article
                    key={card.title}
                    className="flex flex-col rounded-[1.5rem] bg-white/90 p-5 shadow-sm ring-1 ring-brand-purple-deep/10"
                  >
                    <span
                      className={`flex h-12 w-12 items-center justify-center rounded-full ${toneIcon[card.tone]}`}
                    >
                      <Icon name={card.icon} size="lg" />
                    </span>
                    <h3 className="mt-4 text-base font-extrabold leading-tight text-brand-navy">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-brand-navy/75">{card.body}</p>
                  </article>
                ))}
              </div>
            </div>

            {/* Right — Enrollment & Pricing */}
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
              <p className="mt-5 max-w-md text-base leading-relaxed text-brand-navy/75">
                Both Adventure and Life Ready Cohorts are $625 for a full 6-week cohort.
                Six 90-minute, OT-led small group sessions. No insurance approval needed.
                Reserve your child&apos;s spot and start right away. We provide a superbill
                after enrollment for possible out-of-network reimbursement.
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
                Reimbursement varies by plan. We&apos;re happy to answer questions about
                the superbill process after you enroll.
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

      {/* 9 — Final CTA */}
      <section className="pb-14">
        <SectionContainer>
          <div className="overflow-hidden rounded-[2.25rem] bg-brand-lavender/35 px-10 py-12 text-center shadow-card ring-1 ring-brand-purple-deep/10 xl:px-16">
            <p className="inline-flex rounded-full bg-brand-purple-bright px-5 py-1.5 text-xs font-extrabold uppercase tracking-wide text-white">
              Limited Spots Available
            </p>
            <h2 className="mt-6 font-serif text-[clamp(2.4rem,4vw,4.5rem)] font-semibold leading-tight text-brand-navy">
              Their Future Starts With{" "}
              <span className="text-brand-purple-bright">Today&apos;s Opportunities.</span>
              <span className="ml-3 text-brand-purple-bright/55">
                <TiltedHeartOutline />
              </span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-brand-navy/75">
              Every child deserves experiences that prepare them for life. Cohorts fill
              quickly. Join the waitlist to secure your spot.
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

      {/* 8 — Urgency Banner (footer) */}
      <section className="pb-16">
        <SectionContainer>
          <div className="overflow-hidden rounded-[2rem] bg-brand-lavender/45 shadow-card ring-1 ring-brand-purple-deep/10">
            <div className="grid h-full items-stretch xl:grid-cols-[0.38fr_0.62fr]">
              <div className="relative min-h-52 bg-brand-teal-light xl:min-h-[17rem]">
                <PlaceholderImage
                  src={cohortsImages.hero}
                  alt="Cohort programs at Ava's Hub"
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
                  Cohorts are intentionally limited to 4–6 participants. Many fill before
                  registration closes. Join the waitlist today to receive priority enrollment.
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

export default function CohortsPage() {
  return (
    <main className="flex-1 bg-[#fffaf4]">
      <MobileCohortsPage />
      <DesktopCohortsPage />
    </main>
  );
}
