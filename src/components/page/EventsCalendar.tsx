"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/Icon";
import type { CalendarEvent } from "@/lib/fetchEvents";

type EventsCalendarProps = {
  events: CalendarEvent[];
  variant?: "mobile" | "desktop";
};

const MOBILE_FILTERS = [
  {
    key: "all",
    label: "All",
    categories: null,
  },
  {
    key: "social",
    label: "Social Groups",
    categories: ["Social Groups", "Social", "Teen Social"],
  },
  {
    key: "family",
    label: "Family Events",
    categories: ["Family Events", "Family"],
  },
  {
    key: "seasonal",
    label: "Seasonal Celebrations",
    categories: [
      "Seasonal Celebrations",
      "Seasonal",
      "Holiday",
      "Special Event",
      "Celebration",
    ],
  },
  {
    key: "workshops",
    label: "Workshops",
    categories: [
      "Workshops",
      "Workshop",
      "Parent Training",
      "Life Skills",
      "Teen Life Skills",
    ],
  },
] as const;

const DESKTOP_FILTERS = [
  {
    key: "all",
    label: "All Events",
    categories: null,
  },
  {
    key: "workshops",
    label: "Workshops",
    categories: [
      "Workshops",
      "Workshop",
      "Parent Training",
      "Life Skills",
      "Teen Life Skills",
    ],
  },
  {
    key: "family",
    label: "Family Events",
    categories: ["Family Events", "Family"],
  },
  {
    key: "community",
    label: "Community Outings",
    categories: ["Community", "Community Outings"],
  },
  {
    key: "celebrations",
    label: "Special Celebrations",
    categories: [
      "Seasonal Celebrations",
      "Seasonal",
      "Holiday",
      "Special Event",
      "Celebration",
    ],
  },
] as const;

const MIN_YEAR = 2026;
const YEAR_RANGE = 8;
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

function formatDateLabel(date: string): string {
  const [year, month, day] = date.split("-").map(Number);

  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

function formatDateBadge(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  const value = new Date(year, month - 1, day);

  return {
    month: value.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
    day: String(day),
  };
}

function getYearOptions(events: CalendarEvent[]) {
  const currentYear = new Date().getFullYear();
  const maxEventYear = events.reduce((max, event) => {
    const year = Number(event.date.slice(0, 4));
    return Number.isFinite(year) ? Math.max(max, year) : max;
  }, MIN_YEAR);
  const maxYear = Math.max(currentYear + YEAR_RANGE, maxEventYear, MIN_YEAR);

  return Array.from(
    { length: maxYear - MIN_YEAR + 1 },
    (_, index) => MIN_YEAR + index,
  );
}

function getDayOptions(year: number, month: number) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  return Array.from({ length: daysInMonth }, (_, index) => index + 1);
}

/**
 * Renders the current month from local CSV event data.
 * To update calendar events, edit public/events/events-calendar.csv. No code changes needed.
 */
