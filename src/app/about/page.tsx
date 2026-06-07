import type { Metadata } from "next";
import { CTAButton } from "@/components/CTAButton";
import { Icon } from "@/components/Icon";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { SectionContainer } from "@/components/SectionContainer";
import { siteImages } from "@/data/images";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Ava's Hub — our mission, approach, and commitment to real-life skills, social participation, and independence for children, teens, and young adults in East Orange, NJ.",
  alternates: { canonical: "/about" },
  openGraph: {
    url: "/about",
    title: "About Us | Ava's Hub",
    description:
      "Discover how Ava's Hub helps neurodiverse youth build confidence, independence, and meaningful connections through real-life skill development.",
  },
};

const ABOUT_HERO_ALT =
  "Ava's Hub About Us — occupational therapy-based life skills and independence";

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

const beliefCards = [
  {
    icon: "home",
    title: "Real Life Skills",
    text: "Practice that carries into mornings, school, friendships, and home.",
  },
  {
    icon: "heart",
    title: "Relationships First",
    text: "Children grow when they feel safe, known, and connected.",
  },
  {
    icon: "community",
    title: "Community Matters",
    text: "Families deserve support that feels bigger than one appointment.",
  },
  {
    icon: "family",
    title: "Family Centered",
    text: "We support the whole system around each child.",
  },
  {
    icon: "confidence",
    title: "Confidence Before Perfection",
    text: "Progress should feel encouraging, human, and possible.",
  },
] as const;

const approachCards = [
  {
    icon: "heart",
    title: "Relationship Based",
    text: "Trust comes first, because connection opens the door to learning.",
  },
  {
    icon: "shieldHeart",
    title: "Evidence Based",
    text: "Care is grounded in OT knowledge and thoughtful clinical reasoning.",
  },
  {
    icon: "lifeSkills",
    title: "Real Life Practice",
    text: "We build skills inside the routines families actually live every day.",
  },
  {
    icon: "support",
    title: "Family Collaboration",
    text: "Parents are partners, not bystanders, in every step forward.",
  },
  {
    icon: "community",
    title: "Community Integration",
    text: "Growth continues beyond the therapy room into real spaces and people.",
  },
] as const;

const serveCards = [
  {
    image: siteImages.kidsProgram,
    title: "Children",
    text: "Warm support for confidence, play, sensory needs, and early independence.",
  },
  {
    image: siteImages.schoolAgeProgram,
    title: "Teens",
    text: "Real-world skill building for school, friendships, routines, and self-advocacy.",
  },
  {
    image: siteImages.youngAdultsProgram,
    title: "Young Adults",
    text: "Independence, community participation, work readiness, and daily life confidence.",
  },
  {
    image: siteImages.afterSchoolOne,
    title: "Families",
    text: "Tools, encouragement, and community for parents who need support too.",
  },
] as const;

const differenceCards = [
  ["Worksheets", "Real Life Practice"],
  ["Waiting Rooms", "Community"],
  ["Clinical Only", "Whole Family Support"],
] as const;

