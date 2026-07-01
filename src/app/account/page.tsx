"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createBrowserSupabaseClient } from "@/lib/supabase-browser";
import { PhoneInputField } from "@/components/PhoneInputField";
import { validatePhone, validateChildAge } from "@/lib/validation";

type Child  = { id?: string; name: string; age: string };
type Client = {
  id: string;
  parent_name: string | null;
  email: string;
  phone: string | null;
  newsletter_opted_in: boolean;
};

function pwdStrength(pwd: string): "weak" | "good" | "strong" {
  const hasUpper   = /[A-Z]/.test(pwd);
  const hasSpecial = /[^a-zA-Z0-9]/.test(pwd);
  if (!hasUpper || !hasSpecial || pwd.length < 8) return "weak";
  if (pwd.length >= 12) return "strong";
  return "good";
}

function EyeIcon({ open }: { open: boolean }) {
  return open ? (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PasswordStrength({ pwd }: { pwd: string }) {
  if (!pwd) return null;
  const hasUpper   = /[A-Z]/.test(pwd);
  const hasSpecial = /[^a-zA-Z0-9]/.test(pwd);
  const len        = pwd.length;
  const strength   = pwdStrength(pwd);

  const barColor   = { weak: "bg-red-400",    good: "bg-yellow-400", strong: "bg-green-500" }[strength];
  const barWidth   = { weak: "w-1/3",         good: "w-2/3",         strong: "w-full"       }[strength];
  const label      = { weak: "Weak",          good: "Good",          strong: "Strong"       }[strength];
  const labelColor = { weak: "text-red-500",  good: "text-yellow-600", strong: "text-green-600" }[strength];

  return (
    <div className="mt-1.5 grid gap-1.5">
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-brand-purple-deep/10">
        <div className={`h-full rounded-full transition-all duration-300 ${barColor} ${barWidth}`} />
      </div>
      <span className={`text-xs font-bold ${labelColor}`}>{label}</span>
      <div className="flex gap-4">
        {[
          { met: len >= 8,    label: "8+ chars"       },
          { met: hasUpper,    label: "Uppercase"       },
          { met: hasSpecial,  label: "Special (!@#…)" },
        ].map(({ met, label: l }) => (
          <span key={l} className={`flex items-center gap-1 text-[10px] font-semibold ${met ? "text-green-600" : "text-brand-navy/35"}`}>
            {met ? "✓" : "○"} {l}
          </span>
        ))}
      </div>
    </div>
  );
}

const inputCls = "w-full rounded-full border border-brand-teal/20 bg-[#fffaf4] px-5 py-2.5 text-sm text-brand-navy outline-none transition focus:border-brand-purple-bright focus:ring-2 focus:ring-brand-purple-bright/20";

export default function AccountPage() {
  const router = useRouter();

  const [client, setClient]     = useState<Client | null>(null);
  const [children, setChildren] = useState<Child[]>([]);
  const [loading, setLoading]   = useState(true);
  const [editing, setEditing]   = useState(false);

  // Edit state
  const [editName, setEditName]             = useState("");
  const [editPhone, setEditPhone]           = useState("");
  const [editChildren, setEditChildren]     = useState<Child[]>([]);
  const [editNewsletter, setEditNewsletter] = useState(false);
  const [saving, setSaving]                 = useState(false);
  const [saveError, setSaveError]           = useState("");

  // Change password state
  const [changingPwd, setChangingPwd]         = useState(false);
  const [currentPwd, setCurrentPwd]           = useState("");
  const [newPwd, setNewPwd]                   = useState("");
  const [confirmPwd, setConfirmPwd]           = useState("");
  const [showCurrent, setShowCurrent]         = useState(false);
  const [showNew, setShowNew]                 = useState(false);
  const [showConfirm, setShowConfirm]         = useState(false);
  const [pwdLoading, setPwdLoading]           = useState(false);
  const [pwdError, setPwdError]               = useState("");
  const [pwdSuccess, setPwdSuccess]           = useState(false);

  const loadProfile = useCallback(async () => {
    try {
      const res = await fetch("/api/client/profile");
      if (res.status === 401) { router.push("/login"); return; }
      if (res.status === 404) { router.push("/account/setup"); return; }
      if (!res.ok) throw new Error(`Server error ${res.status}`);
      const data = await res.json();
      setClient(data.client);
      setChildren(data.children ?? []);
    } catch {
      router.push("/login");
    } finally {
      setLoading(false);
    }
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
    if (editPhone) {
      const phoneErr = validatePhone(editPhone);
      if (phoneErr) { setSaveError(phoneErr); return; }
    }
    for (const c of editChildren.filter((ch) => ch.name.trim())) {
      const ageErr = validateChildAge(c.age);
      if (ageErr) { setSaveError(ageErr); return; }
    }
    setSaving(true);
    setSaveError("");
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    try {
      const res = await fetch("/api/client/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          parent_name:         editName.trim() || null,
          phone:               editPhone.trim() || null,
          newsletter_opted_in: editNewsletter,
          children:            editChildren.filter((c) => c.name.trim()),
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { error?: string }).error ?? "Could not save changes.");
      }
      setEditing(false);
      await loadProfile();
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") {
        setSaveError("Request timed out. Please try again.");
      } else {
        setSaveError(err instanceof Error ? err.message : "Could not save changes.");
      }
    } finally {
      clearTimeout(timeout);
      setSaving(false);
    }
  }

  function openChangePwd() {
    setCurrentPwd("");
    setNewPwd("");
    setConfirmPwd("");
    setPwdError("");
    setPwdSuccess(false);
    setChangingPwd(true);
  }

  async function handleChangePassword() {
    if (newPwd !== confirmPwd) { setPwdError("Passwords don't match."); return; }
    if (!/[A-Z]/.test(newPwd) || !/[^a-zA-Z0-9]/.test(newPwd) || newPwd.length < 8) {
      setPwdError("Password needs 8+ characters, one uppercase letter, and one special character.");
      return;
    }
    setPwdLoading(true);
    setPwdError("");
    try {
      const supabase = createBrowserSupabaseClient();
      if (currentPwd.trim()) {
        const { error: verifyError } = await supabase.auth.signInWithPassword({
          email: client!.email,
          password: currentPwd,
        });
        if (verifyError) {
          setPwdError("Current password is incorrect.");
          return;
        }
      }
      const { error: updateError } = await supabase.auth.updateUser({ password: newPwd });
      if (updateError) {
        setPwdError(updateError.message);
      } else {
        setPwdSuccess(true);
        setTimeout(() => setChangingPwd(false), 1500);
      }
    } catch {
      setPwdError("Something went wrong. Please try again.");
    } finally {
      setPwdLoading(false);
    }
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
      {/* Back arrow */}
      <button
        onClick={() => router.back()}
        className="mb-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-navy/50 transition hover:text-brand-purple-bright"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
          <path d="M12.5 15L7.5 10l5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Back
      </button>

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
              <h2 className="text-[10px] font-bold uppercase tracking-wider text-brand-navy/40">Profile</h2>
              <button onClick={openEdit} className="text-xs font-semibold text-brand-purple-bright hover:underline">
                Edit
              </button>
            </div>
            <dl className="mt-4 grid gap-3">
              <Row label="Name"       value={client.parent_name ?? "—"} />
              <Row label="Email"      value={client.email} />
              <Row label="Phone"      value={client.phone ?? "—"} />
              <Row label="Newsletter" value={client.newsletter_opted_in ? "Subscribed" : "Not subscribed"} />
            </dl>
          </div>

          {/* Children card */}
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-brand-purple-deep/10">
            <div className="flex items-center justify-between">
              <h2 className="text-[10px] font-bold uppercase tracking-wider text-brand-navy/40">Children</h2>
              <button onClick={openEdit} className="text-xs font-semibold text-brand-purple-bright hover:underline">
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

          {/* Security card */}
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-brand-purple-deep/10">
            <h2 className="text-[10px] font-bold uppercase tracking-wider text-brand-navy/40">Security</h2>
            <button
              onClick={openChangePwd}
              className="mt-3 flex w-full items-center justify-between rounded-xl bg-brand-lavender/30 px-4 py-3 text-left transition hover:bg-brand-lavender/60"
            >
              <span className="text-sm font-semibold text-brand-navy">Change password</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-navy/40" />
              </svg>
            </button>
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
                className={inputCls}
              />
            </Field>

            <Field label="Phone number">
              <PhoneInputField value={editPhone} onChange={setEditPhone} variant="pill" />
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
                      type="number"
                      min={1}
                      max={21}
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

      {/* Change password modal */}
      {changingPwd && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) setChangingPwd(false); }}
        >
          <div className="w-full max-w-md rounded-[2rem] bg-white p-8 shadow-xl ring-1 ring-brand-purple-deep/10">
            <h2 className="text-xl font-extrabold text-brand-navy">Change password</h2>

            {pwdSuccess ? (
              <div className="mt-6 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M5 13l4 4L19 7" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="font-semibold text-brand-navy">Password updated!</p>
              </div>
            ) : (
              <div className="mt-5 grid gap-4">
                <div className="grid gap-1.5">
                  <label className="text-sm font-semibold text-brand-navy">
                    Current password
                    <span className="ml-1 text-xs font-normal text-brand-navy/45">(leave blank if signed in with Google)</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrent ? "text" : "password"}
                      value={currentPwd}
                      onChange={(e) => setCurrentPwd(e.target.value)}
                      placeholder="••••••••"
                      autoComplete="current-password"
                      className={inputCls + " pr-11"}
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrent(!showCurrent)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-navy/40 transition hover:text-brand-navy"
                    >
                      <EyeIcon open={showCurrent} />
                    </button>
                  </div>
                </div>

                <div className="grid gap-1.5">
                  <label className="text-sm font-semibold text-brand-navy">New password</label>
                  <div className="relative">
                    <input
                      type={showNew ? "text" : "password"}
                      value={newPwd}
                      onChange={(e) => setNewPwd(e.target.value)}
                      placeholder="••••••••"
                      autoComplete="new-password"
                      className={inputCls + " pr-11"}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNew(!showNew)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-navy/40 transition hover:text-brand-navy"
                    >
                      <EyeIcon open={showNew} />
                    </button>
                  </div>
                  <PasswordStrength pwd={newPwd} />
                </div>

                <div className="grid gap-1.5">
                  <label className="text-sm font-semibold text-brand-navy">Confirm new password</label>
                  <div className="relative">
                    <input
                      type={showConfirm ? "text" : "password"}
                      value={confirmPwd}
                      onChange={(e) => setConfirmPwd(e.target.value)}
                      placeholder="••••••••"
                      autoComplete="new-password"
                      className={inputCls + " pr-11"}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-navy/40 transition hover:text-brand-navy"
                    >
                      <EyeIcon open={showConfirm} />
                    </button>
                  </div>
                  {confirmPwd && newPwd !== confirmPwd && (
                    <p className="text-xs font-semibold text-red-500">Passwords don&apos;t match</p>
                  )}
                </div>

                {pwdError && (
                  <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                    {pwdError}
                  </p>
                )}

                <div className="flex gap-3 pt-1">
                  <button
                    onClick={() => setChangingPwd(false)}
                    className="flex-1 rounded-full border border-brand-purple-deep/15 py-2.5 text-sm font-semibold text-brand-navy/70 transition hover:bg-brand-lavender"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleChangePassword}
                    disabled={pwdLoading}
                    className="flex-1 rounded-full bg-brand-purple-bright py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-brand-purple-deep disabled:opacity-60"
                  >
                    {pwdLoading ? "Saving…" : "Save password"}
                  </button>
                </div>
              </div>
            )}
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
