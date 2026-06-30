import { redirect } from "next/navigation";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions, type SessionData, type StaffPermissions } from "@/lib/session";
import { DashboardShell } from "@/components/admin/DashboardShell";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let role: SessionData["role"] = "superadmin";
  let permissions: StaffPermissions | undefined;
  let staffName: string | undefined;

  try {
    const session = await getIronSession<SessionData>(
      await cookies(),
      sessionOptions
    );
    if (!session.isLoggedIn) redirect("/admin/login");
    role        = session.role ?? "superadmin";
    permissions = session.permissions;
    staffName   = session.staffName;
  } catch {
    redirect("/admin/login");
  }

  return (
    <DashboardShell role={role} permissions={permissions} staffName={staffName}>
      {children}
    </DashboardShell>
  );
}
