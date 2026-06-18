"use client";

import { useState, useRef } from "react";
import { CTAButton } from "@/components/CTAButton";
import { Icon } from "@/components/Icon";

type Status = "idle" | "loading" | "success" | "error";

const MOBILE_INPUT =
  "w-full rounded-[1.1rem] border border-brand-teal/15 bg-white/95 px-5 py-4 text-sm font-medium text-brand-navy shadow-sm outline-none transition placeholder:text-brand-navy/45 focus:border-brand-purple-bright focus:ring-2 focus:ring-brand-purple-bright/20";

const DESKTOP_INPUT =
  "w-full rounded-xl border border-brand-teal/20 bg-white px-4 py-3 text-sm text-brand-navy shadow-sm outline-none transition placeholder:text-brand-navy/45 focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20";

export function ContactForm({ variant = "desktop" }: { variant?: "mobile" | "desktop" }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const cls = variant === "mobile" ? MOBILE_INPUT : DESKTOP_INPUT;
  const isMobile = variant === "mobile";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading" || status === "success") return;

    const form = e.currentTarget;
    const data = new FormData(form);

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.get("firstName") ?? "",
          lastName:  data.get("lastName")  ?? "",
          email:     data.get("email")     ?? "",
          phone:     data.get("phone")     ?? "",
          interest:  data.get("interest")  ?? "",
          message:   data.get("message")   ?? "",
        }),
      });
      const result = await res.json();
      if (result.success) {
        setStatus("success");
        formRef.current?.reset();
      } else {
        setErrorMsg(result.error ?? "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Could not connect. Please try again.");
      setStatus("error");
    }
  }

  return (
    <form
      ref={formRef}
      className={isMobile ? "space-y-4" : "space-y-5"}
      onSubmit={handleSubmit}
      noValidate
    >
      {/* First + Last name */}
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
            <label htmlFor="cf-first-name" className="sr-only">First Name</label>
            <input id="cf-first-name" name="firstName" type="text" autoComplete="given-name"
              required placeholder="First Name *" className={cls} />
          </div>
          <div>
            <label htmlFor="cf-last-name" className="sr-only">Last Name</label>
            <input id="cf-last-name" name="lastName" type="text" autoComplete="family-name"
              required placeholder="Last Name *" className={cls} />
          </div>
        </div>
      )}

      {/* Email + Phone */}
      {isMobile ? (
        <>
          <input name="email" type="email" autoComplete="email" required
            placeholder="Email Address *" className={cls} aria-label="Email Address" />
          <div>
            <input name="phone" type="tel" autoComplete="tel"
              placeholder="+1 555 000 0000" className={cls} aria-label="Phone Number" />
            <p className="mt-1 px-1 text-xs text-brand-navy/50">Include your country code (e.g. +1 for US, +44 for UK)</p>
          </div>
        </>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="cf-email" className="sr-only">Email Address</label>
            <input id="cf-email" name="email" type="email" autoComplete="email"
              required placeholder="Email Address *" className={cls} />
          </div>
          <div>
            <label htmlFor="cf-phone" className="sr-only">Phone Number</label>
            <input id="cf-phone" name="phone" type="tel" autoComplete="tel"
              placeholder="+1 555 000 0000" className={cls} />
            <p className="mt-1 px-1 text-xs text-brand-navy/50">Include your country code (e.g. +1 for US, +44 for UK)</p>
          </div>
        </div>
      )}

      {/* Interest / help topic */}
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

      {/* Message */}
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

      {/* Consent */}
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

      {/* Submit button */}
      <CTAButton type="submit" className={isMobile ? "w-full !py-4" : "w-full"}>
        <span className="inline-flex items-center gap-2">
          {status === "loading" ? "Sending…" : "Send Message"}
          {status !== "loading" && <Icon name="paperPlane" size="sm" />}
        </span>
      </CTAButton>

      {/* Feedback — shown below the button, form stays visible */}
      {status === "success" && (
        <p className="rounded-full bg-brand-teal/10 px-5 py-3 text-center text-sm font-semibold text-brand-teal">
          ✓ Message sent! We&apos;ll be in touch within 1–2 business days.
        </p>
      )}
      {status === "error" && (
        <p className="px-2 text-xs font-semibold text-red-500">{errorMsg}</p>
      )}
    </form>
  );
}
