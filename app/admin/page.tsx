"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

type Order = {
  id: string;
  amount: number;
  contact: string;
  status: string;
  date: string;
};

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this fetches from Supabase.
    // For now, we simulate fetching by reading all localStorage keys that start with "order_status_"
    const fetchOrders = () => {
      const loadedOrders: Order[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('order_status_')) {
          const id = key.replace('order_status_', '');
          const status = localStorage.getItem(key) || 'placed';
          
          let amount = 499;
          let contact = 'customer@example.com';
          let date = new Date().toISOString();
          
          const detailsStr = localStorage.getItem(`order_details_${id}`);
          if (detailsStr) {
            try {
              const details = JSON.parse(detailsStr);
              amount = details.amount || 499;
              contact = details.contact || 'customer@example.com';
              date = details.date || date;
            } catch (e) {}
          }
          
          loadedOrders.push({ id, status, amount, contact, date });
        }
      }
      
      // Sort by date newest first
      loadedOrders.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setOrders(loadedOrders);
      setLoading(false);
    };

    fetchOrders();
    
    // Poll every 5 seconds for new orders (simulating realtime DB)
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  const updateStatus = (orderId: string, newStatus: string) => {
    // In a real app, update Supabase here.
    localStorage.setItem(`order_status_${orderId}`, newStatus);
    
    // Optimistic UI update
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50">Loading Admin Dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <span className="bg-pink-100 text-pink-700 px-4 py-2 rounded-full font-medium text-sm">
            {orders.length} Total Orders
          </span>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm">
                <th className="p-4 font-semibold">Order ID</th>
                <th className="p-4 font-semibold">Date</th>
                <th className="p-4 font-semibold">Contact</th>
                <th className="p-4 font-semibold">Amount</th>
                <th className="p-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    No orders found. Once a customer pays via Razorpay, it will appear here.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition">
                    <td className="p-4 font-medium text-gray-900">{order.id}</td>
                    <td className="p-4 text-gray-500">{new Date(order.date).toLocaleString()}</td>
                    <td className="p-4 text-gray-600">{order.contact}</td>
                    <td className="p-4 font-bold text-pink-600">₹{order.amount}</td>
                    <td className="p-4">
                      <select 
                        value={order.status}
                        onChange={(e) => updateStatus(order.id, e.target.value)}
                        className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-pink-500 focus:outline-none"
                      >
                        <option value="placed">Order Placed</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
