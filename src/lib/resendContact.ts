import { Resend } from 'resend';

// Upsert a contact into the Resend audience identified by RESEND_AUDIENCE_ID.
// If the email already exists (e.g. newsletter subscriber with no name), we update
// their first/last name with the richer data from the intake or contact form.
// Best-effort — never throws; internal try/catch enforces this contract.
export async function upsertResendContact(
  resend: Resend,
  { email, firstName, lastName }: { email: string; firstName: string; lastName?: string }
): Promise<void> {
  try {
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

    if (createResult.error) {
      // Contact already exists — not a duplicate, not an error.
      console.warn('[RESEND] Contact already exists (not duplicated):', email);
    }
  } catch (err) {
    console.error('[RESEND] upsertResendContact failed for:', email, err);
  }
}
