"use client";

import { useState } from "react";
import { Icon } from "@/components/Icon";
import type { EventCategory } from "@/data/pageContent/types";

export type EventCategoryTabsProps = {
  categories: EventCategory[];
};

export function EventCategoryTabs({ categories }: EventCategoryTabsProps) {
  const [activeId, setActiveId] = useState(categories[0]?.id ?? "");

  const active =
    categories.find((c) => c.id === activeId) ?? categories[0];

  return (
    <div>
      <div
        className="flex flex-wrap justify-center gap-2 sm:gap-3"
        role="tablist"
        aria-label="Event categories"
      >
        {categories.map((cat) => {
          const selected = cat.id === activeId;
          return (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActiveId(cat.id)}
              className={
                `inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal ` +
                (selected
                  ? "bg-brand-teal text-white shadow-md"
                  : "bg-white text-brand-navy ring-1 ring-brand-teal/15 hover:bg-brand-teal-light")
              }
            >
              <Icon name={cat.icon} size="sm" />
              {cat.label}
            </button>
          );
        })}
      </div>

      {active ? (
        <div
          role="tabpanel"
          className="mt-6 rounded-2xl bg-brand-lavender/60 px-6 py-5 text-center ring-1 ring-brand-purple-deep/10 sm:px-8"
        >
          <p className="text-sm leading-relaxed text-brand-navy/85 sm:text-base">
            {active.description}
          </p>
        </div>
      ) : null}
    </div>
  );
}
