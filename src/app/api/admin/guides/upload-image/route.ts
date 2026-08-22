import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions, type SessionData } from "@/lib/session";
import { createAdminClient } from "@/lib/supabase-server";
import { logRequest } from "@/lib/logger";

const BUCKET = "guide-images";
const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
};

export async function POST(request: NextRequest) {
  const start = Date.now();
  try {
    const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
    if (!session.isLoggedIn) {
      return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ success: false, error: "No file received." }, { status: 400 });
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { success: false, error: "File too large. Please upload an image under 5MB." },
        { status: 413 },
      );
    }

    const ext = ALLOWED_TYPES[file.type];
    if (!ext) {
      return NextResponse.json(
        { success: false, error: "Please upload a JPG, PNG, or WebP image." },
        { status: 400 },
      );
    }

    const path = `guide-${crypto.randomUUID()}.${ext}`;
    const buffer = await file.arrayBuffer();

    const supabase = createAdminClient();
    const { data, error } = await supabase.storage
      .from(BUCKET)
      .upload(path, buffer, { contentType: file.type, upsert: false });

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage.from(BUCKET).getPublicUrl(data.path);

    logRequest({
      route: "/api/admin/guides/upload-image",
      duration_ms: Date.now() - start,
      status_code: 200,
      success: true,
      metadata: { path: data.path, size_bytes: file.size, type: file.type },
    });

    return NextResponse.json({ success: true, url: publicUrl, storage_path: data.path });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Upload failed.";
    logRequest({
      route: "/api/admin/guides/upload-image",
      duration_ms: Date.now() - start,
      status_code: 500,
      success: false,
      error_message: message,
    });
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
