import React from 'react';
import { CheckCircle, Printer } from 'lucide-react';
import Link from 'next/link';

const OrderConfirmationPage = () => {
  const orderDetails = {
    orderNumber: 'FO-12042024-001',
    orderDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    items: [
      {
        id: 1,
        name: 'Custom Crochet Top',
        description: 'Color: Lilac, Size: M',
        price: 75.00,
        quantity: 1,
        image: '/crochet.jpg',
      },
      {
        id: 2,
        name: 'Henna Garden Sleeve',
        description: 'Intricate floral design',
        price: 120.00,
        quantity: 1,
        image: '/mehendi.jpg',
      },
    ],
    shippingAddress: {
      name: 'John Doe',
      addressLine1: '123 Craft Lane',
      city: 'Artisanville',
      state: 'CA',
      zip: '98765',
    },
    paymentMethod: '**** **** **** 4242',
  };

  const subtotal = orderDetails.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 10.00;
  const taxes = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + taxes;

  return (
    <main className="bg-background text-foreground min-h-screen pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto bg-card p-8 md:p-12 rounded-lg border border-border shadow-lg">
          
          <div className="text-center mb-10">
            <CheckCircle size={60} className="text-green-500 mx-auto mb-4" />
            <h1 className="font-serif text-4xl md:text-5xl font-bold">Thank You for Your Order!</h1>
            <p className="mt-4 text-muted-foreground">Your order has been confirmed. A summary is shown below.</p>
          </div>

          <div className="border-t border-b border-border py-6 my-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-sm text-muted-foreground">Order Number</p>
                <p className="font-semibold">{orderDetails.orderNumber}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Order Date</p>
                <p className="font-semibold">{orderDetails.orderDate}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Shipping To</p>
                <p className="font-semibold">{orderDetails.shippingAddress.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Payment Method</p>
                <p className="font-semibold">{orderDetails.paymentMethod}</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
            <div className="space-y-6">
              {orderDetails.items.map(item => (
                <div key={item.id} className="flex items-center gap-6">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                  <div className="flex-grow">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${item.price.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-6">
            <div className="space-y-3 max-w-sm ml-auto">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes</span>
                <span>${taxes.toFixed(2)}</span>
              </div>
              <div className="border-t border-border my-2"></div>
              <div className="flex justify-between font-bold text-xl">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col md:flex-row gap-4 justify-between items-center">
            <Link href="/gallery" className="w-full md:w-auto bg-primary text-primary-foreground text-center px-8 py-3 rounded-full font-semibold hover:bg-primary/90 transition-all">
              Continue Shopping
            </Link>
            <button className="w-full md:w-auto flex items-center justify-center gap-2 border border-border px-8 py-3 rounded-full hover:bg-muted transition-colors">
              <Printer size={18} />
              Print Receipt
            </button>
          </div>

        </div>
      </div>
    </main>
  );
};

export default OrderConfirmationPage;
