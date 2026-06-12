import type { Metadata } from "next";
import { CTAButton } from "@/components/CTAButton";
import { EventsCalendar } from "@/components/page/EventsCalendar";
import { EventsHighlightsShowcase } from "@/components/page/EventsHighlightsShowcase";
import { Icon } from "@/components/Icon";
import { EmailSignupForm } from "@/components/page/EmailSignupForm";
import {
  ResourceBottomCta,
  TiltedHeartOutline,
} from "@/components/page/ResourceMobileComponents";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { SectionContainer } from "@/components/SectionContainer";
import { eventsImages } from "@/data/pageImages/eventsImages";
import { fetchAllEvents } from "@/lib/fetchEvents";

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

function MobileEventsPage({
  events,
}: {
  events: Awaited<ReturnType<typeof fetchAllEvents>>;
}) {
  return (
    <div className="bg-[#fffaf4] xl:hidden">
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
            <p className="mt-3 flex flex-nowrap items-center gap-1.5 text-[clamp(0.92rem,4.35vw,1.08rem)] font-extrabold leading-snug text-brand-purple-bright">
              <span className="min-w-0 shrink">
                Connection. Community. Celebration.
              </span>
              <span className="shrink-0 text-[0.95em] text-brand-purple-bright/55">
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

      <section
        id="upcoming-events"
        className="px-6 pb-10"
        aria-labelledby="mobile-calendar-heading"
      >
        <div className="rounded-[1.75rem] bg-white/95 p-5 shadow-card ring-1 ring-brand-purple-deep/10">
          <h2
            id="mobile-calendar-heading"
            className="flex items-center gap-2 font-serif text-[1.65rem] font-semibold leading-tight text-brand-navy"
          >
            <span>Upcoming Calendar</span>
            <span className="shrink-0 text-brand-purple-bright/55">
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

      <section
        className="px-6 pb-10"
        aria-labelledby="mobile-event-highlights-heading"
      >
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

      <section
        id="events-newsletter"
        className="px-6 pb-10"
        aria-labelledby="events-newsletter-heading"
      >
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
              <EmailSignupForm placeholder="Enter your email address" source="events" />
            </div>
            <p className="mt-4 text-xs font-semibold text-brand-navy/60">
              We respect your privacy.
            </p>
          </div>
        </div>
      </section>

      <ResourceBottomCta
        title="Ready to Join the Community?"
        text="We'd love to welcome your family."
        buttonLabel="Schedule Consultation"
        buttonHref="/contact"
      />
    </div>
  );
}

