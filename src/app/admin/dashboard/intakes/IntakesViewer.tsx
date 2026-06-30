"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";

type Submission = {
  id: string;
  created_at: string;
  form_type: "ot" | "pt" | "slp";
  parent_name: string | null;
  parent_email: string | null;
  phone: string | null;
  child_name: string | null;
  child_age: string | null;
  status: "pending_confirmation" | "confirmed" | "followed_up" | "intake_done" | "enrolled";
};

const FORM_LABELS: Record<string, string> = { ot: "OT", pt: "PT", slp: "SLP" };
const FORM_COLORS: Record<string, string> = {
  ot:  "bg-orange-50 text-orange-700 ring-orange-200",
  pt:  "bg-blue-50 text-blue-700 ring-blue-200",
  slp: "bg-teal-50 text-teal-700 ring-teal-200",
};
const STATUS_LABELS: Record<string, string> = {
  pending_confirmation: "Pending Confirmation",
  confirmed:   "Confirmation Sent",
  followed_up: "Followed Up",
  intake_done: "Intake Done",
  enrolled:    "Enrolled",
};
const STATUS_COLORS: Record<string, string> = {
  pending_confirmation: "bg-gray-50 text-gray-500 ring-gray-200",
  confirmed:   "bg-blue-50 text-blue-700 ring-blue-200",
  followed_up: "bg-amber-50 text-amber-700 ring-amber-200",
  intake_done: "bg-purple-50 text-purple-700 ring-purple-200",
  enrolled:    "bg-green-50 text-green-700 ring-green-200",
};

const PAGE_SIZES = [10, 20, 50, 100];

const FORM_FILTER_OPTIONS = [
  { value: 'all', label: 'All Services' },
  { value: 'ot',  label: 'Occupational Therapy' },
  { value: 'pt',  label: 'Physical Therapy' },
  { value: 'slp', label: 'Speech-Language' },
] as const;
type FormFilter = typeof FORM_FILTER_OPTIONS[number]['value'];

function paginationPages(current: number, total: number): (number | '...')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, '...', total];
  if (current >= total - 3) return [1, '...', total - 4, total - 3, total - 2, total - 1, total];
  return [1, '...', current - 1, current, current + 1, '...', total];
}

