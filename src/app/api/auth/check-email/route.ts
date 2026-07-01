import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-server";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    if (!email || typeof email !== "string") return NextResponse.json({ exists: false });
    const normalized = email.trim().toLowerCase();
    const supabase = createAdminClient();
    const { data, error } = await supabase.rpc("auth_email_exists", { lookup_email: normalized });
    if (error) {
      console.error("[check-email] RPC error:", error.message);
      return NextResponse.json({ exists: false });
    }
    return NextResponse.json({ exists: !!data });
  } catch (err) {
    console.error("[check-email] Unexpected error:", err);
    return NextResponse.json({ exists: false });
  }
}
