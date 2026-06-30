"use client";

import { useState, useEffect, useCallback } from "react";
import type { StaffPermissions } from "@/lib/session";

type StaffMember = {
  id: string;
  email: string;
  name: string;
  active: boolean;
  permissions: StaffPermissions;
  created_at: string;
};

const SECTIONS: { key: keyof StaffPermissions; label: string; actions: string[] }[] = [
  { key: "intakes", label: "Intake Forms", actions: ["view", "edit", "delete"] },
  { key: "clients", label: "Clients",      actions: ["view", "edit", "delete"] },
  { key: "blogs",   label: "Blogs",        actions: ["view", "edit", "delete"] },
  { key: "logs",    label: "Activity Logs", actions: ["view"] },
  { key: "team",    label: "Team",         actions: ["view", "manage"] },
];

function emptyPermissions(): StaffPermissions {
  return {
    intakes: { view: true,  edit: false, delete: false },
    clients: { view: true,  edit: false, delete: false },
    blogs:   { view: false, edit: false, delete: false },
    logs:    { view: false },
    team:    { view: false, manage: false },
  };
}

export function TeamManager() {
  const [staff, setStaff]       = useState<StaffMember[]>([]);
  const [loading, setLoading]   = useState(true);
  const [adding, setAdding]     = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [editId, setEditId]     = useState<string | null>(null);

  // New staff form
  const [newName,     setNewName]     = useState("");
  const [newEmail,    setNewEmail]    = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPerms,    setNewPerms]    = useState<StaffPermissions>(emptyPermissions());
  const [saving,      setSaving]      = useState(false);
  const [formError,   setFormError]   = useState("");

  // Edit permissions state
  const [editPerms, setEditPerms] = useState<StaffPermissions>(emptyPermissions());
  const [editSaving, setEditSaving] = useState(false);

  const loadStaff = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/staff");
    const data = await res.json();
    setStaff(data.staff ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { loadStaff(); }, [loadStaff]);

  function togglePerm(
    perms: StaffPermissions,
    section: keyof StaffPermissions,
    action: string,
    setter: (p: StaffPermissions) => void
  ) {
    const current = (perms[section] as Record<string, boolean>)[action];
    setter({
      ...perms,
      [section]: { ...(perms[section] as Record<string, boolean>), [action]: !current },
    } as StaffPermissions);
  }

  async function handleAdd() {
    if (!newName.trim() || !newEmail.trim() || !newPassword.trim()) {
      setFormError("Name, email, and password are required.");
      return;
    }
    setSaving(true);
    setFormError("");
    const res = await fetch("/api/admin/staff", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName, email: newEmail, password: newPassword, permissions: newPerms }),
    });
    const data = await res.json();
    if (data.success) {
      setAdding(false);
      setNewName(""); setNewEmail(""); setNewPassword(""); setNewPerms(emptyPermissions());
      await loadStaff();
    } else {
      setFormError(data.error ?? "Something went wrong.");
    }
    setSaving(false);
  }

  async function handleDelete(id: string) {
    setDeleting(true);
    await fetch(`/api/admin/staff/${id}`, { method: "DELETE" });
    setDeleteId(null);
    setDeleting(false);
    await loadStaff();
  }

  async function handleSavePermissions(id: string) {
    setEditSaving(true);
    await fetch(`/api/admin/staff/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ permissions: editPerms }),
    });
    setEditId(null);
    setEditSaving(false);
    await loadStaff();
  }

  async function handleToggleActive(member: StaffMember) {
    await fetch(`/api/admin/staff/${member.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !member.active }),
    });
    await loadStaff();
  }

  return (
    <>
      {/* Add staff button */}
      <div className="mb-4 flex justify-end">
        <button
          onClick={() => { setAdding(true); setFormError(""); }}
          className="rounded-full bg-brand-purple-bright px-5 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-brand-purple-deep"
        >
          + Add staff member
        </button>
      </div>

      {/* Staff list */}
      {loading ? (
        <div className="flex h-40 items-center justify-center">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-brand-purple-bright border-t-transparent" />
        </div>
      ) : staff.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-brand-purple-deep/15 p-10 text-center">
          <p className="text-sm text-brand-navy/40">No staff members yet. Add one to get started.</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {staff.map((member) => (
            <div key={member.id} className="overflow-hidden rounded-xl border border-brand-purple-deep/10 bg-white shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brand-lavender text-sm font-extrabold text-brand-purple-bright">
                    {member.name.charAt(0).toUpperCase()}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-brand-navy">{member.name}</p>
                    <p className="text-xs text-brand-navy/50">{member.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-bold ring-1 ${member.active ? "bg-green-50 text-green-700 ring-green-200" : "bg-gray-50 text-gray-500 ring-gray-200"}`}>
                    {member.active ? "Active" : "Inactive"}
                  </span>
                  <button
                    onClick={() => { setEditId(member.id); setEditPerms({ ...member.permissions }); }}
                    className="rounded-lg px-3 py-1.5 text-xs font-semibold text-brand-navy/70 transition hover:bg-brand-lavender"
                  >
                    Permissions
                  </button>
                  <button
                    onClick={() => handleToggleActive(member)}
                    className="rounded-lg px-3 py-1.5 text-xs font-semibold text-brand-navy/70 transition hover:bg-brand-lavender"
                  >
                    {member.active ? "Deactivate" : "Activate"}
                  </button>
                  <button
                    onClick={() => setDeleteId(member.id)}
                    className="rounded-lg px-3 py-1.5 text-xs font-semibold text-red-500 transition hover:bg-red-50"
                  >
                    Remove
                  </button>
                </div>
              </div>

              {/* Inline permissions editor */}
              {editId === member.id && (
                <div className="border-t border-brand-purple-deep/10 px-5 py-4">
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-brand-navy/45">Permissions</p>
                  <div className="grid gap-3">
                    {SECTIONS.map(({ key, label, actions }) => (
                      <div key={key} className="flex flex-wrap items-center gap-x-6 gap-y-1">
                        <span className="w-28 text-xs font-semibold text-brand-navy/70">{label}</span>
                        {actions.map((action) => (
                          <label key={action} className="flex cursor-pointer items-center gap-1.5">
                            <input
                              type="checkbox"
                              checked={(editPerms[key] as Record<string, boolean>)[action] ?? false}
                              onChange={() => togglePerm(editPerms, key, action, setEditPerms)}
                              className="h-3.5 w-3.5 rounded border-brand-teal/30 text-brand-purple-bright"
                            />
                            <span className="text-xs capitalize text-brand-navy/65">{action}</span>
                          </label>
                        ))}
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => setEditId(null)}
                      className="rounded-full border border-brand-purple-deep/15 px-4 py-1.5 text-xs font-semibold text-brand-navy/70 transition hover:bg-brand-lavender"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSavePermissions(member.id)}
                      disabled={editSaving}
                      className="rounded-full bg-brand-purple-bright px-4 py-1.5 text-xs font-bold text-white transition hover:bg-brand-purple-deep disabled:opacity-60"
                    >
                      {editSaving ? "Saving…" : "Save permissions"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Add staff modal */}
      {adding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <h2 className="text-base font-extrabold text-brand-navy">Add staff member</h2>
            <p className="mt-1 text-xs text-brand-navy/50">They&apos;ll log in at /admin/login with these credentials.</p>

            <div className="mt-5 grid gap-3">
              <div className="grid gap-1">
                <label className="text-xs font-semibold text-brand-navy">Full name</label>
                <input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Jane Smith"
                  className="w-full rounded-full border border-brand-teal/20 bg-[#fffaf4] px-4 py-2.5 text-sm outline-none transition focus:border-brand-purple-bright focus:ring-2 focus:ring-brand-purple-bright/20" />
              </div>
              <div className="grid gap-1">
                <label className="text-xs font-semibold text-brand-navy">Email</label>
                <input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} placeholder="jane@avashubnj.com"
                  className="w-full rounded-full border border-brand-teal/20 bg-[#fffaf4] px-4 py-2.5 text-sm outline-none transition focus:border-brand-purple-bright focus:ring-2 focus:ring-brand-purple-bright/20" />
              </div>
              <div className="grid gap-1">
                <label className="text-xs font-semibold text-brand-navy">Initial password</label>
                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Min. 8 characters"
                  className="w-full rounded-full border border-brand-teal/20 bg-[#fffaf4] px-4 py-2.5 text-sm outline-none transition focus:border-brand-purple-bright focus:ring-2 focus:ring-brand-purple-bright/20" />
              </div>

              <div>
                <p className="mb-2 text-xs font-semibold text-brand-navy">Permissions</p>
                <div className="grid gap-2 rounded-xl bg-[#fffaf4] p-3">
                  {SECTIONS.map(({ key, label, actions }) => (
                    <div key={key} className="flex flex-wrap items-center gap-x-5 gap-y-1">
                      <span className="w-24 text-[11px] font-semibold text-brand-navy/70">{label}</span>
                      {actions.map((action) => (
                        <label key={action} className="flex cursor-pointer items-center gap-1">
                          <input
                            type="checkbox"
                            checked={(newPerms[key] as Record<string, boolean>)[action] ?? false}
                            onChange={() => togglePerm(newPerms, key, action, setNewPerms)}
                            className="h-3 w-3 rounded border-brand-teal/30 text-brand-purple-bright"
                          />
                          <span className="text-[11px] capitalize text-brand-navy/60">{action}</span>
                        </label>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {formError && (
              <p className="mt-3 rounded-xl bg-red-50 px-4 py-2.5 text-xs font-semibold text-red-600">{formError}</p>
            )}

            <div className="mt-5 flex gap-2">
              <button onClick={() => setAdding(false)} className="flex-1 rounded-full border border-brand-purple-deep/15 py-2.5 text-sm font-semibold text-brand-navy/70 transition hover:bg-brand-lavender">
                Cancel
              </button>
              <button onClick={handleAdd} disabled={saving} className="flex-1 rounded-full bg-brand-purple-bright py-2.5 text-sm font-bold text-white transition hover:bg-brand-purple-deep disabled:opacity-60">
                {saving ? "Adding…" : "Add staff"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-xs rounded-2xl bg-white p-5 shadow-2xl">
            <h2 className="text-base font-extrabold text-brand-navy">Remove staff member?</h2>
            <p className="mt-1.5 text-sm text-brand-navy/55">This will delete their login access. Cannot be reversed.</p>
            <div className="mt-5 flex justify-end gap-2">
              <button onClick={() => setDeleteId(null)} className="rounded-full border border-brand-purple-deep/15 px-4 py-2 text-sm font-semibold text-brand-navy/70 transition hover:bg-brand-lavender">Cancel</button>
              <button onClick={() => handleDelete(deleteId)} disabled={deleting} className="rounded-full bg-red-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-red-600 disabled:opacity-60">
                {deleting ? "Removing…" : "Remove"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
