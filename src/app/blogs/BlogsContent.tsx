"use client";

import { useState } from "react";
import Link from "next/link";
import { CTAButton } from "@/components/CTAButton";
import { Icon } from "@/components/Icon";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { SectionContainer } from "@/components/SectionContainer";
import { EmailSignupForm } from "@/components/page/EmailSignupForm";
import { ResourceBottomCta } from "@/components/page/ResourceMobileComponents";
import type { BlogPost } from "@/data/blogs";

// ── Pagination config ──────────────────────────────────────────────────────────
// ROWS_PER_PAGE: set to 2 to show 6 cards per page (two rows of 3)
const CARDS_PER_ROW = 3;
const ROWS_PER_PAGE = 1;
const CARDS_PER_PAGE = CARDS_PER_ROW * ROWS_PER_PAGE;
// ──────────────────────────────────────────────────────────────────────────────

const toneStyles = {
  teal:   "bg-brand-teal-light/60 ring-brand-teal/10",
  purple: "bg-brand-lavender/55 ring-brand-purple-deep/10",
  gold:   "bg-brand-gold/15 ring-brand-gold/20",
};

function ChevronLeft() {
  return (
    <svg aria-hidden width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M11 14L6 9l5-5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg aria-hidden width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M7 4l5 5-5 5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function BlogsContent({ initialPosts }: { initialPosts: BlogPost[] }) {
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(initialPosts.length / CARDS_PER_PAGE));
  const visiblePosts = initialPosts.slice(
    (page - 1) * CARDS_PER_PAGE,
    page * CARDS_PER_PAGE
  );

  return (
    <main className="flex-1 bg-[#fffaf4]">
      <h1 className="sr-only">Ava&apos;s Hub Blogs</h1>

      {/* Breadcrumb */}
      <section className="pb-0 pt-8 lg:pt-10">
        <SectionContainer>
          <nav
            aria-label="Breadcrumb"
            className="flex items-center justify-center gap-2 text-xs font-medium text-brand-navy/60"
          >
            <Link href="/" className="transition-colors hover:text-brand-purple-bright">
              Home
            </Link>
            <span aria-hidden>/</span>
            <span className="font-semibold text-brand-purple-deep">Blogs</span>
          </nav>
        </SectionContainer>
      </section>

      {/* Page heading */}
      <section className="pb-10 pt-6 text-center lg:pb-12 lg:pt-8">
        <SectionContainer>
          <h2 className="text-[clamp(2rem,5vw,3rem)] font-extrabold leading-tight text-brand-navy">
            Our Blog
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-brand-navy/75 lg:text-lg">
            Practical guidance, therapy insights, and family resources to help
            your child and family thrive every day.
          </p>
        </SectionContainer>
      </section>

      {/* Blog cards */}
      <section className="pb-6 lg:pb-8">
        <SectionContainer>
          {visiblePosts.length === 0 ? (
            <p className="py-16 text-center text-base text-brand-navy/60">
              No blog posts yet. Check back soon!
            </p>
          ) : null}
          <div className="grid gap-5 lg:grid-cols-3">
            {visiblePosts.map((post) => (
              <article
                key={post.slug}
                className={`flex flex-col overflow-hidden rounded-[1.75rem] shadow-card ring-1 ${toneStyles[post.tone] ?? toneStyles.teal}`}
              >
                <div className="relative h-48 bg-brand-teal-light">
                  {post.image_desktop ? (
                    <PlaceholderImage
                      src={post.image_desktop}
                      alt={post.title}
                      fill
                      className="object-cover object-center"
                      sizes="(min-width: 1024px) 33vw, 100vw"
                    />
                  ) : null}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-semibold text-brand-navy/50">
                    {post.date}
                  </p>
                  <h3 className="mt-2 text-xl font-extrabold leading-tight text-brand-navy">
                    {post.title}
                  </h3>
                  <p className="mt-3 line-clamp-6 text-sm leading-relaxed text-brand-navy/80">
                    {post.summary}
                  </p>
                  <div className="mt-5">
                    <CTAButton href={`/blogs/${post.slug}`} className="w-full">
                      Read Full Blog
                    </CTAButton>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </SectionContainer>
      </section>

      {/* Pagination */}
      <section className="pb-10 lg:pb-14" aria-label="Blog pagination">
        <SectionContainer>
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              aria-label="Previous page"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-purple-deep/20 bg-white text-brand-purple-deep shadow-sm transition hover:bg-brand-lavender disabled:cursor-not-allowed disabled:opacity-35"
            >
              <ChevronLeft />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setPage(n)}
                aria-label={`Page ${n}`}
                aria-current={n === page ? "page" : undefined}
                className={
                  n === page
                    ? "inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-purple-bright text-sm font-bold text-white shadow-md"
                    : "inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-purple-deep/20 bg-white text-sm font-semibold text-brand-navy shadow-sm transition hover:bg-brand-lavender"
                }
              >
                {n}
              </button>
            ))}

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              aria-label="Next page"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-purple-deep/20 bg-white text-brand-purple-deep shadow-sm transition hover:bg-brand-lavender disabled:cursor-not-allowed disabled:opacity-35"
            >
              <ChevronRight />
            </button>
          </div>
        </SectionContainer>
      </section>

      {/* Newsletter */}
      <section className="py-10 lg:py-14" aria-labelledby="blogs-newsletter-heading">
        <SectionContainer>
          <div className="overflow-hidden rounded-[1.75rem] bg-brand-lavender/45 shadow-card ring-1 ring-brand-purple-deep/10 lg:rounded-[2rem]">
            <div className="grid h-full items-stretch lg:grid-cols-[0.38fr_0.62fr]">
              <div className="relative min-h-52 bg-brand-teal-light lg:min-h-[17rem]">
                <PlaceholderImage
                  src="/images/resources/mobile/newsletter-card.png"
                  alt="Family updates from Ava's Hub"
                  fill
                  className="object-cover object-center"
                  sizes="(min-width: 1024px) 38vw, 100vw"
                />
              </div>
              <div className="flex flex-col justify-center p-6 text-center lg:p-10">
                <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-white text-brand-purple-bright shadow-sm">
                  <Icon name="email" size="lg" />
                </span>
                <h2
                  id="blogs-newsletter-heading"
                  className="mt-4 text-2xl font-extrabold text-brand-navy lg:text-3xl"
                >
                  Stay Connected
                </h2>
                <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-brand-navy/75 lg:text-base">
                  Get updates about programs, events, and resources from Ava&apos;s Hub.
                </p>
                <div className="mx-auto mt-6 w-full max-w-xl">
                  <EmailSignupForm placeholder="Enter your email address" source="blogs" />
                </div>
                <p className="mt-4 text-xs font-semibold text-brand-navy/60">
                  We respect your privacy. Unsubscribe anytime.
                </p>
              </div>
            </div>
          </div>
        </SectionContainer>
      </section>

      <ResourceBottomCta
        title="Ready To Get Started?"
        text="We'd love to meet your family."
        buttonLabel="Schedule Consultation"
        buttonHref="/contact"
      />
    </main>
  );
}
