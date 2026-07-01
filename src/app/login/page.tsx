"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createBrowserSupabaseClient } from "@/lib/supabase-browser";

type Step = "email" | "sent" | "forgot" | "reset-sent";

function BackArrow() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M12.5 15L7.5 10l5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
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

const inputCls = "w-full rounded-full border border-brand-teal/20 bg-[#fffaf4] px-5 py-3 text-sm text-brand-navy shadow-sm outline-none transition placeholder:text-brand-navy/40 focus:border-brand-purple-bright focus:ring-2 focus:ring-brand-purple-bright/20";

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep]         = useState<Step>("email");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd]   = useState(false);
  const [signInToken, setSignInToken] = useState("");
  const [resetToken, setResetToken]   = useState("");
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState("");

  async function handleGoogleSignIn() {
    setLoading(true);
    setError("");
    const supabase = createBrowserSupabaseClient();
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/api/auth/callback` },
    });
    if (oauthError) { setError(oauthError.message); setLoading(false); }
  }

  async function handlePasswordSignIn(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !password) return;
    setLoading(true);
    setError("");
    try {
      const supabase = createBrowserSupabaseClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });
      if (signInError) {
        setError("Incorrect email or password.");
        return;
      }
      const res = await fetch("/api/client/profile");
      router.push(res.status === 404 ? "/account/setup" : "/account");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSendLink() {
    if (!email.trim()) { setError("Enter your email address first."); return; }
    setLoading(true);
    setError("");
    const supabase = createBrowserSupabaseClient();
    const { error: linkError } = await supabase.auth.signInWithOtp({
      email: email.trim().toLowerCase(),
      options: {
        shouldCreateUser: true,
        emailRedirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });
    setLoading(false);
    if (linkError) { setError(linkError.message); } else { setStep("sent"); }
  }

  async function handleVerifySignInToken(e: React.FormEvent) {
    e.preventDefault();
    if (!signInToken.trim()) return;
    setLoading(true);
    setError("");
    try {
      const supabase = createBrowserSupabaseClient();
      const { error: verifyError } = await supabase.auth.verifyOtp({
        email: email.trim().toLowerCase(),
        token: signInToken.trim(),
        type: "email",
      });
      if (verifyError) {
        setError("Invalid or expired code.");
        return;
      }
      const res = await fetch("/api/client/profile");
      router.push(res.status === 404 ? "/account/setup" : "/account");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyResetToken(e: React.FormEvent) {
    e.preventDefault();
    if (!resetToken.trim()) return;
    setLoading(true);
    setError("");
    const supabase = createBrowserSupabaseClient();
    const { error: verifyError } = await supabase.auth.verifyOtp({
      email: email.trim().toLowerCase(),
      token: resetToken.trim(),
      type: "recovery",
    });
    if (verifyError) {
      setError("Invalid or expired code.");
      setLoading(false);
    } else {
      router.push("/account/reset-password");
    }
  }

  async function handleForgotPassword(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setError("");
    try {
      const check = await fetch("/api/auth/check-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });
      if (!check.ok) throw new Error("Could not verify email. Please try again.");
      const { exists } = await check.json();
      if (!exists) {
        setError("No account found with this email address. Sign in with Google or use a sign-in link to create one.");
        return;
      }
      const supabase = createBrowserSupabaseClient();
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        email.trim().toLowerCase(),
        { redirectTo: `${window.location.origin}/api/auth/callback?next=/account/reset-password` }
      );
      if (resetError) { setError(resetError.message); } else { setStep("reset-sent"); }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#fffaf4] px-4 py-12">
      <div className="mb-8 w-full max-w-md">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-navy/60 transition hover:text-brand-purple-bright"
        >
          <BackArrow />
          Back to website
        </Link>
      </div>

      <div className="w-full max-w-md rounded-[2rem] bg-white p-8 shadow-card ring-1 ring-brand-purple-deep/10 lg:p-10">

        {/* ── Email + password step ── */}
        {step === "email" && (
          <>
            <div className="text-center">
              <h1 className="text-2xl font-extrabold text-brand-navy lg:text-3xl">
                Welcome to Ava&apos;s Hub
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-brand-navy/55">
                Sign in or create an account to manage your family&apos;s profile.
              </p>
            </div>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="mt-7 flex w-full items-center justify-center gap-3 rounded-full border border-brand-purple-deep/15 bg-white px-5 py-3 text-sm font-semibold text-brand-navy shadow-sm transition hover:bg-brand-lavender disabled:opacity-60"
            >
              <GoogleIcon />
              Continue with Google
            </button>

            <div className="my-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-brand-purple-deep/10" />
              <span className="text-xs font-semibold text-brand-navy/40">or sign in with email</span>
              <div className="h-px flex-1 bg-brand-purple-deep/10" />
            </div>

            <form onSubmit={handlePasswordSignIn} className="grid gap-4">
              <div className="grid gap-1.5">
                <label htmlFor="login-email" className="text-sm font-semibold text-brand-navy">
                  Email address
                </label>
                <input
                  id="login-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={inputCls}
                />
              </div>

              <div className="grid gap-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="login-password" className="text-sm font-semibold text-brand-navy">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => { setStep("forgot"); setError(""); }}
                    className="text-xs font-semibold text-brand-purple-bright hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    id="login-password"
                    type={showPwd ? "text" : "password"}
                    required
                    autoComplete="current-password"
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
              </div>

              {error && (
                <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="mt-1 inline-flex w-full items-center justify-center rounded-full bg-brand-purple-bright px-6 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-brand-purple-deep disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Signing in…" : "Sign in"}
              </button>
            </form>

            <div className="mt-5 text-center">
              <button
                type="button"
                onClick={handleSendLink}
                disabled={loading}
                className="text-xs font-semibold text-brand-navy/50 transition hover:text-brand-purple-bright disabled:opacity-60"
              >
                Use a sign-in link instead →
              </button>
            </div>

            <p className="mt-5 text-center text-sm font-semibold text-brand-navy/60">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-brand-purple-bright hover:underline">
                Sign up →
              </Link>
            </p>

            <p className="mt-3 text-center text-xs text-brand-navy/40">
              Are you an administrator?{" "}
              <Link href="/admin/login" className="font-semibold text-brand-purple-bright hover:underline">
                Admin login →
              </Link>
            </p>
          </>
        )}

        {/* ── Magic link / OTP sent step ── */}
        {step === "sent" && (
          <>
            <div className="text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-brand-purple-bright/10">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-brand-purple-bright" />
                </svg>
              </div>
              <h1 className="text-2xl font-extrabold text-brand-navy">Check your email</h1>
              <p className="mt-2 text-sm leading-relaxed text-brand-navy/55">
                We sent a sign-in link and code to{" "}
                <strong className="text-brand-navy">{email}</strong>. Click the link or enter the code below.
              </p>
            </div>

            {/* Divider */}
            <div className="my-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-brand-purple-deep/10" />
              <span className="text-xs font-semibold text-brand-navy/40">enter code manually</span>
              <div className="h-px flex-1 bg-brand-purple-deep/10" />
            </div>

            <form onSubmit={handleVerifySignInToken} className="grid gap-3">
              <input
                type="text"
                inputMode="numeric"
                maxLength={8}
                value={signInToken}
                onChange={(e) => setSignInToken(e.target.value.replace(/\D/g, ""))}
                placeholder="- - - - - -"
                className="w-full rounded-full border border-brand-teal/20 bg-[#fffaf4] px-5 py-3 text-center text-xl font-bold tracking-[0.35em] text-brand-navy shadow-sm outline-none transition placeholder:text-brand-navy/20 focus:border-brand-purple-bright focus:ring-2 focus:ring-brand-purple-bright/20"
              />
              {error && (
                <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">{error}</p>
              )}
              <button
                type="submit"
                disabled={loading || !signInToken.trim()}
                className="inline-flex w-full items-center justify-center rounded-full bg-brand-purple-bright px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-brand-purple-deep disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Verifying…" : "Continue with code"}
              </button>
            </form>

            <p className="mt-5 text-center text-xs text-brand-navy/40">
              Didn&apos;t get it? Check your spam or{" "}
              <button
                type="button"
                onClick={() => { setStep("email"); setSignInToken(""); setError(""); }}
                className="font-semibold text-brand-purple-bright hover:underline"
              >
                try again
              </button>
              .
            </p>
          </>
        )}

        {/* ── Forgot password step ── */}
        {step === "forgot" && (
          <>
            <button
              type="button"
              onClick={() => { setStep("email"); setError(""); }}
              className="mb-6 inline-flex items-center gap-1 text-sm font-semibold text-brand-navy/60 transition hover:text-brand-purple-bright"
            >
              <BackArrow /> Back to sign in
            </button>
            <h1 className="text-2xl font-extrabold text-brand-navy">Reset your password</h1>
            <p className="mt-2 text-sm leading-relaxed text-brand-navy/55">
              Enter your email and we&apos;ll send you a link to set a new password.
            </p>
            <form onSubmit={handleForgotPassword} className="mt-7 grid gap-4">
              <div className="grid gap-1.5">
                <label htmlFor="forgot-email" className="text-sm font-semibold text-brand-navy">
                  Email address
                </label>
                <input
                  id="forgot-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={inputCls}
                />
              </div>
              {error && (
                <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center rounded-full bg-brand-purple-bright px-6 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-brand-purple-deep disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Sending…" : "Send reset link"}
              </button>
            </form>
          </>
        )}

        {/* ── Reset link sent step ── */}
        {step === "reset-sent" && (
          <>
            <div className="text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-brand-purple-bright/10">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-brand-purple-bright" />
                </svg>
              </div>
              <h1 className="text-2xl font-extrabold text-brand-navy">Check your email</h1>
              <p className="mt-2 text-sm leading-relaxed text-brand-navy/55">
                We sent a reset link and code to{" "}
                <strong className="text-brand-navy">{email}</strong>. Click the link or enter the code below.
              </p>
            </div>

            {/* Divider */}
            <div className="my-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-brand-purple-deep/10" />
              <span className="text-xs font-semibold text-brand-navy/40">enter code manually</span>
              <div className="h-px flex-1 bg-brand-purple-deep/10" />
            </div>

            <form onSubmit={handleVerifyResetToken} className="grid gap-3">
              <input
                type="text"
                inputMode="numeric"
                maxLength={8}
                value={resetToken}
                onChange={(e) => setResetToken(e.target.value.replace(/\D/g, ""))}
                placeholder="- - - - - -"
                className="w-full rounded-full border border-brand-teal/20 bg-[#fffaf4] px-5 py-3 text-center text-xl font-bold tracking-[0.35em] text-brand-navy shadow-sm outline-none transition placeholder:text-brand-navy/20 focus:border-brand-purple-bright focus:ring-2 focus:ring-brand-purple-bright/20"
              />
              {error && (
                <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">{error}</p>
              )}
              <button
                type="submit"
                disabled={loading || !resetToken.trim()}
                className="inline-flex w-full items-center justify-center rounded-full bg-brand-purple-bright px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-brand-purple-deep disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Verifying…" : "Continue with code"}
              </button>
            </form>

            <p className="mt-5 text-center text-xs text-brand-navy/40">
              Didn&apos;t get it?{" "}
              <button
                type="button"
                onClick={() => { setStep("forgot"); setResetToken(""); setError(""); }}
                className="font-semibold text-brand-purple-bright hover:underline"
              >
                Try again
              </button>
              {" "}or{" "}
              <button
                type="button"
                onClick={() => { setStep("email"); setResetToken(""); setError(""); }}
                className="font-semibold text-brand-purple-bright hover:underline"
              >
                back to sign in
              </button>
              .
            </p>
          </>
        )}

      </div>
    </div>
  );
}
