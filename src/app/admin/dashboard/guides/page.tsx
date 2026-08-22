import { createAdminClient } from "@/lib/supabase-server";
import { GuidesManager } from "./GuidesManager";

export const dynamic = "force-dynamic";

export default async function AdminGuidesPage() {
  let initialGuides: Record<string, unknown>[] = [];

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("guides")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    initialGuides = data ?? [];
  } catch {
    // Silently fall through — GuidesManager handles the empty state
  }

  return <GuidesManager initialGuides={initialGuides} />;
}
