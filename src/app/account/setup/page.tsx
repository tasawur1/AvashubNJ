"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "@/lib/supabase-browser";

type Child = { name: string; age: string };
type Step  = 1 | 2 | 3;

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

  const barColor  = { weak: "bg-red-400",    good: "bg-yellow-400", strong: "bg-green-500" }[strength];
  const barWidth  = { weak: "w-1/3",         good: "w-2/3",         strong: "w-full"       }[strength];
  const label     = { weak: "Weak",          good: "Good",          strong: "Strong"       }[strength];
  const labelColor = { weak: "text-red-500", good: "text-yellow-600", strong: "text-green-600" }[strength];

  return (
    <div className="mt-1.5 grid gap-1.5">
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-brand-purple-deep/10">
        <div className={`h-full rounded-full transition-all duration-300 ${barColor} ${barWidth}`} />
      </div>
      <div className="flex items-center justify-between">
        <span className={`text-xs font-bold ${labelColor}`}>{label}</span>
      </div>
      <div className="flex gap-4">
        {[
          { met: len >= 8,    label: "8+ chars"   },
          { met: hasUpper,    label: "Uppercase"  },
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

const inputCls = "w-full rounded-full border border-brand-teal/20 bg-[#fffaf4] px-5 py-3 text-sm text-brand-navy outline-none transition placeholder:text-brand-navy/40 focus:border-brand-purple-bright focus:ring-2 focus:ring-brand-purple-bright/20";

export default function AccountSetupPage() {
  const router = useRouter();

  const [step, setStep]         = useState<Step>(1);
  const [parentName, setParentName] = useState("");
  const [phone, setPhone]       = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [showPwd, setShowPwd]   = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [children, setChildren] = useState<Child[]>([{ name: "", age: "" }]);
  const [newsletter, setNewsletter] = useState(true);
  const [saving, setSaving]     = useState(false);
  const [error, setError]       = useState("");

  function addChild() {
    setChildren((prev) => [...prev, { name: "", age: "" }]);
  }

  function removeChild(index: number) {
    setChildren((prev) => prev.filter((_, i) => i !== index));
  }

  function updateChild(index: number, field: keyof Child, value: string) {
    setChildren((prev) => prev.map((c, i) => i === index ? { ...c, [field]: value } : c));
  }

  function handleStep1Next() {
    if (password) {
      if (password !== confirmPwd) { setError("Passwords don't match."); return; }
      if (!/[A-Z]/.test(password) || !/[^a-zA-Z0-9]/.test(password) || password.length < 8) {
        setError("Password needs 8+ characters, one uppercase letter, and one special character.");
        return;
      }
    }
    setError("");
    setStep(2);
  }

  async function handleSubmit() {
    setSaving(true);
    setError("");
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    try {
      const res = await fetch("/api/client/onboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          parent_name: parentName.trim() || null,
          phone:       phone.trim() || null,
          children:    children.filter((c) => c.name.trim()),
          newsletter_opted_in: newsletter,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { error?: string }).error ?? "Something went wrong.");
      }
      if (password) {
        const supabase = createBrowserSupabaseClient();
        await supabase.auth.updateUser({ password }).catch(() => {});
      }
      router.push("/account");
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") {
        setError("Request timed out. Please try again.");
      } else {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      }
    } finally {
      clearTimeout(timeout);
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-lg px-4">
      {/* Progress */}
      <div className="mb-8 flex items-center gap-2">
        {([1, 2, 3] as Step[]).map((s) => (
          <div key={s} className="flex flex-1 flex-col items-center gap-1.5">
            <div className={`h-1.5 w-full rounded-full transition-colors ${s <= step ? "bg-brand-purple-bright" : "bg-brand-purple-deep/10"}`} />
            <span className={`text-[10px] font-bold uppercase tracking-wider ${s <= step ? "text-brand-purple-bright" : "text-brand-navy/30"}`}>
              {s === 1 ? "Your Info" : s === 2 ? "Children" : "Finish"}
            </span>
          </div>
        ))}
      </div>

      {/* Step 1: Personal info */}
      {step === 1 && (
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-purple-deep/10">
          <h1 className="text-xl font-extrabold text-brand-navy">Your information</h1>
          <p className="mt-1 text-sm text-brand-navy/55">So we know how to reach you.</p>

          <div className="mt-6 grid gap-4">
            <div className="grid gap-1.5">
              <label className="text-sm font-semibold text-brand-navy">Your name</label>
              <input
                type="text"
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                placeholder="Jane Smith"
                className={inputCls}
              />
            </div>

            <div className="grid gap-1.5">
              <label className="text-sm font-semibold text-brand-navy">Phone number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(555) 000-0000"
                className={inputCls}
              />
            </div>

            <div className="border-t border-brand-purple-deep/10 pt-4">
              <p className="mb-3 text-sm font-semibold text-brand-navy">
                Create a password{" "}
                <span className="font-normal text-brand-navy/45">(optional — you can also sign in with a link)</span>
              </p>

              <div className="grid gap-3">
                <div className="grid gap-1.5">
                  <label className="text-xs font-semibold text-brand-navy/60">Password</label>
                  <div className="relative">
                    <input
                      type={showPwd ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      autoComplete="new-password"
                      className={inputCls + " pr-11"}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPwd(!showPwd)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-navy/40 transition hover:text-brand-navy"
                      aria-label={showPwd ? "Hide password" : "Show password"}
                    >
                      <EyeIcon open={showPwd} />
                    </button>
                  </div>
                  <PasswordStrength pwd={password} />
                </div>

                {password && (
                  <div className="grid gap-1.5">
                    <label className="text-xs font-semibold text-brand-navy/60">Confirm password</label>
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
                        aria-label={showConfirm ? "Hide" : "Show"}
                      >
                        <EyeIcon open={showConfirm} />
                      </button>
                    </div>
                    {confirmPwd && password !== confirmPwd && (
                      <p className="text-xs font-semibold text-red-500">Passwords don&apos;t match</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {error && (
            <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">{error}</p>
          )}

          <button
            onClick={handleStep1Next}
            className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-brand-purple-bright px-6 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-brand-purple-deep"
          >
            Next →
          </button>
        </div>
      )}

      {/* Step 2: Children */}
      {step === 2 && (
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-purple-deep/10">
          <h1 className="text-xl font-extrabold text-brand-navy">Your children</h1>
          <p className="mt-1 text-sm text-brand-navy/55">Add each child you&apos;re enrolling.</p>

          <div className="mt-6 grid gap-3">
            {children.map((child, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="flex flex-1 gap-2">
                  <input
                    type="text"
                    value={child.name}
                    onChange={(e) => updateChild(i, "name", e.target.value)}
                    placeholder="Child's name"
                    className="flex-1 rounded-full border border-brand-teal/20 bg-[#fffaf4] px-4 py-2.5 text-sm text-brand-navy outline-none transition placeholder:text-brand-navy/40 focus:border-brand-purple-bright focus:ring-2 focus:ring-brand-purple-bright/20"
                  />
                  <input
                    type="text"
                    value={child.age}
                    onChange={(e) => updateChild(i, "age", e.target.value)}
                    placeholder="Age"
                    className="w-20 rounded-full border border-brand-teal/20 bg-[#fffaf4] px-4 py-2.5 text-sm text-brand-navy outline-none transition placeholder:text-brand-navy/40 focus:border-brand-purple-bright focus:ring-2 focus:ring-brand-purple-bright/20"
                  />
                </div>
                {children.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeChild(i)}
                    className="shrink-0 text-brand-navy/30 transition hover:text-red-500"
                    aria-label="Remove child"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={addChild}
              className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-brand-purple-bright hover:underline"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
              Add another child
            </button>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={() => setStep(1)}
              className="flex-1 rounded-full border border-brand-purple-deep/15 px-6 py-3 text-sm font-semibold text-brand-navy/70 transition hover:bg-brand-lavender"
            >
              ← Back
            </button>
            <button
              onClick={() => setStep(3)}
              className="flex-1 rounded-full bg-brand-purple-bright px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-brand-purple-deep"
            >
              Next →
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Newsletter + finish */}
      {step === 3 && (
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-purple-deep/10">
          <h1 className="text-xl font-extrabold text-brand-navy">Almost done!</h1>
          <p className="mt-1 text-sm text-brand-navy/55">Just one last thing.</p>

          <label className="mt-6 flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={newsletter}
              onChange={(e) => setNewsletter(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-brand-teal/30 text-brand-purple-bright"
            />
            <span className="text-sm leading-relaxed text-brand-navy/80">
              Send me helpful updates, tips, and news from Ava&apos;s Hub.{" "}
              <span className="text-brand-navy/45">(You can unsubscribe anytime.)</span>
            </span>
          </label>

          {error && (
            <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
              {error}
            </p>
          )}

          <div className="mt-6 flex gap-3">
            <button
              onClick={() => setStep(2)}
              className="flex-1 rounded-full border border-brand-purple-deep/15 px-6 py-3 text-sm font-semibold text-brand-navy/70 transition hover:bg-brand-lavender"
            >
              ← Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={saving}
              className="flex-1 whitespace-nowrap rounded-full bg-brand-purple-bright px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-brand-purple-deep disabled:opacity-60"
            >
              {saving ? "Saving…" : "Finish"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
