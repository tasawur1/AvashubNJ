import { createAdminClient } from "@/lib/supabase-server";
import { PrintablesManager } from "./PrintablesManager";

export const dynamic = "force-dynamic";

export default async function AdminPrintablesPage() {
  let initialPrintables: Record<string, unknown>[] = [];

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("printables")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    initialPrintables = data ?? [];
  } catch {
    // Silently fall through — PrintablesManager handles the empty state
  }

  return <PrintablesManager initialPrintables={initialPrintables} />;
}
