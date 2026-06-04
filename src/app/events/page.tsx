import type { Metadata } from "next";
import { ClosingCtaBanner } from "@/components/page/ClosingCtaBanner";
import { CTAButton } from "@/components/CTAButton";
import { EventsCalendar } from "@/components/page/EventsCalendar";
import { EventsHighlightsShowcase } from "@/components/page/EventsHighlightsShowcase";
import { HeroBanner } from "@/components/HeroBanner";
import { Icon } from "@/components/Icon";
import { EmailSignupForm } from "@/components/page/EmailSignupForm";
import {
  ResourceBottomCta,
  TiltedHeartOutline,
} from "@/components/page/ResourceMobileComponents";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { SectionContainer } from "@/components/SectionContainer";
import { SectionHeadingDecorated } from "@/components/SectionHeadingDecorated";
import type { IconName } from "@/data/icons";
import { eventsImages } from "@/data/pageImages/eventsImages";
import { fetchAllEvents } from "@/lib/fetchEvents";
import {
  cardInnerPad,
  cardShell,
  cardShellSoft,
  innerContentWrap,
  pageSectionPad,
} from "@/lib/pageSectionStyles";

type MobileEventCategory = {
  title: string;
  icon: IconName;
  tone: "purple" | "teal" | "gold";
};

export const metadata: Metadata = {
  title: "Events",
  description:
    "Community events, social groups, and family gatherings at Ava's Hub in East Orange, NJ.",
  alternates: { canonical: "/events" },
  openGraph: {
    url: "/events",
    title: "Events | Ava's Hub",
    description:
      "Social clubs, family nights, workshops, and seasonal celebrations for kids, teens, and families.",
  },
};

export const dynamic = "force-dynamic";

const mobileEventCategories: MobileEventCategory[] = [
  { title: "All Events", icon: "calendar", tone: "purple" },
  { title: "Workshops & Training", icon: "training", tone: "teal" },
  { title: "Family Events", icon: "family", tone: "gold" },
  { title: "Community Outings", icon: "mapLocation", tone: "teal" },
  { title: "Special Celebrations", icon: "partyHorn", tone: "purple" },
];

const mobileToneStyles = {
  purple: "bg-brand-lavender text-brand-purple-bright",
  teal: "bg-brand-teal-light text-brand-teal",
  gold: "bg-brand-gold/25 text-brand-navy",
} satisfies Record<MobileEventCategory["tone"], string>;

