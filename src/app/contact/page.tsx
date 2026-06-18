import type { Metadata } from "next";
import { ContactForm } from "@/components/page/ContactForm";
import { Icon } from "@/components/Icon";
import { EmailSignupForm } from "@/components/page/EmailSignupForm";
import {
  ResourceBottomCta,
  TiltedHeartOutline,
} from "@/components/page/ResourceMobileComponents";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { SectionContainer } from "@/components/SectionContainer";
import { MAP_EMBED_SRC } from "@/data/pageContent/contactContent";
import { contactImages } from "@/data/pageImages/contactImages";
import type { IconName } from "@/data/icons";
import { IntakePillButtons } from "@/components/intake/IntakePillButtons";

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
    lines: ["(973) 905-5255"],
  },
  {
    icon: "email",
    title: "Email Us",
    tone: "teal",
    lines: ["hello@avashubnj.com"],
  },
  {
    icon: "fax",
    title: "Fax",
    tone: "purple",
    lines: ["(973) 567-7700"],
  },
  {
    icon: "location",
    title: "Visit Us",
    tone: "gold",
    lines: ["280 S Harrison Street", "Suite 311", "East Orange NJ"],
  },
  {
    icon: "clock",
    title: "Office Hours",
    tone: "purple",
    lines: [
      "Monday–Friday: 8:00 AM – 8:00 PM",
      "Saturday–Sunday: 10:00 AM – 4:00 PM",
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
    description:
      "Our programs are rooted in best practices and real-life participation.",
    tone: "teal",
  },
  {
    icon: "heart",
    title: "Compassionate Team",
    description: "We treat your family like family.",
    tone: "gold",
  },
  {
    icon: "home",
    title: "Community Focused",
    description: "Supporting families inside and outside the therapy room.",
    tone: "teal",
  },
];


