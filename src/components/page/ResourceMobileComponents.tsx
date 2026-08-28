"use client";

import { CTAButton } from "@/components/CTAButton";
import { Icon } from "@/components/Icon";
import { EmailSignupForm } from "@/components/page/EmailSignupForm";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { SectionContainer } from "@/components/SectionContainer";
import { useResourceDownloadGate } from "@/components/page/ResourceDownloadGate";

type DownloadCardProps = {
  title: string;
  description: string;
  image: string;
  href: string;
  category?: string;
  fileSize?: string;
  buttonLabel?: string;
  /**
   * When set, renders two buttons instead of one — "View" (opens `href`
   * in a new tab) and "Download" (saves this URL). Omit to keep the
   * original single-button behavior.
   */
  downloadHref?: string;
};

type ResourceBottomCtaProps = {
  title: string;
  text: string;
  buttonLabel?: string;
  buttonHref?: string;
};

export function TiltedHeartOutline({ className = "" }: { className?: string }) {
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

export function MobileSectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div>
      <h2 className="font-serif text-[1.85rem] font-semibold leading-tight text-brand-navy">
        {title}
        <span className="ml-2 text-brand-purple-bright/55">
          <TiltedHeartOutline />
        </span>
      </h2>
      {subtitle ? (
        <p className="mt-3 text-sm leading-relaxed text-brand-navy/75">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

function EyeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M1 12S5 4 12 4s11 8 11 8-4 8-11 8S1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function MobileDownloadCard({
  title,
  description,
  image,
  href,
  category,
  fileSize,
  buttonLabel = "Download",
  downloadHref,
}: DownloadCardProps) {
  const { requestAccess } = useResourceDownloadGate();

  return (
    <article className="overflow-hidden rounded-[1.75rem] bg-white/95 shadow-card ring-1 ring-brand-teal/10">
      <div className="relative h-44 bg-brand-teal-light">
        <PlaceholderImage
          src={image}
          alt={title}
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>
      <div className="p-5">
        {category ? (
          <div className="flex flex-wrap gap-1.5">
            {category
              .split(",")
              .map((c) => c.trim())
              .filter(Boolean)
              .map((c) => (
                <span
                  key={c}
                  className="rounded-full bg-brand-lavender px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-normal text-brand-purple-deep"
                >
                  {c}
                </span>
              ))}
          </div>
        ) : null}
        <h3 className="mt-2 text-lg font-extrabold leading-tight text-brand-navy">
          {title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-brand-navy/75">
          {description}
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          {fileSize ? (
            <span className="rounded-full bg-brand-lavender px-3 py-1 text-xs font-bold text-brand-purple-deep">
              {fileSize}
            </span>
          ) : (
            <span />
          )}
          {downloadHref ? (
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => requestAccess({ href, download: false })}
                className="inline-flex items-center justify-center gap-1.5 rounded-full border border-brand-purple-deep/20 px-3.5 py-2 text-xs font-bold text-brand-purple-deep transition hover:bg-brand-lavender"
              >
                <EyeIcon />
                View
              </button>
              <button
                type="button"
                onClick={() => requestAccess({ href: downloadHref, download: true })}
                className="inline-flex items-center justify-center gap-1.5 rounded-full bg-brand-purple-bright px-3.5 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-brand-purple-deep"
              >
                <Icon name="resources" size="sm" />
                Download
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => requestAccess({ href, download: true })}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-purple-bright px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-brand-purple-deep"
            >
              <Icon name="resources" size="sm" />
              {buttonLabel}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export function ResourceNewsletterCard() {
  return (
    <section className="px-6 pb-10" aria-labelledby="mobile-newsletter-heading">
      <div className="overflow-hidden rounded-[1.75rem] bg-brand-lavender/45 shadow-card ring-1 ring-brand-purple-deep/10">
        <div className="relative h-40 bg-brand-teal-light">
          <PlaceholderImage
            src="/images/resources/mobile/newsletter-card.png"
            alt="Family resource updates from Ava's Hub"
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
            id="mobile-newsletter-heading"
            className="mt-4 text-2xl font-extrabold text-brand-navy"
          >
            Stay Informed
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-brand-navy/80">
            Get new printables, resource updates, and helpful tips-right to your
            inbox.
          </p>
          <div className="mt-5">
            <EmailSignupForm placeholder="Enter your email address" source="resources" />
          </div>
          <p className="mt-4 text-xs font-semibold text-brand-navy/60">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}

export function ResourceBottomCta({
  title,
  text,
  buttonLabel = "Schedule Consultation",
  buttonHref = "/contact",
}: ResourceBottomCtaProps) {
  return (
    <section className="px-6 pb-10 lg:px-0 lg:pb-14">
      <SectionContainer className="max-w-none !px-0 lg:max-w-[1440px] lg:!px-8 xl:!px-10">
        <div className="rounded-[1.75rem] bg-brand-purple-bright p-5 text-white shadow-card lg:rounded-[2rem] lg:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
          <div>
            <h2 className="text-xl font-extrabold leading-tight lg:text-3xl">
              {title}
            </h2>
            <p className="mt-1 text-sm text-white/90 lg:text-base">{text}</p>
          </div>
          <CTAButton
            href={buttonHref}
            variant="secondary"
            className="w-full !border-white !bg-white !px-4 !py-3 !text-brand-purple-deep hover:!bg-brand-lavender lg:w-auto lg:min-w-[15rem]"
          >
            <span className="inline-flex items-center justify-center gap-2">
              <Icon name="calendar" size="sm" />
              <span className="text-xs lg:text-sm">{buttonLabel}</span>
            </span>
          </CTAButton>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
