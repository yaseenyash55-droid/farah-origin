"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggleButton } from "./ThemeToggleButton";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/gallery", label: "Gallery" },
    { href: "/reviews", label: "Reviews" },
    { href: "/view-collection", label: "Collection" },
    { href: "/contact-us", label: "Contact" },
  ];

  return (
    <nav className="glass-nav fixed top-0 left-0 right-0 z-50 transition-all duration-300">
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
          <a href="https://wa.me/919999999999" target="_blank" rel="noreferrer" className="bg-[var(--accent)] text-[#0d0c0c] px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[var(--accent-hover)] transition-all">
            Inquire Now
          </a>
          <ThemeToggleButton />
        </div>

        {/* Mobile Toggle Button */}
        <button className="md:hidden text-[var(--foreground)]" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="md:hidden fixed top-20 left-0 w-full h-[calc(100vh-5rem)] bg-[var(--background)] flex flex-col items-center justify-center space-y-8 text-xl animate-fadeIn">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="hover:text-[var(--accent)]">
              {link.label}
            </Link>
          ))}
          <Link href="/order-now" onClick={() => setIsOpen(false)} className="hover:text-[var(--accent)]">Order Now</Link>
          <Link href="/cart" onClick={() => setIsOpen(false)} className="hover:text-[var(--accent)]">Cart</Link>
          <a href="https://wa.me/919999999999" target="_blank" rel="noreferrer" onClick={() => setIsOpen(false)} className="bg-[var(--accent)] text-[#0d0c0c] px-8 py-3 rounded-full font-semibold">
            Inquire Now
          </a>
        </div>
      )}
    </nav>
  );
}