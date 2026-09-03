"use client";

import { createContext, useCallback, useContext, useState } from "react";

// Requires an email before viewing/downloading a printable or guide. Flip
// back to false to switch it off again without removing the feature.
export const RESOURCE_GATE_ENABLED = true;

// Once shown, don't show it again to the same browser for this long —
// a repeat click within the window just opens/downloads immediately.
const SUPPRESS_MS = 12 * 60 * 60 * 1000; // 12 hours
const SHOWN_KEY = "avashub-resource-newsletter-shown-at";

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

function wasShownRecently(): boolean {
  try {
    const raw = localStorage.getItem(SHOWN_KEY);
    if (!raw) return false;
    const shownAt = Number(raw);
    return Number.isFinite(shownAt) && Date.now() - shownAt < SUPPRESS_MS;
  } catch {
    // localStorage unavailable (private browsing, etc.) — fail open and
    // just show the popup rather than erroring.
    return false;
  }
}

function markShownNow() {
  try {
    localStorage.setItem(SHOWN_KEY, String(Date.now()));
  } catch {
    // ignore — nothing to do if storage isn't available
  }
}

const gateInputCls =
  "w-full rounded-full border border-brand-teal/20 bg-[#fffaf4] px-5 py-3 text-sm text-brand-navy shadow-sm outline-none transition placeholder:text-brand-navy/40 focus:border-brand-purple-bright focus:ring-2 focus:ring-brand-purple-bright/20";

function EmailIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-brand-purple-bright" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" className="text-brand-teal" />
    </svg>
  );
}

/**
 * The popup itself — email only, no account/password/code. Submitting the
 * email doesn't open the file straight away — it shows a "Thank you" step
 * with an explicit continue button, so the visitor actually has a moment
 * to see it instead of a popup that vanishes on its own before they
 * notice. The file only opens once they click that button (which also
 * keeps window.open() for "View" squarely inside a direct click, so
 * browser popup blockers never have a reason to step in).
 */
function EmailCaptureCard({ action, onClose }: { action: OpenAction; onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitted) return;
    const trimmed = email.trim();
    if (!trimmed || !/^\S+@\S+\.\S+$/.test(trimmed)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSubmitted(true);

    fetch("/api/resource-newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: trimmed }),
    }).catch((err) => console.warn("[resource-newsletter] request failed:", err));
  }

  function handleContinue() {
    performOpen(action);
    onClose();
  }

  return (
    <div className="w-full max-w-md rounded-[2rem] bg-white p-8 text-center shadow-card ring-1 ring-brand-purple-deep/10">
      {submitted ? (
        <>
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-teal/10">
            <CheckIcon />
          </div>
          <h2 className="text-xl font-extrabold text-brand-navy">Thank you!</h2>
          <p className="mt-2 text-sm text-brand-navy/55">Your resource is ready.</p>
          <button
            type="button"
            onClick={handleContinue}
            className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-brand-purple-bright px-6 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-brand-purple-deep"
          >
            {action.download ? "Continue to Download" : "Continue to View"}
          </button>
        </>
      ) : (
        <>
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-purple-bright/10">
            <EmailIcon />
          </div>
          <h2 className="text-xl font-extrabold text-brand-navy">Stay in the loop</h2>
          <p className="mt-2 text-sm leading-relaxed text-brand-navy/55">
            Enter your email to get this resource, plus new printables and tips from Ava&apos;s Hub.
          </p>
          <form onSubmit={handleSubmit} className="mt-6 grid gap-3">
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className={gateInputCls}
            />
            {error && (
              <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">{error}</p>
            )}
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-full bg-brand-purple-bright px-6 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-brand-purple-deep"
            >
              Continue
            </button>
          </form>
          <p className="mt-4 text-xs text-brand-navy/40">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </>
      )}
    </div>
  );
}

type GateContextValue = {
  requestAccess: (action: OpenAction) => void;
};

const GateContext = createContext<GateContextValue | null>(null);

/**
 * Mounted once near the root. Any MobileDownloadCard "View"/"Download"
 * click routes through requestAccess() — if the popup was already shown
 * to this browser within the last 12 hours it opens the file immediately,
 * otherwise it shows the email popup above.
 */
export function ResourceDownloadGateProvider({ children }: { children: React.ReactNode }) {
  const [pendingAction, setPendingAction] = useState<OpenAction | null>(null);

  const requestAccess = useCallback((action: OpenAction) => {
    if (!RESOURCE_GATE_ENABLED || wasShownRecently()) {
      performOpen(action);
      return;
    }
    markShownNow();
    setPendingAction(action);
  }, []);

  return (
    <GateContext.Provider value={{ requestAccess }}>
      {children}
      {pendingAction && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-brand-navy/40 p-4 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) setPendingAction(null); }}
        >
          <div className="relative w-full max-w-md">
            <button
              type="button"
              onClick={() => setPendingAction(null)}
              aria-label="Close"
              className="absolute -top-3 -right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-brand-navy shadow-lg transition hover:bg-brand-lavender"
            >
              <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
            <EmailCaptureCard action={pendingAction} onClose={() => setPendingAction(null)} />
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
