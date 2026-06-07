import type { Metadata } from "next";
import Link from "next/link";
import { CTAButton } from "@/components/CTAButton";
import { Icon } from "@/components/Icon";
import { EmailSignupForm } from "@/components/page/EmailSignupForm";
import {
  MobileDownloadCard,
  MobileSectionHeading,
  ResourceBottomCta,
  ResourceNewsletterCard,
} from "@/components/page/ResourceMobileComponents";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { SectionContainer } from "@/components/SectionContainer";
import { guides } from "@/data/guides";
import type { IconName } from "@/data/icons";
import { resourcesImages } from "@/data/pageImages/resourcesImages";
import { printables } from "@/data/printables";

export const metadata: Metadata = {
  title: "Resources | Ava's Hub Printables, Guides & Family Support",
  description:
    "Browse Ava's Hub resources, printable worksheets, family guides, and helpful tools for daily living skills, emotional regulation, communication, routines, and independence.",
  alternates: { canonical: "/resources" },
  openGraph: {
    url: "/resources",
    title: "Ava's Hub Resources | Printable Tools, Parent Guides & Family Support",
    description:
      "Printable worksheets, daily living tools, communication supports, behavior strategies, parent guides, and helpful family links.",
  },
};

type Tone = "purple" | "teal" | "gold";

type CategoryCard = {
  icon: IconName;
  title: string;
  description: string;
  tone: Tone;
};

type PrintableTool = {
  title: string;
  image: string;
};

type HelpfulLink = {
  title: string;
  url: string;
  description: string;
  tone: Tone;
};

type GuideCard = {
  title: string;
  description: string;
  image: string;
};

type FeatureItem = {
  icon: IconName;
  title: string;
  tone: Tone;
};

type MobileResourceCategory = {
  title: string;
  description: string;
  icon: IconName;
  tone: Tone;
  href: string;
};

const toneStyles = {
  purple: {
    icon: "bg-brand-purple-deep text-white",
    text: "text-brand-purple-deep",
  },
  teal: {
    icon: "bg-brand-teal text-white",
    text: "text-brand-teal",
  },
  gold: {
    icon: "bg-brand-gold text-brand-navy",
    text: "text-brand-gold",
  },
} satisfies Record<Tone, Record<string, string>>;

const resourceCategories: CategoryCard[] = [
  {
    icon: "resources",
    title: "Printable Worksheets",
    tone: "purple",
    description: "Download and print activities for skill building at home.",
  },
  {
    icon: "home",
    title: "Daily Living Skills",
    tone: "teal",
    description: "Resources to support independence in everyday routines.",
  },
  {
    icon: "confidence",
    title: "Social Emotional Learning",
    tone: "gold",
    description:
      "Tools to build emotional regulation, social skills, and self-confidence.",
  },
  {
    icon: "communication",
    title: "Communication Supports",
    tone: "teal",
    description:
      "Visuals, strategies, and tools to support effective communication.",
  },
  {
    icon: "bookOpen",
    title: "Behavior Supports",
    tone: "purple",
    description:
      "Guides and strategies for positive behavior and challenging moments.",
  },
  {
    icon: "family",
    title: "Parent & Caregiver Resources",
    tone: "teal",
    description: "Support, training tools, and tips for families and caregivers.",
  },
];

const printableTools: PrintableTool[] = [
  {
    title: "Feelings Check-In",
    image: resourcesImages.feelingsCheckInImage,
  },
  {
    title: "First, Then Visual Schedule",
    image: resourcesImages.firstThenImage,
  },
  {
    title: "Morning Routine Chart",
    image: resourcesImages.morningRoutineImage,
  },
  {
    title: "Good Choices Sort",
    image: resourcesImages.goodChoicesImage,
  },
];

