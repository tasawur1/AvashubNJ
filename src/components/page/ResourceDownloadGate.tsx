"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { SignInRequiredNotice } from "@/components/page/SignInRequiredNotice";

// Requires sign-in before viewing/downloading a printable or guide. Flip
// back to false to switch it off again without removing the feature.
export const RESOURCE_GATE_ENABLED = true;

type OpenAction = { href: string; download: boolean };

function performOpen({ href, download }: OpenAction) {
  if (download) {
    const a = document.createElement("a");
    a.href = href;
    a.download = "";
    a.rel = "noopener";
    document.body.appendChild(a);
    a.click();
    a.remove();
  } else {
    window.open(href, "_blank", "noopener,noreferrer");
  }
}

// Signed in either as a customer (/login, /signup) or as staff/admin
// (/admin/login) counts as "signed in" for the download gate — these are
// two separate, unrelated session systems, so both are checked directly
// rather than folding this into /api/client/me (that endpoint also drives
// the header's account icon, which must only ever reflect a real customer
// session — admins don't have a customer /account portal to go to).
export async function checkIsLoggedIn(): Promise<boolean> {
  try {
    const [clientRes, adminRes] = await Promise.all([
      fetch("/api/client/me"),
      fetch("/api/admin/session"),
    ]);
    const [clientData, adminData] = await Promise.all([clientRes.json(), adminRes.json()]);
    return !!clientData.isLoggedIn || !!adminData.isLoggedIn;
  } catch {
    return false;
  }
}

type GateContextValue = {
  requestAccess: (action: OpenAction) => void;
};

const GateContext = createContext<GateContextValue | null>(null);

/**
 * Mounted once near the root. Any MobileDownloadCard "View"/"Download"
 * click routes through requestAccess() — if the visitor already has a
 * session it opens the file immediately, otherwise it shows a small
 * "sign in to continue" popup that sends them to the real /login or
 * /signup page. Signing in does NOT auto-open the file — the visitor
 * lands back on this page and clicks View/Download again.
 */
export function ResourceDownloadGateProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [modalOpen, setModalOpen] = useState(false);
  // The page the gate was opened from, captured the moment it opens —
  // this is what "Sign In"/"Sign Up" send the visitor back to.
  const [gateOrigin, setGateOrigin] = useState(pathname);
  const isFirstRender = useRef(true);

  // This provider lives in the persistent root layout, so it never
  // remounts on its own when the visitor clicks "Sign In"/"Sign Up" inside
  // the popup — without this, the popup would stay stuck open on top of
  // whatever page comes next. Closing it whenever the route actually
  // changes keeps it tied to the page it was opened on.
  useEffect(() => {
    if (isFirstRender.current) { isFirstRender.current = false; return; }
    setModalOpen(false);
  }, [pathname]);

  const requestAccess = useCallback(async (action: OpenAction) => {
    if (!RESOURCE_GATE_ENABLED) {
      performOpen(action);
      return;
    }
    const isIn = await checkIsLoggedIn();
    if (isIn) {
      performOpen(action);
      return;
    }
    setGateOrigin(pathname);
    setModalOpen(true);
  }, [pathname]);

  return (
    <GateContext.Provider value={{ requestAccess }}>
      {children}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-brand-navy/40 p-4 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false); }}
        >
          <div className="relative w-full max-w-md">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              aria-label="Close"
              className="absolute -top-3 -right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-brand-navy shadow-lg transition hover:bg-brand-lavender"
            >
              <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
            <SignInRequiredNotice next={gateOrigin} />
          </div>
        </div>
      )}
    </GateContext.Provider>
  );
}

export function useResourceDownloadGate() {
  const ctx = useContext(GateContext);
  if (!ctx) throw new Error("useResourceDownloadGate must be used within ResourceDownloadGateProvider");
  return ctx;
}
