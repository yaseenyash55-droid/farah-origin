"use client";

import { useEffect, useState, Suspense } from "react";
import Navbar from "@/components/Navbar";
import { CheckCircle2, Circle, Truck, Package, PackageCheck } from "lucide-react";
import { useSearchParams } from "next/navigation";

type OrderStatus = 'placed' | 'processing' | 'shipped' | 'delivered';

const STATUS_STEPS = [
  { id: 'placed', label: 'Order Placed', icon: CheckCircle2 },
  { id: 'processing', label: 'Processing', icon: Package },
  { id: 'shipped', label: 'Shipped', icon: Truck },
  { id: 'delivered', label: 'Delivered', icon: PackageCheck },
];

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "Unknown";
  
  const [status, setStatus] = useState<OrderStatus>('placed');

  useEffect(() => {
    if (orderId === "Unknown") return;
    
    const checkStatus = () => {
      fetch(`/api/orders?id=${orderId}`)
        .then(res => res.json())
        .then(data => {
          if (data && data.status && data.status !== status) {
            setStatus(data.status as OrderStatus);
          }
        })
        .catch(e => console.error("Error fetching order status:", e));
    };
    
    // Initial check
    checkStatus();
    
    // Poll every 5 seconds for realtime DB updates
    const interval = setInterval(checkStatus, 5000);
    return () => clearInterval(interval);
  }, [orderId, status]);

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-pink-100 p-8">
      
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Track Your Order</h1>
        <p className="text-pink-600 font-medium">Order #{orderId}</p>
      </div>

      {/* Timeline */}
      <div className="relative mb-12">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 rounded-full hidden sm:block"></div>
        
        <div className="flex flex-col sm:flex-row justify-between relative z-10 gap-8 sm:gap-0">
          {STATUS_STEPS.map((step, index) => {
            const currentIndex = STATUS_STEPS.findIndex(s => s.id === status);
            const isCompleted = index <= currentIndex;
            const isCurrent = index === currentIndex;
            const Icon = step.icon;

            return (
              <div key={step.id} className="flex flex-row sm:flex-col items-center sm:w-1/4">
                <div className={`
                  w-12 h-12 rounded-full flex items-center justify-center shrink-0 border-4 bg-white
                  ${isCompleted ? 'border-pink-500 text-pink-500' : 'border-gray-200 text-gray-400'}
                  ${isCurrent ? 'scale-110 shadow-lg' : ''}
                  transition-all duration-300 z-10
                `}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="ml-4 sm:ml-0 sm:mt-4 text-left sm:text-center">
                  <p className={`font-bold ${isCompleted ? 'text-gray-900' : 'text-gray-400'}`}>
                    {step.label}
                  </p>
                  {isCurrent && (
                    <p className="text-sm text-pink-600 font-medium mt-1">Current Status</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-pink-50 rounded-2xl p-6 text-center">
        <h3 className="text-lg font-bold text-gray-900 mb-2">Need Help?</h3>
        <p className="text-gray-600 mb-4">Contact us via WhatsApp for live updates</p>
        <p className="text-pink-700 font-bold">8438440625</p>
      </div>



    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-6 py-12 max-w-3xl">
        <Suspense fallback={<div>Loading tracking details...</div>}>
          <TrackOrderContent />
        </Suspense>
      </main>
    </div>
  );
}
