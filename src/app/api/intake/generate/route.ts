import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, formId, system } = body as {
      prompt?: string;
      formId?: string;
      system?: string;
    };

    if (!prompt || !formId) {
      return NextResponse.json(
        { error: "Missing required fields: prompt and formId" },
        { status: 400 }
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Server configuration error: API key not set" },
        { status: 500 }
      );
    }

    const anthropicResponse = await fetch(
      "https://api.anthropic.com/v1/messages",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1400,
          ...(system ? { system } : {}),
          messages: [{ role: "user", content: prompt }],
        }),
      }
    );

    if (!anthropicResponse.ok) {
      const errorText = await anthropicResponse.text();
      console.error("Anthropic API error:", errorText);
      return NextResponse.json(
        { error: "AI service error", detail: errorText },
        { status: anthropicResponse.status }
      );
    }

    const data = await anthropicResponse.json();
    const result: string = data.content?.[0]?.text ?? "";

    return NextResponse.json({ result });
  } catch (err) {
    console.error("Intake generate route error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
