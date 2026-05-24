import type { Metadata } from "next";
import { ClosingCtaBanner } from "@/components/page/ClosingCtaBanner";
import { EventsCalendar } from "@/components/page/EventsCalendar";
import { EventsHighlightsShowcase } from "@/components/page/EventsHighlightsShowcase";
import { HeroBanner } from "@/components/HeroBanner";
import { SectionContainer } from "@/components/SectionContainer";
import { SectionHeadingDecorated } from "@/components/SectionHeadingDecorated";
import { eventsImages } from "@/data/pageImages/eventsImages";
import { fetchAllEvents } from "@/lib/fetchEvents";
import {
  cardInnerPad,
  cardShell,
  cardShellSoft,
  innerContentWrap,
  pageSectionPad,
} from "@/lib/pageSectionStyles";

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

export default async function EventsPage() {
  const events = await fetchAllEvents();

  return (
    <main className="flex-1 bg-white">
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
    </main>
  );
}
