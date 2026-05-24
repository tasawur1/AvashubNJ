"use client";

import { CTAButton } from "@/components/CTAButton";

export function ContactForm() {
  return (
    <form
      className="space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
      }}
      noValidate
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-first-name"
            className="mb-1.5 block text-sm font-semibold text-brand-navy"
          >
            First name
          </label>
          <input
            id="contact-first-name"
            name="firstName"
            type="text"
            autoComplete="given-name"
            required
            className="w-full rounded-xl border border-brand-teal/20 bg-white px-4 py-3 text-sm text-brand-navy shadow-sm outline-none transition placeholder:text-brand-navy/40 focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20"
          />
        </div>
        <div>
          <label
            htmlFor="contact-last-name"
            className="mb-1.5 block text-sm font-semibold text-brand-navy"
          >
            Last name
          </label>
          <input
            id="contact-last-name"
            name="lastName"
            type="text"
            autoComplete="family-name"
            required
            className="w-full rounded-xl border border-brand-teal/20 bg-white px-4 py-3 text-sm text-brand-navy shadow-sm outline-none transition placeholder:text-brand-navy/40 focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="contact-email"
          className="mb-1.5 block text-sm font-semibold text-brand-navy"
        >
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="w-full rounded-xl border border-brand-teal/20 bg-white px-4 py-3 text-sm text-brand-navy shadow-sm outline-none transition placeholder:text-brand-navy/40 focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20"
        />
      </div>

      <div>
        <label
          htmlFor="contact-phone"
          className="mb-1.5 block text-sm font-semibold text-brand-navy"
        >
          Phone
        </label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          className="w-full rounded-xl border border-brand-teal/20 bg-white px-4 py-3 text-sm text-brand-navy shadow-sm outline-none transition placeholder:text-brand-navy/40 focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20"
        />
      </div>

      <div>
        <label
          htmlFor="contact-interest"
          className="mb-1.5 block text-sm font-semibold text-brand-navy"
        >
          I&apos;m interested in
        </label>
        <select
          id="contact-interest"
          name="interest"
          className="w-full rounded-xl border border-brand-teal/20 bg-white px-4 py-3 text-sm text-brand-navy shadow-sm outline-none transition focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20"
          defaultValue=""
        >
          <option value="" disabled>
            Select a program or topic
          </option>
          <option value="programs">Programs overview</option>
          <option value="kids">Kids (Ages 3–7)</option>
          <option value="school-age">School-Age (Ages 8–13)</option>
          <option value="teens">Teens (Ages 14–18)</option>
          <option value="young-adults">Young Adults (19+)</option>
          <option value="insurance">Insurance &amp; enrollment</option>
          <option value="tour">Schedule a tour</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="mb-1.5 block text-sm font-semibold text-brand-navy"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          className="w-full resize-y rounded-xl border border-brand-teal/20 bg-white px-4 py-3 text-sm text-brand-navy shadow-sm outline-none transition placeholder:text-brand-navy/40 focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20"
          placeholder="Tell us about your child and how we can help."
        />
      </div>

      <CTAButton type="submit" className="w-full sm:w-auto">
        Send Message
      </CTAButton>
    </form>
  );
}