function MobileEventsPage({ events }: { events: Awaited<ReturnType<typeof fetchAllEvents>> }) {
  return (
    <div className="bg-[#fffaf4] md:hidden">
      <h1 className="sr-only">Events at Ava's Hub</h1>

      <section className="pb-8">
        <div className="bg-[#fffaf4]">
          <div className="mx-auto w-full overflow-hidden rounded-b-[2rem] bg-brand-teal-light shadow-card">
            <PlaceholderImage
              src={eventsImages.mobileHeroBanner}
              alt="Ava's Hub events community hero"
              width={1182}
              height={1331}
              priority
              className="block h-auto w-full"
              sizes="100vw"
            />
          </div>

          <div className="relative z-10 mx-6 -mt-12 rounded-[2rem] bg-[#fffaf4]/95 p-6 shadow-card ring-1 ring-brand-purple-deep/10">
            <h2 className="text-[clamp(2rem,9vw,2.35rem)] font-extrabold leading-[1.05] tracking-tight text-brand-navy">
              Events Calendar
            </h2>
            <p className="mt-3 text-xl font-extrabold leading-snug text-brand-purple-bright">
              Connection. Community. Celebration.{" "}
              <span className="text-brand-purple-bright/55">
                <TiltedHeartOutline />
              </span>
            </p>
            <p className="mt-5 text-base leading-relaxed text-brand-navy/85">
              At Ava&apos;s Hub, we believe in creating meaningful experiences
              that build skills, confidence, friendships, and joyful memories.
            </p>

            <div className="mt-6 rounded-[1.5rem] bg-white/90 p-5 shadow-sm ring-1 ring-brand-teal/10">
              <h3 className="text-lg font-extrabold leading-tight text-brand-navy">
                Stay in the Loop!
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-navy/75">
                Subscribe to receive monthly events and updates.
              </p>
              <CTAButton href="#events-newsletter" className="mt-4 w-full">
                Subscribe Now
              </CTAButton>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-10">
        <h2 className="font-serif text-[1.85rem] font-semibold leading-tight text-brand-navy">
          Explore Events
          <span className="ml-2 text-brand-purple-bright/55">
            <TiltedHeartOutline />
          </span>
        </h2>
        <div className="mt-6 space-y-4">
          {mobileEventCategories.map((category) => (
            <article
              key={category.title}
              className="rounded-[1.75rem] bg-white/95 p-6 text-center shadow-card ring-1 ring-brand-teal/10"
            >
              <span
                className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full ${mobileToneStyles[category.tone]}`}
              >
                <Icon name={category.icon} size="2x" />
              </span>
              <h3 className="mt-5 text-xl font-extrabold leading-tight text-brand-navy">
                {category.title}
              </h3>
            </article>
          ))}
        </div>
      </section>

      <section id="upcoming-events" className="px-6 pb-10" aria-labelledby="mobile-calendar-heading">
        <div className="rounded-[1.75rem] bg-white/95 p-5 shadow-card ring-1 ring-brand-purple-deep/10">
          <h2
            id="mobile-calendar-heading"
            className="font-serif text-[1.85rem] font-semibold leading-tight text-brand-navy"
          >
            Upcoming Calendar
            <span className="ml-2 text-brand-purple-bright/55">
              <TiltedHeartOutline />
            </span>
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-brand-navy/70">
            Check back often. New events are added regularly.
          </p>
          <div className="mt-6">
            <EventsCalendar events={events} />
          </div>
        </div>
      </section>

      <section className="px-6 pb-10" aria-labelledby="mobile-event-highlights-heading">
        <h2
          id="mobile-event-highlights-heading"
          className="font-serif text-[1.85rem] font-semibold leading-tight text-brand-navy"
        >
          What&apos;s Coming Up
          <span className="ml-2 text-brand-purple-bright/55">
            <TiltedHeartOutline />
          </span>
        </h2>
        <div className="mt-6">
          <EventsHighlightsShowcase />
        </div>
      </section>

      <section id="events-newsletter" className="px-6 pb-10" aria-labelledby="events-newsletter-heading">
        <div className="overflow-hidden rounded-[1.75rem] bg-brand-lavender/45 shadow-card ring-1 ring-brand-purple-deep/10">
          <div className="relative h-40 bg-brand-teal-light">
            <PlaceholderImage
              src={eventsImages.mobileNewsletter}
              alt="Ava's Hub event updates"
              fill
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>
          <div className="p-6 text-center">
            <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-white text-brand-purple-bright shadow-sm">
              <Icon name="email" size="lg" />
            </span>
            <h2
              id="events-newsletter-heading"
              className="mt-4 text-2xl font-extrabold text-brand-navy"
            >
              Stay Connected
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-brand-navy/80">
              Get updates about upcoming events, community activities,
              workshops, and new opportunities.
            </p>
            <div className="mt-5">
              <EmailSignupForm placeholder="Enter your email address" />
            </div>
            <p className="mt-4 text-xs font-semibold text-brand-navy/60">
              We respect your privacy.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 pb-10">
        <div className="overflow-hidden rounded-[1.75rem] bg-white/95 shadow-card ring-1 ring-brand-purple-deep/10">
          <div className="relative h-44 bg-brand-teal-light">
            <PlaceholderImage
              src={eventsImages.mobileFinalCta}
              alt="Ava's Hub community event support"
              fill
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>
          <div className="p-6">
            <h2 className="text-2xl font-extrabold leading-tight text-brand-navy">
              Every event is a chance to belong.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-brand-navy/75">
              Join us for community moments that help children build confidence,
              connection, and real-world participation.
            </p>
          </div>
        </div>
      </section>

      <ResourceBottomCta
        title="Ready to Join the Community?"
        text="We'd love to welcome your family."
      />
    </div>
  );
}

export default async function EventsPage() {
  const events = await fetchAllEvents();

  return (
    <main className="flex-1 bg-white">
      <MobileEventsPage events={events} />
      <div className="hidden md:block">
      <h1 className="sr-only">Events at Ava's Hub</h1>
      <HeroBanner
        images={{
          desktop: eventsImages.eventsHeroBanner,
          mobile: eventsImages.eventsHeroBannerMobile,
        }}
        alt="Ava's Hub events calendar hero banner"
      />

      <section
        id="upcoming-events"
        className={`bg-gradient-to-b from-brand-lavender/25 to-white ${pageSectionPad}`}
        aria-labelledby="calendar-heading"
      >
        <SectionContainer>
          <div className={cardShell}>
            <div className={`${cardInnerPad} lg:px-10`}>
              <div className={innerContentWrap}>
                <SectionHeadingDecorated
                  id="calendar-heading"
                  title="Upcoming Calendar"
                  subtitle="Check back often—new events are added regularly."
                  className="mb-8"
                />
                <EventsCalendar events={events} />
              </div>
            </div>
          </div>
        </SectionContainer>
      </section>

      <section className={pageSectionPad} aria-labelledby="event-highlights-heading">
        <SectionContainer>
          <div className={cardShellSoft}>
            <div className={`${cardInnerPad} lg:px-10`}>
              <div className={innerContentWrap}>
                <SectionHeadingDecorated
                  id="event-highlights-heading"
                  title="Upcoming Highlights"
                  className="mb-8"
                />
                <EventsHighlightsShowcase />
              </div>
            </div>
          </div>
        </SectionContainer>
      </section>

      <ClosingCtaBanner
        heading="Join Our Community"
        description="Ask about upcoming events or how your child can participate."
        buttonLabel="Contact Us"
        buttonHref="/contact"
      />
      </div>
    </main>
  );
}
