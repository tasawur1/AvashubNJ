import { NextRequest, NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { sessionOptions, type SessionData, type StaffPermissions } from '@/lib/session';
import { createAdminClient } from '@/lib/supabase-server';

async function requireAuth() {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
  if (!session.isLoggedIn) throw new Error('Unauthorized');
  return session;
}

function permitted(session: SessionData, resource: keyof StaffPermissions, action: string): boolean {
  if (session.role === 'superadmin') return true;
  const perms = session.permissions?.[resource] as Record<string, boolean> | undefined;
  return perms?.[action] === true;
}

export async function GET(_request: NextRequest) {
  try {
    const session = await requireAuth();
    if (!permitted(session, 'intakes', 'view'))
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from('intake_submissions')
      .select('id, created_at, form_type, parent_name, parent_email, phone, child_name, child_age, best_time, insurance, diagnosis, main_concern, top_goal, prev_services, ai_results, status, internal_notes, client_id, form_data')
      .order('created_at', { ascending: false })
      .limit(500);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ submissions: data ?? [] });
  } catch (err) {
    const msg = String(err);
    if (msg === 'Error: Unauthorized') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
