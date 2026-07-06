"use client";
import React from 'react';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import BackButton from '@/components/BackButton';
import { motion } from 'framer-motion';

const CartPage = () => {
  const { items: cartItems, updateQuantity, removeFromCart } = useCart();

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 10.00 : 0;
  const total = subtotal + shipping;

  return (
    <main className="bg-background/50 text-foreground min-h-screen pt-20 relative">
      <BackButton />
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 py-16"
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-12">
            <ShoppingCart size={40} className="text-primary" />
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-center">Your Cart</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {cartItems.length > 0 ? (
                  cartItems.map(item => (
                    <div key={item.id} className="flex items-center gap-6 bg-card p-4 rounded-lg border border-border">
                      <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md" />
                      <div className="flex-grow">
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">₹{item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-border rounded-md">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 hover:bg-muted transition-colors"><Minus size={16} /></button>
                          <span className="px-4 text-lg">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 hover:bg-muted transition-colors"><Plus size={16} /></button>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 bg-card rounded-lg border border-border">
                    <h2 className="text-2xl font-semibold">Your cart is empty</h2>
                    <p className="mt-2 text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
                    <Link href="/gallery" className="mt-6 inline-block bg-primary text-primary-foreground px-8 py-3 rounded-full font-semibold hover:bg-primary/90 transition-all">
                      Start Shopping
                    </Link>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-card p-8 rounded-lg border border-border sticky top-28">
                <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>₹{shipping.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-border my-4"></div>
                  <div className="flex justify-between font-bold text-xl">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>
                <Link href="/checkout">
                  <button 
                    className="w-full mt-8 bg-primary text-primary-foreground py-3 rounded-full font-semibold hover:bg-primary/90 transition-all text-lg disabled:bg-muted disabled:cursor-not-allowed"
                    disabled={cartItems.length === 0}
                  >
                    Proceed to Checkout
                  </button>
                </Link>
                <Link href="/gallery" className="w-full mt-4 inline-block text-center text-primary font-semibold hover:underline">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </main>
  );
};

export default CartPage;
