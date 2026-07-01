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
    if (!permitted(session, 'clients', 'view'))
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    const { id } = await params;
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
      .eq('id', id)
      .single();
    if (error?.code === 'PGRST116') return NextResponse.json({ error: 'Not found' }, { status: 404 });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ client: data });
  } catch (err) {
    const msg = String(err);
    if (msg === 'Error: Unauthorized') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireAuth();
    if (!permitted(session, 'clients', 'edit'))
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    const { id } = await params;
    const body = await request.json();

    const update: Record<string, unknown> = {};

    if ('email' in body) {
      const emailVal = String(body.email ?? '').trim().toLowerCase();
      if (!emailVal || !emailVal.includes('@')) {
        return NextResponse.json({ error: 'A valid email address is required' }, { status: 400 });
      }
      update.email = emailVal;
    }

    if ('phone' in body) {
      update.phone = typeof body.phone === 'string' ? (body.phone.trim() || null) : null;
    }

    if ('internal_notes' in body) {
      update.internal_notes = typeof body.internal_notes === 'string' ? (body.internal_notes.trim() || null) : null;
    }

    if (Object.keys(update).length === 0) {
      return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 });
    }

    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('clients')
      .update(update)
      .eq('id', id)
      .select('id, email, phone, internal_notes')
      .single();

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ error: 'That email is already used by another client' }, { status: 409 });
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, client: data });
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
    if (!permitted(session, 'clients', 'delete'))
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    const { id } = await params;
    const supabase = createAdminClient();

    // Grab the linked auth user id before deleting
    const { data: clientRow } = await supabase
      .from('clients')
      .select('auth_user_id')
      .eq('id', id)
      .maybeSingle();

    const { error } = await supabase.from('clients').delete().eq('id', id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    // Also remove from Supabase Auth so the email can be reused
    if (clientRow?.auth_user_id) {
      const { error: authErr } = await supabase.auth.admin.deleteUser(clientRow.auth_user_id);
      if (authErr) console.error("[clients/delete] Auth user deletion failed:", authErr.message);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    const msg = String(err);
    if (msg === 'Error: Unauthorized') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
