import { createAdminClient } from "@/lib/supabase-server";
import { guides as dummyGuides } from "@/data/guides";
import type { DbGuide } from "@/data/guides-db";
import { resourcesImages } from "@/data/pageImages/resourcesImages";

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

// The 4 hardcoded dummy guides get a prettier hero image on the card;
// this map only matches those slugs and is a harmless no-op for anything else.
const mobileGuideImages: Record<string, string> = {
  "support-independence-at-home": resourcesImages.mobileGuideCard1,
  "calming-strategies": resourcesImages.mobileGuideCard2,
  "successful-routines": resourcesImages.mobileGuideCard3,
  "building-social-skills": resourcesImages.mobileGuideCard4,
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
 * Real, visible guides from Supabase when any exist; otherwise the
 * existing hardcoded dummy set, so the site never looks empty. Used by
 * both the Resources page preview and the full /guides listing.
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

    if (dbGuides.length > 0) {
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
    }
  } catch {
    // Falls through to dummy data below
  }

  return {
    usingDummy: true,
    cards: dummyGuides.map((g) => ({
      slug: g.slug,
      title: g.title,
      description: g.description,
      image: mobileGuideImages[g.slug] ?? g.image,
      viewHref: g.pdf,
      category: g.category,
    })),
  };
}
