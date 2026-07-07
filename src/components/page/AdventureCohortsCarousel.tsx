"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "@/components/Icon";
import { PlaceholderImage } from "@/components/PlaceholderImage";

const pillStyles: Record<string, string> = {
  teal: "bg-brand-teal-light text-brand-teal",
  purple: "bg-brand-lavender text-brand-purple-bright",
  gold: "bg-brand-gold/25 text-brand-navy",
};

export type CohortSessionCard = {
  name: string;
  image: string;
  pillColor: "teal" | "purple" | "gold";
  skills: readonly string[];
};

export function AdventureCohortsCarousel({ cards }: { cards: CohortSessionCard[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(cards.length > 1);
  const [pageCount, setPageCount] = useState(Math.ceil(cards.length / 4));

  const handleScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const update = () => {
      const firstCard = el.firstElementChild as HTMLElement | null;
      if (!firstCard) return;
      const cardWidth = firstCard.offsetWidth + 20; // gap-5 = 20px
      const visible = Math.max(1, Math.round(el.clientWidth / cardWidth));
      setPageCount(Math.ceil(cards.length / visible));
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
    };

    const ro = new ResizeObserver(update);
    ro.observe(el);
    update();
    return () => ro.disconnect();
  }, [cards.length]);

  const scroll = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth, behavior: "smooth" });
  };

  return (
    <div className="relative">
      {/* Clip area — arrows sit outside this, visible over the edge; hidden on mobile so grid flows normally */}
      <div className="sm:overflow-hidden">
        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="grid grid-cols-1 gap-4 pb-1 sm:flex sm:gap-5 sm:overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {cards.map((card) => (
            <article
              key={card.name}
              className="flex shrink-0 flex-col overflow-hidden rounded-[1.75rem] bg-white/90 shadow-card ring-1 ring-brand-teal/10 sm:w-[calc(50%-10px)] xl:w-[calc(25%-15px)]"
            >
              <div className="relative aspect-[4/3] bg-brand-teal-light">
                <PlaceholderImage
                  src={card.image}
                  alt={`${card.name} cohort at Ava's Hub`}
                  fill
                  className="object-cover object-center"
                  sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 80vw"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <span
                  className={`self-start rounded-full px-3 py-1 text-xs font-extrabold ${pillStyles[card.pillColor]}`}
                >
                  {card.name}
                </span>
                <ul className="mt-4 space-y-2">
                  {card.skills.map((skill) => (
                    <li
                      key={skill}
                      className="flex items-start gap-2 text-sm leading-relaxed text-brand-navy/80"
                    >
                      <Icon
                        name="circleCheck"
                        className="mt-0.5 shrink-0 text-brand-teal"
                        size="sm"
                      />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Left arrow — hidden on mobile, carousel only on sm+ */}
      <button
        onClick={() => scroll(-1)}
        disabled={!canScrollLeft}
        aria-label="Previous cohorts"
        className="absolute -left-5 top-[38%] z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-brand-purple-deep/10 transition hover:bg-brand-lavender disabled:cursor-not-allowed disabled:opacity-30 sm:flex"
      >
        <Icon name="arrowRight" size="sm" className="rotate-180 text-brand-navy" />
      </button>

      {/* Right arrow — hidden on mobile */}
      <button
        onClick={() => scroll(1)}
        disabled={!canScrollRight}
        aria-label="Next cohorts"
        className="absolute -right-5 top-[38%] z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-brand-purple-deep/10 transition hover:bg-brand-lavender disabled:cursor-not-allowed disabled:opacity-30 sm:flex"
      >
        <Icon name="arrowRight" size="sm" className="text-brand-navy" />
      </button>

      {/* Dot indicators — hidden on mobile (grid mode), shown on sm+ carousel */}
      <div className="mt-6 hidden justify-center gap-2 sm:flex">
        {Array.from({ length: pageCount }).map((_, i) => (
          <button
            key={i}
            onClick={() => {
              const el = trackRef.current;
              if (!el) return;
              el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
            }}
            aria-label={`Go to page ${i + 1}`}
            className="h-2 w-2 rounded-full bg-brand-purple-bright/30 transition hover:bg-brand-purple-bright"
          />
        ))}
      </div>
    </div>
  );
}
