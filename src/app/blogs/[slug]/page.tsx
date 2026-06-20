import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { SectionContainer } from "@/components/SectionContainer";
import { EmailSignupForm } from "@/components/page/EmailSignupForm";
import { ResourceBottomCta } from "@/components/page/ResourceMobileComponents";
import { createAdminClient } from "@/lib/supabase-server";
import type { BlogPost } from "@/data/blogs";

export const revalidate = 60;

async function getBlog(slug: string): Promise<BlogPost | null> {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();
    if (error) throw error;
    return data as BlogPost | null;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  try {
    const { slug } = await params;
    const post = await getBlog(slug);
    if (!post) return {};
    return {
      title: `${post.title} | Ava's Hub`,
      description: post.summary?.slice(0, 160) ?? "",
      alternates: { canonical: `/blogs/${slug}` },
    };
  } catch {
    return {};
  }
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlog(slug);
  if (!post || post.hidden) notFound();

  return (
    <main className="flex-1 bg-[#fffaf4]">
      {/* Breadcrumb */}
      <SectionContainer className="py-6 lg:py-8">
        <nav
          className="flex flex-wrap items-center gap-2 text-sm font-semibold text-brand-navy/55"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="transition hover:text-brand-purple-bright">
            Home
          </Link>
          <span aria-hidden>&gt;</span>
          <Link href="/blogs" className="transition hover:text-brand-purple-bright">
            Blogs
          </Link>
          <span aria-hidden>&gt;</span>
          <span className="text-brand-purple-bright">{post.title}</span>
        </nav>
      </SectionContainer>

      {/* Hero card */}
      <section className="pb-8 lg:pb-10" aria-labelledby="blog-detail-heading">
        <SectionContainer>
          <article className="rounded-[2.25rem] bg-white/95 p-4 shadow-card ring-1 ring-brand-purple-deep/10 lg:rounded-[2.75rem] lg:p-6">
            <div className="grid gap-6 lg:grid-cols-[0.4fr_0.6fr] lg:items-center lg:gap-8">
              {/* Hero image — always uses mobile image (portrait ratio fits the card well) */}
              <div className="overflow-hidden rounded-[1.75rem] bg-brand-teal-light ring-1 ring-brand-teal/10">
                <div className="relative aspect-[4/3] lg:aspect-auto lg:h-[24rem] xl:h-[26rem]">
                  {(post.image_mobile || post.image_desktop) ? (
                    <PlaceholderImage
                      src={post.image_mobile || post.image_desktop}
                      alt={post.title}
                      fill
                      priority
                      className="object-cover object-center"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                  ) : null}
                </div>
              </div>

              {/* Content */}
              <div className="px-2 pb-3 lg:px-4 lg:py-4 xl:px-6">
                <header>
                  <h1
                    id="blog-detail-heading"
                    className="text-[clamp(2rem,6vw,4rem)] font-extrabold leading-[1.05] tracking-tight text-brand-navy"
                  >
                    {post.title || "Blog Post"}
                  </h1>
                  {post.date ? (
                    <p className="mt-4 inline-flex rounded-full bg-brand-lavender px-4 py-2 text-sm font-extrabold text-brand-purple-bright">
                      {post.date}
                    </p>
                  ) : null}
                  {post.summary ? (
                    <p className="mt-5 max-w-3xl text-base leading-relaxed text-brand-navy/82 lg:text-lg">
                      {post.summary}
                    </p>
                  ) : null}
                </header>
              </div>
            </div>
          </article>
        </SectionContainer>
      </section>

      {/* Blog content */}
      <section className="pb-8 lg:pb-10">
        <SectionContainer>
          <div className="mx-auto max-w-3xl rounded-[1.75rem] bg-white/95 p-8 shadow-card ring-1 ring-brand-purple-deep/10 lg:rounded-[2rem] lg:p-12">
            {post.content ? (
              <div
                className="blog-content prose prose-base max-w-none leading-loose text-brand-navy/85 lg:prose-lg"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            ) : (
              <p className="text-base leading-loose text-brand-navy/60 lg:text-lg">
                Content coming soon.
              </p>
            )}
          </div>
        </SectionContainer>
      </section>

      {/* Author card */}
      <section className="pb-6 lg:pb-8">
        <SectionContainer>
          <div className="mx-auto max-w-3xl rounded-[1.75rem] bg-white/95 p-8 shadow-card ring-1 ring-brand-purple-deep/10 lg:rounded-[2rem] lg:p-12">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-base leading-loose text-brand-navy/85 lg:text-lg">
                <span className="font-extrabold text-brand-navy">Author:</span>{" "}
                {post.author || "Ava's Hub Team"}
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.tiktok.com/@avashubnj"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-lavender text-brand-purple-deep transition hover:bg-brand-purple-bright hover:text-white"
                >
                  <svg aria-hidden viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.17 8.17 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07Z" />
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/avashubnj"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-lavender text-brand-purple-deep transition hover:bg-brand-purple-bright hover:text-white"
                >
                  <svg aria-hidden viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.513c-1.491 0-1.956.93-1.956 1.884v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073Z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/avashubnj"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-lavender text-brand-purple-deep transition hover:bg-brand-purple-bright hover:text-white"
                >
                  <svg aria-hidden viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069ZM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </SectionContainer>
      </section>

      {/* Newsletter */}
      <section className="py-10 lg:py-14" aria-labelledby="blog-detail-newsletter-heading">
        <SectionContainer>
          <div className="overflow-hidden rounded-[1.75rem] bg-brand-lavender/45 shadow-card ring-1 ring-brand-purple-deep/10 lg:rounded-[2rem]">
            <div className="flex flex-col items-center p-8 text-center lg:p-12">
              <h2
                id="blog-detail-newsletter-heading"
                className="text-2xl font-extrabold text-brand-navy lg:text-3xl"
              >
                Stay Connected
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-brand-navy/75 lg:text-base">
                Get updates about programs, events, and resources from Ava&apos;s Hub.
              </p>
              <div className="mx-auto mt-6 w-full max-w-xl">
                <EmailSignupForm placeholder="Enter your email address" source="blog-detail" />
              </div>
              <p className="mt-4 text-xs font-semibold text-brand-navy/60">
                We respect your privacy. Unsubscribe anytime.
              </p>
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
