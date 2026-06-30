"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "@/lib/supabase-browser";

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

type Step = "email" | "otp";

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep]       = useState<Step>("email");
  const [email, setEmail]     = useState("");
  const [otp, setOtp]         = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  const supabase = createBrowserSupabaseClient();

  async function handleGoogleSignIn() {
    setLoading(true);
    setError("");
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });
    if (oauthError) {
      setError(oauthError.message);
      setLoading(false);
    }
    // On success, browser navigates to Google — no cleanup needed
  }

  async function handleSendOtp(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setError("");

    const { error: otpError } = await supabase.auth.signInWithOtp({
      email: email.trim().toLowerCase(),
      options: { shouldCreateUser: true },
    });

    setLoading(false);
    if (otpError) {
      setError(otpError.message);
    } else {
      setStep("otp");
    }
  }

  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault();
    if (!otp.trim()) return;
    setLoading(true);
    setError("");

    const { data, error: verifyError } = await supabase.auth.verifyOtp({
      email: email.trim().toLowerCase(),
      token: otp.trim(),
      type: "email",
    });

    if (verifyError || !data.user) {
      setLoading(false);
      setError(verifyError?.message ?? "Invalid code. Please try again.");
      return;
    }

    // Check if user has a linked client profile
    const res = await fetch("/api/client/me");
    const me = await res.json();
    router.push(me.hasProfile ? "/account" : "/account/setup");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#fffaf4] px-4 py-12">
      {/* Back link */}
      <div className="mb-8 w-full max-w-md">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-navy/60 transition hover:text-brand-purple-bright"
        >
          <BackArrow />
          Back to website
        </Link>
      </div>

      {/* Card */}
      <div className="w-full max-w-md rounded-[2rem] bg-white p-8 shadow-card ring-1 ring-brand-purple-deep/10 lg:p-10">
        {step === "email" ? (
          <>
            {/* Heading */}
            <div className="text-center">
              <h1 className="text-2xl font-extrabold text-brand-navy lg:text-3xl">
                Welcome to Ava&apos;s Hub
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-brand-navy/55">
                Sign in or create an account to manage your family&apos;s profile.
              </p>
            </div>

            {/* Google */}
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
              <span className="text-xs font-semibold text-brand-navy/40">or continue with email</span>
              <div className="h-px flex-1 bg-brand-purple-deep/10" />
            </div>

            {/* Email form */}
            <form onSubmit={handleSendOtp} className="grid gap-4">
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
                  className="w-full rounded-full border border-brand-teal/20 bg-[#fffaf4] px-5 py-3 text-sm text-brand-navy shadow-sm outline-none transition placeholder:text-brand-navy/40 focus:border-brand-purple-bright focus:ring-2 focus:ring-brand-purple-bright/20"
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
                className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-brand-purple-bright px-6 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-brand-purple-deep disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Sending…" : "Send code"}
              </button>
            </form>

            {/* Admin link */}
            <p className="mt-6 text-center text-xs text-brand-navy/40">
              Are you an administrator?{" "}
              <Link href="/admin/login" className="font-semibold text-brand-purple-bright hover:underline">
                Admin login →
              </Link>
            </p>
          </>
        ) : (
          <>
            {/* OTP step */}
            <div className="text-center">
              <h1 className="text-2xl font-extrabold text-brand-navy">Check your email</h1>
              <p className="mt-2 text-sm leading-relaxed text-brand-navy/55">
                We sent a 6-digit code to <strong>{email}</strong>
              </p>
            </div>

            <form onSubmit={handleVerifyOtp} className="mt-7 grid gap-4">
              <div className="grid gap-1.5">
                <label htmlFor="otp-code" className="text-sm font-semibold text-brand-navy">
                  Verification code
                </label>
                <input
                  id="otp-code"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  required
                  autoComplete="one-time-code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  placeholder="000000"
                  className="w-full rounded-full border border-brand-teal/20 bg-[#fffaf4] px-5 py-3 text-center text-lg font-bold tracking-[0.4em] text-brand-navy shadow-sm outline-none transition placeholder:text-brand-navy/20 focus:border-brand-purple-bright focus:ring-2 focus:ring-brand-purple-bright/20"
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
                className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-brand-purple-bright px-6 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-brand-purple-deep disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Verifying…" : "Continue"}
              </button>
            </form>

            <button
              type="button"
              onClick={() => { setStep("email"); setOtp(""); setError(""); }}
              className="mt-4 w-full text-center text-xs font-semibold text-brand-navy/50 hover:text-brand-purple-bright"
            >
              ← Use a different email
            </button>
          </>
        )}
      </div>
    </div>
  );
}