function MobileAboutHero() {
  return (
    <section className="px-6 pb-8 pt-5">
      <div className="rounded-[2rem] bg-[#fffaf4]">
        <div className="mx-auto w-full overflow-hidden rounded-[2rem] bg-brand-teal-light shadow-card">
          <PlaceholderImage
            src={siteImages.aboutMobileHero}
            alt={ABOUT_HERO_ALT}
            width={1023}
            height={1537}
            priority
            className="block h-auto w-full"
            sizes="100vw"
          />
        </div>

        <div className="mt-7">
          <p className="inline-flex rounded-full bg-brand-lavender px-3 py-1 text-xs font-extrabold uppercase tracking-normal text-brand-purple-deep">
            More Than a Therapy Center
          </p>
          <h2 className="mt-5 text-[clamp(2rem,9vw,2.35rem)] font-extrabold leading-[1.05] tracking-tight text-brand-navy">
            We Built Ava&apos;s Hub Because{" "}
            <span className="italic text-brand-purple-bright">
              Families Deserve More
              <span className="ml-3 text-brand-purple-bright/55">
                <TiltedHeartOutline />
              </span>
            </span>
          </h2>
          <p className="mt-5 text-lg font-extrabold leading-snug text-brand-purple-bright">
            You deserve support, connection, and a place where your child can
            truly belong.
          </p>
          <p className="mt-5 text-base leading-relaxed text-brand-navy/85">
            Too many families leave traditional therapy feeling alone, rushed,
            and unsure how to carry progress into real life. Ava&apos;s Hub was
            created for something warmer: practical support, relationship-based
            care, and a community that understands the whole journey.
          </p>
        </div>

        <div className="mt-6 flex gap-4 rounded-3xl bg-white/90 p-5 shadow-card ring-1 ring-brand-purple-deep/10">
          <Icon name="heart" className="mt-1 text-brand-purple-bright" size="lg" />
          <p className="text-base font-extrabold leading-relaxed text-brand-navy">
            Because therapy should feel human.
          </p>
        </div>

        <div className="mt-6 space-y-3">
          <CTAButton href="/contact" className="w-full">
            <span className="inline-flex items-center gap-2">
              <Icon name="calendar" size="sm" />
              Schedule Consultation
            </span>
          </CTAButton>
          <CTAButton href="#about-story-mobile" variant="secondary" className="w-full">
            <span className="inline-flex items-center gap-2">
              <Icon name="resources" size="sm" />
              See Our Story
            </span>
          </CTAButton>
        </div>
      </div>
    </section>
  );
}

