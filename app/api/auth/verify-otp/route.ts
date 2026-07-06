import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const { contact, otp } = await req.json();

    if (!contact || !otp) {
      return NextResponse.json({ error: 'Contact and OTP are required' }, { status: 400 });
    }

    // In a real app, verify OTP securely against Supabase
    // const { data, error } = await supabase.from('otp_verifications')
    //   .select('*').eq('contact', contact).eq('otp', otp).gte('expires_at', new Date().toISOString()).single();
    
    // For demonstration, we'll accept any 6 digit OTP or mock verify
    if (otp.length === 6) {
      return NextResponse.json({ message: 'OTP verified successfully', token: 'mock-jwt-token' });
    }

    return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
