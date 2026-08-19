import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { sessionOptions, type SessionData } from "@/lib/session";
import { createAdminClient } from "@/lib/supabase-server";

async function requireAuth() {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
  if (!session.isLoggedIn) throw new Error("Unauthorized");
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

// GET — list all printables
export async function GET() {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("printables")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    return NextResponse.json({ success: true, printables: data ?? [] });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to fetch printables.";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

// POST — create a new printable
export async function POST(request: NextRequest) {
  try {
    await requireAuth();

    const body = await request.json();
    const {
      title,
      description,
      category,
      card_image_url,
      card_image_storage_path,
      file_url,
      file_type,
      file_size_bytes,
      storage_path,
    } = body as {
      title?: string;
      description?: string;
      category?: string;
      card_image_url?: string;
      card_image_storage_path?: string;
      file_url?: string;
      file_type?: string;
      file_size_bytes?: number | null;
      storage_path?: string;
    };

    if (!title?.trim()) {
      return NextResponse.json({ success: false, error: "Title is required." }, { status: 400 });
    }
    if (!description?.trim()) {
      return NextResponse.json({ success: false, error: "Description is required." }, { status: 400 });
    }
    if (!card_image_url) {
      return NextResponse.json({ success: false, error: "A card image is required." }, { status: 400 });
    }
    if (!file_url || (file_type !== "pdf" && file_type !== "html")) {
      return NextResponse.json({ success: false, error: "A PDF or HTML file is required." }, { status: 400 });
    }

    const baseSlug = slugify(title);
    const supabase = createAdminClient();

    let slug = baseSlug;
    const { data: existing } = await supabase
      .from("printables")
      .select("slug")
      .eq("slug", baseSlug)
      .maybeSingle();

    if (existing) {
      slug = `${baseSlug}-${Date.now()}`;
    }

    const { data, error } = await supabase
      .from("printables")
      .insert({
        slug,
        title: title.trim(),
        description: description.trim(),
        category: category?.trim() ?? "",
        card_image_url,
        card_image_storage_path: card_image_storage_path ?? "",
        file_url,
        file_type,
        file_size_bytes: file_size_bytes ?? null,
        storage_path: storage_path ?? "",
        hidden: false,
      })
      .select()
      .single();

    if (error) throw new Error(error.message);

    revalidatePath("/printables");
    revalidatePath("/resources");
    if (file_type === "html") revalidatePath(`/printables/view/${slug}`);

    return NextResponse.json({ success: true, printable: data }, { status: 201 });
  } catch (err) {
    if (err instanceof Error && err.message === "Unauthorized") {
      return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
    }
    const message = err instanceof Error ? err.message : "Unknown error.";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
