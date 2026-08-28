"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { RESOURCE_GATE_ENABLED, checkIsLoggedIn } from "@/components/page/ResourceDownloadGate";
import { SignInRequiredNotice } from "@/components/page/SignInRequiredNotice";

type Props = {
  title: string;
  fileUrl: string;
  /** This page's own path — where sign-in sends the visitor back to. */
  next: string;
};

export function GuideViewer({ title, fileUrl, next }: Props) {
  const [checking, setChecking] = useState(RESOURCE_GATE_ENABLED);
  const [unlocked, setUnlocked] = useState(!RESOURCE_GATE_ENABLED);

  useEffect(() => {
    if (!RESOURCE_GATE_ENABLED) return;
    let cancelled = false;
    (async () => {
      const isIn = await checkIsLoggedIn();
      if (!cancelled) { setUnlocked(isIn); setChecking(false); }
    })();
    return () => { cancelled = true; };
  }, []);

  if (checking) {
    return <div className="fixed inset-0 z-[9999] bg-[#faf6f2]" />;
  }

  if (!unlocked) {
    return (
      <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-6 bg-[#faf6f2] px-4 py-12">
        <Link
          href="/guides"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-navy/60 transition hover:text-brand-purple-bright"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
            <path d="M12.5 15L7.5 10l5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to Guides
        </Link>
        <SignInRequiredNotice
          next={next}
          title="Sign in to view this guide"
          subtitle={`You'll need to sign in or create a free account to view "${title}".`}
        />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col bg-[#faf6f2]">
      {/* Top header bar */}
      <div className="flex shrink-0 items-center justify-between border-b border-brand-teal/15 bg-white/95 px-4 py-3 shadow-sm">
        <div className="flex items-center gap-2.5">
          <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-brand-purple-bright" />
          <h1 className="truncate text-sm font-extrabold text-brand-navy sm:text-base">{title}</h1>
        </div>
        <Link
          href="/guides"
          aria-label="Close and return to Guides"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-lavender text-brand-purple-bright transition hover:bg-brand-purple-bright hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
        >
          <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </Link>
      </div>

      {/* Content iframe — full remaining height */}
      <div className="relative min-h-0 flex-1">
        <iframe
          src={fileUrl}
          title={title}
          className="h-full w-full border-0 bg-[#faf6f2]"
          sandbox="allow-scripts allow-same-origin allow-popups"
        />

        {/* Floating back arrow — same visual treatment as the intake forms */}
        <Link
          href="/guides"
          aria-label="Go back to Guides"
          className="absolute left-3 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-brand-navy shadow-lg backdrop-blur-sm transition hover:bg-white hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
        >
          <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
