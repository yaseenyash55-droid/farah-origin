'use client';

import React, { useState, useEffect } from 'react';
import { Phone, MapPin, Heart, Sparkles, ShoppingBag, Sun, Moon, ArrowRight, CheckCircle } from 'lucide-react';
import { Playfair_Display, Great_Vibes, Plus_Jakarta_Sans } from 'next/font/google';

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '600', '700'] });
const greatVibes = Great_Vibes({ subsets: ['latin'], weight: ['400'] });
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export default function FarahOriginFullWebsite() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`${jakarta.className} min-h-screen transition-colors duration-500 antialiased relative overflow-x-hidden
      ${darkMode ? 'bg-[#1E1514] text-[#F3EBEA]' : 'bg-[#FFF8F6] text-[#4A3B3A]'}`}
    >
      {/* Decorative Background Glow Elements */}
      <div className={`absolute top-0 left-[-10%] w-[60vw] h-[60vw] rounded-full blur-[140px] pointer-events-none opacity-60 transition-colors duration-500
        ${darkMode ? 'bg-[#3D2522]' : 'bg-[#FCEAE6]'}`} 
      />
      <div className={`absolute top-[40%] right-[-10%] w-[50vw] h-[50vw] rounded-full blur-[120px] pointer-events-none opacity-50 transition-colors duration-500
        ${darkMode ? 'bg-[#3A2220]' : 'bg-[#FBE3DE]'}`} 
      />

      {/* 1. TOP UTILITY BANNER */}
      <div className={`w-full py-2.5 text-center text-xs tracking-[0.2em] uppercase font-semibold flex items-center justify-center gap-2 border-b transition-colors duration-500
        ${darkMode ? 'bg-[#2D1A18] border-[#442B28] text-[#D3A297]' : 'bg-[#FCECE8] border-[#F3D1C9] text-[#A67C74]'}`}
      >
        <Sparkles className="w-3.5 h-3.5 text-[#E27D86] animate-pulse" />
        Handmade with Love & Care — Shipping Across India
        <Sparkles className="w-3.5 h-3.5 text-[#E27D86] animate-pulse" />
      </div>

      {/* 2. NAVIGATION BAR */}
      <nav className={`sticky top-0 z-50 backdrop-blur-md border-b transition-all duration-300
        ${darkMode ? 'bg-[#1E1514]/80 border-[#3D2927]' : 'bg-[#FFF8F6]/80 border-[#F7E4E0]'}`}
      >
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className={`${greatVibes.className} text-3xl md:text-4xl text-[#E27D86] font-bold cursor-pointer`}>
            Farah Origin
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wide">
            <a href="#home" className="hover:text-[#E27D86] transition-colors">Home</a>
            <a href="#about" className="hover:text-[#E27D86] transition-colors">About</a>
            <a href="#gallery" className="hover:text-[#E27D86] transition-colors">Gallery</a>
            <a href="#contact" className="hover:text-[#E27D86] transition-colors">Order Now</a>
          </div>

          <div className="flex items-center gap-4">
            {/* Dark Mode Toggle Switch */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2.5 rounded-full border transition-all duration-300 hover:scale-105 active:scale-95
                ${darkMode ? 'bg-white/10 border-white/20 text-[#FFF2F0]' : 'bg-black/5 border-black/10 text-[#3A2A29]'}`}
            >
              {darkMode ? <Sun className="w-4 h-4 text-[#FCDAD5]" /> : <Moon className="w-4 h-4 text-[#5C4644]" />}
            </button>
            <a href="#contact" className="bg-[#E27D86] hover:bg-[#D16C75] text-white text-xs uppercase tracking-widest font-bold px-5 py-3 rounded-xl shadow-md transition-all">
              Book Custom Art
            </a>
          </div>
        </div>
      </nav>

      {/* 3. HERO HERO SECTION */}
      <header id="home" className="max-w-6xl mx-auto px-6 py-16 md:py-28 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 bg-[#FFF2F0] dark:bg-[#362422] border border-[#FAD2CB] dark:border-[#543936] px-4 py-2 rounded-full text-xs font-semibold tracking-wider text-[#E27D86]">
            ✨ Custom Handcrafts & Bridal Artistry
          </div>
          <h1 className={`${playfair.className} text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] ${darkMode ? 'text-white' : 'text-[#2D1F1E]'}`}>
            Customized <br />
            <span className="text-[#E27D86]">Crochet & Henna</span>
          </h1>
          <p className="text-base md:text-lg opacity-80 max-w-lg leading-relaxed">
            Welcome to a premium world of intricate threads and elegant stains. From personalized timeless woolen gifts to majestic bridal traditional design work—crafted just for your special moments.
          </p>
          <div className="pt-4 flex flex-wrap gap-4">
            <a href="#gallery" className="inline-flex items-center gap-2 bg-[#E27D86] text-white px-7 py-4 rounded-2xl font-bold shadow-lg shadow-[#E27D86]/30 hover:bg-[#D16C75] transition-all">
              Explore Collections <ArrowRight className="w-4 h-4" />
            </a>
            <div className="flex items-center gap-2 text-sm font-bold px-4 py-2">
              <MapPin className="w-4 h-4 text-[#E27D86]" /> Based in Erode
            </div>
          </div>
        </div>
        
        {/* Poster Component Integrated into the Hero Design */}
        <div className={`p-6 rounded-[40px] border transition-all duration-500 max-w-sm mx-auto shadow-2xl
          ${darkMode ? 'bg-[#261B1A] border-[#3D2927]' : 'bg-white border-[#F7E4E0]'}`}
        >
          <div className={`border-2 border-dashed rounded-[32px] p-6 text-center ${darkMode ? 'border-[#4A3230]' : 'border-[#F5D5CE]'}`}>
            <span className={`${playfair.className} italic text-sm text-[#C98E82]`}>✨ Farah Origin Creation ✨</span>
            <div className={`${greatVibes.className} text-5xl text-[#E27D86] my-4`}>Farah Origin</div>
            <div className="space-y-2 text-xs uppercase tracking-widest opacity-80">
              <p>♥ Handmade Crochet</p>
              <p>♥ Intricate Mehandi</p>
              <p>♥ Woolen Bouquets</p>
            </div>
            <div className="mt-6 bg-[#E27D86] text-white text-[11px] font-bold py-2.5 rounded-xl uppercase tracking-wider">
              Perfect For Birthdays & Events
            </div>
          </div>
        </div>
      </header>

      {/* 4. BRAND CORE ETHOS (FEATURE HIGHLIGHTS) */}
      <section className={`py-12 border-y ${darkMode ? 'bg-[#251A19]/50 border-[#3D2927]' : 'bg-[#FDF6F4] border-[#F5E6E3]'}`}>
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="space-y-2 p-4">
            <div className="mx-auto w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-[#E27D86]">✦</div>
            <h3 className={`${playfair.className} text-xl font-bold`}>Unique & Personalized</h3>
            <p className="text-xs opacity-70">Every piece or design pattern configured step-by-step to reflect your individual style direction.</p>
          </div>
          <div className="space-y-2 p-4">
            <div className="mx-auto w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-[#E27D86]">✦</div>
            <h3 className={`${playfair.className} text-xl font-bold`}>Perfect Gift Layouts</h3>
            <p className="text-xs opacity-70">Timeless arrangements like forever blooming woolen tulips packaged cleanly into elite bundles.</p>
          </div>
          <div className="space-y-2 p-4">
            <div className="mx-auto w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-[#E27D86]">✦</div>
            <h3 className={`${playfair.className} text-xl font-bold`}>Cute & Creative Designs</h3>
            <p className="text-xs opacity-70">Meticulous loops and deep rich henna stains tailored directly for high aesthetic pleasure.</p>
          </div>
        </div>
      </section>

      {/* 5. PORTFOLIO GALLERY SECTIONS */}
      <section id="gallery" className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center space-y-3 mb-16">
          <h2 className={`${playfair.className} text-4xl md:text-5xl font-bold`}>Our Handcrafted Offerings</h2>
          <p className="text-sm opacity-70 max-w-md mx-auto">Explore premium, luxury products built meticulously to make every milestone unforgettable.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className={`group p-5 rounded-3xl border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl
            ${darkMode ? 'bg-[#2D1E1D] border-[#442E2C]' : 'bg-white border-[#F5E6E3] shadow-md'}`}
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden relative bg-[#FDF7F5] dark:bg-[#231716] flex items-center justify-center border border-dashed border-[#EAD0CB]">
              {/* <img src="/crochet.jpg" alt="Crochet Portfolio" className="absolute inset-0 w-full h-full object-cover" /> */}
              <ShoppingBag className="w-12 h-12 text-[#E27D86]/40 absolute" />
            </div>
            <div className="mt-5 space-y-2">
              <h3 className={`${playfair.className} text-2xl font-bold`}>Crochet Gifts & Decor</h3>
              <p className="text-xs opacity-70">Custom interactive premium frames, toys, accessories, and cozy customized keepsakes tailored out of organic yarn fibers.</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className={`group p-5 rounded-3xl border-2 border-[#E27D86] transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl
            ${darkMode ? 'bg-[#33201E]' : 'bg-white shadow-lg'}`}
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden relative bg-[#FFF2F0] dark:bg-[#261817] flex items-center justify-center border border-dashed border-[#FAD2CB]">
              {/* <img src="/henna.jpg" alt="Henna Portfolio" className="absolute inset-0 w-full h-full object-cover" /> */}
              <Sparkles className="w-12 h-12 text-[#E27D86]/40 absolute" />
            </div>
            <div className="mt-5 space-y-2">
              <h3 className={`${playfair.className} text-2xl font-bold text-[#E27D86]`}>Bridal & Occasion Henna</h3>
              <p className="text-xs opacity-70">Exquisite traditional styling, deep geometric lines, patterns, and flawless layout application details for your landmark event days.</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className={`group p-5 rounded-3xl border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl
            ${darkMode ? 'bg-[#2D1E1D] border-[#442E2C]' : 'bg-white border-[#F5E6E3] shadow-md'}`}
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden relative bg-[#FDF7F5] dark:bg-[#231716] flex items-center justify-center border border-dashed border-[#EAD0CB]">
              {/* <img src="/flowers.jpg" alt="Woolen Flowers" className="absolute inset-0 w-full h-full object-cover" /> */}
              <Heart className="w-12 h-12 text-[#E27D86]/40 absolute" />
            </div>
            <div className="mt-5 space-y-2">
              <h3 className={`${playfair.className} text-2xl font-bold`}>Eternal Woolen Bouquets</h3>
              <p className="text-xs opacity-70">Hand-knit tulip and rose arrangement models built perfectly to capture elegant visual design themes without ever fading away.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. HOW TO PLACE AN ORDER SECTION */}
      <section id="about" className={`py-20 ${darkMode ? 'bg-[#261B1A]' : 'bg-[#FFF4F1]'}`}>
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className={`${playfair.className} text-4xl font-bold`}>Simple, Customized Order Process</h2>
            <p className="text-sm opacity-80 leading-relaxed">
              Every beautiful creation begins with an idea. To ensure your customized configuration meets absolute perfection, we adhere to a refined, personalized fulfillment route:
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#E27D86] mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-bold text-sm">1. Share Your Vision</h4>
                  <p className="text-xs opacity-70">DM us on Instagram or connect via WhatsApp with reference themes or canvas sizes.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#E27D86] mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-bold text-sm">2. Design & Approve</h4>
                  <p className="text-xs opacity-70">We pick custom palettes, design outlines, or premium materials for your explicit go-ahead.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#E27D86] mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-bold text-sm">3. Handcrafting & Safe Delivery</h4>
                  <p className="text-xs opacity-70">We forge your pieces with love and secure them inside protective packaging ready for transit.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-[#1E1514] p-8 rounded-[36px] shadow-xl border border-[#F5D5CE] dark:border-[#4A3230] text-center space-y-4">
            <p className={`${playfair.className} italic text-xl text-[#C98E82]`}>"Made just for you, to make every single moment special."</p>
            <div className={`${greatVibes.className} text-4xl text-[#2D1F1E] dark:text-white`}>— Farah Origin</div>
          </div>
        </div>
      </section>

      {/* 7. PREMIUM FOOTER ACTION PANEL */}
      <section id="contact" className="max-w-5xl mx-auto px-4 py-20">
        <div className={`rounded-[45px] p-8 md:p-14 border text-center transition-all duration-500
          ${darkMode ? 'bg-[#2A1D1C] border-[#442E2C]' : 'bg-gradient-to-br from-[#FDF5F3] to-[#FCEBE7] border-[#F3D1C9]'}`}
        >
          <h2 className={`${playfair.className} text-3xl md:text-5xl font-bold mb-4`}>Bring Your Ideas to Reality</h2>
          <p className="text-sm opacity-80 max-w-md mx-auto mb-10">Reach out below to configure secure payments, custom dynamic scheduling dates, and global design requests.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {/* WhatsApp Trigger */}
            <a 
              href="https://wa.me/918438440625" 
              target="_blank" 
              rel="noreferrer"
              className={`flex items-center justify-center gap-3 px-6 py-4 rounded-2xl border hover:border-[#25D366] hover:shadow-md transition-all duration-300 font-bold tracking-wide
                ${darkMode ? 'bg-[#231716] border-[#442E2C]' : 'bg-white border-[#EAD0CB]'}`}
            >
              <Phone className="w-5 h-5 text-[#25D366]" />
              <span>8438440625</span>
            </a>

            {/* Instagram Link */}
            <a 
              href="https://instagram.com/farah_origin" 
              target="_blank" 
              rel="noreferrer"
              className={`flex items-center justify-center gap-3 px-6 py-4 rounded-2xl border hover:border-[#E1306C] hover:shadow-md transition-all duration-300 font-bold tracking-wide
                ${darkMode ? 'bg-[#231716] border-[#442E2C]' : 'bg-white border-[#EAD0CB]'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#E1306C]">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
              <span>@farah_origin</span>
            </a>

            {/* Location Display */}
            <div className={`flex items-center justify-center gap-2 font-bold tracking-widest uppercase text-sm px-6 py-4 rounded-2xl border shadow-sm
              ${darkMode ? 'bg-[#231716] border-[#442E2C]' : 'bg-white border-[#FCDAD5]'}`}
            >
              <MapPin className="w-5 h-5 text-[#E27D86]" />
              <span>ERODE, INDIA</span>
            </div>
          </div>
        </div>
      </section>

      {/* 8. MASTER PAGE FOOTER */}
      <footer className="w-full text-center border-t border-[#F5E6E3] dark:border-[#3A2927] py-8 text-xs opacity-60 tracking-wider">
        <p>© 2026 Farah Origin Boutique. All Rights Handcrafted with Love.</p>
      </footer>
    </div>
  );
}