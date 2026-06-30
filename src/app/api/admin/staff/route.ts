import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions, type SessionData, DEFAULT_STAFF_PERMISSIONS } from "@/lib/session";
import { createAdminClient } from "@/lib/supabase-server";

async function requireSuperAdmin() {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
  if (!session.isLoggedIn || session.role !== "superadmin") throw new Error("Forbidden");
}

export async function GET() {
  try {
    await requireSuperAdmin();
    const adminDb = createAdminClient();
    const { data, error } = await adminDb
      .from("staff")
      .select("id, email, name, active, permissions, created_at")
      .order("created_at", { ascending: false });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ staff: data ?? [] });
  } catch (err) {
    const msg = String(err);
    if (msg.includes("Forbidden")) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireSuperAdmin();
    const { email, name, password, permissions } = await request.json();

    if (!email || !name || !password) {
      return NextResponse.json({ error: "Email, name, and password are required." }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
    }

    const adminDb = createAdminClient();

    // Create Supabase Auth user (skip email confirmation — admin is adding them directly)
    const { data: authData, error: authError } = await adminDb.auth.admin.createUser({
      email: email.trim().toLowerCase(),
      password,
      email_confirm: true,
    });

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    // Insert staff record
    const { data: staff, error: staffError } = await adminDb
      .from("staff")
      .insert({
        auth_user_id: authData.user.id,
        email: email.trim().toLowerCase(),
        name: name.trim(),
        active: true,
        permissions: permissions ?? DEFAULT_STAFF_PERMISSIONS,
      })
      .select("id, email, name, active, permissions, created_at")
      .single();

    if (staffError) {
      // Rollback: delete the auth user we just created
      await adminDb.auth.admin.deleteUser(authData.user.id);
      return NextResponse.json({ error: staffError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, staff });
  } catch (err) {
    const msg = String(err);
    if (msg.includes("Forbidden")) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
