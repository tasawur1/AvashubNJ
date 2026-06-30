"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import type { SessionData, StaffPermissions } from "@/lib/session";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  role?: SessionData["role"];
  permissions?: StaffPermissions;
  staffName?: string;
};

function ClientsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IntakesIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="9" y="3" width="6" height="4" rx="1" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 12h6M9 16h4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BlogsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 4h16v2H4zM4 9h10v2H4zM4 14h16v2H4zM4 19h10v2H4z" fill="currentColor" />
    </svg>
  );
}

function LogsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M3 12h4l3 8 4-16 3 8h4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TeamIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 21a8 8 0 1 0-16 0" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="20" cy="7" r="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M24 14a4 4 0 0 0-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="4" cy="7" r="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M0 14a4 4 0 0 1 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function AdminSidebar({ isOpen, onClose, role, permissions, staffName }: Props) {
  const pathname    = usePathname();
  const router      = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);
  const isSuperAdmin = role === "superadmin" || !role;

  // Build the nav items based on role/permissions
  function canView(section: keyof StaffPermissions): boolean {
    if (isSuperAdmin) return true;
    if (!permissions) return false;
    return (permissions[section] as Record<string, boolean>).view ?? false;
  }

  const navItems = [
    canView("clients")  && { label: "Clients",       href: "/admin/dashboard/clients", icon: <ClientsIcon /> },
    canView("intakes")  && { label: "Intake Forms",  href: "/admin/dashboard/intakes", icon: <IntakesIcon /> },
    canView("blogs")    && { label: "Blogs",          href: "/admin/dashboard/blogs",   icon: <BlogsIcon /> },
    canView("logs")     && { label: "Activity Logs", href: "/admin/dashboard/logs",    icon: <LogsIcon /> },
    isSuperAdmin        && { label: "Team",           href: "/admin/dashboard/team",    icon: <TeamIcon /> },
  ].filter(Boolean) as { label: string; href: string; icon: React.ReactNode }[];

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
    } catch {
      setLoggingOut(false);
    }
  }

  return (
    <aside
      className={
        "flex h-full w-64 shrink-0 flex-col " +
        "border-r border-white/15 bg-brand-purple-deep " +
        "fixed inset-y-0 left-0 z-30 " +
        "transition-transform duration-300 ease-in-out " +
        "md:relative md:translate-x-0 " +
        (isOpen ? "translate-x-0" : "-translate-x-full")
      }
    >
      {/* Logo area */}
      <div className="flex items-center justify-between gap-3 border-b border-white/15 px-5 py-5">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 text-white">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M12 3L4 7v5c0 4.418 3.358 8.555 8 9.93C16.642 20.555 20 16.418 20 12V7L12 3Z"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <div>
            <p className="text-sm font-extrabold leading-none text-white">Ava&apos;s Hub</p>
            <p className="mt-0.5 text-[11px] font-medium text-white/55">
              {isSuperAdmin ? "Admin Dashboard" : (staffName ? `Hi, ${staffName.split(" ")[0]}` : "Staff Dashboard")}
            </p>
          </div>
        </div>
        {/* Mobile close */}
        <button
          onClick={onClose}
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-white/60 transition hover:bg-white/10 hover:text-white md:hidden"
          aria-label="Close menu"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Admin navigation">
        <p className="mb-2 px-3 text-[10px] font-extrabold uppercase tracking-widest text-white/35">
          {isSuperAdmin ? "Content" : "My Access"}
        </p>
        <ul className="grid gap-0.5">
          {navItems.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition " +
                    (active
                      ? "bg-white/20 text-white"
                      : "text-white/70 hover:bg-white/10 hover:text-white")
                  }
                >
                  <span className="shrink-0">{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-white/15 px-3 py-4 grid gap-1">
        <Link
          href="/"
          onClick={onClose}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-white/60 transition hover:bg-white/10 hover:text-white"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M19 12H5M5 12l7-7M5 12l7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to Website
        </Link>

        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-white/60 transition hover:bg-white/10 hover:text-white disabled:opacity-50"
        >
          <LogoutIcon />
          {loggingOut ? "Signing out…" : "Sign out"}
        </button>
      </div>
    </aside>
  );
}
