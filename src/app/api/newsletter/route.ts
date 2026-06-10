import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { promises as fs } from 'fs';
import path from 'path';
import { buildEmail, intakeFormButtonsHtml, esc } from '@/lib/emailTemplate';

// TEMPORARY: CSV subscriber store — migrate to Klaviyo, then remove this file.
// Set SUBSCRIBER_CSV_PATH to an absolute path OUTSIDE the app dir on Hostinger
// (e.g. /home/{username}/ava-subscriber-data/newsletter-subscribers.csv)
// so redeployments don't wipe it. The fallback below is fine for local dev only.
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
    const email: string = (body.email ?? '').trim().toLowerCase();
    const name: string = (body.name ?? '').trim();
    const source: string = (body.source ?? '').trim();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    // — CSV append (best-effort; email still sends even if this fails) —
    try {
      await fs.mkdir(path.dirname(CSV_PATH), { recursive: true });
      let existing = '';
      try { existing = await fs.readFile(CSV_PATH, 'utf-8'); } catch { /* new file */ }
      if (!existing.toLowerCase().includes(email)) {
        const header = existing ? '' : 'email,name,source_page,timestamp\n';
        const row = `${cell(email)},${cell(name)},${cell(source)},${new Date().toISOString()}\n`;
        await fs.appendFile(CSV_PATH, header + row, 'utf-8');
      }
    } catch (csvErr) {
      console.error(
        `[NEWSLETTER] SUBSCRIBER NOT SAVED — CSV write failed. ` +
        `Email: ${email} | Path attempted: ${CSV_PATH} | Error:`,
        csvErr
      );
    }

    const firstName = esc(name || 'there');

    const resend = new Resend(resendApiKey);
    const emailResult = await resend.emails.send({
      from: "Ava's Hub <forms@avashubnj.com>",
      replyTo: 'marilyn@avashubnj.com',
      to: email,
      subject: "You're on the list! Welcome to Ava's Hub 💚",
      html: buildEmail({
        heading: `Hi ${firstName} — welcome to the Ava's Hub family! 💚`,
        bodyHtml: `
          <p style="margin:0 0 14px;font-size:15px;line-height:1.75;color:#3a3a3a;">
            Thank you for subscribing. You're now on our list for updates about upcoming events,
            new programs, family resources, and everything happening at Ava's Hub.
          </p>
          <p style="margin:0 0 14px;font-size:15px;line-height:1.75;color:#3a3a3a;">
            We're a pediatric occupational therapy, physical therapy, and speech-language clinic
            in East Orange, NJ — and we're passionate about helping children and families thrive.
            Whether your family is just exploring or ready to schedule, we're here for you every step of the way.
          </p>
          <p style="margin:0;font-size:15px;line-height:1.75;color:#3a3a3a;">
            We can't wait to connect with your family.
          </p>`,
        ctaHtml: `
          <p style="margin:0 0 14px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:#888;">
            Ready to start? Choose a therapy program:
          </p>
          ${intakeFormButtonsHtml()}`,
        footerNote: `You received this because you subscribed at avashubnj.com.
          Reply anytime — we'd love to hear from you.`,
      }),
    });

    return NextResponse.json({
      success: !emailResult.error,
      id: emailResult.data?.id,
      ...(emailResult.error ? { error: String(emailResult.error) } : {}),
    });

  } catch (error) {
    console.error('Newsletter route error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}

function cell(value: string): string {
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}
