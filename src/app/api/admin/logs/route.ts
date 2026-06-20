import { NextRequest, NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { sessionOptions, type SessionData } from '@/lib/session';
import { createAdminClient } from '@/lib/supabase-server';

const RANGE_MS: Record<string, number> = {
  '1h':  3_600_000,
  '24h': 86_400_000,
  '7d':  604_800_000,
  '30d': 2_592_000_000,
};

export async function GET(request: NextRequest) {
  try {
    const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
    if (!session.isLoggedIn) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const range  = searchParams.get('range')  ?? '24h';
    const status = searchParams.get('status') ?? 'all';

    const supabase = createAdminClient();

    let query = supabase
      .from('request_logs')
      .select('id, created_at, route, method, duration_ms, status_code, success, error_message, metadata')
      .order('created_at', { ascending: false })
      .limit(500);

    if (RANGE_MS[range]) {
      query = query.gte('created_at', new Date(Date.now() - RANGE_MS[range]).toISOString());
    }

    if (status === 'errors') {
      query = query.eq('success', false);
    }

    const { data, error } = await query;
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    const logs = data ?? [];
    const errorCount = logs.filter((r) => !r.success).length;
    const durations  = logs.map((r) => r.duration_ms ?? 0).filter((d) => d > 0);
    const avgDuration = durations.length
      ? Math.round(durations.reduce((s, d) => s + d, 0) / durations.length)
      : 0;
    const maxDuration = durations.length ? Math.max(...durations) : 0;

    return NextResponse.json({
      logs,
      stats: { total: logs.length, errors: errorCount, avgDuration, maxDuration },
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
