import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { addToKlaviyoList } from "@/lib/klaviyo";
import { createAdminClient } from "@/lib/supabase-server";
import { logRequest } from "@/lib/logger";

// Module-level singleton — same pattern as /api/contact.
const resend = new Resend(process.env.RESEND_API_KEY);

// Email capture behind the printables/guides download popup. Same
// treatment as the newsletter signup (Klaviyo + a clients record) plus an
// internal notification — but skipped entirely for an email we already
// have on file, so returning contacts don't get re-saved, re-added to
// Klaviyo, or re-notified about.
export async function POST(request: NextRequest) {
  const start = Date.now();
  try {
    const body = await request.json().catch(() => ({}));
    const email: string = (body.email ?? "").trim().toLowerCase();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "A valid email address is required." },
        { status: 400 },
      );
    }

    const supabase = createAdminClient();
    const { data: existing, error: lookupErr } = await supabase
      .from("clients")
      .select("id")
      .eq("email", email)
      .maybeSingle();
    if (lookupErr) throw new Error(lookupErr.message);

    if (existing) {
      logRequest({
        route: "/api/resource-newsletter",
        duration_ms: Date.now() - start,
        status_code: 200,
        success: true,
        metadata: { email, already_known: true },
      });
      return NextResponse.json({ success: true, alreadyKnown: true });
    }

    const { error: insertErr } = await supabase.from("clients").insert({
      email,
      newsletter_opted_in: true,
      source: ["resource_download"],
    });
    if (insertErr) throw new Error(insertErr.message);

    // Klaviyo — awaited (it's quick, and this is a marketing list we want
    // reliably up to date), notification email — fire-and-forget (nice to
    // have, never worth delaying the response over).
    await addToKlaviyoList(email).catch((err) => {
      console.warn("[RESOURCE NEWSLETTER] Klaviyo add failed:", email, err);
    });

    if (process.env.RESEND_API_KEY) {
      resend.emails.send({
        from: "Ava's Hub <forms@avashubnj.com>",
        to: "hello@avashubnj.com",
        subject: `📩 New newsletter signup — ${email}`,
        html: `<p style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#1A1523;">
          <strong>${email}</strong> subscribed via a Printable/Guide download popup.
        </p>`,
      }).catch((err) => {
        console.warn("[RESOURCE NEWSLETTER] Notification email failed:", email, err);
      });
    }

    logRequest({
      route: "/api/resource-newsletter",
      duration_ms: Date.now() - start,
      status_code: 200,
      success: true,
      metadata: { email, already_known: false },
    });

    return NextResponse.json({ success: true, alreadyKnown: false });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Something went wrong.";
    logRequest({
      route: "/api/resource-newsletter",
      duration_ms: Date.now() - start,
      status_code: 500,
      success: false,
      error_message: message,
    });
    console.error("[resource-newsletter] error:", err);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
