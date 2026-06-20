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

// GET — list all blogs
export async function GET() {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    return NextResponse.json({ success: true, blogs: data ?? [] });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to fetch blogs.";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

// POST — create a new blog
export async function POST(request: NextRequest) {
  try {
    await requireAuth();

    const body = await request.json();
    const { title, date, author, summary, content, image_desktop, image_mobile, tone } =
      body as {
        title?: string;
        date?: string;
        author?: string;
        summary?: string;
        content?: string;
        image_desktop?: string;
        image_mobile?: string;
        tone?: string;
      };

    if (!title?.trim()) {
      return NextResponse.json({ success: false, error: "Title is required." }, { status: 400 });
    }

    const baseSlug = slugify(title);
    const supabase = createAdminClient();

    // Ensure slug uniqueness by appending a timestamp if needed
    let slug = baseSlug;
    const { data: existing } = await supabase
      .from("blogs")
      .select("slug")
      .eq("slug", baseSlug)
      .maybeSingle();

    if (existing) {
      slug = `${baseSlug}-${Date.now()}`;
    }

    const { data, error } = await supabase
      .from("blogs")
      .insert({
        slug,
        title: title.trim(),
        date: date?.trim() ?? "",
        author: author?.trim() ?? "",
        summary: summary?.trim() ?? "",
        content: content ?? "",
        image_desktop: image_desktop ?? "",
        image_mobile: image_mobile ?? "",
        tone: tone ?? "teal",
        hidden: false,
      })
      .select()
      .single();

    if (error) throw new Error(error.message);

    revalidatePath("/blogs");
    revalidatePath(`/blogs/${slug}`);

    return NextResponse.json({ success: true, blog: data }, { status: 201 });
  } catch (err) {
    if (err instanceof Error && err.message === "Unauthorized") {
      return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
    }
    const message = err instanceof Error ? err.message : "Unknown error.";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
