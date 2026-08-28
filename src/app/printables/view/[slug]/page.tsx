import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase-server";
import type { DbPrintable } from "@/data/printables-db";
import { PrintableViewer } from "./PrintableViewer";

export const revalidate = false;

async function getPrintable(slug: string): Promise<DbPrintable | null> {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("printables")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();
    if (error) throw error;
    return data as DbPrintable | null;
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
    const printable = await getPrintable(slug);
    if (!printable) return {};
    return {
      title: `${printable.title} | Ava's Hub`,
      description: printable.description?.slice(0, 160) ?? "",
      alternates: { canonical: `/printables/view/${slug}` },
    };
  } catch {
    return {};
  }
}

export default async function PrintableViewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const printable = await getPrintable(slug);
  if (!printable || printable.hidden) notFound();

  // Files are always linked under our own domain, never the raw Supabase
  // URL — see the /printables/files rewrite in next.config.ts.
  const maskedFileUrl = `/printables/files/${printable.storage_path}`;

  // PDFs go straight to the file — our own header bar sits on top of the
  // browser's native PDF toolbar and blocks its print button, so PDFs skip
  // the custom viewer entirely and open with the normal, fully-working
  // browser PDF viewer. Only HTML content uses the custom viewer below.
  if (printable.file_type === "pdf") {
    redirect(maskedFileUrl);
  }

  return <PrintableViewer title={printable.title} fileUrl={maskedFileUrl} next={`/printables/view/${slug}`} />;
}
