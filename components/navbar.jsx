"use client";
import React, { useState, useEffect } from "react";
import { Menu, X, ArrowLeft, User, LogOut } from "lucide-react";
import { ThemeToggleButton } from "./ThemeToggleButton";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";
  const { user, isLoggedIn, logout } = useAuth();

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  const navLinks = [
    { href: "/gallery", label: "Gallery" },
    { href: "/reviews", label: "Reviews" },
    { href: "/view-collection", label: "Collection" },
    { href: "/contact-us", label: "Contact" },
    { href: "/download", label: "Install App" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container flex justify-between items-center h-20">
        <div className="flex items-center gap-3">
          {!isHome && (
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-secondary rounded-full transition-colors text-foreground"
              aria-label="Go back"
            >
              <ArrowLeft size={20} />
            </button>
          )}
          <Link href="/" className="text-xl font-bold tracking-widest uppercase text-primary">
            Farah Origin
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 items-center">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm hover:text-primary transition-colors font-medium">
              {link.label}
            </Link>
          ))}
          <Link href="/order-now" className="text-sm hover:text-primary transition-colors font-medium">Order Now</Link>
          <Link href="/cart" className="text-sm hover:text-primary transition-colors font-medium">Cart</Link>
          
          {/* Desktop Auth State */}
          {isLoggedIn ? (
            <div className="flex items-center gap-3 bg-secondary/30 px-3.5 py-1.5 rounded-full border border-border text-sm">
              <User size={14} className="text-primary" />
              <span className="font-semibold text-xs truncate max-w-[80px]">{user.name}</span>
              <button 
                onClick={logout} 
                className="text-muted-foreground hover:text-primary transition-colors"
                title="Log Out"
              >
                <LogOut size={14} />
              </button>
            </div>
          ) : (
            <Link 
              href="/login" 
              className="text-sm border border-primary text-primary px-4 py-1.5 rounded-full font-semibold hover:bg-secondary transition"
            >
              Login
            </Link>
          )}

          <a href="https://wa.me/+919344665042" target="_blank" rel="noreferrer" className="bg-primary text-primary-foreground px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-primary/95 transition-all">
            Inquire Now
          </a>
          <ThemeToggleButton />
        </div>

        {/* Mobile Toggle Button */}
        <button className="md:hidden text-[var(--foreground)]" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Left Drawer - Opaque Card background */}
      {isOpen && (
        <div className="md:hidden fixed top-20 left-0 w-72 h-[calc(100vh-5rem)] bg-card border-r border-border flex flex-col items-start justify-between py-8 px-6 shadow-2xl z-50 animate-slideIn">
          <div className="w-full space-y-6 text-lg font-semibold flex flex-col">
            {isLoggedIn && (
              <div className="bg-secondary/40 border p-4 rounded-xl flex items-center gap-3 mb-2">
                <div className="bg-primary text-primary-foreground p-2 rounded-full">
                  <User size={20} />
                </div>
                <div className="overflow-hidden">
                  <span className="block text-sm font-bold text-foreground truncate">{user.name}</span>
                  <span className="block text-[10px] text-muted-foreground truncate">{user.phone}</span>
                </div>
              </div>
            )}

            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="hover:text-primary transition-colors py-1">
                {link.label}
              </Link>
            ))}
            <Link href="/order-now" onClick={() => setIsOpen(false)} className="hover:text-primary transition-colors py-1">Order Now</Link>
            <Link href="/cart" onClick={() => setIsOpen(false)} className="hover:text-primary transition-colors py-1">Cart</Link>
          </div>

          <div className="w-full space-y-4 pt-4 border-t border-border mt-auto">
            {isLoggedIn ? (
              <button 
                onClick={() => { logout(); setIsOpen(false); }}
                className="w-full flex items-center justify-center gap-2 bg-secondary text-secondary-foreground py-3 rounded-xl font-bold hover:bg-secondary/85 transition text-sm"
              >
                <LogOut size={16} />
                Log Out
              </button>
            ) : (
              <Link 
                href="/login" 
                onClick={() => setIsOpen(false)}
                className="w-full block text-center bg-secondary text-secondary-foreground py-3 rounded-xl font-bold hover:bg-secondary/85 transition text-sm"
              >
                Login / Signup
              </Link>
            )}

            <a 
              href="https://wa.me/+919344665042" 
              target="_blank" 
              rel="noreferrer" 
              onClick={() => setIsOpen(false)} 
              className="w-full block text-center bg-primary text-primary-foreground py-3 rounded-xl font-bold hover:bg-primary/95 transition-all text-sm"
            >
              Inquire Now
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
