import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { esc } from '@/lib/emailTemplate';
import { upsertKlaviyoProfile, addToKlaviyoList, trackKlaviyoEvent } from '@/lib/klaviyo';
import { logRequest } from '@/lib/logger';
import { createAdminClient } from '@/lib/supabase-server';

// Module-level singleton — reuses the underlying HTTP agent/connection pool
// across requests instead of spinning up a new client on every POST.
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const start = Date.now();
  try {
    if (!process.env.RESEND_API_KEY) {
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
    const message: string   = (body.message   ?? '').trim();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    // — Internal notification to hello@avashubnj.com —
    // 20s timeout gives Resend headroom for warm-up while staying well under
    // Hostinger's nginx proxy_read_timeout (typically 60s on managed Node plans).
    // clearTimeout ensures the timer handle is released immediately on success —
    // without it, every successful send leaves a dangling timer alive in the
    // long-running Node process until the 20s elapses.
    let timeoutId: ReturnType<typeof setTimeout>;
    const clinicResult = await Promise.race([
      resend.emails.send({
        from: "Ava's Hub <forms@avashubnj.com>",
        replyTo: email,
        to: 'hello@avashubnj.com',
        subject: `📬 New Contact Message — ${firstName} ${lastName}`.trim(),
        html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8"/>
    <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
    <meta content="IE=edge" http-equiv="X-UA-Compatible"/>
    <title>New Contact Form Message &mdash; Ava's Hub</title>
  </head>
  <body style="margin:0;padding:0;background-color:#F7F5F2;font-family:Arial,Helvetica,sans-serif;-webkit-font-smoothing:antialiased;">
    <div style="background-color:#F7F5F2;padding:40px 16px;">
      <div style="background-color:#ffffff;border-radius:16px;max-width:560px;margin:0 auto;overflow:hidden;box-shadow:0 2px 16px rgba(0,0,0,0.06);">
        <div style="background-color:#ffffff;padding:36px 40px 28px;text-align:center;border-bottom:1px solid #F0EBF8;">
          <img alt="Ava's Hub" src="https://avashubnj.com/images/logo.png" style="height:48px;width:auto;display:inline-block;margin:0 auto;"/>
          <div style="font-size:11px;color:#9B92A8;letter-spacing:0.04em;margin-top:8px;font-family:Arial,Helvetica,sans-serif;">Skills for Today. Independence for Life.</div>
        </div>
        <div style="padding:32px 40px 0;text-align:center;">
          <span style="display:inline-block;font-size:11px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#7C5CBF;background-color:#F0EBF8;padding:5px 14px;border-radius:20px;font-family:Arial,Helvetica,sans-serif;">📬 New Contact Form Message</span>
        </div>
        <div style="padding:20px 40px 28px;text-align:center;">
          <h1 style="font-size:24px;font-weight:700;color:#1A1523;line-height:1.25;margin:0 0 10px 0;letter-spacing:-0.3px;font-family:Arial,Helvetica,sans-serif;">Someone reached out<br/>through the website.</h1>
          <p style="font-size:15px;color:#5A5467;line-height:1.6;margin:0;font-family:Arial,Helvetica,sans-serif;">Here are their details and message below.</p>
        </div>
        <div style="height:1px;background-color:#F0EBF8;margin:0 40px;"></div>
        <div style="padding:32px 40px;">
          <p style="font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#9B92A8;margin:0 0 18px 0;font-family:Arial,Helvetica,sans-serif;">Contact details</p>
          <table border="0" cellpadding="0" cellspacing="0" style="margin-bottom:12px;" width="100%">
            <tr>
              <td style="padding:10px 12px;background-color:#F7F5F2;border-radius:8px 0 0 8px;" valign="top" width="120">
                <p style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;color:#9B92A8;margin:0;font-family:Arial,Helvetica,sans-serif;">Name</p>
              </td>
              <td style="padding:10px 14px;background-color:#FAFAFA;border-radius:0 8px 8px 0;border-left:2px solid #F0EBF8;" valign="top">
                <p style="font-size:14px;font-weight:600;color:#1A1523;margin:0;font-family:Arial,Helvetica,sans-serif;">${esc(firstName)} ${esc(lastName)}</p>
              </td>
            </tr>
          </table>
          <table border="0" cellpadding="0" cellspacing="0" style="margin-bottom:12px;" width="100%">
            <tr>
              <td style="padding:10px 12px;background-color:#F7F5F2;border-radius:8px 0 0 8px;" valign="top" width="120">
                <p style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;color:#9B92A8;margin:0;font-family:Arial,Helvetica,sans-serif;">Email</p>
              </td>
              <td style="padding:10px 14px;background-color:#FAFAFA;border-radius:0 8px 8px 0;border-left:2px solid #F0EBF8;" valign="top">
                <a href="mailto:${esc(email)}" style="font-size:14px;color:#7C5CBF;text-decoration:none;font-family:Arial,Helvetica,sans-serif;">${esc(email)}</a>
              </td>
            </tr>
          </table>
          <table border="0" cellpadding="0" cellspacing="0" style="margin-bottom:0;" width="100%">
            <tr>
              <td style="padding:10px 12px;background-color:#F7F5F2;border-radius:8px 0 0 8px;" valign="top" width="120">
                <p style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;color:#9B92A8;margin:0;font-family:Arial,Helvetica,sans-serif;">Phone</p>
              </td>
              <td style="padding:10px 14px;background-color:#FAFAFA;border-radius:0 8px 8px 0;border-left:2px solid #F0EBF8;" valign="top">
                <p style="font-size:14px;color:#1A1523;margin:0;font-family:Arial,Helvetica,sans-serif;">${esc(phone || 'Not provided')}</p>
              </td>
            </tr>
          </table>
        </div>
        <div style="height:1px;background-color:#F0EBF8;margin:0 40px;"></div>
        <div style="padding:32px 40px;">
          <p style="font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#9B92A8;margin:0 0 16px 0;font-family:Arial,Helvetica,sans-serif;">Their message</p>
          <div style="background-color:#F7F5F2;border-radius:12px;padding:20px 22px;border-left:3px solid #7C5CBF;">
            <p style="font-size:14px;color:#1A1523;line-height:1.7;margin:0;font-family:Arial,Helvetica,sans-serif;white-space:pre-wrap;">${esc(message || 'No message provided.')}</p>
          </div>
        </div>
        <div style="padding:0 40px 32px;text-align:center;">
          <a href="mailto:${esc(email)}" style="display:inline-block;background-color:#7C5CBF;color:#ffffff;text-decoration:none;font-size:15px;font-weight:600;padding:14px 32px;border-radius:10px;font-family:Arial,Helvetica,sans-serif;">Reply to ${esc(firstName || 'this person')} &rarr;</a>
        </div>
        <div style="height:1px;background-color:#F0EBF8;margin:0 40px;"></div>
        <div style="padding:28px 40px;text-align:center;">
          <p style="font-size:14px;font-weight:600;color:#1A1523;margin:0 0 4px 0;font-family:Arial,Helvetica,sans-serif;">Ava's Hub</p>
          <p style="font-size:12px;color:#9B92A8;margin:0 0 16px 0;font-family:Arial,Helvetica,sans-serif;">280 S. Harrison St., Suite 311 &middot; East Orange, NJ 07018</p>
          <div style="height:1px;background-color:#F0EBF8;margin:0 0 16px 0;"></div>
          <p style="font-size:12px;color:#9B92A8;line-height:1.8;margin:0;font-family:Arial,Helvetica,sans-serif;">
            <a href="tel:+19732232950" style="color:#7C5CBF;text-decoration:none;">973-223-2950</a>
            &nbsp;&middot;&nbsp;
            <a href="mailto:hello@avashubnj.com" style="color:#7C5CBF;text-decoration:none;">hello@avashubnj.com</a>
            &nbsp;&middot;&nbsp;
            <a href="https://avashubnj.com" style="color:#7C5CBF;text-decoration:none;">avashubnj.com</a>
          </p>
          <div style="height:1px;background-color:#F0EBF8;margin:16px 0;"></div>
          <p style="font-size:11px;color:#B8B2C0;margin:0;font-family:Arial,Helvetica,sans-serif;">This is an internal notification from your website contact form.</p>
        </div>
      </div>
    </div>
  </body>
</html>`,
      }),
      new Promise<never>((_, reject) => {
        timeoutId = setTimeout(() => reject(new Error('Email delivery timed out — please try again.')), 20_000);
      }),
    ]);
    clearTimeout(timeoutId!);

    // Resend SDK returns { data, error } — treat a non-null error as a hard failure
    // so it falls to the catch block and returns HTTP 500 with the real message.
    if (clinicResult.error) {
      throw new Error(
        (clinicResult.error as { message?: string }).message ?? 'Email service returned an error.'
      );
    }

    // — Klaviyo: run all three calls concurrently (independent, no ordering needed) —
    await Promise.all([
      upsertKlaviyoProfile(email, firstName, lastName, phone, {
        last_message: message || '',
        last_contact_source: 'contact_form',
      }).catch((err) => console.warn('[KLAVIYO] upsertKlaviyoProfile failed:', email, err)),

      addToKlaviyoList(email, firstName, lastName, process.env.KLAVIYO_CONTACT_LIST_ID)
        .catch((err) => console.warn('[KLAVIYO] addToKlaviyoList failed:', email, err)),

      trackKlaviyoEvent(email, 'Contact Form Submitted', {
        first_name: firstName || '',
        last_name: lastName || '',
        phone: phone || '',
        message: message || '',
        source: 'contact_form',
      }).catch((err) => console.warn('[KLAVIYO] trackKlaviyoEvent failed:', email, err)),
    ]);

    // Store contact submission to Supabase (fire-and-forget — never blocks the response).
    // We do NOT create or modify client records here — clients are created only via
    // sign-up and intake forms. We do a read-only lookup to link the submission to an
    // existing client if their email matches, but we never write to the clients table.
    // The 8s race prevents a stalled Supabase connection from accumulating indefinitely
    // in the long-running Node process when the connection pool is under pressure.
    void (async () => {
      try {
        const supabase = createAdminClient();
        const fullName = `${firstName} ${lastName}`.trim();

        await Promise.race([
          (async () => {
            // Read-only: find existing client to attach the submission to (no upsert)
            const { data: existing } = await supabase
              .from('clients')
              .select('id')
              .eq('email', email)
              .maybeSingle();

            const { error } = await supabase.from('contact_submissions').insert({
              email,
              name: fullName || null,
              phone: phone || null,
              message: message || null,
              client_id: existing?.id ?? null,
            });
            if (error) console.warn('[CONTACT DB]', error.message);
          })(),
          new Promise<void>((_, reject) =>
            setTimeout(() => reject(new Error('Supabase write timed out')), 8_000)
          ),
        ]);
      } catch (err) {
        console.warn('[CONTACT DB] failed:', err);
      }
    })();

    logRequest({
      route: '/api/contact',
      duration_ms: Date.now() - start,
      status_code: 200,
      success: true,
      metadata: { has_message: !!message, has_phone: !!phone },
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    logRequest({
      route: '/api/contact',
      duration_ms: Date.now() - start,
      status_code: 500,
      success: false,
      error_message: String(error),
    });
    console.error('Contact route error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
