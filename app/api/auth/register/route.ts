import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { signToken } from '@/lib/jwt';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const { name, email, phone } = await req.json();

    if (!name || !email || !phone) {
      return NextResponse.json({ error: 'Name, email, and phone are required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('users')
      .upsert(
        { name, email, phone },
        { onConflict: 'email' }
      )
      .select()
      .single();

    if (error) throw error;
    // Determine role (Assign admin to the store owner)
    const role = data.email === 'farahorigin.shop@gmail.com' ? 'admin' : 'user';

    // Create JWT
    const token = await signToken({ id: data.id, email: data.email, role });
    
    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return NextResponse.json({ success: true, user: data, token });
  } catch (error: any) {
    console.error('Error registering user:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
