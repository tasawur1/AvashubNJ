import { NextRequest, NextResponse } from "next/server";

const BUCKET = "guide-files";

// Supabase Storage coerces text/html uploads to text/plain when serving
// them (an anti-XSS protection against arbitrary user-uploaded HTML) — a
// plain rewrite would just inherit that wrong header, so this route fetches
// the file itself and forces the correct Content-Type based on its
// extension instead, while still streaming the body straight through
// rather than buffering it in memory.
const CONTENT_TYPES: Record<string, string> = {
  pdf: "application/pdf",
  html: "text/html; charset=utf-8",
};

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  try {
    const { path: pathSegments } = await params;
    const path = pathSegments.join("/");
    const ext = path.split(".").pop()?.toLowerCase() ?? "";
    const contentType = CONTENT_TYPES[ext];

    if (!contentType) {
      return NextResponse.json({ error: "Not found." }, { status: 404 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!supabaseUrl) throw new Error("Missing Supabase URL configuration.");

    const upstream = await fetch(
      `${supabaseUrl}/storage/v1/object/public/${BUCKET}/${path}`,
    );
    if (!upstream.ok || !upstream.body) {
      return NextResponse.json({ error: "File not found." }, { status: 404 });
    }

    return new NextResponse(upstream.body, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch {
    return NextResponse.json({ error: "Failed to load file." }, { status: 500 });
  }
}
