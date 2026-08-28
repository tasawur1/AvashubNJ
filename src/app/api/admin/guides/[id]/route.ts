import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { sessionOptions, type SessionData } from "@/lib/session";
import { createAdminClient } from "@/lib/supabase-server";
import { getPaperSize } from "@/lib/paper-sizes";

const IMAGE_BUCKET = "guide-images";
const FILE_BUCKET = "guide-files";

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

// Best-effort cleanup — never throws, never blocks the caller.
async function removeStorageObject(bucket: string, path: string | null | undefined) {
  if (!path) return;
  try {
    const supabase = createAdminClient();
    await supabase.storage.from(bucket).remove([path]);
  } catch {
    // Orphaned file is an acceptable cost; a stuck admin UI is not.
  }
}

// PATCH — toggle hidden
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireAuth();
    const { id } = await params;
    const { hidden } = (await request.json()) as { hidden: boolean };

    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("guides")
      .update({ hidden })
      .eq("id", id)
      .select("slug, file_type")
      .single();

    if (error) throw new Error(error.message);

    revalidatePath("/guides");
    revalidatePath("/resources");
    if (data.file_type === "html") revalidatePath(`/guides/view/${data.slug}`);

    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof Error && err.message === "Unauthorized") {
      return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
    }
    const message = err instanceof Error ? err.message : "Failed to update guide.";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

// PUT — update a guide (slug always re-derived from title, same as blogs/printables)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireAuth();
    const { id } = await params;
    const body = await request.json();
    const title = (body.title as string | undefined)?.trim() ?? "";
    const description = (body.description as string | undefined)?.trim() ?? "";

    if (!title) {
      return NextResponse.json({ success: false, error: "Title is required." }, { status: 400 });
    }
    if (!description) {
      return NextResponse.json({ success: false, error: "Description is required." }, { status: 400 });
    }

    const card_image_url = (body.card_image_url as string | undefined) ?? "";
    const card_image_storage_path = (body.card_image_storage_path as string | undefined) ?? "";
    const file_url = (body.file_url as string | undefined) ?? "";
    const file_type = body.file_type as string | undefined;
    const storage_path = (body.storage_path as string | undefined) ?? "";

    if (!card_image_url) {
      return NextResponse.json({ success: false, error: "A card image is required." }, { status: 400 });
    }
    if (!file_url || (file_type !== "pdf" && file_type !== "html")) {
      return NextResponse.json({ success: false, error: "A PDF or HTML file is required." }, { status: 400 });
    }

    const supabase = createAdminClient();

    const { data: existing } = await supabase
      .from("guides")
      .select("slug, card_image_storage_path, storage_path")
      .eq("id", id)
      .maybeSingle();

    const oldSlug = existing?.slug as string | undefined;

    const baseSlug = slugify(title);
    let newSlug = baseSlug;
    try {
      const { data: conflict } = await supabase
        .from("guides")
        .select("id")
        .eq("slug", baseSlug)
        .neq("id", id)
        .maybeSingle();
      if (conflict) newSlug = `${baseSlug}-${Date.now()}`;
    } catch {
      // Non-fatal: keep baseSlug, worst case is a uniqueness error below
    }

    const { data, error } = await supabase
      .from("guides")
      .update({
        slug: newSlug,
        title,
        description,
        category: (body.category as string | undefined)?.trim() ?? "",
        card_image_url,
        card_image_storage_path,
        file_url,
        file_type,
        file_size_bytes: (body.file_size_bytes as number | undefined) ?? null,
        storage_path,
        paper_size: getPaperSize(body.paper_size as string | undefined).id,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(error.message);

    // Clean up replaced files (only if the new values actually differ).
    if (existing?.card_image_storage_path && existing.card_image_storage_path !== card_image_storage_path) {
      await removeStorageObject(IMAGE_BUCKET, existing.card_image_storage_path);
    }
    if (existing?.storage_path && existing.storage_path !== storage_path) {
      await removeStorageObject(FILE_BUCKET, existing.storage_path);
    }

    revalidatePath("/guides");
    revalidatePath("/resources");
    if (oldSlug && oldSlug !== newSlug) revalidatePath(`/guides/view/${oldSlug}`);
    if (file_type === "html") revalidatePath(`/guides/view/${newSlug}`);

    return NextResponse.json({ success: true, guide: data });
  } catch (err) {
    if (err instanceof Error && err.message === "Unauthorized") {
      return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
    }
    const message = err instanceof Error ? err.message : "Failed to update guide.";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

// DELETE — delete a guide
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireAuth();
    const { id } = await params;

    const supabase = createAdminClient();

    const { data: guide } = await supabase
      .from("guides")
      .select("slug, file_type, card_image_storage_path, storage_path")
      .eq("id", id)
      .maybeSingle();

    const { error } = await supabase.from("guides").delete().eq("id", id);
    if (error) throw new Error(error.message);

    await removeStorageObject(IMAGE_BUCKET, guide?.card_image_storage_path);
    await removeStorageObject(FILE_BUCKET, guide?.storage_path);

    revalidatePath("/guides");
    revalidatePath("/resources");
    if (guide?.file_type === "html" && guide.slug) {
      revalidatePath(`/guides/view/${guide.slug}`);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof Error && err.message === "Unauthorized") {
      return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
    }
    const message = err instanceof Error ? err.message : "Failed to delete guide.";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
