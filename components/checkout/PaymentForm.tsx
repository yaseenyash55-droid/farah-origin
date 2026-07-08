"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useAuth } from "@/context/AuthContext";

interface PaymentFormProps {
  amount: number;
  onSuccess?: (orderId: string) => void;
}

export default function PaymentForm({ amount, onSuccess }: PaymentFormProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { getApiUrl, getAuthHeaders } = useAuth();

  const handlePayment = async () => {
    setLoading(true);
    
    try {
      if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID === "rzp_test_dummykey") {
        alert("TEST MODE: Simulating payment success since no real Razorpay key is configured.");
        const internalOrderId = `FO-${Math.floor(100000 + Math.random() * 900000)}`;
        
        // Save to Supabase using new API
        await fetch(getApiUrl("/api/orders"), {
          method: "POST",
          headers: getAuthHeaders({ "Content-Type": "application/json" }),
          body: JSON.stringify({
            orderNumber: internalOrderId,
            orderDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
            items: [{ id: "custom", name: "Custom Farah Origin Order", price: amount, quantity: 1, image: "/logo.png" }],
            shippingAddress: { name: "Direct Payment", phone: "N/A", addressLine1: "Online Order", city: "N/A", state: "N/A", zip: "N/A" },
            paymentMethod: "Razorpay (Test)",
            pricing: { subtotal: amount, shipping: 0, taxes: 0, total: amount },
            emailNotificationSent: false
          })
        });

        if (onSuccess) onSuccess(internalOrderId);
        router.push(`/thank-you?orderId=${internalOrderId}`);
        setLoading(false);
        return;
      }

      // 1. Create order on our backend (which uses Razorpay)
      const res = await fetch(getApiUrl("/api/checkout/create-order"), {
        method: "POST",
        headers: getAuthHeaders({ "Content-Type": "application/json" }),
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
          const internalOrderId = `FO-${Math.floor(100000 + Math.random() * 900000)}`;
          
          // Save to Supabase using new API
          await fetch(getApiUrl("/api/orders"), {
            method: "POST",
            headers: getAuthHeaders({ "Content-Type": "application/json" }),
            body: JSON.stringify({
              orderNumber: internalOrderId,
              orderDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
              items: [{ id: "custom", name: "Custom Farah Origin Order", price: amount, quantity: 1, image: "/logo.png" }],
              shippingAddress: { name: "Direct Payment", phone: "N/A", addressLine1: "Online Order", city: "N/A", state: "N/A", zip: "N/A" },
              paymentMethod: "Razorpay",
              pricing: { subtotal: amount, shipping: 0, taxes: 0, total: amount },
              emailNotificationSent: false
            })
          });

          if (onSuccess) {
            onSuccess(internalOrderId);
          }
          router.push(`/thank-you?orderId=${internalOrderId}`);
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
