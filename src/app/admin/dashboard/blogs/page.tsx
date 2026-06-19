import { createAdminClient } from "@/lib/supabase-server";
import { BlogManager } from "./BlogManager";

export const dynamic = "force-dynamic";

export default async function AdminBlogsPage() {
  let initialBlogs: Record<string, unknown>[] = [];

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    initialBlogs = data ?? [];
  } catch {
    // Silently fall through — BlogManager handles the empty state
  }

  return <BlogManager initialBlogs={initialBlogs} />;
}
