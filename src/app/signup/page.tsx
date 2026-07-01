"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createBrowserSupabaseClient } from "@/lib/supabase-browser";
import { PhoneInputField } from "@/components/PhoneInputField";
import { isPersonalEmail, validateEmail, validatePhone, validateChildAge, suggestEmailCorrection } from "@/lib/validation";

type Step  = 1 | 2 | 3 | 4;
type Child = { name: string; age: string };

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
  const barColor   = { weak: "bg-red-400",    good: "bg-yellow-400",   strong: "bg-green-500"   }[strength];
  const barWidth   = { weak: "w-1/3",         good: "w-2/3",           strong: "w-full"          }[strength];
  const label      = { weak: "Weak",          good: "Good",            strong: "Strong"          }[strength];
  const labelColor = { weak: "text-red-500",  good: "text-yellow-600", strong: "text-green-600"  }[strength];
  return (
    <div className="mt-1.5 grid gap-1.5">
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-brand-purple-deep/10">
        <div className={`h-full rounded-full transition-all duration-300 ${barColor} ${barWidth}`} />
      </div>
      <span className={`text-xs font-bold ${labelColor}`}>{label}</span>
      <div className="flex gap-4">
        {[
          { met: len >= 8,   label: "8+ chars"      },
          { met: hasUpper,   label: "Uppercase"      },
          { met: hasSpecial, label: "Special (!@#…)" },
        ].map(({ met, label: l }) => (
          <span key={l} className={`flex items-center gap-1 text-[10px] font-semibold ${met ? "text-green-600" : "text-brand-navy/35"}`}>
            {met ? "✓" : "○"} {l}
          </span>
        ))}
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

const inputCls = "w-full rounded-full border border-brand-teal/20 bg-[#fffaf4] px-5 py-3 text-sm text-brand-navy outline-none transition placeholder:text-brand-navy/40 focus:border-brand-purple-bright focus:ring-2 focus:ring-brand-purple-bright/20";
const STEPS    = ["Account", "Your Info", "Children", "Confirm"] as const;

export default function SignupPage() {
  const router = useRouter();

  const [step, setStep]     = useState<Step>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState("");

  // Step 1
  const [email, setEmail]           = useState("");
  const [password, setPassword]     = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [showPwd, setShowPwd]       = useState(false);
  const [showConf, setShowConf]     = useState(false);

  // Step 2
  const [parentName, setParentName] = useState("");
  const [phone, setPhone]           = useState("");

  // Step 3
  const [children, setChildren] = useState<Child[]>([{ name: "", age: "" }]);

  // Step 4
  const [newsletter, setNewsletter] = useState(true);
  const [otp, setOtp]               = useState("");
  const [hasSession, setHasSession] = useState(false);
  const [resending, setResending]   = useState(false);
  const [resendSent, setResendSent] = useState(false);

  async function handleGoogleSignUp() {
    setLoading(true);
    setError("");
    const supabase = createBrowserSupabaseClient();
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/api/auth/callback` },
    });
    if (oauthError) { setError(oauthError.message); setLoading(false); }
  }

  async function handleCredentials(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirmPwd) { setError("Passwords don't match."); return; }
    if (!/[A-Z]/.test(password) || !/[^a-zA-Z0-9]/.test(password) || password.length < 8) {
      setError("Password needs 8+ characters, one uppercase letter, and one special character.");
      return;
    }
    const normalizedEmail = email.trim().toLowerCase();
    // validateEmail runs validator.isEmail (format) then suggestEmailCorrection (typo)
    const emailFmtErr = validateEmail(normalizedEmail);
    if (emailFmtErr) { setError(emailFmtErr); return; }
    if (!isPersonalEmail(normalizedEmail)) {
      setError("Please sign up with a personal email address (Gmail, Yahoo, iCloud, Outlook, etc.) — not a work email.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/check-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalizedEmail }),
      });
      if (!res.ok) throw new Error("Could not verify email. Please try again.");
      const { exists } = await res.json();
      if (exists) {
        setError("An account with this email already exists. Sign in instead.");
        return;
      }
      setStep(2);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleStep2Next() {
    setError("");
    if (phone) {
      const phoneErr = validatePhone(phone);
      if (phoneErr) { setError(phoneErr); return; }
    }
    setStep(3);
  }

  async function handleProceedToConfirm() {
    // Clear any stale error first so the user never sees a stale message while loading
    setError("");
    // Validate child ages before touching Supabase auth
    const filledChildren = children.filter((c) => c.name.trim());
    for (const c of filledChildren) {
      const ageErr = validateChildAge(c.age);
      if (ageErr) { setError(ageErr); return; }
    }

    setLoading(true);
    try {
      const supabase = createBrowserSupabaseClient();
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: { emailRedirectTo: `${window.location.origin}/api/auth/callback` },
      });
      if (signUpError) {
        setError(signUpError.message);
        return;
      }
      setHasSession(!!data.session);
      setStep(4);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    setResending(true);
    setResendSent(false);
    setError("");
    try {
      const supabase = createBrowserSupabaseClient();
      const { error: resendError } = await supabase.auth.resend({
        type: "signup",
        email: email.trim().toLowerCase(),
        options: { emailRedirectTo: `${window.location.origin}/api/auth/callback` },
      });
      if (resendError) { setError(resendError.message); } else { setResendSent(true); }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setResending(false);
    }
  }

  async function handleConfirm(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    try {
      if (!hasSession) {
        if (!otp.trim()) { setError("Enter the confirmation code from your email."); return; }
        const supabase = createBrowserSupabaseClient();
        const { error: verifyError } = await supabase.auth.verifyOtp({
          email: email.trim().toLowerCase(),
          token: otp.trim(),
          type: "signup",
        });
        if (verifyError) {
          setError("Invalid or expired code. Check your email and try again.");
          return;
        }
      }

      const res = await fetch("/api/client/onboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          parent_name:         parentName.trim() || null,
          phone:               phone || null,
          children:            children.filter((c) => c.name.trim()),
          newsletter_opted_in: newsletter,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { error?: string }).error ?? "Could not save your profile. Please try again.");
      }
      router.push("/account");
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") {
        setError("Request timed out. Please try again.");
      } else {
        setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      }
    } finally {
      clearTimeout(timeout);
      setLoading(false);
    }
  }

  function addChild() { setChildren((p) => [...p, { name: "", age: "" }]); }
  function removeChild(i: number) { setChildren((p) => p.filter((_, idx) => idx !== i)); }
  function updateChild(i: number, f: keyof Child, v: string) {
    setChildren((p) => p.map((c, idx) => idx === i ? { ...c, [f]: v } : c));
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#fffaf4] px-4 py-12">
      <div className="mb-6 w-full max-w-md">
        <Link href="/login"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-navy/60 transition hover:text-brand-purple-bright">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
            <path d="M12.5 15L7.5 10l5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to sign in
        </Link>
      </div>

      {/* Progress */}
      <div className="mb-6 flex w-full max-w-md items-center gap-2">
        {STEPS.map((label, i) => {
          const s = (i + 1) as Step;
          return (
            <div key={label} className="flex flex-1 flex-col items-center gap-1.5">
              <div className={`h-1.5 w-full rounded-full transition-colors ${s <= step ? "bg-brand-purple-bright" : "bg-brand-purple-deep/10"}`} />
              <span className={`text-[10px] font-bold uppercase tracking-wider ${s <= step ? "text-brand-purple-bright" : "text-brand-navy/30"}`}>
                {label}
              </span>
            </div>
          );
        })}
      </div>

      <div className="w-full max-w-md rounded-[2rem] bg-white p-8 shadow-card ring-1 ring-brand-purple-deep/10 lg:p-10">

        {/* ── Step 1: Credentials ── */}
        {step === 1 && (
          <>
            <div className="mb-6 text-center">
              <h1 className="text-2xl font-extrabold text-brand-navy">Create your account</h1>
              <p className="mt-1.5 text-sm text-brand-navy/55">Join Ava&apos;s Hub to manage your family&apos;s profile.</p>
            </div>

            <button type="button" onClick={handleGoogleSignUp} disabled={loading}
              className="flex w-full items-center justify-center gap-3 rounded-full border border-brand-purple-deep/15 bg-white px-5 py-3 text-sm font-semibold text-brand-navy shadow-sm transition hover:bg-brand-lavender disabled:opacity-60">
              <GoogleIcon /> Continue with Google
            </button>

            <div className="my-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-brand-purple-deep/10" />
              <span className="text-xs font-semibold text-brand-navy/40">or sign up with email</span>
              <div className="h-px flex-1 bg-brand-purple-deep/10" />
            </div>

            <form onSubmit={handleCredentials} className="grid gap-4">
              <div className="grid gap-1.5">
                <label htmlFor="su-email" className="text-sm font-semibold text-brand-navy">Email address</label>
                <input id="su-email" type="email" required autoComplete="email"
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@gmail.com" className={inputCls} />
                <p className="text-xs text-brand-navy/45">Use a personal email (Gmail, Yahoo, iCloud, etc.)</p>
              </div>

              <div className="grid gap-1.5">
                <label htmlFor="su-pwd" className="text-sm font-semibold text-brand-navy">Set new password</label>
                <div className="relative">
                  <input id="su-pwd" type={showPwd ? "text" : "password"} required autoComplete="new-password"
                    value={password} onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••" className={inputCls + " pr-11"} />
                  <button type="button" onClick={() => setShowPwd(!showPwd)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-navy/40 transition hover:text-brand-navy">
                    <EyeIcon open={showPwd} />
                  </button>
                </div>
                <PasswordStrength pwd={password} />
              </div>

              <div className="grid gap-1.5">
                <label htmlFor="su-conf" className="text-sm font-semibold text-brand-navy">Confirm password</label>
                <div className="relative">
                  <input id="su-conf" type={showConf ? "text" : "password"} required autoComplete="new-password"
                    value={confirmPwd} onChange={(e) => setConfirmPwd(e.target.value)}
                    placeholder="••••••••" className={inputCls + " pr-11"} />
                  <button type="button" onClick={() => setShowConf(!showConf)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-navy/40 transition hover:text-brand-navy">
                    <EyeIcon open={showConf} />
                  </button>
                </div>
                {confirmPwd && password !== confirmPwd && (
                  <p className="text-xs font-semibold text-red-500">Passwords don&apos;t match</p>
                )}
              </div>

              {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">{error}</p>}

              <button type="submit" disabled={loading}
                className="mt-1 inline-flex w-full items-center justify-center rounded-full bg-brand-purple-bright px-6 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-brand-purple-deep disabled:cursor-not-allowed disabled:opacity-60">
                {loading ? "Creating account…" : "Create account →"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm font-semibold text-brand-navy/60">
              Already have an account?{" "}
              <Link href="/login" className="text-brand-purple-bright hover:underline">Sign in →</Link>
            </p>
          </>
        )}

        {/* ── Step 2: Your Info ── */}
        {step === 2 && (
          <>
            <h1 className="text-xl font-extrabold text-brand-navy">Your information</h1>
            <p className="mt-1 text-sm text-brand-navy/55">So we know how to reach you.</p>
            <div className="mt-6 grid gap-4">
              <div className="grid gap-1.5">
                <label className="text-sm font-semibold text-brand-navy">Your name</label>
                <input type="text" value={parentName} onChange={(e) => setParentName(e.target.value)}
                  placeholder="Jane Smith" className={inputCls} />
              </div>
              <div className="grid gap-1.5">
                <label className="text-sm font-semibold text-brand-navy">Phone number <span className="font-normal text-brand-navy/45">(optional)</span></label>
                <PhoneInputField value={phone} onChange={setPhone} variant="pill" />
              </div>
            </div>
            {error && <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">{error}</p>}
            <button onClick={handleStep2Next}
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-brand-purple-bright px-6 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-brand-purple-deep">
              Next →
            </button>
          </>
        )}

        {/* ── Step 3: Children ── */}
        {step === 3 && (
          <>
            <h1 className="text-xl font-extrabold text-brand-navy">Your children</h1>
            <p className="mt-1 text-sm text-brand-navy/55">Add each child you&apos;re enrolling. Ages 1–21.</p>
            <div className="mt-6 grid gap-3">
              {children.map((child, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="flex flex-1 gap-2">
                    <input type="text" value={child.name} onChange={(e) => updateChild(i, "name", e.target.value)}
                      placeholder="Child's name"
                      className="flex-1 rounded-full border border-brand-teal/20 bg-[#fffaf4] px-4 py-2.5 text-sm text-brand-navy outline-none transition placeholder:text-brand-navy/40 focus:border-brand-purple-bright focus:ring-2 focus:ring-brand-purple-bright/20" />
                    <input
                      type="number"
                      min={1}
                      max={21}
                      value={child.age}
                      onChange={(e) => updateChild(i, "age", e.target.value)}
                      placeholder="Age"
                      className="w-20 rounded-full border border-brand-teal/20 bg-[#fffaf4] px-4 py-2.5 text-sm text-brand-navy outline-none transition placeholder:text-brand-navy/40 focus:border-brand-purple-bright focus:ring-2 focus:ring-brand-purple-bright/20" />
                  </div>
                  {children.length > 1 && (
                    <button type="button" onClick={() => removeChild(i)}
                      className="shrink-0 text-brand-navy/30 transition hover:text-red-500">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
              <button type="button" onClick={addChild}
                className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-brand-purple-bright hover:underline">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
                Add another child
              </button>
            </div>
            {error && <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">{error}</p>}
            <div className="mt-6 flex gap-3">
              <button onClick={() => { setError(""); setStep(2); }}
                className="flex-1 rounded-full border border-brand-purple-deep/15 px-6 py-3 text-sm font-semibold text-brand-navy/70 transition hover:bg-brand-lavender">
                ← Back
              </button>
              <button onClick={handleProceedToConfirm} disabled={loading}
                className="flex-1 rounded-full bg-brand-purple-bright px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-brand-purple-deep disabled:cursor-not-allowed disabled:opacity-60">
                {loading ? "Sending…" : "Next →"}
              </button>
            </div>
          </>
        )}

        {/* ── Step 4: Confirm ── */}
        {step === 4 && (
          <>
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-brand-purple-bright/10">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-brand-purple-bright" />
              </svg>
            </div>
            <h1 className="text-xl font-extrabold text-brand-navy">Almost done!</h1>

            <label className="mt-4 flex cursor-pointer items-start gap-3">
              <input type="checkbox" checked={newsletter} onChange={(e) => setNewsletter(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-brand-teal/30 text-brand-purple-bright" />
              <span className="text-sm leading-relaxed text-brand-navy/80">
                Send me helpful updates, tips, and news from Ava&apos;s Hub.{" "}
                <span className="text-brand-navy/45">(You can unsubscribe anytime.)</span>
              </span>
            </label>

            <form onSubmit={handleConfirm} className="mt-5 grid gap-3">
              {!hasSession && (
                <div className="grid gap-2">
                  <p className="text-sm leading-relaxed text-brand-navy/55">
                    We sent a confirmation link and code to{" "}
                    <strong className="text-brand-navy">{email}</strong>. Enter the code below or click the link in your email.
                  </p>
                  <label className="text-sm font-semibold text-brand-navy">Confirmation code</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={8}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    placeholder="- - - - - -"
                    className="w-full rounded-full border border-brand-teal/20 bg-[#fffaf4] px-5 py-3 text-center text-xl font-bold tracking-[0.35em] text-brand-navy shadow-sm outline-none transition placeholder:text-brand-navy/20 focus:border-brand-purple-bright focus:ring-2 focus:ring-brand-purple-bright/20"
                  />
                  <p className="text-center text-xs text-brand-navy/40">
                    Didn&apos;t get it?{" "}
                    <button type="button" onClick={handleResend} disabled={resending}
                      className="font-semibold text-brand-purple-bright hover:underline disabled:opacity-60">
                      {resending ? "Sending…" : resendSent ? "Sent! Check your inbox." : "Resend code"}
                    </button>
                  </p>
                </div>
              )}

              {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">{error}</p>}

              <div className="flex gap-3 pt-1">
                <button type="button" onClick={() => { setError(""); setStep(3); }}
                  className="flex-1 rounded-full border border-brand-purple-deep/15 py-3 text-sm font-semibold text-brand-navy/70 transition hover:bg-brand-lavender">
                  ← Back
                </button>
                <button type="submit" disabled={loading || (!hasSession && !otp.trim())}
                  className="flex-1 rounded-full bg-brand-purple-bright py-3 text-sm font-bold text-white shadow-sm transition hover:bg-brand-purple-deep disabled:cursor-not-allowed disabled:opacity-60">
                  {loading ? "Confirming…" : "Finish →"}
                </button>
              </div>
            </form>
          </>
        )}

      </div>
    </div>
  );
}
