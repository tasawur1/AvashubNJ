import { Resend } from 'resend';

// Upsert a contact into the Resend audience identified by RESEND_AUDIENCE_ID.
// If the email already exists (e.g. newsletter subscriber with no name), we update
// their first/last name with the richer data from the intake or contact form.
// Best-effort — never throws; caller wraps in try/catch.
export async function upsertResendContact(
  resend: Resend,
  { email, firstName, lastName }: { email: string; firstName: string; lastName?: string }
): Promise<void> {
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (!audienceId) {
    console.warn('[RESEND] RESEND_AUDIENCE_ID not configured — skipping contact sync for:', email);
    return;
  }

  const createResult = await resend.contacts.create({
    audienceId,
    email,
    firstName,
    lastName: lastName || undefined,
    unsubscribed: false,
  });

  if (!createResult.error) return;

  // Contact likely already exists — if we have name data, find and update it.
  if (!firstName && !lastName) return;

  const listResult = await resend.contacts.list({ audienceId });
  const all: Array<{ id: string; email: string }> = (listResult.data as { data: Array<{ id: string; email: string }> } | null)?.data ?? [];
  const match = all.find(c => c.email?.toLowerCase() === email.toLowerCase());

  if (!match?.id) {
    console.error('[RESEND] Contact upsert failed (create errored, not found in list):', email, createResult.error);
    return;
  }

  await resend.contacts.update({
    audienceId,
    id: match.id,
    ...(firstName ? { firstName } : {}),
    ...(lastName ? { lastName } : {}),
  });
}
