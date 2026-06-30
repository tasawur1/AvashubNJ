"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";

type IntakeSummary = {
  id: string;
  form_type: "ot" | "pt" | "slp";
  status: string;
  created_at: string;
  child_name: string | null;
  main_concern: string | null;
  top_goal: string | null;
};

type ChildRecord = {
  id: string;
  name: string;
  age: string | null;
};

type Client = {
  id: string;
  created_at: string;
  email: string;
  parent_name: string | null;
  phone: string | null;
  child_name: string | null;
  internal_notes: string | null;
  source: string[];
  newsletter_opted_in: boolean | null;
  intake_submissions: IntakeSummary[];
  children: ChildRecord[];
};

const FORM_LABELS: Record<string, string> = { ot: "OT", pt: "PT", slp: "SLP" };
const FORM_COLORS: Record<string, string> = {
  ot:  "bg-orange-50 text-orange-700 ring-orange-200",
  pt:  "bg-blue-50 text-blue-700 ring-blue-200",
  slp: "bg-teal-50 text-teal-700 ring-teal-200",
};
const STATUS_COLORS: Record<string, string> = {
  new:       "bg-blue-50 text-blue-700 ring-blue-200",
  contacted: "bg-yellow-50 text-yellow-700 ring-yellow-200",
  scheduled: "bg-purple-50 text-purple-700 ring-purple-200",
  completed: "bg-green-50 text-green-700 ring-green-200",
};
const PAGE_SIZES = [10, 20, 50, 100];

function paginationPages(current: number, total: number): (number | '...')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, '...', total];
  if (current >= total - 3) return [1, '...', total - 4, total - 3, total - 2, total - 1, total];
  return [1, '...', current - 1, current, current + 1, '...', total];
}

const SOURCE_COLORS: Record<string, string> = {
  intake:   "bg-brand-purple-deep/10 text-brand-purple-deep ring-brand-purple-deep/20",
  contact:  "bg-brand-teal/10 text-brand-teal ring-brand-teal/20",
  newsletter: "bg-brand-gold/10 text-brand-gold ring-brand-gold/20",
};

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

type EditState = {
  email: string;
  phone: string;
  internal_notes: string;
};

