import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

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
      from: 'Ava\'s Hub Forms <onboarding@resend.dev>',
      to: NOTIFY_EMAIL,
      subject: `🆕 New OT Intake — ${childName} | Ava's Hub`,
      text: `
NEW OT INTAKE QUESTIONNAIRE SUBMITTED
======================================
Submitted: ${timestamp}
Form: ${formId}

CHILD & FAMILY
--------------
Child: ${childName}
Parent: ${parentName}
Email: ${parentEmail}
Phone: ${phone || 'Not provided'}
Best time to call: ${bestTime || 'Not specified'}
Insurance: ${insurance || 'Not specified'}

AI GENERATED RESULTS
--------------------
${results}

======================================
Ava's Hub · hello@avashubnj.com
280 S Harrison St, Suite 311, East Orange NJ 07018
Essex County's premier pediatric therapy clinic
      `.trim(),
    });

    // EMAIL 2 — Parent's copy (their results)
    let parentEmailResult = null;
    if (parentEmail && parentEmail.includes('@')) {
      parentEmailResult = await resend.emails.send({
        from: 'Ava\'s Hub <onboarding@resend.dev>',
        to: parentEmail,
        subject: `Your Ava's Hub OT Assessment Results — ${childName}`,
        text: `
Dear ${parentName},

Thank you for completing our Occupational Therapy questionnaire for ${childName}.
Below are your personalized results from Ava's Hub.

IMPORTANT: These results are for informational purposes only and are
not a clinical evaluation or diagnosis. All formal evaluations are
performed in-office by our licensed Occupational Therapist at Ava's Hub.

YOUR RESULTS
============
${results}
============

WHAT HAPPENS NEXT
-----------------
Our clinical team will personally review your responses and reach out
within 1–2 business days to schedule ${childName}'s in-office evaluation.

We cannot wait to meet your family.

📧 hello@avashubnj.com
🌐 www.avashubnj.com
📍 280 S Harrison St, Suite 311, East Orange NJ 07018
📞 973-223-2950

Warm regards,
Marilyn Iacoviello & the Ava's Hub Team
Essex County's premier pediatric therapy clinic
Tony & Ava LLC DBA Ava's Hub

--
This email was sent because you completed a questionnaire at avashubnj.com.
        `.trim(),
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
