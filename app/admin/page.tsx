"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";
import { X, Search, Filter, IndianRupee, Package, Clock, CheckCircle } from "lucide-react";

type Order = {
  id: string;
  amount: number;
  contact: string;
  status: string;
  date: string;
  items: any[];
  shippingAddress: any;
  paymentMethod: string;
};

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const { getApiUrl, getAuthHeaders } = useAuth();

  useEffect(() => {
    const fetchOrders = () => {
      fetch(getApiUrl("/api/orders"), { headers: getAuthHeaders() })
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            const mappedOrders = data.map((o: any) => ({
              id: o.id,
              amount: o.pricing?.total || 0,
              contact: o.recipient_email || o.user_phone || "customer@example.com",
              status: o.status,
              date: o.order_date,
              items: o.items || [],
              shippingAddress: o.shipping_address || {},
              paymentMethod: o.payment_method || "Online",
            }));
            setOrders(mappedOrders);
          }
        })
        .catch((e) => console.error("Error fetching admin orders:", e))
        .finally(() => setLoading(false));
    };

    fetchOrders();
    const interval = setInterval(fetchOrders, 10000);
    return () => clearInterval(interval);
  }, []);

  const updateStatus = async (orderId: string, newStatus: string) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)));
    
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }

    try {
      const res = await fetch(getApiUrl("/api/orders"), {
        method: "PUT",
        headers: getAuthHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify({ id: orderId, status: newStatus }),
      });
      if (!res.ok) throw new Error("Failed to update status");
    } catch (e) {
      console.error("Error updating status:", e);
      alert("Failed to update order status.");
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.contact.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalRevenue = orders.reduce((sum, o) => sum + (o.status !== 'cancelled' ? o.amount : 0), 0);
  const pendingCount = orders.filter(o => o.status === 'placed' || o.status === 'processing').length;

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-background">Loading Admin Dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background">
      <Navbar />

      <main className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold font-playfair">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage orders and store settings</p>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/admin/inventory"
              className="bg-primary text-primary-foreground px-5 py-2.5 rounded-lg font-medium text-sm hover:bg-primary/90 transition shadow-sm"
            >
              Manage Inventory
            </a>
          </div>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-card p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-border flex items-center gap-4">
            <div className="p-4 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-xl">
              <IndianRupee size={24} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium">Total Revenue</p>
              <h3 className="text-2xl font-bold">₹{totalRevenue}</h3>
            </div>
          </div>
          <div className="bg-white dark:bg-card p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-border flex items-center gap-4">
            <div className="p-4 bg-pink-100 dark:bg-pink-900/30 text-pink-600 rounded-xl">
              <Package size={24} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium">Total Orders</p>
              <h3 className="text-2xl font-bold">{orders.length}</h3>
            </div>
          </div>
          <div className="bg-white dark:bg-card p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-border flex items-center gap-4">
            <div className="p-4 bg-orange-100 dark:bg-orange-900/30 text-orange-600 rounded-xl">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium">Pending Processing</p>
              <h3 className="text-2xl font-bold">{pendingCount}</h3>
            </div>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="bg-white dark:bg-card rounded-t-2xl border-x border-t border-gray-100 dark:border-border p-4 flex flex-col sm:flex-row gap-4 items-center justify-between mt-8 shadow-sm">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by Order ID or Customer Contact..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-muted border border-gray-200 dark:border-border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:outline-none transition"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter size={18} className="text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full sm:w-auto bg-gray-50 dark:bg-muted border border-gray-200 dark:border-border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="placed">Placed</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white dark:bg-card rounded-b-2xl shadow-sm border border-gray-100 dark:border-border overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-gray-50 dark:bg-muted/50 border-b border-gray-100 dark:border-border text-gray-500 dark:text-gray-400 text-sm">
                <th className="p-4 font-semibold">Order ID</th>
                <th className="p-4 font-semibold">Date</th>
                <th className="p-4 font-semibold">Customer</th>
                <th className="p-4 font-semibold">Amount</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">
                    No orders found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-50 dark:border-border hover:bg-gray-50/50 dark:hover:bg-muted/30 transition">
                    <td className="p-4 font-medium text-gray-900 dark:text-gray-100">{order.id}</td>
                    <td className="p-4 text-gray-500 dark:text-gray-400">{new Date(order.date).toLocaleString()}</td>
                    <td className="p-4 text-gray-600 dark:text-gray-300">{order.contact}</td>
                    <td className="p-4 font-bold text-primary">₹{order.amount}</td>
                    <td className="p-4">
                      <select
                        value={order.status}
                        onChange={(e) => updateStatus(order.id, e.target.value)}
                        className={`bg-white dark:bg-card border border-gray-200 dark:border-border rounded-lg px-3 py-1.5 text-sm font-medium focus:ring-2 focus:ring-primary focus:outline-none ${
                          order.status === 'delivered' ? 'text-green-600' :
                          order.status === 'shipped' ? 'text-blue-600' :
                          order.status === 'processing' ? 'text-orange-600' :
                          'text-gray-600 dark:text-gray-300'
                        }`}
                      >
                        <option value="placed">Placed</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="text-primary hover:text-primary-foreground hover:bg-primary px-3 py-1.5 rounded-lg border border-primary transition text-sm font-medium"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-card rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-100 dark:border-border animate-in zoom-in-95 duration-200">
            <div className="sticky top-0 bg-white dark:bg-card p-6 border-b border-gray-100 dark:border-border flex justify-between items-center z-10">
              <div>
                <h2 className="text-xl font-bold font-playfair">Order Details</h2>
                <p className="text-sm text-muted-foreground">{selectedOrder.id}</p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-muted rounded-full transition"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-8">
              {/* Customer Info */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Customer Info</h3>
                  <p className="font-medium">{selectedOrder.shippingAddress?.name || "N/A"}</p>
                  <p className="text-muted-foreground">{selectedOrder.contact}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Shipping Address</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {selectedOrder.shippingAddress?.addressLine1}<br />
                    {selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.state} {selectedOrder.shippingAddress?.zip}
                  </p>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Items Ordered</h3>
                <div className="space-y-4">
                  {selectedOrder.items?.map((item: any, idx: number) => (
                    <div key={idx} className="flex gap-4 items-center bg-gray-50 dark:bg-muted/50 p-4 rounded-xl border border-gray-100 dark:border-border">
                      <div className="w-16 h-16 rounded-lg bg-white dark:bg-card border border-gray-100 dark:border-border overflow-hidden shrink-0">
                        {item.image ? (
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-300"><Package size={24} /></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 dark:text-gray-100 truncate">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity} × ₹{item.price}</p>
                      </div>
                      <div className="font-bold text-gray-900 dark:text-gray-100">
                        ₹{item.price * item.quantity}
                      </div>
                    </div>
                  ))}
                  {(!selectedOrder.items || selectedOrder.items.length === 0) && (
                    <p className="text-sm text-gray-500 italic">No item details recorded for this older order.</p>
                  )}
                </div>
              </div>

              {/* Summary */}
              <div className="border-t border-gray-100 dark:border-border pt-6">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total Paid ({selectedOrder.paymentMethod})</span>
                  <span className="text-primary">₹{selectedOrder.amount}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-between bg-gray-50 dark:bg-muted/30 p-4 rounded-xl border border-gray-100 dark:border-border gap-4">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <span className="text-sm font-medium">Update Status:</span>
                  <select
                    value={selectedOrder.status}
                    onChange={(e) => updateStatus(selectedOrder.id, e.target.value)}
                    className="bg-white dark:bg-card border border-gray-200 dark:border-border rounded-lg px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-primary focus:outline-none flex-1"
                  >
                    <option value="placed">Placed</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                {selectedOrder.status === 'delivered' && (
                  <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
                    <CheckCircle size={16} /> Order Complete
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
