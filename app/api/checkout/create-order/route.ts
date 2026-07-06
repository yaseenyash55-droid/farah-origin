import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'mock_key_id',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'mock_key_secret',
});

export async function POST(req: Request) {
  try {
    const { amount, currency = 'INR' } = await req.json();

    if (!amount) {
      return NextResponse.json({ error: 'Amount is required' }, { status: 400 });
    }

    // Convert amount to smallest currency unit (e.g., paise for INR)
    const options = {
      amount: Math.round(amount * 100),
      currency,
      receipt: `receipt_${Date.now()}`,
    };

    // If using mock keys, bypass Razorpay API to prevent 401 Unauthorized errors during testing
    if (process.env.RAZORPAY_KEY_ID === 'mock_key_id' || !process.env.RAZORPAY_KEY_ID) {
      return NextResponse.json({ 
        orderId: `order_mock_${Date.now()}`, 
        amount: options.amount, 
        currency 
      });
    }

    const order = await razorpay.orders.create(options);
    
    return NextResponse.json({ orderId: order.id, amount: order.amount, currency: order.currency });
  } catch (error) {
    console.error('Razorpay Error:', error);
    return NextResponse.json({ error: 'Failed to create payment order' }, { status: 500 });
  }
}
