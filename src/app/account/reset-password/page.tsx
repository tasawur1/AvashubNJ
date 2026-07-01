"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "@/lib/supabase-browser";

function pwdStrength(pwd: string): "weak" | "good" | "strong" {
  const hasUpper   = /[A-Z]/.test(pwd);
  const hasSpecial = /[^a-zA-Z0-9]/.test(pwd);
  if (!hasUpper || !hasSpecial || pwd.length < 8) return "weak";
  if (pwd.length >= 12) return "strong";
  return "good";
}

function EyeIcon({ open }: { open: boolean }) {
  return open ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
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
          { met: len >= 8,    label: "8+ chars"        },
          { met: hasUpper,    label: "Uppercase"        },
          { met: hasSpecial,  label: "Special (!@#…)"  },
        ].map(({ met, label: l }) => (
          <span key={l} className={`flex items-center gap-1 text-[10px] font-semibold ${met ? "text-green-600" : "text-brand-navy/35"}`}>
            {met ? "✓" : "○"} {l}
          </span>
        ))}
      </div>
    </div>
  );
}

const inputCls = "w-full rounded-full border border-brand-teal/20 bg-[#fffaf4] px-5 py-3 text-sm text-brand-navy shadow-sm outline-none transition placeholder:text-brand-navy/40 focus:border-brand-purple-bright focus:ring-2 focus:ring-brand-purple-bright/20";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword]   = useState("");
  const [confirm, setConfirm]     = useState("");
  const [showPwd, setShowPwd]     = useState(false);
  const [showConf, setShowConf]   = useState(false);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) { setError("Passwords don't match."); return; }
    if (!/[A-Z]/.test(password) || !/[^a-zA-Z0-9]/.test(password) || password.length < 8) {
      setError("Password needs 8+ characters, one uppercase letter, and one special character.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const supabase = createBrowserSupabaseClient();
      const { error: updateError } = await supabase.auth.updateUser({ password });
      if (updateError) {
        setError(updateError.message);
      } else {
        router.push("/account");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#fffaf4] px-4 py-12">
      <div className="w-full max-w-md rounded-[2rem] bg-white p-8 shadow-card ring-1 ring-brand-purple-deep/10 lg:p-10">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-purple-bright/10">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
              <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="1.75" className="text-brand-purple-bright" />
              <path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" className="text-brand-purple-bright" />
            </svg>
          </div>
          <h1 className="text-2xl font-extrabold text-brand-navy">Set a new password</h1>
          <p className="mt-1.5 text-sm text-brand-navy/55">Choose a strong password for your account.</p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-1.5">
            <label htmlFor="new-password" className="text-sm font-semibold text-brand-navy">
              New password
            </label>
            <div className="relative">
              <input
                id="new-password"
                type={showPwd ? "text" : "password"}
                required
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={inputCls + " pr-12"}
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

          <div className="grid gap-1.5">
            <label htmlFor="confirm-password" className="text-sm font-semibold text-brand-navy">
              Confirm password
            </label>
            <div className="relative">
              <input
                id="confirm-password"
                type={showConf ? "text" : "password"}
                required
                autoComplete="new-password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="••••••••"
                className={inputCls + " pr-12"}
              />
              <button
                type="button"
                onClick={() => setShowConf(!showConf)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-navy/40 transition hover:text-brand-navy"
                aria-label={showConf ? "Hide" : "Show"}
              >
                <EyeIcon open={showConf} />
              </button>
            </div>
            {confirm && password !== confirm && (
              <p className="text-xs font-semibold text-red-500">Passwords don&apos;t match</p>
            )}
          </div>

          {error && (
            <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-brand-purple-bright px-6 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-brand-purple-deep disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Saving…" : "Set password"}
          </button>
        </form>
      </div>
    </div>
  );
}
