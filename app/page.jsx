import React from 'react';
import { Phone, MapPin, Heart, Sparkles, ShoppingBag } from 'lucide-react';
// Importing beautiful premium fonts directly through Next.js
import { Playfair_Display, Great_Vibes, Plus_Jakarta_Sans } from 'next/font/google';

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '600', '700'] });
const greatVibes = Great_Vibes({ subsets: ['latin'], weight: ['400'] });
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export default function FarahOriginPremiumBoutique() {
  return (
    <div className={`${jakarta.className} min-h-screen bg-[#FFF8F6] text-[#4A3B3A] antialiased relative overflow-hidden pb-12`}>
      
      {/* Soft, premium ambient glow blobs in the background */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#FCEAE6] blur-[120px] pointer-events-none opacity-70" />
      <div className="absolute bottom-[10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-[#FBE3DE] blur-[100px] pointer-events-none opacity-60" />

      {/* Elegant Floating Header Banner */}
      <div className="w-full bg-[#FCECE8] py-3 text-center text-xs tracking-[0.2em] uppercase font-semibold flex items-center justify-center gap-2 border-b border-[#F3D1C9] text-[#A67C74]">
        <Sparkles className="w-3.5 h-3.5 text-[#E27D86] animate-pulse" />
        Handmade with Love & Care
        <Sparkles className="w-3.5 h-3.5 text-[#E27D86] animate-pulse" />
      </div>

      {/* Main Content Container */}
      <main className="max-w-5xl mx-auto px-4 py-8 md:py-16 relative z-10">
        
        {/* Main Poster-Style Card Frame */}
        <div className="bg-white/80 backdrop-blur-md rounded-[45px] shadow-[0_20px_50px_rgba(243,225,220,0.7)] p-5 md:p-12 border border-[#F7E4E0] relative">
          
          {/* Aesthetic Inner Border Box */}
          <div className="border-2 border-[#F5D5CE] rounded-[36px] p-6 md:p-12 bg-white/50 relative">
            
            {/* Top Minimal Decoration */}
            <div className="text-center mb-4">
              <span className={`${playfair.className} italic text-xl md:text-2xl text-[#C98E82] tracking-wide block`}>
                ✨ Beautifully Handcrafted ✨
              </span>
              <div className="text-[#F19CA7] text-xl mt-2 animate-bounce">♥</div>
            </div>

            {/* Main Typographic Titles */}
            <h1 className={`${playfair.className} text-center text-5xl md:text-7xl font-bold tracking-tight text-[#2D1F1E] mb-2`}>
              Customized
            </h1>
            
            <h2 className={`${playfair.className} text-center text-4xl md:text-6xl text-[#E27D86] font-semibold tracking-wide mb-6`}>
              Crochet <span className="font-sans text-2xl md:text-3xl text-[#C98E82]">&</span> Henna
            </h2>

            {/* Signature Creator Brand */}
            <div className="flex justify-center items-center gap-3 mb-10">
              <span className="text-sm uppercase tracking-[0.15em] text-[#9C8481] font-medium">by</span>
              <span className={`${greatVibes.className} text-5xl md:text-7xl text-[#2D1F1E] drop-shadow-sm`}>
                Farah Origin
              </span>
            </div>

            {/* Premium Pill Badges */}
            <div className="flex flex-wrap justify-center gap-4 mb-14">
              <div className="flex items-center gap-2 bg-[#FFF2F0] px-6 py-3 rounded-full border border-[#FAD2CB] text-sm font-semibold tracking-wide text-[#5C4644] shadow-sm">
                <Heart className="w-4 h-4 text-[#E27D86] fill-[#E27D86]" /> Handmade Crochet
              </div>
              <div className="flex items-center gap-2 bg-[#FFF2F0] px-6 py-3 rounded-full border border-[#FAD2CB] text-sm font-semibold tracking-wide text-[#5C4644] shadow-sm">
                <Heart className="w-4 h-4 text-[#E27D86] fill-[#E27D86]" /> Mehandi Artistry
              </div>
            </div>

            {/* Interactive Image Showcase Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-14">
              
              {/* Product Card 1 */}
              <div className="group bg-white p-4 rounded-3xl shadow-md border border-[#F5E6E3] transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                <div className="aspect-[4/5] bg-[#FDF7F5] rounded-2xl overflow-hidden relative flex flex-col items-center justify-center p-6 border border-dashed border-[#EAD0CB]">
                  {/* Subtle decorative background icon */}
                  <ShoppingBag className="w-12 h-12 text-[#F2D1CA] mb-3 group-hover:scale-110 transition-transform" />
                  <p className={`${playfair.className} text-xl font-bold text-[#4A3B3A] text-center`}>Crochet Gifts & Deco</p>
                  <p className="text-xs text-[#A38E8B] mt-2 text-center">Custom orders made with soft yarn</p>
                </div>
              </div>
              
              {/* Product Card 2 (Featured center) */}
              <div className="group bg-white p-4 rounded-3xl shadow-xl border-2 border-[#F19CA7] transition-all duration-300 hover:shadow-2xl md:-translate-y-3 hover:-translate-y-5">
                <div className="absolute top-2 right-2 bg-[#E27D86] text-white text-[10px] uppercase tracking-widest px-3 py-1 rounded-full font-bold">Featured</div>
                <div className="aspect-[4/5] bg-[#FFF2F0] rounded-2xl overflow-hidden relative flex flex-col items-center justify-center p-6 border border-dashed border-[#FAD2CB]">
                  <Sparkles className="w-12 h-12 text-[#E27D86] mb-3 group-hover:rotate-12 transition-transform" />
                  <p className={`${playfair.className} text-2xl font-bold text-[#2D1F1E] text-center`}>Bridal Mehandi</p>
                  <p className="text-xs text-[#A38E8B] mt-2 text-center">Intricate custom traditional designs</p>
                </div>
              </div>

              {/* Product Card 3 */}
              <div className="group bg-white p-4 rounded-3xl shadow-md border border-[#F5E6E3] transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                <div className="aspect-[4/5] bg-[#FDF7F5] rounded-2xl overflow-hidden relative flex flex-col items-center justify-center p-6 border border-dashed border-[#EAD0CB]">
                  <Heart className="w-12 h-12 text-[#F2D1CA] mb-3 group-hover:scale-110 transition-transform" />
                  <p className={`${playfair.className} text-xl font-bold text-[#4A3B3A] text-center`}>Woolen Bouquets</p>
                  <p className="text-xs text-[#A38E8B] mt-2 text-center">Flowers that bloom forever</p>
                </div>
              </div>
            </div>

            {/* Aesthetic Poster Highlight Badges */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center border-t border-dashed border-[#EAD0CB] pt-12">
              
              <div className="text-center p-6 rounded-2xl border border-[#FCEBE7] bg-[#FFFDFD] shadow-sm">
                <p className={`${playfair.className} text-sm italic text-[#8A716E] leading-relaxed`}>
                  "Made just for you, to make every single moment <span className="text-[#E27D86] font-bold not-italic">special</span>"
                </p>
              </div>

              <div className="bg-[#E27D86] text-white text-center p-6 rounded-2xl shadow-lg transform rotate-[-1deg] transition-transform hover:rotate-0 duration-300">
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-90 mb-1">Perfect For</p>
                <p className={`${playfair.className} text-2xl font-semibold`}>Birthdays & Events</p>
                <div className="text-white text-sm mt-2">♥</div>
              </div>

              <div className="text-center p-6 rounded-full border-2 border-dashed border-[#F2D1CA] aspect-square flex flex-col justify-center max-w-[150px] mx-auto bg-white shadow-inner">
                <span className={`${playfair.className} text-base text-[#2D1F1E] font-bold block`}>Mehandi</span>
                <span className="text-[#D3A297] font-serif my-0.5">&</span>
                <span className={`${playfair.className} text-base text-[#2D1F1E] font-bold block`}>Woolen</span>
              </div>

            </div>

          </div>

          {/* Premium Contact & Action Grid */}
          <div className="mt-12 bg-gradient-to-br from-[#FDF5F3] to-[#FCEBE7] rounded-[32px] p-6 md:p-10 border border-[#F3D1C9]">
            <h3 className={`${playfair.className} text-center text-2xl md:text-3xl text-[#2D1F1E] font-bold mb-8`}>
              Place an Order & Enquiries
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* WhatsApp Option */}
              <a 
                href="https://wa.me/918438440625" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-center gap-3 bg-white px-6 py-4 rounded-2xl border border-[#EAD0CB] hover:border-[#25D366] hover:shadow-md transition-all duration-300 text-[#4A3B3A] group"
              >
                <Phone className="w-5 h-5 text-[#25D366] group-hover:scale-110 transition-transform" />
                <span className="font-bold tracking-wide">8438440625</span>
              </a>

              {/* Instagram Option */}
              <a 
                href="https://instagram.com/farah_origin" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-center gap-3 bg-white px-6 py-4 rounded-2xl border border-[#EAD0CB] hover:border-[#E1306C] hover:shadow-md transition-all duration-300 text-[#4A3B3A] group"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="w-5 h-5 text-[#E1306C] group-hover:scale-110 transition-transform"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
                <span className="font-bold tracking-wide">@farah_origin</span>
              </a>

              {/* Location Tag */}
              <div className="flex items-center justify-center gap-2 text-[#2D1F1E] font-bold tracking-widest uppercase text-sm bg-white px-6 py-4 rounded-2xl border border-[#FCDAD5] shadow-sm">
                <MapPin className="w-5 h-5 text-[#E27D86]" />
                <span>ERODE</span>
              </div>

            </div>
            
            <p className="text-center text-xs text-[#A38E8B] font-medium tracking-wider mt-6">
              ✨ DM or Message us on WhatsApp for custom sizing and requests ✨
            </p>
          </div>

        </div>
      </main>

      {/* Styled Footer Badges */}
      <footer className="max-w-4xl mx-auto px-6 mt-4">
        <div className="flex flex-wrap justify-between items-center gap-4 text-xs font-semibold tracking-widest text-[#B59D9A] uppercase bg-white/40 backdrop-blur-sm py-4 px-8 rounded-full border border-[#F5E6E3]">
          <div>✦ Unique & Personalized</div>
          <div>✦ Perfect Gifts</div>
          <div>✦ Cute Designs</div>
        </div>
      </footer>

    </div>
  );
}