export function EventsCalendar({ events, variant = "mobile" }: EventsCalendarProps) {
  const now = new Date();
  const initialYear = Math.max(now.getFullYear(), MIN_YEAR);
  const initialMonth = now.getMonth();
  const [selectedYear, setSelectedYear] = useState(initialYear);
  const [selectedMonth, setSelectedMonth] = useState(initialMonth);
  const [selectedDay, setSelectedDay] = useState("all");
  const filters = variant === "desktop" ? DESKTOP_FILTERS : MOBILE_FILTERS;
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const monthLabel = `${MONTHS[selectedMonth]} ${selectedYear}`;
  const yearOptions = useMemo(() => getYearOptions(events), [events]);
  const dayOptions = useMemo(
    () => getDayOptions(selectedYear, selectedMonth),
    [selectedYear, selectedMonth],
  );

  const filteredEvents = useMemo(() => {
    const selected = filters.find((filter) => filter.key === activeFilter);
    const selectedCategories: readonly string[] | null =
      selected?.categories ?? null;
    const monthValue = String(selectedMonth + 1).padStart(2, "0");
    const selectedMonthPrefix = `${selectedYear}-${monthValue}-`;
    const monthEvents = events.filter((event) =>
      event.date.startsWith(selectedMonthPrefix),
    );
    const dayEvents =
      selectedDay === "all"
        ? monthEvents
        : monthEvents.filter(
            (event) => event.date.slice(8, 10) === selectedDay.padStart(2, "0"),
          );
    const filtered = selectedCategories
      ? dayEvents.filter((event) => selectedCategories.includes(event.category))
      : dayEvents;

    return [...filtered].sort(
      (a, b) =>
        a.date.localeCompare(b.date) || a.time.localeCompare(b.time),
    );
  }, [activeFilter, events, filters, selectedDay, selectedMonth, selectedYear]);

  return (
    <div className="mx-auto max-w-6xl rounded-[1.5rem] bg-[#fffaf4]/80 p-4 ring-1 ring-brand-teal/10 sm:bg-transparent sm:p-0 sm:ring-0">
      <div className="mb-6 flex flex-col items-start gap-4 sm:items-center lg:mb-7 lg:items-stretch">
        <p className="inline-flex items-center rounded-full bg-brand-lavender px-4 py-2 text-left text-sm font-extrabold text-brand-purple-bright ring-1 ring-brand-purple-deep/10 sm:text-center sm:text-lg">
          {monthLabel}
        </p>
        <div className="flex flex-wrap justify-start gap-2 sm:justify-center lg:justify-start">
          <label className="sr-only" htmlFor="events-day">
            Select event date
          </label>
          <select
            id="events-day"
            value={selectedDay}
            onChange={(event) => setSelectedDay(event.target.value)}
            className="rounded-full border border-brand-teal/15 bg-white/95 px-4 py-2 text-sm font-semibold text-brand-navy shadow-sm outline-none transition hover:bg-brand-teal-light/40 focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20"
          >
            <option value="all">All dates</option>
            {dayOptions.map((day) => (
              <option key={day} value={String(day).padStart(2, "0")}>
                {day}
              </option>
            ))}
          </select>

          <label className="sr-only" htmlFor="events-month">
            Select event month
          </label>
          <select
            id="events-month"
            value={selectedMonth}
            onChange={(event) => {
              setSelectedMonth(Number(event.target.value));
              setSelectedDay("all");
            }}
            className="rounded-full border border-brand-teal/15 bg-white/95 px-4 py-2 text-sm font-semibold text-brand-navy shadow-sm outline-none transition hover:bg-brand-teal-light/40 focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20"
          >
            {MONTHS.map((monthName, index) => (
              <option key={monthName} value={index}>
                {monthName}
              </option>
            ))}
          </select>

          <label className="sr-only" htmlFor="events-year">
            Select event year
          </label>
          <select
            id="events-year"
            value={selectedYear}
            onChange={(event) => {
              setSelectedYear(Number(event.target.value));
              setSelectedDay("all");
            }}
            className="rounded-full border border-brand-teal/15 bg-white/95 px-4 py-2 text-sm font-semibold text-brand-navy shadow-sm outline-none transition hover:bg-brand-teal-light/40 focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20"
          >
            {yearOptions.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      <fieldset className="mb-8 lg:mb-9">
        <legend className="sr-only">Filter events by category</legend>
        <div className="flex flex-wrap justify-start gap-2 sm:justify-center sm:gap-3 lg:justify-start">
          {filters.map((filter) => {
            const selected = filter.key === activeFilter;

            return (
              <label
                key={filter.key}
                className={
                  `inline-flex cursor-pointer items-center rounded-full px-4 py-2.5 text-sm font-semibold transition focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-brand-teal ` +
                  (selected
                    ? "bg-brand-purple-bright text-white shadow-md"
                    : "bg-white/95 text-brand-navy ring-1 ring-brand-teal/15 hover:bg-brand-teal-light")
                }
              >
                <input
                  type="radio"
                  name="event-category"
                  value={filter.key}
                  checked={selected}
                  onChange={() => setActiveFilter(filter.key)}
                  className="sr-only"
                />
                {filter.label}
              </label>
            );
          })}
        </div>
      </fieldset>

      {filteredEvents.length > 0 ? (
        <div className="grid gap-4 lg:grid-cols-2 xl:gap-5">
          {filteredEvents.map((event) => {
            const badge = formatDateBadge(event.date);

            return (
              <article
                key={`${event.date}-${event.title}-${event.time}`}
                className="grid min-h-28 grid-cols-[4.5rem_1fr] overflow-hidden rounded-[1.35rem] bg-white/95 shadow-card ring-1 ring-brand-teal/10 lg:grid-cols-[5rem_1fr]"
                title={event.details || event.title}
                aria-label={
                  event.details
                    ? `${event.title}. ${event.details}`
                    : event.title
                }
              >
                <div className="flex flex-col items-center justify-center bg-brand-teal px-3 py-5 text-white">
                  <span className="text-[0.65rem] font-bold uppercase leading-none tracking-normal">
                    {badge.month}
                  </span>
                  <span className="mt-1 text-2xl font-extrabold leading-none text-brand-gold">
                    {badge.day}
                  </span>
                </div>

                <div className="flex min-w-0 flex-col justify-center bg-gradient-to-br from-brand-teal-light/45 to-brand-lavender/25 px-5 py-4 lg:px-6 lg:py-5">
                  <p className="text-xs font-bold uppercase tracking-normal text-brand-teal">
                    {event.category}
                  </p>
                  <h3 className="mt-1 text-sm font-bold leading-snug text-brand-navy sm:text-base">
                    {event.title}
                  </h3>
                  <p className="sr-only">{formatDateLabel(event.date)}</p>
                  {event.time ? (
                    <p className="mt-3 inline-flex w-fit rounded-full bg-white px-3 py-1 text-xs font-semibold text-brand-navy shadow-sm ring-1 ring-brand-teal/10">
                      {event.time}
                    </p>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <p className="rounded-[1.35rem] bg-brand-teal-light/35 px-5 py-6 text-center text-sm font-semibold text-brand-navy/75 ring-1 ring-brand-teal/10">
          Events will be updated soon. Stay tuned.
        </p>
      )}

      <p className="mt-8 flex items-center justify-center gap-2 text-center text-xs font-semibold leading-relaxed text-brand-purple-deep/85 sm:text-sm">
        <Icon name="heart" className="text-brand-gold" size="sm" />
        <span>
          Events are subject to change. Please check back often for the latest updates.
        </span>
      </p>
    </div>
  );
}
