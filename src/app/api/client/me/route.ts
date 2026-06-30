import { NextResponse } from "next/server";
import { createAuthServerClient, createAdminClient } from "@/lib/supabase-server";

export async function GET() {
  try {
    const supabase = await createAuthServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ isLoggedIn: false });

    const adminDb = createAdminClient();
    const { data: client } = await adminDb
      .from("clients")
      .select("id, parent_name, email")
      .eq("auth_user_id", user.id)
      .maybeSingle();

    return NextResponse.json({
      isLoggedIn: true,
      email: user.email ?? null,
      name: client?.parent_name ?? null,
      hasProfile: !!client,
    });
  } catch {
    return NextResponse.json({ isLoggedIn: false });
  }
}
