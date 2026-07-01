import { NextRequest, NextResponse } from "next/server";
import { createAuthServerClient, createAdminClient } from "@/lib/supabase-server";

export async function GET() {
  try {
    const supabase = await createAuthServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const adminDb = createAdminClient();

    const { data: client } = await adminDb
      .from("clients")
      .select("id, parent_name, email, phone, newsletter_opted_in, created_at")
      .eq("auth_user_id", user.id)
      .single();

    if (!client) return NextResponse.json({ error: "Profile not found" }, { status: 404 });

    const { data: children } = await adminDb
      .from("children")
      .select("id, name, age")
      .eq("client_id", client.id)
      .order("created_at", { ascending: true });

    return NextResponse.json({ client, children: children ?? [] });
  } catch (err) {
    console.error("[profile/GET]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const supabase = await createAuthServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { phone, parent_name, newsletter_opted_in, children } = await request.json();
    const adminDb = createAdminClient();

    const { data: client } = await adminDb
      .from("clients")
      .select("id")
      .eq("auth_user_id", user.id)
      .single();

    if (!client) return NextResponse.json({ error: "Profile not found" }, { status: 404 });

    const update: Record<string, unknown> = {};
    if (phone !== undefined)               update.phone               = phone?.trim() || null;
    if (parent_name !== undefined)         update.parent_name         = parent_name?.trim() || null;
    if (newsletter_opted_in !== undefined) update.newsletter_opted_in = newsletter_opted_in;

    if (Object.keys(update).length > 0) {
      const { error: updateErr } = await adminDb.from("clients").update(update).eq("id", client.id);
      if (updateErr) return NextResponse.json({ error: updateErr.message }, { status: 500 });
    }

    if (Array.isArray(children)) {
      const { error: delErr } = await adminDb.from("children").delete().eq("client_id", client.id);
      if (delErr) return NextResponse.json({ error: delErr.message }, { status: 500 });

      const validChildren = children.filter((c: { name: string }) => c.name?.trim());
      if (validChildren.length > 0) {
        const { error: insErr } = await adminDb.from("children").insert(
          validChildren.map((c: { name: string; age?: string }) => ({
            client_id: client.id,
            name: c.name.trim(),
            age: c.age?.trim() || null,
          }))
        );
        if (insErr) return NextResponse.json({ error: insErr.message }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[profile/PATCH]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
