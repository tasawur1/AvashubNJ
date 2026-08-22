import type { Metadata } from "next";
import { MobileDownloadCard, ResourceBottomCta, ResourceNewsletterCard } from "@/components/page/ResourceMobileComponents";
import { getGuideCards } from "@/lib/guides";

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

export const metadata: Metadata = {
  title: "Guides & Downloads | Ava's Hub",
  description:
    "Download Ava's Hub family guides and practical resources for supporting children, teens, and young adults with real-life skills, routines, confidence, and independence.",
  alternates: { canonical: "/guides" },
};

export const revalidate = false;

const ITEMS_PER_PAGE = 5;

type GuidesPageProps = {
  searchParams?: Promise<{ page?: string }>;
};

export default async function GuidesPage({ searchParams }: GuidesPageProps) {
  const params = await searchParams;
  const page = Math.max(1, Number(params?.page ?? "1") || 1);
  const { cards } = await getGuideCards();
  const totalPages = Math.ceil(cards.length / ITEMS_PER_PAGE);
  const visibleGuides = cards.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  return (
    <main className="flex-1 bg-[#fffaf4]">
      <section className="px-6 pb-8 pt-8">
        <p className="inline-flex rounded-full bg-brand-lavender px-3 py-1 text-xs font-extrabold uppercase tracking-normal text-brand-purple-deep">
          Family Guides
        </p>
        <h1 className="mt-5 text-[clamp(2rem,9vw,2.35rem)] font-extrabold leading-[1.05] tracking-tight text-brand-navy">
          Download Guides & Family Resources
        </h1>
        <p className="mt-5 text-base leading-relaxed text-brand-navy/80">
          Browse practical guides designed to support real-life skills,
          routines, confidence, and family carryover.
        </p>
      </section>

      <section className="px-6 pb-10">
        <div className="grid gap-5 lg:grid-cols-3">
          {visibleGuides.map((guide) => (
            <MobileDownloadCard
              key={guide.slug}
              title={guide.title}
              description={guide.description}
              image={guide.image}
              href={guide.viewHref}
              downloadHref={guide.downloadHref}
              category={guide.category}
              fileSize={guide.fileSize}
              buttonLabel="Download Guide"
            />
          ))}
        </div>

        {totalPages > 1 ? (
          <nav className="mt-7 flex items-center justify-center gap-2" aria-label="Guides pagination">
            {page > 1 ? (
              <a
                href={`/guides?page=${page - 1}`}
                aria-label="Previous page"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-purple-deep/20 bg-white text-brand-purple-deep shadow-sm transition hover:bg-brand-lavender"
              >
                <ChevronLeft />
              </a>
            ) : (
              <span
                aria-hidden
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-purple-deep/20 bg-white text-brand-purple-deep/35"
              >
                <ChevronLeft />
              </span>
            )}

            {Array.from({ length: totalPages }, (_, index) => index + 1).map((item) => (
              <a
                key={item}
                href={`/guides?page=${item}`}
                aria-label={`Page ${item}`}
                aria-current={item === page ? "page" : undefined}
                className={
                  item === page
                    ? "inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-purple-bright text-sm font-bold text-white shadow-md"
                    : "inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-purple-deep/20 bg-white text-sm font-semibold text-brand-navy shadow-sm transition hover:bg-brand-lavender"
                }
              >
                {item}
              </a>
            ))}

            {page < totalPages ? (
              <a
                href={`/guides?page=${page + 1}`}
                aria-label="Next page"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-purple-deep/20 bg-white text-brand-purple-deep shadow-sm transition hover:bg-brand-lavender"
              >
                <ChevronRight />
              </a>
            ) : (
              <span
                aria-hidden
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-purple-deep/20 bg-white text-brand-purple-deep/35"
              >
                <ChevronRight />
              </span>
            )}
          </nav>
        ) : null}
      </section>

      <ResourceNewsletterCard />
      <ResourceBottomCta
        title="Want Support Beyond Downloads?"
        text="We'd love to help your family build real-life progress."
      />
    </main>
  );
}
