import type { Metadata } from "next";
import Link from "next/link";
import { CTAButton } from "@/components/CTAButton";
import { HeroBanner } from "@/components/HeroBanner";
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
import { SectionHeadingDecorated } from "@/components/SectionHeadingDecorated";
import { guides } from "@/data/guides";
import type { IconName } from "@/data/icons";
import { resourcesImages } from "@/data/pageImages/resourcesImages";
import { printables } from "@/data/printables";
import {
  cardInnerPad,
  cardShell,
  cardShellSoft,
  innerContentWrap,
  pageSectionPad,
} from "@/lib/pageSectionStyles";

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
    <div className="bg-[#fffaf4] md:hidden">
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
    <main className="flex-1 bg-white">
      <MobileResourcesPage />
      <div className="hidden md:block">
      <h1 className="sr-only">Ava's Hub Resources</h1>
      <HeroBanner
        images={{
          desktop: resourcesImages.resourcesHeroBanner,
          mobile: resourcesImages.resourcesHeroBannerMobile,
        }}
        alt="Ava's Hub resources hero banner"
        showCtas={false}
      />

      <section className={`bg-white ${pageSectionPad}`} aria-labelledby="resource-categories-heading">
        <SectionContainer>
          <SectionHeadingDecorated
            id="resource-categories-heading"
            title="Browse Resources By Category"
            className="mb-8 sm:mb-10"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {resourceCategories.map((card) => (
              <article
                key={card.title}
                className="flex h-full flex-col items-center rounded-3xl bg-white px-5 py-7 text-center shadow-card ring-1 ring-brand-teal/10"
              >
                <span
                  className={`inline-flex h-14 w-14 items-center justify-center rounded-full shadow-sm ${toneStyles[card.tone].icon}`}
                >
                  <Icon name={card.icon} size="lg" />
                </span>
                <h2 className={`mt-5 text-base font-bold leading-tight ${toneStyles[card.tone].text}`}>
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
        className={`bg-gradient-to-b from-brand-lavender/25 to-white ${pageSectionPad}`}
        aria-labelledby="printable-tools-heading"
      >
        <SectionContainer>
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
            <div className={cardShell}>
              <div className={cardInnerPad}>
                <SectionHeadingDecorated
                  id="printable-tools-heading"
                  title="Printable Worksheets & Tools"
                  subtitle="Download, print, and use at home for practice and carryover!"
                  className="mb-8"
                />
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {printableTools.map((tool) => (
                    <ImageTile key={tool.title} src={tool.image} title={tool.title} />
                  ))}
                </div>
                <div className="mt-7 flex justify-center">
                  <CTAButton href="/printables" className="w-full sm:w-auto">
                    View All Printables
                  </CTAButton>
                </div>
              </div>
            </div>

            <div className={cardShellSoft}>
              <div className={cardInnerPad}>
                <SectionHeadingDecorated
                  id="helpful-links-heading"
                  title="Helpful Websites & Resource Links"
                  subtitle="Trusted organizations and websites we recommend."
                  className="mb-8"
                />
                <div className="space-y-3">
                  {helpfulLinks.map((item) => (
                    <Link
                      key={item.title}
                      href={`https://${item.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="grid gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-brand-teal/10 transition hover:-translate-y-0.5 hover:shadow-md sm:grid-cols-[1fr_1.2fr_auto] sm:items-center"
                    >
                      <div>
                        <h3 className={`text-sm font-bold ${toneStyles[item.tone].text}`}>
                          {item.title}
                        </h3>
                        <p className="mt-1 text-xs font-semibold text-brand-navy/65">
                          {item.url}
                        </p>
                      </div>
                      <p className="text-sm leading-relaxed text-brand-navy/80">
                        {item.description}
                      </p>
                      <Icon name="check" className="text-brand-purple-deep" size="sm" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </SectionContainer>
      </section>

      <section className={pageSectionPad} aria-labelledby="featured-guides-heading">
        <SectionContainer>
          <div className="grid gap-8 lg:grid-cols-[1.35fr_0.9fr] lg:gap-10">
            <div className={cardShell}>
              <div className={`${cardInnerPad} lg:px-8`}>
                <SectionHeadingDecorated
                  id="featured-guides-heading"
                  title="Featured Guides & Downloads"
                  subtitle="In-depth guides to help you feel informed and empowered."
                  className="mb-8"
                />
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                  {featuredGuides.map((guide) => (
                    <article
                      key={guide.title}
                      className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-brand-teal/10"
                    >
                      <div
                        className="aspect-[4/3] bg-brand-teal-light bg-cover bg-center"
                        style={{ backgroundImage: `url(${guide.image})` }}
                        role="img"
                        aria-label={guide.title}
                      />
                      <div className="flex flex-1 flex-col p-4">
                        <h3 className="text-sm font-bold leading-snug text-brand-teal">
                          {guide.title}
                        </h3>
                        <p className="mt-3 flex-1 text-xs leading-relaxed text-brand-navy/80 sm:text-sm">
                          {guide.description}
                        </p>
                        <Link
                          href="/contact"
                          className="mt-4 text-xs font-bold text-brand-purple-deep underline-offset-2 hover:text-brand-teal hover:underline"
                        >
                          Download Guide
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>

            <aside className={`${cardShellSoft} self-start`}>
              <div className={`${cardInnerPad} text-center`}>
                <span className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-lavender text-brand-purple-deep">
                  <Icon name="email" size="2x" />
                </span>
                <h2 className="mt-5 text-2xl font-bold text-brand-purple-deep">
                  Stay Informed
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-brand-navy/85 sm:text-base">
                  Get new printables, resource updates, and helpful tips-right to
                  your inbox!
                </p>
                <div className="mt-6">
                  <EmailSignupForm placeholder="Enter your email address" />
                </div>
                <p className="mt-5 text-xs font-semibold text-brand-navy/70">
                  We respect your privacy. Unsubscribe anytime.
                </p>
              </div>
            </aside>
          </div>
        </SectionContainer>
      </section>

      <section className={`bg-white ${pageSectionPad}`} aria-label="Resource features">
        <SectionContainer>
          <div className="grid overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-brand-teal/10 lg:grid-cols-[1.2fr_4fr]">
            <div className="flex items-center gap-4 bg-brand-purple-deep px-6 py-6 text-white">
              <Icon name="heart" className="text-white" size="2x" />
              <p className="text-base font-bold leading-snug sm:text-lg">
                We're here to walk beside you-every step of the way.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5">
              {featureItems.map((item, index) => (
                <div
                  key={item.title}
                  className={
                    `flex gap-4 px-5 py-6 text-left sm:flex-col sm:items-center sm:text-center lg:justify-center ` +
                    (index === 0 ? "" : "lg:border-l lg:border-brand-teal/15")
                  }
                >
                  <Icon
                    name={item.icon}
                    size="2x"
                    className={toneStyles[item.tone].text}
                  />
                  <h3 className="text-sm font-bold leading-snug text-brand-navy">
                    {item.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </SectionContainer>
      </section>
      </div>
    </main>
  );
}
