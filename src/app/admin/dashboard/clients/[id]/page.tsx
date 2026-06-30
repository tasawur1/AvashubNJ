import { ClientDetailViewer } from "./ClientDetailViewer";

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="px-4 sm:px-8">
      <ClientDetailViewer id={id} />
    </div>
  );
}
