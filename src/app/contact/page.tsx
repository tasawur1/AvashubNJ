import type { Metadata } from "next";
import Link from "next/link";
import { CTAButton } from "@/components/CTAButton";
import { HeroBanner } from "@/components/HeroBanner";
import { Icon } from "@/components/Icon";
import { SectionContainer } from "@/components/SectionContainer";
import { SectionHeadingDecorated } from "@/components/SectionHeadingDecorated";
import { MAP_EMBED_SRC } from "@/data/pageContent/contactContent";
import { contactImages } from "@/data/pageImages/contactImages";
import type { IconName } from "@/data/icons";
import {
  cardInnerPad,
  cardShell,
  cardShellSoft,
  innerContentWrap,
  pageSectionPad,
} from "@/lib/pageSectionStyles";

export const metadata: Metadata = {
  title:
    "Contact Ava's Hub | Pediatric OT, Life Skills & Family Support in East Orange NJ",
  description:
    "Contact Ava's Hub in East Orange, NJ to schedule a tour, ask questions, or learn more about occupational therapy-based life skills, family support, and programs for kids, teens, and young adults.",
  alternates: { canonical: "/contact" },
  openGraph: {
    url: "/contact",
    title:
      "Contact Ava's Hub | Pediatric OT, Life Skills & Family Support in East Orange NJ",
    description:
      "Schedule a tour, ask questions, or learn more about OT-based life skills, family support, and programs at Ava's Hub.",
  },
};

type Tone = "purple" | "teal" | "gold";

type ContactItem = {
  icon: IconName;
  title: string;
  lines: string[];
  tone: Tone;
};