function fmt(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function Badge({ label, colorClass }: { label: string; colorClass: string }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ring-1 ${colorClass}`}>
      {label}
    </span>
  );
}

export function IntakesViewer() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [formFilter, setFormFilter] = useState<FormFilter>('all');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/intakes/${deleteId}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok || data.error) { alert(data.error ?? 'Delete failed'); return; }
      setSubmissions((prev) => prev.filter((s) => s.id !== deleteId));
      setDeleteId(null);
    } catch {
      alert('Network error — please try again.');
    } finally {
      setDeleting(false);
    }
  }

  useEffect(() => {
    fetch("/api/admin/intakes")
      .then((r) => r.json())
      .then((d) => {
        if (d.error) setFetchError(d.error);
        else setSubmissions(d.submissions ?? []);
      })
      .catch(() => setFetchError("Failed to load intake submissions."))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    let result = submissions;
    if (formFilter !== 'all') result = result.filter((s) => s.form_type === formFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (s) =>
          s.parent_name?.toLowerCase().includes(q) ||
          s.parent_email?.toLowerCase().includes(q) ||
          s.phone?.toLowerCase().includes(q) ||
          s.child_name?.toLowerCase().includes(q)
      );
    }
    return result;
  }, [submissions, search, formFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  const start = filtered.length === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const end = Math.min(safePage * pageSize, filtered.length);

  if (loading) {
    return (
      <div className="flex items-center gap-3 text-brand-navy/50">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-brand-purple-deep border-t-transparent" />
        Loading intake submissions…
      </div>
    );
  }

  if (fetchError) {
    return <p className="text-red-600 text-sm">{fetchError}</p>;
  }

  return (
    <div className="space-y-4">
      {/* Search + page size */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-0 max-w-md">
          <svg className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-navy/35" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by parent name, email, phone, or child name…"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full rounded-xl border border-brand-purple-deep/20 bg-white py-2.5 pl-9 pr-4 text-sm text-brand-navy placeholder:text-brand-navy/35 focus:border-brand-purple-deep/40 focus:outline-none focus:ring-2 focus:ring-brand-purple-deep/15"
          />
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-xs text-brand-navy/40">Show</span>
          <select
            value={pageSize}
            onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}
            className="rounded-lg border border-brand-purple-deep/20 bg-white px-2 py-1.5 text-xs font-semibold text-brand-navy focus:border-brand-purple-deep/40 focus:outline-none"
          >
            {PAGE_SIZES.map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
      </div>

      {/* Service type filter */}
      <div className="flex flex-wrap gap-2">
        {FORM_FILTER_OPTIONS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => { setFormFilter(value); setPage(1); }}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
              formFilter === value
                ? 'bg-brand-purple-deep text-white'
                : 'border border-brand-purple-deep/20 text-brand-navy/60 hover:bg-brand-purple-deep/5'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Count */}
      <p className="text-xs text-brand-navy/40">
        {filtered.length === 0
          ? "No submissions"
          : `Showing ${start}–${end} of ${filtered.length} ${filtered.length === 1 ? "submission" : "submissions"}${search ? ` matching "${search}"` : ""}`}
      </p>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-brand-purple-deep/10 bg-white p-8 text-center text-sm text-brand-navy/50">
          {search ? "No submissions match your search." : "No intake submissions yet."}
        </div>
      ) : (
        <div className="space-y-3">
          {paginated.map((s) => (
            <div key={s.id} className="overflow-hidden rounded-xl border border-brand-purple-deep/10 bg-white shadow-sm">
              <div className="flex items-start gap-4 px-5 py-4">
                {/* Avatar */}
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-purple-deep/10 text-lg font-extrabold text-brand-purple-deep">
                  {(s.child_name ?? s.parent_name ?? "?").charAt(0).toUpperCase()}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-brand-navy/70">{s.parent_name ?? "Unknown parent"}</p>
                  <p className="text-base font-extrabold text-brand-navy leading-tight">
                    {s.child_name ?? "—"}
                    {s.child_age && <span className="ml-2 text-xs font-normal text-brand-navy/40">Age {s.child_age}</span>}
                  </p>
                  {s.parent_email && (
                    <p className="mt-0.5 text-xs text-brand-navy/50">{s.parent_email}{s.phone && <span> · {s.phone}</span>}</p>
                  )}
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <Badge label={FORM_LABELS[s.form_type] ?? s.form_type.toUpperCase()} colorClass={FORM_COLORS[s.form_type] ?? ""} />
                    <Badge label={STATUS_LABELS[s.status] ?? s.status} colorClass={STATUS_COLORS[s.status] ?? ""} />
                    <span className="text-[10px] text-brand-navy/35">{fmt(s.created_at)}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex shrink-0 flex-col items-end gap-1.5 sm:flex-row sm:items-center">
                  <Link
                    href={`/admin/dashboard/intakes/${s.id}`}
                    className="rounded-lg bg-brand-purple-deep/5 px-3 py-1.5 text-xs font-semibold text-brand-purple-deep hover:bg-brand-purple-deep/10"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => setDeleteId(s.id)}
                    className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-500 hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={safePage === 1}
          className="rounded-lg border border-brand-purple-deep/20 px-3 py-1.5 text-xs font-semibold text-brand-navy/60 hover:bg-brand-purple-deep/5 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          ← Prev
        </button>
        {paginationPages(safePage, totalPages).map((p, i) =>
          p === '...'
            ? <span key={`el-${i}`} className="px-1 text-xs text-brand-navy/30">…</span>
            : <button
                key={p}
                onClick={() => setPage(p as number)}
                className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
                  safePage === p
                    ? 'border-brand-purple-deep bg-brand-purple-deep text-white'
                    : 'border-brand-purple-deep/20 text-brand-navy/60 hover:bg-brand-purple-deep/5'
                }`}
              >
                {p}
              </button>
        )}
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={safePage === totalPages}
          className="rounded-lg border border-brand-purple-deep/20 px-3 py-1.5 text-xs font-semibold text-brand-navy/60 hover:bg-brand-purple-deep/5 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Next →
        </button>
      </div>

      {/* Delete confirm modal */}
      {deleteId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-brand-navy/40 p-4 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) setDeleteId(null); }}
        >
          <div className="w-full max-w-xs rounded-2xl bg-white p-5 shadow-2xl">
            <h2 className="text-base font-extrabold text-brand-navy">Delete intake?</h2>
            <p className="mt-1.5 text-sm text-brand-navy/55">This cannot be reversed.</p>
            <div className="mt-5 flex justify-end gap-2">
              <button onClick={() => setDeleteId(null)} disabled={deleting} className="rounded-xl px-4 py-2 text-sm font-semibold text-brand-navy/60 hover:text-brand-navy disabled:opacity-40">Cancel</button>
              <button onClick={handleDelete} disabled={deleting} className="rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600 disabled:opacity-50">
                {deleting ? 'Deleting…' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
