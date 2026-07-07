import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const { name, email, phone } = await req.json();

    if (!name || !email || !phone) {
      return NextResponse.json({ error: 'Name, email, and phone are required' }, { status: 400 });
    }

    // Insert user into Supabase. If email already exists, it will throw an error or we can upsert
    const { data, error } = await supabase
      .from('users')
      .upsert(
        { name, email, phone },
        { onConflict: 'email' }
      )
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, user: data });
  } catch (error: any) {
    console.error('Error registering user:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
