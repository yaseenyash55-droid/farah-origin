import React from 'react';
import { Mail, Phone, Globe, MapPin, Heart, Sparkles } from 'lucide-react';

export default function FarahOriginBoutique() {
  return (
    <div className="min-h-screen bg-[#FFF9F6] text-[#4A3E3D] font-sans antialiased relative overflow-x-hidden">
      
      {/* Decorative Top Banner */}
      <div className="w-full bg-[#FCEBE7] py-2 text-center text-xs tracking-widest uppercase flex items-center justify-center gap-2 border-b border-[#F5D6CE]">
        <Sparkles className="w-3 h-3 text-[#D3A297]" />
        Handmade with Love & Care
        <Sparkles className="w-3 h-3 text-[#D3A297]" />
      </div>

      {/* Hero / Main Poster Card Section */}
      <main className="max-w-4xl mx-auto px-4 py-12 md:py-20">
        <div className="bg-white rounded-[40px] shadow-xl shadow-[#F3E1DC]/50 p-6 md:p-12 border-2 border-[#FAECE8] relative">
          
          {/* Aesthetic Arch Frame Design Element */}
          <div className="border border-[#F5D6CE] rounded-[32px] p-6 md:p-10 bg-[#FFFDFD] relative">
            
            {/* Header Script */}
            <div className="text-center mb-2">
              <span className="font-serif italic text-xl md:text-2xl text-[#D3A297] block font-light tracking-wide">
                ✨ Handmade with Love ✨
              </span>
              <div className="text-[#F19CA7] text-2xl my-1">♥</div>
            </div>

            {/* Main Title */}
            <h1 className="text-center font-serif text-4xl md:text-6xl font-bold tracking-tight text-[#3A2A29] mb-4">
              Customized
            </h1>
            
            <h2 className="text-center font-serif text-3xl md:text-5xl text-[#E27D86] font-medium mb-6">
              Crochet <span className="font-sans text-2xl md:text-3xl text-[#D3A297]">&</span> Henna
            </h2>

            {/* Signature Branding */}
            <div className="flex justify-center items-center gap-2 mb-10">
              <span className="text-lg italic text-[#8A7978]">by</span>
              <span className="font-['Great_Vibes'] text-4xl md:text-5xl text-[#3A2A29] font-semibold tracking-wide">
                Farah Origin
              </span>
            </div>

            {/* Tag Badges */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12">
              <div className="flex items-center gap-2 bg-[#FFF3F1] px-5 py-2.5 rounded-full border border-[#FCDAD5] text-sm font-medium">
                <span className="text-[#E27D86]">♥</span> Handmade Crochet
              </div>
              <div className="flex items-center gap-2 bg-[#FFF3F1] px-5 py-2.5 rounded-full border border-[#FCDAD5] text-sm font-medium">
                <span className="text-[#E27D86]">♥</span> Mehandi Artistry
              </div>
            </div>

            {/* Product Grid Gallery */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
              {/* Card 1 */}
              <div className="bg-white p-3 rounded-2xl shadow-sm border border-[#F5E6E3] transform hover:-translate-y-1 transition duration-300">
                <div className="aspect-square bg-[#FBF4F2] rounded-xl overflow-hidden relative flex items-center justify-center text-[#D3A297]">
                  {/* Replace with <img> src for actual items */}
                  <span className="text-xs uppercase tracking-wider text-center p-4">Crochet Gifts & Decor</span>
                </div>
              </div>
              
              {/* Card 2 */}
              <div className="bg-white p-3 rounded-2xl shadow-sm border border-[#F5E6E3] transform hover:-translate-y-1 transition duration-300 md:scale-105">
                <div className="aspect-square bg-[#FBF4F2] rounded-xl overflow-hidden relative flex items-center justify-center text-[#D3A297]">
                  {/* Replace with <img> src for Henna art */}
                  <span className="text-xs uppercase tracking-wider text-center p-4">Bridal & Custom Mehandi</span>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-white p-3 rounded-2xl shadow-sm border border-[#F5E6E3] transform hover:-translate-y-1 transition duration-300">
                <div className="aspect-square bg-[#FBF4F2] rounded-xl overflow-hidden relative flex items-center justify-center text-[#D3A297]">
                  {/* Replace with <img> src for Tulips */}
                  <span className="text-xs uppercase tracking-wider text-center p-4">Woolen Bouquets</span>
                </div>
              </div>
            </div>

            {/* Callout Badges */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center border-t border-dashed border-[#EAD0CB] pt-10">
              
              <div className="text-center p-4 rounded-2xl border border-[#FCEBE7] bg-[#FFFBFB]">
                <p className="text-xs text-[#9E8B88] uppercase tracking-wider leading-relaxed">
                  "Made just for you, to make every moment <span className="text-[#E27D86] font-medium">special</span>"
                </p>
              </div>

              <div className="bg-[#E27D86] text-white text-center p-6 rounded-2xl shadow-md transform rotate-[-1deg]">
                <p className="text-xs uppercase tracking-widest font-semibold opacity-90 mb-1">Perfect For</p>
                <p className="font-serif text-xl font-medium">Birthdays & Special Moments</p>
                <div className="text-white text-xs mt-1">♥</div>
              </div>

              <div className="text-center p-4 rounded-full border border-dashed border-[#F0C2BA] aspect-square flex flex-col justify-center max-w-[140px] mx-auto bg-white">
                <span className="font-serif text-sm text-[#3A2A29] font-semibold block">Mehandi</span>
                <span className="text-[#D3A297] my-0.5">&</span>
                <span className="font-serif text-sm text-[#3A2A29] font-semibold block">Woolen</span>
              </div>

            </div>

          </div>

          {/* Call to Action Footer */}
          <div className="mt-12 bg-[#FCEBE7] rounded-3xl p-6 md:p-8 border border-[#F5D6CE]">
            <h3 className="text-center font-serif text-xl text-[#3A2A29] font-semibold mb-6">
              Order Now & Enquiries
            </h3>
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              
              {/* WhatsApp Contact */}
              <a 
                href="https://wa.me/918438440625" 
                target="_blank" 
                rel="noreferrer"
                className="w-full md:w-auto flex items-center justify-center gap-3 bg-white px-6 py-3 rounded-xl border border-[#EAD0CB] hover:shadow-md transition text-[#4A3E3D]"
              >
                <Phone className="w-5 h-5 text-[#25D366]" />
                <span className="font-medium tracking-wide">8438440625</span>
              </a>

              {/* Instagram Handle */}
              <a 
                href="https://instagram.com/farah_origin" 
                target="_blank" 
                rel="noreferrer"
                className="w-full md:w-auto flex items-center justify-center gap-3 bg-white px-6 py-3 rounded-xl border border-[#EAD0CB] hover:shadow-md transition text-[#4A3E3D]"
              >
                <Globe className="w-5 h-5 text-[#E1306C]" />
                <span className="font-medium tracking-wide">@farah_origin</span>
              </a>

              {/* Location Badge */}
              <div className="w-full md:w-auto flex items-center justify-center gap-2 text-[#3A2A29] font-semibold tracking-wider uppercase text-sm bg-[#FFF3F1] px-6 py-3 rounded-xl border border-[#FCDAD5]">
                <MapPin className="w-4 h-4 text-[#E27D86]" />
                <span>Erode</span>
              </div>

            </div>
            
            <p className="text-center text-xs text-[#9E8B88] tracking-wide mt-6">
              DM us for custom configurations, orders & dynamic event bookings
            </p>
          </div>

        </div>
      </main>

      {/* Sub Footer Footer Notes */}
      <footer className="w-full bg-white border-t border-[#F5E6E3] py-6 text-xs text-[#A89693]">
        <div className="max-w-4xl mx-auto px-4 flex flex-wrap justify-between gap-4 text-center">
          <div>✦ Perfect gifts</div>
          <div>✦ Unique & personalized</div>
          <div>✦ Cute designs</div>
        </div>
      </footer>

    </div>
  );
}