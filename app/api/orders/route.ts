import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getSessionUser } from '@/lib/jwt';
import { sendOrderConfirmationEmail } from '@/lib/otp';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const orderSchema = z.object({
  orderNumber: z.string().min(1),
  items: z.array(z.any()).min(1),
  shippingAddress: z.object({
    name: z.string().min(1),
    phone: z.string().min(10),
    addressLine1: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zip: z.string().optional(),
  }),
  paymentMethod: z.string().min(1),
  pricing: z.object({
    subtotal: z.number().nonnegative(),
    shipping: z.number().nonnegative(),
    taxes: z.number().nonnegative(),
    total: z.number().nonnegative(),
  }),
  recipientEmail: z.string().email().optional().or(z.literal('')),
});

export async function GET(req: Request) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get('id');

    if (orderId) {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .eq('recipient_email', user.email) // Security: only allow if it belongs to user
        .single();
      
      if (error) throw error;
      return NextResponse.json(data);
    } else {
      // Fetch user's orders (or all orders if admin)
      let query = supabase.from('orders').select('*').order('order_date', { ascending: false });
      
      if (user.role !== 'admin') {
        query = query.eq('recipient_email', user.email);
      }

      const { data, error } = await query;

      if (error) throw error;
      return NextResponse.json(data);
    }
  } catch (error: any) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Validate request using Zod
    const validatedData = orderSchema.parse(body);

    // 1. Fetch current stock for all items
    const itemIds = validatedData.items.map((i: any) => i.id);
    const { data: products, error: prodError } = await supabase
      .from('products')
      .select('id, stock, title')
      .in('id', itemIds);

    if (prodError) throw prodError;

    // 2. Validate stock availability
    for (const item of validatedData.items) {
      const product = products?.find(p => p.id === item.id);
      if (!product) continue;
      if (product.stock < item.quantity) {
        return NextResponse.json(
          { error: `Not enough stock for ${item.title || product.title}. Only ${product.stock} left.` }, 
          { status: 400 }
        );
      }
    }

    // 3. Insert order
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert([
        {
          id: validatedData.orderNumber,
          items: validatedData.items,
          shipping_address: validatedData.shippingAddress,
          payment_method: validatedData.paymentMethod,
          pricing: validatedData.pricing,
          recipient_email: validatedData.recipientEmail || null,
          user_phone: validatedData.shippingAddress.phone,
          status: 'placed'
        }
      ])
      .select()
      .single();

    if (orderError) throw orderError;

    // 4. Deduct stock and auto-update status if sold out
    for (const item of validatedData.items) {
      const product = products?.find(p => p.id === item.id);
      if (!product) continue;
      
      const newStock = product.stock - item.quantity;
      const newStatus = newStock <= 0 ? 'sold_out' : 'in_stock';
      
      await supabase
        .from('products')
        .update({ stock: newStock, status: newStatus })
        .eq('id', item.id);
    }

    // 5. Send Order Confirmation Email
    if (validatedData.recipientEmail) {
      // Run asynchronously without awaiting so we don't slow down the checkout API response
      sendOrderConfirmationEmail(validatedData.recipientEmail, validatedData).catch(err => 
        console.error('Failed to send async order email', err)
      );
    }

    return NextResponse.json({ success: true, order: orderData });
  } catch (error: any) {
    console.error('Error creating order:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const user = await getSessionUser();
    if (!user || user.role !== 'admin') {
      // Only admins can update status
      return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 401 });
    }

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
