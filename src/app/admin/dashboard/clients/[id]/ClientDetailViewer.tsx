"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type ChildRecord = { id: string; name: string; age: string | null };
type IntakeSummary = {
  id: string;
  form_type: "ot" | "pt" | "slp";
  status: string;
  created_at: string;
  child_name: string | null;
  main_concern: string | null;
  top_goal: string | null;
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
  children: ChildRecord[];
  intake_submissions: IntakeSummary[];
};

const FORM_LABELS: Record<string, string> = { ot: "OT", pt: "PT", slp: "SLP" };
const FORM_COLORS: Record<string, string> = {
  ot:  "bg-orange-50 text-orange-700 ring-orange-200",
  pt:  "bg-blue-50 text-blue-700 ring-blue-200",
  slp: "bg-teal-50 text-teal-700 ring-teal-200",
};
const STATUS_COLORS: Record<string, string> = {
  pending_confirmation: "bg-gray-50 text-gray-500 ring-gray-200",
  confirmed:   "bg-blue-50 text-blue-700 ring-blue-200",
  followed_up: "bg-amber-50 text-amber-700 ring-amber-200",
  intake_done: "bg-purple-50 text-purple-700 ring-purple-200",
  enrolled:    "bg-green-50 text-green-700 ring-green-200",
  new:         "bg-blue-50 text-blue-700 ring-blue-200",
  contacted:   "bg-yellow-50 text-yellow-700 ring-yellow-200",
  scheduled:   "bg-purple-50 text-purple-700 ring-purple-200",
  completed:   "bg-green-50 text-green-700 ring-green-200",
};
const STATUS_LABELS: Record<string, string> = {
  pending_confirmation: "Pending Confirmation",
  confirmed:   "Confirmation Sent",
  followed_up: "Followed Up",
  intake_done: "Intake Done",
  enrolled:    "Enrolled",
};
const SOURCE_COLORS: Record<string, string> = {
  intake:         "bg-brand-purple-deep/10 text-brand-purple-deep ring-brand-purple-deep/20",
  contact:        "bg-brand-teal/10 text-brand-teal ring-brand-teal/20",
  newsletter:     "bg-brand-gold/10 text-brand-gold ring-brand-gold/20",
  account_signup: "bg-green-50 text-green-700 ring-green-200",
};

