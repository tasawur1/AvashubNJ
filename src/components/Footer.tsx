import Link from "next/link";
import { CTAButton } from "./CTAButton";
import { Icon } from "./Icon";
import { PlaceholderImage } from "./PlaceholderImage";
import { SectionContainer } from "./SectionContainer";
import { siteImages } from "@/data/images";

const socials = [
  {
    label: "Facebook",
    href: "#",
    d: "M22 12a10 10 0 10-11.5 10v-7h-2V12h2V9.5c0-2 1.2-3.1 3-3.1.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2V12h2.2l-.4 3h-1.8v7A10 10 0 0022 12z",
  },
  {
    label: "Instagram",
    href: "#",
    d: "M12 7.2a4.8 4.8 0 100 9.6 4.8 4.8 0 000-9.6zm0-2a6.8 6.8 0 110 13.6A6.8 6.8 0 0112 5.2zm7.8-.6a1.6 1.6 0 11-3.2 0 1.6 1.6 0 013.2 0z",
  },
  {
    label: "TikTok",
    href: "#",
    d: "M21 8.5c-2.2 0-4-1.6-4.3-3.7V17a5.5 5.5 0 11-5.5-5.5c.2 0 .4 0 .6.1v3a2.5 2.5 0 102.5 2.4V3h3.1c.2 2.2 2 3.9 4.1 3.9V8.5h-.5z",
  },
  {
    label: "YouTube",
    href: "#",
    d: "M21.6 7.2a2.4 2.4 0 00-1.7-1.7C18 5 12 5 12 5s-6 0-7.9.5A2.4 2.4 0 002.4 7.2 25 25 0 002 12a25 25 0 00.4 4.8 2.4 2.4 0 001.7 1.7c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a2.4 2.4 0 001.7-1.7 25 25 0 00.4-4.8 25 25 0 00-.4-4.8zM10 15.5v-7l6 3.5-6 3.5z",
  },
];

export function Footer() {
  return (
    <footer className="mt-auto bg-gradient-to-br from-brand-teal via-brand-teal to-brand-purple-deep text-white">
      <SectionContainer className="py-14 sm:py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div>
            <Link
              href="/"
              className="inline-flex rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
            >
              <span className="sr-only">Ava&apos;s Hub home</span>
              <PlaceholderImage
                src={siteImages.logo}
                alt="Ava's Hub"
                width={180}
                height={64}
                priority
                className="h-auto w-40 object-contain sm:w-44"
              />
            </Link>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/90 sm:text-base">
              Occupational therapy-based life skills and independence
              programming for neurodiverse kids, teens, and young adults in a
              warm, inclusive environment.
            </p>
            <address className="mt-8 not-italic text-sm leading-relaxed text-white/95 sm:text-base">
              <p className="flex items-center gap-2 font-semibold">
                <Icon name="location" className="text-brand-gold" />
                Visit us
              </p>
              <p className="mt-2 pl-7">
                280 S Harrison Street, 3rd Floor, Suite 301
                <br />
                East Orange, NJ 07018
              </p>
            </address>
            <div className="mt-6 space-y-3 text-sm sm:text-base">
              <p className="flex items-center gap-2.5">
                <Icon name="phone" className="shrink-0 text-brand-gold" />
                <a
                  href="tel:+19087584692"
                  className="font-semibold underline decoration-brand-gold decoration-2 underline-offset-4 hover:text-brand-gold"
                >
                  (908) 758-4692
                </a>
              </p>
              <p className="flex items-center gap-2.5">
                <Icon name="email" className="shrink-0 text-brand-gold" />
                <a
                  href="mailto:info@avashub.com"
                  className="underline decoration-brand-gold/80 decoration-1 underline-offset-4 hover:text-brand-gold"
                >
                  info@avashub.com
                </a>
              </p>
            </div>
            <ul className="mt-8 flex flex-wrap gap-3" aria-label="Social media">
              {socials.map((s) => (
                <li key={s.label}>
                  <Link
                    href={s.href}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-brand-gold hover:text-brand-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
                    aria-label={`${s.label} (placeholder link)`}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5 fill-current"
                      aria-hidden
                    >
                      <path d={s.d} />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl bg-white/10 p-7 ring-1 ring-white/20 backdrop-blur-sm sm:p-9">
            <p className="flex flex-wrap items-center gap-2 text-lg font-bold leading-snug sm:text-xl">
              Let&apos;s Start the Journey Together!
              <Icon name="heart" className="text-brand-gold" size="lg" />
            </p>
            <p className="mt-4 text-sm leading-relaxed text-white/90 sm:text-base">
              Ready to see our space and meet our team? We&apos;d love to show
              you around.
            </p>
            <div className="mt-7">
              <CTAButton
                href="/contact"
                variant="secondary"
                className="!border-white !bg-brand-gold !text-brand-navy hover:!bg-white"
              >
                Schedule a Tour
              </CTAButton>
            </div>
          </div>
        </div>
        <p className="mt-12 border-t border-white/20 pt-8 text-center text-xs text-white/75 sm:text-sm">
          © {new Date().getFullYear()} Ava&apos;s Hub. All rights reserved.
        </p>
      </SectionContainer>
    </footer>
  );
}
