import { readFile } from "node:fs/promises";
import path from "node:path";

export type CalendarEvent = {
  date: string;
  title: string;
  time: string;
  details: string;
  category: string;
  location: string;
  registrationLink: string;
};

const EVENTS_CSV_PATH = "/events/events-calendar.csv";
const EVENTS_CSV_FILE = path.join(
  process.cwd(),
  "public",
  "events",
  "events-calendar.csv",
);

function parseCsvRows(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        cell += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (!inQuotes && char === ",") {
      row.push(cell.trim());
      cell = "";
      continue;
    }

    if (!inQuotes && (char === "\n" || char === "\r")) {
      if (char === "\r" && next === "\n") i += 1;
      row.push(cell.trim());
      if (row.some((value) => value.length > 0)) rows.push(row);
      row = [];
      cell = "";
      continue;
    }

    cell += char;
  }

  if (cell.length > 0 || row.length > 0) {
    row.push(cell.trim());
    if (row.some((value) => value.length > 0)) rows.push(row);
  }

  return rows;
}

function parseEventDate(raw: string): string | null {
  const value = raw.trim();
  // CSV date format must be YYYY-MM-DD.
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]) - 1;
  const day = Number(match[3]);
  const date = new Date(year, month, day);

  if (
    date.getFullYear() === year &&
    date.getMonth() === month &&
    date.getDate() === day
  ) {
    return value;
  }

  return null;
}

function normalizeHeader(value: string): string {
  return value.trim().toLowerCase();
}

function parseEventsCsv(csv: string): CalendarEvent[] {
  const rows = parseCsvRows(csv);
  if (rows.length === 0) return [];

  const [header, ...dataRows] = rows;
  const hasHeader = normalizeHeader(header[0] ?? "") === "date";
  const body = hasHeader ? dataRows : rows;
  const columnIndex = new Map<string, number>();

  if (hasHeader) {
    header.forEach((column, index) => {
      columnIndex.set(normalizeHeader(column), index);
    });
  }

  const getColumn = (row: string[], name: string, fallbackIndex: number) => {
    const index = columnIndex.get(normalizeHeader(name)) ?? fallbackIndex;
    return row[index]?.trim() ?? "";
  };

  const events: CalendarEvent[] = [];

  for (const row of body) {
    const date = parseEventDate(getColumn(row, "Date", 0));
    const title = getColumn(row, "Title", 1);
    if (!date || !title) continue;

    events.push({
      date,
      title,
      time: getColumn(row, "Time", 2),
      details: getColumn(row, "Details", 3),
      category: getColumn(row, "Category", 4),
      location: getColumn(row, "Location", 5),
      registrationLink: getColumn(row, "RegistrationLink", 6),
    });
  }

  return events.sort((a, b) => a.date.localeCompare(b.date));
}

async function loadEventsCsv(): Promise<string> {
  if (typeof window === "undefined") {
    return readFile(EVENTS_CSV_FILE, "utf8");
  }

  try {
    // To update calendar events, edit public/events/events-calendar.csv. No code changes needed.
    const response = await fetch(EVENTS_CSV_PATH, { cache: "no-store" });
    if (!response.ok) return "";
    return response.text();
  } catch {
    return "";
  }
}

export async function fetchEvents(
  year = new Date().getFullYear(),
  month = new Date().getMonth(),
): Promise<CalendarEvent[]> {
  try {
    const csv = await loadEventsCsv();
    if (!csv) return [];
    return getEventsForMonth(parseEventsCsv(csv), year, month);
  } catch {
    return [];
  }
}

export async function fetchAllEvents(): Promise<CalendarEvent[]> {
  try {
    const csv = await loadEventsCsv();
    if (!csv) return [];
    return parseEventsCsv(csv);
  } catch {
    return [];
  }
}

export function getEventsForMonth(
  events: CalendarEvent[],
  year: number,
  month: number,
): CalendarEvent[] {
  const monthValue = String(month + 1).padStart(2, "0");

  return events.filter(
    (event) =>
      event.date.startsWith(`${year}-${monthValue}-`),
  );
}

export function groupEventsByDay(
  events: CalendarEvent[],
): Map<number, CalendarEvent[]> {
  const map = new Map<number, CalendarEvent[]>();
  for (const event of events) {
    const day = Number(event.date.slice(8, 10));
    const list = map.get(day) ?? [];
    list.push(event);
    map.set(day, list);
  }
  return map;
}

export function formatMonthYear(year: number, month: number): string {
  return new Date(year, month, 1).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

export function getCalendarGridMeta(year: number, month: number) {
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  return { firstDayOfWeek, daysInMonth };
}
