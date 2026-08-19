import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions, type SessionData } from "@/lib/session";
import { createAdminClient } from "@/lib/supabase-server";
import { logRequest } from "@/lib/logger";

const BUCKET = "printable-files";
const MAX_SIZE = 20 * 1024 * 1024; // 20MB
const ALLOWED_TYPES: Record<string, string> = {
  "application/pdf": "pdf",
  "text/html": "html",
};

// Step 1 of the direct-to-Supabase upload: the browser never sends file
// bytes here, only metadata — this route just hands back a short-lived
// signed upload URL so the large file goes straight to Supabase Storage
// instead of through our own server (keeps Vercel function load ~0).
export async function POST(request: NextRequest) {
  const start = Date.now();
  try {
    const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
    if (!session.isLoggedIn) {
      return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
    }

    const body = await request.json().catch(() => ({}));
    const { contentType, size } = body as { contentType?: string; size?: number };

    if (!contentType || typeof size !== "number") {
      return NextResponse.json({ success: false, error: "Missing file metadata." }, { status: 400 });
    }

    const ext = ALLOWED_TYPES[contentType];
    if (!ext) {
      return NextResponse.json(
        { success: false, error: "Please upload a PDF or HTML file." },
        { status: 400 },
      );
    }

    if (size > MAX_SIZE) {
      return NextResponse.json(
        { success: false, error: "File too large. Please upload a file under 20MB." },
        { status: 413 },
      );
    }

    const path = `printable-${crypto.randomUUID()}.${ext}`;
    const supabase = createAdminClient();
    const { data, error } = await supabase.storage.from(BUCKET).createSignedUploadUrl(path);

    if (error) throw error;

    logRequest({
      route: "/api/admin/printables/upload-file/init",
      duration_ms: Date.now() - start,
      status_code: 200,
      success: true,
      metadata: { path, size_bytes: size, contentType },
    });

    return NextResponse.json({
      success: true,
      signedUrl: data.signedUrl,
      token: data.token,
      path: data.path,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to start upload.";
    logRequest({
      route: "/api/admin/printables/upload-file/init",
      duration_ms: Date.now() - start,
      status_code: 500,
      success: false,
      error_message: message,
    });
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
