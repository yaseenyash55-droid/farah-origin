"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Home, Grid, ShoppingCart, User, Download } from "lucide-react";

export default function BottomNavigation() {
  const pathname = usePathname();
  const { items } = useCart();
  const { isLoggedIn, user } = useAuth();
  const [isCapacitor, setIsCapacitor] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const ua = navigator.userAgent || navigator.vendor || window.opera;
      if (window.Capacitor || ua.includes("wv") || (ua.includes("Android") && ua.includes("Version/"))) {
        setIsCapacitor(true);
      }
    }
  }, []);
  
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  let navItems = [
    { href: "/", label: "Home", icon: <Home size={20} /> },
    { href: "/view-collection", label: "Shop", icon: <Grid size={20} /> },
    { href: "/cart", label: "Cart", icon: <ShoppingCart size={20} />, badge: cartCount },
    { href: "/login", label: "Account", icon: <User size={20} /> },
  ];

  if (!isCapacitor) {
    navItems.push({ href: "/download", label: "App", icon: <Download size={20} /> });
  }

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card/90 backdrop-blur-lg border-t border-border h-16 flex justify-around items-center z-50 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] print:hidden">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        
        return (
          <Link 
            key={item.href} 
            href={item.href}
            className={`flex flex-col items-center justify-center flex-grow h-full relative transition-colors ${
              isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {/* Active Indicator Top Line */}
            {isActive && (
              <span className="absolute top-0 w-8 h-0.5 bg-primary rounded-full"></span>
            )}
            
            {/* Icon & Badge container */}
            <div className="relative flex items-center justify-center">
              {item.icon}
              {/* Badge for Cart Count */}
              {item.badge !== undefined && item.badge > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {item.badge}
                </span>
              )}
            </div>
            
            {/* Label */}
            <span className="text-[10px] font-medium mt-1 tracking-wide">
              {item.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
