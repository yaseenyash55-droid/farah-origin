'use client';

import React, { useState, useEffect } from 'react';
import { Phone, MapPin, Heart, Sparkles, ShoppingBag, Sun, Moon, ArrowUpRight, Check } from 'lucide-react';
import { Playfair_Display, Great_Vibes, Plus_Jakarta_Sans } from 'next/font/google';

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });
const greatVibes = Great_Vibes({ subsets: ['latin'], weight: ['400'] });
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export default function FarahOriginInteractiveBoutique() {
  const [darkMode, setDarkMode] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`${jakarta.className} min-h-screen transition-colors duration-700 antialiased relative overflow-x-hidden
      ${darkMode ? 'bg-[#150F0E] text-[#F3ECEB]' : 'bg-[#FAF5F2] text-[#3D3130]'}`}
    >
      
      {/* Editorial Background Overlays */}
      <div className="absolute top-0 right-0 w-[45vw] h-screen bg-[#F5ECE8] dark:bg-[#1E1413] transition-colors duration-700 pointer-events-none z-0 hidden md:block" />
      <div className={`absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full blur-[150px] pointer-events-none opacity-40 transition-colors duration-700
        ${darkMode ? 'bg-[#402220]' : 'bg-[#EEDCD7]'}`} 
      />

      {/* LUXURY TICKER BANNER */}
      <div className={`w-full py-2.5 text-center text-[10px] tracking-[0.25em] uppercase font-bold flex items-center justify-center gap-3 border-b transition-colors duration-500 relative z-50
        ${darkMode ? 'bg-[#1C1211] border-[#33201F] text-[#C2968E]' : 'bg-[#F2E5E0] border-[#EADAD5] text-[#8C645E]'}`}
      >
        <span>✦ Studio Crafting Unique Crochet Gifts & Timeless Henna Artistry ✦</span>
      </div>

      {/* NAVIGATION */}
      <nav className={`sticky top-0 z-50 backdrop-blur-md border-b transition-all duration-300
        ${darkMode ? 'bg-[#150F0E]/80 border-[#2D1D1C]' : 'bg-[#FAF5F2]/80 border-[#EADAD5]'}`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-24 flex items-center justify-between">
          
          <div className="flex flex-col group cursor-pointer">
            <span className={`${greatVibes.className} text-4xl text-[#E27D86] font-medium leading-none transition-transform duration-300 group-hover:scale-105`}>Farah Origin</span>
            <span className="text-[9px] uppercase tracking-[0.3em] opacity-60 mt-1">Handcrafted Luxury</span>
          </div>
          
          <div className="hidden md:flex items-center gap-10 text-xs uppercase tracking-[0.2em] font-bold">
            <a href="#home" className="hover:text-[#E27D86] transition-colors relative group py-2">Home<span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#E27D86] transition-all group-hover:w-full"/></a>
            <a href="#about" className="hover:text-[#E27D86] transition-colors relative group py-2">The Studio<span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#E27D86] transition-all group-hover:w-full"/></a>
            <a href="#gallery" className="hover:text-[#E27D86] transition-colors relative group py-2">Collections<span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#E27D86] transition-all group-hover:w-full"/></a>
            <a href="#contact" className="hover:text-[#E27D86] transition-colors relative group py-2">Inquire<span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#E27D86] transition-all group-hover:w-full"/></a>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2.5 rounded-full border transition-all duration-300 active:scale-95
                ${darkMode ? 'border-white/10 text-white bg-white/5 hover:bg-white/10' : 'border-black/10 text-black bg-black/5 hover:bg-black/10'}`}
            >
              {darkMode ? <Sun className="w-4 h-4 text-[#FCDAD5]" /> : <Moon className="w-4 h-4 text-[#5C4644]" />}
            </button>
            <a href="#contact" className="bg-[#3D3130] dark:bg-[#E27D86] text-white text-[11px] uppercase tracking-widest font-bold px-6 py-3.5 shadow-sm hover:opacity-90 active:scale-95 transition-all">
              Request Order
            </a>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header id="home" className="max-w-7xl mx-auto px-6 md:px-12 pt-12 pb-24 grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10">
        
        <div className="md:col-span-7 space-y-8">
          <div className="inline-flex items-center gap-3 bg-[#EADAD5]/40 dark:bg-[#2D1D1C] px-4 py-2 text-[11px] uppercase tracking-[0.2em] font-bold text-[#C18276] rounded-md">
            <Sparkles className="w-3.5 h-3.5 text-[#E27D86]" /> Erode Boutique Atelier
          </div>
          
          <h1 className={`${playfair.className} text-6xl md:text-8xl font-medium tracking-tight leading-[1.05] ${darkMode ? 'text-white' : 'text-[#281E1E]'}`}>
            Aesthetic <br />
            <span className="font-serif italic text-[#E27D86]">Crochet & Henna</span>
          </h1>
          
          <p className="text-base opacity-80 max-w-xl leading-relaxed font-light">
            Crafting premium luxury solutions at the intersection of beautiful cotton fibers and intricate skin art stains. Designed precisely for landmark moments, boutique gifts, and bridal celebrations.
          </p>

          <div className="pt-4 flex flex-wrap gap-5 items-center">
            <a href="#gallery" className="group inline-flex items-center gap-3 bg-[#3D3130] dark:bg-[#E27D86] text-white px-8 py-4.5 font-bold text-xs uppercase tracking-widest transition-all shadow-lg active:scale-95">
              View Showcase <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
            <div className="h-10 w-[1px] bg-neutral-300 dark:bg-neutral-700 hidden sm:block" />
            <p className="text-xs font-bold tracking-widest uppercase opacity-70 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#E27D86]" /> Shipping Pan-India
            </p>
          </div>
        </div>

        {/* Poster Card Frame */}
        <div className="md:col-span-5 relative flex justify-center">
          <div className={`p-8 w-full max-w-sm rounded-[32px] border transition-all duration-500 shadow-2xl relative overflow-hidden group hover:shadow-[#E27D86]/10 hover:border-[#E27D86]/40
            ${darkMode ? 'bg-[#1E1413] border-[#33201F]' : 'bg-white border-[#EADADA]'}`}
          >
            <div className="border border-neutral-200 dark:border-neutral-800 p-6 space-y-8 relative z-10">
              <div className="text-center space-y-1">
                <span className={`${playfair.className} italic text-sm text-[#C98E82]`}>Est. 2026</span>
                <h3 className={`${playfair.className} text-3xl font-bold tracking-tight transition-colors duration-300 group-hover:text-[#E27D86]`}>Farah Origin</h3>
              </div>
              
              <div className="space-y-4 text-[11px] uppercase tracking-[0.25em] font-semibold opacity-80 border-t border-b border-dashed border-neutral-200 dark:border-neutral-800 py-6">
                <div className="flex justify-between items-center group-hover:translate-x-1 transition-transform"><span>01 / Custom Crochet</span> <span className="text-[#E27D86]">●</span></div>
                <div className="flex justify-between items-center group-hover:translate-x-1 transition-transform delay-75"><span>02 / Bridal Henna</span> <span className="text-[#E27D86]">●</span></div>
                <div className="flex justify-between items-center group-hover:translate-x-1 transition-transform delay-150"><span>03 / Forever Florals</span> <span className="text-[#E27D86]">●</span></div>
              </div>

              <a href="#contact" className="block text-center text-[10px] font-bold py-3.5 uppercase tracking-widest bg-[#3D3130] dark:bg-[#E27D86] text-white hover:opacity-90 active:scale-95 transition-all">
                Tailored with Care
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* INTERACTIVE CATALOG EXHIBIT */}
      <section id="gallery" className="max-w-7xl mx-auto px-6 md:px-12 py-24 border-t border-neutral-200 dark:border-neutral-900">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#E27D86]">Curated Collections</span>
            <h2 className={`${playfair.className} text-4xl md:text-5xl font-medium tracking-tight`}>The Atelier Catalog</h2>
          </div>
          <p className="text-sm opacity-70 max-w-xs font-light">Hover over any art category to explore dynamic portfolio layers.</p>
        </div>

        {/* 3-Column Interactive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div 
            className="group space-y-4 cursor-pointer"
            onMouseEnter={() => setHoveredCard(1)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="aspect-[3/4] overflow-hidden bg-[#F2EAE6] dark:bg-[#1E1413] border border-neutral-200 dark:border-neutral-800 relative flex items-center justify-center transition-all duration-500 group-hover:shadow-xl group-hover:border-[#E27D86]/40">
              
              {/* Image Source Hook Up */}
              <img src="/crochet.jpg" alt="Crochet Portfolio" className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105 opacity-0 group-hover:opacity-100 fallback-hide" onError={(e) => e.target.style.display='none'} />
              
              {/* Dynamic Interactive Reveal Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t from-[#3D3130]/90 via-[#3D3130]/20 to-transparent transition-opacity duration-300 flex flex-col justify-end p-6 text-white ${hoveredCard === 1 ? 'opacity-100' : 'md:opacity-0'}`}>
                <p className="text-xs uppercase tracking-widest font-semibold text-[#FCDAD5] mb-1">Hand-knit items</p>
                <h4 className={`${playfair.className} text-xl font-bold`}>View Plush Sets →</h4>
              </div>

              <ShoppingBag className="w-8 h-8 text-[#E27D86]/30 absolute transition-all duration-300 group-hover:scale-110 group-hover:opacity-0" />
            </div>
            <div className="flex justify-between items-start pt-2">
              <div>
                <h3 className="text-xl font-bold font-serif tracking-tight transition-colors group-hover:text-[#E27D86]">Boutique Crochet</h3>
                <p className="text-xs opacity-60 mt-1">Plush configuration options & home models</p>
              </div>
              <span className="text-xs font-serif italic opacity-40">01 /</span>
            </div>
          </div>

          {/* Card 2 */}
          <div 
            className="group space-y-4 cursor-pointer md:-translate-y-4"
            onMouseEnter={() => setHoveredCard(2)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="aspect-[3/4] overflow-hidden bg-[#FFF2F0] dark:bg-[#281817] border-2 border-[#E27D86] relative flex items-center justify-center transition-all duration-500 group-hover:shadow-2xl">
              
              <img src="/henna.jpg" alt="Henna Portfolio" className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105 opacity-0 group-hover:opacity-100 fallback-hide" onError={(e) => e.target.style.display='none'} />

              <div className={`absolute inset-0 bg-gradient-to-t from-[#E27D86]/90 via-[#E27D86]/20 to-transparent transition-opacity duration-300 flex flex-col justify-end p-6 text-white ${hoveredCard === 2 ? 'opacity-100' : 'md:opacity-0'}`}>
                <p className="text-xs uppercase tracking-widest font-semibold text-white/90 mb-1">Bridal & Festivities</p>
                <h4 className={`${playfair.className} text-xl font-bold`}>Explore Stains →</h4>
              </div>

              <Sparkles className="w-8 h-8 text-[#E27D86]/50 absolute transition-all duration-300 group-hover:scale-110 group-hover:opacity-0" />
            </div>
            <div className="flex justify-between items-start pt-2">
              <div>
                <h3 className="text-xl font-bold font-serif tracking-tight text-[#E27D86]">Bridal Mehandi</h3>
                <p className="text-xs opacity-60 mt-1">Organic fine detailed henna overlays</p>
              </div>
              <span className="text-xs font-serif italic opacity-60 text-[#E27D86]">02 / Featured</span>
            </div>
          </div>

          {/* Card 3 */}
          <div 
            className="group space-y-4 cursor-pointer"
            onMouseEnter={() => setHoveredCard(3)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="aspect-[3/4] overflow-hidden bg-[#F2EAE6] dark:bg-[#1E1413] border border-neutral-200 dark:border-neutral-800 relative flex items-center justify-center transition-all duration-500 group-hover:shadow-xl group-hover:border-[#E27D86]/40">
              
              <img src="/flowers.jpg" alt="Woolen Flowers" className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105 opacity-0 group-hover:opacity-100 fallback-hide" onError={(e) => e.target.style.display='none'} />

              <div className={`absolute inset-0 bg-gradient-to-t from-[#3D3130]/90 via-[#3D3130]/20 to-transparent transition-opacity duration-300 flex flex-col justify-end p-6 text-white ${hoveredCard === 3 ? 'opacity-100' : 'md:opacity-0'}`}>
                <p className="text-xs uppercase tracking-widest font-semibold text-[#FCDAD5] mb-1">Handmade Tulips & Roses</p>
                <h4 className={`${playfair.className} text-xl font-bold`}>View Bundles →</h4>
              </div>

              <Heart className="w-8 h-8 text-[#E27D86]/30 absolute transition-all duration-300 group-hover:scale-110 group-hover:opacity-0" />
            </div>
            <div className="flex justify-between items-start pt-2">
              <div>
                <h3 className="text-xl font-bold font-serif tracking-tight transition-colors group-hover:text-[#E27D86]">Woolen Bouquets</h3>
                <p className="text-xs opacity-60 mt-1">Eternal flora that blooms timelessly</p>
              </div>
              <span className="text-xs font-serif italic opacity-40">03 /</span>
            </div>
          </div>

        </div>
      </section>

      {/* STUDIO MANIFESTO */}
      <section id="about" className={`py-24 transition-colors duration-500 ${darkMode ? 'bg-[#1C1312]' : 'bg-[#F2EBE7]'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          
          <div className="md:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#E27D86]">The Process Flow</span>
            <h2 className={`${playfair.className} text-4xl font-medium tracking-tight`}>Uncompromising Execution</h2>
            
            <div className="space-y-4 pt-4">
              {[
                { num: '1', title: 'Concept Consultation', desc: 'Brainstorm layout sizes, textures, or pattern preferences directly via WhatsApp or Instagram DM pipelines.' },
                { num: '2', title: 'Material Formulation', desc: 'Sourcing choice yarn segments and mixing rich organic henna pastes to produce deep, brilliant stains.' },
                { num: '3', title: 'Secure Packaging & Dispatch', desc: 'Finished custom items are encapsulated safely to preserve pristine structural integrity during shipping.' }
              ].map((step, idx) => (
                <div 
                  key={idx}
                  className="flex items-start gap-4 p-4 rounded-xl transition-all duration-300 hover:bg-white/50 dark:hover:bg-white/5 cursor-default group"
                >
                  <div className="w-6 h-6 rounded-full bg-[#E27D86] text-white flex items-center justify-center text-[10px] font-bold mt-0.5 shrink-0 transition-transform group-hover:scale-110">
                    {step.num}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm uppercase tracking-wider transition-colors group-hover:text-[#E27D86]">{step.title}</h4>
                    <p className="text-xs opacity-70 mt-1">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-6 flex justify-center md:justify-end">
            <div className="border border-neutral-300 dark:border-neutral-800 p-10 max-w-md text-center space-y-6 bg-white/20 backdrop-blur-md rounded-2xl transform hover:rotate-0 transition-transform duration-300 rotate-[-1deg]">
              <p className={`${playfair.className} italic text-2xl text-[#C98E82] leading-relaxed`}>
                "Made just for you, to make every single moment special."
              </p>
              <div className="h-[1px] w-12 bg-[#E27D86] mx-auto" />
              <div className={`${greatVibes.className} text-4xl`}>Farah Origin Creation</div>
            </div>
          </div>

        </div>
      </section>

      {/* BOOKING INQUIRY PANEL */}
      <section id="contact" className="max-w-7xl mx-auto px-6 md:px-12 py-24">
        <div className={`p-8 md:p-16 border text-center transition-all duration-500 relative overflow-hidden rounded-3xl
          ${darkMode ? 'bg-[#1E1413] border-[#33201F]' : 'bg-white border-[#EADADA] shadow-xl'}`}
        >
          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#E27D86]">Direct Bookings</span>
            <h2 className={`${playfair.className} text-4xl md:text-6xl font-medium tracking-tight`}>Initiate An Order</h2>
            <p className="text-sm opacity-70 font-light max-w-md mx-auto">Connect with us on secure premium social pipelines to evaluate commissions, check availability dates, and get specialized dynamic pricing layouts.</p>
            
            <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-bold uppercase tracking-wider">
              
              <a 
                href="https://wa.me/918438440625" 
                target="_blank" 
                rel="noreferrer"
                className={`flex items-center justify-center gap-3 px-6 py-4.5 border hover:border-[#25D366] transition-all duration-300 active:scale-95 rounded-xl
                  ${darkMode ? 'bg-[#150F0E] border-neutral-800' : 'bg-[#FAF5F2] border-neutral-200'}`}
              >
                <Phone className="w-4 h-4 text-[#25D366]" />
                <span>8438440625</span>
              </a>

              <a 
                href="https://instagram.com/farah_origin" 
                target="_blank" 
                rel="noreferrer"
                className={`flex items-center justify-center gap-3 px-6 py-4.5 border hover:border-[#E1306C] transition-all duration-300 active:scale-95 rounded-xl
                  ${darkMode ? 'bg-[#150F0E] border-neutral-800' : 'bg-[#FAF5F2] border-neutral-200'}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"s
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4 text-[#E1306C]"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                <span className="font-bold tracking-wide">@farah_origin</span>
              </a>

              <div className={`flex items-center justify-center gap-2 font-bold tracking-widest uppercase text-sm px-6 py-4 rounded-2xl border shadow-sm transition-colors duration-500 ${
                darkMode ? 'bg-[#231716] border-[#442E2C]' : 'bg-white border-[#FCDAD5]'
              }`}>
                <MapPin className="w-5 h-5 text-[#E27D86]" />
                <span>ERODE</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}