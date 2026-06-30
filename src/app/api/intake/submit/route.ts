import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase-server';

const VALID_FORM_TYPES = ['ot', 'pt', 'slp'] as const;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      formType,
      childName,
      childAge,
      parentName,
      parentEmail,
      phone,
      bestTime,
      insurance,
      diagnosis,
      mainConcern,
      topGoal,
      prevServices,
      formData,
      aiResults,
    } = body;

    if (!VALID_FORM_TYPES.includes(formType)) {
      return NextResponse.json({ success: false, error: 'Invalid form type' }, { status: 400 });
    }

    const supabase = createAdminClient();
    const email = typeof parentEmail === 'string' ? parentEmail.trim().toLowerCase() : '';

    let clientId: string | null = null;

    if (email && email.includes('@')) {
      clientId = await upsertClient(supabase, {
        email,
        parent_name: parentName ?? null,
        phone: phone ?? null,
        child_name: childName ?? null,
        source_tag: 'intake',
      });
    }

    const { data: submission, error } = await supabase
      .from('intake_submissions')
      .insert({
        form_type: formType,
        status: 'pending_confirmation',
        parent_name: parentName || null,
        parent_email: email || null,
        phone: phone || null,
        child_name: childName || null,
        child_age: childAge || null,
        best_time: bestTime || null,
        insurance: insurance || null,
        diagnosis: diagnosis || null,
        main_concern: mainConcern || null,
        top_goal: topGoal || null,
        prev_services: prevServices || null,
        form_data: formData && typeof formData === 'object' ? formData : {},
        ai_results: aiResults || null,
        client_id: clientId,
      })
      .select('id')
      .single();

    if (error) {
      console.error('[INTAKE SUBMIT]', error.message);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: submission?.id });
  } catch (err) {
    console.error('[INTAKE SUBMIT] unexpected error:', err);
    return NextResponse.json({ success: false, error: 'Submission failed' }, { status: 500 });
  }
}

// Atomic-safe upsert: SELECT first, then INSERT or UPDATE.
// On INSERT unique-conflict (23505), re-fetch — handles concurrent submissions from the same family.
async function upsertClient(
  supabase: ReturnType<typeof createAdminClient>,
  opts: { email: string; parent_name: string | null; phone: string | null; child_name: string | null; source_tag: string }
): Promise<string | null> {
  const { email, parent_name, phone, child_name, source_tag } = opts;

  const { data: existing } = await supabase
    .from('clients')
    .select('id, source, parent_name, phone, child_name')
    .eq('email', email)
    .maybeSingle();

  if (existing) {
    const newSource = [...new Set([...(existing.source ?? []), source_tag])];
    await supabase
      .from('clients')
      .update({
        parent_name: parent_name || existing.parent_name,
        phone: phone || existing.phone,
        child_name: child_name || existing.child_name,
        source: newSource,
      })
      .eq('id', existing.id);
    return existing.id;
  }

  const { data: newClient, error: insertError } = await supabase
    .from('clients')
    .insert({ email, parent_name, phone, child_name, source: [source_tag] })
    .select('id')
    .single();

  if (insertError) {
    // 23505 = unique_violation — another concurrent request inserted the same email
    if (insertError.code === '23505') {
      const { data: retried } = await supabase
        .from('clients')
        .select('id')
        .eq('email', email)
        .single();
      return retried?.id ?? null;
    }
    console.error('[INTAKE SUBMIT] client insert failed:', insertError.message);
    return null;
  }

  return newClient?.id ?? null;
}
