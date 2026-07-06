"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";

interface PaymentFormProps {
  amount: number;
  onSuccess?: (orderId: string) => void;
}

export default function PaymentForm({ amount, onSuccess }: PaymentFormProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handlePayment = async () => {
    setLoading(true);
    
    try {
      // If we are in test mode without real keys, simulate a successful payment instantly
      if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID === "rzp_test_dummykey") {
        alert("TEST MODE: Simulating payment success since no real Razorpay key is configured.");
        const internalOrderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
        localStorage.setItem(`order_status_${internalOrderId}`, 'placed');
        localStorage.setItem(`order_details_${internalOrderId}`, JSON.stringify({
          amount,
          contact: 'test_user',
          date: new Date().toISOString()
        }));
        if (onSuccess) onSuccess(internalOrderId);
        router.push(`/track?orderId=${internalOrderId}`);
        setLoading(false);
        return;
      }

      // 1. Create order on our backend (which uses Razorpay)
      const res = await fetch("/api/checkout/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });
      
      const order = await res.json();
      
      if (!res.ok) {
        throw new Error(order.error || "Failed to create order");
      }

      // 2. Setup Razorpay Checkout options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_dummykey",
        amount: order.amount,
        currency: order.currency,
        name: "Farah Origin",
        description: "Handmade Crochet & Henna",
        order_id: order.orderId,
        handler: async function (response: any) {
          // In a real app, verify signature here
          console.log("Payment Successful!", response);
          
          // Generate an internal order ID
          const internalOrderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
          
          // We would normally save this to Supabase here
          // Fallback to localStorage for now
          localStorage.setItem(`order_status_${internalOrderId}`, 'placed');
          localStorage.setItem(`order_details_${internalOrderId}`, JSON.stringify({
            amount,
            contact: 'user', // We should capture contact info before payment, but this is a simplified flow
            date: new Date().toISOString()
          }));

          if (onSuccess) {
            onSuccess(internalOrderId);
          }
          router.push(`/track?orderId=${internalOrderId}`);
        },
        prefill: {
          name: "Customer",
          email: "customer@example.com",
          contact: "9999999999"
        },
        theme: {
          color: "#db2777" // Pink to match Farah Origin
        }
      };

      // 3. Open Razorpay Checkout
      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', function (response: any){
        alert("Payment Failed. Please try again.");
        console.error(response.error);
      });
      rzp.open();
      
    } catch (error) {
      console.error("Payment error:", error);
      alert("Error initiating payment. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <button
        onClick={handlePayment}
        disabled={loading}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 rounded-xl transition disabled:opacity-50 text-lg shadow-lg"
      >
        {loading ? "Preparing Secure Checkout..." : `Pay ₹${amount} & Order Now`}
      </button>
    </>
  );
}
