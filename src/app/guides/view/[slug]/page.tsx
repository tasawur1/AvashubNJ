import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase-server";
import type { DbGuide } from "@/data/guides-db";
import { GuideViewer } from "./GuideViewer";

export const revalidate = false;

async function getGuide(slug: string): Promise<DbGuide | null> {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("guides")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();
    if (error) throw error;
    return data as DbGuide | null;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  try {
    const { slug } = await params;
    const guide = await getGuide(slug);
    if (!guide) return {};
    return {
      title: `${guide.title} | Ava's Hub`,
      description: guide.description?.slice(0, 160) ?? "",
      alternates: { canonical: `/guides/view/${slug}` },
    };
  } catch {
    return {};
  }
}

export default async function GuideViewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = await getGuide(slug);
  if (!guide || guide.hidden) notFound();

  // Files are always linked under our own domain, never the raw Supabase
  // URL — see /guides/files/[...path].
  const maskedFileUrl = `/guides/files/${guide.storage_path}`;

  // PDFs go straight to the file — our own header bar sits on top of the
  // browser's native PDF toolbar and blocks its print button, so PDFs skip
  // the custom viewer entirely and open with the normal, fully-working
  // browser PDF viewer. Only HTML content uses the custom viewer below.
  if (guide.file_type === "pdf") {
    redirect(maskedFileUrl);
  }

  return <GuideViewer title={guide.title} fileUrl={maskedFileUrl} />;
}
