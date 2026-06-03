import Link from "next/link";
import { CTAButton } from "@/components/CTAButton";
import { Icon } from "@/components/Icon";
import { EmailSignupForm } from "@/components/page/EmailSignupForm";
import { PlaceholderImage } from "@/components/PlaceholderImage";

type DownloadCardProps = {
  title: string;
  description: string;
  image: string;
  href: string;
  category?: string;
  fileSize?: string;
  buttonLabel?: string;
};

type ResourceBottomCtaProps = {
  title: string;
  text: string;
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

export function MobileDownloadCard({
  title,
  description,
  image,
  href,
  category,
  fileSize,
  buttonLabel = "Download",
}: DownloadCardProps) {
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
          <p className="text-xs font-extrabold uppercase tracking-normal text-brand-purple-bright">
            {category}
          </p>
        ) : null}
        <h3 className="mt-2 text-lg font-extrabold leading-tight text-brand-navy">
          {title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-brand-navy/75">
          {description}
        </p>
        <div className="mt-5 flex items-center justify-between gap-3">
          {fileSize ? (
            <span className="rounded-full bg-brand-lavender px-3 py-1 text-xs font-bold text-brand-purple-deep">
              {fileSize}
            </span>
          ) : (
            <span />
          )}
          <Link
            href={href}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-purple-bright px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-brand-purple-deep"
            download
          >
            <Icon name="resources" size="sm" />
            {buttonLabel}
          </Link>
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
            {/* Backend newsletter integration can be added here later. */}
            <EmailSignupForm placeholder="Enter your email address" />
          </div>
          <p className="mt-4 text-xs font-semibold text-brand-navy/60">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}

export function ResourceBottomCta({ title, text }: ResourceBottomCtaProps) {
  return (
    <section className="px-6 pb-10">
      <div className="rounded-[1.75rem] bg-brand-purple-bright p-5 text-white shadow-card">
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="text-xl font-extrabold leading-tight">{title}</h2>
            <p className="mt-1 text-sm text-white/90">{text}</p>
          </div>
          <CTAButton
            href="/contact"
            variant="secondary"
            className="w-full !border-white !bg-white !px-4 !py-3 !text-brand-purple-deep hover:!bg-brand-lavender"
          >
            <span className="inline-flex items-center justify-center gap-2">
              <Icon name="calendar" size="sm" />
              <span className="text-xs">Schedule Consultation</span>
            </span>
          </CTAButton>
        </div>
      </div>
    </section>
  );
}

