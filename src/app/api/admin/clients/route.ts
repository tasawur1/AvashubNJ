import { NextRequest, NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { sessionOptions, type SessionData } from '@/lib/session';
import { createAdminClient } from '@/lib/supabase-server';

async function requireAuth() {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
  if (!session.isLoggedIn) throw new Error('Unauthorized');
}

export async function GET(_request: NextRequest) {
  try {
    await requireAuth();
    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from('clients')
      .select(`
        id, created_at, email, parent_name, phone, child_name, internal_notes, source, newsletter_opted_in,
        intake_submissions (
          id, form_type, status, created_at, child_name, main_concern, top_goal
        ),
        children (
          id, name, age
        )
      `)
      .order('created_at', { ascending: false })
      .limit(500);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ clients: data ?? [] });
  } catch (err) {
    const msg = String(err);
    if (msg === 'Error: Unauthorized') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
