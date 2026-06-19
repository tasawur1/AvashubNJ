// Admin routes get their own shell — no site header, no Lenis scroll reveal
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