function fmt(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function Badge({ label, colorClass }: { label: string; colorClass: string }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ring-1 ${colorClass}`}>
      {label}
    </span>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-brand-purple-deep/10 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-[10px] font-bold uppercase tracking-wider text-brand-navy/50">{title}</h2>
      {children}
    </div>
  );
}

function Info({ label, children, wide = false }: { label: string; children: React.ReactNode; wide?: boolean }) {
  return (
    <div className={wide ? "sm:col-span-2" : ""}>
      <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand-navy/40">{label}</p>
      <p className="text-sm text-brand-navy">{children}</p>
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

export function ClientDetailViewer({ id }: { id: string }) {
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const [editOpen, setEditOpen] = useState(false);
  const [editForm, setEditForm] = useState({ email: "", phone: "", internal_notes: "" });
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const [notesOpen, setNotesOpen] = useState(false);
  const [notesText, setNotesText] = useState("");

  useEffect(() => {
    fetch(`/api/admin/clients/${id}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.error) setFetchError(d.error);
        else setClient(d.client);
      })
      .catch(() => setFetchError("Failed to load client."))
      .finally(() => setLoading(false));
  }, [id]);

  function openEdit() {
    if (!client) return;
    setEditForm({ email: client.email, phone: client.phone ?? "", internal_notes: client.internal_notes ?? "" });
    setSaveError(null);
    setEditOpen(true);
  }

  function openNotes() {
    if (!client) return;
    setNotesText(client.internal_notes ?? "");
    setSaveError(null);
    setNotesOpen(true);
  }

  async function saveEdit() {
    if (!client) return;
    setSaving(true);
    setSaveError(null);
    try {
      const res = await fetch(`/api/admin/clients/${client.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      const data = await res.json();
      if (!res.ok || data.error) { setSaveError(data.error ?? "Save failed"); return; }
      setClient((prev) => prev
        ? { ...prev, email: editForm.email, phone: editForm.phone || null, internal_notes: editForm.internal_notes || null }
        : prev
      );
      setEditOpen(false);
    } catch {
      setSaveError("Network error — please try again.");
    } finally {
      setSaving(false);
    }
  }

  async function saveNotes() {
    if (!client) return;
    setSaving(true);
    setSaveError(null);
    try {
      const res = await fetch(`/api/admin/clients/${client.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ internal_notes: notesText }),
      });
      const data = await res.json();
      if (!res.ok || data.error) { setSaveError(data.error ?? "Save failed"); return; }
      setClient((prev) => prev ? { ...prev, internal_notes: notesText || null } : prev);
      setNotesOpen(false);
    } catch {
      setSaveError("Network error — please try again.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center gap-3 py-20 text-brand-navy/50">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-brand-purple-deep border-t-transparent" />
        Loading client…
      </div>
    );
  }

  if (fetchError || !client) {
    return (
      <div className="py-10 text-center">
        <p className="text-sm text-red-600">{fetchError ?? "Client not found."}</p>
        <Link href="/admin/dashboard/clients" className="mt-3 inline-block text-sm text-brand-purple-deep hover:underline">
          ← Back to Clients
        </Link>
      </div>
    );
  }

  const c = client;
  const childCount = c.children?.length ?? 0;
  const avatarInitial = (c.children?.[0]?.name ?? c.child_name ?? c.parent_name ?? "?").charAt(0).toUpperCase();
  const intakeCount = c.intake_submissions?.length ?? 0;

  return (
    <div className="mx-auto max-w-3xl space-y-6 pt-6 pb-16">
      {/* Back + edit */}
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/admin/dashboard/clients"
          className="flex min-w-0 items-center gap-1.5 text-sm font-semibold text-brand-navy/50 hover:text-brand-navy"
        >
          <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Clients
        </Link>
        <button
          onClick={openEdit}
          className="shrink-0 rounded-xl bg-brand-purple-deep px-4 py-2 text-sm font-semibold text-white hover:bg-brand-purple-deep/90"
        >
          Edit contact
        </button>
      </div>

      {/* Header + notes side-by-side */}
      <div className="grid gap-4 lg:grid-cols-[1fr_260px]">
        {/* Client info card */}
        <div className="rounded-2xl border border-brand-purple-deep/10 bg-white p-5 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-purple-deep/10 text-xl font-extrabold text-brand-purple-deep">
              {avatarInitial}
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-lg font-extrabold text-brand-navy">{c.parent_name ?? "Unknown parent"}</h1>
              <p className="mt-0.5 text-sm text-brand-navy/60">{c.email}</p>
              {c.phone && <p className="mt-0.5 text-xs text-brand-navy/40">{c.phone}</p>}
              <div className="mt-2 flex flex-wrap gap-1.5">
                {(c.source ?? []).map((s) => (
                  <Badge
                    key={s}
                    label={s === "account_signup" ? "Account" : s.charAt(0).toUpperCase() + s.slice(1)}
                    colorClass={SOURCE_COLORS[s] ?? "bg-gray-50 text-gray-600 ring-gray-200"}
                  />
                ))}
                {c.newsletter_opted_in && (
                  <Badge label="Newsletter" colorClass="bg-brand-gold/10 text-brand-gold ring-brand-gold/20" />
                )}
              </div>
              <p className="mt-2 text-[10px] text-brand-navy/30">Client since {fmt(c.created_at)}</p>
            </div>
          </div>
        </div>

        {/* Notes card */}
        <div className="flex flex-col rounded-2xl border border-brand-purple-deep/10 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-[10px] font-bold uppercase tracking-wider text-brand-navy/45">Internal Notes</h2>
            <button
              onClick={openNotes}
              className="text-[10px] font-semibold text-brand-purple-deep hover:underline"
            >
              {c.internal_notes ? "Edit" : "Add note"}
            </button>
          </div>
          {c.internal_notes ? (
            <p className="mt-3 flex-1 text-sm leading-relaxed text-brand-navy/80">{c.internal_notes}</p>
          ) : (
            <p className="mt-3 flex-1 text-xs italic text-brand-navy/30">No notes yet.</p>
          )}
        </div>
      </div>

      {/* Children */}
      <Section title={`Children (${childCount})`}>
        {childCount === 0 ? (
          <p className="text-sm italic text-brand-navy/30">No children on record.</p>
        ) : (
          <div className="space-y-2">
            {c.children.map((ch) => (
              <div key={ch.id} className="flex items-center gap-3 rounded-xl bg-brand-purple-deep/[0.03] px-4 py-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-purple-deep/10 text-sm font-extrabold text-brand-purple-deep">
                  {ch.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold text-brand-navy">{ch.name}</p>
                  {ch.age && <p className="text-xs text-brand-navy/45">Age {ch.age}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </Section>

      {/* Contact info */}
      <Section title="Contact Information">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Info label="Email">{c.email}</Info>
          {c.phone && <Info label="Phone">{c.phone}</Info>}
        </div>
      </Section>

      {/* Linked intake forms */}
      {intakeCount > 0 && (
        <Section title={`Intake Forms (${intakeCount})`}>
          <div className="space-y-2">
            {c.intake_submissions
              .slice()
              .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
              .map((sub) => (
                <div key={sub.id} className="flex items-start gap-3 rounded-xl bg-brand-purple-deep/[0.03] p-3">
                  <Badge label={FORM_LABELS[sub.form_type] ?? sub.form_type} colorClass={FORM_COLORS[sub.form_type] ?? ""} />
                  <div className="flex-1 min-w-0">
                    {sub.child_name && <p className="text-xs font-semibold text-brand-navy">{sub.child_name}</p>}
                    {sub.main_concern && <p className="mt-0.5 text-xs text-brand-navy/70 line-clamp-2">{sub.main_concern}</p>}
                    {sub.top_goal && <p className="mt-0.5 text-xs text-brand-navy/50 line-clamp-1">Goal: {sub.top_goal}</p>}
                    <p className="mt-1 text-[10px] text-brand-navy/35">{fmt(sub.created_at)}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <Badge
                      label={STATUS_LABELS[sub.status] ?? sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}
                      colorClass={STATUS_COLORS[sub.status] ?? "bg-gray-50 text-gray-500 ring-gray-200"}
                    />
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
        </Section>
      )}

      {/* Edit contact modal */}
      {editOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-brand-navy/40 p-4 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) setEditOpen(false); }}
        >
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <h2 className="text-lg font-extrabold text-brand-navy">Edit Contact</h2>
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
            </div>
            {saveError && <p className="mt-3 text-xs text-red-600">{saveError}</p>}
            <div className="mt-5 flex justify-end gap-3">
              <button onClick={() => setEditOpen(false)} className="rounded-xl px-4 py-2 text-sm font-semibold text-brand-navy/60 hover:text-brand-navy">Cancel</button>
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

      {/* Notes modal */}
      {notesOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-brand-navy/40 p-4 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) setNotesOpen(false); }}
        >
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <h2 className="text-lg font-extrabold text-brand-navy">Internal Notes</h2>
            <p className="mt-1 text-xs text-brand-navy/50">Only visible to the Ava's Hub team.</p>
            <textarea
              rows={5}
              value={notesText}
              onChange={(e) => setNotesText(e.target.value)}
              placeholder="Add notes here…"
              className="mt-4 w-full resize-none rounded-xl border border-brand-purple-deep/20 px-3 py-2.5 text-sm text-brand-navy placeholder:text-brand-navy/35 focus:border-brand-purple-deep/40 focus:outline-none focus:ring-2 focus:ring-brand-purple-deep/15"
            />
            {saveError && <p className="mt-2 text-xs text-red-600">{saveError}</p>}
            <div className="mt-4 flex justify-end gap-3">
              <button onClick={() => setNotesOpen(false)} className="rounded-xl px-4 py-2 text-sm font-semibold text-brand-navy/60 hover:text-brand-navy">Cancel</button>
              <button
                onClick={saveNotes}
                disabled={saving}
                className="rounded-xl bg-brand-purple-deep px-5 py-2 text-sm font-semibold text-white hover:bg-brand-purple-deep/90 disabled:opacity-50"
              >
                {saving ? "Saving…" : "Save note"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
