import { IntakesViewer } from "./IntakesViewer";

export default function IntakesPage() {
  return (
    <div className="p-6 sm:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-brand-navy">Intake Forms</h1>
        <p className="mt-1 text-sm text-brand-navy/45">
          OT, PT, and SLP questionnaire submissions — search, view, and update status.
        </p>
      </div>
      <IntakesViewer />
    </div>
  );
}
