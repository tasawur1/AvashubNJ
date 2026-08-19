import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions, type SessionData } from "@/lib/session";
import { createAdminClient } from "@/lib/supabase-server";
import { logRequest } from "@/lib/logger";

const BUCKET = "printable-files";
const MAX_SIZE = 20 * 1024 * 1024; // 20MB
const SNIFF_BYTES = 64;

function detectFileType(prefix: Uint8Array): "pdf" | "html" | null {
  // PDF magic bytes: "%PDF-"
  const pdfMagic = [0x25, 0x50, 0x44, 0x46, 0x2d];
  if (pdfMagic.every((byte, i) => prefix[i] === byte)) return "pdf";

  // HTML has no fixed magic number — sniff the leading text instead.
  const text = new TextDecoder("utf-8", { fatal: false })
    .decode(prefix)
    .replace(/^﻿/, "") // strip BOM
    .trimStart()
    .toLowerCase();
  if (text.startsWith("<!doctype html") || text.startsWith("<html") || text.startsWith("<")) {
    return "html";
  }

  return null;
}

// Step 3 of the direct-to-Supabase upload: the browser already PUT the
// file straight to Supabase using the signed URL from /upload-file/init.
// This route is the real server-side security gate — it never buffers
// the whole file, just reads a small byte range to confirm the object
// actually is a PDF or HTML file (never trusting the client-supplied
// content-type), and rejects+deletes anything that doesn't match.
export async function POST(request: NextRequest) {
  const start = Date.now();
  let path: string | undefined;
  try {
    const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
    if (!session.isLoggedIn) {
      return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
    }

    const body = await request.json().catch(() => ({}));
    path = (body as { path?: string }).path;
    if (!path) {
      return NextResponse.json({ success: false, error: "Missing file path." }, { status: 400 });
    }

    const supabase = createAdminClient();
    const { data: { publicUrl } } = supabase.storage.from(BUCKET).getPublicUrl(path);

    const headRes = await fetch(publicUrl, { method: "HEAD" });
    if (!headRes.ok) {
      throw new Error("Uploaded file could not be found in storage.");
    }
    const sizeHeader = headRes.headers.get("content-length");
    const fileSizeBytes = sizeHeader ? Number(sizeHeader) : null;

    if (fileSizeBytes !== null && fileSizeBytes > MAX_SIZE) {
      await supabase.storage.from(BUCKET).remove([path]);
      return NextResponse.json(
        { success: false, error: "File too large. Please upload a file under 20MB." },
        { status: 413 },
      );
    }

    const rangeRes = await fetch(publicUrl, {
      headers: { Range: `bytes=0-${SNIFF_BYTES - 1}` },
    });
    if (!rangeRes.ok) {
      throw new Error("Could not read the uploaded file to verify its type.");
    }
    const prefix = new Uint8Array(await rangeRes.arrayBuffer());
    const fileType = detectFileType(prefix);

    if (!fileType) {
      await supabase.storage.from(BUCKET).remove([path]);
      return NextResponse.json(
        { success: false, error: "File must be a valid PDF or HTML document." },
        { status: 400 },
      );
    }

    logRequest({
      route: "/api/admin/printables/upload-file/verify",
      duration_ms: Date.now() - start,
      status_code: 200,
      success: true,
      metadata: { path, file_type: fileType, size_bytes: fileSizeBytes },
    });

    return NextResponse.json({
      success: true,
      url: publicUrl,
      storage_path: path,
      file_type: fileType,
      file_size_bytes: fileSizeBytes,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to verify upload.";
    logRequest({
      route: "/api/admin/printables/upload-file/verify",
      duration_ms: Date.now() - start,
      status_code: 500,
      success: false,
      error_message: message,
      metadata: { path },
    });
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
