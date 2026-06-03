export type Printable = {
  title: string;
  slug: string;
  pdf: string;
  image: string;
  description: string;
  category: string;
  dateAdded: string;
  fileSize?: string;
};

export const printables: Printable[] = [
  {
    title: "Feelings Check-In",
    slug: "feelings-check-in",
    pdf: "/worksheets/feelings-check-in.pdf",
    image: "/images/worksheets/feelings-check-in-worksheet.png",
    description:
      "A simple printable to help children name feelings and share how they are doing.",
    category: "Emotional Regulation",
    dateAdded: "2026-06-01",
    fileSize: "PDF",
  },
  {
    title: "First, Then Visual Schedule",
    slug: "first-then-visual-schedule",
    pdf: "/worksheets/first-then-visual-schedule.pdf",
    image: "/images/worksheets/first-then-visual-schedule-worksheet.png",
    description:
      "A visual support for routines, transitions, and building predictability.",
    category: "Communication Supports",
    dateAdded: "2026-05-25",
    fileSize: "PDF",
  },
  {
    title: "Morning Routine Chart",
    slug: "morning-routine-chart",
    pdf: "/worksheets/morning-routine-chart.pdf",
    image: "/images/worksheets/morning-routine-chart-worksheet.png",
    description:
      "A practical routine chart for smoother mornings and daily carryover.",
    category: "Daily Living Skills",
    dateAdded: "2026-05-18",
    fileSize: "PDF",
  },
  {
    title: "Good Choices Sort",
    slug: "good-choices-sort",
    pdf: "/worksheets/good-choices-sort.pdf",
    image: "/images/worksheets/good-choices-sort-worksheet.png",
    description:
      "A sorting activity for practicing choices, behavior expectations, and reflection.",
    category: "Behavior Supports",
    dateAdded: "2026-05-11",
    fileSize: "PDF",
  },
];
