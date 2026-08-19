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

  // This route only renders the HTML viewer — PDFs link straight to their
  // (masked) file URL from the card. If a PDF row somehow lands here
  // anyway, send the visitor straight to the file instead of a broken viewer.
  if (printable.file_type === "pdf") {
    redirect(maskedFileUrl);
  }

  return <PrintableViewer title={printable.title} fileUrl={maskedFileUrl} />;
}
