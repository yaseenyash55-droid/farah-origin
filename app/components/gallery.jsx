"use client";
import { useState } from "react";
import { galleryItems } from "@/data/gallery";
import { X, ExternalLink } from "lucide-react";

export default function Gallery() {
  const [filter, setFilter] = useState("all");
  const [activeImage, setActiveImage] = useState(null);

  const filteredItems = filter === "all" ? galleryItems : galleryItems.filter(item => item.category === filter);

  const openWhatsAppOrder = (itemTitle) => {
    const text = encodeURIComponent(`Hi Farah Origin, I am interested in exploring or ordering the item: "${itemTitle}". Could you provide details on pricing and availability?`);
    window.open(`https://wa.me/919999999999?text=${text}`, "_blank");
  };

  return (
    <section id="gallery" className="py-24 bg-[var(--background)]">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light tracking-wide mb-4">Handcrafted Collections</h2>
          <div className="w-16 h-[2px] bg-[var(--accent)] mx-auto mb-8"></div>
          
          {/* Category Filter Controls */}
          <div className="flex justify-center space-x-4 mb-12">
            {["all", "crochet", "henna"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-full text-xs uppercase tracking-wider transition-all ${
                  filter === cat ? "bg-[var(--accent)] text-[#0d0c0c] font-semibold" : "border border-[var(--border)] hover:border-[var(--accent)] text-[var(--foreground)]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Dynamic Grid Layout */}
        <div className="grid-gallery">
          {filteredItems.map((item) => (
            <div key={item.id} className="group relative bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl overflow-hidden transition-all duration-300 hover:transform hover:-translate-y-1">
              <div className="aspect-square w-full overflow-hidden relative bg-[#1c1a1a]">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                  onClick={() => setActiveImage(item)}
                />
              </div>
              <div className="p-5 flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-base text-[var(--foreground)]">{item.title}</h3>
                  <p className="text-xs text-gray-400 mt-1">{item.description}</p>
                </div>
                <button 
                  onClick={() => openWhatsAppOrder(item.title)}
                  className="p-2 text-[var(--accent)] border border-[var(--border)] rounded-xl hover:bg-[var(--accent)] hover:text-[#0d0c0c] transition-all"
                  aria-label="Order via WhatsApp"
                >
                  <ExternalLink size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Overlay Module */}
        {activeImage && (
          <div className="fixed inset-0 bg-black/95 z-50 flex flex-col items-center justify-center p-4 backdrop-blur-md animate-fadeIn">
            <button className="absolute top-6 right-6 text-white/70 hover:text-white" onClick={() => setActiveImage(null)}>
              <X size={32} />
            </button>
            <div className="max-w-3xl w-full max-h-[75vh] flex items-center justify-center">
              <img src={activeImage.image} alt={activeImage.title} className="max-w-full max-h-[75vh] object-contain rounded" />
            </div>
            <div className="text-center mt-6 max-w-xl">
              <h3 className="text-xl font-light mb-2">{activeImage.title}</h3>
              <p className="text-sm text-gray-400 mb-4">{activeImage.description}</p>
              <button 
                onClick={() => { openWhatsAppOrder(activeImage.title); setActiveImage(null); }}
                className="bg-[var(--accent)] text-[#0d0c0c] px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-[var(--accent-hover)]"
              >
                Inquire Over WhatsApp
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}