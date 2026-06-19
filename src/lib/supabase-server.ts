import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const secretKey = process.env.SUPABASE_SECRET_KEY!;
const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

// Server-side admin client — uses secret key, bypasses RLS
export function createAdminClient() {
  return createClient(url, secretKey);
}

// Public client — uses publishable key, respects RLS
export function createPublicClient() {
  return createClient(url, publishableKey);
}
