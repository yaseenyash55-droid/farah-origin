import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';

export async function POST(request) {
  try {
    const data = await request.json();

    // Basic validation
    if (!data.fullName || !data.email || !data.interest || !data.message) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const { data: insertedData, error } = await supabase
      .from('inquiries')
      .insert([
        {
          full_name: data.fullName,
          email: data.email,
          phone: data.phone || null,
          interest: data.interest,
          message: data.message
        }
      ]);

    if (error) {
      console.error('Supabase error inserting inquiry:', error);
      throw error;
    }

    return NextResponse.json({ 
      message: 'Inquiry submitted successfully!'
    }, { status: 201 });

  } catch (error) {
    console.error('Error processing inquiry:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
