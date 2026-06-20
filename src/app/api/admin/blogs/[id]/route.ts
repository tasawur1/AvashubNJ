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

// PATCH — toggle hidden
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth();
    const { id } = await params;
    const { hidden } = (await request.json()) as { hidden: boolean };

    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("blogs")
      .update({ hidden })
      .eq("id", id)
      .select("slug")
      .single();

    if (error) throw new Error(error.message);

    revalidatePath("/blogs");
    revalidatePath(`/blogs/${data.slug}`);

    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof Error && err.message === "Unauthorized") {
      return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
    }
    const message = err instanceof Error ? err.message : "Failed to update blog.";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
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

// PUT — update a blog (slug always re-derived from title)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth();
    const { id } = await params;
    const body = await request.json();
    const title = (body.title as string | undefined)?.trim() ?? "";

    if (!title) {
      return NextResponse.json({ success: false, error: "Title is required." }, { status: 400 });
    }

    const supabase = createAdminClient();

    // Fetch old slug so we can revalidate it after the update
    const { data: existing } = await supabase
      .from("blogs")
      .select("slug")
      .eq("id", id)
      .maybeSingle();

    const oldSlug = existing?.slug as string | undefined;

    // Compute new slug from updated title
    const baseSlug = slugify(title);
    let newSlug = baseSlug;

    // If the slug is already taken by a different blog, append a timestamp
    try {
      const { data: conflict } = await supabase
        .from("blogs")
        .select("id")
        .eq("slug", baseSlug)
        .neq("id", id)
        .maybeSingle();

      if (conflict) newSlug = `${baseSlug}-${Date.now()}`;
    } catch {
      // Non-fatal: keep baseSlug, worst case is a uniqueness error below
    }

    const { data, error } = await supabase
      .from("blogs")
      .update({
        slug: newSlug,
        title,
        date: (body.date as string | undefined)?.trim() ?? "",
        author: (body.author as string | undefined)?.trim() ?? "",
        summary: (body.summary as string | undefined)?.trim() ?? "",
        content: (body.content as string | undefined) ?? "",
        image_desktop: (body.image_desktop as string | undefined) ?? "",
        image_mobile: (body.image_mobile as string | undefined) ?? "",
        tone: (body.tone as string | undefined) ?? "teal",
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(error.message);

    revalidatePath("/blogs");
    if (oldSlug && oldSlug !== newSlug) revalidatePath(`/blogs/${oldSlug}`);
    revalidatePath(`/blogs/${newSlug}`);

    return NextResponse.json({ success: true, blog: data });
  } catch (err) {
    if (err instanceof Error && err.message === "Unauthorized") {
      return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
    }
    const message = err instanceof Error ? err.message : "Failed to update blog.";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

// DELETE — delete a blog
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth();
    const { id } = await params;

    const supabase = createAdminClient();

    // Fetch slug before deleting so we can revalidate it
    const { data: blog } = await supabase
      .from("blogs")
      .select("slug")
      .eq("id", id)
      .maybeSingle();

    const { error } = await supabase.from("blogs").delete().eq("id", id);
    if (error) throw new Error(error.message);

    revalidatePath("/blogs");
    if (blog?.slug) revalidatePath(`/blogs/${blog.slug}`);

    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof Error && err.message === "Unauthorized") {
      return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
    }
    const message = err instanceof Error ? err.message : "Failed to delete blog.";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
