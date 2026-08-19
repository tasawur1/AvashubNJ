import type { Metadata } from "next";
import { MobileDownloadCard, ResourceBottomCta, ResourceNewsletterCard } from "@/components/page/ResourceMobileComponents";
import { getPrintableCards } from "@/lib/printables";

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
  title: "Printable Worksheets | Ava's Hub",
  description:
    "Download printable worksheets and toolkits for home practice, routines, daily living skills, fine motor skills, communication, and family carryover.",
  alternates: { canonical: "/printables" },
};

export const revalidate = false;

const ITEMS_PER_PAGE = 5;

type PrintablesPageProps = {
  searchParams?: Promise<{ page?: string }>;
};

export default async function PrintablesPage({ searchParams }: PrintablesPageProps) {
  const params = await searchParams;
  const page = Math.max(1, Number(params?.page ?? "1") || 1);
  const { cards } = await getPrintableCards();
  const totalPages = Math.ceil(cards.length / ITEMS_PER_PAGE);
  const visiblePrintables = cards.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  return (
    <main className="flex-1 bg-[#fffaf4]">
      <section className="px-6 pb-8 pt-8">
        <p className="inline-flex rounded-full bg-brand-lavender px-3 py-1 text-xs font-extrabold uppercase tracking-normal text-brand-purple-deep">
          Printable Tools
        </p>
        <h1 className="mt-5 text-[clamp(2rem,9vw,2.35rem)] font-extrabold leading-[1.05] tracking-tight text-brand-navy">
          Download Printable Toolkits & Worksheets
        </h1>
        <p className="mt-5 text-base leading-relaxed text-brand-navy/80">
          Choose a printable below and download it for home practice, routines,
          or carryover.
        </p>
      </section>

      <section className="px-6 pb-10">
        <div className="grid gap-5 lg:grid-cols-3">
          {visiblePrintables.map((printable) => (
            <MobileDownloadCard
              key={printable.slug}
              title={printable.title}
              description={printable.description}
              image={printable.image}
              href={printable.viewHref}
              downloadHref={printable.downloadHref}
              category={printable.category}
              fileSize={printable.fileSize}
              buttonLabel="Download"
            />
          ))}
        </div>

        {totalPages > 1 ? (
          <nav className="mt-7 flex items-center justify-center gap-2" aria-label="Printables pagination">
            {page > 1 ? (
              <a
                href={`/printables?page=${page - 1}`}
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
                href={`/printables?page=${item}`}
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
                href={`/printables?page=${page + 1}`}
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
        title="Need Help Using These Tools?"
        text="We can help you choose strategies that fit your child and family."
      />
    </main>
  );
}

