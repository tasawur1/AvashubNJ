"use client";

import { useState, useRef } from "react";
import { CTAButton } from "@/components/CTAButton";
import { Icon } from "@/components/Icon";
import { PhoneInputField } from "@/components/PhoneInputField";
import { FieldErrorIcon } from "@/components/FieldErrorIcon";
import { validateEmail, validatePhone } from "@/lib/validation";

type Status = "idle" | "loading" | "success" | "error";

const MOBILE_INPUT =
  "w-full rounded-[1.1rem] border border-brand-teal/15 bg-white/95 px-5 py-4 text-sm font-medium text-brand-navy shadow-sm outline-none transition placeholder:text-brand-navy/45 focus:border-brand-purple-bright focus:ring-2 focus:ring-brand-purple-bright/20";

const DESKTOP_INPUT =
  "w-full rounded-xl border border-brand-teal/20 bg-white px-4 py-3 text-sm text-brand-navy shadow-sm outline-none transition placeholder:text-brand-navy/45 focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20";

// Red border + right padding so typed text doesn't slide under the ! icon
const WITH_ERROR = " !border-red-400 focus:!border-red-400 focus:!ring-red-400/20 !pr-10";

export function ContactForm({ variant = "desktop" }: { variant?: "mobile" | "desktop" }) {
  const [status, setStatus]         = useState<Status>("idle");
  const [submitError, setSubmitError] = useState("");
  const [email, setEmail]           = useState("");
  const [phone, setPhone]           = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const cls      = variant === "mobile" ? MOBILE_INPUT : DESKTOP_INPUT;
  const isMobile = variant === "mobile";

  // Validate as soon as the user leaves the email field
  function handleEmailBlur() {
    if (!email.trim()) return;
    const err = validateEmail(email);
    setEmailError(err ?? "");
  }

  // Validate as soon as the user leaves the phone field
  function handlePhoneBlur() {
    if (!phone) return;
    const err = validatePhone(phone);
    setPhoneError(err ?? "");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading" || status === "success") return;

    // Run both validations regardless so all errors surface at once.
    // Clear submitError first so a stale network-error banner from a prior attempt
    // never shows alongside the new field-level error icons simultaneously.
    setSubmitError("");
    const emailErr = validateEmail(email);
    const phoneErr = phone ? validatePhone(phone) : null;

    setEmailError(emailErr ?? "");
    setPhoneError(phoneErr ?? "");

    if (emailErr || phoneErr) return;

    const form = e.currentTarget;
    const data = new FormData(form);

    setStatus("loading");
    setSubmitError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.get("firstName") ?? "",
          lastName:  data.get("lastName")  ?? "",
          email:     email.trim(),
          phone,
          interest:  data.get("interest")  ?? "",
          message:   data.get("message")   ?? "",
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error((body as { error?: string }).error ?? `Server error ${res.status}`);
      }

      const result = await res.json();
      if (result.success) {
        setStatus("success");
        setEmail("");
        setPhone("");
        setEmailError("");
        setPhoneError("");
        formRef.current?.reset();
      } else {
        throw new Error(result.error ?? "Something went wrong. Please try again.");
      }
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Could not connect. Please try again.");
      setStatus("error");
    }
  }

  const emailInputCls = cls + (emailError ? WITH_ERROR : "");

  return (
    <form
      ref={formRef}
      className={isMobile ? "space-y-4" : "space-y-5"}
      onSubmit={handleSubmit}
      noValidate
    >
      {/* ── Name fields ───────────────────────────────────────────── */}
      {isMobile ? (
        <div className="grid gap-4">
          <input name="firstName" type="text" autoComplete="given-name" required
            placeholder="First Name *" className={cls} aria-label="First Name" />
          <input name="lastName" type="text" autoComplete="family-name" required
            placeholder="Last Name *" className={cls} aria-label="Last Name" />
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="cf-first" className="sr-only">First Name</label>
            <input id="cf-first" name="firstName" type="text" autoComplete="given-name"
              required placeholder="First Name *" className={cls} />
          </div>
          <div>
            <label htmlFor="cf-last" className="sr-only">Last Name</label>
            <input id="cf-last" name="lastName" type="text" autoComplete="family-name"
              required placeholder="Last Name *" className={cls} />
          </div>
        </div>
      )}

      {/* ── Email + Phone ──────────────────────────────────────────── */}
      {isMobile ? (
        <>
          <div className="relative">
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
              onBlur={handleEmailBlur}
              placeholder="Email Address *"
              aria-label="Email Address"
              className={emailInputCls}
            />
            {emailError && (
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none z-10">
                <FieldErrorIcon message={emailError} />
              </div>
            )}
          </div>
          <PhoneInputField
            value={phone}
            onChange={(val) => { setPhone(val); setPhoneError(""); }}
            onBlur={handlePhoneBlur}
            variant="mobile"
            placeholder="Phone number (optional)"
            error={phoneError || undefined}
          />
        </>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="cf-email" className="sr-only">Email Address</label>
            <div className="relative">
              <input
                id="cf-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
                onBlur={handleEmailBlur}
                placeholder="Email Address *"
                className={emailInputCls}
              />
              {emailError && (
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none z-10">
                  <FieldErrorIcon message={emailError} />
                </div>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="cf-phone" className="sr-only">Phone Number</label>
            <PhoneInputField
              id="cf-phone"
              value={phone}
              onChange={(val) => { setPhone(val); setPhoneError(""); }}
              onBlur={handlePhoneBlur}
              variant="box"
              placeholder="Phone (optional)"
              error={phoneError || undefined}
            />
          </div>
        </div>
      )}

      {/* ── Help topic ─────────────────────────────────────────────── */}
      {isMobile ? (
        <select name="interest" required defaultValue="" className={cls} aria-label="How can we help you?">
          <option value="" disabled>How can we help you? *</option>
          <option value="schedule-tour">Schedule a tour</option>
          <option value="programs">Learn about programs</option>
          <option value="family-support">Family support</option>
          <option value="resources">Resources</option>
          <option value="other">Other</option>
        </select>
      ) : (
        <div>
          <label htmlFor="cf-interest" className="sr-only">How can we help you?</label>
          <select id="cf-interest" name="interest" required defaultValue="" className={cls}>
            <option value="" disabled>How can we help you? *</option>
            <option value="schedule-tour">Schedule a tour</option>
            <option value="programs">Learn about programs</option>
            <option value="family-support">Family support</option>
            <option value="resources">Resources</option>
            <option value="other">Other</option>
          </select>
        </div>
      )}

      {/* ── Message ────────────────────────────────────────────────── */}
      {isMobile ? (
        <textarea name="message" rows={5} required
          placeholder="Message *" className={`${cls} resize-y`} aria-label="Message" />
      ) : (
        <div>
          <label htmlFor="cf-message" className="sr-only">Message</label>
          <textarea id="cf-message" name="message" rows={5} required
            placeholder="Message *" className={`${cls} resize-y`} />
        </div>
      )}

      {/* ── Consent ────────────────────────────────────────────────── */}
      {isMobile ? (
        <label className="flex gap-3 rounded-[1.1rem] bg-brand-teal-light/35 px-4 py-3 text-sm font-semibold leading-relaxed text-brand-navy/80">
          <input type="checkbox" name="consent" required
            className="mt-0.5 h-4 w-4 rounded border-brand-teal/30 text-brand-purple-bright focus:ring-brand-purple-bright" />
          <span>I consent to being contacted by Ava&apos;s Hub.</span>
        </label>
      ) : (
        <label className="flex gap-3 text-sm font-medium text-brand-navy/80">
          <input type="checkbox" name="consent" required
            className="mt-0.5 h-4 w-4 rounded border-brand-teal/30 text-brand-purple-bright focus:ring-brand-teal" />
          <span>I consent to being contacted by Ava&apos;s Hub.</span>
        </label>
      )}

      {/* ── Submit ─────────────────────────────────────────────────── */}
      <CTAButton type="submit" className={isMobile ? "w-full !py-4" : "w-full"}>
        <span className="inline-flex items-center gap-2">
          {status === "loading" ? "Sending…" : "Send Message"}
          {status !== "loading" && <Icon name="paperPlane" size="sm" />}
        </span>
      </CTAButton>

      {/* ── Feedback ───────────────────────────────────────────────── */}
      {status === "success" && (
        <p className="rounded-full bg-brand-teal/10 px-5 py-3 text-center text-sm font-semibold text-brand-teal">
          ✓ Message sent! We&apos;ll be in touch within 1–2 business days.
        </p>
      )}
      {status === "error" && (
        <p className="px-2 text-xs font-semibold text-red-500">{submitError}</p>
      )}
    </form>
  );
}
