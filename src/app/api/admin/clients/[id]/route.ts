import { NextRequest, NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { sessionOptions, type SessionData } from '@/lib/session';
import { createAdminClient } from '@/lib/supabase-server';

async function requireAuth() {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
  if (!session.isLoggedIn) throw new Error('Unauthorized');
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth();
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
    await requireAuth();
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
    await requireAuth();
    const { id } = await params;
    const supabase = createAdminClient();
    const { error } = await supabase.from('clients').delete().eq('id', id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch (err) {
    const msg = String(err);
    if (msg === 'Error: Unauthorized') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
