import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { promises as fs } from 'fs';
import path from 'path';
import { buildEmail, intakeFormButtonsHtml, replyPromptHtml, esc, nl2p } from '@/lib/emailTemplate';
import { upsertResendContact } from '@/lib/resendContact';

const NOTIFY_EMAIL = process.env.NOTIFICATION_EMAIL || 'marilyn@avashubnj.com';

// Same CSV as newsletter subscribers — contact form adds the person's entry
// if their email isn't already on file.
const CSV_PATH =
  process.env.SUBSCRIBER_CSV_PATH ??
  path.join(process.cwd(), 'data', 'newsletter-subscribers.csv');

export async function POST(request: NextRequest) {
  try {
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      return NextResponse.json(
        { success: false, error: 'Email service not configured.' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const firstName: string = (body.firstName ?? '').trim();
    const lastName: string  = (body.lastName  ?? '').trim();
    const email: string     = (body.email     ?? '').trim().toLowerCase();
    const phone: string     = (body.phone     ?? '').trim();
    const interest: string  = (body.interest  ?? '').trim();
    const message: string   = (body.message   ?? '').trim();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    const fullName = [firstName, lastName].filter(Boolean).join(' ');

    // — Append to shared subscriber CSV (best-effort) —
    try {
      await fs.mkdir(path.dirname(CSV_PATH), { recursive: true });
      let existing = '';
      try { existing = await fs.readFile(CSV_PATH, 'utf-8'); } catch { /* new file */ }
      if (!existing.toLowerCase().includes(email)) {
        const header = existing ? '' : 'email,name,source_page,timestamp\n';
        const row = `${cell(email)},${cell(fullName)},contact-form,${new Date().toISOString()}\n`;
        await fs.appendFile(CSV_PATH, header + row, 'utf-8');
      }
    } catch (csvErr) {
      console.warn('Contact CSV write failed (filesystem may be read-only on this host):', csvErr);
    }

    const resend = new Resend(resendApiKey);

    // — Upsert to Resend audience (best-effort) —
    try {
      await upsertResendContact(resend, { email, firstName, lastName });
    } catch (contactErr) {
      console.error('[CONTACT] Resend contact sync failed:', email, contactErr);
    }

    const timestamp = new Date().toLocaleString('en-US', {
      timeZone: 'America/New_York',
      dateStyle: 'full',
      timeStyle: 'short',
    });

    // — EMAIL 1: Full submission to Marilyn —
    const clinicResult = await resend.emails.send({
      from: "Ava's Hub <forms@avashubnj.com>",
      replyTo: email,          // replies go straight back to the person who wrote in
      to: NOTIFY_EMAIL,
      subject: `📬 New Contact Form Message — ${fullName || email} | Ava's Hub`,
      html: buildEmail({
        heading: `📬 New Contact Form — ${esc(fullName || email)}`,
        bodyHtml: `
          <p style="margin:0 0 14px;font-size:13px;color:#888;">Submitted: <strong>${esc(timestamp)}</strong></p>
          <table style="width:100%;border-collapse:collapse;margin:0 0 20px;font-size:14px;">
            ${row('Name',    fullName || '—')}
            ${row('Email',   email)}
            ${row('Phone',   phone   || '—')}
            ${row('Topic',   interest || '—')}
          </table>
          <div style="background:#f8f7fc;border-left:3px solid #6B4DB8;border-radius:0 4px 4px 0;padding:14px 16px;margin:0 0 8px;">
            <p style="margin:0 0 8px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#6B4DB8;">Message</p>
            ${nl2p(message || '(no message)')}
          </div>`,
        ctaHtml: replyPromptHtml(),
      }),
    });

    // — EMAIL 2: Warm confirmation to the person who wrote in —
    let confirmResult = null;
    if (email) {
      confirmResult = await resend.emails.send({
        from: "Ava's Hub <forms@avashubnj.com>",
        replyTo: 'marilyn@avashubnj.com',
        to: email,
        subject: "We got your message! | Ava's Hub",
        html: buildEmail({
          heading: `Hi ${esc(firstName || 'there')} — we got your message! 💚`,
          bodyHtml: `
            <p style="margin:0 0 14px;font-size:15px;line-height:1.75;color:#3a3a3a;">
              Thank you for reaching out to Ava's Hub. Our team has received your message and will personally review it.
            </p>
            <p style="margin:0 0 14px;font-size:15px;line-height:1.75;color:#3a3a3a;">
              We'll be in touch within <strong>1–2 business days</strong>. In the meantime, feel free to reply
              to this email if you have anything to add — it goes straight to Marilyn.
            </p>
            <p style="margin:0;font-size:15px;line-height:1.75;color:#3a3a3a;">
              We look forward to connecting with your family.
            </p>`,
          ctaHtml: `
            <p style="margin:0 0 14px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:#888;">
              While you wait, explore what we offer:
            </p>
            ${intakeFormButtonsHtml()}`,
          footerNote: 'You received this because you submitted the contact form at avashubnj.com.',
        }),
      });
    }

    return NextResponse.json({
      success: !clinicResult.error,
      clinicEmail: clinicResult,
      confirmEmail: confirmResult,
    });

  } catch (error) {
    console.error('Contact route error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}

function cell(value: string): string {
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function row(label: string, value: string): string {
  return `<tr>
    <td style="padding:7px 12px 7px 0;font-size:13px;font-weight:700;color:#555;white-space:nowrap;vertical-align:top;">${esc(label)}</td>
    <td style="padding:7px 0;font-size:13px;color:#141414;vertical-align:top;">${esc(value)}</td>
  </tr>`;
}
