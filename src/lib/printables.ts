import { createAdminClient } from "@/lib/supabase-server";
import { printables as dummyPrintables } from "@/data/printables";
import type { DbPrintable } from "@/data/printables-db";
import { resourcesImages } from "@/data/pageImages/resourcesImages";

export type PrintableCard = {
  slug: string;
  title: string;
  description: string;
  image: string;
  /** Opens the printable to look at — new tab. */
  viewHref: string;
  /** Saves the raw file — only set for real (non-dummy) printables. */
  downloadHref?: string;
  category?: string;
  fileSize?: string;
};

// The 3 hardcoded dummy printables get a prettier hero image on the card;
// this map only matches those slugs and is a harmless no-op for anything else.
const mobilePrintableImages: Record<string, string> = {
  "feelings-check-in": resourcesImages.mobileWorksheetCard1,
  "first-then-visual-schedule": resourcesImages.mobileWorksheetCard2,
  "morning-routine-chart": resourcesImages.mobileWorksheetCard3,
};

/**
 * Path served under our own domain — masks the raw Supabase Storage URL
 * (see the /printables/files rewrite in next.config.ts) so nothing ever
 * exposes *.supabase.co to a visitor.
 */
function filePath(storagePath: string): string {
  return `/printables/files/${storagePath}`;
}

/**
 * Real, visible printables from Supabase when any exist; otherwise the
 * existing hardcoded dummy set, so the site never looks empty. Used by
 * both the Resources page preview and the full /printables listing.
 */
export async function getPrintableCards(): Promise<{ cards: PrintableCard[]; usingDummy: boolean }> {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("printables")
      .select("*")
      .or("hidden.is.null,hidden.eq.false")
      .order("created_at", { ascending: false });

    if (error) throw error;
    const dbPrintables = (data ?? []) as DbPrintable[];

    if (dbPrintables.length > 0) {
      return {
        usingDummy: false,
        cards: dbPrintables.map((p) => ({
          slug: p.slug,
          title: p.title,
          description: p.description,
          image: p.card_image_url,
          viewHref: p.file_type === "pdf" ? filePath(p.storage_path) : `/printables/view/${p.slug}`,
          downloadHref: filePath(p.storage_path),
          category: p.category || undefined,
          fileSize: p.file_type === "pdf" ? "PDF" : "HTML",
        })),
      };
    }
  } catch {
    // Falls through to dummy data below
  }

  return {
    usingDummy: true,
    cards: dummyPrintables.map((p) => ({
      slug: p.slug,
      title: p.title,
      description: p.description,
      image: mobilePrintableImages[p.slug] ?? p.image,
      viewHref: p.pdf,
      category: p.category,
      fileSize: p.fileSize,
    })),
  };
}
