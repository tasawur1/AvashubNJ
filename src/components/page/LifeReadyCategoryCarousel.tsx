"use client";

import { useCallback, useRef, useState } from "react";
import { Icon } from "@/components/Icon";
import type { IconName } from "@/data/icons";

type Tone = "teal" | "purple" | "gold";

export type LifeReadyCategoryCard = {
  icon: IconName;
  tone: Tone;
  title: string;
  subtitle?: string;
  items?: string[];
};

const toneHeader: Record<Tone, string> = {
  teal: "bg-brand-teal-light text-brand-teal",
  purple: "bg-brand-lavender text-brand-purple-bright",
  gold: "bg-brand-gold/20 text-brand-navy",
};

const toneRing: Record<Tone, string> = {
  teal: "ring-brand-teal/15",
  purple: "ring-brand-purple-deep/10",
  gold: "ring-brand-gold/25",
};

export function LifeReadyCategoryCarousel({ cards }: { cards: LifeReadyCategoryCard[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(cards.length > 2);

  const handleScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }, []);

  const scroll = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="flex gap-5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {cards.map((card) => (
            <article
              key={card.title}
              className={`flex shrink-0 flex-col overflow-hidden rounded-[1.75rem] bg-white/90 shadow-card ring-1 ${toneRing[card.tone]}`}
              style={{ width: "calc(50% - 10px)" }}
            >
              <div className={`flex items-center gap-3 px-5 py-4 ${toneHeader[card.tone]}`}>
                <Icon name={card.icon} size="lg" />
                <h3 className="text-sm font-extrabold leading-tight">{card.title}</h3>
              </div>
              <div className="flex flex-1 flex-col p-5">
                {card.subtitle && (
                  <p className="text-xs font-semibold italic text-brand-navy/65">{card.subtitle}</p>
                )}
                <ul className={`${card.subtitle ? "mt-3" : ""} space-y-2`}>
                  {card.items?.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-xs leading-relaxed text-brand-navy/80"
                    >
                      <Icon
                        name="circleCheck"
                        className="mt-0.5 shrink-0 text-brand-teal"
                        size="sm"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Left arrow */}
      <button
        onClick={() => scroll(-1)}
        disabled={!canScrollLeft}
        aria-label="Previous categories"
        className="absolute -left-5 top-[38%] z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-brand-purple-deep/10 transition hover:bg-brand-lavender disabled:cursor-not-allowed disabled:opacity-30"
      >
        <Icon name="arrowRight" size="sm" className="rotate-180 text-brand-navy" />
      </button>

      {/* Right arrow */}
      <button
        onClick={() => scroll(1)}
        disabled={!canScrollRight}
        aria-label="Next categories"
        className="absolute -right-5 top-[38%] z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-brand-purple-deep/10 transition hover:bg-brand-lavender disabled:cursor-not-allowed disabled:opacity-30"
      >
        <Icon name="arrowRight" size="sm" className="text-brand-navy" />
      </button>

      {/* Dot indicators */}
      <div className="mt-6 flex justify-center gap-2">
        {Array.from({ length: Math.ceil(cards.length / 2) }).map((_, i) => (
          <button
            key={i}
            onClick={() => {
              const el = trackRef.current;
              if (!el) return;
              el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
            }}
            aria-label={`Page ${i + 1}`}
            className="h-2 w-2 rounded-full bg-brand-purple-bright/30 transition hover:bg-brand-purple-bright"
          />
        ))}
      </div>
    </div>
  );
}
