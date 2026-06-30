import { ClientsViewer } from "./ClientsViewer";

export default function ClientsPage() {
  return (
    <div className="p-6 sm:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-brand-navy">Clients</h1>
        <p className="mt-1 text-sm text-brand-navy/45">
          Auto-created from intake forms and contact submissions — one profile per email.
        </p>
      </div>
      <ClientsViewer />
    </div>
  );
}
