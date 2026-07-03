"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggleButton } from "./ThemeToggleButton";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="glass-nav fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className="container flex justify-between items-center h-20">
        <a href="#" className="text-xl font-bold tracking-widest uppercase text-[var(--accent)]">
          Farah Origin
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 items-center">
          <a href="#gallery" className="text-sm hover:text-[var(--accent)] transition-colors">Gallery</a>
          <a href="#testimonials" className="text-sm hover:text-[var(--accent)] transition-colors">Reviews</a>
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
          <a href="#gallery" onClick={() => setIsOpen(false)} className="hover:text-[var(--accent)]">Gallery</a>
          <a href="#testimonials" onClick={() => setIsOpen(false)} className="hover:text-[var(--accent)]">Reviews</a>
          <a href="https://wa.me/919999999999" target="_blank" rel="noreferrer" onClick={() => setIsOpen(false)} className="bg-[var(--accent)] text-[#0d0c0c] px-8 py-3 rounded-full font-semibold">
            Inquire Now
          </a>
        </div>
      )}
    </nav>
  );
}