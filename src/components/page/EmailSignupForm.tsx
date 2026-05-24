"use client";

import { CTAButton } from "@/components/CTAButton";

type EmailSignupFormProps = {
  placeholder?: string;
};

export function EmailSignupForm({
  placeholder = "Your email address",
}: EmailSignupFormProps) {
  return (
    <form
      className="flex flex-col gap-3 sm:flex-row sm:items-end"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div className="flex-1">
        <label htmlFor="resource-email" className="sr-only">
          Email address
        </label>
        <input
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
        Subscribe
      </CTAButton>
    </form>
  );
}
