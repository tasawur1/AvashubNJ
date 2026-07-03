import { NextRequest, NextResponse } from 'next/server';
import { logRequest } from '@/lib/logger';

export async function POST(request: NextRequest) {
  const start = Date.now();
  try {
    const { prompt, formId } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: 'No prompt provided' }, { status: 400 });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 55_000);

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1400,
        system: `You are the clinical director of Ava's Hub in East Orange, NJ — Essex County's premier pediatric therapy clinic for children and young adults ages 18 months to 21 years. You use PEO, MOHO, and CMOP-E frameworks. You write warm, hopeful, strength-based results that make families feel seen and give them a clear picture of how Ava's Hub can help their child. Plain text only — no markdown bold (**). Always disclaim this is not a clinical evaluation.`,
        messages: [{ role: 'user', content: prompt }],
      }),
    }).finally(() => clearTimeout(timeoutId));

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('Anthropic API error:', response.status, errorBody);
      return NextResponse.json({ error: 'Anthropic API error' }, { status: response.status });
    }

    const data = await response.json();
    const text = data.content?.[0]?.text ?? '';

    logRequest({
      route: '/api/intake/generate',
      duration_ms: Date.now() - start,
      status_code: 200,
      success: true,
      metadata: { form_id: formId, tokens_used: data.usage?.output_tokens ?? null },
    });

    return NextResponse.json({ text, formId });

  } catch (error) {
    logRequest({
      route: '/api/intake/generate',
      duration_ms: Date.now() - start,
      status_code: 500,
      success: false,
      error_message: String(error),
    });
    console.error('Generate route error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
