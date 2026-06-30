import { IntakeDetailViewer } from "./IntakeDetailViewer";

export default async function IntakeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="px-4 sm:px-8">
      <IntakeDetailViewer id={id} />
    </div>
  );
}
