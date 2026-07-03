"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggleButton } from "./ThemeToggleButton";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

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
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container flex justify-between items-center h-20">
        <Link href="/" className="text-xl font-bold tracking-widest uppercase text-[var(--accent)]">
          Farah Origin
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm hover:text-[var(--accent)] transition-colors">
              {link.label}
            </Link>
          ))}
          <Link href="/order-now" className="text-sm hover:text-[var(--accent)] transition-colors">Order Now</Link>
          <Link href="/cart" className="text-sm hover:text-[var(--accent)] transition-colors">Cart</Link>
          <a href="https://wa.me/+919344665042" target="_blank" rel="noreferrer" className="bg-[var(--accent)] text-[#0d0c0c] px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[var(--accent-hover)] transition-all">
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

      {/* Mobile Left Drawer */}
      {isOpen && (
        <div className="md:hidden fixed top-20 left-0 w-72 h-[calc(100vh-5rem)] bg-[var(--background)] flex flex-col items-start justify-start pt-8 pl-6 space-y-8 text-xl shadow-2xl z-50 animate-slideIn">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="hover:text-[var(--accent)] transition-colors">
              {link.label}
            </Link>
          ))}
          <Link href="/order-now" onClick={() => setIsOpen(false)} className="hover:text-[var(--accent)] transition-colors">Order Now</Link>
          <Link href="/cart" onClick={() => setIsOpen(false)} className="hover:text-[var(--accent)] transition-colors">Cart</Link>
          <a href="https://wa.me/+919344665042" target="_blank" rel="noreferrer" onClick={() => setIsOpen(false)} className="bg-[var(--accent)] text-[#0d0c0c] px-8 py-3 rounded-full font-semibold hover:bg-[var(--accent-hover)] transition-all">
            Inquire Now
          </a>
        </div>
      )}
    </nav>
  );
}
