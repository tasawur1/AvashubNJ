import { LogsViewer } from "./LogsViewer";

export default function LogsPage() {
  return (
    <div className="p-6 sm:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-brand-navy">Activity Logs</h1>
        <p className="mt-1 text-sm text-brand-navy/45">
          On-demand diagnostics — select a range and press Load Logs. Nothing fetches automatically.
        </p>
      </div>
      <LogsViewer />
    </div>
  );
}
