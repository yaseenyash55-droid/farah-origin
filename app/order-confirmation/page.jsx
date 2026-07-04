"use client";
import React, { useState, useEffect } from "react";
import { 
  CheckCircle, 
  Printer, 
  ArrowLeft, 
  Calendar, 
  User, 
  CreditCard, 
  MapPin, 
  Mail, 
  Truck, 
  Check, 
  Eye, 
  Package, 
  ChevronRight 
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function OrderConfirmationPage() {
  const [order, setOrder] = useState(null);
  const [showEmailPreview, setShowEmailPreview] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedOrder = localStorage.getItem("lastOrder");
      if (savedOrder) {
        try {
          setOrder(JSON.parse(savedOrder));
        } catch (e) {
          console.error("Error parsing saved order:", e);
        }
      }
    }
  }, []);

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  // Fallback data if no order is found in local storage
  const fallbackOrder = {
    orderNumber: "FO-12042024-001",
    orderDate: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
    items: [
      {
        id: 1,
        name: "Custom Crochet Top",
        description: "Color: Lilac, Size: M",
        price: 75.00,
        quantity: 1,
        image: "/crochet.jpg"
      },
      {
        id: 2,
        name: "Henna Garden Sleeve",
        description: "Intricate floral design",
        price: 120.00,
        quantity: 1,
        image: "/mehendi.jpg"
      }
    ],
    shippingAddress: {
      name: "Yash",
      addressLine1: "Coimbatore, Tamilnadu",
      city: "Mettupalayam",
      state: "TN",
      zip: "641305",
      phone: "9876543210"
    },
    paymentMethod: "Cash on Delivery",
    pricing: {
      subtotal: 195.00,
      shipping: 10.00,
      taxes: 15.60,
      total: 220.60
    },
    emailNotificationSent: true,
    recipientEmail: "yash@example.com"
  };

  const activeOrder = order || fallbackOrder;

  // Calculate delivery date (current date + 5 days)
  const getDeliveryDateString = () => {
    const d = new Date();
    d.setDate(d.getDate() + 5);
    return d.toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <main className="bg-background text-foreground min-h-screen pt-20 print:pt-0">
      <Navbar />

      <div className="container mx-auto px-4 py-16 max-w-4xl print:py-4">
        
        {/* Receipt Container */}
        <div className="bg-card border border-border p-8 md:p-12 rounded-3xl shadow-xl space-y-8 print:border-none print:shadow-none print:p-0">
          
          {/* Header Status (Hidden on print) */}
          <div className="text-center pb-8 border-b border-border print:hidden">
            <CheckCircle size={64} className="text-green-500 mx-auto mb-4 animate-pulse" />
            <h1 className="font-playfair text-3xl md:text-5xl font-bold text-foreground">
              Order Confirmed!
            </h1>
            <p className="mt-3 text-muted-foreground text-sm max-w-md mx-auto">
              Thank you for shopping with Farah Origin. Your customized order has been successfully placed.
            </p>

            {/* Email Invoice Alert */}
            {activeOrder.emailNotificationSent && (
              <div className="mt-6 inline-flex items-center gap-3 bg-green-500/10 border border-green-500/20 text-green-700 px-5 py-3 rounded-2xl text-xs font-semibold max-w-xl text-left">
                <Mail className="flex-shrink-0 text-green-600 animate-bounce" size={20} />
                <div>
                  <span className="font-bold block">Invoice & Tracking Link Sent!</span>
                  We sent a confirmation email to <strong className="text-primary">{activeOrder.recipientEmail}</strong>. Use it to track package updates.
                  <button 
                    onClick={() => setShowEmailPreview(!showEmailPreview)}
                    className="text-primary hover:underline font-bold ml-1.5 flex items-center gap-1 mt-1 hover:text-primary/80"
                  >
                    <Eye size={12} /> {showEmailPreview ? "Hide Email Preview" : "View Email Preview"}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Email Preview Modal/Section (Hidden on print) */}
          {showEmailPreview && activeOrder.emailNotificationSent && (
            <div className="bg-muted/50 border border-border p-6 rounded-2xl space-y-4 print:hidden animate-fadeIn text-sm">
              <div className="flex justify-between items-center border-b pb-3 text-xs text-muted-foreground">
                <span><strong>From:</strong> updates@farahorigin.com</span>
                <span><strong>To:</strong> {activeOrder.recipientEmail}</span>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-base text-foreground">Order Confirmation & Invoice - {activeOrder.orderNumber}</h4>
                <p className="text-muted-foreground text-xs">Hi {activeOrder.shippingAddress.name},</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Your customized handmade crochet and henna order has been received! Our artisans are currently crafting your items. You can check shipping progress online using our tracking system.
                </p>
                <div className="bg-card p-4 rounded-xl border space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span>Order Total:</span>
                    <span>₹{activeOrder.pricing.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs font-semibold">
                    <span>Payment Method:</span>
                    <span>{activeOrder.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between text-xs text-primary font-bold">
                    <span>Tracking Number:</span>
                    <span>TRK-{activeOrder.orderNumber.slice(3)}-IND</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Print Title (Only visible on print) */}
          <div className="hidden print:block text-center border-b pb-6 mb-6">
            <h1 className="font-playfair text-3xl font-bold uppercase tracking-wider text-primary">Farah Origin</h1>
            <p className="text-xs text-muted-foreground mt-1">Aesthetic Crochet & Henna Atelier</p>
            <h2 className="text-lg font-semibold mt-4">Order Invoice & Summary</h2>
          </div>

          {/* FLIPKART-STYLE ORDER TRACKING TIMELINE */}
          <div className="space-y-4 pt-2">
            <h3 className="font-bold text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Truck size={14} className="text-primary" /> Track Order Status
            </h3>
            
            <div className="bg-background border border-border p-6 md:p-8 rounded-2xl shadow-sm">
              {/* Timeline graphic */}
              <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-2">
                
                {/* Horizontal Progress line (desktop only) */}
                <div className="absolute left-6 right-6 top-[22px] h-1 bg-muted -z-10 hidden md:block">
                  <div className="h-full w-1/3 bg-green-500"></div> {/* Line completed up to 'Packed' */}
                </div>

                {/* Node 1: Ordered */}
                <div className="flex md:flex-col items-center gap-4 md:gap-2 md:text-center flex-1">
                  <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-sm shadow-md ring-4 ring-green-100">
                    <Check size={18} />
                  </div>
                  <div>
                    <span className="font-bold text-sm block">Ordered</span>
                    <span className="text-[10px] text-muted-foreground block mt-0.5">{activeOrder.orderDate}</span>
                  </div>
                </div>

                {/* Node 2: Packed */}
                <div className="flex md:flex-col items-center gap-4 md:gap-2 md:text-center flex-1">
                  <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-sm shadow-md ring-4 ring-green-100">
                    <Package size={16} />
                  </div>
                  <div>
                    <span className="font-bold text-sm block">Packed & Confirmed</span>
                    <span className="text-[10px] text-muted-foreground block mt-0.5">Sellers are processing</span>
                  </div>
                </div>

                {/* Node 3: Shipped */}
                <div className="flex md:flex-col items-center gap-4 md:gap-2 md:text-center flex-1">
                  <div className="w-10 h-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-bold text-sm border-2 border-border">
                    3
                  </div>
                  <div>
                    <span className="font-semibold text-sm block text-muted-foreground">Shipped</span>
                    <span className="text-[10px] text-muted-foreground block mt-0.5">Expected in 3 days</span>
                  </div>
                </div>

                {/* Node 4: Delivered */}
                <div className="flex md:flex-col items-center gap-4 md:gap-2 md:text-center flex-1">
                  <div className="w-10 h-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-bold text-sm border-2 border-border">
                    4
                  </div>
                  <div>
                    <span className="font-semibold text-sm block text-muted-foreground">Delivered</span>
                    <span className="text-[10px] text-muted-foreground block mt-0.5">Expected: {activeOrder.orderDate} + 5 days</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Quick Invoice Details Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-secondary/15 p-6 rounded-2xl border border-border/60 print:bg-transparent print:border print:p-4">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                Order Number
              </span>
              <span className="font-mono text-sm font-bold block text-foreground">
                {activeOrder.orderNumber}
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                <Calendar size={12} className="text-primary" /> Order Date
              </span>
              <span className="text-sm font-semibold block text-foreground">
                {activeOrder.orderDate}
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                <User size={12} className="text-primary" /> Delivery To
              </span>
              <span className="text-sm font-semibold block text-foreground truncate">
                {activeOrder.shippingAddress.name}
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                <CreditCard size={12} className="text-primary" /> Payment
              </span>
              <span className="text-sm font-semibold block text-foreground">
                {activeOrder.paymentMethod}
              </span>
            </div>
          </div>

          {/* Main Info Columns (Address vs Delivery Time) */}
          <div className="grid md:grid-cols-2 gap-8 pt-4">
            
            {/* Delivery Address Card */}
            <div className="space-y-3">
              <h3 className="font-bold text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <MapPin size={14} className="text-primary" /> Delivery Address
              </h3>
              <div className="bg-background border border-border p-5 rounded-2xl text-sm leading-relaxed text-foreground space-y-1 shadow-sm">
                <strong className="block text-base mb-1">{activeOrder.shippingAddress.name}</strong>
                <p>{activeOrder.shippingAddress.addressLine1}</p>
                <p>{activeOrder.shippingAddress.city}, {activeOrder.shippingAddress.state} - {activeOrder.shippingAddress.zip}</p>
                <div className="pt-2 mt-2 border-t border-border/60 text-xs text-muted-foreground">
                  Contact: <span className="font-mono text-foreground font-semibold">{activeOrder.shippingAddress.phone}</span>
                </div>
              </div>
            </div>

            {/* Estimated Delivery Time */}
            <div className="space-y-3">
              <h3 className="font-bold text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <Truck size={14} className="text-primary" /> Estimated Delivery
              </h3>
              <div className="bg-background border border-border p-5 rounded-2xl text-sm leading-relaxed text-foreground space-y-2 shadow-sm">
                <p className="font-semibold text-green-600 flex items-center gap-1.5">
                  📅 Arriving {getDeliveryDateString()}
                </p>
                <p className="text-muted-foreground text-xs">
                  Your customized handmade crochet items and henna packages will be dispatched with priority care. A tracking SMS notification has been scheduled.
                </p>
              </div>
            </div>

          </div>

          {/* Order items */}
          <div className="space-y-4 pt-4">
            <h3 className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Items Purchased</h3>
            <div className="border border-border rounded-2xl overflow-hidden shadow-sm">
              <div className="divide-y divide-border bg-background">
                {activeOrder.items.map(item => (
                  <div key={item.id} className="flex items-center gap-5 p-5">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl border border-border" />
                    <div className="flex-grow">
                      <h4 className="font-semibold text-sm">{item.name}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-sm block">₹{item.price.toFixed(2)}</span>
                      <span className="text-xs text-muted-foreground">Qty: {item.quantity}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pricing Receipt details */}
          <div className="border-t border-border pt-6">
            <div className="max-w-xs ml-auto space-y-3 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span className="font-semibold text-foreground">₹{activeOrder.pricing.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping & Delivery</span>
                <span className="font-semibold text-green-600">
                  {activeOrder.pricing.shipping === 0 ? "FREE" : `₹${activeOrder.pricing.shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Taxes & GST (8%)</span>
                <span className="font-semibold text-foreground">₹{activeOrder.pricing.taxes.toFixed(2)}</span>
              </div>
              <div className="border-t border-border/80 my-2"></div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total Amount</span>
                <span className="text-primary font-bold">₹{activeOrder.pricing.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Navigation Action Footer (Hidden on print) */}
          <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row gap-4 justify-between items-center print:hidden">
            <Link 
              href="/gallery" 
              className="w-full md:w-auto flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-xl font-bold hover:bg-primary/95 transition shadow-md shadow-primary/10"
            >
              <ArrowLeft size={16} />
              Continue Shopping
            </Link>
            
            <button 
              onClick={handlePrint}
              className="w-full md:w-auto flex items-center justify-center gap-2 border border-border px-8 py-3.5 rounded-xl hover:bg-muted transition font-semibold"
            >
              <Printer size={16} />
              Print Receipt
            </button>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}