function FinalMobileCta() {
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

function MobileAboutPage() {
  return (
    <div className="lg:hidden">
      <MobileAboutHero />

      <section id="about-story-mobile" className="px-6 pb-10">
        <div className="rounded-[1.75rem] bg-gradient-to-br from-[#0f5758] to-[#063f46] p-7 text-white shadow-card">
          <div className="relative mb-6 h-56 overflow-hidden rounded-[1.5rem] bg-brand-teal-light">
            <PlaceholderImage
              src={siteImages.aboutMobileBuiltFromRealLife}
              alt="Ava's Hub family support story"
              fill
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>
          <p className="text-xs font-extrabold uppercase tracking-normal text-brand-gold">
            Why Ava&apos;s Hub Exists
          </p>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight">
            Built From Real Life
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/90">
            Ava&apos;s Hub grew from both a parent&apos;s heart and an OT
            perspective. We saw the gaps: families needing more guidance,
            children needing practice beyond worksheets, and parents needing a
            community instead of isolation.
          </p>
        </div>
      </section>

      <section className="pb-10">
        <div className="px-6">
          <h2 className="text-3xl font-extrabold leading-tight text-brand-navy">
            What We Believe
          </h2>
          <p className="mt-3 text-base leading-relaxed text-brand-navy/75">
            Calm, practical care that helps families feel seen.
          </p>
        </div>
        <div className="mt-6 overflow-x-auto px-6 pb-2">
          <div className="flex min-w-max gap-4">
            {beliefCards.map((card) => (
              <article
                key={card.title}
                className="w-64 rounded-[1.75rem] bg-white/90 p-6 shadow-card ring-1 ring-brand-purple-deep/10"
              >
                <Icon name={card.icon} className="text-brand-purple-bright" size="2x" />
                <h3 className="mt-5 text-xl font-extrabold text-brand-navy">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-brand-navy/75">
                  {card.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-10">
        <div className="overflow-hidden rounded-[1.75rem] bg-brand-lavender/70 shadow-card ring-1 ring-brand-purple-deep/10">
          <div className="relative h-72 bg-brand-teal-light">
            <PlaceholderImage
              src={siteImages.aboutMobileFounderStory}
              alt="Founder story at Ava's Hub"
              fill
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>
          <div className="p-6">
            <p className="text-xs font-extrabold uppercase tracking-normal text-brand-purple-deep">
              Meet the Heart Behind Ava&apos;s Hub
            </p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight text-brand-navy">
              Founder Story
            </h2>
            <p className="mt-5 text-base leading-relaxed text-brand-navy/85">
              Ava&apos;s Hub was shaped by someone who understands the special
              needs journey from the inside: the burnout, the confusing systems,
              the long waits, and the ache of wanting more for your child.
            </p>
            <p className="mt-4 text-lg font-extrabold text-brand-purple-bright">
              You&apos;re not alone.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 pb-10">
        <h2 className="text-3xl font-extrabold leading-tight text-brand-navy">
          Our Approach
        </h2>
        <div className="mt-6 space-y-4">
          {approachCards.map((card) => (
            <article
              key={card.title}
              className="flex gap-5 rounded-[1.75rem] bg-white/90 p-6 shadow-card ring-1 ring-brand-purple-deep/10"
            >
              <Icon name={card.icon} className="mt-1 text-brand-purple-bright" size="xl" />
              <div>
                <h3 className="text-xl font-extrabold text-brand-navy">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-navy/75">
                  {card.text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="px-5 pb-10 min-[520px]:px-6">
        <h2 className="text-3xl font-extrabold leading-tight text-brand-navy">
          Who We Serve
        </h2>
        <div className="mt-6 space-y-4">
          {serveCards.map((card) => (
            <article
              key={card.title}
              className="grid grid-cols-[clamp(5.75rem,28vw,8rem)_minmax(0,1fr)_2.25rem] items-center gap-3 rounded-3xl bg-white/90 p-3 shadow-card ring-1 ring-brand-teal/10 min-[520px]:grid-cols-[8rem_1fr_auto] min-[520px]:gap-4"
            >
              <div className="relative h-20 overflow-hidden rounded-2xl bg-brand-teal-light min-[520px]:h-24">
                <PlaceholderImage
                  src={card.image}
                  alt={`${card.title} support at Ava's Hub`}
                  fill
                  className="object-cover"
                  sizes="128px"
                />
              </div>
              <div className="min-w-0">
                <h3 className="text-[clamp(0.95rem,4.2vw,1.125rem)] font-extrabold leading-tight text-brand-purple-bright">
                  {card.title}
                </h3>
                <p className="mt-1.5 text-[clamp(0.78rem,3.4vw,0.875rem)] leading-relaxed text-brand-navy/85 min-[520px]:mt-2">
                  {card.text}
                </p>
              </div>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-purple-bright text-white shadow-sm min-[520px]:h-10 min-[520px]:w-10">
                <Icon name="arrowRight" size="sm" />
              </span>
            </article>
          ))}
        </div>
      </section>

      <section className="px-6 pb-10">
        <h2 className="text-3xl font-extrabold leading-tight text-brand-navy">
          What Makes Us Different
        </h2>
        <div className="mt-6 space-y-4">
          {differenceCards.map(([traditional, avasHub]) => (
            <article
              key={traditional}
              className="rounded-[1.75rem] bg-white/90 p-5 shadow-card ring-1 ring-brand-purple-deep/10"
            >
              <p className="text-sm font-bold text-brand-navy/45">
                {traditional}
              </p>
              <div className="my-3 h-px bg-brand-purple-deep/10" />
              <p className="flex items-center gap-3 text-xl font-extrabold text-brand-navy">
                <Icon name="heart" className="text-brand-purple-bright" size="sm" />
                {avasHub}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-6 pb-10">
        <div className="overflow-hidden rounded-[1.75rem] bg-brand-lavender/70 shadow-card ring-1 ring-brand-purple-deep/10">
          <div className="relative h-72 bg-brand-teal-light">
            <PlaceholderImage
              src={siteImages.aboutMobileCommunityBelonging}
              alt="Community and belonging at Ava's Hub"
              fill
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>
          <div className="p-6">
            <h2 className="text-3xl font-extrabold leading-tight text-brand-navy">
              You Were Never Meant To Do This Alone
            </h2>
            <p className="mt-5 text-base leading-relaxed text-brand-navy/85">
              Families need more than appointments. They need people, places,
              encouragement, and belonging. Ava&apos;s Hub is here to help your
              family feel supported in the everyday moments that matter most.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 pb-10">
        <FinalMobileCta />
      </section>
    </div>
  );
}

function DesktopAboutPage() {
  return (
    <div className="hidden bg-[#fffaf4] lg:block">
      <section className="py-10 xl:py-12">
        <SectionContainer className="grid min-h-[74vh] items-center gap-10 xl:grid-cols-[0.43fr_0.57fr] xl:gap-12 2xl:gap-16">
          <div className="rounded-[2.25rem] bg-[#fffaf4]/95 p-8 shadow-card ring-1 ring-brand-purple-deep/10 xl:p-10 2xl:p-12">
            <p className="inline-flex rounded-full bg-brand-lavender px-4 py-1.5 text-xs font-extrabold uppercase tracking-normal text-brand-purple-deep">
              More Than a Therapy Center
            </p>
            <h2 className="mt-6 max-w-xl text-[clamp(2.55rem,3.8vw,4.25rem)] font-extrabold leading-[1.03] tracking-tight text-brand-navy">
              We Built Ava&apos;s Hub Because{" "}
              <span className="italic text-brand-purple-bright">
                Families Deserve More
                <span className="ml-3 text-brand-purple-bright/55">
                  <TiltedHeartOutline />
                </span>
              </span>
            </h2>
            <p className="mt-6 max-w-lg text-xl font-extrabold leading-snug text-brand-purple-bright">
              You deserve support, connection, and a place where your child can
              truly belong.
            </p>
            <p className="mt-5 max-w-xl text-[clamp(1rem,1.1vw,1.125rem)] leading-relaxed text-brand-navy/85">
              Too many families leave traditional therapy feeling alone, rushed,
              and unsure how to carry progress into real life. Ava&apos;s Hub was
              created for something warmer: practical support, relationship-based
              care, and a community that understands the whole journey.
            </p>

            <div className="mt-8 flex max-w-lg gap-5 rounded-3xl bg-white/92 p-6 shadow-card ring-1 ring-brand-purple-deep/10">
              <Icon
                name="heart"
                className="mt-1 shrink-0 text-brand-purple-bright"
                size="2x"
              />
              <p className="text-lg font-extrabold leading-relaxed text-brand-navy">
                Because therapy should feel human.
              </p>
            </div>

            <div className="mt-8 flex max-w-xl flex-wrap gap-4">
              <CTAButton href="/contact" className="min-w-[14rem]">
                <span className="inline-flex items-center gap-2">
                  <Icon name="calendar" size="sm" />
                  Schedule Consultation
                </span>
              </CTAButton>
              <CTAButton
                href="#about-story-desktop"
                variant="secondary"
                className="min-w-[12rem]"
              >
                <span className="inline-flex items-center gap-2">
                  <Icon name="resources" size="sm" />
                  See Our Story
                </span>
              </CTAButton>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-8 top-10 h-52 w-52 rounded-full bg-brand-lavender/45 blur-3xl" />
            <div className="absolute -bottom-10 right-8 h-56 w-56 rounded-full bg-brand-gold/20 blur-3xl" />
            <div className="relative overflow-hidden rounded-[4rem_2rem_4rem_2rem] bg-brand-teal-light shadow-card ring-1 ring-brand-teal/10 xl:rounded-[7rem_3rem_7rem_3rem]">
              <PlaceholderImage
                src={siteImages.aboutMobileHero}
                alt={ABOUT_HERO_ALT}
                width={1023}
                height={1537}
                priority
                className="h-[min(76vh,48rem)] w-full object-cover object-[50%_34%]"
                sizes="(min-width: 1280px) 54vw, 50vw"
              />
            </div>
          </div>
        </SectionContainer>
      </section>

      <section id="about-story-desktop" className="pb-12">
        <SectionContainer>
          <div className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#0f5758] to-[#063f46] text-white shadow-card">
            <div className="grid items-stretch lg:grid-cols-[0.44fr_0.56fr]">
              <div className="relative min-h-[24rem] bg-brand-teal-light">
                <PlaceholderImage
                  src={siteImages.aboutMobileBuiltFromRealLife}
                  alt="Ava's Hub family support story"
                  fill
                  className="object-cover object-center"
                  sizes="44vw"
                />
              </div>
              <div className="flex flex-col justify-center p-8 xl:p-10">
                <p className="text-xs font-extrabold uppercase tracking-normal text-brand-gold">
                  Why Ava&apos;s Hub Exists
                </p>
                <h2 className="mt-3 text-[clamp(2rem,3vw,3rem)] font-extrabold leading-tight">
                  Built From Real Life
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/90 xl:text-lg">
                  Ava&apos;s Hub grew from both a parent&apos;s heart and an OT
                  perspective. We saw the gaps: families needing more guidance,
                  children needing practice beyond worksheets, and parents
                  needing a community instead of isolation.
                </p>
              </div>
            </div>
          </div>
        </SectionContainer>
      </section>

      <section className="pb-12">
        <SectionContainer>
          <h2 className="text-[clamp(2rem,3vw,3rem)] font-extrabold leading-tight text-brand-navy">
            What We Believe
          </h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-brand-navy/75">
            Calm, practical care that helps families feel seen.
          </p>
          <div className="mt-7 grid gap-5 lg:grid-cols-5">
            {beliefCards.map((card) => (
              <article
                key={card.title}
                className="rounded-[1.75rem] bg-white/90 p-6 shadow-card ring-1 ring-brand-purple-deep/10"
              >
                <Icon
                  name={card.icon}
                  className="text-brand-purple-bright"
                  size="2x"
                />
                <h3 className="mt-5 text-lg font-extrabold leading-tight text-brand-navy">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-brand-navy/75">
                  {card.text}
                </p>
              </article>
            ))}
          </div>
        </SectionContainer>
      </section>

      <section className="pb-12">
        <SectionContainer>
          <div className="overflow-hidden rounded-[2rem] bg-brand-lavender/70 shadow-card ring-1 ring-brand-purple-deep/10">
            <div className="grid items-stretch lg:grid-cols-[0.48fr_0.52fr]">
              <div className="relative min-h-[25rem] bg-brand-teal-light">
                <PlaceholderImage
                  src={siteImages.aboutMobileFounderStory}
                  alt="Founder story at Ava's Hub"
                  fill
                  className="object-cover object-center"
                  sizes="48vw"
                />
              </div>
              <div className="flex flex-col justify-center p-8 xl:p-10">
                <p className="text-xs font-extrabold uppercase tracking-normal text-brand-purple-deep">
                  Meet the Heart Behind Ava&apos;s Hub
                </p>
                <h2 className="mt-3 text-[clamp(2rem,3vw,3rem)] font-extrabold leading-tight text-brand-navy">
                  Founder Story
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-brand-navy/85 xl:text-lg">
                  Ava&apos;s Hub was shaped by someone who understands the
                  special needs journey from the inside: the burnout, the
                  confusing systems, the long waits, and the ache of wanting
                  more for your child.
                </p>
                <p className="mt-4 text-xl font-extrabold text-brand-purple-bright">
                  You&apos;re not alone.
                </p>
              </div>
            </div>
          </div>
        </SectionContainer>
      </section>

      <section className="pb-12">
        <SectionContainer>
          <h2 className="text-[clamp(2rem,3vw,3rem)] font-extrabold leading-tight text-brand-navy">
            Our Approach
          </h2>
          <div className="mt-7 grid gap-5 lg:grid-cols-2 xl:grid-cols-5">
            {approachCards.map((card) => (
              <article
                key={card.title}
                className="rounded-[1.75rem] bg-white/90 p-6 shadow-card ring-1 ring-brand-purple-deep/10"
              >
                <Icon
                  name={card.icon}
                  className="text-brand-purple-bright"
                  size="xl"
                />
                <h3 className="mt-4 text-lg font-extrabold text-brand-navy">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-navy/75">
                  {card.text}
                </p>
              </article>
            ))}
          </div>
        </SectionContainer>
      </section>

      <section className="pb-12">
        <SectionContainer>
          <h2 className="text-[clamp(2rem,3vw,3rem)] font-extrabold leading-tight text-brand-navy">
            Who We Serve
          </h2>
          <div className="mt-7 grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
            {serveCards.map((card) => (
              <article
                key={card.title}
                className="overflow-hidden rounded-3xl bg-white/90 shadow-card ring-1 ring-brand-teal/10"
              >
                <div className="relative h-44 bg-brand-teal-light">
                  <PlaceholderImage
                    src={card.image}
                    alt={`${card.title} support at Ava's Hub`}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1280px) 25vw, 50vw"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl font-extrabold leading-tight text-brand-purple-bright">
                      {card.title}
                    </h3>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-purple-bright text-white shadow-sm">
                      <Icon name="arrowRight" size="sm" />
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-brand-navy/85">
                    {card.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </SectionContainer>
      </section>

      <section className="pb-12">
        <SectionContainer>
          <h2 className="text-[clamp(2rem,3vw,3rem)] font-extrabold leading-tight text-brand-navy">
            What Makes Us Different
          </h2>
          <div className="mt-7 grid gap-5 lg:grid-cols-3">
            {differenceCards.map(([traditional, avasHub]) => (
              <article
                key={traditional}
                className="rounded-[1.75rem] bg-white/90 p-6 shadow-card ring-1 ring-brand-purple-deep/10"
              >
                <p className="text-sm font-bold text-brand-navy/45">
                  {traditional}
                </p>
                <div className="my-4 h-px bg-brand-purple-deep/10" />
                <p className="flex items-center gap-3 text-xl font-extrabold text-brand-navy">
                  <Icon
                    name="heart"
                    className="text-brand-purple-bright"
                    size="sm"
                  />
                  {avasHub}
                </p>
              </article>
            ))}
          </div>
        </SectionContainer>
      </section>

      <section className="pb-12">
        <SectionContainer>
          <div className="overflow-hidden rounded-[2rem] bg-brand-lavender/70 shadow-card ring-1 ring-brand-purple-deep/10">
            <div className="grid items-stretch lg:grid-cols-[0.42fr_0.58fr]">
              <div className="relative min-h-[22rem] bg-brand-teal-light">
                <PlaceholderImage
                  src={siteImages.aboutMobileCommunityBelonging}
                  alt="Community and belonging at Ava's Hub"
                  fill
                  className="object-cover object-center"
                  sizes="42vw"
                />
              </div>
              <div className="flex flex-col justify-center p-8 xl:p-10">
                <h2 className="text-[clamp(2rem,3vw,3rem)] font-extrabold leading-tight text-brand-navy">
                  You Were Never Meant To Do This Alone
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-brand-navy/85 xl:text-lg">
                  Families need more than appointments. They need people,
                  places, encouragement, and belonging. Ava&apos;s Hub is here
                  to help your family feel supported in the everyday moments
                  that matter most.
                </p>
              </div>
            </div>
          </div>
        </SectionContainer>
      </section>

      <section className="pb-16">
        <SectionContainer>
          <div className="rounded-[2rem] bg-brand-purple-bright p-8 text-white shadow-card">
            <div className="flex items-center justify-between gap-8">
              <div>
                <h2 className="text-2xl font-extrabold leading-tight">
                  Ready to Get Started?
                </h2>
                <p className="mt-2 text-base text-white/90">
                  We&apos;d love to meet your family.
                </p>
              </div>
              <CTAButton
                href="/contact"
                variant="secondary"
                className="shrink-0 !border-white !bg-white !px-6 !py-3 !text-brand-purple-deep hover:!bg-brand-lavender"
              >
                <span className="inline-flex items-center justify-center gap-2">
                  <Icon name="calendar" size="sm" />
                  Schedule Consultation
                </span>
              </CTAButton>
            </div>
          </div>
        </SectionContainer>
      </section>
    </div>
  );
}

export default function AboutPage() {
  return (
    <main className="flex-1 bg-[#fffaf4]">
      <h1 className="sr-only">Ava&apos;s Hub About Us</h1>
      <p className="sr-only">
        Ava&apos;s Hub provides occupational therapy-based life skills, social
        participation, independence training, and real-life support for children,
        teens, and young adults.
      </p>

      <MobileAboutPage />

      <DesktopAboutPage />
    </main>
  );
}
