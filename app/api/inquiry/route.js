import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';
import { z } from 'zod';

const inquirySchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  interest: z.string().min(2),
  message: z.string().min(5),
});

export async function POST(request) {
  try {
    const data = await request.json();

    // Validate request using Zod
    const validatedData = inquirySchema.parse(data);

    const { data: insertedData, error } = await supabase
      .from('inquiries')
      .insert([
        {
          full_name: validatedData.fullName,
          email: validatedData.email,
          phone: validatedData.phone || null,
          interest: validatedData.interest,
          message: validatedData.message
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
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: 'Validation failed', details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
