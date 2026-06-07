"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export type IntakeFormId = "ot" | "slp" | "pt";

type IntakeOverlayProps = {
  isOpen: boolean;
  onClose: () => void;
  formPath: string;
  formId: IntakeFormId | "";
  label: string;
};

export function IntakeOverlay({
  isOpen,
  onClose,
  formPath,
  formId,
  label,
}: IntakeOverlayProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "Tab") {
        const overlay = overlayRef.current;
        if (!overlay) return;
        const focusable = Array.from(
          overlay.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          )
        ).filter((el) => !el.hasAttribute("disabled"));
        if (focusable.length < 2) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen || !formId || typeof document === "undefined") return null;

  const iframeSrc = `${formPath}?formId=${formId}`;

  const overlay = (
    <>
      <style>{`
        @keyframes intakeSlideUp {
          from { opacity: 0; transform: translateY(1.25rem); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .intake-slide-up {
          animation: intakeSlideUp 0.22s ease-out forwards;
        }
      `}</style>
      <div
        ref={overlayRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${label} Intake Form`}
        className="intake-slide-up fixed inset-0 z-[99999] flex flex-col bg-[#faf6f2]"
      >
        {/* Top header bar */}
        <div className="flex shrink-0 items-center justify-between border-b border-brand-teal/15 bg-white/95 px-4 py-3 shadow-sm">
          <div className="flex items-center gap-2.5">
            <span
              aria-hidden
              className="h-2.5 w-2.5 rounded-full bg-brand-purple-bright"
            />
            <h2 className="text-sm font-extrabold text-brand-navy sm:text-base">
              {label}{" "}
              <span className="font-semibold text-brand-navy/60">
                Intake Form
              </span>
            </h2>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close intake form"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-lavender text-brand-purple-bright transition hover:bg-brand-purple-bright hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {/* Form iframe — full remaining height */}
        <div className="relative min-h-0 flex-1">
          <iframe
            src={iframeSrc}
            title={`${label} Intake Form`}
            className="h-full w-full border-0 bg-[#faf6f2]"
            allow="clipboard-write"
          />

          {/* Floating back arrow — left edge, thumb-friendly position */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Go back to contact page"
            className="absolute left-3 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-brand-navy shadow-lg backdrop-blur-sm transition hover:bg-white hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );

  return createPortal(overlay, document.body);
}
