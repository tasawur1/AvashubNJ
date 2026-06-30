"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

function AccountHeader() {
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);

  async function handleSignOut() {
    setSigningOut(true);
    await fetch("/api/auth/signout", { method: "POST" });
    router.push("/");
  }

  return (
    <header className="sticky top-0 z-10 border-b border-brand-purple-deep/10 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between gap-4 px-4">
        <Link href="/" className="flex items-center gap-1.5 text-sm font-semibold text-brand-navy/60 transition hover:text-brand-purple-bright">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M19 12H5M5 12l7-7M5 12l7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Ava&apos;s Hub
        </Link>

        <span className="text-sm font-extrabold text-brand-navy">My Account</span>

        <button
          onClick={handleSignOut}
          disabled={signingOut}
          className="text-sm font-semibold text-brand-navy/50 transition hover:text-red-500 disabled:opacity-50"
        >
          {signingOut ? "Signing out…" : "Sign out"}
        </button>
      </div>
    </header>
  );
}

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#fffaf4]">
      <AccountHeader />
      <main className="flex-1 py-8">{children}</main>
    </div>
  );
}
