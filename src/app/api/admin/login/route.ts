import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions, type SessionData } from "@/lib/session";
import { createPublicClient, createAdminClient } from "@/lib/supabase-server";

const SUPERADMIN_EMAIL    = process.env.ADMIN_EMAIL    ?? "hello@avashubnj.com";
const SUPERADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "Mutikani1983";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body as { email?: string; password?: string };

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    const session = await getIronSession<SessionData>(await cookies(), sessionOptions);

    // ── Superadmin path ───────────────────────────────────────────────────────
    if (
      normalizedEmail === SUPERADMIN_EMAIL.toLowerCase() &&
      password === SUPERADMIN_PASSWORD
    ) {
      session.isLoggedIn   = true;
      session.role         = "superadmin";
      session.staffId      = undefined;
      session.staffName    = undefined;
      session.permissions  = undefined;
      await session.save();
      return NextResponse.json({ success: true, role: "superadmin" });
    }

    // ── Staff path (Supabase Auth) ────────────────────────────────────────────
    const publicClient = createPublicClient();
    const { data: authData, error: authError } = await publicClient.auth.signInWithPassword({
      email: normalizedEmail,
      password,
    });

    if (authError || !authData.user) {
      return NextResponse.json(
        { success: false, error: "Incorrect email or password." },
        { status: 401 }
      );
    }

    // Verify the user is an active staff member
    const adminDb = createAdminClient();
    const { data: staffRecord } = await adminDb
      .from("staff")
      .select("id, name, active, permissions")
      .eq("email", normalizedEmail)
      .maybeSingle();

    if (!staffRecord || !staffRecord.active) {
      return NextResponse.json(
        { success: false, error: "Your account is not authorized for admin access." },
        { status: 403 }
      );
    }

    session.isLoggedIn  = true;
    session.role        = "staff";
    session.staffId     = staffRecord.id;
    session.staffName   = staffRecord.name;
    session.permissions = staffRecord.permissions;
    await session.save();
    return NextResponse.json({ success: true, role: "staff" });
  } catch {
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
