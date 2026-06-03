import type { Metadata } from "next";
import { MobileDownloadCard, ResourceBottomCta, ResourceNewsletterCard } from "@/components/page/ResourceMobileComponents";
import { guides } from "@/data/guides";

export const metadata: Metadata = {
  title: "Guides & Downloads | Ava's Hub",
  description:
    "Download Ava's Hub family guides and practical resources for supporting children, teens, and young adults with real-life skills, routines, confidence, and independence.",
  alternates: { canonical: "/guides" },
};

const ITEMS_PER_PAGE = 5;

type GuidesPageProps = {
  searchParams?: Promise<{ page?: string }>;
};

export default async function GuidesPage({ searchParams }: GuidesPageProps) {
  const params = await searchParams;
  const page = Math.max(1, Number(params?.page ?? "1") || 1);
  const totalPages = Math.ceil(guides.length / ITEMS_PER_PAGE);
  const visibleGuides = guides.slice(
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
        <div className="space-y-5">
          {visibleGuides.map((guide) => (
            <MobileDownloadCard
              key={guide.slug}
              title={guide.title}
              description={guide.description}
              image={guide.image}
              href={guide.pdf}
              category={guide.category}
              buttonLabel="Download Guide"
            />
          ))}
        </div>

        {totalPages > 1 ? (
          <nav className="mt-7 flex justify-center gap-2" aria-label="Guides pagination">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((item) => (
              <a
                key={item}
                href={`/guides?page=${item}`}
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
        title="Want Support Beyond Downloads?"
        text="We'd love to help your family build real-life progress."
      />
    </main>
  );
}