export function ClientsViewer() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<EditState>({ email: "", phone: "", internal_notes: "" });
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetch("/api/admin/clients")
      .then((r) => r.json())
      .then((d) => {
        if (d.error) setFetchError(d.error);
        else setClients(d.clients ?? []);
      })
      .catch(() => setFetchError("Failed to load clients."))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return clients;
    const q = search.toLowerCase();
    return clients.filter(
      (c) =>
        c.parent_name?.toLowerCase().includes(q) ||
        c.email?.toLowerCase().includes(q) ||
        c.phone?.toLowerCase().includes(q) ||
        c.child_name?.toLowerCase().includes(q) ||
        c.children?.some((ch) => ch.name?.toLowerCase().includes(q))
    );
  }, [clients, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);
  const start = filtered.length === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const end = Math.min(safePage * pageSize, filtered.length);

  async function handleDelete() {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/clients/${deleteId}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok || data.error) { alert(data.error ?? 'Delete failed'); return; }
      setClients((prev) => prev.filter((c) => c.id !== deleteId));
      setDeleteId(null);
    } catch {
      alert('Network error — please try again.');
    } finally {
      setDeleting(false);
    }
  }

  function openEdit(c: Client) {
    setEditingId(c.id);
    setEditForm({ email: c.email, phone: c.phone ?? "", internal_notes: c.internal_notes ?? "" });
    setSaveError(null);
  }

  async function saveEdit() {
    if (!editingId) return;
    setSaving(true);
    setSaveError(null);
    try {
      const res = await fetch(`/api/admin/clients/${editingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        setSaveError(data.error ?? "Save failed");
        return;
      }
      setClients((prev) =>
        prev.map((c) =>
          c.id === editingId
            ? { ...c, email: editForm.email, phone: editForm.phone, internal_notes: editForm.internal_notes }
            : c
        )
      );
      setEditingId(null);
    } catch {
      setSaveError("Network error — please try again.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center gap-3 text-brand-navy/50">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-brand-purple-deep border-t-transparent" />
        Loading clients…
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
            placeholder="Search by child name, parent name, email, or phone…"
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

      {/* Count */}
      <p className="text-xs text-brand-navy/40">
        {filtered.length === 0
          ? "No clients"
          : `Showing ${start}–${end} of ${filtered.length} ${filtered.length === 1 ? "client" : "clients"}${search ? ` matching "${search}"` : ""}`}
      </p>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-brand-purple-deep/10 bg-white p-8 text-center text-sm text-brand-navy/50">
          {search ? "No clients match your search." : "No clients yet. They'll appear here once intake forms or contact submissions come in."}
        </div>
      ) : (
        <div className="space-y-3">
          {paginated.map((c) => {
            const intakeCount = c.intake_submissions?.length ?? 0;
            const childCount = c.children?.length ?? 0;
            const childDisplay = childCount > 1
              ? `${childCount} children`
              : childCount === 1
                ? c.children[0].name
                : (c.child_name ?? null);
            const avatarInitial = (c.parent_name ?? c.children?.[0]?.name ?? c.child_name ?? "?").charAt(0).toUpperCase();
            return (
              <div key={c.id} className="overflow-hidden rounded-xl border border-brand-purple-deep/10 bg-white shadow-sm">
                {/* Client row */}
                <div className="flex flex-wrap items-start gap-4 px-5 py-4">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-purple-deep/10 text-lg font-extrabold text-brand-purple-deep">
                      {avatarInitial}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Parent name on top */}
                    <p className="text-sm font-medium text-brand-navy/70">{c.parent_name ?? "Unknown parent"}</p>

                    {/* Child(ren) name below, highlighted */}
                    {childDisplay ? (
                      <p className="mt-0.5 text-base font-extrabold text-brand-navy leading-tight">
                        {childDisplay}
                        <span className="ml-2 text-xs font-normal text-brand-navy/40">{childCount > 1 ? "" : "child"}</span>
                      </p>
                    ) : (
                      <p className="mt-0.5 text-base font-extrabold text-brand-navy/30 leading-tight italic">No child on record</p>
                    )}

                    <div className="mt-1.5 flex flex-wrap gap-2 text-xs text-brand-navy/50">
                      {c.email && <span>{c.email}</span>}
                      {c.phone && <span>· {c.phone}</span>}
                    </div>

                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {(c.source ?? []).map((s) => (
                        <Badge key={s} label={s.charAt(0).toUpperCase() + s.slice(1)} colorClass={SOURCE_COLORS[s] ?? "bg-gray-50 text-gray-600 ring-gray-200"} />
                      ))}
                      {intakeCount > 0 && (
                        <span className="inline-flex items-center rounded-full bg-brand-navy/5 px-2 py-0.5 text-xs font-semibold text-brand-navy/60 ring-1 ring-brand-navy/10">
                          {intakeCount} form{intakeCount !== 1 ? "s" : ""}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex shrink-0 flex-wrap items-center gap-1.5">
                    {intakeCount > 0 && (
                      <button
                        onClick={() => setExpanded((p) => ({ ...p, [c.id]: !p[c.id] }))}
                        className="rounded-lg px-3 py-1.5 text-xs font-semibold text-brand-navy/60 hover:bg-brand-purple-deep/5 hover:text-brand-navy"
                      >
                        {expanded[c.id] ? "Hide forms" : "View forms"}
                      </button>
                    )}
                    <Link
                      href={`/admin/dashboard/clients/${c.id}`}
                      className="rounded-lg px-3 py-1.5 text-xs font-semibold text-brand-navy/60 hover:bg-brand-purple-deep/5 hover:text-brand-navy"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => openEdit(c)}
                      className="rounded-lg bg-brand-purple-deep/5 px-3 py-1.5 text-xs font-semibold text-brand-purple-deep hover:bg-brand-purple-deep/10"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteId(c.id)}
                      className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-500 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {/* Linked intake submissions */}
                {expanded[c.id] && intakeCount > 0 && (
                  <div className="border-t border-brand-purple-deep/10 bg-brand-purple-deep/[0.025] px-5 py-3">
                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-brand-navy/40">Intake submissions</p>
                    <div className="space-y-2">
                      {c.intake_submissions
                        .slice()
                        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                        .map((sub) => (
                          <div key={sub.id} className="flex items-start gap-3 rounded-xl bg-white p-3 shadow-sm">
                            <Badge label={FORM_LABELS[sub.form_type] ?? sub.form_type} colorClass={FORM_COLORS[sub.form_type] ?? ""} />
                            <div className="flex-1 min-w-0">
                              {sub.main_concern && <p className="text-xs text-brand-navy/70 line-clamp-2">{sub.main_concern}</p>}
                              {sub.top_goal && <p className="mt-0.5 text-xs text-brand-navy/50 line-clamp-1">Goal: {sub.top_goal}</p>}
                              <p className="mt-1 text-[10px] text-brand-navy/35">{fmt(sub.created_at)}</p>
                            </div>
                            <div className="flex flex-col items-end gap-1.5">
                              <Badge label={sub.status.charAt(0).toUpperCase() + sub.status.slice(1)} colorClass={STATUS_COLORS[sub.status] ?? ""} />
                              <Link
                                href={`/admin/dashboard/intakes/${sub.id}`}
                                className="text-[10px] font-semibold text-brand-purple-deep hover:underline"
                              >
                                View form →
                              </Link>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
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
            <h2 className="text-base font-extrabold text-brand-navy">Delete client?</h2>
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

      {/* Edit modal */}
      {editingId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-brand-navy/40 p-4 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) setEditingId(null); }}
        >
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <h2 className="text-lg font-extrabold text-brand-navy">Edit Client</h2>
            <p className="mt-1 text-xs text-brand-navy/50">Update contact info and internal notes.</p>

            <div className="mt-5 space-y-4">
              <Field label="Email">
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm((p) => ({ ...p, email: e.target.value }))}
                  className="w-full rounded-xl border border-brand-purple-deep/20 px-3 py-2 text-sm text-brand-navy focus:border-brand-purple-deep/40 focus:outline-none focus:ring-2 focus:ring-brand-purple-deep/15"
                />
              </Field>

              <Field label="Phone">
                <input
                  type="tel"
                  value={editForm.phone}
                  onChange={(e) => setEditForm((p) => ({ ...p, phone: e.target.value }))}
                  className="w-full rounded-xl border border-brand-purple-deep/20 px-3 py-2 text-sm text-brand-navy focus:border-brand-purple-deep/40 focus:outline-none focus:ring-2 focus:ring-brand-purple-deep/15"
                />
              </Field>

              <Field label="Internal notes">
                <textarea
                  rows={4}
                  value={editForm.internal_notes}
                  onChange={(e) => setEditForm((p) => ({ ...p, internal_notes: e.target.value }))}
                  placeholder="Notes only visible to the Ava's Hub team…"
                  className="w-full resize-none rounded-xl border border-brand-purple-deep/20 px-3 py-2 text-sm text-brand-navy placeholder:text-brand-navy/35 focus:border-brand-purple-deep/40 focus:outline-none focus:ring-2 focus:ring-brand-purple-deep/15"
                />
              </Field>
            </div>

            {saveError && <p className="mt-3 text-xs text-red-600">{saveError}</p>}

            <div className="mt-5 flex justify-end gap-3">
              <button onClick={() => setEditingId(null)} className="rounded-xl px-4 py-2 text-sm font-semibold text-brand-navy/60 hover:text-brand-navy">
                Cancel
              </button>
              <button
                onClick={saveEdit}
                disabled={saving}
                className="rounded-xl bg-brand-purple-deep px-5 py-2 text-sm font-semibold text-white hover:bg-brand-purple-deep/90 disabled:opacity-50"
              >
                {saving ? "Saving…" : "Save changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-brand-navy/60">{label}</label>
      {children}
    </div>
  );
}
