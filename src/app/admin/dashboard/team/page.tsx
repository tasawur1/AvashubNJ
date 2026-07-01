import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { sessionOptions, type SessionData } from "@/lib/session";
import { TeamManager } from "@/components/admin/TeamManager";

export default async function TeamPage() {
  let session: SessionData | undefined;
  try {
    session = await getIronSession<SessionData>(await cookies(), sessionOptions);
  } catch {
    redirect("/admin/dashboard");
  }
  if (!session?.isLoggedIn || session?.role !== "superadmin") redirect("/admin/dashboard");

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-brand-navy">Team</h1>
        <p className="mt-1 text-sm text-brand-navy/55">
          Manage staff accounts and their dashboard permissions.
        </p>
      </div>
      <TeamManager />
    </div>
  );
}
