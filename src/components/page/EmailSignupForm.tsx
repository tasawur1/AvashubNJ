"use client";

import { useState, useRef } from "react";
import { CTAButton } from "@/components/CTAButton";

type EmailSignupFormProps = {
  placeholder?: string;
  source?: string;
};

type Status = "idle" | "loading" | "success" | "error";

export function EmailSignupForm({
  placeholder = "Your email address",
  source = "",
}: EmailSignupFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;
    const email = inputRef.current?.value?.trim() ?? "";
    if (!email) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
      } else {
        setErrorMsg(data.error ?? "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Could not connect. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="rounded-full bg-brand-teal/10 px-5 py-3 text-center text-sm font-semibold text-brand-teal">
        ✓ Thanks! Check your inbox for a welcome email.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <form
        className="flex flex-col gap-3 sm:flex-row sm:items-end"
        onSubmit={handleSubmit}
      >
        <div className="flex-1">
          <label htmlFor="resource-email" className="sr-only">
            Email address
          </label>
          <input
            ref={inputRef}
            id="resource-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder={placeholder}
            className="w-full rounded-full border border-brand-teal/20 bg-white px-5 py-3 text-sm text-brand-navy shadow-sm outline-none transition placeholder:text-brand-navy/45 focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20"
          />
        </div>
        <CTAButton type="submit" className="shrink-0 sm:px-8">
          {status === "loading" ? "Sending…" : "Subscribe"}
        </CTAButton>
      </form>
      {status === "error" && (
        <p className="px-2 text-xs font-semibold text-red-500">{errorMsg}</p>
      )}
    </div>
  );
}
