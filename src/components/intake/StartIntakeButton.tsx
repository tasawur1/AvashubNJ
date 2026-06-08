"use client";

import { useState } from "react";
import { Icon } from "@/components/Icon";
import { IntakeOverlay } from "@/components/intake/IntakeOverlay";

export function StartIntakeButton({ className = "" }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={`grid min-h-[3.35rem] w-full max-w-sm grid-cols-[2.9rem_minmax(0,1fr)] items-center gap-3 rounded-full bg-brand-purple-bright py-2 pl-2 pr-5 text-sm font-extrabold text-white shadow-sm ring-2 ring-brand-purple-bright transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold ${className}`}
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-brand-purple-bright">
          <Icon name="handHeart" size="sm" />
        </span>
        <span className="min-w-0 whitespace-nowrap text-left">
          Start Intake Form
        </span>
      </button>

      <IntakeOverlay
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        formPath="/forms/ot-intake.html"
        formId="ot"
        label="Occupational Therapy"
      />
    </>
  );
}
