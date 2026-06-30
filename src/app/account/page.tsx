"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Child  = { id?: string; name: string; age: string };
type Client = {
  id: string;
  parent_name: string | null;
  email: string;
  phone: string | null;
  newsletter_opted_in: boolean;
};

export default function AccountPage() {
  const router = useRouter();

  const [client, setClient]     = useState<Client | null>(null);
  const [children, setChildren] = useState<Child[]>([]);
  const [loading, setLoading]   = useState(true);
  const [editing, setEditing]   = useState(false);

  // Edit state
  const [editName, setEditName]         = useState("");
  const [editPhone, setEditPhone]       = useState("");
  const [editChildren, setEditChildren] = useState<Child[]>([]);
  const [editNewsletter, setEditNewsletter] = useState(false);
  const [saving, setSaving]             = useState(false);
  const [saveError, setSaveError]       = useState("");

  const loadProfile = useCallback(async () => {
    const res = await fetch("/api/client/profile");
    if (res.status === 401) { router.push("/login"); return; }
    if (res.status === 404) { router.push("/account/setup"); return; }
    const data = await res.json();
    setClient(data.client);
    setChildren(data.children ?? []);
    setLoading(false);
  }, [router]);

  useEffect(() => { loadProfile(); }, [loadProfile]);

  function openEdit() {
    if (!client) return;
    setEditName(client.parent_name ?? "");
    setEditPhone(client.phone ?? "");
    setEditChildren(children.map((c) => ({ ...c })));
    setEditNewsletter(client.newsletter_opted_in);
    setSaveError("");
    setEditing(true);
  }

  function addEditChild() {
    setEditChildren((prev) => [...prev, { name: "", age: "" }]);
  }

  function removeEditChild(i: number) {
    setEditChildren((prev) => prev.filter((_, idx) => idx !== i));
  }

  function updateEditChild(i: number, field: keyof Child, value: string) {
    setEditChildren((prev) => prev.map((c, idx) => idx === i ? { ...c, [field]: value } : c));
  }

  async function handleSave() {
    setSaving(true);
    setSaveError("");
    const res = await fetch("/api/client/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        parent_name:         editName.trim() || null,
        phone:               editPhone.trim() || null,
        newsletter_opted_in: editNewsletter,
        children:            editChildren.filter((c) => c.name.trim()),
      }),
    });
    const data = await res.json();
    if (data.success) {
      setEditing(false);
      await loadProfile();
    } else {
      setSaveError(data.error ?? "Could not save changes.");
    }
    setSaving(false);
  }

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-brand-purple-bright border-t-transparent" />
      </div>
    );
  }

  if (!client) return null;

  const initials = (client.parent_name ?? client.email).charAt(0).toUpperCase();

  return (
    <div className="mx-auto max-w-2xl px-4">
      {/* Profile header */}
      <div className="mb-6 flex items-center gap-4">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-purple-bright text-xl font-extrabold text-white">
          {initials}
        </span>
        <div>
          <h1 className="text-xl font-extrabold text-brand-navy">
            {client.parent_name ? `Hi, ${client.parent_name.split(" ")[0]}!` : "My Account"}
          </h1>
          <p className="text-sm text-brand-navy/50">{client.email}</p>
        </div>
      </div>

      {!editing ? (
        <div className="grid gap-4">
          {/* Profile card */}
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-brand-purple-deep/10">
            <div className="flex items-center justify-between">
              <h2 className="text-[10px] font-bold uppercase tracking-wider text-brand-navy/40">
                Profile
              </h2>
              <button
                onClick={openEdit}
                className="text-xs font-semibold text-brand-purple-bright hover:underline"
              >
                Edit
              </button>
            </div>
            <dl className="mt-4 grid gap-3">
              <Row label="Name"  value={client.parent_name ?? "—"} />
              <Row label="Email" value={client.email} />
              <Row label="Phone" value={client.phone ?? "—"} />
              <Row label="Newsletter" value={client.newsletter_opted_in ? "Subscribed" : "Not subscribed"} />
            </dl>
          </div>

          {/* Children card */}
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-brand-purple-deep/10">
            <div className="flex items-center justify-between">
              <h2 className="text-[10px] font-bold uppercase tracking-wider text-brand-navy/40">
                Children
              </h2>
              <button
                onClick={openEdit}
                className="text-xs font-semibold text-brand-purple-bright hover:underline"
              >
                Edit
              </button>
            </div>
            {children.length === 0 ? (
              <p className="mt-3 text-sm italic text-brand-navy/35">No children added yet.</p>
            ) : (
              <ul className="mt-4 grid gap-2">
                {children.map((c, i) => (
                  <li key={i} className="flex items-center justify-between rounded-xl bg-brand-lavender/40 px-4 py-2.5">
                    <span className="text-sm font-semibold text-brand-navy">{c.name}</span>
                    {c.age && <span className="text-xs text-brand-navy/50">{c.age} yrs</span>}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Intake forms shortcut */}
          <Link
            href="/programs"
            className="flex items-center justify-between rounded-2xl bg-brand-purple-bright px-5 py-4 text-white shadow-sm transition hover:bg-brand-purple-deep"
          >
            <span className="text-sm font-bold">Start an intake form →</span>
          </Link>
        </div>
      ) : (
        /* Edit panel */
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-purple-deep/10">
          <h2 className="text-base font-extrabold text-brand-navy">Edit profile</h2>

          <div className="mt-5 grid gap-4">
            <Field label="Your name">
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="Jane Smith"
                className="w-full rounded-full border border-brand-teal/20 bg-[#fffaf4] px-5 py-2.5 text-sm text-brand-navy outline-none transition focus:border-brand-purple-bright focus:ring-2 focus:ring-brand-purple-bright/20"
              />
            </Field>

            <Field label="Phone number">
              <input
                type="tel"
                value={editPhone}
                onChange={(e) => setEditPhone(e.target.value)}
                placeholder="(555) 000-0000"
                className="w-full rounded-full border border-brand-teal/20 bg-[#fffaf4] px-5 py-2.5 text-sm text-brand-navy outline-none transition focus:border-brand-purple-bright focus:ring-2 focus:ring-brand-purple-bright/20"
              />
            </Field>

            <div>
              <p className="mb-2 text-sm font-semibold text-brand-navy">Children</p>
              <div className="grid gap-2">
                {editChildren.map((child, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={child.name}
                      onChange={(e) => updateEditChild(i, "name", e.target.value)}
                      placeholder="Name"
                      className="flex-1 rounded-full border border-brand-teal/20 bg-[#fffaf4] px-4 py-2 text-sm text-brand-navy outline-none transition focus:border-brand-purple-bright focus:ring-2 focus:ring-brand-purple-bright/20"
                    />
                    <input
                      type="text"
                      value={child.age}
                      onChange={(e) => updateEditChild(i, "age", e.target.value)}
                      placeholder="Age"
                      className="w-16 rounded-full border border-brand-teal/20 bg-[#fffaf4] px-3 py-2 text-sm text-brand-navy outline-none transition focus:border-brand-purple-bright focus:ring-2 focus:ring-brand-purple-bright/20"
                    />
                    <button
                      type="button"
                      onClick={() => removeEditChild(i)}
                      className="text-brand-navy/30 transition hover:text-red-500"
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addEditChild}
                  className="flex items-center gap-1 text-xs font-semibold text-brand-purple-bright hover:underline"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                  Add child
                </button>
              </div>
            </div>

            <label className="flex cursor-pointer items-center gap-2.5">
              <input
                type="checkbox"
                checked={editNewsletter}
                onChange={(e) => setEditNewsletter(e.target.checked)}
                className="h-4 w-4 rounded border-brand-teal/30 text-brand-purple-bright"
              />
              <span className="text-sm text-brand-navy/80">Receive updates from Ava&apos;s Hub</span>
            </label>
          </div>

          {saveError && (
            <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
              {saveError}
            </p>
          )}

          <div className="mt-6 flex gap-3">
            <button
              onClick={() => setEditing(false)}
              className="flex-1 rounded-full border border-brand-purple-deep/15 py-2.5 text-sm font-semibold text-brand-navy/70 transition hover:bg-brand-lavender"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 rounded-full bg-brand-purple-bright py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-brand-purple-deep disabled:opacity-60"
            >
              {saving ? "Saving…" : "Save changes"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="text-xs font-semibold text-brand-navy/45">{label}</dt>
      <dd className="text-right text-sm text-brand-navy/80">{value}</dd>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1.5">
      <label className="text-sm font-semibold text-brand-navy">{label}</label>
      {children}
    </div>
  );
}
