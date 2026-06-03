import type { Metadata } from "next";
import { MobileDownloadCard, ResourceBottomCta, ResourceNewsletterCard } from "@/components/page/ResourceMobileComponents";
import { printables } from "@/data/printables";

export const metadata: Metadata = {
  title: "Printable Worksheets | Ava's Hub",
  description:
    "Download printable worksheets and toolkits for home practice, routines, daily living skills, fine motor skills, communication, and family carryover.",
  alternates: { canonical: "/printables" },
};

const ITEMS_PER_PAGE = 5;

type PrintablesPageProps = {
  searchParams?: Promise<{ page?: string }>;
};

export default async function PrintablesPage({ searchParams }: PrintablesPageProps) {
  const params = await searchParams;
  const page = Math.max(1, Number(params?.page ?? "1") || 1);
  const totalPages = Math.ceil(printables.length / ITEMS_PER_PAGE);
  const visiblePrintables = printables.slice(
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
        <div className="space-y-5">
          {visiblePrintables.map((printable) => (
            <MobileDownloadCard
              key={printable.slug}
              title={printable.title}
              description={printable.description}
              image={printable.image}
              href={printable.pdf}
              category={printable.category}
              fileSize={printable.fileSize}
              buttonLabel="Download"
            />
          ))}
        </div>

        {totalPages > 1 ? (
          <nav className="mt-7 flex justify-center gap-2" aria-label="Printables pagination">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((item) => (
              <a
                key={item}
                href={`/printables?page=${item}`}
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${
                  item === page
                    ? "bg-brand-purple-bright text-white"
                    : "bg-white text-brand-purple-deep ring-1 ring-brand-purple-deep/15"
                }`}
              >
                {item}
              </a>
            ))}
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

