import type { Metadata } from "next";
import { CTAButton } from "@/components/CTAButton";
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

type SupportPrompt = {
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
    lines: ["(908) 758-4692", "Monday - Friday: 8:00 AM - 8:00 PM"],
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
      "280 S Harrison Street, Suite 311",
      "East Orange, NJ",
      "Free parking available.",
    ],
  },
  {
    icon: "clock",
    title: "Office Hours",
    tone: "purple",
    lines: [
      "Monday - Friday: 8:00 AM - 8:00 PM",
      "Saturday - Sunday: 10:00 AM - 4:00 PM",
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

const supportPrompts: SupportPrompt[] = [
  {
    icon: "message",
    title: "We Listen",
    description: "We take time to understand your needs and goals.",
    tone: "purple",
  },
  {
    icon: "compass",
    title: "We Guide",
    description: "We'll help you find the right support for your loved one.",
    tone: "teal",
  },
  {
    icon: "handHeart",
    title: "We Care",
    description: "Your family's journey is our priority.",
    tone: "gold",
  },
];

const inputClass =
  "w-full rounded-xl border border-brand-teal/20 bg-white px-4 py-3 text-sm text-brand-navy shadow-sm outline-none transition placeholder:text-brand-navy/45 focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20";

const mobileInputClass =
  "w-full rounded-[1.1rem] border border-brand-teal/15 bg-white/95 px-5 py-4 text-sm font-medium text-brand-navy shadow-sm outline-none transition placeholder:text-brand-navy/45 focus:border-brand-purple-bright focus:ring-2 focus:ring-brand-purple-bright/20";

function MobileContactForm() {
  return (
    <form className="space-y-4">
      <div className="grid gap-4">
        <input
          name="firstName"
          type="text"
          autoComplete="given-name"
          required
          placeholder="First Name *"
          className={mobileInputClass}
          aria-label="First Name"
        />
        <input
          name="lastName"
          type="text"
          autoComplete="family-name"
          required
          placeholder="Last Name *"
          className={mobileInputClass}
          aria-label="Last Name"
        />
      </div>
      <input
        name="email"
        type="email"
        autoComplete="email"
        required
        placeholder="Email Address *"
        className={mobileInputClass}
        aria-label="Email Address"
      />
      <input
        name="phone"
        type="tel"
        autoComplete="tel"
        required
        placeholder="Phone Number *"
        className={mobileInputClass}
        aria-label="Phone Number"
      />
      <select
        name="helpTopic"
        required
        defaultValue=""
        className={mobileInputClass}
        aria-label="How can we help you?"
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
      <textarea
        name="message"
        rows={5}
        required
        placeholder="Message *"
        className={`${mobileInputClass} resize-y`}
        aria-label="Message"
      />
      <label className="flex gap-3 rounded-[1.1rem] bg-brand-teal-light/35 px-4 py-3 text-sm font-semibold leading-relaxed text-brand-navy/80">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-0.5 h-4 w-4 rounded border-brand-teal/30 text-brand-purple-bright focus:ring-brand-purple-bright"
        />
        <span>I consent to being contacted by Ava's Hub.</span>
      </label>
      <CTAButton type="submit" className="w-full !py-4">
        <span className="inline-flex items-center gap-2">
          Send Message
          <Icon name="paperPlane" size="sm" />
        </span>
      </CTAButton>
    </form>
  );
}

function MobileContactPage() {
  return (
    <div className="bg-[#fffaf4] md:hidden">
      <h1 className="sr-only">Contact Ava's Hub</h1>

      <section className="pb-8">
        <div className="bg-[#fffaf4]">
          <div className="mx-auto w-full overflow-hidden rounded-b-[2rem] bg-brand-teal-light shadow-card">
            <PlaceholderImage
              src={contactImages.mobileHeroBanner}
              alt="Ava's Hub contact mobile hero"
              width={1182}
              height={1331}
              priority
              className="block h-auto w-full"
              sizes="100vw"
            />
          </div>

          <div className="relative z-10 mx-6 -mt-12 rounded-[2rem] bg-[#fffaf4]/95 p-6 shadow-card ring-1 ring-brand-purple-deep/10">
            <h2 className="text-[clamp(2rem,9vw,2.35rem)] font-extrabold leading-[1.05] tracking-tight text-brand-navy">
              Let&apos;s Connect
            </h2>
            <p className="mt-3 text-xl font-extrabold leading-snug text-brand-purple-bright">
              We&apos;re here for you and your family{" "}
              <span className="text-brand-purple-bright/55">
                <TiltedHeartOutline />
              </span>
            </p>
            <p className="mt-5 text-base leading-relaxed text-brand-navy/85">
              Have a question, ready to get started, or want to learn more
              about Ava&apos;s Hub?
            </p>
            <p className="mt-3 text-base leading-relaxed text-brand-navy/85">
              Our team is here to help you every step of the way.
            </p>
            <div className="mt-6 space-y-3">
              {supportPrompts.map((item) => (
                <article
                  key={item.title}
                  className="grid w-full grid-cols-[3.5rem_1fr] items-center gap-4 rounded-[1.4rem] bg-white/90 p-4 shadow-sm ring-1 ring-brand-teal/10"
                >
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-full ${toneStyles[item.tone].icon}`}
                  >
                    <Icon name={item.icon} size="sm" />
                  </span>
                  <div>
                    <h3 className="text-base font-extrabold leading-tight text-brand-navy">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-brand-navy/70">
                      {item.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-10" aria-labelledby="mobile-contact-info-heading">
        <h2
          id="mobile-contact-info-heading"
          className="font-serif text-[1.85rem] font-semibold leading-tight text-brand-navy"
        >
          Get in Touch
          <span className="ml-2 text-brand-purple-bright/55">
            <TiltedHeartOutline />
          </span>
        </h2>
        <div className="mt-6 space-y-4">
          {contactItems.map((item) => (
            <article
              key={item.title}
              className="rounded-[1.75rem] bg-white/95 p-5 shadow-card ring-1 ring-brand-teal/10"
            >
              <div className="flex gap-4">
                <span
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${toneStyles[item.tone].icon}`}
                >
                  <Icon name={item.icon} size="lg" />
                </span>
                <div>
                  <h3 className={`text-lg font-extrabold ${toneStyles[item.tone].text}`}>
                    {item.title}
                  </h3>
                  <div className="mt-2 space-y-1">
                    {item.lines.map((line) => (
                      <p key={line} className="text-sm leading-relaxed text-brand-navy/80">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="px-6 pb-10" aria-labelledby="mobile-message-heading">
        <div className="rounded-[1.75rem] bg-white/95 p-6 shadow-card ring-1 ring-brand-purple-deep/10">
          <h2
            id="mobile-message-heading"
            className="flex flex-nowrap items-center gap-2 font-serif text-[clamp(1.45rem,7vw,1.75rem)] font-semibold leading-tight text-brand-navy"
          >
            <span className="min-w-0 shrink">Send Us a Message</span>
            <span className="shrink-0 text-[0.9em] text-brand-purple-bright/55">
              <TiltedHeartOutline />
            </span>
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-brand-navy/75">
            We&apos;d love to hear from you.
          </p>
          <div className="mt-6">
            <MobileContactForm />
          </div>
        </div>
      </section>

      <section className="px-6 pb-10" aria-labelledby="mobile-find-us-heading">
        <div className="rounded-[1.75rem] bg-white/95 p-5 shadow-card ring-1 ring-brand-teal/10">
          <h2
            id="mobile-find-us-heading"
            className="font-serif text-[1.85rem] font-semibold leading-tight text-brand-navy"
          >
            Find Us
            <span className="ml-2 text-brand-purple-bright/55">
              <TiltedHeartOutline />
            </span>
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-brand-navy/75">
            We&apos;re excited to welcome your family.
          </p>
          <div className="mt-6 overflow-hidden rounded-[1.4rem] ring-1 ring-brand-teal/10">
            <div className="relative aspect-[4/3]">
              <iframe
                title="Ava's Hub location on Google Maps"
                src={MAP_EMBED_SRC}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
          <div className="mt-5 rounded-[1.25rem] bg-brand-teal-light/45 px-5 py-4 text-center ring-1 ring-brand-teal/10">
            <p className="font-bold text-brand-teal">Ava&apos;s Hub</p>
            <p className="mt-1 text-sm leading-relaxed text-brand-navy/85">
              280 S Harrison Street
              <br />
              Suite 311
              <br />
              East Orange NJ
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 pb-10" aria-labelledby="mobile-values-heading">
        <h2
          id="mobile-values-heading"
          className="font-serif text-[1.85rem] font-semibold leading-tight text-brand-navy"
        >
          Support That Feels Personal
          <span className="ml-2 text-brand-purple-bright/55">
            <TiltedHeartOutline />
          </span>
        </h2>
        <div className="-mx-6 mt-6 overflow-x-auto px-6 pb-2">
          <div className="flex min-w-max snap-x snap-mandatory gap-4">
            {featureItems.map((item) => (
              <article
                key={item.title}
                className="w-[76vw] max-w-[19rem] snap-start rounded-[1.75rem] bg-white/95 p-6 text-center shadow-card ring-1 ring-brand-teal/10"
              >
                <span
                  className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${toneStyles[item.tone].icon}`}
                >
                  <Icon name={item.icon} size="lg" />
                </span>
                <h3 className="mt-5 text-lg font-extrabold leading-tight text-brand-navy">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-brand-navy/70">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact-newsletter" className="px-6 pb-10" aria-labelledby="contact-newsletter-heading">
        <div className="overflow-hidden rounded-[1.75rem] bg-brand-lavender/45 shadow-card ring-1 ring-brand-purple-deep/10">
          <div className="relative h-40 bg-brand-teal-light">
            <PlaceholderImage
              src={contactImages.mobileNewsletter}
              alt="Ava's Hub contact updates"
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
              id="contact-newsletter-heading"
              className="mt-4 text-2xl font-extrabold text-brand-navy"
            >
              Stay Connected
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-brand-navy/80">
              Get updates about programs, events, and resources.
            </p>
            <div className="mt-5">
              <EmailSignupForm placeholder="Enter your email address" />
            </div>
          </div>
        </div>
      </section>

      <ResourceBottomCta
        title="Ready To Take The Next Step?"
        text="We'd love to meet your family."
      />
    </div>
  );
}

export default function ContactPage() {
  return (
    <main className="flex-1 bg-white">
      <MobileContactPage />
      <div className="hidden md:block">
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
                    280 S Harrison Street, Suite 311
                    <br />
                    East Orange, NJ
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
      </div>
    </main>
  );
}
