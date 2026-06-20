import { redirect } from "next/navigation";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions, type SessionData } from "@/lib/session";
import { DashboardShell } from "@/components/admin/DashboardShell";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    const session = await getIronSession<SessionData>(
      await cookies(),
      sessionOptions
    );
    if (!session.isLoggedIn) redirect("/admin/login");
  } catch {
    redirect("/admin/login");
  }

  return <DashboardShell>{children}</DashboardShell>;
}
