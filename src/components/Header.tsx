"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { CTAButton } from "./CTAButton";
import { PlaceholderImage } from "./PlaceholderImage";
import { SectionContainer } from "./SectionContainer";
import { navItems } from "@/data/navigation";
import type { NavItem } from "@/data/navigation";
import { siteImages } from "@/data/images";

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block h-5 w-6" aria-hidden>
      <span className={"absolute left-0 top-0 h-0.5 w-full rounded-full bg-brand-purple-deep transition " + (open ? "translate-y-2 rotate-45" : "")} />
      <span className={"absolute left-0 top-2 h-0.5 w-full rounded-full bg-brand-purple-deep transition " + (open ? "scale-0 opacity-0" : "")} />
      <span className={"absolute left-0 top-4 h-0.5 w-full rounded-full bg-brand-purple-deep transition " + (open ? "-translate-y-2 -rotate-45" : "")} />
    </span>
  );
}

function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg
      width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden
      className={"shrink-0 transition-transform duration-200 " + (open ? "rotate-180" : "")}
    >
      <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── Desktop nav item (handles plain link + dropdown) ───────────────────────
function DesktopNavItem({ item, pathname }: { item: NavItem; pathname: string }) {
  const [open, setOpen] = useState(false);

  const isActive = item.href === "/"
    ? pathname === "/"
    : pathname.startsWith(item.href);

  const linkClass =
    "whitespace-nowrap rounded-md px-[clamp(0.2rem,0.35vw,0.55rem)] py-1.5 text-[clamp(0.74rem,0.78vw,0.95rem)] font-semibold transition-colors " +
    (isActive
      ? "text-brand-purple-deep decoration-brand-gold underline decoration-2 underline-offset-8"
      : "text-brand-navy/80 hover:text-brand-purple-bright");

  if (!item.children) {
    return (
      <li>
        <Link href={item.href} className={linkClass}>{item.label}</Link>
      </li>
    );
  }

  return (
    <li
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Trigger — clicking still navigates to /programs */}
      <Link
        href={item.href}
        className={linkClass + " inline-flex items-center gap-1"}
        onClick={() => setOpen(false)}
      >
        {item.label}
        <ChevronDown open={open} />
      </Link>

      {/* Dropdown panel — pt-2 bridges the gap so mouse doesn't lose hover */}
      <div
        className={
          "absolute left-1/2 top-full z-50 -translate-x-1/2 pt-2 " +
          "transition-all duration-200 ease-out " +
          (open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0")
        }
      >
        <ul className="w-44 overflow-hidden rounded-2xl bg-white py-1.5 shadow-lg ring-1 ring-brand-purple-deep/10">
          {item.children.map((child) => {
            const childActive = pathname.startsWith(child.href);
            return (
              <li key={child.href}>
                <Link
                  href={child.href}
                  onClick={() => setOpen(false)}
                  className={
                    "block px-4 py-2.5 text-sm font-semibold transition-colors " +
                    (childActive
                      ? "bg-brand-lavender text-brand-purple-deep"
                      : "text-brand-navy/80 hover:bg-brand-teal-light hover:text-brand-teal")
                  }
                >
                  {child.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </li>
  );
}

// ── Mobile nav item (handles plain link + accordion) ──────────────────────
function MobileNavItem({
  item,
  pathname,
  onClose,
}: {
  item: NavItem;
  pathname: string;
  onClose: () => void;
}) {
  const [open, setOpen] = useState(false);

  const isActive = item.href === "/"
    ? pathname === "/"
    : pathname.startsWith(item.href);

  const baseLinkClass =
    "block rounded-lg px-3 py-2.5 text-base font-semibold " +
    (isActive
      ? "bg-brand-lavender text-brand-purple-deep ring-2 ring-brand-gold/60"
      : "text-brand-navy hover:bg-brand-teal-light");

  if (!item.children) {
    return (
      <li>
        <Link href={item.href} className={baseLinkClass} onClick={onClose}>
          {item.label}
        </Link>
      </li>
    );
  }

  return (
    <li>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={
          "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-base font-semibold transition-colors " +
          (isActive
            ? "bg-brand-lavender text-brand-purple-deep ring-2 ring-brand-gold/60"
            : "text-brand-navy hover:bg-brand-teal-light")
        }
      >
        {item.label}
        <ChevronDown open={open} />
      </button>

      {/* Smooth accordion */}
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: open ? `${item.children.length * 52}px` : "0px" }}
      >
        <ul className="mt-0.5 flex flex-col gap-0.5 border-l-2 border-brand-purple-deep/15 pl-3 pt-1 pb-1">
          {item.children.map((child) => {
            const childActive = pathname.startsWith(child.href);
            return (
              <li key={child.href}>
                <Link
                  href={child.href}
                  onClick={onClose}
                  className={
                    "block rounded-lg px-3 py-2 text-sm font-semibold transition-colors " +
                    (childActive
                      ? "bg-brand-lavender text-brand-purple-deep"
                      : "text-brand-navy/75 hover:bg-brand-teal-light hover:text-brand-teal")
                  }
                >
                  {child.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </li>
  );
}

// ── Main header ────────────────────────────────────────────────────────────
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [adminSession, setAdminSession] = useState<{ isLoggedIn: boolean; staffName: string | null } | null>(null);
  const [clientUser,   setClientUser]   = useState<{ name: string | null; email: string | null } | null>(null);

  useEffect(() => {
    fetch("/api/admin/session")
      .then((r) => r.json())
      .then((d) => setAdminSession({ isLoggedIn: d.isLoggedIn === true, staffName: d.staffName ?? null }))
      .catch(() => {});
    fetch("/api/client/me")
      .then((r) => r.json())
      .then((d) => {
        if (d.isLoggedIn) setClientUser({ name: d.name, email: d.email });
        else setClientUser(null);
      })
      .catch(() => {});
  }, [pathname]);

  if (pathname.startsWith("/admin") || pathname.startsWith("/account") || pathname === "/login") return null;

  return (
    <header className="sticky top-0 z-50 border-b border-brand-teal/10 bg-[#fffaf4]/95 backdrop-blur-md xl:bg-white/95">
      <SectionContainer className="flex min-h-[5rem] items-center justify-between gap-3 py-4 sm:min-h-[5.25rem] sm:gap-4 sm:py-4 xl:min-h-[5rem] xl:gap-6 xl:py-4">
        {/* Logo */}
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
        <nav className="mx-2 hidden min-w-0 flex-1 justify-center xl:flex" aria-label="Primary">
          <ul className="flex flex-nowrap items-center justify-center gap-x-[clamp(0.35rem,0.8vw,1.25rem)]">
            {navItems.map((item) => (
              <DesktopNavItem key={item.href} item={item} pathname={pathname} />
            ))}
          </ul>
        </nav>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
          {/* Single user icon — client avatar, admin avatar, or guest icon */}
          {clientUser ? (
            <Link
              href="/account"
              aria-label="My account"
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brand-purple-bright text-sm font-extrabold text-white transition hover:bg-brand-purple-deep"
            >
              {(clientUser.name ?? clientUser.email ?? "U").charAt(0).toUpperCase()}
            </Link>
          ) : adminSession?.isLoggedIn ? (
            <Link
              href="/admin/dashboard"
              aria-label="Admin dashboard"
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brand-navy text-sm font-extrabold text-white transition hover:bg-brand-navy/80"
            >
              {(adminSession.staffName ?? "A").charAt(0).toUpperCase()}
            </Link>
          ) : (
            <Link
              href="/login"
              aria-label="Sign in"
              className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl text-brand-navy/50 transition hover:bg-brand-lavender hover:text-brand-purple-bright"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M20 21a8 8 0 1 0-16 0" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          )}
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
        className={"border-t border-brand-teal/10 bg-white xl:hidden " + (open ? "block" : "hidden")}
      >
        <SectionContainer className="py-3 sm:py-4">
          <p className="mb-3 px-1 text-xs font-medium leading-snug text-brand-teal sm:hidden">
            Skills for Today. Independence for Life.
          </p>
          <ul className="flex flex-col gap-0.5">
            {navItems.map((item) => (
              <MobileNavItem
                key={item.href}
                item={item}
                pathname={pathname}
                onClose={() => setOpen(false)}
              />
            ))}
          </ul>
        </SectionContainer>
      </div>
    </header>
  );
}
