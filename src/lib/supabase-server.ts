import { createClient, type SupabaseClient } from "@supabase/supabase-js";

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
