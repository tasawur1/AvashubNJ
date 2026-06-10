import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { buildEmail, scheduleButtonHtml, replyPromptHtml, esc, nl2p } from '@/lib/emailTemplate';

const NOTIFY_EMAIL = process.env.NOTIFICATION_EMAIL || 'marilyn@avashubnj.com';

export async function POST(request: NextRequest) {
  try {
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      console.error('Notify route is missing RESEND_API_KEY.');
      return NextResponse.json({
        success: false,
        error: 'Email notifications are not configured.',
      });
    }

    const resend = new Resend(resendApiKey);

    const {
      formId,
      service = 'Occupational Therapy',
      childName,
      parentName,
      parentEmail,
      phone,
      bestTime,
      insurance,
      results,
    } = await request.json();

    const timestamp = new Date().toLocaleString('en-US', {
      timeZone: 'America/New_York',
      dateStyle: 'full',
      timeStyle: 'short',
    });

    // EMAIL 1 — Marilyn's copy (clinical summary)
    const clinicEmailResult = await resend.emails.send({
      from: "Ava's Hub <forms@avashubnj.com>",
      replyTo: parentEmail || 'marilyn@avashubnj.com',
      to: NOTIFY_EMAIL,
      subject: `🆕 New ${service} Intake — ${childName} | Ava's Hub`,
      html: buildEmail({
        heading: `🆕 New ${esc(service)} Intake — ${esc(childName)}`,
        bodyHtml: `
          <p style="margin:0 0 14px;font-size:13px;color:#888;">
            Submitted: <strong>${esc(timestamp)}</strong> &nbsp;·&nbsp; Form: <code style="font-size:12px;background:#f3f0f9;padding:2px 6px;border-radius:4px;">${esc(formId)}</code>
          </p>
          <table style="width:100%;border-collapse:collapse;margin:0 0 20px;font-size:14px;">
            ${intakeRow('Child',         childName)}
            ${intakeRow('Parent',        parentName)}
            ${intakeRow('Email',         parentEmail)}
            ${intakeRow('Phone',         phone || '—')}
            ${intakeRow('Best time',     bestTime || '—')}
            ${intakeRow('Insurance',     insurance || '—')}
          </table>
          <div style="background:#f8f7fc;border-left:3px solid #6B4DB8;border-radius:0 4px 4px 0;padding:14px 16px;margin:0 0 8px;">
            <p style="margin:0 0 8px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#6B4DB8;">AI-generated results</p>
            ${nl2p(results || '(no results)')}
          </div>`,
        ctaHtml: replyPromptHtml(),
      }),
    });

    // EMAIL 2 — Parent's copy (their results)
    let parentEmailResult = null;
    if (parentEmail && parentEmail.includes('@')) {
      parentEmailResult = await resend.emails.send({
        from: "Ava's Hub <forms@avashubnj.com>",
        replyTo: 'marilyn@avashubnj.com',
        to: parentEmail,
        subject: `Your Ava's Hub ${service} Results — ${childName}`,
        html: buildEmail({
          heading: `Your ${esc(service)} Results — ${esc(childName)}`,
          bodyHtml: `
            <p style="margin:0 0 14px;font-size:15px;line-height:1.75;color:#3a3a3a;">
              Dear ${esc(parentName)},
            </p>
            <p style="margin:0 0 14px;font-size:15px;line-height:1.75;color:#3a3a3a;">
              Thank you for completing our ${esc(service)} questionnaire for ${esc(childName)}.
              Below are your personalized results from Ava's Hub.
            </p>
            <div style="background:#f8f7fc;border-left:3px solid #6B4DB8;border-radius:0 4px 4px 0;padding:16px 18px;margin:0 0 16px;">
              <p style="margin:0 0 8px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#6B4DB8;">Your results</p>
              ${nl2p(results || '(no results)')}
            </div>
            <p style="margin:0 0 14px;font-size:12px;line-height:1.6;color:#888;font-style:italic;">
              These results are for informational purposes only and are not a clinical evaluation
              or diagnosis. All formal evaluations are performed in-office by our licensed therapist at Ava's Hub.
            </p>
            <p style="margin:0;font-size:15px;line-height:1.75;color:#3a3a3a;">
              Our clinical team will personally review your responses and reach out within
              <strong>1–2 business days</strong> to schedule ${esc(childName)}'s in-office evaluation.
              We can't wait to meet your family.
            </p>`,
          ctaHtml: scheduleButtonHtml(),
          footerNote: "This email was sent because you completed a questionnaire at avashubnj.com.",
        }),
      });
    }

    return NextResponse.json({
      success: true,
      clinicEmail: clinicEmailResult,
      parentEmail: parentEmailResult,
    });

  } catch (error) {
    // Always return success to the form — never block the results from showing
    console.error('Notify route error:', error);
    return NextResponse.json({ success: false, error: String(error) });
  }
}

function intakeRow(label: string, value: string): string {
  return `<tr>
    <td style="padding:7px 12px 7px 0;font-size:13px;font-weight:700;color:#555;white-space:nowrap;vertical-align:top;">${esc(label)}</td>
    <td style="padding:7px 0;font-size:13px;color:#141414;vertical-align:top;">${esc(value)}</td>
  </tr>`;
}
