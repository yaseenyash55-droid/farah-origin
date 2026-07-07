import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET: Fetch an order by ID, or all orders if no ID is provided (for admin)
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get('id');
    const email = searchParams.get('email');

    if (orderId) {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .single();
      
      if (error) throw error;
      return NextResponse.json(data);
    } else if (email) {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('recipient_email', email)
        .order('order_date', { ascending: false });

      if (error) throw error;
      return NextResponse.json(data);
    } else {
      // Fetch all orders (for admin)
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('order_date', { ascending: false });

      if (error) throw error;
      return NextResponse.json(data);
    }
  } catch (error: any) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST: Create a new order
export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Validate request
    if (!body.orderNumber || !body.items || !body.shippingAddress) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('orders')
      .insert([
        {
          id: body.orderNumber, // Using the generated FO-xxxxxx as ID
          items: body.items,
          shipping_address: body.shippingAddress,
          payment_method: body.paymentMethod,
          pricing: body.pricing,
          recipient_email: body.recipientEmail,
          user_phone: body.shippingAddress.phone,
          status: 'placed'
        }
      ])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, order: data });
  } catch (error: any) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT: Update order status (for admin)
export async function PUT(req: Request) {
  try {
    const { id, status } = await req.json();

    if (!id || !status) {
      return NextResponse.json({ error: 'Order ID and status are required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, order: data });
  } catch (error: any) {
    console.error('Error updating order:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
