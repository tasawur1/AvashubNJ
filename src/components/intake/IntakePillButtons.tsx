"use client";

import { useState, useEffect } from "react";
import { Icon } from "@/components/Icon";
import { IntakeOverlay, type IntakeFormId } from "@/components/intake/IntakeOverlay";
import type { IconName } from "@/data/icons";

type Tone = "purple" | "teal" | "gold";

type SupportPrompt = {
  icon: IconName;
  title: string;
  tone: Tone;
  formId: IntakeFormId;
};

const FORM_CONFIG: Record<IntakeFormId, { path: string; label: string }> = {
  ot:  { path: "/forms/ot-intake.html",  label: "Occupational Therapy" },
  slp: { path: "/forms/slp-intake.html", label: "Speech Therapy" },
  pt:  { path: "/forms/pt-intake.html",  label: "Physical Therapy" },
};

const supportPrompts: SupportPrompt[] = [
  { icon: "handHeart",     title: "Occupational Therapy", tone: "purple", formId: "ot"  },
  { icon: "communication", title: "Speech Therapy",        tone: "gold",   formId: "slp" },
  { icon: "independence",  title: "Physical Therapy",      tone: "teal",   formId: "pt"  },
];

export function IntakePillButtons({ className = "" }: { className?: string }) {
  const [activeForm, setActiveForm] = useState<IntakeFormId | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const form = params.get('form');
    if (form === 'ot' || form === 'slp' || form === 'pt') {
      setActiveForm(form as IntakeFormId);
    }
  }, []);

  return (
    <>
      <div className={`mt-6 space-y-3 ${className}`}>
        {supportPrompts.map((item, index) => (
          <button
            type="button"
            key={item.title}
            onClick={() => setActiveForm(item.formId)}
            className={`grid min-h-11 w-full grid-cols-[2.35rem_minmax(0,1fr)_auto] items-center gap-2 rounded-full py-2.5 pl-1.5 pr-4 text-[0.72rem] font-extrabold shadow-sm ring-2 transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold min-[380px]:grid-cols-[2.6rem_minmax(0,1fr)_auto] min-[380px]:text-[0.78rem] lg:min-h-[3.35rem] lg:grid-cols-[2.9rem_minmax(0,1fr)_auto] lg:gap-3 lg:py-2 lg:pl-2 lg:pr-5 lg:text-sm ${
              index === 0
                ? "bg-brand-purple-bright text-white ring-brand-purple-bright"
                : "bg-white/85 text-brand-purple-bright ring-brand-purple-bright/75"
            }`}
          >
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full min-[380px]:h-9 min-[380px]:w-9 lg:h-10 lg:w-10 ${
                index === 0
                  ? "bg-white/95 text-brand-purple-bright"
                  : "bg-brand-purple-bright text-white"
              }`}
            >
              <Icon name={item.icon} size="sm" />
            </span>
            <span className="min-w-0 flex-1 whitespace-nowrap text-left">
              {item.title}
            </span>
            <span
              className={`shrink-0 whitespace-nowrap text-[0.58rem] font-semibold italic min-[380px]:text-[0.64rem] lg:text-xs ${
                index === 0 ? "text-white/80" : "text-brand-purple-bright/70"
              }`}
            >
              Start Form
            </span>
          </button>
        ))}
      </div>

      {activeForm !== null && (
        <IntakeOverlay
          isOpen={true}
          onClose={() => setActiveForm(null)}
          formPath={FORM_CONFIG[activeForm].path}
          formId={activeForm}
          label={FORM_CONFIG[activeForm].label}
        />
      )}
    </>
  );
}
