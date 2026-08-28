import { PDFDocument } from "pdf-lib";
import { matchesPaperSize, type PaperSize } from "@/lib/paper-sizes";

export type PdfPageSizeCheck = {
  widthIn: number;
  heightIn: number;
  matches: boolean;
};

/**
 * Reads the first page's dimensions from a PDF's raw bytes and checks it
 * against the admin-selected paper size. Returns null if the PDF can't be
 * parsed — callers should treat that as "unknown" and never block an
 * upload over it.
 */
export async function checkPdfPageSize(bytes: ArrayBuffer, target: PaperSize): Promise<PdfPageSizeCheck | null> {
  try {
    const doc = await PDFDocument.load(bytes, { ignoreEncryption: true, updateMetadata: false });
    const page = doc.getPage(0);
    const { width, height } = page.getSize();

    return {
      widthIn: Math.round((width / 72) * 100) / 100,
      heightIn: Math.round((height / 72) * 100) / 100,
      matches: matchesPaperSize(width, height, target),
    };
  } catch {
    return null;
  }
}

export function pageSizeMismatchMessage(check: PdfPageSizeCheck, target: PaperSize): string {
  return `This PDF's page is ${check.widthIn}" x ${check.heightIn}", but you selected ${target.label} (${target.widthIn}" x ${target.heightIn}"). Re-export the file at that exact size and upload again, or choose the matching size from the dropdown.`;
}
