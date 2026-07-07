"use client";
import React, { useEffect } from "react";
import Link from 'next/link';
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import OtpModal from "@/components/auth/OtpModal";
import PaymentForm from "@/components/checkout/PaymentForm";
import { useState } from "react";

export default function Home() {
  const { isLoggedIn, loading } = useAuth();
  const router = useRouter();
  const [isOtpOpen, setIsOtpOpen] = useState(false);
  const [isCapacitor, setIsCapacitor] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const ua = navigator.userAgent || navigator.vendor || window.opera;
      if (window.Capacitor || ua.includes("wv") || (ua.includes("Android") && ua.includes("Version/"))) {
        setIsCapacitor(true);
      }
    }
  }, []);

  useEffect(() => {
    // If not logged in, we can let them browse but encourage OTP sign in
  }, [isLoggedIn, loading, router]);

  if (loading) {
    return (
      <main className="bg-background min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </main>
    );
  }

  return (
    <div className="min-h-screen">

      <Navbar />

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 lg:py-32">

        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >

            <span className="inline-block px-5 py-2 rounded-full bg-secondary text-secondary-foreground font-semibold tracking-widest uppercase text-xs mb-8">
              Handmade with Love
            </span>

            <h1 className="text-6xl lg:text-7xl font-playfair font-bold leading-tight text-foreground">
              Customized
              <br />
              <span className="text-primary italic">
                Crochet &
              </span>
              <br />
              Henna
            </h1>

            <div className="inline-block mt-6 bg-secondary px-6 py-3 rounded-xl">
              <p className="text-3xl italic text-foreground">
                by Farah Origin
              </p>
            </div>

            <p className="mt-8 text-lg text-muted-foreground leading-8 max-w-xl">
              Handmade crochet gifts, elegant mehendi, customized bouquets,
              personalized gifts and premium handcrafted creations made with
              love for every special occasion.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <span className="bg-pink-100 text-pink-700 px-4 py-2 rounded-full font-medium text-sm">✨ Made just for you, to make every moment special</span>
              <span className="bg-pink-100 text-pink-700 px-4 py-2 rounded-full font-medium text-sm">🎉 Perfect for Birthdays & Special Moments</span>
              <span className="bg-pink-100 text-pink-700 px-4 py-2 rounded-full font-medium text-sm">🧶 Mehandi & Woolen</span>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">

              <Link href="/view-collection" className="bg-primary text-primary-foreground px-8 py-4 rounded-xl hover:bg-primary/90 transition">
                View Collection
              </Link>

              <button onClick={() => setIsOtpOpen(true)} className="border border-primary text-foreground px-8 py-4 rounded-xl hover:bg-secondary transition">
                Sign In (OTP)
              </button>

              {!isCapacitor && (
                <a href="/farah-origin.apk" download className="bg-green-600 text-white px-8 py-4 rounded-xl hover:bg-green-700 transition">
                  Download APK
                </a>
              )}

            </div>

          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card rounded-3xl shadow-xl border border-border p-10"
          >

            <h2 className="text-4xl text-center font-bold text-card-foreground">
              Our Services
            </h2>

            <div className="mt-8 space-y-4">
              <div className="rounded-xl bg-secondary p-5 flex items-center gap-3">
                <input type="checkbox" checked readOnly className="w-5 h-5 text-pink-500 rounded border-gray-300 focus:ring-pink-500" />
                Handmade Crochet
              </div>

              <div className="rounded-xl bg-secondary p-5 flex items-center gap-3">
                <input type="checkbox" checked readOnly className="w-5 h-5 text-pink-500 rounded border-gray-300 focus:ring-pink-500" />
                Mehandi
              </div>
            </div>

            <div className="mt-8 p-6 bg-pink-50 rounded-2xl border border-pink-100">
              <h3 className="text-xl font-bold mb-4 text-pink-900">Order Now on</h3>
              <div className="space-y-3">
                <p className="flex items-center gap-3 text-lg text-gray-800">
                  <span className="text-2xl">🟩</span> WhatsApp: 8438440625
                </p>
                <p className="flex items-center gap-3 text-lg text-gray-800">
                  <span className="text-2xl">📸</span> Instagram: @farah_origin
                </p>
                <p className="flex items-center gap-3 text-lg text-gray-800">
                  <span className="text-2xl">📍</span> Location: ERODE
                </p>
                <p className="text-sm text-pink-700 mt-2 font-medium">DM us for orders & enquiries</p>
              </div>
            </div>

            <div className="mt-8">
              <PaymentForm amount={499} onSuccess={() => alert("Payment successful!")} />
            </div>

          </motion.div>

        </div>

      </section>

      {/* Collection */}

      <section className="container mx-auto px-6 pb-24">

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >

          <p className="uppercase tracking-widest text-primary">
            Handmade Collection
          </p>

          <h2 className="text-5xl mt-3 font-bold text-foreground">
            Crafted with Love
          </h2>

        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -10 }}
            className="bg-card rounded-3xl shadow-lg overflow-hidden transition-all duration-300"
          >
            <img src="/crochet.jpg" className="w-full h-72 object-cover" alt="Crochet" />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-card-foreground">Crochet</h3>
              <p className="mt-3 text-muted-foreground">Handmade dolls, flowers, keychains, bouquets and gifts.</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -10 }}
            className="bg-card rounded-3xl shadow-lg overflow-hidden transition-all duration-300"
          >
            <img src="/mehendi.jpg" className="w-full h-72 object-cover" alt="Mehendi" />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-card-foreground">Mehendi</h3>
              <p className="mt-3 text-muted-foreground">Bridal, engagement and festive mehendi designs.</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ y: -10 }}
            className="bg-card rounded-3xl shadow-lg overflow-hidden transition-all duration-300"
          >
            <img src="/bouquet.jpg" className="w-full h-72 object-cover" alt="Bouquet" />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-card-foreground">Flower Bouquet</h3>
              <p className="mt-3 text-muted-foreground">Beautiful everlasting crochet flower bouquets.</p>
            </div>
          </motion.div>

        </div>

      </section>

      {/* Footer Tags from Poster */}
      <footer className="bg-pink-100 py-6 border-t border-pink-200">
        <div className="container mx-auto px-6 flex flex-wrap justify-between items-center text-pink-800 font-semibold text-sm">
          <span>Handmade with care</span>
          <span>Perfect gifts</span>
          <span>Unique & personalized</span>
          <span>Cute designs</span>
        </div>
      </footer>

      <OtpModal isOpen={isOtpOpen} onClose={() => setIsOtpOpen(false)} />
    </div>
  );
}