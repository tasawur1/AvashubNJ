import { NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions, type SessionData } from "@/lib/session";

export async function GET() {
  try {
    const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
    if (!session.isLoggedIn) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const apiKey = process.env.UPTIMEROBOT_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "UPTIMEROBOT_API_KEY not configured" }, { status: 500 });
    }

    const res = await fetch("https://api.uptimerobot.com/v2/getMonitors", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        api_key: apiKey,
        format: "json",
        response_times: "1",
        response_times_limit: "5",
        all_time_uptime_ratio: "1",
      }),
      signal: AbortSignal.timeout(8_000),
    });

    if (!res.ok) {
      return NextResponse.json({ error: `UptimeRobot returned ${res.status}` }, { status: 502 });
    }

    const data = await res.json();

    if (data.stat !== "ok") {
      return NextResponse.json({ error: data.error?.message ?? "UptimeRobot error" }, { status: 502 });
    }

    // Normalize monitors into a simple shape
    const monitors = (data.monitors ?? []).map((m: {
      id: number;
      friendly_name: string;
      url: string;
      status: number;
      all_time_uptime_ratio: string;
      response_times?: { value: number }[];
    }) => ({
      id: m.id,
      name: m.friendly_name,
      url: m.url,
      // 2 = up, 9 = down, 8 = seems down, 0 = paused, 1 = not checked yet
      status: m.status === 2 ? "up" : m.status === 9 ? "down" : m.status === 8 ? "degraded" : "unknown",
      uptimeRatio: m.all_time_uptime_ratio ? parseFloat(m.all_time_uptime_ratio).toFixed(2) : null,
      lastResponseMs: m.response_times?.[0]?.value ?? null,
    }));

    return NextResponse.json({ monitors, checkedAt: new Date().toISOString() });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
