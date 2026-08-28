import { createAdminClient } from "@/lib/supabase-server";
import type { DbGuide } from "@/data/guides-db";

export type GuideCard = {
  slug: string;
  title: string;
  description: string;
  image: string;
  /** Opens the guide to look at — new tab. */
  viewHref: string;
  /** Saves the raw file — only set for real (non-dummy) guides. */
  downloadHref?: string;
  category?: string;
  fileSize?: string;
};

/**
 * Path served under our own domain — masks the raw Supabase Storage URL
 * (see /guides/files/[...path]) so nothing ever exposes *.supabase.co to
 * a visitor.
 */
function filePath(storagePath: string): string {
  return `/guides/files/${storagePath}`;
}

/**
 * Real, visible guides from Supabase, if any. No dummy fallback — the
 * Guides section stays hidden on the site until at least one real guide
 * is published. Used by both the Resources page preview and the full
 * /guides listing.
 */
export async function getGuideCards(): Promise<{ cards: GuideCard[]; usingDummy: boolean }> {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("guides")
      .select("*")
      .or("hidden.is.null,hidden.eq.false")
      .order("created_at", { ascending: false });

    if (error) throw error;
    const dbGuides = (data ?? []) as DbGuide[];

    return {
      usingDummy: false,
      cards: dbGuides.map((g) => ({
        slug: g.slug,
        title: g.title,
        description: g.description,
        image: g.card_image_url,
        viewHref: g.file_type === "pdf" ? filePath(g.storage_path) : `/guides/view/${g.slug}`,
        downloadHref: filePath(g.storage_path),
        category: g.category || undefined,
        fileSize: g.file_type === "pdf" ? "PDF" : "HTML",
      })),
    };
  } catch {
    return { usingDummy: false, cards: [] };
  }
}
