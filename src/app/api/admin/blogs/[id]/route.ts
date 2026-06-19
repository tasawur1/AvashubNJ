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

// PUT — update a blog
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth();
    const { id } = await params;
    const body = await request.json();

    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("blogs")
      .update({
        title: body.title?.trim(),
        date: body.date?.trim(),
        author: body.author?.trim(),
        summary: body.summary?.trim(),
        content: body.content,
        image_desktop: body.image_desktop ?? "",
        image_mobile: body.image_mobile ?? "",
        tone: body.tone ?? "teal",
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(error.message);

    revalidatePath("/blogs");
    revalidatePath(`/blogs/${data.slug}`);

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
