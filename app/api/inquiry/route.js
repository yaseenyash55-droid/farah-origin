import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request) {
  try {
    const data = await request.json();

    // Basic validation
    if (!data.fullName || !data.email || !data.interest || !data.message) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const newInquiry = {
      id: Date.now(),
      ...data,
      submittedAt: new Date().toISOString(),
    };

    const filePath = path.join(process.cwd(), 'data', 'inquiries.json');
    
    let inquiries = [];
    try {
      const fileContent = await fs.readFile(filePath, 'utf-8');
      inquiries = JSON.parse(fileContent);
    } catch (error) {
      // File doesn't exist or is empty, start with an empty array
      if (error.code !== 'ENOENT') {
        throw error;
      }
    }

    inquiries.push(newInquiry);

    await fs.writeFile(filePath, JSON.stringify(inquiries, null, 2), 'utf-8');

    return NextResponse.json({ 
      message: 'Inquiry submitted successfully!',
      inquiry: newInquiry 
    }, { status: 201 });

  } catch (error) {
    console.error('Error processing inquiry:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
