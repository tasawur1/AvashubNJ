import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { createAdminClient } from "@/lib/supabase-server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  // On Vercel, request.url may contain an internal IP (0.0.0.0) rather than
  // the public domain. Use x-forwarded-host in production for a reliable origin.
  const forwardedHost = request.headers.get("x-forwarded-host");
  const proto = request.headers.get("x-forwarded-proto") ?? "https";
  const origin = forwardedHost
    ? `${proto}://${forwardedHost}`
    : new URL(request.url).origin;

  if (!code) {
    return NextResponse.redirect(`${origin}/login?error=missing_code`);
  }

  // Buffer cookies to set on the final redirect response
  const cookiesToSet: Array<{ name: string; value: string; options: Record<string, unknown> }> = [];

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(toSet) {
          toSet.forEach((c) => cookiesToSet.push(c as typeof cookiesToSet[number]));
        },
      },
    }
  );

  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error || !data.user) {
    return NextResponse.redirect(`${origin}/login?error=auth_failed`);
  }

  // Check if this auth user already has a linked client record (returning user)
  const adminDb = createAdminClient();
  const { data: existingClient } = await adminDb
    .from("clients")
    .select("id")
    .eq("auth_user_id", data.user.id)
    .maybeSingle();

  const redirectPath = existingClient ? "/account" : "/account/setup";
  const response = NextResponse.redirect(`${origin}${redirectPath}`);

  // Attach auth cookies to the redirect response
  cookiesToSet.forEach(({ name, value, options }) => {
    response.cookies.set(name, value, options as Parameters<typeof response.cookies.set>[2]);
  });

  return response;
}
