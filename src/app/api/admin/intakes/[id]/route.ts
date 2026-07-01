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

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireAuth();
    if (!permitted(session, 'intakes', 'view'))
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    const { id } = await params;
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('intake_submissions')
      .select('*')
      .eq('id', id)
      .single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    if (!data) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ submission: data });
  } catch (err) {
    const msg = String(err);
    if (msg === 'Error: Unauthorized') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

const VALID_STATUSES = ['confirmed', 'followed_up', 'intake_done', 'enrolled'] as const;

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireAuth();
    if (!permitted(session, 'intakes', 'edit'))
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    const { id } = await params;
    const body = await request.json();

    const allowed = ['parent_email', 'phone', 'status', 'internal_notes'] as const;
    const update: Record<string, unknown> = {};

    for (const key of allowed) {
      if (!(key in body)) continue;
      const val = body[key];
      if (key === 'status') {
        if (!VALID_STATUSES.includes(val)) {
          return NextResponse.json({ error: 'Invalid status value' }, { status: 400 });
        }
        update[key] = val;
      } else {
        update[key] = typeof val === 'string' ? (val.trim() || null) : null;
      }
    }

    if (Object.keys(update).length === 0) {
      return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 });
    }

    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('intake_submissions')
      .update(update)
      .eq('id', id)
      .select('id, parent_email, phone, status, internal_notes, client_id')
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    // Sync email/phone changes back to the linked client record
    if (data.client_id && ('parent_email' in update || 'phone' in update)) {
      const clientSync: Record<string, unknown> = {};
      if ('parent_email' in update) clientSync.email = data.parent_email;
      if ('phone' in update) clientSync.phone = data.phone;
      const { error: syncErr } = await supabase.from('clients').update(clientSync).eq('id', data.client_id);
      if (syncErr) console.error("[intakes/patch] Client sync failed:", syncErr.message);
    }

    return NextResponse.json({ success: true, submission: data });
  } catch (err) {
    const msg = String(err);
    if (msg === 'Error: Unauthorized') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireAuth();
    if (!permitted(session, 'intakes', 'delete'))
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    const { id } = await params;
    const supabase = createAdminClient();
    const { error } = await supabase.from('intake_submissions').delete().eq('id', id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch (err) {
    const msg = String(err);
    if (msg === 'Error: Unauthorized') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
