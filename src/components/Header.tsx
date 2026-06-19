"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CTAButton } from "./CTAButton";
import { PlaceholderImage } from "./PlaceholderImage";
import { SectionContainer } from "./SectionContainer";
import { navItems } from "@/data/navigation";
import { siteImages } from "@/data/images";

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block h-5 w-6" aria-hidden>
      <span
        className={
          "absolute left-0 top-0 h-0.5 w-full rounded-full bg-brand-purple-deep transition " +
          (open ? "translate-y-2 rotate-45" : "")
        }
      />
      <span
        className={
          "absolute left-0 top-2 h-0.5 w-full rounded-full bg-brand-purple-deep transition " +
          (open ? "scale-0 opacity-0" : "")
        }
      />
      <span
        className={
          "absolute left-0 top-4 h-0.5 w-full rounded-full bg-brand-purple-deep transition " +
          (open ? "-translate-y-2 -rotate-45" : "")
        }
      />
    </span>
  );
}

function AdminPersonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M4 20c0-3.314 3.582-6 8-6s8 2.686 8 6"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Hide on all admin routes — admin has its own layout
  if (pathname.startsWith("/admin")) return null;

  const desktopLinkClass = (active: boolean) =>
    [
      "whitespace-nowrap rounded-md px-[clamp(0.2rem,0.35vw,0.55rem)] py-1.5 text-[clamp(0.74rem,0.78vw,0.95rem)] font-semibold transition-colors",
      active
        ? "text-brand-purple-deep decoration-brand-gold underline decoration-2 underline-offset-8"
        : "text-brand-navy/80 hover:text-brand-purple-bright",
    ].join(" ");

  const mobileLinkClass = (active: boolean) =>
    "block rounded-lg px-3 py-2.5 text-base font-semibold " +
    (active
      ? "bg-brand-lavender text-brand-purple-deep ring-2 ring-brand-gold/60"
      : "text-brand-navy hover:bg-brand-teal-light");

  return (
    <header className="sticky top-0 z-50 border-b border-brand-teal/10 bg-[#fffaf4]/95 backdrop-blur-md xl:bg-white/95">
      <SectionContainer className="flex min-h-[5rem] items-center justify-between gap-3 py-4 sm:min-h-[5.25rem] sm:gap-4 sm:py-4 xl:min-h-[5rem] xl:gap-6 xl:py-4">
        {/* Brand: logo image + tagline only */}
        <Link
          href="/"
          className="group flex min-w-0 max-w-[min(100%,14rem)] items-center gap-2.5 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-brand-gold sm:max-w-none sm:gap-3 xl:max-w-[19rem] xl:gap-3 2xl:max-w-md 2xl:gap-4"
          onClick={() => setOpen(false)}
        >
          <span className="sr-only">Ava&apos;s Hub — Home</span>
          <div className="relative h-12 w-36 shrink-0 sm:h-12 sm:w-40 md:h-12 md:w-40 xl:h-14 xl:w-40">
            <PlaceholderImage
              src={siteImages.logo}
              alt="Ava's Hub"
              fill
              priority
              sizes="(max-width: 1024px) 140px, 160px"
              className="object-contain object-left"
            />
          </div>
          <p className="hidden min-w-0 text-[0.6875rem] font-medium leading-snug text-brand-teal sm:block sm:max-w-[9.5rem] sm:text-xs md:max-w-[11rem] md:text-[0.8125rem] xl:max-w-[8.5rem] xl:text-xs 2xl:max-w-xs 2xl:text-sm">
            Skills for Today. Independence for Life.
          </p>
        </Link>

        {/* Desktop navigation */}
        <nav
          className="mx-2 hidden min-w-0 flex-1 justify-center xl:flex"
          aria-label="Primary"
        >
          <ul className="flex flex-nowrap items-center justify-center gap-x-[clamp(0.35rem,0.8vw,1.25rem)]">
            {navItems.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link href={item.href} className={desktopLinkClass(active)}>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
          <Link
            href="/admin/login"
            aria-label="Admin login"
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-brand-navy/50 transition hover:bg-brand-lavender hover:text-brand-purple-bright"
          >
            <AdminPersonIcon />
          </Link>
          <CTAButton
            href="/contact"
            className="whitespace-nowrap !px-3.5 !py-2 text-xs sm:!px-5 sm:!py-2.5 sm:text-sm xl:!px-4 xl:!py-2.5 xl:text-xs 2xl:!px-6 2xl:!py-3 2xl:text-sm"
          >
            <span className="hidden min-[400px]:inline">Enroll Now</span>
            <span className="min-[400px]:hidden">Enroll</span>
          </CTAButton>
          <button
            type="button"
            className="inline-flex h-12 w-12 items-center justify-center rounded-2xl text-brand-navy hover:bg-brand-lavender focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <MenuIcon open={open} />
          </button>
        </div>
      </SectionContainer>

      {/* Mobile / tablet menu */}
      <div
        id="mobile-nav"
        className={
          "border-t border-brand-teal/10 bg-white xl:hidden " +
          (open ? "block" : "hidden")
        }
      >
        <SectionContainer className="py-3 sm:py-4">
          <p className="mb-3 px-1 text-xs font-medium leading-snug text-brand-teal sm:hidden">
            Skills for Today. Independence for Life.
          </p>
          <ul className="flex flex-col gap-0.5">
            {navItems.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={mobileLinkClass(active)}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </SectionContainer>
      </div>
    </header>
  );
}
