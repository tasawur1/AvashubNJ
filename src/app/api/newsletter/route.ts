import { NextRequest, NextResponse } from 'next/server';
import { addToKlaviyoList } from '@/lib/klaviyo';
import { logRequest } from '@/lib/logger';

export async function POST(request: NextRequest) {
  const start = Date.now();
  try {
    const body = await request.json();
    const email: string = (body.email ?? '').trim().toLowerCase();
    const name: string = (body.name ?? '').trim();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    const nameParts = name.split(' ').filter(Boolean);
    const firstName = nameParts[0] ?? '';
    const lastName = nameParts.slice(1).join(' ') || undefined;

    // — Add to Klaviyo list (best-effort; welcome email is handled by Klaviyo flow) —
    try {
      await addToKlaviyoList(email, firstName, lastName);
    } catch (klaviyoErr) {
      console.error('[KLAVIYO] Failed to add contact:', email, klaviyoErr);
    }

    logRequest({
      route: '/api/newsletter',
      duration_ms: Date.now() - start,
      status_code: 200,
      success: true,
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    logRequest({
      route: '/api/newsletter',
      duration_ms: Date.now() - start,
      status_code: 500,
      success: false,
      error_message: String(error),
    });
    console.error('Newsletter route error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
