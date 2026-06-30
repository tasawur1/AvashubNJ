import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions, type SessionData } from "@/lib/session";
import { createAdminClient } from "@/lib/supabase-server";

async function requireSuperAdmin() {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
  if (!session.isLoggedIn || session.role !== "superadmin") throw new Error("Forbidden");
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireSuperAdmin();
    const { id } = await params;
    const body = await request.json();
    const adminDb = createAdminClient();

    const allowed = ["name", "active", "permissions"] as const;
    const update: Record<string, unknown> = {};
    for (const key of allowed) {
      if (key in body) update[key] = body[key];
    }

    if (Object.keys(update).length === 0) {
      return NextResponse.json({ error: "No valid fields to update." }, { status: 400 });
    }

    const { data, error } = await adminDb
      .from("staff")
      .update(update)
      .eq("id", id)
      .select("id, email, name, active, permissions")
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true, staff: data });
  } catch (err) {
    const msg = String(err);
    if (msg.includes("Forbidden")) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireSuperAdmin();
    const { id } = await params;
    const adminDb = createAdminClient();

    // Get auth_user_id before deleting
    const { data: staff } = await adminDb
      .from("staff")
      .select("auth_user_id")
      .eq("id", id)
      .single();

    const { error } = await adminDb.from("staff").delete().eq("id", id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    // Also remove from Supabase Auth
    if (staff?.auth_user_id) {
      await adminDb.auth.admin.deleteUser(staff.auth_user_id);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    const msg = String(err);
    if (msg.includes("Forbidden")) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
