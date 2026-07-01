import { NextResponse } from "next/server";
import { createAuthServerClient } from "@/lib/supabase-server";

export async function POST() {
  try {
    const supabase = await createAuthServerClient();
    await supabase.auth.signOut();
  } catch (err) {
    console.error("[signout] Error:", err);
  }
  return NextResponse.json({ success: true });
}
