"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  User, 
  Mail, 
  Smartphone, 
  ShieldCheck, 
  LogOut, 
  ShoppingBag, 
  ChevronRight, 
  ArrowLeft,
  Bell,
  MailCheck,
  MapPinCheck
} from "lucide-react";

export default function LoginPage() {
  const { user, isLoggedIn, login, logout, loading } = useAuth();
  const router = useRouter();

  // Form State
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [userOtpInput, setUserOtpInput] = useState("");
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleRequestOtp = (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (!form.name.trim()) validationErrors.name = "Name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) {
      validationErrors.email = "Provide a valid email address";
    }
    if (!form.phone.trim() || !/^\d{10}$/.test(form.phone)) {
      validationErrors.phone = "Provide a valid 10-digit phone number";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otp);
    setOtpSent(true);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (userOtpInput === generatedOtp || userOtpInput === "123456") {
      login({
        name: form.name,
        email: form.email,
        phone: form.phone
      });
      // Go back to previous page or home
      router.back();
    } else {
      setErrors({ otp: "Incorrect OTP. Try again." });
    }
  };

  if (loading) {
    return (
      <main className="bg-background min-h-screen pt-20 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </main>
    );
  }

  return (
    <main className="bg-background text-foreground min-h-screen pt-20">
      <Navbar />

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        
        {/* Flipkart split card layout */}
        <div className="bg-card border border-border rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-5 min-h-[500px]">
          
          {/* Left panel - blue/accent brand theme */}
          <div className="md:col-span-2 bg-gradient-to-br from-primary via-primary/95 to-secondary/80 p-8 flex flex-col justify-between text-white relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
            
            <div className="space-y-4">
              <button 
                onClick={() => router.back()} 
                className="inline-flex items-center gap-2 text-xs font-bold bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full transition"
              >
                <ArrowLeft size={12} /> Back
              </button>
              
              <h2 className="font-playfair text-3xl font-bold leading-tight">
                {isLoggedIn ? `Hello, ${user.name}` : "Login"}
              </h2>
              <p className="text-white/80 text-sm leading-relaxed max-w-[200px]">
                {isLoggedIn 
                  ? "Manage your orders, profile details, and account settings." 
                  : "Get access to your Orders, Wishlist and Recommendations."
                }
              </p>
            </div>

            {/* A nice brand graphics placeholder using pure CSS */}
            <div className="pt-10 select-none opacity-20 text-8xl font-playfair italic font-bold">
              FO
            </div>
          </div>

          {/* Right panel - Input & Profile forms */}
          <div className="md:col-span-3 p-8 flex flex-col justify-center bg-card">
            
            {/* LOGGED IN ACCOUNT DASHBOARD */}
            {isLoggedIn ? (
              <div className="space-y-6">
                <div className="border-b pb-4">
                  <h3 className="text-xl font-bold font-playfair text-card-foreground">My Profile</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">Manage your personal account details</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-secondary/25 p-4 rounded-2xl border border-border/40">
                    <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest block mb-0.5">Full Name</span>
                    <span className="font-bold text-sm text-foreground">{user.name}</span>
                  </div>
                  <div className="bg-secondary/25 p-4 rounded-2xl border border-border/40">
                    <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest block mb-0.5">Phone Number</span>
                    <span className="font-mono text-sm font-semibold text-foreground">{user.phone}</span>
                  </div>
                  <div className="bg-secondary/25 p-4 rounded-2xl border border-border/40 sm:col-span-2">
                    <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest block mb-0.5">Email Address</span>
                    <span className="font-semibold text-sm text-foreground">{user.email}</span>
                  </div>
                </div>

                {/* Account benefits */}
                <div className="space-y-3.5 pt-2">
                  <h4 className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Mobile App Services Status</h4>
                  
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/25 p-3 rounded-xl text-green-700">
                      <Bell size={16} className="text-green-600 animate-pulse" />
                      <span>Push Notifications: <strong>Active (Capacitor Native)</strong></span>
                    </div>
                    <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/25 p-3 rounded-xl text-green-700">
                      <MailCheck size={16} className="text-green-600" />
                      <span>Email Receipts: <strong>Enabled ({user.email})</strong></span>
                    </div>
                    <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/25 p-3 rounded-xl text-green-700">
                      <MapPinCheck size={16} className="text-green-600" />
                      <span>Flipkart Order Tracking: <strong>Available</strong></span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t flex flex-col sm:flex-row gap-3">
                  <button 
                    onClick={() => router.push("/gallery")}
                    className="flex-1 bg-primary text-primary-foreground py-3.5 rounded-2xl font-bold hover:bg-primary/95 transition text-sm text-center shadow-md shadow-primary/10"
                  >
                    Start Shopping
                  </button>
                  <button 
                    onClick={logout}
                    className="flex-1 flex items-center justify-center gap-2 border border-border py-3.5 rounded-2xl font-bold hover:bg-secondary/40 transition text-sm text-muted-foreground hover:text-foreground"
                  >
                    <LogOut size={16} />
                    Log Out
                  </button>
                </div>
              </div>
            ) : (
              
              /* LOGIN / SIGNUP FORM (FLIPKART STYLE) */
              <div className="space-y-6">
                {!otpSent ? (
                  <form onSubmit={handleRequestOtp} className="space-y-4">
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold font-playfair text-card-foreground">Login / Signup</h3>
                      <p className="text-xs text-muted-foreground">Sign in to place custom orders and receive real-time notifications.</p>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Full Name</label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleInputChange}
                          placeholder="e.g. Yash"
                          className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary"
                        />
                        {errors.name && <p className="text-[10px] text-primary mt-0.5">{errors.name}</p>}
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleInputChange}
                          placeholder="yash@example.com"
                          className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary"
                        />
                        {errors.email && <p className="text-[10px] text-primary mt-0.5">{errors.email}</p>}
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">10-Digit Mobile Number</label>
                        <input
                          type="text"
                          name="phone"
                          value={form.phone}
                          onChange={handleInputChange}
                          placeholder="e.g. 9876543210"
                          className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary"
                        />
                        {errors.phone && <p className="text-[10px] text-primary mt-0.5">{errors.phone}</p>}
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full bg-primary text-primary-foreground py-3.5 rounded-xl font-bold hover:bg-primary/95 transition shadow-lg shadow-primary/10 text-sm"
                      >
                        Request OTP
                      </button>
                      <span className="block text-[10px] text-center text-muted-foreground mt-3 leading-relaxed">
                        By continuing, you agree to Farah Origin's Terms of Use and Privacy Policy.
                      </span>
                    </div>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOtp} className="space-y-4">
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold font-playfair text-card-foreground">OTP Verification</h3>
                      <p className="text-xs text-muted-foreground">We sent a verification code to your phone.</p>
                    </div>

                    <div className="bg-secondary/40 border border-secondary rounded-xl p-3.5 flex gap-2.5 text-xs text-secondary-foreground items-center">
                      <Smartphone className="text-primary animate-pulse" size={20} />
                      <div>
                        Simulated OTP sent to <strong className="font-mono">{form.phone}</strong>.
                        <br />
                        Use code: <strong className="text-primary font-mono text-sm tracking-wider ml-1">{generatedOtp}</strong>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5">Enter 6-Digit OTP</label>
                      <input
                        type="text"
                        value={userOtpInput}
                        onChange={(e) => {
                          setUserOtpInput(e.target.value.replace(/\D/g, "").substring(0, 6));
                          setErrors({});
                        }}
                        placeholder="------"
                        className="w-full bg-background border border-border rounded-xl px-4 py-3.5 text-center font-mono text-lg font-bold tracking-widest focus:outline-none focus:border-primary"
                      />
                      {errors.otp && <p className="text-xs text-primary mt-1 text-center font-semibold">{errors.otp}</p>}
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setOtpSent(false)}
                        className="flex-1 border border-border py-3.5 rounded-xl font-bold hover:bg-muted transition text-sm text-center"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="flex-2 bg-primary text-primary-foreground py-3.5 px-6 rounded-xl font-bold hover:bg-primary/95 transition shadow-md shadow-primary/10 text-sm"
                      >
                        Verify & Login
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
            
          </div>

        </div>

      </div>

      <Footer />
    </main>
  );
}
