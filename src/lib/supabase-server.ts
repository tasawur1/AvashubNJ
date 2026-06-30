import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const url        = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const secretKey  = process.env.SUPABASE_SECRET_KEY!;
const anonKey    = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

// Singletons — one client per process, reused across all requests.
// Prevents a new TCP connection opening on every API call.
let _admin:  SupabaseClient | null = null;
let _public: SupabaseClient | null = null;

export function createAdminClient(): SupabaseClient {
  if (!_admin) {
    _admin = createClient(url, secretKey, {
      auth: { persistSession: false },
    });
  }
  return _admin;
}

export function createPublicClient(): SupabaseClient {
  if (!_public) {
    _public = createClient(url, anonKey, {
      auth: { persistSession: false },
    });
  }
  return _public;
}

// Server-side Supabase client that reads/writes auth cookies.
// Use in Server Components, Route Handlers, and Server Actions.
export async function createAuthServerClient() {
  const cookieStore = await cookies();
  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // setAll called from Server Component — cookies can only be set in Route Handlers or Server Actions
        }
      },
    },
  });
}
