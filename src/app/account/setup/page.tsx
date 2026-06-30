"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Child = { name: string; age: string };
type Step  = 1 | 2 | 3;

export default function AccountSetupPage() {
  const router = useRouter();

  const [step, setStep]         = useState<Step>(1);
  const [parentName, setParentName] = useState("");
  const [phone, setPhone]       = useState("");
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

  async function handleSubmit() {
    setSaving(true);
    setError("");
    const res = await fetch("/api/client/onboard", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        parent_name: parentName.trim() || null,
        phone:       phone.trim() || null,
        children:    children.filter((c) => c.name.trim()),
        newsletter_opted_in: newsletter,
      }),
    });
    const data = await res.json();
    if (data.success) {
      router.push("/account");
    } else {
      setError(data.error ?? "Something went wrong.");
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
                className="w-full rounded-full border border-brand-teal/20 bg-[#fffaf4] px-5 py-3 text-sm text-brand-navy outline-none transition placeholder:text-brand-navy/40 focus:border-brand-purple-bright focus:ring-2 focus:ring-brand-purple-bright/20"
              />
            </div>
            <div className="grid gap-1.5">
              <label className="text-sm font-semibold text-brand-navy">Phone number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(555) 000-0000"
                className="w-full rounded-full border border-brand-teal/20 bg-[#fffaf4] px-5 py-3 text-sm text-brand-navy outline-none transition placeholder:text-brand-navy/40 focus:border-brand-purple-bright focus:ring-2 focus:ring-brand-purple-bright/20"
              />
            </div>
          </div>

          <button
            onClick={() => setStep(2)}
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
              className="flex-1 rounded-full bg-brand-purple-bright px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-brand-purple-deep disabled:opacity-60"
            >
              {saving ? "Saving…" : "Complete setup"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
