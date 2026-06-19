import Link from "next/link";
import { SectionContainer } from "@/components/SectionContainer";
import { CTAButton } from "@/components/CTAButton";

export default function BlogNotFound() {
  return (
    <main className="flex-1 bg-[#fffaf4]">
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
          <span className="text-brand-purple-bright">Not Found</span>
        </nav>
      </SectionContainer>

      <SectionContainer className="pb-24 pt-10 text-center">
        <h1 className="text-[clamp(2rem,6vw,3.5rem)] font-extrabold leading-tight text-brand-navy">
          Blog Post Not Found
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-brand-navy/70">
          This blog post may have moved or doesn&apos;t exist yet. Browse all our blogs below.
        </p>
        <div className="mt-8">
          <CTAButton href="/blogs">Back to Blogs</CTAButton>
        </div>
      </SectionContainer>
    </main>
  );
}