const helpfulLinks: HelpfulLink[] = [
  {
    title: "Autism Speaks",
    url: "autismspeaks.org",
    tone: "purple",
    description: "Resources, guides, and tools for families.",
  },
  {
    title: "CDC - Developmental Milestones",
    url: "cdc.gov/ncbddd/actearly",
    tone: "teal",
    description: "Track developmental milestones and learn the signs.",
  },
  {
    title: "Understood",
    url: "understood.org",
    tone: "purple",
    description: "Practical solutions for learning and attention issues.",
  },
  {
    title: "Pathfinders for Autism",
    url: "pathfindersforautism.org",
    tone: "teal",
    description: "Local resources and support in New Jersey.",
  },
];

const featuredGuides: GuideCard[] = [
  {
    title: "How to Support Independence at Home",
    image: resourcesImages.guideIndependenceImage,
    description: "Encourage skills that build confidence and independence.",
  },
  {
    title: "Calming Strategies That Work",
    image: resourcesImages.guideCalmingImage,
    description: "Simple, effective tools to help with big emotions.",
  },
  {
    title: "Creating Successful Routines",
    image: resourcesImages.guideRoutinesImage,
    description: "Structure and consistency for smoother days at home.",
  },
  {
    title: "Building Social Skills Every Day",
    image: resourcesImages.guideSocialSkillsImage,
    description: "Easy ways to practice social skills in everyday moments.",
  },
];

const featureItems: FeatureItem[] = [
  { icon: "circleCheck", title: "Evidence-Based Resources", tone: "teal" },
  { icon: "training", title: "Created by OT Professionals", tone: "purple" },
  { icon: "family", title: "Family-Friendly & Easy to Use", tone: "teal" },
  { icon: "clock", title: "Free & Available Anytime", tone: "gold" },
  { icon: "heart", title: "Made With Love for Our Community", tone: "purple" },
];

const mobileResourceCategories: MobileResourceCategory[] = [
  {
    title: "Printable Worksheets",
    icon: "resources",
    tone: "purple",
    href: "#mobile-printables",
    description: "Download and print activities for skill-building at home.",
  },
  {
    title: "Daily Living Skills",
    icon: "home",
    tone: "teal",
    href: "#mobile-guides",
    description: "Resources to support independence in everyday routines.",
  },
  {
    title: "Social Emotional Learning",
    icon: "heart",
    tone: "gold",
    href: "#mobile-guides",
    description:
      "Tools to build emotional regulation, social skills, and self-confidence.",
  },
  {
    title: "Communication Supports",
    icon: "communication",
    tone: "teal",
    href: "#mobile-links",
    description:
      "Visuals, strategies, and tools to support effective communication.",
  },
  {
    title: "Behavior Supports",
    icon: "brain",
    tone: "purple",
    href: "#mobile-links",
    description:
      "Guides and strategies for positive behavior and challenging moments.",
  },
  {
    title: "Parent & Caregiver Resources",
    icon: "family",
    tone: "teal",
    href: "#mobile-guides",
    description: "Support, training tools, and tips for families and caregivers.",
  },
];

const mobilePrintableImages: Record<string, string> = {
  "feelings-check-in": resourcesImages.mobileWorksheetCard1,
  "first-then-visual-schedule": resourcesImages.mobileWorksheetCard2,
  "morning-routine-chart": resourcesImages.mobileWorksheetCard3,
};

const mobileGuideImages: Record<string, string> = {
  "support-independence-at-home": resourcesImages.mobileGuideCard1,
  "calming-strategies": resourcesImages.mobileGuideCard2,
  "successful-routines": resourcesImages.mobileGuideCard3,
  "building-social-skills": resourcesImages.mobileGuideCard4,
};

function ImageTile({ src, title }: { src: string; title: string }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-brand-teal/10">
      <div
        className="aspect-[3/4] bg-brand-teal-light bg-cover bg-center"
        style={{ backgroundImage: `url(${src})` }}
        role="img"
        aria-label={title}
      />
      <p className="px-3 py-3 text-center text-xs font-bold leading-snug text-brand-teal">
        {title}
      </p>
    </div>
  );
}