type FeatureItem = {
  icon: IconName;
  title: string;
  description: string;
  tone: Tone;
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

const contactItems: ContactItem[] = [
  {
    icon: "phone",
    title: "Call Us",
    tone: "purple",
    lines: ["(908) 758-4692", "Mon - Fri: 8:00 AM - 6:00 PM"],
  },
  {
    icon: "email",
    title: "Email Us",
    tone: "teal",
    lines: ["info@avashub.com", "We typically respond within 24 hours."],
  },
  {
    icon: "location",
    title: "Visit Us",
    tone: "gold",
    lines: [
      "280 S Harrison Street, 3rd Floor, Suite 301",
      "East Orange, NJ 07018",
      "Free parking available.",
    ],
  },
  {
    icon: "clock",
    title: "Office Hours",
    tone: "purple",
    lines: [
      "Monday - Friday: 8:00 AM - 6:00 PM",
      "Saturday: By Appointment",
      "Sunday: Closed",
    ],
  },
];

const featureItems: FeatureItem[] = [
  {
    icon: "community",
    title: "Personalized Support",
    description: "Every family is unique. We tailor support to your goals.",
    tone: "purple",
  },
  {
    icon: "shieldHeart",
    title: "Evidence-Based Care",
    description: "Our programs and therapies are rooted in best practices.",
    tone: "teal",
  },
  {
    icon: "heart",
    title: "Compassionate Team",
    description: "We treat your family like our family.",
    tone: "gold",
  },
  {
    icon: "home",
    title: "Community Focused",
    description:
      "Proudly serving families in East Orange and surrounding areas.",
    tone: "teal",
  },
];

const inputClass =
  "w-full rounded-xl border border-brand-teal/20 bg-white px-4 py-3 text-sm text-brand-navy shadow-sm outline-none transition placeholder:text-brand-navy/45 focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20";

export default function ContactPage() {
  return (
    <main className="flex-1 bg-white">
      <h1 className="sr-only">Contact Ava's Hub</h1>
      <HeroBanner
        images={{
          desktop: contactImages.contactHeroBanner,
          mobile: contactImages.contactHeroBannerMobile,
        }}
        alt="Ava's Hub contact hero banner"
        showCtas={false}
      />

      <section
        className={`bg-white ${pageSectionPad}`}
        aria-labelledby="contact-heading"
      >
        <SectionContainer>
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10">
            <div className={cardShell}>
              <div className={cardInnerPad}>
                <SectionHeadingDecorated
                  id="contact-heading"
                  title="Get in Touch"
                  className="mb-8"
                />
                <div className="space-y-6">
                  {contactItems.map((item, index) => (
                    <div
                      key={item.title}
                      className={
                        `flex gap-4 pb-6 ` +
                        (index === contactItems.length - 1
                          ? "pb-0"
                          : "border-b border-brand-teal/10")
                      }
                    >
                      <span
                        className={`inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${toneStyles[item.tone].icon}`}
                      >
                        <Icon name={item.icon} size="lg" />
                      </span>
                      <div>
                        <h2 className={`text-lg font-bold ${toneStyles[item.tone].text}`}>
                          {item.title}
                        </h2>
                        <div className="mt-2 space-y-1">
                          {item.lines.map((line) => (
                            <p
                              key={line}
                              className="text-sm leading-relaxed text-brand-navy/85"
                            >
                              {line}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={cardShell}>
              <div className={cardInnerPad}>
                <SectionHeadingDecorated
                  id="message-heading"
                  title="Send Us a Message"
                  subtitle="We'd love to hear from you!"
                  className="mb-8"
                />
                <form className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="first-name" className="sr-only">
                        First Name
                      </label>
                      <input
                        id="first-name"
                        name="firstName"
                        type="text"
                        autoComplete="given-name"
                        required
                        placeholder="First Name *"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="last-name" className="sr-only">
                        Last Name
                      </label>
                      <input
                        id="last-name"
                        name="lastName"
                        type="text"
                        autoComplete="family-name"
                        required
                        placeholder="Last Name *"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="email" className="sr-only">
                        Email Address
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        placeholder="Email Address *"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="sr-only">
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        required
                        placeholder="Phone Number *"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="help-topic" className="sr-only">
                      How can we help you?
                    </label>
                    <select
                      id="help-topic"
                      name="helpTopic"
                      required
                      defaultValue=""
                      className={inputClass}
                    >
                      <option value="" disabled>
                        How can we help you? *
                      </option>
                      <option value="schedule-tour">Schedule a tour</option>
                      <option value="programs">Learn about programs</option>
                      <option value="family-support">Family support</option>
                      <option value="resources">Resources</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="sr-only">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      placeholder="Message *"
                      className={`${inputClass} resize-y`}
                    />
                  </div>

                  <label className="flex gap-3 text-sm font-medium text-brand-navy/80">
                    <input
                      type="checkbox"
                      name="consent"
                      required
                      className="mt-0.5 h-4 w-4 rounded border-brand-teal/30 text-brand-purple-deep focus:ring-brand-teal"
                    />
                    <span>I consent to being contacted by Ava's Hub.</span>
                  </label>

                  <CTAButton type="submit" className="w-full">
                    <span className="inline-flex items-center gap-2">
                      Send Message
                      <Icon name="email" size="sm" />
                    </span>
                  </CTAButton>
                </form>
              </div>
            </div>
          </div>
        </SectionContainer>
      </section>

      <section
        className={`bg-gradient-to-b from-brand-lavender/25 to-white ${pageSectionPad}`}
        aria-labelledby="find-us-heading"
      >
        <SectionContainer>
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
            <div className={cardShell}>
              <div className={cardInnerPad}>
                <h2
                  id="find-us-heading"
                  className="text-center text-2xl font-bold text-brand-teal sm:text-[1.75rem]"
                >
                  Find Us
                </h2>
                <div className="mt-6 overflow-hidden rounded-2xl ring-1 ring-brand-teal/10">
                  <div className="relative aspect-[16/9] min-h-[240px]">
                    <iframe
                      title="Ava's Hub location on Google Maps"
                      src={MAP_EMBED_SRC}
                      className="absolute inset-0 h-full w-full border-0"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
                <div className="mt-5 rounded-2xl bg-brand-teal-light/45 px-5 py-4 text-center ring-1 ring-brand-teal/10">
                  <p className="font-bold text-brand-teal">Ava's Hub</p>
                  <p className="mt-1 text-sm leading-relaxed text-brand-navy/85">
                    280 S Harrison Street, 3rd Floor, Suite 301
                    <br />
                    East Orange, NJ 07018
                  </p>
                </div>
              </div>
            </div>

            <aside className={`${cardShellSoft} overflow-hidden`}>
              <div className="grid h-full gap-6 p-6 sm:p-7 lg:grid-cols-[1fr_auto] lg:items-center lg:p-8">
                <div>
                  <h2 className="text-2xl font-bold text-brand-purple-deep">
                    Ready to Take the Next Step?
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-brand-navy/85 sm:text-base">
                    Schedule a tour, ask questions, or learn more about our
                    programs. We can't wait to meet you!
                  </p>
                  <CTAButton href="/contact" className="mt-6 w-full sm:w-auto">
                    <span className="inline-flex items-center gap-2">
                      <Icon name="calendar" size="sm" />
                      Schedule a Tour
                    </span>
                  </CTAButton>
                </div>
                <Icon
                  name="family"
                  className="hidden text-brand-purple-deep lg:block"
                  size="2x"
                />
              </div>
            </aside>
          </div>
        </SectionContainer>
      </section>

      <section className={`bg-white ${pageSectionPad}`} aria-label="Contact support features">
        <SectionContainer>
          <div className="overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-brand-teal/10">
            <div className="grid gap-0 sm:grid-cols-2 lg:grid-cols-4">
              {featureItems.map((item, index) => (
                <div
                  key={item.title}
                  className={
                    `flex gap-4 px-5 py-6 text-left sm:flex-col sm:items-center sm:text-center lg:min-h-40 lg:justify-center ` +
                    (index === 0 ? "" : "lg:border-l lg:border-brand-teal/15")
                  }
                >
                  <Icon
                    name={item.icon}
                    size="2x"
                    className={toneStyles[item.tone].text}
                  />
                  <div>
                    <h3 className="text-sm font-bold text-brand-teal">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-brand-navy/80 sm:text-sm">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionContainer>
      </section>

      <section className="pb-10 sm:pb-12 lg:pb-14" aria-label="Contact encouragement">
        <SectionContainer>
          <div className="rounded-3xl bg-gradient-to-r from-brand-purple-deep to-brand-purple-bright px-6 py-6 text-center text-white shadow-card sm:px-8 lg:px-12">
            <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-4 sm:flex-row">
              <Icon name="heart" className="text-brand-gold" size="2x" />
              <p className="text-base font-bold leading-relaxed sm:text-lg">
                You don't have to do this alone. We're here every step of the
                way. Together, we build skills. Together, we build independence.
                Together, we build futures.
              </p>
            </div>
          </div>
        </SectionContainer>
      </section>
    </main>
  );
}
