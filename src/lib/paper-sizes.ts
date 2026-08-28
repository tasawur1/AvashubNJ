// Standard print paper sizes we let admins pick from before uploading a
// printable/guide PDF. Dimensions are in points (72pt = 1in) — the same
// unit PDF page boxes use, so a page's actual size can be compared
// directly against whichever option was selected.

export type PaperSizeId =
  | "letter-portrait"
  | "letter-landscape"
  | "legal-portrait"
  | "a4-portrait"
  | "a4-landscape";

export type PaperSize = {
  id: PaperSizeId;
  label: string;
  widthIn: number;
  heightIn: number;
  widthPt: number;
  heightPt: number;
};

function inchesToPt(inches: number): number {
  return Math.round(inches * 72 * 100) / 100;
}

function size(id: PaperSizeId, label: string, widthIn: number, heightIn: number): PaperSize {
  return { id, label, widthIn, heightIn, widthPt: inchesToPt(widthIn), heightPt: inchesToPt(heightIn) };
}

export const PAPER_SIZES: PaperSize[] = [
  size("letter-portrait", 'Letter — Portrait (8.5" x 11")', 8.5, 11),
  size("letter-landscape", 'Letter — Landscape (11" x 8.5")', 11, 8.5),
  size("legal-portrait", 'Legal — Portrait (8.5" x 14")', 8.5, 14),
  size("a4-portrait", 'A4 — Portrait (8.27" x 11.69")', 8.27, 11.69),
  size("a4-landscape", 'A4 — Landscape (11.69" x 8.27")', 11.69, 8.27),
];

export const DEFAULT_PAPER_SIZE_ID: PaperSizeId = "letter-portrait";

export function getPaperSize(id: string | null | undefined): PaperSize {
  return PAPER_SIZES.find((s) => s.id === id) ?? PAPER_SIZES.find((s) => s.id === DEFAULT_PAPER_SIZE_ID)!;
}

const TOLERANCE_PT = 3;

export function matchesPaperSize(widthPt: number, heightPt: number, target: PaperSize): boolean {
  return (
    Math.abs(widthPt - target.widthPt) <= TOLERANCE_PT &&
    Math.abs(heightPt - target.heightPt) <= TOLERANCE_PT
  );
}