function MobileResourcesPage() {
  return (
    <div className="bg-[#fffaf4] lg:hidden">
      <h1 className="sr-only">Ava's Hub Resources</h1>

      <section className="pb-8">
        <div className="bg-[#fffaf4]">
          <div className="mx-auto w-full overflow-hidden rounded-b-[2rem] bg-brand-teal-light shadow-card">
            <PlaceholderImage
              src={resourcesImages.mobileHeroBanner}
              alt="Ava's Hub resources mobile hero banner"
              width={1182}
              height={1331}
              priority
              className="block h-auto w-full"
              sizes="100vw"
            />
          </div>

          <div className="relative z-10 mx-6 -mt-12 rounded-[2rem] bg-[#fffaf4]/95 p-6 shadow-card ring-1 ring-brand-purple-deep/10">
            <h2 className="text-[clamp(1.95rem,8vw,2.3rem)] font-extrabold leading-[1.08] tracking-tight text-brand-navy">
              Tools and Resources for Everyday Success at Home.{" "}
              <span className="text-brand-gold">
                <Icon name="heart" size="sm" />
              </span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-brand-navy/85">
              Adaptive equipment, visual supports, routines, and practical
              resources to help your child build skills and confidence every
              day.
            </p>
            <div className="mt-6 space-y-3">
              <CTAButton href="#mobile-printables" className="w-full">
              <span className="inline-flex items-center gap-2">
                <Icon name="resources" size="sm" />
                View Printables
              </span>
              </CTAButton>
              <CTAButton href="#mobile-categories" variant="secondary" className="w-full">
              <span className="inline-flex items-center gap-2">
                <Icon name="arrowRight" size="sm" />
                Explore Resources
              </span>
              </CTAButton>
            </div>
          </div>
        </div>
      </section>

      <section id="mobile-categories" className="px-6 pb-10">
        <MobileSectionHeading title="Browse Resources by Category" />
        <div className="mt-6 space-y-5">
          {mobileResourceCategories.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="grid grid-cols-[6.25rem_1fr_auto] items-center gap-4 rounded-[1.75rem] bg-white/95 p-3 shadow-card ring-1 ring-brand-teal/10"
            >
              <div className="flex h-24 items-center justify-center rounded-[1.25rem] bg-brand-lavender/60">
                <span
                  className={`flex h-16 w-16 items-center justify-center rounded-full ${toneStyles[card.tone].icon} shadow-sm`}
                >
                  <Icon name={card.icon} size="lg" />
                </span>
              </div>
              <div>
                <h3 className="text-base font-extrabold leading-tight text-brand-navy">
                  {card.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-brand-navy/70">
                  {card.description}
                </p>
              </div>
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-full ${toneStyles[card.tone].icon}`}
                aria-hidden
              >
                <Icon name="arrowRight" size="sm" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section id="mobile-printables" className="px-6 pb-10">
        <MobileSectionHeading
          title="Printable Worksheets & Tools"
          subtitle="Download, print, and use at home for practice and carryover."
        />
        <div className="mt-6 space-y-5">
          {printables.slice(0, 3).map((printable) => (
            <MobileDownloadCard
              key={printable.slug}
              title={printable.title}
              description={printable.description}
              image={mobilePrintableImages[printable.slug] ?? printable.image}
              href={printable.pdf}
              category={printable.category}
              fileSize={printable.fileSize}
              buttonLabel="Download"
            />
          ))}
        </div>
        <CTAButton href="/printables" className="mt-6 w-full">
          View All Printables
        </CTAButton>
      </section>

      <section id="mobile-links" className="px-6 pb-10">
        <MobileSectionHeading
          title="Helpful Websites & Resource Links"
          subtitle="Trusted organizations and websites we recommend."
        />
        <div className="mt-6 space-y-4">
          {helpfulLinks.map((item) => (
            <Link
              key={item.title}
              href={`https://${item.url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="grid grid-cols-[3.25rem_1fr_auto] items-center gap-4 rounded-[1.5rem] bg-white/95 p-4 shadow-card ring-1 ring-brand-teal/10"
            >
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-full ${toneStyles[item.tone].icon}`}
              >
                <Icon name="bookOpen" size="sm" />
              </span>
              <div>
                <h3 className="text-base font-extrabold leading-tight text-brand-navy">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs font-bold text-brand-teal">
                  {item.url}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-brand-navy/70">
                  {item.description}
                </p>
              </div>
              <Icon name="arrowRight" className="text-brand-purple-bright" size="sm" />
            </Link>
          ))}
        </div>
      </section>

      <section id="mobile-guides" className="px-6 pb-10">
        <MobileSectionHeading
          title="Featured Guides & Downloads"
          subtitle="In-depth guides to help you feel informed and empowered."
        />
        <div className="mt-6 space-y-5">
          {guides.slice(0, 4).map((guide) => (
            <MobileDownloadCard
              key={guide.slug}
              title={guide.title}
              description={guide.description}
              image={mobileGuideImages[guide.slug] ?? guide.image}
              href={guide.pdf}
              category={guide.category}
              buttonLabel="Download Guide"
            />
          ))}
        </div>
        <CTAButton href="/guides" className="mt-6 w-full">
          View All Guides
        </CTAButton>
      </section>

      <ResourceNewsletterCard />

      <section className="px-6 pb-10">
        <div className="overflow-hidden rounded-[1.75rem] bg-white/95 shadow-card ring-1 ring-brand-purple-deep/10">
          <div className="relative h-44 bg-brand-teal-light">
            <PlaceholderImage
              src={resourcesImages.mobileFinalCta}
              alt="Ava's Hub family resource support"
              fill
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>
          <div className="p-6">
            <h2 className="text-2xl font-extrabold leading-tight text-brand-navy">
              We&apos;re here to walk beside you.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-brand-navy/75">
              Helpful tools are just the beginning. We can help your family
              choose strategies that make everyday life feel more supported.
            </p>
          </div>
        </div>
      </section>

      <ResourceBottomCta
        title="Need Help Finding the Right Resource?"
        text="We're here to walk beside you-every step of the way."
      />
    </div>
  );
}

export default function ResourcesPage() {
  return (
    <main className="flex-1 bg-[#fffaf4]">
      <MobileResourcesPage />
      <div className="hidden bg-[#fffaf4] lg:block">
        <h1 className="sr-only">Ava&apos;s Hub Resources</h1>

        <section className="py-9 xl:py-12">
          <SectionContainer className="grid min-h-[74vh] items-center gap-10 xl:grid-cols-[0.43fr_0.57fr] xl:gap-12 2xl:gap-16">
            <div className="rounded-[2.25rem] bg-[#fffaf4]/95 p-8 shadow-card ring-1 ring-brand-purple-deep/10 xl:p-10 2xl:p-12">
              <p className="inline-flex rounded-full bg-brand-lavender px-4 py-1.5 text-xs font-extrabold uppercase tracking-normal text-brand-purple-deep">
                Resources
              </p>
              <h2 className="mt-6 max-w-xl text-[clamp(2.45rem,3.7vw,4.1rem)] font-extrabold leading-[1.05] tracking-tight text-brand-navy">
                Tools and Resources for Everyday Success at Home.{" "}
                <span className="text-brand-gold">
                  <Icon name="heart" size="sm" />
                </span>
              </h2>
              <p className="mt-6 max-w-xl text-[clamp(1rem,1.1vw,1.125rem)] leading-relaxed text-brand-navy/85">
                Adaptive equipment, visual supports, routines, and practical
                resources to help your child build skills and confidence every
                day.
              </p>
              <div className="mt-8 flex max-w-xl flex-wrap gap-4">
                <CTAButton href="#desktop-printables" className="min-w-[13rem]">
                  <span className="inline-flex items-center gap-2">
                    <Icon name="resources" size="sm" />
                    View Printables
                  </span>
                </CTAButton>
                <CTAButton
                  href="#desktop-categories"
                  variant="secondary"
                  className="min-w-[13rem]"
                >
                  <span className="inline-flex items-center gap-2">
                    <Icon name="arrowRight" size="sm" />
                    Explore Resources
                  </span>
                </CTAButton>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-8 top-10 h-52 w-52 rounded-full bg-brand-lavender/45 blur-3xl" />
              <div className="absolute -bottom-10 right-8 h-56 w-56 rounded-full bg-brand-gold/20 blur-3xl" />
              <div className="relative overflow-hidden rounded-[4rem_2rem_4rem_2rem] bg-brand-teal-light shadow-card ring-1 ring-brand-teal/10 xl:rounded-[7rem_3rem_7rem_3rem]">
                <PlaceholderImage
                  src={resourcesImages.mobileHeroBanner}
                  alt="Ava's Hub resources mobile hero banner"
                  width={1182}
                  height={1331}
                  priority
                  className="h-[min(76vh,48rem)] w-full object-cover object-[50%_34%]"
                  sizes="(min-width: 1280px) 54vw, 50vw"
                />
              </div>
            </div>
          </SectionContainer>
        </section>

        <section id="desktop-categories" className="pb-12">
          <SectionContainer>
            <h2 className="font-serif text-[clamp(2rem,3vw,3rem)] font-semibold leading-tight text-brand-navy">
              Browse Resources by Category
            </h2>
            <div className="mt-8 grid gap-5 lg:grid-cols-3 xl:grid-cols-6">
              {mobileResourceCategories.map((card) => (
                <Link
                  key={card.title}
                  href={card.href.replace("mobile", "desktop")}
                  className="rounded-[1.75rem] bg-white/95 p-5 shadow-card ring-1 ring-brand-teal/10 transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <span
                    className={`flex h-16 w-16 items-center justify-center rounded-full ${toneStyles[card.tone].icon} shadow-sm`}
                  >
                    <Icon name={card.icon} size="lg" />
                  </span>
                  <h3 className="mt-5 text-base font-extrabold leading-tight text-brand-navy">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-brand-navy/70">
                    {card.description}
                  </p>
                </Link>
              ))}
            </div>
          </SectionContainer>
        </section>

        <section id="desktop-links" className="pb-12" aria-labelledby="desktop-links-heading">
          <SectionContainer>
            <h2
              id="desktop-links-heading"
              className="font-serif text-[clamp(2rem,3vw,3rem)] font-semibold leading-tight text-brand-navy"
            >
              Helpful Websites & Resource Links
            </h2>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-brand-navy/70">
              Trusted organizations and websites we recommend.
            </p>
            <div className="mt-8 grid gap-4 lg:grid-cols-2">
              {helpfulLinks.map((item) => (
                <Link
                  key={item.title}
                  href={`https://${item.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid grid-cols-[3.25rem_1fr_auto] items-center gap-4 rounded-[1.5rem] bg-white/95 p-4 shadow-card ring-1 ring-brand-teal/10 transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-full ${toneStyles[item.tone].icon}`}
                  >
                    <Icon name="bookOpen" size="sm" />
                  </span>
                  <div>
                    <h3 className="text-base font-extrabold leading-tight text-brand-navy">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs font-bold text-brand-teal">
                      {item.url}
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-brand-navy/70">
                      {item.description}
                    </p>
                  </div>
                  <Icon
                    name="arrowRight"
                    className="text-brand-purple-bright"
                    size="sm"
                  />
                </Link>
              ))}
            </div>
          </SectionContainer>
        </section>

        <section className="pb-12">
          <SectionContainer>
            <div
              id="desktop-guides"
              className="rounded-[1.75rem] bg-white/90 p-6 shadow-card ring-1 ring-brand-purple-deep/10 xl:p-7"
            >
              <h2 className="font-serif text-[clamp(1.8rem,2.5vw,2.5rem)] font-semibold leading-tight text-brand-navy">
                Featured Guides & Downloads
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-brand-navy/70">
                In-depth guides to help you feel informed and empowered.
              </p>
              <div className="mt-6 grid gap-5 lg:grid-cols-3">
                {guides.slice(0, 3).map((guide) => (
                  <MobileDownloadCard
                    key={guide.slug}
                    title={guide.title}
                    description={guide.description}
                    image={mobileGuideImages[guide.slug] ?? guide.image}
                    href={guide.pdf}
                    category={guide.category}
                    buttonLabel="Download Guide"
                  />
                ))}
              </div>
              <CTAButton href="/guides" className="mt-6">
                View All Guides
              </CTAButton>
            </div>

            <div
              id="desktop-printables"
              className="mt-6 rounded-[1.75rem] bg-brand-lavender/45 p-6 shadow-card ring-1 ring-brand-purple-deep/10 xl:p-7"
            >
              <h2 className="font-serif text-[clamp(1.8rem,2.5vw,2.5rem)] font-semibold leading-tight text-brand-navy">
                Printable Worksheets & Tools
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-brand-navy/70">
                Download, print, and use at home for practice and carryover.
              </p>
              <div className="mt-6 grid gap-5 lg:grid-cols-3">
                {printables.slice(0, 3).map((printable) => (
                  <MobileDownloadCard
                    key={printable.slug}
                    title={printable.title}
                    description={printable.description}
                    image={mobilePrintableImages[printable.slug] ?? printable.image}
                    href={printable.pdf}
                    category={printable.category}
                    fileSize={printable.fileSize}
                    buttonLabel="Download"
                  />
                ))}
              </div>
              <CTAButton href="/printables" className="mt-6">
                View All Printables
              </CTAButton>
            </div>
          </SectionContainer>
        </section>

        <section className="pb-12">
          <SectionContainer>
            <div className="overflow-hidden rounded-[1.75rem] bg-brand-lavender/45 shadow-card ring-1 ring-brand-purple-deep/10">
              <div className="grid items-stretch lg:grid-cols-[0.42fr_0.58fr]">
                <div className="relative min-h-[20rem] bg-brand-teal-light">
                  <PlaceholderImage
                    src="/images/resources/mobile/newsletter-card.png"
                    alt="Family resource updates from Ava's Hub"
                    fill
                    className="object-cover object-center"
                    sizes="42vw"
                  />
                </div>
                <div className="flex flex-col justify-center p-8 text-center xl:p-10">
                  <span className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-white text-brand-purple-bright shadow-sm">
                    <Icon name="email" size="2x" />
                  </span>
                  <h2 className="mt-5 text-2xl font-extrabold text-brand-navy">
                    Stay Informed
                  </h2>
                  <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-brand-navy/80">
                    Get new printables, resource updates, and helpful tips right
                    to your inbox.
                  </p>
                  <div className="mx-auto mt-6 w-full max-w-xl">
                    <EmailSignupForm placeholder="Enter your email address" />
                  </div>
                  <p className="mt-5 text-xs font-semibold text-brand-navy/60">
                    We respect your privacy. Unsubscribe anytime.
                  </p>
                </div>
              </div>
            </div>
          </SectionContainer>
        </section>

        <section className="pb-12">
          <SectionContainer>
            <div className="overflow-hidden rounded-[1.75rem] bg-white/95 shadow-card ring-1 ring-brand-purple-deep/10">
              <div className="grid items-stretch lg:grid-cols-[0.38fr_0.62fr]">
                <div className="relative min-h-[18rem] bg-brand-teal-light">
                  <PlaceholderImage
                    src={resourcesImages.mobileFinalCta}
                    alt="Ava's Hub family resource support"
                    fill
                    className="object-cover object-center"
                    sizes="38vw"
                  />
                </div>
                <div className="flex flex-col justify-center p-8 xl:p-10">
                  <h2 className="text-[clamp(2rem,3vw,3rem)] font-extrabold leading-tight text-brand-navy">
                    We&apos;re here to walk beside you.
                  </h2>
                  <p className="mt-4 max-w-2xl text-base leading-relaxed text-brand-navy/75">
                    Helpful tools are just the beginning. We can help your family
                    choose strategies that make everyday life feel more supported.
                  </p>
                </div>
              </div>
            </div>
          </SectionContainer>
        </section>

        <ResourceBottomCta
          title="Need Help Finding the Right Resource?"
          text="We're here to walk beside you-every step of the way."
        />
      </div>
    </main>
  );
}
