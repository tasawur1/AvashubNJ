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

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const desktopLinkClass = (active: boolean) =>
    [
      "whitespace-nowrap rounded-md px-1.5 py-1.5 text-sm font-semibold transition-colors md:px-2 lg:text-[0.9375rem] xl:text-base xl:px-2.5",
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
    <header className="sticky top-0 z-50 border-b border-brand-teal/10 bg-[#fffaf4]/95 backdrop-blur-md lg:bg-white/95">
      <SectionContainer className="flex min-h-[5rem] items-center justify-between gap-3 py-4 sm:min-h-[5.25rem] sm:gap-4 sm:py-4 lg:min-h-[5rem] lg:gap-6 lg:py-4">
        {/* Brand: logo image + tagline only */}
        <Link
          href="/"
          className="group flex min-w-0 max-w-[min(100%,14rem)] items-center gap-2.5 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-brand-gold sm:max-w-none sm:gap-3 lg:max-w-md lg:gap-4"
          onClick={() => setOpen(false)}
        >
          <span className="sr-only">Ava&apos;s Hub — Home</span>
          <div className="relative h-12 w-36 shrink-0 sm:h-12 sm:w-40 md:h-12 md:w-40 lg:h-14 lg:w-40">
            <PlaceholderImage
              src={siteImages.logo}
              alt="Ava's Hub"
              fill
              priority
              sizes="(max-width: 1024px) 140px, 160px"
              className="object-contain object-left"
            />
          </div>
          <p className="hidden min-w-0 text-[0.6875rem] font-medium leading-snug text-brand-teal sm:block sm:max-w-[9.5rem] sm:text-xs md:max-w-[11rem] md:text-[0.8125rem] lg:max-w-xs lg:text-sm">
            Skills for Today. Independence for Life.
          </p>
        </Link>

        {/* Desktop navigation */}
        <nav
          className="mx-2 hidden min-w-0 flex-1 justify-center lg:flex"
          aria-label="Primary"
        >
          <ul className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 md:gap-x-3 xl:gap-x-5">
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
          <CTAButton
            href="/contact"
            className="!px-3.5 !py-2 text-xs sm:!px-5 sm:!py-2.5 sm:text-sm lg:!px-6 lg:!py-3"
          >
            <span className="hidden min-[400px]:inline">Enroll Now</span>
            <span className="min-[400px]:hidden">Enroll</span>
          </CTAButton>
          <button
            type="button"
            className="inline-flex h-12 w-12 items-center justify-center rounded-2xl text-brand-navy hover:bg-brand-lavender focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold lg:hidden"
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
          "border-t border-brand-teal/10 bg-white lg:hidden " +
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
