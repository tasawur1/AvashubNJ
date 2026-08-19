import Link from "next/link";

export default function PrintableNotFound() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-4 bg-[#faf6f2] px-6 text-center">
      <h1 className="text-xl font-extrabold text-brand-navy">Printable Not Found</h1>
      <p className="max-w-sm text-sm leading-relaxed text-brand-navy/70">
        This printable may have been removed or is no longer available.
      </p>
      <Link
        href="/printables"
        className="mt-2 inline-flex items-center gap-2 rounded-full bg-brand-purple-bright px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-brand-purple-deep"
      >
        Back to Printables
      </Link>
    </div>
  );
}
