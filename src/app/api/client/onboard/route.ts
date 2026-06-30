import { NextRequest, NextResponse } from "next/server";
import { createAuthServerClient, createAdminClient } from "@/lib/supabase-server";

export async function POST(request: NextRequest) {
  const supabase = await createAuthServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { phone, children, newsletter_opted_in, parent_name } = await request.json();
  const adminDb = createAdminClient();
  const email = user.email ?? "";

  // Find existing client by email (may exist from a previous intake form submission)
  const { data: existing } = await adminDb
    .from("clients")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  let clientId: string;

  if (existing) {
    await adminDb.from("clients").update({
      auth_user_id: user.id,
      parent_name: parent_name?.trim() || null,
      phone: phone?.trim() || null,
      newsletter_opted_in: newsletter_opted_in ?? false,
    }).eq("id", existing.id);
    clientId = existing.id;
  } else {
    const { data: newClient, error } = await adminDb
      .from("clients")
      .insert({
        auth_user_id: user.id,
        email,
        parent_name: parent_name?.trim() || null,
        phone: phone?.trim() || null,
        newsletter_opted_in: newsletter_opted_in ?? false,
        source: ["account_signup"],
      })
      .select("id")
      .single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    clientId = newClient.id;
  }

  // Insert children (delete existing first to avoid duplication on re-submit)
  const { error: delErr } = await adminDb.from("children").delete().eq("client_id", clientId);
  if (delErr) return NextResponse.json({ error: delErr.message }, { status: 500 });

  const validChildren = (children ?? []).filter((c: { name: string }) => c.name?.trim());
  if (validChildren.length > 0) {
    const { error: insErr } = await adminDb.from("children").insert(
      validChildren.map((c: { name: string; age?: string }) => ({
        client_id: clientId,
        name: c.name.trim(),
        age: c.age?.trim() || null,
      }))
    );
    if (insErr) return NextResponse.json({ error: insErr.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