function DesktopEventsPage({
  events,
}: {
  events: Awaited<ReturnType<typeof fetchAllEvents>>;
}) {
  return (
    <div className="hidden bg-[#fffaf4] xl:block">
      <h1 className="sr-only">Events at Ava&apos;s Hub</h1>

      <section
        className="py-9 xl:py-12"
        aria-labelledby="desktop-events-hero-heading"
      >
        <SectionContainer className="grid min-h-[74vh] items-center gap-10 xl:grid-cols-[0.43fr_0.57fr] xl:gap-12 2xl:gap-16">
          <div className="rounded-[2.25rem] bg-[#fffaf4]/95 p-8 shadow-card ring-1 ring-brand-purple-deep/10 xl:p-10 2xl:p-12">
            <p className="inline-flex rounded-full bg-brand-lavender px-4 py-2 text-sm font-extrabold uppercase tracking-normal text-brand-purple-bright">
              Community Events
            </p>
            <h2
              id="desktop-events-hero-heading"
              className="mt-5 text-[clamp(3rem,4.7vw,5.6rem)] font-extrabold leading-[0.96] tracking-tight text-brand-navy"
            >
              Events Calendar
            </h2>
            <p className="mt-4 flex flex-nowrap items-center gap-2 text-[clamp(1.35rem,1.9vw,2rem)] font-extrabold leading-tight text-brand-purple-bright">
              <span>Connection. Community. Celebration.</span>
              <span className="shrink-0 text-brand-purple-bright/55">
                <TiltedHeartOutline />
              </span>
            </p>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-brand-navy/82">
              At Ava&apos;s Hub, we believe in creating meaningful experiences
              that build skills, confidence, friendships, and joyful memories.
            </p>

            <div className="mt-7 rounded-[1.65rem] bg-white/90 p-5 shadow-sm ring-1 ring-brand-teal/10">
              <div className="flex items-start gap-4">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-gold/25 text-brand-purple-bright">
                  <Icon name="heart" size="lg" />
                </span>
                <div>
                  <h3 className="text-lg font-extrabold leading-tight text-brand-navy">
                    Stay in the Loop!
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-navy/75">
                    Subscribe to receive monthly events and updates.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <CTAButton
                href="#upcoming-events-desktop"
                className="min-w-[12rem]"
              >
                View Calendar
              </CTAButton>
              <CTAButton
                href="#events-newsletter-desktop"
                variant="secondary"
                className="min-w-[12rem]"
              >
                Subscribe Now
              </CTAButton>
            </div>
          </div>

          <div className="overflow-hidden rounded-[4rem_2rem_4rem_2rem] bg-brand-teal-light shadow-card ring-1 ring-brand-purple-deep/10 xl:rounded-[7rem_3rem_7rem_3rem]">
            <PlaceholderImage
              src={eventsImages.mobileHeroBanner}
              alt="Ava's Hub events community hero"
              width={1182}
              height={1331}
              priority
              className="h-[min(76vh,48rem)] w-full object-cover object-[50%_32%]"
              sizes="(min-width: 1024px) 55vw, 100vw"
            />
          </div>
        </SectionContainer>
      </section>

      <section
        id="upcoming-events-desktop"
        className="py-12 xl:py-14"
        aria-labelledby="desktop-calendar-heading"
      >
        <SectionContainer>
          <div className="rounded-[2.25rem] bg-white/90 p-8 shadow-card ring-1 ring-brand-purple-deep/10 xl:p-10">
            <div className="mx-auto max-w-3xl text-center">
              <h2
                id="desktop-calendar-heading"
                className="inline-flex items-center justify-center gap-3 font-serif text-[clamp(2.25rem,3vw,3.5rem)] font-semibold leading-tight text-brand-navy"
              >
                <span>Upcoming Calendar</span>
                <span className="text-brand-purple-bright/55">
                  <TiltedHeartOutline />
                </span>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-brand-navy/70">
                Check back often. New events are added regularly.
              </p>
            </div>
            <div className="mt-8">
              <EventsCalendar events={events} variant="desktop" />
            </div>
          </div>
        </SectionContainer>
      </section>

      <section
        className="py-12 xl:py-14"
        aria-labelledby="desktop-event-highlights-heading"
      >
        <SectionContainer>
          <div className="rounded-[2.25rem] bg-[#fffaf4] p-8 shadow-card ring-1 ring-brand-teal/10 xl:p-10">
            <div className="mx-auto max-w-3xl text-center">
              <h2
                id="desktop-event-highlights-heading"
                className="inline-flex items-center justify-center gap-3 font-serif text-[clamp(2.15rem,2.8vw,3.25rem)] font-semibold leading-tight text-brand-navy"
              >
                <span>What&apos;s Coming Up</span>
                <span className="text-brand-purple-bright/55">
                  <TiltedHeartOutline />
                </span>
              </h2>
            </div>
            <div className="mt-8">
              <EventsHighlightsShowcase />
            </div>
          </div>
        </SectionContainer>
      </section>

      <section
        id="events-newsletter-desktop"
        className="py-12 xl:py-14"
        aria-labelledby="desktop-events-newsletter-heading"
      >
        <SectionContainer>
          <div className="grid overflow-hidden rounded-[2.25rem] bg-brand-lavender/40 shadow-card ring-1 ring-brand-purple-deep/10 xl:grid-cols-[0.46fr_0.54fr]">
            <div className="relative min-h-[24rem] bg-brand-teal-light">
              <PlaceholderImage
                src={eventsImages.mobileNewsletter}
                alt="Ava's Hub event updates"
                fill
                className="object-cover object-center"
                sizes="45vw"
              />
            </div>
            <div className="flex flex-col justify-center p-8 text-center xl:p-12">
              <span className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-white text-brand-purple-bright shadow-sm">
                <Icon name="email" size="lg" />
              </span>
              <h2
                id="desktop-events-newsletter-heading"
                className="mt-5 text-3xl font-extrabold text-brand-navy"
              >
                Stay Connected
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-brand-navy/80">
                Get updates about upcoming events, community activities,
                workshops, and new opportunities.
              </p>
              <div className="mx-auto mt-6 w-full max-w-xl">
                <EmailSignupForm placeholder="Enter your email address" source="events" />
              </div>
              <p className="mt-4 text-xs font-semibold text-brand-navy/60">
                We respect your privacy.
              </p>
            </div>
          </div>
        </SectionContainer>
      </section>

      <ResourceBottomCta
        title="Ready to Join the Community?"
        text="We'd love to welcome your family."
        buttonLabel="Schedule Consultation"
        buttonHref="/contact"
      />
    </div>
  );
}

export default async function EventsPage() {
  const events = await fetchAllEvents();

  return (
    <main className="flex-1 bg-[#fffaf4]">
      <MobileEventsPage events={events} />
      <DesktopEventsPage events={events} />
    </main>
  );
}
