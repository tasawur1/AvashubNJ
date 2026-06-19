import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions, type SessionData } from "@/lib/session";
import { createAdminClient } from "@/lib/supabase-server";

export async function POST(request: NextRequest) {
  try {
    const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
    if (!session.isLoggedIn) {
      return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const label = (formData.get("label") as string | null) ?? "image";

    if (!file) {
      return NextResponse.json({ success: false, error: "No file received." }, { status: 400 });
    }

    const ext = file.type === "image/png" ? "png" : "jpg";
    const filename = `${label}-${Date.now()}.${ext}`;
    const buffer = await file.arrayBuffer();

    const supabase = createAdminClient();
    const { data, error } = await supabase.storage
      .from("blog-images")
      .upload(filename, buffer, { contentType: file.type, upsert: false });

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from("blog-images")
      .getPublicUrl(data.path);

    return NextResponse.json({ success: true, url: publicUrl });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Upload failed.";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