function MobileContactPage() {
  return (
    <div className="bg-[#fffaf4] xl:hidden">
      <h1 className="sr-only">Contact Ava&apos;s Hub</h1>

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
            <p className="mt-5 text-sm italic leading-relaxed text-brand-navy/70">
              Intake forms for each service will be available here soon.
            </p>
            <IntakePillButtons />
          </div>
        </div>
      </section>

      <section
        className="px-6 pb-10"
        aria-labelledby="mobile-contact-info-heading"
      >
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
                  <h3
                    className={`text-lg font-extrabold ${toneStyles[item.tone].text}`}
                  >
                    {item.title}
                  </h3>
                  <div className="mt-2 space-y-1">
                    {item.lines.map((line) => (
                      <p
                        key={line}
                        className="text-sm leading-relaxed text-brand-navy/80"
                      >
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

      <section
        className="px-6 pb-10"
        aria-labelledby="mobile-message-heading"
      >
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
            <ContactForm variant="mobile" />
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
            <div className="relative aspect-[4/5] min-h-[26rem]">
              <iframe
                title="Ava's Hub location on Google Maps"
                src={MAP_EMBED_SRC}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-10" aria-labelledby="mobile-values-heading">
        <h2
          id="mobile-values-heading"
          className="flex flex-nowrap items-center gap-2 font-serif text-[clamp(1.35rem,6.2vw,1.65rem)] font-semibold leading-tight text-brand-navy"
        >
          <span className="min-w-0 shrink whitespace-nowrap">
            Support That Feels Personal
          </span>
          <span className="shrink-0 text-[0.9em] text-brand-purple-bright/55">
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

      <section
        id="contact-newsletter"
        className="px-6 pb-10"
        aria-labelledby="contact-newsletter-heading"
      >
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
              <EmailSignupForm placeholder="Enter your email address" source="contact" />
            </div>
          </div>
        </div>
      </section>

      <ResourceBottomCta
        title="Ready To Take The Next Step?"
        text="We'd love to meet your family."
        buttonLabel="Schedule Consultation"
        buttonHref="#mobile-message-heading"
      />
    </div>
  );
}

function DesktopContactPage() {
  return (
    <div className="hidden bg-[#fffaf4] xl:block">
      <h1 className="sr-only">Contact Ava&apos;s Hub</h1>

      <section
        className="py-9 xl:py-12"
        aria-labelledby="desktop-contact-hero-heading"
      >
        <SectionContainer className="grid min-h-[74vh] items-center gap-10 xl:grid-cols-[0.43fr_0.57fr] xl:gap-12 2xl:gap-16">
          <div className="rounded-[2.25rem] bg-[#fffaf4]/95 p-8 shadow-card ring-1 ring-brand-purple-deep/10 xl:p-10 2xl:p-12">
            <p className="inline-flex rounded-full bg-brand-lavender px-4 py-2 text-sm font-extrabold uppercase tracking-normal text-brand-purple-bright">
              Get In Touch
            </p>
            <h2
              id="desktop-contact-hero-heading"
              className="mt-5 text-[clamp(3rem,4.7vw,5.6rem)] font-extrabold leading-[0.96] tracking-tight text-brand-navy"
            >
              Let&apos;s Connect
            </h2>
            <p className="mt-4 flex flex-nowrap items-center gap-2 text-[clamp(1.35rem,1.9vw,2rem)] font-extrabold leading-tight text-brand-purple-bright">
              <span>We&apos;re here for you and your family</span>
              <span className="shrink-0 text-brand-purple-bright/55">
                <TiltedHeartOutline />
              </span>
            </p>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-brand-navy/82">
              Have a question, ready to get started, or want to learn more about
              Ava&apos;s Hub? Our team is here to help you every step of the way.
            </p>

            <IntakePillButtons className="max-w-xl" />
          </div>

          <div className="overflow-hidden rounded-[4rem_2rem_4rem_2rem] bg-brand-teal-light shadow-card ring-1 ring-brand-purple-deep/10 xl:rounded-[7rem_3rem_7rem_3rem]">
            <PlaceholderImage
              src={contactImages.mobileHeroBanner}
              alt="Ava's Hub team ready to connect with your family"
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
        className="py-12 xl:py-14"
        aria-labelledby="desktop-contact-info-heading"
      >
        <SectionContainer>
          <div className="mb-8 text-center">
            <h2
              id="desktop-contact-info-heading"
              className="inline-flex items-center justify-center gap-3 font-serif text-[clamp(2.25rem,3vw,3.5rem)] font-semibold leading-tight text-brand-navy"
            >
              <span>Get in Touch</span>
              <span className="text-brand-purple-bright/55">
                <TiltedHeartOutline />
              </span>
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
            {contactItems.map((item) => (
              <article
                key={item.title}
                className="rounded-[1.75rem] bg-white/95 p-5 shadow-card ring-1 ring-brand-teal/10"
              >
                <span
                  className={`flex h-14 w-14 items-center justify-center rounded-full ${toneStyles[item.tone].icon}`}
                >
                  <Icon name={item.icon} size="lg" />
                </span>
                <h3
                  className={`mt-4 text-lg font-extrabold ${toneStyles[item.tone].text}`}
                >
                  {item.title}
                </h3>
                <div className="mt-2 space-y-1">
                  {item.lines.map((line) => (
                    <p
                      key={line}
                      className="text-sm leading-relaxed text-brand-navy/80"
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </SectionContainer>
      </section>

      <section
        id="desktop-message-form"
        className="py-12 xl:py-14"
        aria-label="Message and location"
      >
        <SectionContainer>
          <div className="grid gap-8 xl:grid-cols-[0.58fr_0.42fr] xl:gap-10">
            <div className="rounded-[2.25rem] bg-white/95 p-8 shadow-card ring-1 ring-brand-purple-deep/10 xl:p-10">
              <h2
                id="desktop-message-heading"
                className="flex flex-nowrap items-center gap-3 font-serif text-[clamp(1.8rem,2.5vw,2.5rem)] font-semibold leading-tight text-brand-navy"
              >
                <span className="min-w-0 shrink">Send Us a Message</span>
                <span className="shrink-0 text-brand-purple-bright/55">
                  <TiltedHeartOutline />
                </span>
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-brand-navy/75">
                We&apos;d love to hear from you.
              </p>
              <div className="mt-6">
                <ContactForm variant="desktop" />
              </div>
            </div>

            <div className="rounded-[2.25rem] bg-white/95 p-8 shadow-card ring-1 ring-brand-teal/10 xl:p-10">
              <h2
                id="desktop-find-us-heading"
                className="inline-flex items-center gap-3 font-serif text-[clamp(1.8rem,2.5vw,2.5rem)] font-semibold leading-tight text-brand-navy"
              >
                Find Us
                <span className="text-brand-purple-bright/55">
                  <TiltedHeartOutline />
                </span>
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-brand-navy/75">
                We&apos;re excited to welcome your family.
              </p>
              <div className="mt-6 overflow-hidden rounded-[1.5rem] ring-1 ring-brand-teal/10">
                <div className="relative h-[34rem] max-h-[calc(100vh-14rem)] min-h-[28rem]">
                  <iframe
                    title="Ava's Hub location on Google Maps"
                    src={MAP_EMBED_SRC}
                    className="absolute inset-0 h-full w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>
        </SectionContainer>
      </section>

      <section
        className="py-12 xl:py-14"
        aria-labelledby="desktop-values-heading"
      >
        <SectionContainer>
          <div className="mb-8 text-center">
            <h2
              id="desktop-values-heading"
              className="inline-flex items-center justify-center gap-3 font-serif text-[clamp(2.15rem,2.8vw,3.25rem)] font-semibold leading-tight text-brand-navy"
            >
              <span>Support That Feels Personal</span>
              <span className="text-brand-purple-bright/55">
                <TiltedHeartOutline />
              </span>
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {featureItems.map((item) => (
              <article
                key={item.title}
                className="rounded-[1.75rem] bg-white/95 p-8 text-center shadow-card ring-1 ring-brand-teal/10"
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
        </SectionContainer>
      </section>

      <section
        id="contact-newsletter-desktop"
        className="py-12 xl:py-14"
        aria-labelledby="desktop-contact-newsletter-heading"
      >
        <SectionContainer>
          <div className="grid overflow-hidden rounded-[2.25rem] bg-brand-lavender/40 shadow-card ring-1 ring-brand-purple-deep/10 xl:grid-cols-[0.46fr_0.54fr]">
            <div className="relative min-h-[24rem] bg-brand-teal-light">
              <PlaceholderImage
                src={contactImages.mobileNewsletter}
                alt="Ava's Hub contact updates"
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
                id="desktop-contact-newsletter-heading"
                className="mt-5 text-3xl font-extrabold text-brand-navy"
              >
                Stay Connected
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-brand-navy/80">
                Get updates about programs, events, and resources.
              </p>
              <div className="mx-auto mt-6 w-full max-w-xl">
                <EmailSignupForm placeholder="Enter your email address" source="contact" />
              </div>
              <p className="mt-4 text-xs font-semibold text-brand-navy/60">
                We respect your privacy.
              </p>
            </div>
          </div>
        </SectionContainer>
      </section>

      <ResourceBottomCta
        title="Ready To Take The Next Step?"
        text="We'd love to meet your family."
        buttonLabel="Schedule Consultation"
        buttonHref="#desktop-message-form"
      />
    </div>
  );
}

export default function ContactPage() {
  return (
    <main className="flex-1 bg-[#fffaf4]">
      <MobileContactPage />
      <DesktopContactPage />
    </main>
  );
}
