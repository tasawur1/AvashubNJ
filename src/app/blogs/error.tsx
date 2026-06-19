"use client";

import Link from "next/link";
import { CTAButton } from "@/components/CTAButton";
import { SectionContainer } from "@/components/SectionContainer";

export default function BlogsError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex-1 bg-[#fffaf4]">
      <SectionContainer className="pb-24 pt-20 text-center">
        <h1 className="text-[clamp(2rem,6vw,3.5rem)] font-extrabold leading-tight text-brand-navy">
          Something went wrong
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-brand-navy/70">
          We couldn&apos;t load this page. Please try again or return to the blogs listing.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center rounded-full border border-brand-purple-bright px-6 py-3 text-sm font-bold text-brand-purple-bright transition hover:bg-brand-lavender"
          >
            Try again
          </button>
          <CTAButton href="/blogs">Back to Blogs</CTAButton>
        </div>
      </SectionContainer>
    </main>
  );
}
