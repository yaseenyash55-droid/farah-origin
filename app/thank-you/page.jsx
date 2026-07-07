"use client";
import React, { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

function ThankYouContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "";

  // Optionally auto-redirect to order confirmation after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(`/order-confirmation${orderId ? `?orderId=${orderId}` : ''}`);
    }, 5000);
    return () => clearTimeout(timer);
  }, [router, orderId]);

  return (
    <div className="flex-grow flex items-center justify-center p-4">
      <div className="bg-card border border-border p-10 md:p-16 rounded-3xl shadow-xl text-center max-w-lg w-full animate-in fade-in zoom-in duration-500">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle size={50} className="text-green-600 animate-bounce" />
          </div>
        </div>
        
        <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-4 text-foreground">
          Thank You!
        </h1>
        
        <p className="text-lg text-muted-foreground mb-8">
          Thanks for ordering! Your customized items will be crafted with love.
        </p>

        <Link 
          href={`/order-confirmation${orderId ? `?orderId=${orderId}` : ''}`}
          className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl w-full"
        >
          View Order Receipt <ArrowRight size={18} />
        </Link>
        
        <p className="text-xs text-muted-foreground mt-6">
          Redirecting to your order details in a few seconds...
        </p>
      </div>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <main className="bg-background text-foreground min-h-screen pt-20 flex flex-col">
      <Navbar />
      <Suspense fallback={<div className="flex-grow flex items-center justify-center">Loading...</div>}>
        <ThankYouContent />
      </Suspense>
      <Footer />
    </main>
  );
}

