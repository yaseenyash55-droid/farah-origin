import { NextResponse } from 'next/server';
import { generateOTP, sendSMS, sendEmail } from '@/lib/otp';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const { contact, method } = await req.json();

    if (!contact || !method) {
      return NextResponse.json({ error: 'Contact and method are required' }, { status: 400 });
    }

    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60000).toISOString(); // 10 minutes

    // In a real app, store OTP securely in Supabase
    // await supabase.from('otp_verifications').insert({ contact, otp, expires_at: expiresAt });
    
    // For now we'll just log it to the console for demonstration
    console.log(`Generated OTP for ${contact}: ${otp}`);

    let result: { success: boolean; simulated?: boolean } = { success: false, simulated: false };
    if (method === 'sms') {
      result = await sendSMS(contact, otp);
    } else if (method === 'email') {
      const emailSuccess = await sendEmail(contact, otp);
      result = { success: emailSuccess };
    }

    if (result.success) {
      return NextResponse.json({ message: 'OTP sent successfully' });
    } else {
      return NextResponse.json({ error: 'Failed to send OTP' }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
