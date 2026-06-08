import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { prompt, formId } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: 'No prompt provided' }, { status: 400 });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      console.error('ANTHROPIC_API_KEY is not set in environment variables');
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1400,
        system: `You are the clinical director of Ava's Hub in East Orange, NJ — Essex County's premier pediatric therapy clinic for children and young adults ages 18 months to 21 years. You use PEO, MOHO, and CMOP-E frameworks. You write warm, hopeful, strength-based results that make families feel seen and give them a clear picture of how Ava's Hub can help their child. Plain text only — no ** markdown bold. Always disclaim this is not a clinical evaluation.`,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('Anthropic API error:', response.status, errorBody);
      return NextResponse.json(
        { error: 'Anthropic API error', details: errorBody },
        { status: response.status }
      );
    }

    const data = await response.json();
    const text = data.content?.[0]?.text ?? '';

    return NextResponse.json({ text, formId });

  } catch (error) {
    console.error('Generate route error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
