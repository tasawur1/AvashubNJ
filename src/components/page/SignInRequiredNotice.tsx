import Link from "next/link";

/**
 * Shown in place of the AccessGateCard email/OTP form (Option B) — just
 * tells the visitor they need an account and sends them to the real
 * /login or /signup page, carrying `next` so they land back on this same
 * printable/guide page afterward. They click View/Download again from
 * there — sign-in never auto-continues straight to the file.
 */
export function SignInRequiredNotice({
  next,
  title = "Sign in to continue",
  subtitle = "You'll need to sign in or create a free account to view or download this. It only takes a moment.",
}: {
  next: string;
  title?: string;
  subtitle?: string;
}) {
  const loginHref = `/login?next=${encodeURIComponent(next)}`;
  const signupHref = `/signup?next=${encodeURIComponent(next)}`;

  return (
    <div className="w-full max-w-md rounded-[2rem] bg-white p-8 text-center shadow-card ring-1 ring-brand-purple-deep/10">
      <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-brand-purple-bright/10">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.75" className="text-brand-purple-bright" />
          <path d="M8 11V8a4 4 0 018 0v3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" className="text-brand-purple-bright" />
        </svg>
      </div>
      <h2 className="text-xl font-extrabold text-brand-navy">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-brand-navy/55">{subtitle}</p>

      <div className="mt-6 grid gap-3">
        <Link
          href={loginHref}
          className="inline-flex w-full items-center justify-center rounded-full bg-brand-purple-bright px-6 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-brand-purple-deep"
        >
          Sign In
        </Link>
        <Link
          href={signupHref}
          className="inline-flex w-full items-center justify-center rounded-full border border-brand-purple-deep/15 bg-white px-6 py-3.5 text-sm font-semibold text-brand-navy transition hover:bg-brand-lavender"
        >
          Create a free account
        </Link>
      </div>
    </div>
  );
}
