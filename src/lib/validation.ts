import { isValidPhoneNumber } from "libphonenumber-js/min";
import isEmailFn from "validator/lib/isEmail";

// Maps well-known provider names to their canonical domains.
// When a user types "gmail.co" or "yahoo.net" this catches the likely typo.
const PROVIDER_CANONICAL: Record<string, string[]> = {
  gmail:       ["gmail.com"],
  googlemail:  ["googlemail.com"],
  yahoo:       ["yahoo.com", "yahoo.co.uk", "yahoo.fr", "yahoo.ca", "yahoo.com.au", "yahoo.co.in"],
  hotmail:     ["hotmail.com", "hotmail.co.uk", "hotmail.fr"],
  outlook:     ["outlook.com", "outlook.co.uk", "outlook.fr"],
  icloud:      ["icloud.com"],
  me:          ["me.com"],
  mac:         ["mac.com"],
  protonmail:  ["protonmail.com"],
  proton:      ["proton.me"],
  aol:         ["aol.com"],
  live:        ["live.com", "live.co.uk", "live.fr", "live.ca"],
};

/** Returns "Did you mean you@gmail.com?" when the domain looks like a provider typo, else null. */
export function suggestEmailCorrection(email: string): string | null {
  const at = email.lastIndexOf("@");
  if (at === -1) return null;
  const local  = email.slice(0, at);
  const domain = email.slice(at + 1).toLowerCase();
  const dot    = domain.indexOf(".");
  if (dot === -1) return null;
  const provider = domain.slice(0, dot);
  const validDomains = PROVIDER_CANONICAL[provider];
  if (!validDomains) return null;
  if (validDomains.includes(domain)) return null; // already correct
  return `Did you mean ${local}@${validDomains[0]}?`;
}

// Common personal / consumer email domains — everything else is treated as a business address.
const PERSONAL_EMAIL_DOMAINS = new Set([
  "gmail.com", "googlemail.com",
  "yahoo.com", "yahoo.co.uk", "yahoo.fr", "yahoo.ca", "yahoo.com.au",
  "yahoo.co.in", "yahoo.de", "yahoo.es", "yahoo.it", "yahoo.co.jp", "ymail.com",
  "hotmail.com", "hotmail.co.uk", "hotmail.fr", "hotmail.de", "hotmail.es",
  "outlook.com", "outlook.co.uk", "outlook.fr",
  "live.com", "live.co.uk", "live.fr", "live.ca",
  "icloud.com", "me.com", "mac.com",
  "aol.com",
  "protonmail.com", "proton.me",
  "msn.com",
  "comcast.net", "verizon.net", "att.net", "sbcglobal.net", "cox.net",
  "charter.net", "earthlink.net", "optonline.net",
  "mail.com",
  "zoho.com",
  "yandex.com", "yandex.ru", "mail.ru",
  "qq.com", "163.com", "126.com", "sina.com", "sohu.com",
  "web.de", "gmx.com", "gmx.de", "gmx.net", "freenet.de",
  "libero.it", "virgilio.it", "alice.it",
  "orange.fr", "sfr.fr", "laposte.net", "free.fr", "wanadoo.fr",
  "shaw.ca", "rogers.com", "bell.net", "telus.net", "videotron.ca",
  "bigpond.com", "optusnet.com.au",
  "btinternet.com", "sky.com", "talktalk.net", "ntlworld.com",
]);

/**
 * Validates email format using the `validator` library (same engine used by
 * Express-validator, NestJS, and most Node backends).
 * Returns an error string, or null when the email looks correct.
 */
export function validateEmail(email: string): string | null {
  const trimmed = email.trim().toLowerCase();
  if (!trimmed) return "Email address is required.";
  if (!isEmailFn(trimmed)) {
    return "Please enter a valid email address (e.g. name@gmail.com).";
  }
  const correction = suggestEmailCorrection(trimmed);
  if (correction) return correction;
  return null;
}

export function isPersonalEmail(email: string): boolean {
  const domain = email.trim().toLowerCase().split("@")[1];
  if (!domain) return false;
  return PERSONAL_EMAIL_DOMAINS.has(domain);
}

// Returns an error message or null. Phone value is expected to be E.164 from PhoneInputField.
export function validatePhone(phone: string): string | null {
  if (!phone) return null;
  // isValidPhoneNumber is country-aware and catches numbers that are the wrong
  // length for their country code (e.g. too-long PK numbers).
  if (!isValidPhoneNumber(phone)) {
    return "Please enter a valid phone number.";
  }
  return null;
}

// Programs serve children and young adults ages 1–21.
export function validateChildAge(age: string): string | null {
  const trimmed = age.trim();
  if (!trimmed) return null;
  const num = Number(trimmed);
  if (!Number.isFinite(num) || !Number.isInteger(num) || num < 0) {
    return "Please enter a whole number for the child's age.";
  }
  if (num < 1) return "Children must be at least 1 year old to enroll.";
  if (num > 21) return "Our programs serve children and young adults up to age 21.";
  return null;
}
