import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { buildEmail, replyPromptHtml, esc, nl2p } from '@/lib/emailTemplate';
import { addToKlaviyoList, trackKlaviyoEvent } from '@/lib/klaviyo';

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

    const resend = new Resend(resendApiKey);

    const timestamp = new Date().toLocaleString('en-US', {
      timeZone: 'America/New_York',
      dateStyle: 'full',
      timeStyle: 'short',
    });

    // — Internal notification to hello@avashubnj.com —
    const clinicResult = await resend.emails.send({
      from: "Ava's Hub <forms@avashubnj.com>",
      replyTo: email,
      to: 'hello@avashubnj.com',
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

    // — Klaviyo: upsert profile name —
    try {
      await addToKlaviyoList(email, firstName, lastName);
    } catch (err) {
      console.warn('[KLAVIYO] addToKlaviyoList failed for contact form:', email, err);
    }

    // — Klaviyo: upsert phone number (if provided) —
    if (phone) {
      try {
        const klaviyoApiKey = process.env.KLAVIYO_PRIVATE_API_KEY;
        if (klaviyoApiKey) {
          const phoneRes = await fetch('https://a.klaviyo.com/api/profiles/', {
            method: 'POST',
            headers: {
              'Authorization': `Klaviyo-API-Key ${klaviyoApiKey}`,
              'revision': '2024-02-15',
              'Content-Type': 'application/json',
            },
            signal: AbortSignal.timeout(10_000),
            body: JSON.stringify({
              data: {
                type: 'profile',
                attributes: { email, phone_number: phone },
              },
            }),
          });
          if (!phoneRes.ok) {
            const text = await phoneRes.text();
            console.warn('[KLAVIYO] Failed to upsert phone for:', email, phoneRes.status, text);
          } else {
            console.log('[KLAVIYO] Phone upserted:', email);
          }
        }
      } catch (phoneErr) {
        console.warn('[KLAVIYO] Phone upsert failed for:', email, phoneErr);
      }
    }

    // — Klaviyo: track rich contact form event —
    try {
      await trackKlaviyoEvent(email, 'Contact Form Submitted', {
        phone: phone || '',
        message: message || '',
        source: 'contact_form',
      });
    } catch (err) {
      console.warn('[KLAVIYO] trackKlaviyoEvent failed for contact form:', email, err);
    }

    return NextResponse.json({
      success: !clinicResult.error,
      clinicEmail: clinicResult,
    });

  } catch (error) {
    console.error('Contact route error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}

function row(label: string, value: string): string {
  return `<tr>
    <td style="padding:7px 12px 7px 0;font-size:13px;font-weight:700;color:#555;white-space:nowrap;vertical-align:top;">${esc(label)}</td>
    <td style="padding:7px 0;font-size:13px;color:#141414;vertical-align:top;">${esc(value)}</td>
  </tr>`;
}
